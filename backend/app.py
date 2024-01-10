from flask import Flask, request, jsonify
import os
import json
from assistant.assistant import *
from dotenv import load_dotenv 
from flask_cors import CORS

load_dotenv()

app = Flask(__name__)

CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf'}
PORT=os.getenv('PORT')

os.makedirs('uploads', exist_ok=True)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        print(request.files)
        # Check if the POST request has the file part
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400

        file = request.files['file']

        # If the user does not select a file, the browser may submit an empty file without a filename
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400

        # Check if the file has a valid extension
        if not allowed_file(file.filename):
            return jsonify({'error': 'Invalid file extension'}), 400

        # Save the file to the uploads folder with its original name
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        print(file.filename)
        print(file_path)

        uploaded_file = upload_file_openai(file_path)

        messages = start_assistant(uploaded_file)

        print(messages)

        os.remove(file_path)

        if messages:
                # If messages list is not empty, access the first element
            response_message = messages[0].replace("\n", "").replace("\ ", "")

            ai_response = improve_json_response(response_message)
                
            return jsonify({'message': ai_response}), 200
        else:
                # If messages list is empty, provide a default message or handle it accordingly
            return jsonify({'message': 'No messages available'}), 200
    except json.JSONDecodeError as je:
        return jsonify({'error' : "Invalid JSON format"})
    except FileNotFoundError as fe:
        return jsonify({'error': f'File not found: {fe}'}), 404

    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500
    


if __name__ == '__main__':
    # Create the "uploads" folder if it doesn't exist
    if not os.path.exists(UPLOAD_FOLDER):
        os.makedirs(UPLOAD_FOLDER)

    # Run the Flask app on port 3001
    app.run(debug=True, port=PORT)
