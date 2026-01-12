import React from 'react';
import './App.css';
import ChromaGrid from './components/ChromaGrid/ChromaGrid';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Abstract3D from './components/Abstract3D';

const items = [
  {
    image: "/collegeproject.webp",
    title: "Collge Major Mroject",
    subtitle: "Crop type Classification using multiple predefined LLM's",
    handle: "",
    borderColor: "#EC4899",
    gradient: "linear-gradient(170deg, #EC4899, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/blindwordle.webp",
    title: "Quickle Word Game",
    subtitle: "Quickle - style guessing game",
    handle: "",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/f1.webp",
    title: "WDC Forecast Engine : F1 stats prediction page",
    subtitle: "F1 statistics prediction and visualization",
    handle: "",
    borderColor: "#34D399",
    gradient: "linear-gradient(200deg, #34D399, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
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
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/tubeninja.webp",
    title: "TubeNinja : Youtube video downloader web app.",
    subtitle: "Web app to download YouTube videos",
    handle: "",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "/todo.webp",
    title: "Floating To-do list : Knowing one more JS framework 'ElectronJS'",
    subtitle: "Desktop to-do list built with Electron",
    handle: "",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  }
];

function App() {
  // Split items into first 6 and remaining 3
  const firstSixItems = items.slice(0, 6);
  const remainingItems = items.slice(6);

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
          background: 'transparent',
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* 3D Background Layer */}
        <div 
          className="abstract-3d-background"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 1
          }}
        >
          <Abstract3D />
        </div>

        {/* Top navigation: Home (left) and Blogs (right) */}
        <header className="top-nav" style={{ position: 'relative', zIndex: 3 }}>
          <a
            className="top-link top-left"
            href="#Home"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'http://localhost:3000/';
            }}
          >
            Home
          </a>
          <a
            className="top-link top-right"
            href="#Blogs"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = "http://localhost:3002/";
            }}
          >
            Blogs
          </a>
        </header>

        {/* Main content wrapper - no black card background */}
        <div className="content-wrapper" style={{ position: 'relative', zIndex: 2 }}>
          <h2 className="projects-invite">Want to be part of my projects?</h2>
          
          {/* First 6 cards */}
          <ChromaGrid 
            items={firstSixItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6} 
            ease="power3.out"
          />

          {/* "Other Projects" divider */}
          <h2 className="projects-invite">Additional Work :</h2>

          {/* Remaining 3 cards */}
          <ChromaGrid 
            items={remainingItems}
            radius={300}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </ClickSpark>
  );
}

export default App;