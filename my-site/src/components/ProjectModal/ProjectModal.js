import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt } from 'react-icons/fa';
import './ProjectModal.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="modal-overlay" onClick={onClose}>
          <motion.div 
            className="modal-content"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ '--modal-border': project.borderColor }}
          >
            <button className="modal-close" onClick={onClose}>
              <FaTimes />
            </button>
            
            <div className="modal-hero">
              <div className="modal-image-wrapper">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="modal-hero-gradient" style={{ background: project.gradient }}></div>
            </div>

            <div className="modal-body">
              <span className="modal-category">{project.category}</span>
              <h2 className="modal-title">{project.title}</h2>
              <p className="modal-subtitle">{project.subtitle}</p>
              
              <div className="modal-details">
                <p>
                  This project was built to solve specific challenges in the {project.category} domain. 
                  It focuses on performance, user experience, and scalable architecture.
                  The implementation leveraged modern frameworks and best practices to ensure a high-quality end product.
                </p>
                {/* Additional details can be added here if available in the project data */}
              </div>

              {project.url && (
                <div className="modal-actions">
                  <a href={project.url} target="_blank" rel="noopener noreferrer" className="modal-btn">
                    <span>View Live Project</span>
                    <FaExternalLinkAlt />
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
