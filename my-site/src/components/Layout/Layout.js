import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import CustomCursor from '../CustomCursor/CustomCursor';
import ClickSpark from '../ClickSpark/ClickSpark';
import Footer from '../Footer/Footer';
import PageLoader from '../PageLoader/PageLoader';

const Layout = ({ children }) => {
  const [loaderDone, setLoaderDone] = useState(() => {
    try {
      return sessionStorage.getItem("ag_portfolio_loaded") === "true";
    } catch (e) {
      return false;
    }
  });

  const handleLoaderComplete = () => {
    try {
      sessionStorage.setItem("ag_portfolio_loaded", "true");
    } catch (e) {
      // Ignore sessionStorage errors
    }
    setLoaderDone(true);
  };


  return (
    <>
      <ClickSpark
        sparkColor="#fff"
        sparkSize={8}
        sparkRadius={12}
        sparkCount={8}
        duration={400}
      >
        <CustomCursor />
        <a href="#main-content" className="skip-link">Skip to content</a>
        
        {/* Persistent Navigation */}
        <div className="card-header" style={{ zIndex: 1000, position: 'fixed', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
          <Link to="/" className="home-link">Home</Link>
          <ul className="card-tabs">
            <li>
              <Link to="/projects">Projects</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
          </ul>
        </div>

        {/* Main Content Area */}
        <main id="main-content" className="AppMain" style={{ paddingTop: '80px', flex: 1 }}>
          {children}
        </main>

        {/* Persistent Footer */}
        <div className="section-divider" aria-hidden="true" />
        <motion.div
          className="footer-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Footer />
        </motion.div>
      </ClickSpark>

      {!loaderDone && <PageLoader onDone={handleLoaderComplete} />}
    </>
  );
};

export default Layout;
