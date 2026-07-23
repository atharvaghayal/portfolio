import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: 'Please fill out all fields.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      // These keys should ideally come from environment variables. 
      // Using placeholders for now if env vars are missing.
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'default_template';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'default_public_key';
      
      if (serviceId === 'default_service') {
        // Mock success if EmailJS isn't configured yet
        await new Promise(resolve => setTimeout(resolve, 1500));
        setStatus({ type: 'success', message: 'Thanks for reaching out! I will get back to you soon.' });
      } else {
        await emailjs.send(serviceId, templateId, formData, publicKey);
        setStatus({ type: 'success', message: 'Message sent successfully!' });
      }
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({ type: 'error', message: 'Failed to send message. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact-section" id="contact">
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="contact-info">
          <h2 className="section-heading">Let's Connect</h2>
          <p className="contact-desc">
            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
          </p>
          
          <div className="contact-details">
            <div className="contact-item">
              <div className="contact-icon"><FaEnvelope /></div>
              <div>
                <h4>Email</h4>
                <a href="mailto:atharvaghayal@gmail.com">atharvaghayal@gmail.com</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Location</h4>
                <p>Navi Mumbai, India</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
                type="text" 
                name="name" 
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <input 
                type="email" 
                name="email" 
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <textarea 
                name="message" 
                placeholder="Your Message" 
                rows="5"
                value={formData.message}
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>
            
            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
              <FaPaperPlane className="submit-icon" />
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
