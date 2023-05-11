import React, { useEffect, useState, useRef } from 'react';
import '../App.css';
import logo from '../images/ContentGeekLogoTransparent.png';
import jwt_decode from 'jwt-decode';

const Login = ({ onLogin }) => {
  const [isReadyToDisplay, setIsReadyToDisplay] = useState(false);
  const [typingText, setTypingText] = useState('');
  const typingTextRef = useRef(null);

  const messages = [
    "Let's create some new video ad scripts for your winning product!",
    "Let's write a smooth and catchy tagline for your new website!",
    "Let's brainstorm some fresh social media content ideas. Now!",
    "Let's optimize your website's landing page for better conversions!",
    "Let's write the perfect product description for your online store!",
    "Let's craft a compelling email campaign to boost your sales!",
    "Let's improve your ad strategy and get more sales and better ROI!"
  ];

  useEffect(() => {
    const delay = setTimeout(() => {
      setIsReadyToDisplay(true);
      initGoogleSignIn();
      setTypingText(messages[Math.floor(Math.random() * messages.length)]);
    }, 500); 

    return () => clearTimeout(delay);
  }, []);

  const initGoogleSignIn = () => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "455123638989-s2ph1nvvpqu2kg6m8tfvdg15m5iplqvh.apps.googleusercontent.com",
      callback: callback,
    });

    google.accounts.id.renderButton(
      document.getElementById('google-signin-button'),
      { theme: 'filled-black', size: 'large', shape: 'pill' },
    );
  };

  const callback = async (response) => {
    console.log('This is our JWT response token with encoded credentials: ' + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    onLogin(true, userObject.name, userObject.email);
     try {
        const response = await fetch(`http://127.0.0.1:5000/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: userObject.name,
            email: userObject.email,
          }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        const jsonResponseUsers = jsonResponse.users;
        console.log(jsonResponse);
        if(jsonResponse.status==="success"){
          console.log(userObject.name)
          console.log(jsonResponseUsers)
        }
        else{
          console.log("authentication error")
        }
        
      } catch (error) {

        console.error("There was a problem with the fetch operation:", error);
      } 

      
    };

  const guestLogin = () => {
    onLogin(true);
  };



  return (
    isReadyToDisplay && (
      <>
        <div className="logo-container">
          <a href="/" className="logo">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="login-container">
          <h1 className="login-header" data-text="ContentGeek - Your Copyright Helper">
            <span>ContentGeek - Your Copyright Helper</span>
          </h1>
          <p ref={typingTextRef} className="typing-text">{typingText}</p>
           <div className="google parent">
            <div id="google-signin-button"></div>
          </div>
          <div className="or-container">
            <p>or</p>
          </div>
          <button className="guest-login-button" onClick={guestLogin}>
            Log in as a guest
          </button>
        </div>
      </>
    )
  );
};

export default Login;
