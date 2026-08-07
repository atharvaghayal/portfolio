import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

/**
 * CountUp component that animates from 0 to `end` only once,
 * and only when `startAnimation` is true.
 *
 * Props:
 *   end            {number}  - The target value to count up to.
 *   startAnimation {boolean} - When true, triggers the count-up animation.
 */
const CountUp = ({ end, startAnimation }) => {
  const countRef = useRef(null);
  const animationRef = useRef(null);
  const hasAnimated = useRef(false); // Guard: animate only once

  // Keep the display at "0" until animation fires
  useEffect(() => {
    if (countRef.current && !hasAnimated.current) {
      countRef.current.innerText = '0';
    }
  }, []);

  useEffect(() => {
    // Only proceed if we are told to start AND haven't animated yet
    if (!startAnimation || hasAnimated.current) return;

    hasAnimated.current = true;

    const counter = { value: 0 };
    // If end is 0, we still want to "count" to 0 (show nothing animating is fine)
    const target = end ?? 0;

    // Kill any previous animation just in case
    if (animationRef.current) {
      animationRef.current.kill();
    }

    animationRef.current = gsap.to(counter, {
      value: target,
      duration: 2.5,
      ease: 'power3.out',
      onUpdate: () => {
        if (countRef.current) {
          countRef.current.innerText = Math.round(counter.value).toLocaleString();
        }
      },
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [startAnimation, end]);

  return <span ref={countRef}>0</span>;
};

export default CountUp;