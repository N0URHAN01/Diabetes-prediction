import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import './userprof.css';

const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [passwordUpdateSuccess, setPasswordUpdateSuccess] = useState(false);
  const [passwordUpdateError, setPasswordUpdateError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get('http://localhost:3001/users/profile', { headers });
        setUserData(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      await axios.put('http://localhost:3001/users/update', userData, { headers });
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handlePasswordChange = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      await axios.put('http://localhost:3001/users/updatePassword', passwordData, { headers });
      setPasswordUpdateSuccess(true);
      setPasswordUpdateError('');
      setTimeout(() => {
        // Clear token and redirect to login
        localStorage.removeItem('token');
        navigate('/login');
      }, 3000);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setPasswordUpdateError(error.response.data.message);
      } else {
        console.error('Error updating password:', error);
      }
    }
  };

  return (
    <div className='up'>
      <Navbar />
      <div className="user-profile-container">
        <h1>User Profile</h1>
        <div className="user-info">
          <h2>User Information</h2>
          <div className="form-row">
            <div className="form-group">
              <label>Email:</label>
              <input type="text" name="email" value={userData.email || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" name="name" value={userData.name || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Phone:</label>
              <input type="text" name="phone" value={userData.phone || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input type="text" name="age" value={userData.age || ''} onChange={handleChange} readOnly />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Gender:</label>
              <select name="is_female" value={userData.is_female ? 'female' : 'male'} onChange={handleChange} disabled>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            </div>
            <div className="form-group">
              <label>Weight:</label>
              <input type="number" name="weight" value={userData.weight || ''} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Height:</label>
              <input type="number" name="height" value={userData.height || ''} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Diabetes Information:</label>
              <span className="diabetes-info">{userData.diabetes_info || 'N/A'}</span>
            </div>
          </div>
          {updateSuccess && <p className="success-message">User data updated successfully!</p>}
          <button className="update-button" onClick={handleUpdateUserData}>Update User Data</button>
        </div>
        <div className="password-card">
          <h2>Change Password</h2>
          <div>
            <label>Current Password:</label>
            <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={(e) => setPasswordData((prevData) => ({ ...prevData, currentPassword: e.target.value }))} />
          </div>
          <div>
            <label>New Password:</label>
            <input type="password" name="newPassword" value={passwordData.newPassword} onChange={(e) => setPasswordData((prevData) => ({ ...prevData, newPassword: e.target.value }))} />
          </div>
          {passwordUpdateSuccess && <p className="success-message">Password updated successfully!</p>}
          {passwordUpdateError && <p className="error-message">{passwordUpdateError}</p>}
          <button className="change-password-button" onClick={handlePasswordChange}>Change Password</button>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;
