import React from 'react';
import './PredictionPopup.css';
import { recommendationHandler } from './recommendation';

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

const PredictionPopup = ({ predictionResult, setIsPredictionPopupOpen, isLoading }) => {
  const handleClosePopup = () => {
    setIsPredictionPopupOpen(false);
  };

  return (
    <div className={`prediction-popup ${predictionResult.type}`}>
      <div className="popup-content">
        <button className="close-button" onClick={handleClosePopup}>X</button>
        {isLoading ? (
          <p className="loading-message">Loading...</p>
        ) : (
          <>
            <h3 className="popup-heading">{predictionResult.success ? "Prediction Successful" : "Prediction Failed"}</h3>
            <h4 className="popup-message">{predictionResult.message}</h4> {/* Display the message here */}
            <br />
            {predictionResult.type === 'info' && ( // Display the recommendation button only for info type messages
              <>
                <h5 className='cli'> Click here to get your Recommendation file </h5>
                <br />
                <button className='R-button' onClick={handleRecommendationClick}>
                  Recommendation
                </button>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PredictionPopup;
