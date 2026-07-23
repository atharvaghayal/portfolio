import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ChromaGrid from '../components/ChromaGrid/ChromaGrid';
import AnimatedPage from '../components/Layout/AnimatedPage';
import ProjectModal from '../components/ProjectModal/ProjectModal';
import './Projects.css';

const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

const items = [
  {
    image: "/collegeproject.webp",
    title: "Advanced Splitwise app",
    subtitle: "Smart group expense tracking with seamless settlement and shared budgets",
    category: "Web",
    borderColor: "#EC4899",
    gradient: "linear-gradient(170deg, #EC4899, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/vault.webp",
    title: "HydraSync: AI-driven hydration companion",
    subtitle: "Hourly water intake tracking with sensor-backed hardware and LLM-powered wellness insights",
    category: "Other",
    borderColor: "#38BDF8",
    gradient: "linear-gradient(145deg, #38BDF8, #000)",
    url: ""
  },
  {
    image: "/quickle.webp",
    title: "Quickle Word Game",
    subtitle: "Quickle - style guessing game",
    category: "Web",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/atharvaghayal/quickle"
  },
  {
    image: "/f1.webp",
    title: "WDC Forecast Engine",
    subtitle: "F1 statistics prediction and visualization",
    category: "Data",
    borderColor: "#34D399",
    gradient: "linear-gradient(200deg, #34D399, #000)",
    url: "https://github.com/atharvaghayal/WDC-Forecast-Engine"
  },
  {
    image: "/solar.webp",
    title: "Solar Panel Potential Estimation",
    subtitle: "ML models to estimate solar panel potential",
    category: "AI/ML",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/tax.webp",
    title: "Tax-Sense Engine",
    subtitle: "Tax calculator for current tax regimes",
    category: "Web",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/atharvaghayal/Tax-Calc-by-Atharva-Ghayal"
  },
  {
    image: "invest.webp",
    title: "BudgetBot & capital analysis",
    subtitle: "College mini project for budgeting & investments",
    category: "Web",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "https://github.com/atharvaghayal/Sem-6-mini-project."
  },
  {
    image: "/vault.webp",
    title: "My Learning Vault",
    subtitle: "Collection of personal handwritten notes",
    category: "Web",
    borderColor: "#F97316",
    gradient: "linear-gradient(155deg, #F97316, #000)",
    url: "https://github.com/atharvaghayal/Notes-Web-Application"
  },
  {
    image: "/todo.webp",
    title: "COVID-Public-Health-Data-Analysis",
    subtitle: "Analysis of Data of Spreading of virus with respect to effect!",
    category: "Data",
    borderColor: "#8B0000",
    gradient: "linear-gradient(135deg, #808080, #8B0000)",
    url: "https://github.com/atharvaghayal/Floating-To-do-list"
  },
  {
    image: "/todo.webp",
    title: "Floating To-do list",
    subtitle: "Desktop to-do list built with ElectronJS",
    category: "Other",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "https://github.com/atharvaghayal/Floating-To-do-list"
  },
  {
    title: "Weather API App",
    subtitle: "Live forecast insights with hourly weather tracking and predictive alerts",
    category: "Web",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "",
    isBlankCanvas: true
  },
  {
    title: "SBL Bookstore Frontend",
    subtitle: "HTML/CSS/JS bookstore experience with catalog browsing",
    category: "Web",
    borderColor: "#F472B6",
    gradient: "linear-gradient(145deg, #F472B6, #000)",
    url: "",
    isBlankCanvas: true
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
