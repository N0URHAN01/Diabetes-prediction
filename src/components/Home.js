import React, { useState } from 'react';
import Navbar from './Navbar';
import { predictDiabetes } from './prediction/predict';
import { recommendationHandler } from './recommendation';
import PredictionPopup from './prediction/PredictionPopup'; 
import BannerBackground from "../Assets/home-banner-background.png";
import { FiArrowRight } from "react-icons/fi";
import BannerImage from "../Assets/86.png";
import { Link } from 'react-router-dom';
import '../App.css';

function Home() {
  const [isPredictionPopupOpen, setIsPredictionPopupOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredictClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      await predictDiabetes(token, setPredictionResult);
      setIsPredictionPopupOpen(true);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRecommendationClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }
      await recommendationHandler(token);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
      {isPredictionPopupOpen && (
        <PredictionPopup
          predictionResult={predictionResult}
          setIsPredictionPopupOpen={setIsPredictionPopupOpen}
        />
      )}
    </div>
  );
}

export default Home;