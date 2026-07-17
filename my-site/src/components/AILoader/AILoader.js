import React, { useEffect, useRef, useState, useCallback } from 'react';
import './AILoader.css';

/* ─────────────────────────────────────────────
   Neural network canvas: nodes + edges + pulses
───────────────────────────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const NODE_COUNT = 42;
    const nodes = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: 2 + Math.random() * 3,
      phase: Math.random() * Math.PI * 2,
    }));

    const pulses = [];
    let lastPulseTime = 0;
    const PULSE_INTERVAL = 380;
    const LINK_DIST = 185;

    stateRef.current = { nodes, pulses, lastPulseTime };

    const draw = (timestamp) => {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const s = stateRef.current;
      const ratio = (s.progress || 0) / 100;

      s.nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
        n.phase += 0.013;
      });

      for (let i = 0; i < s.nodes.length; i++) {
        for (let j = i + 1; j < s.nodes.length; j++) {
          const a = s.nodes[i], b = s.nodes[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const alpha = (1 - dist / LINK_DIST) * 0.32 * Math.max(ratio, 0.08);
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            g.addColorStop(0, `rgba(0,200,255,${alpha})`);
            g.addColorStop(0.5, `rgba(130,60,255,${alpha * 0.65})`);
            g.addColorStop(1, `rgba(0,200,255,${alpha})`);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      if (timestamp - s.lastPulseTime > PULSE_INTERVAL) {
        s.lastPulseTime = timestamp;
        const from = Math.floor(Math.random() * s.nodes.length);
        let to = Math.floor(Math.random() * s.nodes.length);
        if (to === from) to = (from + 1) % s.nodes.length;
        s.pulses.push({ from, to, t: 0, speed: 0.009 + Math.random() * 0.013 });
      }

      for (let i = s.pulses.length - 1; i >= 0; i--) {
        const p = s.pulses[i];
        const a = s.nodes[p.from], b = s.nodes[p.to];
        p.t += p.speed;
        if (p.t >= 1) { s.pulses.splice(i, 1); continue; }
        const px = a.x + (b.x - a.x) * p.t;
        const py = a.y + (b.y - a.y) * p.t;
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 9);
        glow.addColorStop(0, `rgba(0,230,255,${0.95 * Math.max(ratio, 0.3)})`);
        glow.addColorStop(1, 'rgba(0,230,255,0)');
        ctx.beginPath();
        ctx.arc(px, py, 9, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }

      s.nodes.forEach((n) => {
        const pulse = 0.7 + 0.3 * Math.sin(n.phase);
        const al = Math.max(ratio, 0.1);
        const glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        glow.addColorStop(0, `rgba(0,200,255,${0.9 * pulse * al})`);
        glow.addColorStop(0.4, `rgba(130,60,255,${0.4 * pulse * al})`);
        glow.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,215,255,${0.95 * al})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="ai-loader__neural-canvas" aria-hidden="true" />;
}

function Particles() {
  const particles = Array.from({ length: 65 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 7}s`,
    duration: `${4 + Math.random() * 6}s`,
    size: `${1 + Math.random() * 2.5}px`,
    color: i % 3 === 0 ? '#00d4ff' : i % 3 === 1 ? '#a040ff' : '#00ffcc',
    opacity: 0.25 + Math.random() * 0.55,
  }));
  return (
    <div className="ai-loader__particles" aria-hidden="true">
      {particles.map((p) => (
        <span key={p.id} className="ai-loader__particle"
          style={{
            left: p.left, width: p.size, height: p.size,
            background: p.color, animationDelay: p.delay,
            animationDuration: p.duration, opacity: p.opacity
          }} />
      ))}
    </div>
  );
}

function DataStreams() {
  const streams = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    chars: Array.from({ length: 20 }, () =>
      String.fromCharCode(0x30a0 + Math.floor(Math.random() * 96))).join(''),
    left: `${(i / 14) * 100 + Math.random() * 3}%`,
    delay: `${Math.random() * 4}s`,
    duration: `${2.5 + Math.random() * 3.5}s`,
    opacity: 0.055 + Math.random() * 0.09,
  }));
  return (
    <div className="ai-loader__streams" aria-hidden="true">
      {streams.map((s) => (
        <div key={s.id} className="ai-loader__stream"
          style={{
            left: s.left, animationDelay: s.delay,
            animationDuration: s.duration, opacity: s.opacity
          }}>
          {s.chars}
        </div>
      ))}
    </div>
  );
}

function Rings({ progress }) {
  const r1 = 185, r2 = 135, r3 = 88;
  const c1 = 2 * Math.PI * r1, c2 = 2 * Math.PI * r2;
  return (
    <div className="ai-loader__rings" aria-hidden="true">
      <svg className="ai-loader__ring ai-loader__ring--outer" viewBox="0 0 400 400">
        <defs>
          <linearGradient id="rg1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#a040ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.9" />
          </linearGradient>
          <filter id="rf">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        <circle cx="200" cy="200" r={r1} fill="none" stroke="url(#rg1)"
          strokeWidth="1.5" strokeDasharray="20 8" filter="url(#rf)" opacity="0.6" />
        <circle cx="200" cy="200" r={r1} fill="none" stroke="#00d4ff"
          strokeWidth="2.5" strokeLinecap="round"
          strokeDasharray={`${c1 * progress / 100} ${c1}`}
          transform="rotate(-90 200 200)" filter="url(#rf)"
          style={{ transition: 'stroke-dasharray 0.25s ease' }} />
      </svg>
      <svg className="ai-loader__ring ai-loader__ring--middle" viewBox="0 0 300 300">
        <defs>
          <linearGradient id="rg2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a040ff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#00ffcc" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        <circle cx="150" cy="150" r={r2} fill="none" stroke="url(#rg2)"
          strokeWidth="1.2" strokeDasharray={`${c2 * progress / 100} ${c2}`}
          transform="rotate(-90 150 150)"
          style={{ transition: 'stroke-dasharray 0.3s ease' }} opacity="0.7" />
        <circle cx="150" cy="150" r="118" fill="none"
          stroke="rgba(160,64,255,0.25)" strokeWidth="0.6" />
      </svg>
      <svg className="ai-loader__ring ai-loader__ring--inner" viewBox="0 0 200 200">
        <circle cx="100" cy="100" r={r3} fill="none"
          stroke="rgba(0,212,255,0.35)" strokeWidth="1" strokeDasharray="5 7" />
        <circle cx="100" cy="100" r="60" fill="none"
          stroke="rgba(160,64,255,0.2)" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

function HUD() {
  return (
    <div className="ai-loader__hud" aria-hidden="true">
      <div className="ai-loader__hud-corner ai-loader__hud-corner--tl" />
      <div className="ai-loader__hud-corner ai-loader__hud-corner--tr" />
      <div className="ai-loader__hud-corner ai-loader__hud-corner--bl" />
      <div className="ai-loader__hud-corner ai-loader__hud-corner--br" />
      <div className="ai-loader__hud-scanline" />
      <div className="ai-loader__hud-grid" />
    </div>
  );
}

function GlitchText({ text, className }) {
  return (
    <span className={`ai-loader__glitch ${className || ''}`} data-text={text}>
      {text}
    </span>
  );
}

const BOOT_MESSAGES = [
  'Initializing neural pathways…',
  'Loading cognitive matrix…',
  'Calibrating holographic interface…',
  'Synchronizing data streams…',
  'Activating quantum processors…',
  'Building synaptic connections…',
  'Compiling knowledge base…',
  'Establishing secure uplink…',
  'Running self-diagnostics…',
  'Optimizing response vectors…',
  'Rendering dimensional layers…',
  'System integrity verified ✓',
];

export default function AILoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [msgIndex, setMsgIndex] = useState(0);
  const [phase, setPhase] = useState('loading');
  const stateRef = useRef({ progress: 0 });
  const rafRef = useRef(null);
  const startRef = useRef(null);

  const easeProgress = useCallback((t) => {
    if (t < 0.55) return (t / 0.55) * 82;
    if (t < 0.88) return 82 + ((t - 0.55) / 0.33) * 13;
    return 95 + ((t - 0.88) / 0.12) * 5;
  }, []);

  const TOTAL_DURATION = 4400;

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startRef.current) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const t = Math.min(elapsed / TOTAL_DURATION, 1);
      const p = Math.min(easeProgress(t), 100);
      stateRef.current.progress = p;
      setProgress(Math.round(p));
      const msgI = Math.min(
        Math.floor((p / 100) * BOOT_MESSAGES.length),
        BOOT_MESSAGES.length - 1
      );
      setMsgIndex(msgI);
      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setMsgIndex(BOOT_MESSAGES.length - 1);
        setPhase('initialized');
        setTimeout(() => {
          setPhase('exit');
          setTimeout(() => { onComplete && onComplete(); }, 900);
        }, 1200);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [easeProgress, onComplete]);

  return (
    <div className={`ai-loader${phase === 'exit' ? ' ai-loader--exit' : ''}`}
      role="status" aria-label="Loading portfolio">
      <div className="ai-loader__bg" />
      <NeuralCanvas stateRef={stateRef} />
      <DataStreams />
      <Particles />
      <HUD />

      <div className="ai-loader__center">
        <Rings progress={progress} />
        <div className="ai-loader__core">
          <div className="ai-loader__brand">
            <div className="ai-loader__brand-icon">
              <span className="ai-loader__brand-dot" />
            </div>
            <GlitchText text="AG" className="ai-loader__brand-letters" />
          </div>
          <div className="ai-loader__pct-wrap">
            <span className="ai-loader__pct">{progress}</span>
            <span className="ai-loader__pct-sign">%</span>
          </div>
          {phase === 'initialized' && (
            <div className="ai-loader__initialized">
              <span className="ai-loader__initialized-text">◈ SYSTEM INITIALIZED ◈</span>
            </div>
          )}
        </div>
      </div>

      <div className="ai-loader__bottom-bar">
        <div className="ai-loader__progress-bar-wrap">
          <div className="ai-loader__progress-bar" style={{ width: `${progress}%` }} />
          <div className="ai-loader__progress-glow" style={{ left: `${progress}%` }} />
        </div>
        <div className="ai-loader__status-row">
          <span className="ai-loader__status-label">SYS</span>
          <span className="ai-loader__status-msg">{BOOT_MESSAGES[msgIndex]}</span>
          <span className="ai-loader__status-pct">{progress}%</span>
        </div>
      </div>

      <div className="ai-loader__side-hud ai-loader__side-hud--left">
        <div className="ai-loader__hud-line">ATHARVA GHAYAL</div>
        <div className="ai-loader__hud-line">PORTFOLIO v2.0</div>
        <div className="ai-loader__hud-line ai-loader__hud-line--dim">NODE: NAVI_MBX_001</div>
        <div className="ai-loader__hud-line ai-loader__hud-line--dim">UPLINK: SECURE</div>
        <div className="ai-loader__hud-meter">
          <span className="ai-loader__hud-meter-label">CPU</span>
          <div className="ai-loader__hud-meter-bar">
            <div className="ai-loader__hud-meter-fill ai-loader__hud-meter-fill--cpu" />
          </div>
        </div>
        <div className="ai-loader__hud-meter">
          <span className="ai-loader__hud-meter-label">NET</span>
          <div className="ai-loader__hud-meter-bar">
            <div className="ai-loader__hud-meter-fill ai-loader__hud-meter-fill--net" />
          </div>
        </div>
      </div>

      <div className="ai-loader__side-hud ai-loader__side-hud--right">
        <div className="ai-loader__hud-line">AI ENGINE</div>
        <div className="ai-loader__hud-line">NEURAL v4.2</div>
        <div className="ai-loader__hud-line ai-loader__hud-line--dim">NODES: {Math.round(progress * 42 / 100)}/42</div>
        <div className="ai-loader__hud-line ai-loader__hud-line--dim">ACCURACY: {Math.min(100, 84 + Math.round(progress * 0.16))}%</div>
        <div className="ai-loader__hud-meter">
          <span className="ai-loader__hud-meter-label">MEM</span>
          <div className="ai-loader__hud-meter-bar">
            <div className="ai-loader__hud-meter-fill ai-loader__hud-meter-fill--mem" />
          </div>
        </div>
        <div className="ai-loader__hud-meter">
          <span className="ai-loader__hud-meter-label">GPU</span>
          <div className="ai-loader__hud-meter-bar">
            <div className="ai-loader__hud-meter-fill ai-loader__hud-meter-fill--gpu" />
          </div>
        </div>
      </div>
    </div>
  );
}
