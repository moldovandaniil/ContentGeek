import React, { useState } from 'react';
import '../component_css/SuccessNotification.css';

const SuccessNotification = ({ message, showNotification, setShowNotification }) => {


  const handleClose = () => {
    setShowNotification(false);
  };

  return (
    showNotification && (
      <div className="alert success-alert">
        <h3 className="alert-text">{message}</h3>
        <a className="close" onClick={handleClose}>
          &times;
        </a>
      </div>
    )
  );
};

export default SuccessNotification;

