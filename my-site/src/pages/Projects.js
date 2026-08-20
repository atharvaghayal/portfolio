import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChromaGrid from '../components/ChromaGrid/ChromaGrid';
import AnimatedPage from '../components/Layout/AnimatedPage';
import ProjectModal from '../components/ProjectModal/ProjectModal';
import './Projects.css';
import pythonLogo from '../assets/python.png';
import reactLogo from '../assets/react.png';
import javascriptLogo from '../assets/js.png';
import powerBiLogo from '../assets/powerbi.png';
import excelLogo from '../assets/msexcel.png';

const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

const items = [
  {
    image: pythonLogo,
    title: "Self LLM",
    subtitle: "Self trained LLM on my personal data",
    category: "AI/ML",
    borderColor: "#A855F7",
    gradient: "linear-gradient(145deg, #A855F7, #000)",
    url: ""
  },
  {
    image: reactLogo,
    title: "Advanced Splitwise app",
    subtitle: "Smart group expense tracking with seamless settlement and shared budgets",
    category: "Web",
    borderColor: "#EC4899",
    gradient: "linear-gradient(170deg, #EC4899, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: javascriptLogo,
    title: "Quickle Word Game",
    subtitle: "Quickle - style guessing game",
    category: "Web",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/atharvaghayal/quickle"
  },
  {
    image: powerBiLogo,
    title: "Solar Panel Potential Estimation",
    subtitle: "ML models to estimate solar panel potential",
    category: "AI/ML",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: powerBiLogo,
    title: "Supply Chain Control Tower",
    subtitle: "Forecasting + Statistics + SQL + Power BI",
    category: "Data",
    borderColor: "#14B8A6",
    gradient: "linear-gradient(145deg, #14B8A6, #000)",
    url: ""
  },
  {
    image: excelLogo,
    title: "Tax Calculator",
    subtitle: "Tax calculator for current tax regimes",
    category: "Web",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/atharvaghayal/Tax-Calc-by-Atharva-Ghayal"
  },
  {
    image: powerBiLogo,
    title: "Budgetbot & Investment analysis",
    subtitle: "College mini project for budgeting & investments",
    category: "Web",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "https://github.com/atharvaghayal/Sem-6-mini-project."
  }
];

const categories = ["All", "Web", "AI/ML", "Data", "Other"];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredItems, setFilteredItems] = useState(items);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [elasticOffset, setElasticOffset] = useState(0);
  const elasticReleaseTimeout = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    if (activeCategory === "All") {
      setFilteredItems(items);
    } else {
      setFilteredItems(items.filter(item => item.category === activeCategory));
    }
  }, [activeCategory]);

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

  const handleProjectClick = (project) => {
    if (project.isBlankCanvas) return;
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <AnimatedPage>
      <div
        style={{
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          '--elastic-offset': `${elasticOffset}px`
        }}
      >
        <div className="content-wrapper" style={{ position: 'relative', zIndex: 2, paddingTop: '4rem' }}>
          
          <motion.div 
            className="portfolio-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="projects-title">Featured Work</h1>
            <p className="projects-subtitle">A collection of things I've built, experimented with, and learned from.</p>
            
            <div className="category-filters">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.section 
            className="project-gallery"
            layout
          >
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
              >
                <ChromaGrid 
                  items={filteredItems} 
                  onProjectClick={handleProjectClick}
                />
              </motion.div>
            </AnimatePresence>
          </motion.section>
          
          <ProjectModal 
            project={selectedProject}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Projects;
