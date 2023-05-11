import React, { useState } from 'react';

function Emailer({handleInputMouseEnter, handleInputMouseLeave, showAdvanced, errors, setErrors}) {
  const [motive, setMotive] = useState('shipmentDelay');
  const [otherLabel, setOtherLabel] = useState('Tracking number');

  const handleMotiveChange = (event) => {
    const selectedMotive = event.target.value;
    setMotive(selectedMotive);

    if (selectedMotive === 'shipmentDelay') {
      setOtherLabel('Tracking number');
    } else if (selectedMotive === 'badReview') {
      setOtherLabel('Refund Form');
    } else if (selectedMotive === 'refund') {
      setOtherLabel('Refund Form');
    }
  };

  const handleInputChange = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

{/* <label htmlFor="improver-text" className={errors.improverinput ? 'error' : ''}>Enter your text:</label>
<textarea
       id="improver-text"
       className={`improver-input${errors.improverinput ? ' error' : ''}`}
       placeholder="e.g. GoShavy Hair Shaver is the greatest hair shave on the market..."
       rows="10"
       cols="50"
       onChange={() => handleInputChange('improverinput')}
       onMouseEnter={() => handleInputMouseEnter('script')} 
              onMouseLeave={handleInputMouseLeave} 
     ></textarea>
     {errors.improverinput && <span className="error-message">Text area cannot be empty</span>}
</div> */}


  return (
    <>
      <div className="title-container">
        <h1 className="title-header" data-text="Emailer">
            <span>Emailer</span>
        </h1>
        <p className="title-typing-text">Improve the corresponde between you and your client.</p>
      </div>
      <div className="form-group">
        <label htmlFor="customer-email" className={errors.emailerinput ? 'error' : ''}>Customer email:</label>
        <textarea
       id="improver-text"
       className={`improver-input${errors.emailerinput ? ' error' : ''}`}
       rows="10"
       cols="50"
       onChange={() => handleInputChange('emailerinput')}
       placeholder="e.g. Where is my order?"
       onMouseEnter={() => handleInputMouseEnter('script')} 
              onMouseLeave={handleInputMouseLeave} 
     ></textarea>
          {errors.emailerinput && <span className="error-message">Text area cannot be empty</span>}
      </div>
      <div className="form-group-inline">
        <div className="form-group">
          <label htmlFor="motive">Motive</label>
          <select id="motive" value={motive} onChange={handleMotiveChange} onMouseEnter={() => handleInputMouseEnter('motive')}
          onMouseLeave={handleInputMouseLeave} className="custom-input">
            <option value="shipmentDelay">📦 &nbsp; Shipment delay</option>
            <option value="badReview">📦 &nbsp; Bad Quality</option>
            <option value="refund">📦 &nbsp; Asking for Refund</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="other">{otherLabel}</label>
          <input type="text" data-label={otherLabel} id="other" className="custom-input" 
          onMouseEnter={() => handleInputMouseEnter('other')}
          onMouseLeave={handleInputMouseLeave}
          placeholder="e.g. CJ753492ASD832"/>
        </div>
      </div>
      {showAdvanced && (
        <div className="form-group-inline">
          <div className="form-group">
            <label htmlFor="customer-name">Customer Name</label>
            <input type="text" id="customer-name" className="advanced-input" onMouseEnter={() => handleInputMouseEnter('custname')}
          onMouseLeave={handleInputMouseLeave} placeholder="e.g. Daniel Craig"/>
          </div>
          <div className="form-group">
            <label htmlFor="company-name">Company Name</label>
            <input type="text" id="company-name" className="advanced-input" onMouseEnter={() => handleInputMouseEnter('compname')}
          onMouseLeave={handleInputMouseLeave} placeholder="e.g. Rosela"/>
          </div>
          <div className="form-group">
            <label htmlFor="product-name">Product Name</label>
            <input type="text" id="product-name" className="advanced-input" onMouseEnter={() => handleInputMouseEnter('prodname')}
          onMouseLeave={handleInputMouseLeave} placeholder="e.g. GoShavy Hair Shaver"/>
          </div>
        </div>
      )}
    </>
  );
}

export default Emailer;
