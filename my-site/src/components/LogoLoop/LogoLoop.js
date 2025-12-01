import React from 'react';
import './LogoLoop.css';

// Import all 13 of your logos from the assets folder
import css from '../../assets/css.png';
import figma from '../../assets/figma.png';
import git from '../../assets/git.png';
import github from '../../assets/github.png';
import html from '../../assets/html.png';
// FIX: Renamed the import from 'java.' to 'javaL'
import javaL from '../../assets/java.png';
import js from '../../assets/js.png';
import jupyter from '../../assets/jupyter.png';
import msexcel from '../../assets/msexcel.png';
import powerbi from '../../assets/powerbi.png';
import python from '../../assets/python.png';
import react from '../../assets/react.png';
import vscode from '../../assets/vscode.png';

// Create an array of logo objects (image and alt text)
const logos = [
  { src: html, alt: 'HTML5' },
  { src: css, alt: 'CSS3' },
  { src: js, alt: 'JavaScript' },
  { src: react, alt: 'React' },
  { src: python, alt: 'Python' },
  // FIX: Updated the src to use the new 'javaL' variable
  { src: javaL, alt: 'Java' },
  { src: jupyter, alt: 'Jupyter' },
  { src: powerbi, alt: 'Power BI' },
  { src: msexcel, alt: 'MS Excel' },
  { src: git, alt: 'Git' },
  { src: github, alt: 'GitHub' },
  { src: figma, alt: 'Figma' },
  { src: vscode, alt: 'VS Code' },
];

function LogoLoop() {
  // Duplicate the logos array for a seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="logo-loop-section">
      <h3 className="logo-loop-title">Languages and tools I use :</h3>
      <div className="logo-loop-container">
        <div className="logo-loop-slider">
          {allLogos.map((logo, index) => (
            <img
              key={index}
              src={logo.src}
              alt={logo.alt}
              className="logo-item"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default LogoLoop;