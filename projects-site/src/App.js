import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import ChromaGrid from './components/ChromaGrid/ChromaGrid';
import ClickSpark from './components/ClickSpark/ClickSpark';

const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

const items = [
  {
    image: "/collegeproject.webp",
    title: "Advanced Splitwise app",
    subtitle: "Smart group expense tracking with seamless settlement and shared budgets",
    handle: "",
    borderColor: "#EC4899",
    gradient: "linear-gradient(170deg, #EC4899, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/vault.webp",
    title: "HydraSync: AI-driven hydration companion",
    subtitle: "Hourly water intake tracking with sensor-backed hardware and LLM-powered wellness insights",
    handle: "",
    borderColor: "#38BDF8",
    gradient: "linear-gradient(145deg, #38BDF8, #000)",
    url: ""
  },
  {
    image: "/quickle.webp",
    title: "Quickle Word Game",
    subtitle: "Quickle - style guessing game",
    handle: "",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/atharvaghayal/quickle"
  },
  {
    image: "/f1.webp",
    title: "WDC Forecast Engine : F1 stats prediction page",
    subtitle: "F1 statistics prediction and visualization",
    handle: "",
    borderColor: "#34D399",
    gradient: "linear-gradient(200deg, #34D399, #000)",
    url: "https://github.com/atharvaghayal/WDC-Forecast-Engine"
  },
  {
    image: "/solar.webp",
    title: "Solar Panel Potential Estimation : Training ML models",
    subtitle: "ML models to estimate solar panel potential",
    handle: "",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/tax.webp",
    title: "Tax-Sense Engine : 2025-26 regime Tax Calculator",
    subtitle: "Tax calculator for current tax regimes",
    handle: "",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/atharvaghayal/Tax-Calc-by-Atharva-Ghayal"
  },
  {
    image: "invest.webp",
    title: "BudgetBot & capital analysis : College Mini project",
    subtitle: "College mini project for budgeting & investments",
    handle: "",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "https://github.com/atharvaghayal/Sem-6-mini-project."
  },
  {
    image: "/vault.webp",
    title: "My Learning Vault : My Handwritten notes materials.",
    subtitle: "Collection of personal handwritten notes",
    handle: "",
    borderColor: "#F97316",
    gradient: "linear-gradient(155deg, #F97316, #000)",
    url: "https://github.com/atharvaghayal/Notes-Web-Application"
  },
  {
    image: "/todo.webp",
    title: "COVID-Public-Health-Data-Analysis",
    subtitle: "Analysis of Data of Spreading ofvirus with respect to effect!",
    handle: "",
    borderColor: "#8B0000",
    gradient: "linear-gradient(135deg, #808080, #8B0000)",
    url: "https://github.com/atharvaghayal/Floating-To-do-list"
  },
  {
    image: "/todo.webp",
    title: "Floating To-do list : Knowing one more JS framework 'ElectronJS'",
    subtitle: "Desktop to-do list built with Electron",
    handle: "",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "https://github.com/atharvaghayal/Floating-To-do-list"
  }
];

const createBlankCanvasCards = (sectionName) =>
  Array.from({ length: 3 }, (_, index) => ({
    title: `${sectionName} blank canvas ${index + 1}`,
    isBlankCanvas: true,
    borderColor: "#555",
    gradient: "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.02))"
  }));

function App() {
  // Split items into the first section without Quickle, then remaining items
  const firstSectionItems = [
    ...items.slice(0, 2),
    items[4],
    ...items.slice(3, 4),
    ...items.slice(5, 7)
  ];
  const remainingItems = [items[2], items[9], items[8], items[7]];
  const projectSections = [
    {
      title: "Want to be part of my projects?",
      items: firstSectionItems
    },
    {
      title: "Case Studies",
      items: [
        { ...items[5] },
        { ...items[9] },
        {
          title: "Weather API App",
          subtitle: "Live forecast insights with hourly weather tracking and predictive alerts",
          handle: "",
          borderColor: "#3B82F6",
          gradient: "linear-gradient(145deg, #3B82F6, #000)",
          url: ""
        }
      ]
    },
    {
      title: "Labs / R&D",
      items: [items[1], items[0], items[3], items[8]]
    },
    {
      title: "College Group Projects",
      items: [
        items[4],
        { ...items[6] },
        {
          title: "SBL Bookstore Frontend",
          subtitle: "HTML/CSS/JS bookstore experience with catalog browsing and responsive checkout design",
          handle: "",
          borderColor: "#F472B6",
          gradient: "linear-gradient(145deg, #F472B6, #000)",
          url: ""
        },
        {
          title: "Highschool Library Master",
          subtitle: "Smart book tracking and student borrowing management for campus libraries",
          handle: "",
          borderColor: "#FBBF24",
          gradient: "linear-gradient(145deg, #FBBF24, #000)",
          url: ""
        }
      ]
    },
    {
      title: "Additional Work :",
      items: remainingItems
    }
  ];

  const [elasticOffset, setElasticOffset] = useState(0);
  const elasticReleaseTimeout = useRef(null);
  const touchStartY = useRef(null);

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
        style={{
          minHeight: '100vh',
          background: '#000',
          position: 'relative',
          zIndex: 1,
          '--elastic-offset': `${elasticOffset}px`
        }}
      >
        {/* Navigation Header */}
        <div className="card-header">
          <a 
            href="/" 
            className="home-link"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'http://localhost:3000/';
            }}
          >
            Home
          </a>
          <ul className="card-tabs">
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

        {/* Main content wrapper - no black card background */}
        <div className="content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          {projectSections.map((section) => (
            <section className="project-section" key={section.title}>
              <h2 className="projects-invite">{section.title}</h2>
              <ChromaGrid items={section.items} />
            </section>
          ))}
        </div>
      </div>
    </ClickSpark>
  );
}

export default App;
