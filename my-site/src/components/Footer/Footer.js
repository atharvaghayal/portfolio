import React, { useState, useEffect, useRef } from 'react';
import { FaEnvelope, FaLinkedin, FaGithub, FaFileAlt } from 'react-icons/fa';
import CountUp from '../CountUp';
import './Footer.css';

const Footer = () => {
  const [viewCount, setViewCount] = useState(0);
  const [animateViews, setAnimateViews] = useState(false);
  const viewsCounterRef = useRef(null);

  // Determine the correct portfolio view count.
  // The count is incremented by exactly +1 only on a genuine first visit.
  // Refreshes, revisits, new tabs, and returning visitors are all ignored.
  useEffect(() => {
    const COUNT_KEY   = 'atharva_portfolio_views';
    const VISITED_KEY = 'atharva_portfolio_visited';

    const alreadyCounted = localStorage.getItem(VISITED_KEY) === 'true';
    const storedCount    = parseInt(localStorage.getItem(COUNT_KEY) || '0', 10);

    if (!alreadyCounted) {
      // Genuine first-time visitor — increment and mark as counted
      const newCount = storedCount + 1;
      localStorage.setItem(COUNT_KEY,   newCount.toString());
      localStorage.setItem(VISITED_KEY, 'true');
      setViewCount(newCount);
    } else {
      // Returning visitor / refresh / new tab — show existing count unchanged
      setViewCount(storedCount);
    }
  }, []);

  // Trigger count-up animation when the views counter enters the viewport
  useEffect(() => {
    const node = viewsCounterRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setAnimateViews(true);
          observer.disconnect(); // play only once
        }
      },
      { threshold: 0.25 } // fire when 25% of the counter is visible
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <footer className="footer-content-wrapper">
      <div className="footer-grid">
        <div className="footer-left">
          <p className="footer-heading">Want to Collab!?</p>
          <div className="footer-contact-row">
            <p className="footer-text">
              Feel free to reach out for collaborations or just a friendly hello !!
            </p>
          </div>
        </div>

        <div className="footer-center">
          <div className="views-counter" ref={viewsCounterRef}>
            <div className="count-up-text">
              <CountUp end={viewCount} startAnimation={animateViews} />
            </div>
            <div className="views-label">Portfolio Views</div>
          </div>
        </div>

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
      
    </footer>
  );
};

export default Footer;