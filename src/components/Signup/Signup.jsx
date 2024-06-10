import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    birthday: "",
    gender: "male",
    weight: "",
    height: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password strength regex pattern
    const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;


    if (!passwordPattern.test(userData.password)) {
      setError("Password must be at least 8 characters long and contain at least one digit, one uppercase letter, and one of #$%.");
      return;
    }

    try {
      await axios.post("http://localhost:3001/auth/signup", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        date_of_birth: userData.birthday,
        is_female: userData.gender === "female",
        height: parseFloat(userData.height),
        weight: parseFloat(userData.weight),
      });
      navigate("/login");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred during signup. Please try again later.");
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <div className={styles.grid_container}>
              <input
                type="text"
                placeholder="Name"
                name="name"
                value={userData.name}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="text"
                placeholder="Phone"
                name="phone"
                value={userData.phone}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="date"
                placeholder="Birthday"
                name="birthday"
                value={userData.birthday}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <select
                name="gender"
                value={userData.gender}
                onChange={handleChange}
                required
                className={styles.input}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <input
                type="number"
                placeholder="Weight (kg)"
                name="weight"
                value={userData.weight}
                onChange={handleChange}
                required
                className={styles.input}
              />
              <input
                type="number"
                placeholder="Height (cm)"
                name="height"
                value={userData.height}
                onChange={handleChange}
                required
                className={styles.input}
              />
            </div>
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
            <p className={styles.login_prompt}>
              Already have an account? 
              <Link to="/login" className={styles.login_link}>
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
