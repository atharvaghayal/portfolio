import React, { useEffect, useRef, useState } from "react";
import "./PageLoader.css";

const CIRC = 2 * Math.PI * 68; // r=68 → 427.26

export default function PageLoader({ onDone }) {
  const [visible, setVisible] = useState(true);
  const containerRef = useRef(null);
  const barRef = useRef(null);
  const pctTextRef = useRef(null);
  const rafRef = useRef(null);

  const onDoneRef = useRef(onDone);
  
  // Keep the ref updated if the parent ever supplies a different callback
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    // Direct DOM progress updater to avoid React re-render lags
    const setProgress = (value) => {
      const v = Math.min(Math.max(value, 0), 100);
      const rounded = Math.round(v);
      
      if (pctTextRef.current) {
        pctTextRef.current.textContent = rounded;
      }
      if (barRef.current) {
        barRef.current.style.strokeDashoffset = CIRC * (1 - v / 100);
      }
      if (containerRef.current) {
        containerRef.current.setAttribute("aria-label", `Loading portfolio, ${rounded} percent`);
      }
    };

    // Initialize at 0%
    setProgress(0);

    // Single unified smooth animation loop of 1300ms duration (finished within 1.5s total)
    let start = null;
    const DURATION = 1300; 

    // Smooth cubic-bezier-like ease out for progress transition
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progressRatio = Math.min(elapsed / DURATION, 1);
      
      const easedProgress = easeOutCubic(progressRatio) * 100;
      setProgress(easedProgress);

      if (progressRatio < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => {
          setVisible(false); // Triggers CSS fade
          setTimeout(() => {
            onDoneRef.current && onDoneRef.current();
          }, 450); // Matches CSS transition duration
        }, 150);
      }
    };

    // Delay start slightly (50ms) to let the initial layout mount rendering complete, 
    // ensuring the animation starts smoothly.
    const delayStartTimer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 50);

    return () => {
      clearTimeout(delayStartTimer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={containerRef}
      className={`page-loader${!visible ? " page-loader--done" : ""}`}
      role="status"
      aria-live="polite"
    >
      <div className="pl-widget">
        {/* SVG ring */}
        <svg className="pl-svg" viewBox="0 0 160 160" aria-hidden="true">
          <defs>
            <linearGradient id="plGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%"   stopColor="#00d4ff" />
              <stop offset="50%"  stopColor="#a040ff" />
              <stop offset="100%" stopColor="#00ffcc" />
            </linearGradient>
            <filter id="plGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* track */}
          <circle className="pl-track" cx="80" cy="80" r="68" />
          {/* progress bar */}
          <circle ref={barRef} className="pl-bar"  cx="80" cy="80" r="68" />
        </svg>

        {/* Number */}
        <span className="pl-pct" aria-hidden="true">
          <span ref={pctTextRef}>0</span>
          <span className="pl-pct-sign">%</span>
        </span>

        {/* Label */}
        <span className="pl-label" aria-hidden="true">Loading</span>
      </div>
    </div>
  );
}
