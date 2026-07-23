import React from 'react';
import { motion } from 'framer-motion';
import CountUp from '../CountUp.js';
import './Stats.css';

const Stats = () => {
  const statsData = [
    { label: 'Projects Completed', value: 6 },
    { label: 'GitHub Commits', value: 364, suffix: '*' },
    { label: 'LLMs developed', value: 0 },
    { label: 'Years Coding', value: 3, suffix: '*' },
  ];

  return (
    <section className="stats-section">
      <motion.div
        className="stats-container"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6 }}
      >
        {statsData.map((stat, index) => (
          <div className="stat-item" key={index}>
            <div className="stat-value">
              <CountUp
                end={stat.value}
              />
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <div className="stat-label">{stat.label}</div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default Stats;
