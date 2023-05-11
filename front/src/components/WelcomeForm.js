import React, { useEffect, useState } from "react";


const WelcomeForm = ({ userName, setIsLoggedIn, email, selectedMethod, setSelectedMethod}) => {
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const [formIsEmpty, setFormIsEmpty] = useState(false);
  const [isSuggestionLoading, setIsSuggestionLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);

  const handleIncubatorClick = () => {
    setSelectedMethod("incubator")
  }
  

  const getSuggestions = async () => {
    console.log("-----------------------------------")
    setFormIsEmpty(false)
    console.log("This is the email: - ", email)
    console.log("Inside the getSuggestion()");
    try {
      const fetchResponse = await fetch(`http://127.0.0.1:5000/fetchData`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      if (!fetchResponse.ok) {
        throw new Error(`HTTP error! status: ${fetchResponse.status}`);
      }
      const jsonResponse = await fetchResponse.json();
      const suggestion = jsonResponse.suggestion;
      setSuggestions(suggestion.split("; "));
      setSuggestions(suggestion.split(";"));
      console.log("Status: ", jsonResponse.status)

      if(jsonResponse.status === "empty_form_data"){
        setFormIsEmpty(true);
        setIsSuggestionLoading(false);
        return;
      }

      if (jsonResponse.status === "success") {
        setIsSuggestionLoading(false);
        suggestions.forEach((suggestionItem, index) => {
          console.log(`Suggestion ${index + 1}:`, suggestionItem);
        });
      } else {
        console.log("authentication error");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
    console.log("+++++++++++++++++++++++++++++++++++")
  };

  useEffect(() => {
    if (selectedMethod === "welcome") {
      setIsSuggestionLoading(true);
      const timer = setTimeout(() => {
        getSuggestions();
      }, 3000);
    } else {
      setIsSuggestionLoading(false);
    }
  }, [selectedMethod]); 

  return (
    <>
      <div className="title-container">
        <h1 className="title-header" data-text={`${userName}, Welcome Back!`}>
          <span>{userName}, Welcome Back!</span>
        </h1>
        <button className="logout-button" href="/">Logout</button>
        {isSuggestionLoading && !formIsEmpty ? (
          <>
            <div className="loading-container">
              <span>Loading your suggestions </span>
              <i className="fas fa-spinner fa-spin"></i>
            </div>
          </>
      ) : (!formIsEmpty &&
        <>
        <div className="suggestion-container">
        <div className="suggestion">
            {suggestions[0]}
        </div>
        <div className="suggestion">
                {suggestions[1]}
        </div>
        <div className="suggestion">
            {suggestions[2]}
        </div>
        </div>
        </>
      )}
      {formIsEmpty && (<>
      <div className="empty-container">
        <span>Your Form is empty. Seems like there is no previous input you've saved!</span>
        <br />
          Let's move to the{" "}
          <span
            className="incubator-link"
            onClick={handleIncubatorClick}
            style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
          >
            Incubator Form
          </span>{" "}
          to generate your first copyright!
      </div>
      </>)}
      </div>

    </>
  );
};

export default WelcomeForm;
