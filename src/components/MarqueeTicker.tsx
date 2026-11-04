import React from 'react';

export const MarqueeTicker: React.FC = () => {
  const items = [
    'REACT 19',
    'FLUTTER & DART',
    'SUPABASE & POSTGRESQL',
    'NODE.JS & EXPRESS',
    'TYPESCRIPT',
    'TAILWIND CSS',
    'PYTHON & SQLITE',
    'ANTHROPIC AI FLUENCY',
    'CIBERSEGURIDAD IBM',
    'UI/UX COMPONENT SYSTEMS',
    'LIGHTHOUSE 100/100',
  ];

  return (
    <div className="relative w-full py-5 bg-dark-surface border-y border-dark-border overflow-hidden select-none">
      {/* Gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-dark-surface to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-dark-surface to-transparent z-10 pointer-events-none" />

      {/* Infinite Marquee */}
      <div className="flex w-max animate-marquee">
        {[...items, ...items, ...items].map((item, index) => (
          <div key={index} className="flex items-center gap-6 mx-4">
            <span className="font-syne font-black text-xl sm:text-2xl tracking-wider uppercase text-zinc-300 hover:text-neon transition-colors duration-200">
              {item}
            </span>
            <span className="w-2 h-2 bg-neon rotate-45 inline-block" />
          </div>
        ))}
      </div>
    </div>
  );
};
