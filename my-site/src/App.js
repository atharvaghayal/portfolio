import React, { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import heroVideo from './assets/hero-loop.mp4'; 
import './App.css';
import './components/Footer/Footer.css';
import LogoLoop from './components/LogoLoop/LogoLoop';
import WorkEducation from './components/WorkEducation/WorkEducation';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Typewriter from './components/Typewriter/Typewriter';
import { motion, AnimatePresence } from 'motion/react';
import Footer from './components/Footer/Footer';
import ContactModal from './components/ContactModal/ContactModal';
import Abstract3D from './components/Abstract3D'; // <-- ADD THIS IMPORT

function App() {
  const words = [
    "Engineering Student",
    "Aspiring Data Analyst",
    "Developer",
    "Chess Player"
  ];
  
  const [videoLoaded, setVideoLoaded] = useState(false);

  // hero section in-view control for scroll-triggered animation
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(false);
  const lastScrollY = useRef(window.scrollY || 0);
  const [scrollingUp, setScrollingUp] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      setScrollingUp(y < lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(heroRef.current);
    return () => obs.disconnect();
  }, [heroRef]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ClickSpark 
      sparkColor='#fff' 
      sparkSize={8}
      sparkRadius={12}
      sparkCount={8} 
      duration={400}
    >
      <div className="App">
        {/* --- 3D BACKGROUND LAYER (FIXED BEHIND EVERYTHING) --- */}
        <div 
          className="abstract-3d-background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            pointerEvents: 'auto', // Changed to 'auto' to allow dragging
            opacity: 0.7 // Slightly transparent so it doesn't overpower content
          }}
        >
          <Abstract3D />
        </div>

        <motion.div 
          ref={heroRef}
          className="hero-section"
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={
            scrollingUp
              ? { duration: 1.2, delay: 0.45, ease: "easeOut" }
              : { duration: 0.7, delay: 0.12, ease: "easeOut" }
          }
        >  
          <div className="card-header">
            <a href="/" className="home-link">Home</a>
            <ul className="card-tabs">
              <li>
                <a
                  href="#projects"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3001/';
                  }}
                >
                  Projects
                </a>
              </li>
              <li><a href="#blogs">Blogs</a></li>
            </ul>
          </div>
          
          <div className="video-wrapper">
            {!videoLoaded && (
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(255,255,255,0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                Loading...
              </div>
            )}
            <video 
              className="hero-video"
              src={heroVideo}
              autoPlay 
              loop 
              muted 
              playsInline
              onLoadedData={() => setVideoLoaded(true)}
            />
          </div>
          
          <h2 className="hero-greeting">
            Hey, I am Atharva!!
          </h2>
          
          <h3 className="hero-subtitle">
            <Typewriter words={words} typingSpeed={100} deletingSpeed={50} pauseTime={2000} />
          </h3>
          
          <motion.div 
            className="hero-buttons-container"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.15, delayChildren: 0.3 }
              }
            }}
          >
            <motion.a 
              href="/resume.pdf" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hero-btn-rect"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <FaFileAlt className="btn-icon" />
              <span className="btn-text-default">Resume</span>
              <span className="btn-text-hover">View</span>
            </motion.a>

            <motion.a 
              href="https://github.com/atharvaghayal" 
              className="hero-btn-rect"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <FaGithub className="btn-icon" />
              <span className="btn-text-default">Github</span>
              <span className="btn-text-hover">Follow</span>
            </motion.a>

            <motion.a 
              href="https://www.linkedin.com/in/atharva-ghayal" 
              className="hero-btn-rect"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
              }}
            >
              <FaLinkedin className="btn-icon" />
              <span className="btn-text-default">LinkedIn</span>
              <span className="btn-text-hover">Connect</span>
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="work-logo-wrapper">
          <WorkEducation />
          <LogoLoop />
        </div>

        <div className="footer-card">
          <Footer onOpenModal={() => setIsModalOpen(true)} />
        </div>

        <AnimatePresence>
          {isModalOpen && <ContactModal onClose={() => setIsModalOpen(false)} />}
        </AnimatePresence>
      </div>
    </ClickSpark> 
  );
}

export default App;