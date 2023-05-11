import React, { useState } from 'react';

function AdvisorForm({
  handleInputMouseEnter,
  handleInputMouseLeave,
  showAdvanced,
  selectedAd,
  setSelectedAd,
  interests,
  handleInterestInput,
  errors,
  setErrors
}) {
  const [pixel, setPixel] = useState('new');
  const [length, setLength] = useState(10);

  const [triedOptions, setTriedOptions] = useState({
    costCaps: false,
    aco: false,
    cbo: false,
  });

  const handleTriedOptionChange = (event) => {
    const { name, checked } = event.target;
    setTriedOptions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleInputChange = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

const handleLengthChange = (e) => {
  setLength(e.target.value);
};

  const handlePixelChange = (event) => {
    setPixel(event.target.value);
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
        <h1 className="title-header" data-text="Advisor">
            <span>Advisor</span>
        </h1>
         <p className="title-typing-text">Optimize your ad account management.</p>
      </div>
      <div className="form-group">
        <div className="option-selector">
          <button
          type="button"
            className={`option-button ${
              selectedAd === 'tiktokAds' ? 'active' : ''
            }`}
            onClick={() => setSelectedAd('tiktokAds')}
          >
            TikTok Ads
          </button>
          <button
          type="button"
            className={`option-button ${
              selectedAd === 'facebookAds' ? 'active' : ''
            }`}
            onClick={() => setSelectedAd('facebookAds')}
          >
            Facebook Ads
          </button>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="video-ad-script" className={errors.advisorinput ? 'error' : ''}>Video Ad Script:</label>
        <textarea
          id="video-ad-script"
          className={`improver-input${errors.advisorinput ? ' error' : ''}`}
          rows="10"
          cols="50"
          onChange={() => handleInputChange('advisorinput')}
          placeholder="e.g. The first 10 seconds I want to advertise horizontally..."
          onMouseEnter={() => handleInputMouseEnter('script')}
          onMouseLeave={handleInputMouseLeave}
        ></textarea>
        {errors.advisorinput && <span className="error-message">Text area cannot be empty</span>}
      </div>
      
      <div className="form-group-inline">
      <div className="form-group">
          <label htmlFor="pixel">Pixel:</label>
          <select
            id="pixel"
            value={pixel}
            onChange={handlePixelChange}
            className="custom-input"
            onMouseEnter={() => handleInputMouseEnter('pixel')}
            onMouseLeave={handleInputMouseLeave}
          >
            <option value="new">🧪 &nbsp; New</option>
            <option value="warmedUp">🧪 &nbsp; Warmed up</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="daily-budget" className={errors.budgetinput ? 'error' : ''}>Daily Budget (USD):</label>
          <input
            type="number"
            id="daily-budget"
            className={`improver-input${errors.dailybudget ? ' error' : ''}`}
            onChange={() => handleInputChange('budgetinput')}
            onMouseEnter={() => handleInputMouseEnter('budget')}
            onMouseLeave={handleInputMouseLeave}
            placeholder="e.g. 50$"
          />
          {errors.budgetinput && <span className="error-message">Daily budget cannot be empty</span>}
        </div>
        
      </div>
      {showAdvanced && (
        <>
          <div className="form-group">
  <label htmlFor="interests">Interests</label>
  <div className="keywords-container">
    {interests.map((interest, index) => (
      <span key={index} className="keyword">
        {interest}
      </span>
    ))}
    <input
  type="text"
  id="interests"
  name="interests"
  onKeyDown={handleInterestInput}
  onMouseEnter={() => handleInputMouseEnter('interest')}
  onMouseLeave={handleInputMouseLeave}
  placeholder="e.g. electric hair shaver"
/>
  </div>
</div>
          {pixel === 'warmedUp' && (
            <div className="tried-options">
            <label>I have tried:</label>
            <div className="checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="costCaps"
                  checked={triedOptions.costCaps}
                  onChange={handleTriedOptionChange}
                />
                Cost Caps
              </label>
              <label>
                <input
                  type="checkbox"
                  name="aco"
                  checked={triedOptions.abo}
                  onChange={handleTriedOptionChange}
                />
                Automated Creative Optimization
              </label>
              <label>
                <input
                  type="checkbox"
                  name="cbo"
                  checked={triedOptions.cbo}
                  onChange={handleTriedOptionChange}
                />
                Campaign Budget Optimization
              </label>
            </div>
          </div>
          )}
          <div className="form-group">
  <label htmlFor="video-length">Video Length (seconds): {length}</label>
  <input
    type="range"
    id="video-length"
    name="video-length"
    min="10"
    max="900"
    value={length}
    onChange={handleLengthChange}
    onMouseEnter={() => handleInputMouseEnter('videoLength')}
    onMouseLeave={handleInputMouseLeave}
  />
</div>
        </>
      )}
    </>
  );
}

export default AdvisorForm;
