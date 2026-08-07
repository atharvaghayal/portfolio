import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './WorkEducation.css';

import sednaLogo from '../../assets/sedna-logo.png';
import deloitteLogo from '../../assets/deloitte-logo.png';
import durwankurLogo from '../../assets/durwankur-logo.svg';
import raitLogo from '../../assets/rait-logo.png';
import mesLogo from '../../assets/mes-logo.png';

const workData = [
  {
    id: 1,
    title: "Durwankur AI Lab Pvt. Ltd",
    role: "Full time Software Developer Trainee",
    date: "June 2026 - July 2026",
    background: 'linear-gradient(to right, #0f172a, #2563eb, #38bdf8)',
    logo: durwankurLogo
  },
  {
    id: 2,
    title: "Sedna Technologies",
    role: "Developer Intern",
    date: "Jan 2026 - Apr 2026",
    background: 'linear-gradient(to right, #ffffff, #7F00FF)',
    logo: sednaLogo
  },
  {
    id: 3,
    title: "Deloitte Data Analytics Virtual Internship Program",
    role: "Certification",
    date: "July 2025",
    background: 'linear-gradient(to right, #009639, #00A9E0, #003B5C, #66B032)',
    logo: deloitteLogo
  }
];

const educationData = [
  {
    id: 1,
    title: "B.Tech in AI-DS",
    institution: "Ramrao Adik Institute of Technology",
    date: "June 2022 - June 2026",
    background: 'linear-gradient(to right, #8A033E, #7B0000, #1A1A1A, #FFFFFF)',
    logo: raitLogo
  },
  {
    id: 2,
    title: "Higher Secondary School",
    institution: "MES Academics & Sports",
    date: "June 2020 - May 2022",
    background: 'linear-gradient(to right, #F7EA00 15%, #4D0000 45%, #3A0000 75%, #120000 100%)',
    logo: mesLogo
  }
];

const darkOverlay = 'linear-gradient(rgba(21, 21, 21, 0.6), rgba(21, 21, 21, 0.6))';

const WorkEducation = () => {
  const [activeTab, setActiveTab] = useState('work'); 

  return (
    <section className="work-edu-section" aria-labelledby="work-education-heading">
      <div className="toggle-container">
        <button 
          className={`toggle-btn ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          {activeTab === 'work' && (
            <motion.span
              className="toggle-indicator"
              layoutId="activeTabIndicator"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="toggle-btn-content">
            <span className="icon">💼</span> Work
          </span>
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          {activeTab === 'education' && (
            <motion.span
              className="toggle-indicator"
              layoutId="activeTabIndicator"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="toggle-btn-content">
            <span className="icon">🎓</span> Education
          </span>
        </button>
      </div>

      <div className="content-wrapper">
        <AnimatePresence mode='wait'>
          {activeTab === 'work' ? (
            <motion.div 
              key="work"
              className="cards-row"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {workData.map((item, index) => (
                <motion.div 
                  className="info-card" 
                  key={item.id}
                  style={{ 
                    backgroundImage: `${darkOverlay}, ${item.background}`
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="card-logo-wrapper">
                    <img src={item.logo} alt={`${item.title} logo`} className="card-logo" loading="lazy" decoding="async" />
                  </div>
                  
                  <div className="card-details">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-role">{item.role}</p>
                    <p className="card-date">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="education"
              className="cards-row" 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              {educationData.map((item, index) => (
                <motion.div 
                  className="info-card wide" 
                  key={item.id}
                  style={{ 
                    backgroundImage: `${darkOverlay}, ${item.background}`
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="card-logo-wrapper-education">
                    <img src={item.logo} alt={`${item.title} logo`} className="card-logo-education" loading="lazy" decoding="async" />
                  </div>

                  <div className="card-details">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-role">{item.institution}</p>
                    <p className="card-date">{item.date}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkEducation;