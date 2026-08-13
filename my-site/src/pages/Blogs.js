import React, { useState } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import AnimatedPage from '../components/Layout/AnimatedPage';

const Blogs = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const successMessage = 'Thanks for subscribing! You will be notified when new articles are published on my portfolio site blogs page';
  const emailSubject = 'atharva ghayal blogs subscription';
  const replyToEmail = 'atharva160504@gmail.com';

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!trimmedEmail) {
      setStatus({ type: 'error', message: 'Please enter your email address.' });
      return;
    }

    if (!emailRegex.test(trimmedEmail)) {
      setStatus({ type: 'error', message: 'Please enter a valid email address.' });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'default_service';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'default_template';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'default_public_key';

      const templateParams = {
        from_name: 'Atharva Ghayal',
        reply_to: replyToEmail,
        to_email: trimmedEmail,
        email: trimmedEmail,
        subject: emailSubject,
        message: successMessage,
      };

      if (serviceId === 'default_service') {
        if (typeof window !== 'undefined') {
          const savedSubscribers = JSON.parse(localStorage.getItem('blogSubscribers') || '[]');
          const uniqueSubscribers = savedSubscribers.includes(trimmedEmail)
            ? savedSubscribers
            : [...savedSubscribers, trimmedEmail];
          localStorage.setItem('blogSubscribers', JSON.stringify(uniqueSubscribers));
        }
      } else {
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
      }

      setStatus({ type: 'success', message: successMessage });
      setEmail('');
    } catch (error) {
      console.error('Blog subscription error:', error);
      setStatus({ type: 'error', message: 'Something went wrong. Please try again in a moment.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedPage>
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '2rem' }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: 'spring' }}
        >
          <h1 style={{ fontSize: '3rem', marginBottom: '1rem', background: 'var(--gradient-hero)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Coming Soon
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Currently working on this page ✍️🛠️. Check back soon for articles on AI, automation, and full-stack development! ⏳
          </p>

          <div style={{ background: 'var(--bg-elevated)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '440px', margin: '0 auto' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>Get Notified</h3>
            <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email..."
                  aria-label="Email address"
                  style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', outline: 'none' }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
                >
                  {isSubmitting ? 'Sending...' : 'Notify Me'}
                </button>
              </div>

              {status.message && (
                <div
                  style={{
                    marginTop: '0.75rem',
                    padding: '0.75rem 0.9rem',
                    borderRadius: '8px',
                    fontSize: '0.95rem',
                    textAlign: 'left',
                    background: status.type === 'success' ? 'rgba(33, 196, 110, 0.12)' : 'rgba(255, 94, 94, 0.12)',
                    border: `1px solid ${status.type === 'success' ? 'rgba(33, 196, 110, 0.35)' : 'rgba(255, 94, 94, 0.35)'}`,
                    color: status.type === 'success' ? '#9ae6b4' : '#fca5a5',
                  }}
                >
                  {status.message}
                </div>
              )}
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Blogs;
