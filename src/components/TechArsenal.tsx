import React, { useState } from 'react';
import { Wrench, Check, Code2, Sparkles, Layers, Cpu, Box } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { sounds } from '../utils/sound';

export const TechArsenal: React.FC = () => {
  const [activeSector, setActiveSector] = useState(0);

  const sectorIcons = [
    <Layers className="w-4 h-4 text-neon" />,
    <Cpu className="w-4 h-4 text-neon" />,
    <Box className="w-4 h-4 text-neon" />,
  ];

  return (
    <section id="arsenal" className="py-24 bg-dark-bg relative border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon tracking-widest uppercase mb-2">
              <Wrench className="w-4 h-4" />
              <span>SECTOR 04 // ARSENAL DE DISEÑO & CÓDIGO</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              TECH & CRAFT ARSENAL
            </h2>
          </div>
          <p className="font-space text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
            Habilidades calibradas para el diseño visual, sistemas de tokens, arquitectura de software e interfaces interactivas de vanguardia.
          </p>
        </div>

        {/* SECTOR TABS */}
        <div className="flex flex-wrap gap-3 mb-4">
          {PORTFOLIO_DATA.arsenal.map((sector, index) => (
            <button
              key={sector.code}
              onClick={() => {
                sounds.playClick();
                setActiveSector(index);
              }}
              onMouseEnter={() => sounds.playHover()}
              className={`px-5 py-3.5 font-mono text-xs uppercase tracking-wider transition-all duration-200 flex items-center gap-3 cut-corner-sm ${
                activeSector === index
                  ? 'bg-neon text-black font-bold shadow-[0_0_20px_rgba(210,245,50,0.3)]'
                  : 'bg-dark-card text-zinc-400 hover:text-white border border-dark-border'
              }`}
            >
              <span className={`text-[10px] px-1.5 py-0.5 rounded flex items-center gap-1 ${
                activeSector === index ? 'bg-black text-neon' : 'bg-dark-surface text-zinc-400'
              }`}>
                {sector.code}
              </span>
              <span>{sector.title}</span>
            </button>
          ))}
        </div>

        {/* Sector description badge */}
        <div className="mb-10 font-mono text-xs text-zinc-400 flex items-center gap-2">
          {sectorIcons[activeSector]}
          <span>{PORTFOLIO_DATA.arsenal[activeSector].description}</span>
        </div>

        {/* ACTIVE SECTOR SKILL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO_DATA.arsenal[activeSector].skills.map((skill, i) => (
            <div
              key={i}
              onMouseEnter={() => sounds.playHover()}
              className={`group bg-dark-card border p-6 cut-corner-br transition-all duration-300 flex flex-col justify-between ${
                skill.highlight 
                  ? 'border-neon/60 bg-dark-card/90 shadow-[0_0_25px_rgba(210,245,50,0.08)]' 
                  : 'border-dark-border hover:border-zinc-500'
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-dark-surface border border-dark-border rounded text-neon">
                      <Code2 className="w-4 h-4" />
                    </span>
                    <span className="font-syne font-bold text-lg text-white group-hover:text-neon transition-colors">
                      {skill.name}
                    </span>
                  </div>
                  {skill.highlight && (
                    <span className="px-2 py-0.5 bg-neon/10 border border-neon/30 text-neon font-mono text-[10px] font-bold rounded">
                      CORE
                    </span>
                  )}
                </div>

                <p className="font-space text-zinc-400 text-xs sm:text-sm leading-relaxed mb-4">
                  {skill.description}
                </p>

                {/* Micro Tool Tags */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {skill.tools.map((tool, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2 py-0.5 bg-dark-surface border border-dark-border/60 text-zinc-300 font-mono text-[10px] rounded"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Telemetry Proficiency Bar */}
              <div>
                <div className="flex items-center justify-between font-mono text-xs text-zinc-400 mb-2">
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-neon" />
                    <span>EFICIENCIA OPERATIVA</span>
                  </span>
                  <span className="font-bold text-white group-hover:text-neon transition-colors">
                    {skill.level}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-dark-surface border border-dark-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon transition-all duration-500"
                    style={{ width: skill.level }}
                  />
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* BOTTOM HUD SPEC FOOTER */}
        <div className="mt-12 p-6 bg-dark-card border border-dark-border rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-neon" />
            <span>METODOLOGÍA DE DISEÑO & DESARROLLO INTEGRADO // SIN BARRERAS ENTRE FIGMA Y PRODUCCIÓN</span>
          </div>
          <div className="text-zinc-500">
            ESPECIFICACIÓN // COMPLETA
          </div>
        </div>

      </div>
    </section>
  );
};
