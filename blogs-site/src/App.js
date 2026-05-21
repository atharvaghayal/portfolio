import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const maxElasticOffset = 12;
const elasticReleaseDelay = 120;

function App() {
  const [elasticOffset, setElasticOffset] = useState(0);
  const elasticReleaseTimeout = useRef(null);
  const touchStartY = useRef(null);

  useEffect(() => {
    const releaseElastic = () => {
      window.clearTimeout(elasticReleaseTimeout.current);
      elasticReleaseTimeout.current = window.setTimeout(() => {
        setElasticOffset(0);
      }, elasticReleaseDelay);
    };

    const applyElastic = (deltaY) => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
      const maxScrollTop = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight
      );
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop >= maxScrollTop - 1;

      if (isAtTop && deltaY < 0) {
        setElasticOffset(maxElasticOffset);
        releaseElastic();
      } else if (isAtBottom && deltaY > 0) {
        setElasticOffset(-maxElasticOffset);
        releaseElastic();
      }
    };

    const onWheel = (event) => applyElastic(event.deltaY);
    const onTouchStart = (event) => {
      touchStartY.current = event.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (event) => {
      if (touchStartY.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      applyElastic(touchStartY.current - currentY);
    };
    const onScroll = () => {
      setElasticOffset(0);
    };

    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.clearTimeout(elasticReleaseTimeout.current);
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <div className="App" style={{ '--elastic-offset': `${elasticOffset}px` }}>
      <header className="top-nav">
        <a
          className="top-link top-left"
          href="http://localhost:3000/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://localhost:3000/';
          }}
        >
          Home
        </a>

        <a
          className="top-link"
          href="http://localhost:3001/"
          onClick={(e) => {
            e.preventDefault();
            window.location.href = 'http://localhost:3001/';
          }}
        >
          Projects
        </a>
      </header>

      <main className="content">
        <div className="card">
          <h1>
            Currently working on this page <span className="emoji">✍️🛠️</span>
          </h1>
          <p className="sub">Check back soon! <span className="emoji">⏳</span></p>
        </div>
      </main>
    </div>
  );
}

export default App;
