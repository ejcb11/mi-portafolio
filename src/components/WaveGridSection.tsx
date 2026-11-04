import React, { useState, useEffect } from 'react';
import { WaveGridBackground } from './ui/wave-grid-background';

export const WaveGridSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section className="relative w-full h-[460px] sm:h-[580px] lg:h-[700px] bg-dark-bg border-b border-dark-border overflow-hidden select-none">
      <WaveGridBackground
        colorBase="#0c0d12"
        colorHigh="#D2F532"
        waveAmplitude={isMobile ? 0.35 : 0.45}
        waveSpeed={isMobile ? 4.5 : 6.0}
        waveFrequency={1.2}
        waveWidth={isMobile ? 2.5 : 3.2}
        gridSize={isMobile ? 18 : 28}
        vignette={!isMobile}
        autoAnimate={true}
        className="w-full h-full"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center px-5 py-6 sm:p-10 z-10 pointer-events-none">
          {/* Center Hero Title */}
          <div className="flex flex-col items-center justify-center text-center my-auto w-full max-w-4xl">
            <h2 className="font-syne font-black text-[clamp(1.35rem,5.6vw,2.2rem)] sm:text-5xl md:text-6xl lg:text-7xl text-white tracking-tight uppercase leading-[1.05] drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)] px-1">
              SISTEMAS REACTIVOS &
              <br />
              <span className="inline-block pr-1 text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-zinc-400">
                ARQUITECTURA DIGITAL
              </span>
            </h2>
          </div>
        </div>
      </WaveGridBackground>
    </section>
  );
};

export default WaveGridSection;
