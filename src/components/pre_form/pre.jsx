import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './pre.css';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { predictDiabetes } from './prediction/predict';
import PredictionPopup from './prediction/PredictionPopup';
import { recommendationHandler } from './recommendation';
import foimg from './8666.jpeg';

const Pre = () => {
  const [inputs, setInputs] = useState({
    blood_pressure: '',
    pregnancies: '',
    glucose: '',
    skin_thickness: '',
    insulin: '',
    bmi: '',
    diabetespedigreefunction: '',
    age: '',
    has_diabetes: '',
  });

  const [isPredictionPopupOpen, setIsPredictionPopupOpen] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const [canPregnancy, setCanPregnancy] = useState(false);
  const [updateMessage, setUpdateMessage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('Token not found in localStorage');
          return;
        }

        const headers = {
          'Authorization': `Bearer ${token}`,
        };

        const response = await axios.get('http://127.0.0.1:3001/users/profile', { headers });
        const userData = response.data.user;

        setInputs({
          blood_pressure: userData.blood_pressure !== null ? userData.blood_pressure : '',
          pregnancies: userData.pregnancies !== null ? userData.pregnancies : 0,
          glucose: userData.glucose !== null ? userData.glucose : '',
          skin_thickness: userData.skin_thickness !== null ? userData.skin_thickness : '',
          insulin: userData.insulin !== null ? userData.insulin : '',
          bmi: userData.bmi !== null ? userData.bmi : '',
          diabetespedigreefunction: userData.diabetespedigreefunction !== null ? userData.diabetespedigreefunction.toFixed(3) : '',
          age: userData.age !== null ? userData.age : '',
          has_diabetes: userData.has_diabetes !== null ? userData.has_diabetes : '',
        });

        setCanPregnancy(userData.can_pregnancy);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const validateInputs = () => {
    let validationErrors = {};
    let valid = true;

    for (const key in inputs) {
      if (inputs[key] === '') {
        validationErrors[key] = 'This field is required';
        valid = false;
      }
    }

    setErrors(validationErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in localStorage');
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      };

      const data = {
        blood_pressure: parseInt(inputs.blood_pressure),
        pregnancies: canPregnancy ? parseInt(inputs.pregnancies) : 0,
        glucose: parseInt(inputs.glucose),
        skin_thickness: parseInt(inputs.skin_thickness),
        insulin: parseInt(inputs.insulin),
        bmi: parseFloat(inputs.bmi),
        diabetespedigreefunction: parseFloat(inputs.diabetespedigreefunction),
        age: parseInt(inputs.age),
        has_diabetes: false,
      };
      console.log(data)
      const response = await axios.put('http://127.0.0.1:3001/users/updateForPredict', data, { headers });
      const userData = response.data.Success;
      if (userData) {
        setUpdateMessage('User Data Updated Successfully');
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setUpdateMessage('Error updating user data.');
    }
  };

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

  const handleReset = () => {
    setInputs((prevInputs) => ({
      blood_pressure: '',
      pregnancies: '',
      glucose: '',
      skin_thickness: '',
      insulin: '',
      bmi: prevInputs.bmi,
      diabetespedigreefunction: '',
      age: prevInputs.age,
    }));
    setUpdateMessage(null);
    setErrors({});
  };

  if (updateMessage) {
    return (
      <>
        <Navbar />
        <div className="tab-container">
          <div className="tab-message">{updateMessage}</div>
          <button className="tab-button" onClick={handlePredictClick}>
            Predict
          </button>
          {isPredictionPopupOpen && (
            <PredictionPopup
              className="pop"
              predictionResult={predictionResult}
              setIsPredictionPopupOpen={setIsPredictionPopupOpen}
            />
          )}
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="ptext">
        <h1>Please Enter your data to make the predicting and get your recommended 😊</h1>
      </div>
      <div className="form-wrapper">
        <img src={foimg} alt="Description of image" className="form-image" />
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="input-pair">
              <div className="input-group">
                <label htmlFor="blood_pressure">Blood Pressure:</label>
                <input
                  type="text"
                  id="blood_pressure"
                  name="blood_pressure"
                  value={inputs.blood_pressure}
                  onChange={handleChange}
                />
                {errors.blood_pressure && <span className="error">{errors.blood_pressure}</span>}
              </div>
              {canPregnancy && (
                <div className="input-group">
                  <label htmlFor="pregnancies">Pregnancies:</label>
                  <input
                    type="text"
                    id="pregnancies"
                    name="pregnancies"
                    value={inputs.pregnancies}
                    onChange={handleChange}
                  />
                  {errors.pregnancies && <span className="error">{errors.pregnancies}</span>}
                </div>
              )}
            </div>
            <div className="input-pair">
              <div className="input-group">
                <label htmlFor="glucose">Glucose:</label>
                <input
                  type="text"
                  id="glucose"
                  name="glucose"
                  value={inputs.glucose}
                  onChange={handleChange}
                />
                {errors.glucose && <span className="error">{errors.glucose}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="skin_thickness">Skin Thickness:</label>
                <input
                  type="text"
                  id="skin_thickness"
                  name="skin_thickness"
                  value={inputs.skin_thickness}
                  onChange={handleChange}
                />
                {errors.skin_thickness && <span className="error">{errors.skin_thickness}</span>}
              </div>
            </div>
            <div className="input-pair">
              <div className="input-group">
                <label htmlFor="insulin">Insulin:</label>
                <input
                  type="text"
                  id="insulin"
                  name="insulin"
                  value={inputs.insulin}
                  onChange={handleChange}
                />
                {errors.insulin && <span className="error">{errors.insulin}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="bmi">BMI:</label>
                <input
                  type="text"
                  id="bmi"
                  name="bmi"
                  value={inputs.bmi}
                  onChange={handleChange}
                  disabled
                />
                {errors.bmi && <span className="error">{errors.bmi}</span>}
              </div>
            </div>
            <div className="input-pair">
              <div className="input-group">
                <label htmlFor="diabetespedigreefunction">Diabetes Pedigree Function:</label>
                <input
                  type="text"
                  id="diabetespedigreefunction"
                  name="diabetespedigreefunction"
                  value={inputs.diabetespedigreefunction}
                  onChange={handleChange}
                />
                {errors.diabetespedigreefunction && <span className="error">{errors.diabetespedigreefunction}</span>}
              </div>
              <div className="input-group">
                <label htmlFor="age">Age:</label>
                <input
                  type="text"
                  id="age"
                  name="age"
                  value={inputs.age}
                  onChange={handleChange}
                  disabled
                />
                {errors.age && <span className="error">{errors.age}</span>}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">Update</button>
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Pre;
