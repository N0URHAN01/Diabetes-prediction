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
    const predictionResult = {
      success: true,
      message: aiResponse.data.message, // Use the message returned from the backend
      type: 'info'
    };

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
