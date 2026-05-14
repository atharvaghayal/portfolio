import React, { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import './App.css';
import './components/Footer/Footer.css';
import LogoLoop from './components/LogoLoop/LogoLoop';
import WorkEducation from './components/WorkEducation/WorkEducation';
import ClickSpark from './components/ClickSpark/ClickSpark';
import { motion, AnimatePresence } from 'motion/react';
import Footer from './components/Footer/Footer';
import ContactModal from './components/ContactModal/ContactModal';

const terminalPromptPrefix = ">";
const terminalPromptText = "Hi, I am Atharva Ghayal!";
const terminalPromptLoopDelay = 5000;
const typingWpm = 60;
const averageWordLength = 5;
const typingDelay = 60000 / (typingWpm * averageWordLength);
const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

function App() {
  const [terminalText, setTerminalText] = useState('');
  const [elasticOffset, setElasticOffset] = useState(0);

  // hero section in-view control for scroll-triggered animation
  const heroRef = useRef(null);
  const [heroInView, setHeroInView] = useState(false);
  const lastScrollY = useRef(window.scrollY || 0);
  const [scrollingUp, setScrollingUp] = useState(false);
  const elasticReleaseTimeout = useRef(null);
  const touchStartY = useRef(null);

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
    const releaseElastic = () => {
      window.clearTimeout(elasticReleaseTimeout.current);
      elasticReleaseTimeout.current = window.setTimeout(() => {
        setElasticOffset(0);
      }, elasticReleaseDelay);
    };

    const applyElastic = (deltaY) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScrollTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScrollTop - 1;

      if (isAtTop && deltaY < 0) {
        setElasticOffset(maxElasticOffset);
        releaseElastic();
      } else if (isAtBottom && deltaY > 0) {
        setElasticOffset(-maxElasticOffset);
        releaseElastic();
      }
    };

    const onWheel = (event) => applyElastic(event.deltaY);
    const onTouchStart = (event) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event) => {
      if (touchStartY.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      applyElastic(touchStartY.current - currentY);
    };
    const onScroll = () => {
      setElasticOffset(0);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(elasticReleaseTimeout.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
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

  useEffect(() => {
    if (!heroInView) return;

    const timeoutIds = [];
    let isCancelled = false;

    const queueTimeout = (callback, delay) => {
      const timeoutId = setTimeout(callback, delay);
      timeoutIds.push(timeoutId);
    };

    const typePrompt = (nextLength = 0) => {
      if (isCancelled) return;

      setTerminalText(terminalPromptText.slice(0, nextLength));

      if (nextLength < terminalPromptText.length) {
        queueTimeout(() => typePrompt(nextLength + 1), typingDelay);
        return;
      }

      queueTimeout(() => typePrompt(0), terminalPromptLoopDelay);
    };

    typePrompt(0);

    return () => {
      isCancelled = true;
      timeoutIds.forEach(clearTimeout);
    };
  }, [heroInView]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <ClickSpark 
      sparkColor='#fff' 
      sparkSize={8}
      sparkRadius={12}
      sparkCount={8} 
      duration={400}
    >
      <div
        className="App"
        style={{ '--elastic-offset': `${elasticOffset}px` }}
      >
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
              <li>
                <a
                  href="#Blogs"
                  onClick={(e) => {
                    e.preventDefault();
                    window.location.href = 'http://localhost:3002/';
                  }}
                >
                  Blogs
                </a>
              </li>
            </ul>
          </div>

          <div className="terminal-window" aria-label="Atharva Ghayal Portfolio terminal">
            <div className="terminal-titlebar">
              <div className="terminal-controls" aria-hidden="true">
                <span className="terminal-control close"></span>
                <span className="terminal-control minimize"></span>
                <span className="terminal-control maximize"></span>
              </div>
              <span className="terminal-title">Atharva Ghayal Portfolio</span>
            </div>

            <div className="terminal-body">
              <div className="terminal-prompt-row">
                <p className="terminal-prompt">
                  <span className="terminal-prompt-prefix">{terminalPromptPrefix}</span>
                  {terminalText}
                  <span className="terminal-caret" aria-hidden="true"></span>
                </p>
                <span className="terminal-location">📍 Mumbai | IN</span>
              </div>

              <p className="terminal-lead">
                Aspiring Software Developer passionate about AI & automation.
              </p>

              <div className="terminal-section">
                <p className="terminal-section-title">What i do?</p>
                <p>
                  I specialize in building intelligent solutions through AI and machine learning,
                  creating seamless web experiences with modern frameworks, developing mobile
                  applications, and architecting cloud-based systems. With a passion for automation
                  and optimization, I transform complex problems into elegant, scalable solutions
                  that drive real-world impact.
                </p>
              </div>
            </div>

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
          </div>
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
