import React from "react";
import { FaTwitter } from "react-icons/fa";
import { SiLinkedin } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="footer-wrapper">
      <div className="footer-section-one">
        <div className="footer-logo-container">
          <h1>follow us</h1>
        </div>
        <div className="footer-icons">
          <FaTwitter />
          <SiLinkedin />
          <FaYoutube />
          <FaFacebookF />
        </div>
      </div>
      <div className="footer-section-two">
        <div className="footer-section-columns">
          <span onClick={() => scrollToSection("home-section")}>Home</span>
          <span onClick={() => scrollToSection("about-section")}>About</span>
          <span onClick={() => scrollToSection("how-it-works-section")}>How it works</span>
          <span onClick={() => scrollToSection("reviews-section")}>Reviews</span>
        </div>
        <div className="footer-section-columns">
          <span>244-5333-7783</span>
          <span>084</span>
          <span>Fayoum, Egypt</span>
          <span>icare@gmail.com</span>
        </div>
        <div className="footer-section-columns">
          <span>Terms & Conditions</span>
          <span>Privacy Policy</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
