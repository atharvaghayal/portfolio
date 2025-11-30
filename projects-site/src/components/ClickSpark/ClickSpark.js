import React, { useState, useEffect, useCallback } from 'react';
import './ClickSpark.css';

const ClickSpark = ({ 
  children,
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400
}) => {
  const [sparks, setSparks] = useState([]);

  const removeSpark = useCallback((id) => {
    setSparks(prev => prev.filter(s => s.id !== id));
  }, []);

  const handleClick = useCallback((e) => {
    const { clientX, clientY } = e;
    const id = Date.now();

    const newSpark = {
      id,
      x: clientX,
      y: clientY,
    };

    setSparks(prev => [...prev, newSpark]);

    setTimeout(() => {
      removeSpark(id);
    }, duration);

  }, [duration, removeSpark]);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [handleClick]);

  const particles = Array.from({ length: sparkCount });

  return (
    <>
      {children}
      {sparks.map(spark => (
        <div 
          key={spark.id} 
          className="spark-container" 
          style={{ top: spark.y, left: spark.x }}
        >
          {particles.map((_, i) => {
            const angleDeg = (i / sparkCount) * 360;

            const style = {
              '--angle': `${angleDeg}deg`,
              '--color': sparkColor,
              '--size': `${sparkSize}px`,
              '--radius': `${sparkRadius}px`,
              '--duration': `${duration}ms`
            };
            
            return (
              <i key={i} className="spark-particle" style={style} />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default ClickSpark;
