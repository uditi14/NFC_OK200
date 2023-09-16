import React from "react";
import ProcessBackground from "../Assets/process-background.png";
import ProcessBackgroundImage from "../Assets/process-background-image.png";

const Process = () => {
  return (
    <div className="about-section-container">
      <div className="about-background-image-container">
        <img src={ProcessBackground} alt="abcd" />
      </div>
      <div className="about-section-image-container">
        <img src={ProcessBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">Process</p>
        <h1 className="primary-heading">
          Simple Steps Towards Better Transportation
        </h1>
        <ol className="primary-text">
          <li>Enter your source and destination</li>
          <li>Receive a curated list of the nearest rides available</li>
          <li>Book your ride,and enjoy the travel!</li>
        </ol>
        <p className="primary-text">
          Voila! You have taken your first step towards better transportation!
        </p>
      </div>
    </div>
  );
};

export default Process;
