import React from 'react';
import { motion } from 'framer-motion';
import AnimatedPage from '../components/Layout/AnimatedPage';

const Blogs = () => {
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
        
        <div style={{ background: 'var(--bg-elevated)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', maxWidth: '400px', margin: '0 auto' }}>
          <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-primary)' }}>Get Notified</h3>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '0.5rem' }}>
            <input 
              type="email" 
              placeholder="Enter your email..." 
              style={{ flex: 1, padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.5)', color: '#fff', outline: 'none' }} 
            />
            <button 
              type="submit" 
              style={{ background: 'var(--accent-primary)', color: '#fff', border: 'none', padding: '0 1.5rem', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Notify Me
            </button>
          </form>
          </div>
        </motion.div>
      </div>
    </AnimatedPage>
  );
};

export default Blogs;
