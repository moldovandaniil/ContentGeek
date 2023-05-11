
import React, {useState, useEffect} from "react";
import "../component_css/ResultsPopup.css";
import SuccessNotification from "./SuccessNotification";

const ResultsPopup = ({ onClose, response, email}) => {

    const [copySuccessNotification, setCopySuccessNotification] = useState(false);
    const [saveSuccessNotification, setSaveSuccessNotification] = useState(false)

    const copyToClipboard = () => {
    navigator.clipboard.writeText(response).then(
      () => {
        console.log("Text copied to clipboard successfully!");
        setCopySuccessNotification(true);
      },
      (err) => {
        setCopySuccessNotification(false);
        console.error("Failed to copy text: ", err);
      }
    );
  };

  useEffect(() => {
    if (copySuccessNotification) {
      const timer = setTimeout(() => {
        setCopySuccessNotification(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }

    if (saveSuccessNotification) {
        const timer = setTimeout(() => {
          setSaveSuccessNotification(false);
        }, 3000); 
        return () => clearTimeout(timer);
      }
  }, [copySuccessNotification, saveSuccessNotification]);

  const saveFormData = async () => {
    try {
        const fetchResponse = await fetch(`http://127.0.0.1:5000/addForm`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            form: response,
            email: email,
          }),
        });
  
        if (!fetchResponse.ok) {
          throw new Error(`HTTP error! status: ${fetchResponse.status}`);
        }
        const jsonResponse = await fetchResponse.json();
        const jsonResponseUsers = jsonResponse.users;
        console.log(jsonResponse);
        if(jsonResponse.status==="success"){
          setSaveSuccessNotification(true)
          console.log("You added the form successfully!", jsonResponse.users)
        }
        else{
          setSaveSuccessNotification(false)
          console.log("authentication error")
        }
        
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      } 


  }

  return (
    <div className="results-popup" onClick={onClose}>
        <div className="results-popup-content" onClick={(e) => e.stopPropagation()}>
            {response}
            <div className="buttons-container">
            <button onClick={copyToClipboard} className="copy-button">
                Copy to Clipboard
            </button>
            <SuccessNotification message={"You successfully copied the message!"}
            showNotification={copySuccessNotification}
            setShowNotification={setCopySuccessNotification}/>
            <SuccessNotification message={"You successfully saved the data!"}
            showNotification={saveSuccessNotification}
            setShowNotification={setSaveSuccessNotification}/>
            {email && (
            <button onClick={saveFormData} className="save-button">Save the Data</button>    
            )}
            </div>
        </div>
    </div>
    
  );
};

export default ResultsPopup;
