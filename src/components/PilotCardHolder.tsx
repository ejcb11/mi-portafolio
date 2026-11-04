import React, { useState, useRef } from 'react';
import { Sparkles, Shield, Cpu, Maximize2, Zap } from 'lucide-react';
import { sounds } from '../utils/sound';
import { PORTFOLIO_DATA } from '../utils/portfolioData';

interface PilotCardHolderProps {
  photoUrl?: string;
  onCardClick?: () => void;
}

export const PilotCardHolder: React.FC<PilotCardHolderProps> = ({ 
  photoUrl,
  onCardClick 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [isGlitching, setIsGlitching] = useState(false);

  // Mouse move 3D tilt calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 12; // tilt max 12 deg
    const rotY = ((x - centerX) / centerX) * 12;

    setRotateX(rotX);
    setRotateY(rotY);

    setGlarePos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.65,
    });
  };

  const handleMouseEnter = () => {
    sounds.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlarePos(prev => ({ ...prev, opacity: 0 }));
  };

  const handleClick = () => {
    sounds.playClick();
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 400);
    if (onCardClick) onCardClick();
  };

  return (
    <div 
      className="relative w-full max-w-[380px] sm:max-w-[420px] mx-auto py-8 select-none"
      style={{ perspective: '1200px' }}
    >
      {/* 3D TILT WRAPPER */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={`relative w-full h-[520px] sm:h-[560px] cursor-pointer transition-transform duration-200 ease-out will-change-transform ${
          isGlitching ? 'animate-pulse scale-[1.02]' : ''
        }`}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
      >
        {/* ======================================================== */}
        {/* LAYER 1: BASE HOLDER CARD (BACKGROUND FRAME) */}
        {/* ======================================================== */}
        <div 
          className="absolute inset-0 bg-[#0c0d11] border-2 border-dark-border hover:border-neon/80 rounded-2xl overflow-hidden transition-colors duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0 100%)',
            transform: 'translateZ(0px)',
          }}
        >
          {/* Carbon fiber grid pattern background */}
          <div className="absolute inset-0 carbon-pattern opacity-60" />
          
          {/* Neon accent stripes on right side (Lando Norris aerodynamic decals) */}
          <div className="absolute top-0 right-0 w-24 h-full pointer-events-none opacity-20 overflow-hidden">
            <div className="w-48 h-full bg-gradient-to-l from-neon/40 to-transparent skew-x-[-20deg] transform translate-x-12" />
          </div>

          {/* Large watermark racing number in background */}
          <div className="absolute -top-6 -right-6 font-syne font-black text-[12rem] text-white/[0.03] select-none pointer-events-none leading-none">
            01
          </div>

          {/* Top Header inside holder */}
          <div className="relative z-10 p-5 flex items-center justify-between border-b border-white/10 font-mono text-xs">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
              <span className="font-bold text-white tracking-widest">ED // PILOT 01</span>
            </div>
            <div className="flex items-center gap-1.5 text-neon font-bold">
              <Zap className="w-3.5 h-3.5" />
              <span>LN4_SPEC</span>
            </div>
          </div>

          {/* Tech coordinates HUD & lines inside card */}
          <div className="absolute left-5 top-16 font-mono text-[9px] text-zinc-400 space-y-1 z-10 pointer-events-none">
            <div>CHASSIS: CREATIVE_DEV_V2</div>
            <div>AERO: LOW_DRAG // HIGH_VELOCITY</div>
            <div>STATUS: GRID_POSITION_P1</div>
          </div>

          {/* Bottom telemetry footer inside holder */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black via-black/90 to-transparent pt-12 border-t border-white/5">
            <div className="flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] text-neon uppercase tracking-widest font-bold flex items-center gap-1 mb-1">
                  <Shield className="w-3 h-3" />
                  <span>DESIGNER & FRONTEND PILOT</span>
                </div>
                <div className="font-syne font-black text-2xl text-white tracking-tight uppercase">
                  {PORTFOLIO_DATA.driver.firstName} {PORTFOLIO_DATA.driver.lastName}
                </div>
              </div>

              {/* Barcode & Spec */}
              <div className="text-right font-mono text-[10px] text-zinc-400">
                <div className="flex items-center gap-0.5 justify-end mb-1">
                  {[4, 2, 6, 3, 5, 2, 7, 3, 4, 2, 6].map((w, i) => (
                    <div 
                      key={i} 
                      className="bg-white/70 h-5" 
                      style={{ width: `${w}px` }} 
                    />
                  ))}
                </div>
                <span className="tracking-widest">ED01-2026-F1</span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* LAYER 2: INTERACTIVE HOLOGRAPHIC FOIL & GLARE (SHEEN) */}
        {/* ======================================================== */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl z-20 transition-opacity duration-300"
          style={{
            opacity: glarePos.opacity,
            background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(210, 245, 50, 0.35) 0%, rgba(0, 240, 255, 0.15) 30%, transparent 70%)`,
            transform: 'translateZ(10px)',
            mixBlendMode: 'screen',
          }}
        />

        {/* ======================================================== */}
        {/* LAYER 3: THE SILHOUETTE / PHOTO (POPS OUT OF THE FRAME) */}
        {/* ======================================================== */}
        <div 
          className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center overflow-visible"
          style={{ transform: 'translateZ(35px)' }}
        >
          {photoUrl ? (
            /* User's uploaded custom photo when provided */
            <img
              src={photoUrl}
              alt="Pilot Silhouette"
              className="w-full h-[115%] object-cover object-top -translate-y-10 filter drop-shadow-[0_20px_25px_rgba(0,0,0,0.9)]"
            />
          ) : (
            /* High-Detail Stylized Vector Silhouette with Neon Rim Light */
            <div className="relative w-full h-full flex items-center justify-center -translate-y-4">
              <svg 
                viewBox="0 0 400 550" 
                className="w-[95%] h-[118%] filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] drop-shadow-[0_0_20px_rgba(210,245,50,0.3)] transition-transform duration-300"
              >
                <defs>
                  {/* Neon volt rim lighting gradient */}
                  <linearGradient id="neonRim" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#D2F532" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="#00F0FF" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#D2F532" stopOpacity="0.1" />
                  </linearGradient>

                  {/* Dark matte body gradient */}
                  <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#222530" />
                    <stop offset="60%" stopColor="#14151b" />
                    <stop offset="100%" stopColor="#08080a" />
                  </linearGradient>

                  {/* Headphone glow */}
                  <radialGradient id="earcupGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#D2F532" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#111" stopOpacity="0.9" />
                  </radialGradient>
                </defs>

                {/* Cybernetic Aura Halo behind head */}
                <circle cx="200" cy="155" r="95" fill="none" stroke="#D2F532" strokeWidth="1.5" strokeDasharray="4 8" opacity="0.35" className="animate-spin-slow" style={{ transformOrigin: '200px 155px' }} />
                <circle cx="200" cy="155" r="75" fill="none" stroke="#00F0FF" strokeWidth="1" opacity="0.2" />

                {/* Upper Torso & Shoulders (athletic / motorsport hoodie silhouette) */}
                <path 
                  d="M 60 550 C 70 420 100 320 130 280 C 145 260 160 250 170 245 L 200 255 L 230 245 C 240 250 255 260 270 280 C 300 320 330 420 340 550 Z" 
                  fill="url(#bodyGradient)" 
                  stroke="url(#neonRim)" 
                  strokeWidth="2"
                />

                {/* Collar & Tech Zipper Detail */}
                <path d="M 175 250 L 200 330 L 225 250" fill="none" stroke="#D2F532" strokeWidth="2.5" opacity="0.8" />
                <path d="M 200 330 L 200 480" fill="none" stroke="#D2F532" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />

                {/* Neck */}
                <path d="M 178 248 C 178 220 182 205 185 190 L 215 190 C 218 205 222 220 222 248 Z" fill="#1b1d24" stroke="url(#neonRim)" strokeWidth="1" />

                {/* Head / Face profile contour */}
                <path 
                  d="M 160 145 C 160 95 180 70 200 70 C 220 70 240 95 240 145 C 240 175 230 195 200 200 C 170 195 160 175 160 145 Z" 
                  fill="url(#bodyGradient)" 
                  stroke="url(#neonRim)" 
                  strokeWidth="2"
                />

                {/* Racing / Cybernetic Visor & Glasses */}
                <path 
                  d="M 168 135 C 175 125 190 120 200 120 C 210 120 225 125 232 135 C 235 142 225 150 200 150 C 175 150 165 142 168 135 Z" 
                  fill="#08080A" 
                  stroke="#D2F532" 
                  strokeWidth="2.5" 
                  className="filter drop-shadow-[0_0_10px_#D2F532]"
                />
                {/* Visor HUD reflection line */}
                <path d="M 175 132 L 225 132" stroke="#00F0FF" strokeWidth="1.5" opacity="0.8" />

                {/* High-End Studio / Track Headphones */}
                {/* Headband */}
                <path d="M 152 145 C 150 80 180 50 200 50 C 220 50 250 80 248 145" fill="none" stroke="#333745" strokeWidth="9" strokeLinecap="round" />
                <path d="M 152 145 C 150 80 180 50 200 50 C 220 50 250 80 248 145" fill="none" stroke="#D2F532" strokeWidth="2" strokeDasharray="8 6" />

                {/* Left Earcup */}
                <ellipse cx="152" cy="145" rx="14" ry="24" fill="url(#earcupGlow)" stroke="#D2F532" strokeWidth="2" />
                <circle cx="152" cy="145" r="5" fill="#08080a" />

                {/* Right Earcup */}
                <ellipse cx="248" cy="145" rx="14" ry="24" fill="url(#earcupGlow)" stroke="#D2F532" strokeWidth="2" />
                <circle cx="248" cy="145" r="5" fill="#08080a" />

                {/* Chest Racing Patch with Call-Sign "ED01" */}
                <rect x="150" y="360" width="100" height="42" rx="4" fill="#0a0b0e" stroke="#D2F532" strokeWidth="1.5" />
                <text x="200" y="386" fontFamily="sans-serif" fontWeight="900" fontSize="16" fill="#D2F532" textAnchor="middle" letterSpacing="2">ED // 01</text>
                <text x="200" y="396" fontFamily="monospace" fontSize="7" fill="#888" textAnchor="middle" letterSpacing="1">DESIGN & DEV</text>
              </svg>
            </div>
          )}
        </div>

        {/* ======================================================== */}
        {/* LAYER 4: FLOATING HOLOGRAPHIC RACING STICKERS & BADGES */}
        {/* ======================================================== */}
        {/* Top-Right Floating Badge */}
        <div 
          className="absolute -top-3 -right-3 z-40 bg-neon text-black font-syne font-black text-[10px] tracking-wider uppercase px-3 py-1.5 cut-corner-sm shadow-[0_0_20px_rgba(210,245,50,0.5)] flex items-center gap-1.5 transition-transform"
          style={{ transform: 'translateZ(50px)' }}
        >
          <Sparkles className="w-3.5 h-3.5 fill-black" />
          <span>AERO PILOT</span>
        </div>

        {/* Left Side Floating Rating Chip */}
        <div 
          className="absolute top-28 -left-4 z-40 bg-dark-surface/90 backdrop-blur-md border border-neon/50 text-white font-mono text-[10px] px-3 py-1.5 rounded-lg shadow-xl flex items-center gap-2"
          style={{ transform: 'translateZ(45px)' }}
        >
          <Cpu className="w-3.5 h-3.5 text-neon" />
          <span>RATING: <strong className="text-neon">99.8</strong></span>
        </div>

        {/* Bottom Floating Interactive Pill */}
        <div 
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-40 bg-black/90 backdrop-blur-md border border-dark-border hover:border-neon px-4 py-1.5 rounded-full font-mono text-[10px] text-zinc-300 flex items-center gap-2 transition-all shadow-lg"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Maximize2 className="w-3 h-3 text-neon" />
          <span className="tracking-widest">INTERACTIVO 3D TILT // CLICK PARA GLITCH</span>
        </div>

      </div>
    </div>
  );
};
