import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FaTimes, FaCheckCircle } from 'react-icons/fa';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate sending delay
    setTimeout(() => {
      setStatus('success');
    }, 1000); // 1 second delay for better UX
  };

  return (
    <motion.div 
      className="modal-overlay"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div 
        className="modal-content"
        onClick={(e) => e.stopPropagation()} 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        {/* Show different content based on send status */}
        {status === 'success' ? (
          <div className="status-message success">
            <FaCheckCircle className="status-icon" />
            <h3>Note received successfully!</h3>
            <p>Will get back to you as soon as possible!</p>
            <button className="submit-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          // Default Form View
          <>
            <h2>Send a Note</h2>
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                {/* 'name' attributes must match your EmailJS template (e.g., {{from_name}}) */}
                <input type="text" id="name" name="from_name" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="from_email" className="form-input" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" className="form-textarea" rows="5" required></textarea>
              </div>
              
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={status === 'sending'}
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </>
        )}

      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
