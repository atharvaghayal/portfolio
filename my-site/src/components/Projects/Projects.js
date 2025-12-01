import React from 'react';
import './Projects.css';
import projectsData from '../../data/projects.json';
import logo from '../../assets/logo.png';

const Projects = ({ id }) => {
  return (
    <section id={id || 'projects'} className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">Projects</h2>
        <p className="projects-sub">Selected projects and demos from this workspace.</p>

        <div className="projects-grid">
          {projectsData.map((p) => (
            <div key={p.id} className="project-card">
              <img src={logo} alt={p.title} className="project-thumb" />
              <div className="project-body">
                <h3 className="project-name">{p.title}</h3>
                <p className="project-short">{p.short}</p>
                <p className="project-desc">{p.description}</p>
                <div className="project-links">
                  {p.link && (
                    <a className="btn" href={p.link} target="_blank" rel="noreferrer">Open</a>
                  )}
                  {p.github && (
                    <a className="btn btn-outline" href={p.github} target="_blank" rel="noreferrer">Code</a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
