import React from 'react';
import './App.css';
import ChromaGrid from './components/ChromaGrid/ChromaGrid';
import ClickSpark from './components/ClickSpark/ClickSpark';
import Abstract3D from './components/Abstract3D';

// Updated static data for 9 ChromaGrid items (3x3 layout)
// These represent your projects and now maintain their full vertical size.
const items = [
  {
    image: "https://i.pravatar.cc/300?img=1",
    title: "Solar Panel Potential Estimation : Training ML models",
    subtitle: "ML models to estimate solar panel potential",
    handle: "",
    borderColor: "#3B82F6",
    gradient: "linear-gradient(145deg, #3B82F6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=2",
    title: "Tax-Sense Engine : 2025-26 regime Tax Calculator",
    subtitle: "Tax calculator for current tax regimes",
    handle: "",
    borderColor: "#10B981",
    gradient: "linear-gradient(180deg, #10B981, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=3",
    title: "BudgetBot & capital analysis : College Mini project",
    subtitle: "College mini project for budgeting & investments",
    handle: "",
    borderColor: "#F59E0B",
    gradient: "linear-gradient(165deg, #F59E0B, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=4",
    title: "TubeNinja : Youtube video downloader web app.",
    subtitle: "Web app to download YouTube videos",
    handle: "",
    borderColor: "#EF4444",
    gradient: "linear-gradient(195deg, #EF4444, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=5",
    title: "Guess in the Dark : Blind wordle game",
    subtitle: "Blind Wordle-style guessing game",
    handle: "",
    borderColor: "#8B5CF6",
    gradient: "linear-gradient(225deg, #8B5CF6, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=6",
    title: "To-do list : using ElectronJS",
    subtitle: "Desktop to-do list built with Electron",
    handle: "",
    borderColor: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=7",
    title: "My Learning Vault : My Handwritten notes materials.",
    subtitle: "Collection of personal handwritten notes",
    handle: "",
    borderColor: "#F97316",
    gradient: "linear-gradient(155deg, #F97316, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=8",
    title: "Collge Major Mroject",
    subtitle: "College major project",
    handle: "",
    borderColor: "#EC4899",
    gradient: "linear-gradient(170deg, #EC4899, #000)",
    url: "https://github.com/atharvaghayal?tab=repositories"
  },
  {
    image: "https://i.pravatar.cc/300?img=9",
    title: "WDC Forecast Engine : F1 stats prediction page",
    subtitle: "F1 statistics prediction and visualization",
    handle: "",
    borderColor: "#34D399",
    gradient: "linear-gradient(200deg, #34D399, #000)",
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
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'http://localhost:3000/';
            }}
          >
            Home
          </a>
          <a
            className="top-link top-right"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.location.href = 'http://localhost:3002/';
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