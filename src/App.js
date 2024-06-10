import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import Login from "./components/Login/Login";
import About from "./components/About";
import Home from "./components/pre_form/Home";
import Work from "./components/Work";
import Testimonial from "./components/Testimonial";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Pre from "./components/pre_form/pre";
import UserProfile from "./components/userprofile/Userprof";
import './App.css';

function App() {
    const user = localStorage.getItem("token");

    return (
        <Router>
           
            <Routes>
            <Route path="//user-profile" element={<UserProfile />} />
            <Route path="/Pre" element={<Pre />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
               
                {!user && <Route path="/" element={<Navigate replace to="/login" />} />}

                
                <Route path="/"
            element={
                <>
                {user &&   <Home /> }
                
                <About />
                <Work />
                <Testimonial />
                <Contact />
                <Footer />
                
                </>
            }
            />

            </Routes>
        </Router>
    );
}

export default App;
