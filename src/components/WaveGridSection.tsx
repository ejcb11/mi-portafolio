import React from 'react';
import { WaveGridBackground } from './ui/wave-grid-background';

export const WaveGridSection: React.FC = () => {
  return (
    <section className="relative w-full h-[520px] sm:h-[580px] bg-dark-bg border-b border-dark-border overflow-hidden select-none">
      <WaveGridBackground
        colorBase="#0c0d12"
        colorHigh="#D2F532"
        waveAmplitude={0.45}
        waveSpeed={6.0}
        waveFrequency={1.2}
        waveWidth={3.2}
        autoAnimate={true}
        className="w-full h-full"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center p-6 sm:p-10 z-10 pointer-events-none">
          {/* Center Hero Title */}
          <div className="flex flex-col items-center justify-center text-center my-auto px-4 max-w-4xl">
            <h2 className="font-syne font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight uppercase leading-[0.95] drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]">
              SISTEMAS REACTIVOS &
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-zinc-400">
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
