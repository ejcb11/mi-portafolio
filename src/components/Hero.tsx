import React from 'react';
import { ArrowDown, Terminal, ChevronRight } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-grid-pattern">
      {/* Ambient background glows (zero-cost radial gradients instead of GPU-heavy blur filters) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(210, 245, 50, 0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-20 right-10 w-[380px] h-[380px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* HOMOGENEOUS HERO CANVAS */}
      <div className="max-w-7xl mx-auto w-full px-5 sm:px-6 lg:px-8 my-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* LEFT: BALANCED TYPOGRAPHY & OVERVIEW */}
          <div className="w-full lg:w-1/2 flex flex-col z-20">
            
            {/* NAME WITH BALANCED PROPORTIONS */}
            <h1 className="font-syne font-black tracking-tight uppercase text-white leading-[0.98] text-[clamp(1.75rem,7.5vw,2.6rem)] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mb-6 select-none pr-1">
              <span className="inline-block pr-1">{PORTFOLIO_DATA.driver.firstName}</span>
              <br />
              <span className="inline-block pr-2 text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-zinc-400 text-neon-glow">
                {PORTFOLIO_DATA.driver.lastName}
              </span>
            </h1>

            {/* SUBHEADING BIO */}
            <p className="font-space text-zinc-300 text-sm sm:text-lg max-w-xl leading-relaxed mb-6 sm:mb-8">
              {PORTFOLIO_DATA.driver.subheading}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 bg-neon hover:bg-neon-hover text-black px-6 sm:px-7 py-3 sm:py-3.5 font-syne font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cut-corner-br hover:shadow-[0_0_30px_rgba(210,245,50,0.5)] active:scale-95"
              >
                <span>VER PROYECTOS</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 bg-dark-card hover:bg-dark-cardHover text-white px-5 sm:px-6 py-3 sm:py-3.5 border border-dark-border hover:border-neon font-mono text-xs uppercase tracking-wider transition-all duration-200 cut-corner-br"
              >
                <Terminal className="w-4 h-4 text-neon" />
                <span>HABILIDADES & STACK</span>
              </a>

              <a
                href={PORTFOLIO_DATA.driver.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-3.5 text-zinc-400 hover:text-neon font-mono text-xs tracking-wider transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4 text-neon" />
                <span>GITHUB</span>
              </a>

              <a
                href={PORTFOLIO_DATA.driver.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-3 sm:py-3.5 text-zinc-400 hover:text-neon font-mono text-xs tracking-wider transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-neon" />
                <span>LINKEDIN</span>
              </a>
            </div>

            {/* MICRO STATS BAR */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-dark-border/60 max-w-lg font-mono">
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">TSU + ING</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase">UPTAIET Informática</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-neon">100/100</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase">Lighthouse Perf</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-black text-white">B1 LEVEL</div>
                <div className="text-[10px] sm:text-[11px] text-zinc-400 uppercase">Inglés Intermedio</div>
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE 3D WEBGL CORE SPHERE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-visible">
            {/* Ambient halo rings & soft radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[280px] sm:w-[440px] lg:w-[520px] h-[280px] sm:h-[440px] lg:h-[520px] rounded-full border border-dashed border-zinc-800/60 animate-spin-slow" />
              <div className="absolute w-[200px] sm:w-[320px] lg:w-[380px] h-[200px] sm:h-[320px] lg:h-[380px] rounded-full border border-neon/15 animate-pulse" />
              <div
                className="absolute w-[280px] sm:w-[440px] h-[280px] sm:h-[440px] rounded-full"
                style={{
                  background: 'radial-gradient(circle at center, rgba(210, 245, 50, 0.07) 0%, transparent 70%)',
                }}
              />
            </div>

            {/* 3D Sphere Component */}
            <div className="w-full relative z-10 flex items-center justify-center overflow-visible">
              <Hero3D />
            </div>
          </div>

        </div>
      </div>

      {/* BOTTOM SCROLL INDICATOR */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 flex items-center justify-between font-mono text-xs text-zinc-400 border-t border-dark-border/40">
        <a 
          href="#projects" 
          className="flex items-center gap-2 hover:text-neon transition-colors group"
        >
          <ArrowDown className="w-4 h-4 text-neon transition-transform group-hover:translate-y-1" />
          <span>EXPLORAR PORTAFOLIO</span>
        </a>
        <div className="hidden sm:flex items-center gap-3 text-zinc-400">
          <span>REACT 19</span>
          <span>•</span>
          <span>FLUTTER</span>
          <span>•</span>
          <span>SUPABASE</span>
          <span>•</span>
          <span>NODE.JS</span>
        </div>
      </div>
    </section>
  );
};
