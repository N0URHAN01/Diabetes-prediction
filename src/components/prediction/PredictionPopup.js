import React from 'react';
import './PredictionPopup.css';

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
            < h4 className="popup-message">{predictionResult.message}</h4>
          </>
        )}
      </div>
    </div>
  );
};

export default PredictionPopup;
