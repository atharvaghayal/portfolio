import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';
import CountUp from '../CountUp';
import './Footer.css';

// 1. Accept the 'onOpenModal' prop from App.js
const Footer = ({ onOpenModal }) => {
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    const key = 'atharva_portfolio_views';
    let currentViews = localStorage.getItem(key);
    if (currentViews) {
      currentViews = parseInt(currentViews, 10) + 1;
    } else {
      currentViews = 1;
    }
    localStorage.setItem(key, currentViews.toString());
    setViewCount(currentViews);
  }, []); // Empty array ensures this runs only once per session

  return (
    // This wrapper holds the 3-column grid and the copyright
    <div className="footer-content-wrapper">
      <div className="footer-grid">
        
        {/* --- LEFT COLUMN --- */}
        <div className="footer-left">
          <p className="footer-heading">Want to Collab!?</p>

          <div className="footer-contact-row">
            <p className="footer-text">
              Feel free to reach out for collaborations or just a friendly hello !!
            </p>
            {/* 2. Changed from <a> to <button> and added onClick */}
            <button onClick={onOpenModal} className="footer-note-btn">
              Send a note
            </button>
          </div>
        </div>

        {/* --- CENTER COLUMN --- */}
        <div className="footer-center">
          <div className="views-counter">
            <div className="count-up-text">
              <CountUp end={viewCount} />
            </div>
            <div className="views-label">Portfolio Views</div>
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="footer-right">
          <p className="footer-text">Where to find me?</p>
          <div className="footer-socials">
            <a href="mailto:atharva160504@gmail.com" aria-label="Email">
              <FaEnvelope />
            </a>
            <a href="https://www.linkedin.com/in/atharva-ghayal" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://github.com/atharvaghayal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume">
              <FaFileAlt />
            </a>
          </div>
        </div>
      </div>
      
      {/* --- COPYRIGHT --- */}
      <div className="footer-copyright">
        © 2026 Atharva Ghayal | Built with ❤️ by Atharva Ghayal
      </div>
      
    </div>
  );
};

export default Footer;