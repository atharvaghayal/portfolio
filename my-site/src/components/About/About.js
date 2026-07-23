import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  return (
    <section className="about-section" id="about">
      <motion.div
        className="about-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="about-content">
          <h2 className="section-heading">Behind the Terminal</h2>
          <p className="about-bio">
            I'm a passionate Software Developer bridging the gap between artificial intelligence and elegant web experiences. My journey started with a fascination for how systems work, which quickly evolved into building my own. 
          </p>
          <p className="about-bio">
            When I'm not architecting cloud solutions or fine-tuning machine learning models, I'm probably exploring new JS frameworks, participating in hackathons, or contributing to open-source tools that empower developers.
          </p>
          
          <div className="about-skills">
            {['React', 'Node.js', 'Python', 'Machine Learning', 'AWS', 'Docker'].map((skill, index) => (
              <motion.span 
                key={skill} 
                className="skill-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div className="about-image-wrapper">
          <div className="about-image-decoration"></div>
          {/* Fallback to a placeholder gradient if no image is available yet */}
          <img 
            src="/atharva.webp" 
            alt="Atharva Ghayal" 
            className="about-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          <div className="about-image-placeholder" style={{ display: 'none' }}>
            <span>AG</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
