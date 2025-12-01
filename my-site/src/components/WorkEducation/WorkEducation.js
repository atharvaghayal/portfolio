import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import './WorkEducation.css';

// --- 1. IMPORT YOUR LOGOS ---
// (Make sure the paths and filenames are correct)
import sednaLogo from '../../assets/sedna-logo.png';
import deloitteLogo from '../../assets/deloitte-logo.png';
import awsLogo from '../../assets/aws-logo.png';
import raitLogo from '../../assets/rait-logo.png';

// --- Work Data (with new 'logo' property) ---
const workData = [
  {
    id: 1,
    title: "Sedna Technologies",
    role: "Python developer(Intern)",
    date: "Jan 2026-Present",
    background: 'linear-gradient(to right, #ffffff, #7F00FF)',
    logo: sednaLogo
  },
  {
    id: 2,
    title: "Deloitte Data analytics virtual intership program",
    role: "Certification",
    date: "July 2025",
    background: 'linear-gradient(to right, #009639, #00A9E0, #003B5C, #66B032)',
    logo: deloitteLogo
  },
  {
    id: 3,
    title: "AWS Academy Graduate",
    role: "Machine Learning Foundations (Certification)",
    date: "April 2025",
    background: 'linear-gradient(to right, #FF9900, #232F3E, #A7A7A7)',
    logo: awsLogo
  }
];

// --- Education Data (with new 'logo' property) ---
const educationData = [
  {
    id: 1,
    title: "B.Tech in AI-DS",
    institution: "Ramrao Adik Institute of Technology",
    date: "June 2022 - June 2026",
    background: 'linear-gradient(to right, #8A033E, #7B0000, #1A1A1A, #FFFFFF)',
    logo: raitLogo
  }
];

// --- Dark Overlay Style ---
const darkOverlay = 'linear-gradient(rgba(21, 21, 21, 0.6), rgba(21, 21, 21, 0.6))';


const WorkEducation = () => {
  const [activeTab, setActiveTab] = useState('work'); 

  return (
    <section className="work-edu-section">
      
      {/* --- Toggle Switch --- */}
      <div className="toggle-container">
        <button 
          className={`toggle-btn ${activeTab === 'work' ? 'active' : ''}`}
          onClick={() => setActiveTab('work')}
        >
          <span className="icon">💼</span> Work
        </button>
        <button 
          className={`toggle-btn ${activeTab === 'education' ? 'active' : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <span className="icon">🎓</span> Education
        </button>
      </div>

      {/* --- Content Area --- */}
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
              {workData.map((item) => (
                <div 
                  className="info-card" 
                  key={item.id}
                  style={{ 
                    backgroundImage: `${darkOverlay}, ${item.background}`
                  }}
                >
                  {/* --- 2. USE THE IMAGE TAG --- */}
                  <img src={item.logo} alt={`${item.title} logo`} className="card-logo" />
                  
                  <div className="card-details">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-role">{item.role}</p>
                    <p className="card-date">{item.date}</p>
                  </div>
                </div>
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
              {educationData.map((item) => (
                <div 
                  className="info-card wide" 
                  key={item.id}
                  style={{ 
                    backgroundImage: `${darkOverlay}, ${item.background}`
                  }}
                >
                  {/* --- 3. USE THE IMAGE TAG --- */}
                  <img src={item.logo} alt={`${item.title} logo`} className="card-logo" />

                  <div className="card-details">
                    <h3 className="card-title">{item.title}</h3>
                    <p className="card-role">{item.institution}</p>
                    <p className="card-date">{item.date}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default WorkEducation;