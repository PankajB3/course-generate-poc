// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [ai_response, setResponse] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const[keyArray, setKeyArray] = useState([])

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async () => {
//     if (!file) {
//       alert('Please select a PDF file');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     setIsLoading(true);

//     try {
//       let ai_data;
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       console.log(response?.data);
//       try{
//         ai_data = JSON.parse(response?.data?.message);
//         console.log(ai_data);
//         console.log("\nTypeOf Response\n", typeof ai_data );
//         setKeyArray(Object.keys(ai_data))
//         // setKeyArray(Object.keys(response))

//       }catch(err){
//         console.error('Error uploading file:', err)
//       }

//       console.log("data", ai_data);
//       setResponse(ai_data);
//       console.log(typeof ai_response);
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       // alert('Error uploading file:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   // const renderDiv = () => {
//     // if( typeof ai_response != Object) {
//     //   return <div>
//     //     <h2>Try Again</h2>
//     //   </div>
//     // }
//   //   if(Object.keys(ai_response).length > 0){
//   //     console.log("Executing");
//   //     return Object.keys(ai_response).map((eachKey) => {
//   //       <div key={eachKey}>
//   //         <h3>{eachKey}</h3>
//   //         <p>{ai_response[eachKey]}</p>
//   //       </div>
//   //     })
//   //   }
//   // }

//   const createMyDiv = (responseObj) => {
//     return Object.keys(responseObj[eachKey]).map((innerKey) => (
//       <div key={innerKey}>
//         <h4>{innerKey}</h4>
//         <p>{JSON.stringify(responseObj[eachKey][innerKey])}</p>
//       </div>
//     ))
//   }

//   const renderDiv = () => {
//     if (Object.keys(ai_response).length === 0) {
//       return (
//         <div>
//           <h2>Try Again</h2>
//         </div>
//       );
//     }
  
//     console.log("Executing");
//     return Object.keys(ai_response).map((eachKey) => (
//       <div>
//         <h3>{eachKey}</h3>
//         {
//           typeof ai_response[eachKey] === 'object' && eachKey != "Test Your Understanding" ? (
//           <>
//           {/* <p>{JSON.stringify(ai_response[eachKey])}</p> */}
//           {
//           Object.keys(ai_response[eachKey]).map((innerKey) => (
//             <div key={innerKey}>
//               <h4>{eachKey} {innerKey}</h4>
              
//               {/* <p>InnerK ELE{JSON.stringify(ai_response[eachKey][innerKey])}</p> */}
//               {
//                 typeof ai_response[eachKey][innerKey] === 'object' ? <> 
//                 {
//                   Object.keys(ai_response[eachKey][innerKey]).map((index) => (
//                     <div key={index}>
//                       {/* <h4>{index}</h4> */}
//                       {/* <p>Inner Index = {JSON.stringify(ai_response[eachKey][innerKey][index])}</p> */}
//                       <div> { typeof ai_response[eachKey][innerKey][index] == 'object' ? 
//                       <>
//                         {
//                           Object.keys(ai_response[eachKey][innerKey][index]).map((eachIndex) => (
//                             <div key={eachIndex}>
                                
//                                 <p><b>{eachIndex}</b> {JSON.stringify(ai_response[eachKey][innerKey][index][eachIndex])}</p>
//                             </div>  
//                           ))
//                         }
//                       </> 
//                       : <> {JSON.stringify(ai_response[eachKey][innerKey][index])} </> } 
//                       </div>
//                     </div>
//                   ))
//                 }
//                 </> : <>{JSON.stringify(ai_response[eachKey][innerKey])}</>
//               }
//             </div>
//           ))}
//           </>
          
//         ) : (
//           <p></p>
//         )}
//         {
//           typeof ai_response[eachKey] === 'object' && eachKey == "Test Your Understanding" ? 
//           <div>
//             {
//               typeof ai_response[eachKey] == 'object' ? 
//               <>
//                 {
//                   Object.keys(ai_response[eachKey]).map((qIndex) => (
//                   <div key={qIndex}>
//                     {/* <h4>{JSON.stringify(qIndex)}</h4> */}
//                     <> 
//                     {/* QQQ{JSON.stringify(ai_response[eachKey][qIndex])}  */}
                    
//                       {
//                         Object.keys(ai_response[eachKey][qIndex]).map((ip) => (
//                         <div>
//                           <p> <b>Question : </b> {JSON.stringify(ai_response[eachKey][qIndex][ip].Q)}</p>
//                             {/* <p>Options{JSON.stringify(ai_response[eachKey][qIndex][ip].Options)}</p> */}
//                             {/* <p>Correct Answer{JSON.stringify(ai_response[eachKey][qIndex][ip]["Correct Answer"])}</p> */}
//                         </div>
//                         ))
//                       }
//                     </>
//                     <>
//                       {
//                         Object.keys(ai_response[eachKey][qIndex]).map((ea) => (
//                         <div key={ea}>
//                             <p><b>Question : </b> {JSON.stringify(ai_response[eachKey][qIndex][ea].Q)}</p>
//                             {/* <p>Options{JSON.stringify(ai_response[eachKey][qIndex][ea].Options)}</p>
//                             <p>Correct Answer{JSON.stringify(ai_response[eachKey][qIndex][ea]["Correct Answer"])}</p> */}
//                         </div>
//                         ))
//                       }
//                     </>
//                     {/* Listing Questions Out */}
//                     <> 
//                       {
//                         Object.keys(ai_response[eachKey][qIndex]).map((innerQIndex) => (
//                           <div key={innerQIndex}>
//                             {/* {JSON.stringify(ai_response[eachKey][qIndex][innerQIndex])} */}
//                             {
//                               Object.keys(ai_response[eachKey][qIndex][innerQIndex]).map(pa => (
//                                 <div key={pa}>
//                                   <>{JSON.stringify(ai_response[eachKey][qIndex][pa])}</>
//                                 </div>
//                               ))
//                             }
//                           </div>
//                         ))
//                       }
//                     </>
//                   </div>))
//                 }
//               </> : <></>
//             }
//           </div> : <></>
//         }
//       </div>
//     ));
//   };  

 
  
  
  

//   return (
//     <div className="App">
//       <h1>AI Course Creator</h1>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={handleSubmit} disabled={isLoading}>
//         Submit
//       </button>

//       {isLoading && <p>We Are Working On Creating Your Course Content...</p>}

//       {Object.keys(ai_response).length > 0 && (
//         <div className="response-content">
//           <h2>Course :</h2>
//           {/* <div className="response-content"> */}
//             {/* <pre>{JSON.stringify(ai_response, null, 2)}</pre> */}
//           {/* </div> */}
//           {renderDiv()}
//           {/* {displayResponseBeautify()} */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;




// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [file, setFile] = useState(null);
//   const [aiResponse, setAiResponse] = useState({});
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   // const handleSubmit = async () => {
//   //   if (!file) {
//   //     alert('Please select a PDF file');
//   //     return;
//   //   }

//   //   const formData = new FormData();
//   //   formData.append('file', file);

//   //   setIsLoading(true);

//   //   try {
//   //     const response = await axios.post('http://localhost:5000/upload', formData, {
//   //       headers: {
//   //         'Content-Type': 'multipart/form-data',
//   //       },
//   //     });

//   //     const aiData = JSON.parse(response?.data?.message);

//   //     console.log("AI Data:", aiData);
//   //     setAiResponse(aiData);
//   //   } catch (error) {
//   //     console.error('Error uploading file:', error);
//   //   } finally {
//   //     setIsLoading(false);
//   //   }
//   // };
//   const handleSubmit = async () => {
//     if (!file) {
//       alert('Please select a PDF file');
//       return;
//     }
  
//     const formData = new FormData();
//     formData.append('file', file);
  
//     setIsLoading(true);
  
//     try {
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
  
//       const aiData = response?.data?.message;
  
//       try {
//         const parsedData = JSON.parse(aiData);
  
//         if (parsedData && typeof parsedData === 'object' && parsedData.tutorial) {
//           setAiResponse(parsedData);
//         } else {
//           console.error('Invalid data format received from API:', parsedData);
//           // Handle the error, show a message, or take appropriate action
//         }
//       } catch (parseError) {
//         alert('Error parsing API response:')
//         console.error('Error parsing API response:', parseError);
//         // location.reload()
//         // Handle the parsing error, show a message, or take appropriate action
//       }
//     } catch (error) {
//       alert('Error uploading file:')
//       console.error('Error uploading file:', error);
//       // location.reload()
//       // Handle the API request error, show a message, or take appropriate action
//     } finally {
//       setIsLoading(false);
//       // location.reload()
//     }
//   };

//   const renderDiv = () => {
//     if (Object.keys(aiResponse).length === 0 || (Array.isArray(aiResponse) && aiResponse.length === 0)) {
//       return (
//         <div>
//           <h2>Oops, Assistant Failed To Generate Content</h2>
//         <p>Please Try Again Later</p>
//         </div>
//       );
//     }
  

//     return aiResponse.tutorial.map((item, index) => (
//       <div key={index} style={{border:"2px solid black", boxShadow:"2px grey"}}>
//         <h3>{item.title}</h3>
//         <p>{item.content}</p>
//         {Array.isArray(item.FAQ) && item.FAQ.length > 0 && (
//           <div>
//             <h4>FAQs</h4>
//             {item.FAQ.map((faq, faqIndex) => (
//               <div key={faqIndex}>
//                 <p><b>Question:</b> {faq.Question}</p>
//                 <p><b>Answer:</b> {faq.Answer}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     ));
//   };

//   return (
//     <div className="App">
//       <h1>AI Course Creator</h1>
//       <input type="file" accept=".pdf" onChange={handleFileChange} />
//       <button onClick={handleSubmit} disabled={isLoading}>
//         Submit
//       </button>

//       {isLoading && <p>We Are Working On Creating Your Course Content...</p>}

//       {Object.keys(aiResponse).length > 0 && (
//         <div className="response-content">
//           <h2>Course :</h2>
//           {renderDiv()}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [aiResponse, setAiResponse] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      alert('Please select a PDF file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const aiData = response?.data?.message;

      try {
        const parsedData = JSON.parse(aiData);

        if (parsedData && typeof parsedData === 'object' && parsedData.tutorial) {
          setAiResponse(parsedData);
        } else {
          console.error('Invalid data format received from API:', parsedData);
          // Handle the error, show a message, or take appropriate action
        }
      } catch (parseError) {
        alert('Error parsing API response:');
        console.error('Error parsing API response:', parseError);
        // Handle the parsing error, show a message, or take appropriate action
      }
    } catch (error) {
      alert('Error uploading file:');
      console.error('Error uploading file:', error);
      // Handle the API request error, show a message, or take appropriate action
    } finally {
      setIsLoading(false);
    }
  };

  const renderDiv = () => {
    if (Object.keys(aiResponse).length === 0 || (Array.isArray(aiResponse) && aiResponse.length === 0)) {
      return (
        <div>
          <h2>Oops, Assistant Failed To Generate Content</h2>
          <p>Please Try Again Later</p>
        </div>
      );
    }

    return aiResponse.tutorial.map((item, index) => (
      <div key={index} style={{ border: "2px solid black", boxShadow: "2px grey", marginBottom: "20px" }}>
        <h3>{item.title}</h3>
        <p>{item.content}</p>
        {Array.isArray(item.FAQ) && item.FAQ.length > 0 && (
          <div>
            <h4>FAQs</h4>
            {item.FAQ.map((faq, faqIndex) => (
              <div key={faqIndex}>
                <p><b>Question:</b> {faq.Question}</p>
                <p><b>Answer:</b> {faq.Answer}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    ));
  };

  return (
    <div className="App">
      <h1>AI Course Creator</h1>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      <button onClick={handleSubmit} disabled={isLoading}>
        Submit
      </button>

      {isLoading && <p>We Are Working On Creating Your Course Content...</p>}

      {Object.keys(aiResponse).length > 0 && (
        <div className="response-content">
          <h2>Course :</h2>
          {renderDiv()}
        </div>
      )}
    </div>
  );
}

export default App;
