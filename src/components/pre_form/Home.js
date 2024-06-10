import React, { useState } from 'react';
import Navbar from '../Navbar';
import BannerBackground from "./home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
import BannerImage from "./866.png";
import { Link } from 'react-router-dom';


function Home() {
  

  return (
    <div className='home-container' id='home-section'>
      <Navbar/>
      <div className='home-banner-container'>
        <div className='home-bannerImage-container'>
          <img src={BannerBackground} alt=""/>
        </div>
        <div className='home-text-section'>
          <h1 className='primary-heading'>
            WELCOME to our website! We hope you are always in good health.
          </h1>
          <p className='primary-text'>
            Our advanced analyze various health indicators to provide accurate predictions regarding the likelihood of developing diabetes.
          </p>
          <Link to="/pre">
            <button className='secondary-button'>
              Enter your data for predicting <FiArrowRight/>{""}
            </button>
          </Link>
          
          
        </div>
        <div className='home-image-section'>
          <img src={BannerImage} alt=''/>
        </div>
      </div>
      
    </div>
  );
}

export default Home;