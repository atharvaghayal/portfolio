import React, { useState, useEffect, useRef } from 'react';
import { FaFileAlt, FaGithub, FaLinkedin } from 'react-icons/fa';
import { motion } from 'framer-motion';
import LogoLoop from '../components/LogoLoop/LogoLoop';
import WorkEducation from '../components/WorkEducation/WorkEducation';
import AnimatedPage from '../components/Layout/AnimatedPage';
import ParticleBackground from '../components/ParticleBackground/ParticleBackground';
import Magnetic from '../components/Magnetic/Magnetic';
import Stats from '../components/Stats/Stats';

const terminalPromptPrefix = "$";
const terminalCommands = [
  "whoami",
  "Atharva Ghayal",
  "cat current_focus.txt",
  "AI & Web Development",
  "execute portfolio.sh",
  "Initializing..."
];
const typingDelay = 80;
const deletingDelay = 40;
const pauseDelay = 2000;
const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

const Home = () => {
  const [terminalText, setTerminalText] = useState('');
  const [elasticOffset, setElasticOffset] = useState(0);

  // Track visibility and scroll direction for the intro animations
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

  // Trigger hero animation when section enters viewport
  useEffect(() => {
    if (!heroRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHeroInView(true);
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  // Handle the terminal text typing effect loop
  useEffect(() => {
    if (!heroInView) return;

    let timeoutId;
    let isCancelled = false;
    let currentCommandIndex = 0;
    let currentText = '';
    let isDeleting = false;

    const tick = () => {
      if (isCancelled) return;

      const fullText = terminalCommands[currentCommandIndex];

      if (isDeleting) {
        currentText = fullText.substring(0, currentText.length - 1);
      } else {
        currentText = fullText.substring(0, currentText.length + 1);
      }

      setTerminalText(currentText);

      let delta = isDeleting ? deletingDelay : typingDelay;

      if (!isDeleting && currentText === fullText) {
        delta = pauseDelay;
        isDeleting = true;
      } else if (isDeleting && currentText === '') {
        isDeleting = false;
        currentCommandIndex = (currentCommandIndex + 1) % terminalCommands.length;
        delta = 500;
      }

      timeoutId = setTimeout(tick, delta);
    };

    timeoutId = setTimeout(tick, 500);

    return () => {
      isCancelled = true;
      clearTimeout(timeoutId);
    };
  }, [heroInView]);

  return (
    <AnimatedPage>
      <div style={{ '--elastic-offset': `${elasticOffset}px`, position: 'relative' }}>
        <ParticleBackground />
        <motion.header
        ref={heroRef}
        className="hero-section"
        initial={{ opacity: 0, y: 30 }}
        animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={
          scrollingUp
            ? { duration: 1.2, delay: 0.1, ease: "easeOut" }
            : { duration: 0.7, delay: 0.1, ease: "easeOut" }
        }
      >
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
              <span className="terminal-location">📍 Navi Mumbai | IN</span>
            </div>

            <p className="terminal-lead">
              Aspiring Software Developer passionate about AI & automation.
            </p>

            <div className="terminal-section">
              <p className="terminal-section-title">What I Do?</p>
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
            <Magnetic>
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
            </Magnetic>

            <Magnetic>
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
            </Magnetic>

            <Magnetic>
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
            </Magnetic>
          </motion.div>
        </div>
      </motion.header>

      <div className="section-divider" aria-hidden="true" />

      <div className="main-content-sections" style={{ position: 'relative', zIndex: 10, background: 'var(--bg-primary)' }}>
        <WorkEducation />
        
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: '100%', margin: '4rem 0' }}
        >
          <LogoLoop />
        </motion.div>

        <Stats />
      </div>
    </div>
    </AnimatedPage>
  );
};

export default Home;
