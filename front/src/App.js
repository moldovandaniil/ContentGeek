import React, { useState, useEffect } from 'react';
import './App.css';
import './component_css/SuccessNotification.css'
import './component_css/ResultsPopup.css'
import logo from './images/ContentGeekLogoTransparent.png'
import ImproverForm from './components/ImproverForm';
import Navbar from './components/Navbar.js'
import IncubatorForm from './components/IncubatorForm';
import Emailer from './components/Emailer';
import Advisor from './components/Advisor'
import Login from './components/Login'
import { handleSubmit } from './components/FormHandler';
import HintSection from './components/HintsSection';
import WelcomeForm from './components/WelcomeForm';
import SuccessNotification from './components/SuccessNotification';
import ErrorNotification from './components/ErrorNotification';
import ResultsPopup from './components/ResultsPopup';

function App() {
  const [keywords, setKeywords] = useState([]);
  const [interests, setInterests] = useState([])
  const [activeInput, setActiveInput] = useState('product');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [activeCheckboxHint, setActiveCheckboxHint] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedOption, setSelectedOption] = useState('description'); 
  const [showResultsPopup, setShowResultsPopup] = useState(false);
  const [selectedAd, setSelectedAd] = useState('tiktokAds');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);
  const [email, setEmail] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(isLoggedIn ? 'welcome' : 'incubator');
  const [userName, setUserName] = useState(null);
  const [showError, setShowError] = useState(false);
  const [errors, setErrors] = useState({ product: false, audience: false, checkbox: false,
     improverinput: false, emailerinput: false, advisorinput:false, budgetinput:false });
  const [showNotification, setShowNotification] = useState(false);
  const [contentTypes, setContentTypes] = useState({
    productDescriptions: false,
    videoAdScripts: false,
    platformSuggestions: false,
  improvedTargeting: false,
  productMottos: false,
  });

  useEffect(() => {
    setErrors({product: false, audience: false, checkbox: false, improverinput: false});
    setIsResultReady(false);
    setResponse(null);
  }, [selectedMethod]);
  

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [showError]);


  const handleInputMouseEnter = (inputName) => {
    setActiveInput(inputName);
  };
  
  const handleInputMouseLeave = () => {
    setActiveInput('');
  };

  const validateForm = (selected) => {
    let newErrors = { ...errors };
  
    const fieldIsEmpty = (id) => document.getElementById(id).value === '';
  
    if (selected === "incubator") {
      newErrors.product = fieldIsEmpty("product");
      newErrors.audience = fieldIsEmpty("audience");
      newErrors.checkbox = Object.values(contentTypes).every(value => !value);
    }
  
    if (selected === "improver") {
      newErrors.improverinput = fieldIsEmpty("improver-text");
    }
  
    if (selected === "emailer") {
      newErrors.emailerinput = fieldIsEmpty("improver-text");
    }
  
    if (selected === "advisor") {
      newErrors.advisorinput = fieldIsEmpty("video-ad-script");
      newErrors.budgetinput = fieldIsEmpty("daily-budget");
    }
  
    return newErrors;
  };
  
  
  const handleLogin = (loggedIn, name, email) => {
    setIsLoggedIn(loggedIn);
    if (loggedIn && name) {
      setEmail(email);
      setUserName(name);
      setSelectedMethod('welcome'); 
    }
    else if (loggedIn){
      setUserName(null);
      setEmail(null);
      setSelectedMethod('incubator');
    }
  };

  const checkboxHints = {
    productDescriptions: 'Generate product descriptions for your product or idea. Can be used on the website.',
    videoAdScripts: 'Generate video ad scripts for your product or idea. Can be used to advertise on various platforms.',
    platformSuggestions: 'Get platform suggestions for advertising your product or idea. Use if you think that your product is suited better for another platform than the one you currently use.',
    improvedTargeting: 'Receive improved targeting options for your advertisements. Use in case you want to target other categories other than your initial ones.',
    productMottos: 'Generate catchy product mottos for your product or idea. You can use them as headers on your website or copyright for your advertisment.',
  };

  const hints = {
    product: 'Enter the product name or idea you want to analyze. \nExample: "Neo HairShaver", "Soccer DogToy" etc.',
    audience: 'Enter the target audience for your product. \nExample: "50+ yo ladies", "Teenagers", "People within the age of 20-25 interested in soccer" etc.',
    keywords: 'Enter relevant keywords, separated by spaces. \nExample: "electric", "aesthetic" etc.',
    mood: 'Enter the desired mood for your product promotion. \nExample: "Happy", "Convincing", "Salesman" etc.',
    platform: 'Enter the platforms where you want to advertise your product.\nExample: "Facebook", "Instagram", "Tiktok" etc.',
    advanced: 'Expand the form to access advanced options.',
    incubator: 'Generate unique content for your product or idea.',
    improver: 'Optimize your existing content for better results.',
    script: 'Write in your text. Depending on the selected choice, it can be product description, email or the video ad script.',
    email: 'Write the email the user has sent you.',
    custname: 'Write the customer name in the input box.',
    compname: 'Write the company name in the input box.',
    prodname: 'Write the product name in the input box.',
    motive: 'Write the motive for the problem the user has described in the email.',
    other: 'Write the specified detail in the input box.',
    emailer: 'Improve the correspondence between you and your client with great customer support',
    advisor: 'Optimize your ad account management.',
    pixel: 'Describe the current status of your pixel.',
    interest: 'What interests were you targeting before.',
    budget: 'What daily budget are you aiming for.',
    ratio: 'What ratio do you prefer the most. (Facebook - 1:1; Tiktok - 9:16; \nInstagram - 4:5).'
  };

  const handleFocus = (e) => {
    setActiveInput(e.target.id);
  };

  const handleInterestInput = (e) => {
    if (e.key === ' ' || e.key === ',') {
      e.preventDefault();
      const newInterest = e.target.value.trim();
      if (newInterest !== '' && !interests.includes(newInterest)) {
        setInterests([...interests, newInterest]);
        e.target.value = '';
      }
    }else if (e.key === 'Backspace' && e.target.value === '') {
        setInterests(interests.slice(0, -1));
  };
  };

  const handleKeywordInput = (e) => {
    if (e.key === ' ') {
      e.preventDefault();
      const newKeyword = e.target.value.trim();
      if (newKeyword) {
        setKeywords([...keywords, newKeyword]);
        e.target.value = '';
      }
    } else if (e.key === 'Backspace' && e.target.value === '') {
      setKeywords(keywords.slice(0, -1));
    }
  };

  const handleAdvancedClick = () => {
    setShowAdvanced(!showAdvanced);
  };

  const handleCheckboxMouseEnter = (hint) => {
    setActiveCheckboxHint(hint);
  };

  const handleCheckboxChange = (event) => {
    setContentTypes({ ...contentTypes, [event.target.name]: event.target.checked });
  };

  const renderInputFields = () => {
    if (selectedMethod === 'incubator') {
      return(
        <>
        <IncubatorForm
          keywords={keywords}
          setKeywords={setKeywords}
          handleFocus={handleFocus}
          handleKeywordInput={handleKeywordInput}
          handleAdvancedClick={handleAdvancedClick}
          handleCheckboxMouseEnter={handleCheckboxMouseEnter}
          handleCheckboxChange={handleCheckboxChange}
          showAdvanced={showAdvanced}
          contentTypes={contentTypes}
          activeInput={activeInput}
          handleInputMouseEnter={handleInputMouseEnter} 
          handleInputMouseLeave={handleInputMouseLeave}
          errors={errors}
          setErrors={setErrors}
        />
        </>
      )
} else if (selectedMethod === 'improver') {
  return (
    <>
      <ImproverForm
      handleFocus={handleFocus}
       showAdvanced={showAdvanced}
       selectedOption={selectedOption}
       setSelectedOption={setSelectedOption}
       handleAdvancedClick={handleAdvancedClick}
       handleInputMouseEnter={handleInputMouseEnter} 
      handleInputMouseLeave={handleInputMouseLeave}
      errors={errors}
      setErrors={setErrors} 
      ></ImproverForm>
    </>
  );
}
else if (selectedMethod === "emailer"){
  return(
    <>
    <Emailer
    handleInputMouseEnter={handleInputMouseEnter} 
          handleInputMouseLeave={handleInputMouseLeave}
          showAdvanced={showAdvanced}
          errors={errors}
          setErrors={setErrors}  />
    </>
  )
}
else if (selectedMethod === "advisor"){
  return(
  <>
    <Advisor
          handleInputMouseEnter={handleInputMouseEnter} 
          handleInputMouseLeave={handleInputMouseLeave} 
          showAdvanced={showAdvanced}
          selectedAd={selectedAd}
          setSelectedAd={setSelectedAd}
          interests={interests}
          handleInterestInput={handleInterestInput}
          errors={errors}
          setErrors={setErrors}/>
  </>)
}
else if (selectedMethod === "welcome"){
  return(
    <>
    <WelcomeForm userName={userName}
     setIsLoggedIn={setIsLoggedIn}
      email={email}
      selectedMethod={selectedMethod}
      setSelectedMethod={setSelectedMethod}/>
    </>
  )
}


};
return (
    <>
    {!isLoggedIn && <Login onLogin={handleLogin} />}
    {isLoggedIn && (
      <>
      <div className="container">
      {selectedMethod !== "welcome" && (<>
      </>)}
      <header>
      <div className="logo-container">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" />
          </a>
        </div>
      </header>
      <main>
        <section className="content">
          <Navbar
            selectedMethod={selectedMethod}
            setSelectedMethod={setSelectedMethod}
            handleMouseEnter={handleInputMouseEnter}
            handleMouseLeave={handleInputMouseLeave}
            username={userName}
          />
          <div className={selectedMethod === "welcome" ? "form-section-welcome" : "form-section"}>
            <form id="input-form" >
              {renderInputFields()}
              {selectedMethod !== "welcome" && (<>
                <button
              type="button"
              className="advanced-button"
              onClick={handleAdvancedClick}
              onMouseEnter={() => handleInputMouseEnter('advanced')}
              onMouseLeave={handleInputMouseLeave}
                >
              {showAdvanced ? 'Hide Advanced' : 'Advanced'}
              </button>
              <button type="submit" className={isLoading ? "btn-processing" : ""} disabled={isLoading}
              onClick={(event) =>
                handleSubmit(selectedMethod, event, keywords, contentTypes,
                interests, selectedOption, selectedAd, setIsLoading, setShowNotification,
                 setShowError, validateForm, errors, setErrors, setResponse, setIsResultReady)}>
              {isLoading ? (
                <>
                Processing your request &nbsp; &nbsp;
                <i className="fas fa-spinner fa-spin"></i>
                </>
                
              ) : (
                'Submit'
              )}
              </button>
              {isResultReady && (<>
                <button
              type="button"
              className="show-results-button"
              onClick={() => setShowResultsPopup(true)}
              >
              Show Results
              </button>
              </>)}
              </>)}
            </form>
            {showError && <ErrorNotification message={"There was an error with the fetch request. Try again."}
            showError={showError} setShowError={setShowError}/>}
            {showNotification && <SuccessNotification message={"The query was successful!"}
            showNotification={showNotification} setShowNotification={setShowNotification}/>}
          </div>

          
            <HintSection
            activeInput={activeInput}
            activeCheckboxHint={activeCheckboxHint}
            hints={hints}
            checkboxHints={checkboxHints}
            selectedMethod={selectedMethod}
          />           
        </section>
      </main>
      </div>
      </>
    )}
    {showResultsPopup && isResultReady && (
  <ResultsPopup onClose={() => setShowResultsPopup(false)}
  response={response}
  email={email} />
)}

      
  </>
  );
  }

export default App;