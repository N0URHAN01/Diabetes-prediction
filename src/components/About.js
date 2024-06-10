import React from "react";
import AboutBackground from "../Assets/about-background.png";
import AboutBackgroundImage from "../Assets/ar.png";


const About = () => {
  return (
    <div className="about-section-container"  id="about-section">
      <div className="about-background-image-container">
        <img src={AboutBackground} alt="" />
      </div>
      <div className="about-section-image-container">
        <img src={AboutBackgroundImage} alt="" />
      </div>
      <div className="about-section-text-container">
        <p className="primary-subheading">About</p>
        <h1 className="primary-heading">
        We know the danger of diabetes and we appreciate your concern about it
        </h1>
        <p className="primary-text">
        On our site. We believe in the importance of food and its effect on diabetes
            After your expectation, we provide you with the recommended food .
        </p>
        
        <div className="about-buttons-container">
          <button className="secondary-button">Learn More</button>
          
        </div>
      </div>
    </div>
  );
};

export default About;