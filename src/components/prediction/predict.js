import axios from 'axios';

export const predictDiabetes = async (token, setPredictionResult) => {
  try {
    // Send user data to AI service for prediction
    const machineApiUrl = 'http://127.0.0.1:3001/users/predict'; // Update with your AI service URL
    const headers = {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Add Content-Type header
    };
    const aiResponse = await axios.post(machineApiUrl, {}, { headers });

    // Handle AI service response
    const hasDiabetes = aiResponse.data.has_diabetes;
    console.log('Has Diabetes: ', hasDiabetes);
    let predictionResult;
    if (hasDiabetes === true) {
      predictionResult = {
        success: true,
        message: 'You are likely to have diabetes.',
        type: 'positive'
      };
    } else if (hasDiabetes === false) {
      predictionResult = {
        success: true,
        message: 'You are unlikely to have diabetes.',
        type: 'negative'
      };
    } else {
      predictionResult = {
        success: false,
        message: 'Prediction failed. Unknown prediction result.',
        type: 'error'
      };
    }

    setPredictionResult(predictionResult); // Update the prediction result
  } catch (error) {
    console.error('Error in predictDiabetes:', error);
    if (error.response && error.response.data && error.response.data.error === "Incomplete user data, please update profile") {
      setPredictionResult({
        success: false,
        message: 'Incomplete user data, please update profile',
        type: 'error'
      });
    } else {
      setPredictionResult({
        success: false,
        message: 'Prediction failed. An error occurred while communicating with the prediction service.',
        type: 'error'
      });
    }
  }
};
