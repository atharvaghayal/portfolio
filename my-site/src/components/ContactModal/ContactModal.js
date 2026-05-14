import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaTimes, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import './ContactModal.css';

const ContactModal = ({ onClose }) => {
  const form = useRef();
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'
  const [errorMessage, setErrorMessage] = useState('');

  // Initialize EmailJS on component mount
  useEffect(() => {
    if (process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      emailjs.init(process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
      console.log('EmailJS initialized');
      console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID ? '✓ Set' : '✗ Missing');
      console.log('Template ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID ? '✓ Set' : '✗ Missing');
      console.log('Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY ? '✓ Set' : '✗ Missing');
      console.log('Admin Email:', process.env.REACT_APP_ADMIN_EMAIL);
    } else {
      console.error('EmailJS Public Key not configured!');
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMessage('');

    // Check if EmailJS credentials are configured
    if (!process.env.REACT_APP_EMAILJS_SERVICE_ID || 
        !process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 
        !process.env.REACT_APP_EMAILJS_PUBLIC_KEY) {
      setStatus('error');
      setErrorMessage('Email service not configured. Please contact the site owner.');
      console.error('Missing EmailJS credentials');
      return;
    }

    const templateParams = {
      to_email: process.env.REACT_APP_ADMIN_EMAIL,
      from_name: form.current.from_name.value,
      from_email: form.current.from_email.value,
      message: form.current.message.value,
      reply_to: form.current.from_email.value
    };

    console.log('=== SENDING EMAIL ===');
    console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log('Template ID:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID);
    console.log('Public Key:', process.env.REACT_APP_EMAILJS_PUBLIC_KEY);
    console.log('Template Parameters:', templateParams);

    emailjs
      .send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        templateParams
      )
      .then(
        (result) => {
          console.log('✓ Email sent successfully!', result);
          setStatus('success');
          form.current.reset();
        },
        (error) => {
          console.error('✗ Email send failed:', error);
          console.error('Error status:', error.status);
          console.error('Error text:', error.text);
          console.error('Full error:', JSON.stringify(error, null, 2));
          setStatus('error');
          setErrorMessage(`Failed to send message (Error ${error.status}). Please check console for details.`);
        }
      );
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
            <h3>Message received successfully!</h3>
            <p>Thanks for reaching out! I'll get back to you as soon as possible.</p>
            <button className="submit-btn" onClick={onClose}>Close</button>
          </div>
        ) : status === 'error' ? (
          <div className="status-message error">
            <FaExclamationCircle className="status-icon" />
            <h3>Oops! Something went wrong</h3>
            <p>{errorMessage}</p>
            <button className="submit-btn" onClick={() => setStatus('idle')}>Try Again</button>
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
