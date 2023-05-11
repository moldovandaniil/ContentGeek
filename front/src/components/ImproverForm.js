import React, { useState } from 'react';

function ImproverForm({handleFocus, showAdvanced, selectedOption, setSelectedOption, handleAdvancedClick, handleInputMouseEnter, 
    handleInputMouseLeave, errors, setErrors }) {


  const [length, setLength] = useState(10);

  const handleLengthChange = (e) => {
    setLength(e.target.value);
  };

  const handleInputChange = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };

  const renderAdvancedOptions = () => {
    if (!showAdvanced) return null;

    if (selectedOption === 'description') {
      return (
        <div className="advanced-options">
<div className="form-group-inline">
            <div className="form-group">
              <label htmlFor="mood">Mood</label>
              <select id="mood"
               name="mood"
               onFocus={handleFocus}
               onMouseEnter={() => handleInputMouseEnter('mood')}
               onMouseLeave={handleInputMouseLeave}>
                <option value="friendly">😊 &nbsp; Friendly</option>
                <option value="professional">🧳 &nbsp; Professional</option>
                <option value="convincing">🧔 &nbsp; Convincing</option>
                <option value="girly">💅 &nbsp; Girly</option>
                <option value="luxury">🎩 &nbsp; Luxury</option>
                <option value="empathetic">🤗 &nbsp; Empathetic</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select id="platform"
               name="platform"
               onFocus={handleFocus}
              onMouseEnter={() => handleInputMouseEnter('platform')}
              onMouseLeave={handleInputMouseLeave}>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">Tiktok</option>
                <option value="snapchat">Snapchat</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="audience">Target Audience</label>
            <input
          placeholder="e.g. 50+ yo ladies"
          type="text"
          id="audience"
          name="audience"
          onFocus={handleFocus}
          onMouseEnter={() => handleInputMouseEnter('audience')} 
              onMouseLeave={handleInputMouseLeave} 
        />
      </div>
        </div>
      );
    } else if (selectedOption === 'ad') {
      return (
        <div className="advanced-options">
          <div>
        <div className="form-group-inline">
        <div className="form-group">
              <label htmlFor="mood">Mood</label>
              <select id="mood"
               name="mood"
               onFocus={handleFocus}
               onMouseEnter={() => handleInputMouseEnter('mood')}
               onMouseLeave={handleInputMouseLeave}>
                <option value="friendly">😊 &nbsp; Friendly</option>
                <option value="professional">🧳 &nbsp; Professional</option>
                <option value="convincing">🧔 &nbsp; Convincing</option>
                <option value="girly">💅 &nbsp; Girly</option>
                <option value="luxury">🎩 &nbsp; Luxury</option>
                <option value="empathetic">🤗 &nbsp; Empathetic</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="platform">Platform</label>
              <select id="platform"
               name="platform"
               onFocus={handleFocus}
              onMouseEnter={() => handleInputMouseEnter('platform')}
              onMouseLeave={handleInputMouseLeave}>
                <option value="facebook">Facebook</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">Tiktok</option>
                <option value="snapchat">Snapchat</option>
              </select>
            </div>
          <div className="form-group">
            <label htmlFor="aspectRatio">Aspect Ratio</label>
            <select id="aspectRatio" name="aspectRatio"
             onFocus={handleFocus}
             onMouseEnter={() => handleInputMouseEnter('ratio')}
             onMouseLeave={handleInputMouseLeave}>
            <option value="4:5">🖼 &nbsp; 4:5</option>
            <option value="9:16">🖼 &nbsp; 9:16</option>
            <option value="1:1">🖼	 &nbsp; 1:1</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="length">Length (seconds): {length}</label>
          <input
            type="range"
            id="length"
            name="length"
            min="10"
            max="900"
            value={length}
            onChange={handleLengthChange}
          />
        </div>
      </div>
        </div>
      );
    }
  };

  return (
    <>
            <div className="title-container">
        <h1 className="title-header" data-text="Improver">
            <span>Improver</span>
          </h1>
           <p className="title-typing-text">Optimize your content for better results.</p>
        </div>
    <div className="form-group">
      <div className="option-selector">
        <button
        type="button"
          className={`option-button ${
            selectedOption === 'description' ? 'active' : ''
          }`}
          onClick={() => setSelectedOption('description')}
        >
          Improve my product description
        </button>
        <button
        type="button"
          className={`option-button ${
            selectedOption === 'ad' ? 'active' : ''
          }`}
          onClick={() => setSelectedOption('ad')}
        >
          Improve my video ad script
        </button>
      </div>
      </div>
      <div className="form-group">
<label htmlFor="improver-text" className={errors.improverinput ? 'error' : ''}>Enter your text:</label>
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
</div>
      {renderAdvancedOptions()}
    
    </>
);
}

export default ImproverForm;
