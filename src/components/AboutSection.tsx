import React from 'react';
import { Layers, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';

export const AboutSection: React.FC = () => {
  const pillarIcons = [
    <Layers className="w-5 h-5 text-neon" />,
    <Sparkles className="w-5 h-5 text-neon" />,
    <CheckCircle2 className="w-5 h-5 text-neon" />,
    <ShieldCheck className="w-5 h-5 text-neon" />
  ];

  return (
    <section id="about" className="py-24 bg-dark-bg relative border-b border-dark-border overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-neon/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              CRITERIO & MÉTODO
            </h2>
          </div>
        </div>

        {/* MANIFESTO QUOTE */}
        <div className="bg-gradient-to-r from-dark-card via-dark-surface to-dark-card border-l-4 border-neon p-8 sm:p-12 mb-16 cut-corner-br shadow-[0_0_40px_rgba(210,245,50,0.06)]">
          <p className="font-syne font-extrabold text-2xl sm:text-3xl md:text-4xl text-white uppercase tracking-tight leading-snug mb-4">
            "{PORTFOLIO_DATA.quotes[0].quote}"
          </p>
          <div className="font-mono text-xs text-neon tracking-widest uppercase font-bold">
            — {PORTFOLIO_DATA.quotes[0].author}
          </div>
        </div>

        {/* 4 PILLARS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PORTFOLIO_DATA.engineeringPillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-dark-card border border-dark-border hover:border-neon transition-all duration-300 p-6 cut-corner-br flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 bg-dark-surface border border-dark-border flex items-center justify-center rounded-lg">
                    {pillarIcons[idx]}
                  </div>
                  <span className="font-mono text-xs text-neon font-bold">
                    {pillar.code}
                  </span>
                </div>
                <h3 className="font-syne font-bold text-lg text-white mb-3">
                  {pillar.title}
                </h3>
                <p className="font-space text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {pillar.description}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-dark-border/40 flex items-center justify-between font-mono text-[11px]">
                <span className="text-zinc-400">ENFOQUE</span>
                <span className="text-neon font-bold">{pillar.metric}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
