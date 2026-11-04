import React from 'react';
import { Calendar, MapPin, CheckCircle } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { FlipText } from './ui/flip-text';

export const PodiumTimeline: React.FC = () => {
  return (
    <section id="career" className="py-24 bg-dark-surface relative border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <h2>
              <FlipText className="font-syne font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                TRAYECTORIA ACADÉMICA & DEV
              </FlipText>
            </h2>
          </div>
          <p className="font-space text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
            Evolución continua: formación universitaria en computación, certificaciones internacionales y proyectos puestos en producción.
          </p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative border-l border-zinc-800 ml-4 sm:ml-8 pl-6 sm:pl-12 space-y-12">
          
          {PORTFOLIO_DATA.podiumHistory.map((item, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Timeline Marker */}
              <div className="absolute -left-[35px] sm:-left-[59px] top-0 w-8 h-8 rounded-full bg-dark-card border-2 border-dark-border group-hover:border-neon group-hover:bg-neon transition-all duration-300 flex items-center justify-center">
                <span className="font-mono text-xs font-black text-white group-hover:text-black">
                  0{index + 1}
                </span>
              </div>

              {/* CARD */}
              <div className="bg-dark-card border border-dark-border group-hover:border-neon transition-all duration-300 p-6 sm:p-8 cut-corner-br group-hover:shadow-[0_0_30px_rgba(210,245,50,0.1)]">
                
                {/* Top Info */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-dark-border/60">
                  <div className="flex items-center gap-3">
                    <span className="font-syne font-bold text-white text-lg sm:text-xl">
                      {item.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-zinc-400">
                    <span className="flex items-center gap-1.5 text-neon font-bold">
                      <Calendar className="w-3.5 h-3.5 text-neon" />
                      <span>{item.period}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                      <span>{item.location}</span>
                    </span>
                  </div>
                </div>

                {/* Discipline & Institution */}
                <div className="flex flex-wrap items-center gap-3 font-mono text-xs mb-4">
                  <span className="px-2.5 py-0.5 bg-neon/10 border border-neon/30 text-neon font-bold cut-corner-sm">
                    {item.discipline}
                  </span>
                  <span className="text-zinc-400">
                    INSTITUCIÓN / ENTORNO: <strong className="text-zinc-200">{item.institution}</strong>
                  </span>
                </div>

                {/* Summary */}
                <p className="font-space text-zinc-300 text-sm sm:text-base leading-relaxed mb-6">
                  {item.summary}
                </p>

                {/* Highlights List */}
                <div className="space-y-2">
                  <div className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-2">
                    HITOS PRINCIPALES:
                  </div>
                  {item.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-neon shrink-0 mt-0.5" />
                      <span className="font-space text-zinc-300 text-xs sm:text-sm">
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};
