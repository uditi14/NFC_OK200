import React from "react";

const Footer = () => {
  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <h1 className="footer-title">PoolVerse</h1>
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span>Help</span>
          <span>Share</span>
          <span>About</span>
          <span>Contact</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>PoolVerse@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
