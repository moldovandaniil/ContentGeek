export const handleSubmit = async (selectedMethod, event, keywords, contentTypes,
     interests, selectedOption, selectedAd, setIsLoading, setShowNotification,
      setShowError, validateForm, errors, setErrors, setResponse, setIsResultReady) => {
    event.preventDefault();
    setIsLoading(true);
    setIsResultReady(false);

    const submitForm = async (event, data) => {
    event.preventDefault();
    const validationResult = validateForm(selectedMethod);
    setErrors(validationResult); 
    console.log(validationResult);
    
    if (Object.values(validationResult).some(value => value)) {
        setIsLoading(false);
        return;
    }
      console.log("Processing request...");
      try {
        const response = await fetch(`http://127.0.0.1:5000/${selectedMethod}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include"
          },
          body: JSON.stringify(data),
        });
  
        if (!response.ok) {
          setIsResultReady(false);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        setIsResultReady(true);
        const jsonResponse = await response.json();
        
        const jsonResponseSuggestion = jsonResponse.suggestion;
        console.log(jsonResponse);
        const formattedResponse = jsonResponseSuggestion.replace(/\\n/g, "\n").replace(/"/g, "");
        setResponse(formattedResponse);
        
        setShowNotification(true);
        setIsLoading(false);
      } catch (error) {
        setIsResultReady(false);
        setIsLoading(false);
        setShowError(true);
        console.error("There was a problem with the fetch operation:", error);
      }
    };
  
    if (selectedMethod === "incubator") {
    
        const data = {
          product: document.getElementById("product").value,
          audience: document.getElementById("audience").value,
          keywords: keywords,
          contentTypes: {
            productDescriptions: contentTypes.productDescriptions,
            videoAdScripts: contentTypes.videoAdScripts,
            platformSuggestions: contentTypes.platformSuggestions,
            improvedTargeting: contentTypes.improvedTargeting,
            productMottos: contentTypes.productMottos,
          },
          
        };  
        if(document.getElementById("mood")){
          data.mood=document.getElementById("mood").value
        }
        if(document.getElementById("platform")){
          data.platform=document.getElementById("platform").value
        }
        submitForm(event, data);
      }
    
    else if (selectedMethod === 'improver') {
      const data = {
        selectedOption: selectedOption,
        text: document.getElementById("improver-text").value,
      }
      if(selectedOption === "description"){
        if(document.getElementById("mood")){
          data.mood=document.getElementById("mood").value
        }
        if(document.getElementById("platform")){
          data.platform=document.getElementById("platform").value
        }
        if(document.getElementById("audience")){
          data.audience=document.getElementById("audience").value
        }
      }
      else{
        if(document.getElementById("mood")){
          data.mood=document.getElementById("mood").value
        }
        if(document.getElementById("platform")){
          data.platform=document.getElementById("platform").value
        }
        if(document.getElementById("aspectRatio")){
          data.ratio=document.getElementById("aspectRatio").value
          console.log(data.ratio)
        }
        if(document.getElementById("length")){
          data.length=document.getElementById("length").value
        }
      }
      
      submitForm(event, data)
    }
    
    else if (selectedMethod === "emailer") {
      const otherInputElement = document.getElementById("other");
      const data = {
        customerEmail: document.getElementById("improver-text").value,
        motive: document.getElementById("motive").value,
        otherLabel: otherInputElement.getAttribute("data-label"),
        otherValue: document.getElementById("other").value,
      };
    
      if (document.getElementById("customer-name")) {
        data.customerName = document.getElementById("customer-name").value;
      }
    
      if (document.getElementById("company-name")) {
        data.companyName = document.getElementById("company-name").value;
      }
    
      if (document.getElementById("product-name")) {
        data.productName = document.getElementById("product-name").value;
      }
    
      submitForm(event, data);
    }
    else if (selectedMethod === 'advisor') {
      const data = {
        interests:interests,
        selectedAd:selectedAd,
        videoScript:  document.getElementById("video-ad-script").value,
        pixel: document.getElementById("pixel").value,
        budget: document.getElementById("daily-budget").value,
      }
      if(document.getElementById("mood")){
        data.mood=document.getElementById("mood").value
      }
      if(document.getElementById("platform")){
        data.platform=document.getElementById("platform").value
      }
      if(document.getElementById("audience")){
        data.audience=document.getElementById("audience").value
      }
      if(document.getElementById("length")){
        data.length=document.getElementById("length").value
      }
      submitForm(event, data)
    }
  };
  