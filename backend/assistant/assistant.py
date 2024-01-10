import time
import os
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

module_obj = {
    "title": "",
    "sub_title": "",
    "content": "",
    "FAQ": [
        {
            "Question": "",
            "Answer": ""
        },
        {
            "Question": "",
            "Answer": ""
        }
    ]
}

Test_Your_Understanding_Module = {
    "Test": [
        {
           "type":"Subjective",
            "Question": "",
            "Answer": ""
        },
        {
           "type":"MCQ",
           "Question":"",
           "Options":[],
           "Correct_Answer":""
        }
    ]
}

ideal_response = [module_obj, module_obj, Test_Your_Understanding_Module]

def assistant_works(data_file, thread):
    try:
      assistant = client.beta.assistants.create(
          name="Smart Assistant",
          instructions=f'''
          Your Role : Tutorial Creator For Sales Team From {data_file.id}
          You are given a file {data_file.id} which contains all the relevant information about a product.
          You need to analyze all of the content & understand the content in depth from {data_file.id}.
          
          Explanation Of Response Structure {module_obj} : 
          - title : Main Heading of the content
          - sub_title : Sub heading for the content
          - content : The tutorial for that particular title
          - FAQ : A list of Questions & Answers based on the particular title
          - Options : List of answers containing 4 options for the particular question asked.
          - Correct_Answer : The correct answer from the given Options, for the given Question.
          - Test : A list of objects containing mix of subjective & mcq questions
          
          Response Structure Instructions :
          - Your final response would be a list containing {module_obj}, each {module_obj} for each heading. 
          - For the headings for which you are going to create tutorials you need to follow {module_obj} structure very strictly.
          - For module "Test Your Understanding" specifically follow {Test_Your_Understanding_Module} structure.
          - You cannot deviate in your response structure.
          - Your final response should be similar to {ideal_response} which must be of type Object.

          Your Task Are As Follows : 
            1. You need to generate content based on the headings/sub-heaings provided by the user from {data_file.id}, through which sales team can understand whole product ecosystem
              & it should help them in increasing the depth of the product & help sales team in their sale pitch.
            2. While creating the content, based on the headings/sub-headings provided by the user, you need to stick to the knowledge retreived from {data_file.id}.
            3. Set your creativity to 0.
            4. The amount of content generated should be of moderate length & not too short. It should have minimum 80 words per heading not less than that.
            5. If for a heading given by user you are not able to generate content, then use "Content Coming Shortly...".
            6. If there is some content which you think does not fit under any heading/sub-heading provided by the user, then you can generate a suitable heading/sub-heading for it & place your content by following {module_obj} structure.
            7. While generating content for given headings/sub-headings you need to mandatorily generate FAQ(Frequently Asked Questions), for that particular heading/sub-headings as well.
            8. Strictly Use meaningful key names & do not use numeric key such "0", "1" names for any value.
            9. Specifically in section "Test Your Understanding",you need to mandatorily create a set of atleast 10 questions 
            which would check the knowledge of the user whoever is going through the course. 
            These questions can be a mix of "Subjective" & "Multiple Choice Question(MCQ)" type. Follow {Test_Your_Understanding_Module} structure while creating it.
        ''',
          model="gpt-4-1106-preview",
          tools=[{
              "type": "retrieval",
          }],
          file_ids=[data_file.id]
          )
      
      message = client.beta.threads.messages.create(
          thread_id=thread.id,
          role="user",
          content=f''' 
          I have provided you with product document {data_file.id}. Now please provide me with a tutorial which helps my sales team who goes through it to understand about whole product ecosystem.
          You need to generate content for following headers mandatorily.
            1. About the Product
            2. Vision Behind The Product
            3. How To Onboard User On The Product
            4. Meeting Related Features
            5. User Settings & General Settings
            6. Integrations With Other Products
            7. Test Your Understanding
            8. You need to return response in a JSON format with suitable keys.
            If you find information which does not matches given topics, create a suitable heading/sub headings & generate the course for me.
            Provide FAQ as well for each section.
            In mandatory section "Test Your Understanding",you need to mandatorily create a set of atleast 5 questions which would check the knowledge of the user whoever is going through the course. 
            These questions should be strictly different from those present in the FAQ.
            Your response should strictly contain only the relevant tutorial & no other notes should be included.
            You cannot use placeholders for the content, you need to mandatorily provide content according to heading from {data_file.id}
            In the final response I want to see a list of {module_obj}, each {module_obj} in a list complete for all the headings generated by you.
            '''
          )
      run = client.beta.threads.runs.create(
      thread_id=thread.id,
      assistant_id=assistant.id,
      instructions = f''' '''
      )    

      # print("Assistant 149 run ====\n\n\n", message.json())
      # print("Assistant 149 run ====\n\n\n", assistant.json())
      # print("Assistant 149 run ====\n\n\n", run.json())
      while True:
        # wait until run completes
        while run.status in ['queued', 'in_progress']:
          run = client.beta.threads.runs.retrieve(
            thread_id=thread.id,
            run_id=run.id
          )
          time.sleep(2)

        # error
        if run.status == "failed":
          raise Exception("Run Failed. Error: ", run.last_error)
        # return assistant message
        else:
          messages = client.beta.threads.messages.list(
              thread_id = thread.id
          )
          return messages
    except Exception as e:
        raise e


def start_assistant(data_file):
  try:
    thread = client.beta.threads.create()
    messages = assistant_works(data_file, thread)
    # print("\n\n===FINAL ANSWER===\n\n", messages)
    assistant_answer = []

    # display assistant messages
    for message in reversed(messages.data):
        if message.role == 'assistant':
          assistant_answer.append(message.content[0].text.value)
        # print(message.role + " => " + message.content[0].text.value)
    print("\n\n===FINAL ASSISTANT ANSWER===\n\n", assistant_answer)
    return assistant_answer
  except Exception as e:
     raise e
  

def upload_file_openai(file_path):
    try:
        # file_path = os.path.join('uploads', filename)
        if(os.path.exists(file_path)):
            
            # Upload a file with an "assistants" purpose
            data_file = client.files.create(
            file=open(file_path, "rb"),
            purpose='assistants'
            )
            return data_file
        else :
            raise FileNotFoundError("Files Are Missing")
    except Exception as e:
        raise e
    

def improve_json_response(data):
    empty_msg = []
    response = client.chat.completions.create(
        model="gpt-4-1106-preview",
        response_format={ "type": "json_object" },
        messages=[
                {"role": "system", "content": f''' 
                You are a helpful assistant. 
                convert provided data into a valid JSON. Do not change content of data.
                 '''},
                {"role" :"user", "content" : data}
            ]
    )
    print("\n\n====correct json 2 ===== \n\n", response.json())
    return response.choices[0].message.content
