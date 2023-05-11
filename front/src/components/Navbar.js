import React from 'react';
import home from '../images/home.png';
import incubator from '../images/startup.png';
import improver from '../images/implementation.png';
import emailer from '../images/protection.png';
import advisor from '../images/conversation.png';

function Navbar({ selectedMethod, setSelectedMethod, handleMouseEnter, handleMouseLeave, username }) {
    const [advancedVisible, setAdvancedVisible] = React.useState(false);
  return (
    <nav className="navbar">
      {username && (<>
        <button
          className={`nav-item ${selectedMethod === 'welcome' ? 'active' : ''}`}
          onClick={() => setSelectedMethod('welcome')}
          onMouseEnter={() => handleMouseEnter('welcome')}
          onMouseLeave={handleMouseLeave}
        >
        <img src={home} alt="Icon 5" className="nav-icon" />
          Home
      </button>
    </>)}

      <button
        className={`nav-item ${selectedMethod === 'incubator' ? 'active' : ''}`}
        onClick={() => setSelectedMethod('incubator')}
        onMouseEnter={() => handleMouseEnter('incubator')}
        onMouseLeave={handleMouseLeave}
      >
      <img src={incubator} alt="Icon 1" className="nav-icon" />
        Incubator
      </button>

      <button
        className={`nav-item ${selectedMethod === 'improver' ? 'active' : ''}`}
        onMouseEnter={() => handleMouseEnter('improver')}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
        setSelectedMethod('improver');
        setAdvancedVisible(!advancedVisible);}}
      >
      <img src={improver} alt="Icon 2" className="nav-icon" />
        Improver
      </button>

      <button
        className={`nav-item ${selectedMethod === 'emailer' ? 'active' : ''}`}
        onClick={() => setSelectedMethod('emailer')}
        onMouseEnter={() => handleMouseEnter('emailer')}
        onMouseLeave={handleMouseLeave}
      >
      <img src={emailer} alt="Icon 3" className="nav-icon" />
        Emailer
      </button>

      <button
        className={`nav-item ${selectedMethod === 'advisor' ? 'active' : ''}`}
        onClick={() => setSelectedMethod('advisor')}
        onMouseEnter={() => handleMouseEnter('advisor')}
        onMouseLeave={handleMouseLeave}
      >
      <img src={advisor} alt="Icon 4" className="nav-icon" />
        Advisor
      </button>
    </nav>
  );
}

export default Navbar;

