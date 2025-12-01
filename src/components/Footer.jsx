import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="simple-footer">
      <div className="footer-content">
        {/* Logo and Description */}
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-text">DreamPro</span>
          </div>
          <p className="footer-description">
            Find your perfect home with DreamPro. We connect you with the best properties 
            and help you make your dream home a reality.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4 className="footer-title">Quick Links</h4>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/properties">Properties</a>
            <a href="/about">About Us</a>
            <a href="/contact">Contact</a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="footer-section">
          <h4 className="footer-title">Contact Info</h4>
          <div className="contact-info">
            <p>📧 Dveloper00108@gmail.com</p>
            <p>📞 +917304603314</p>
            <p>📍 Mumbai</p>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2025 DreamPro. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;