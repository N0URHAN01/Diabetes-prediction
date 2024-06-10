import React, { useState } from 'react';
import { FiArrowRight } from "react-icons/fi";
import './btn.css'
import { predictDiabetes } from './prediction/predict';
import PredictionPopup from './prediction/PredictionPopup'; 
import { recommendationHandler } from './recommendation';



const Btn = () => {

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
    <div className="btn-container">
    <button className='se-button' onClick={handlePredictClick}>
      Predict <FiArrowRight/>
    </button>
    <button className='s-button' onClick={handleRecommendationClick}>
      Recommendation <FiArrowRight/>
    </button>



    {isPredictionPopupOpen && (
        <PredictionPopup
          predictionResult={predictionResult}
          setIsPredictionPopupOpen={setIsPredictionPopupOpen}
        />
      )}
  </div>
  
);
  
}

export default Btn