import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from '@emailjs/browser'; // Import EmailJS
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');

    emailjs.sendForm("service_r7il5fq", "template_b0i701z", form.current, "0vc8wsGYQP3jdWK9N")
      .then((result) => {
          console.log(result.text);
          setStatus('success');
      }, (error) => {
          console.log(error.text);
          setStatus('error');
      });
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
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
            <button className="submit-btn" onClick={onClose}>Close</button>
          </div>
        ) : status === 'error' ? (
          <div className="status-message error">
            <FaExclamationCircle className="status-icon" />
            <h3>Something went wrong.</h3>
            <p>Please try again later or email me directly.</p>
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
