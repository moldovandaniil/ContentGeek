import React from 'react';

const HintSection = ({ activeInput, activeCheckboxHint, hints, checkboxHints, selectedMethod }) => {
  return (
    <div className={`hints-section ${selectedMethod === "welcome" ? "welcome" : ""}`}>
        <p className={`hint ${activeInput === 'incubator' ? 'active' : ''}`}>
          {hints.incubator}
        </p>
        <p className={`hint ${activeInput === 'improver' ? 'active' : ''}`}>
           {hints.improver}
        </p>
        <p className={`hint ${activeInput === 'motive' ? 'active' : ''}`}>
           {hints.motive}
        </p>
        <p className={`hint ${activeInput === 'prodname' ? 'active' : ''}`}>
           {hints.prodname}
        </p>
        <p className={`hint ${activeInput === 'emailer' ? 'active' : ''}`}>
           {hints.emailer}
        </p>
        <p className={`hint ${activeInput === 'advisor' ? 'active' : ''}`}>
           {hints.advisor}
        </p>
        <p className={`hint ${activeInput === 'other' ? 'active' : ''}`}>
           {hints.other}
        </p>
        <p className={`hint ${activeInput === 'custname' ? 'active' : ''}`}>
           {hints.custname}
        </p>
        <p className={`hint ${activeInput === 'compname' ? 'active' : ''}`}>
           {hints.compname}
        </p>
        <p className={`hint ${activeInput === 'script' ? 'active' : ''}`}>
          {hints.script}
        </p>
        <p className={`hint ${activeInput === 'advanced' ? 'active' : ''}`}>
          {hints.advanced}
          </p>
          <p className={`hint ${activeInput === 'product' ? 'active' : ''}`}>
            {hints.product}
          </p>
          <p className={`hint ${activeInput === 'audience' ? 'active' : ''}`}>
            {hints.audience}
          </p>
          <p className={`hint ${activeInput === 'keywords' ? 'active' : ''}`}>
            {hints.keywords}
          </p>
          <p className={`hint ${activeInput === 'mood' ? 'active' : ''}`}>
            {hints.mood}
          </p>
          <p className={`hint ${activeInput === 'pixel' ? 'active' : ''}`}>
            {hints.pixel}
          </p>
          <p className={`hint ${activeInput === 'interest' ? 'active' : ''}`}>
            {hints.interest}
          </p>
          <p className={`hint ${activeInput === 'budget' ? 'active' : ''}`}>
            {hints.budget}
          </p>
          <p className={`hint ${activeInput === 'ratio' ? 'active' : ''}`}>
            {hints.ratio}
          </p>
          <p className={`hint ${activeInput === '' &&  activeCheckboxHint === '' ? 'active' : ''}`}>
            Hover on any element to see the hints!
          </p>
          <p className={`hint ${activeInput === 'platform' ? 'active' : ''}`}>
            {hints.platform}
          </p>
          <p className={`hint ${activeCheckboxHint === 'productDescriptions' ? 'active' : ''}`}>
            {checkboxHints.productDescriptions}
          </p>
          <p className={`hint ${activeCheckboxHint === 'videoAdScripts' ? 'active' : ''}`}>
            {checkboxHints.videoAdScripts}
          </p>
          <p className={`hint ${activeCheckboxHint === 'platformSuggestions' ? 'active' : ''}`}>
            {checkboxHints.platformSuggestions}
          </p>
          <p className={`hint ${activeCheckboxHint === 'improvedTargeting' ? 'active' : ''}`}>
            {checkboxHints.improvedTargeting}
          </p>
          <p className={`hint ${activeCheckboxHint === 'productMottos' ? 'active' : ''}`}>
            {checkboxHints.productMottos}
          </p>
        </div>
  );
};

export default HintSection;