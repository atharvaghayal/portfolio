import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const CountUp = ({ end }) => {
  const countRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    // This object's value will be animated by GSAP
    const counter = { value: 0 };
    const target = end || 1; // Default to 1 if end is 0

    // Kill any previous animation
    if (animationRef.current) {
      animationRef.current.kill();
    }

    // Start the new animation
    animationRef.current = gsap.to(counter, {
      value: target,
      duration: 2.5, // 2.5 second animation
      ease: 'power3.out',
      onUpdate: () => {
        // Update the DOM element's text on each frame
        if (countRef.current) {
          countRef.current.innerText = Math.round(counter.value).toLocaleString();
        }
      },
    });

    // Cleanup on unmount
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [end]); // Re-run animation if the 'end' prop changes

  return <span ref={countRef} />;
};

export default CountUp;