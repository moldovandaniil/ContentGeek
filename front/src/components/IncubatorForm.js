import React from 'react';

function IncubatorForm({
  keywords,
  handleFocus,
  handleKeywordInput,
  handleCheckboxMouseEnter,
  handleCheckboxChange,
  showAdvanced,
  contentTypes,
  handleInputMouseEnter, 
  handleInputMouseLeave,
  errors,
  setErrors,
}) {

  const handleInputChange = (field) => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: false,
    }));
  };
  

    return (
        <>
        <div className="title-container">
        <h1 className="title-header" data-text="Incubator">
            <span>Incubator</span>
          </h1>
           <p className="title-typing-text">Generate unique content for your product or idea.</p>
        </div>
        <div className="form-group">
          <label htmlFor="product" className={errors.product ? 'error' : ''}>
            Product
          </label>
            <input
              type="text"
              className={`product-input${errors.product ? ' error' : ''}`}
              id="product"
              name="product"
              onChange={() => handleInputChange('product')}
              placeholder="e.g. GoShavy Hair Shaver"
              onFocus={handleFocus}
              onMouseEnter={() => handleInputMouseEnter('product')}
              onMouseLeave={handleInputMouseLeave}
            />
            {errors.product && <span className="error-message">Product cannot be empty</span>}
        </div>
          <div className="form-group">
            <label htmlFor="audience" className={errors.product ? 'error' : ''}>Target Audience</label>
            <input
          placeholder="e.g. 50+ yo ladies"
          type="text"
          className={`product-input${errors.product ? ' error' : ''}`}
          id="audience"
          name="audience"
          onChange={() => handleInputChange('audience')}
          onFocus={handleFocus}
          onMouseEnter={() => handleInputMouseEnter('audience')} 
              onMouseLeave={handleInputMouseLeave} 
        />
          {errors.audience && <span className="error-message">Audience cannot be empty</span>}
      </div>
      <div className="form-group">
        <label htmlFor="keywords">Keywords</label>
        <div className="keywords-container">
          {keywords.map((keyword, index) => (
            <span key={index} className="keyword">
              {keyword}
            </span>
          ))}
          <input
            type="text"
            id="keywords"
            name="keywords"
            placeholder="e.g. Electric"
            onKeyDown={handleKeywordInput}
            onFocus={handleFocus}
            onMouseEnter={() => handleInputMouseEnter('keywords')} 
              onMouseLeave={handleInputMouseLeave} 
          />
        </div>
      </div>
      <div className="form-group">
          <label>What would you like to generate?</label>
          <div className="checkbox-group">
            <div className="checkbox-row">
              <label onMouseEnter={() => handleCheckboxMouseEnter('productDescriptions')}
  onMouseLeave={() => handleCheckboxMouseEnter('')}>
                <input
                  type="checkbox"
                  name="productDescriptions"
                  checked={contentTypes.productDescriptions}
                  onChange={handleCheckboxChange}
                />
                Product descriptions
              </label>
              <label onMouseEnter={() => handleCheckboxMouseEnter('videoAdScripts')}
  onMouseLeave={() => handleCheckboxMouseEnter('')}>
                <input
                  type="checkbox"
                  name="videoAdScripts"
                  checked={contentTypes.videoAdScripts}
                  onChange={handleCheckboxChange}
                />
                Video ad scripts
              </label >
              <label onMouseEnter={() => handleCheckboxMouseEnter('platformSuggestions')}
  onMouseLeave={() => handleCheckboxMouseEnter('')}>
                <input
                  type="checkbox"
                  name="platformSuggestions"
                  checked={contentTypes.platformSuggestions}
                  onChange={handleCheckboxChange}
                />
                Platform suggestions
              </label>
            </div>
            <div className="checkbox-row">
              <label onMouseEnter={() => handleCheckboxMouseEnter('improvedTargeting')}
  onMouseLeave={() => handleCheckboxMouseEnter('')}>
                <input
                  type="checkbox"
                  name="improvedTargeting"
                  checked={contentTypes.improvedTargeting}
                  onChange={handleCheckboxChange}
                />
                Improved targeting
              </label>
              <label onMouseEnter={() => handleCheckboxMouseEnter('productMottos')}
  onMouseLeave={() => handleCheckboxMouseEnter('')}>
                <input
                  type="checkbox"
                  name="productMottos"
                  checked={contentTypes.productMottos}
                  onChange={handleCheckboxChange}
                />
                Product mottos
              </label>
            </div>
            </div>
            {errors.checkbox && <span className="error-message">Audience cannot be empty</span>}
      </div>
      {showAdvanced && (
        <>
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
        </>
      )}
    </>
  );
}

export default IncubatorForm;