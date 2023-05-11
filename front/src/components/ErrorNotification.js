import React, { useState } from 'react';
import '../component_css/SuccessNotification.css';

const ErrorNotification = ({ message, showError, setShowError }) => {


  const handleClose = () => {
    setShowError(false);
  };

  return (
    showError && (
      <div className="alert danger-alert">
        <h3 className="alert-text">{message}</h3>
        <a className="close" onClick={handleClose}>
          &times;
        </a>
      </div>
    )
  );
};

export default ErrorNotification;
