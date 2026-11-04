import React from 'react';
import { ArrowDown, Terminal, ChevronRight } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] pt-24 pb-12 flex flex-col justify-between overflow-hidden bg-grid-pattern">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] bg-neon/8 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* HOMOGENEOUS HERO CANVAS */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 my-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-8">
          
          {/* LEFT: BALANCED TYPOGRAPHY & OVERVIEW */}
          <div className="w-full lg:w-1/2 flex flex-col z-20">
            
            {/* NAME WITH BALANCED PROPORTIONS */}
            <h1 className="font-syne font-black tracking-tight uppercase text-white leading-[0.95] text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl mb-6 select-none">
              <span>{PORTFOLIO_DATA.driver.firstName}</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-zinc-400 text-neon-glow">
                {PORTFOLIO_DATA.driver.lastName}
              </span>
            </h1>

            {/* SUBHEADING BIO */}
            <p className="font-space text-zinc-300 text-base sm:text-lg max-w-xl leading-relaxed mb-8">
              {PORTFOLIO_DATA.driver.subheading}
            </p>

            {/* ACTION BUTTONS */}
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-3 bg-neon hover:bg-neon-hover text-black px-7 py-3.5 font-syne font-black text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 cut-corner-br hover:shadow-[0_0_30px_rgba(210,245,50,0.5)] active:scale-95"
              >
                <span>VER PROYECTOS</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>

              <a
                href="#skills"
                className="inline-flex items-center gap-2 bg-dark-card hover:bg-dark-cardHover text-white px-6 py-3.5 border border-dark-border hover:border-neon font-mono text-xs uppercase tracking-wider transition-all duration-200 cut-corner-br"
              >
                <Terminal className="w-4 h-4 text-neon" />
                <span>HABILIDADES & STACK</span>
              </a>

              <a
                href={PORTFOLIO_DATA.driver.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-zinc-400 hover:text-neon font-mono text-xs tracking-wider transition-colors"
                title="GitHub"
              >
                <GithubIcon className="w-4 h-4 text-neon" />
                <span>GITHUB</span>
              </a>

              <a
                href={PORTFOLIO_DATA.driver.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-zinc-400 hover:text-neon font-mono text-xs tracking-wider transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="w-4 h-4 text-neon" />
                <span>LINKEDIN</span>
              </a>
            </div>

            {/* MICRO STATS BAR */}
            <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-dark-border/60 max-w-lg font-mono">
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">TSU + ING</div>
                <div className="text-[11px] text-zinc-400 uppercase">UPTAIET Informática</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-neon">100/100</div>
                <div className="text-[11px] text-zinc-400 uppercase">Lighthouse Perf</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-black text-white">B2 LEVEL</div>
                <div className="text-[11px] text-zinc-400 uppercase">Inglés Intermedio</div>
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE 3D WEBGL CORE SPHERE */}
          <div className="w-full lg:w-1/2 flex items-center justify-center relative overflow-visible">
            {/* Ambient halo rings & soft radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[340px] sm:w-[440px] lg:w-[520px] h-[340px] sm:h-[440px] lg:h-[520px] rounded-full border border-dashed border-zinc-800/60 animate-spin-slow" />
              <div className="absolute w-[240px] sm:w-[320px] lg:w-[380px] h-[240px] sm:h-[320px] lg:h-[380px] rounded-full border border-neon/15 animate-pulse" />
              <div className="absolute w-[320px] sm:w-[420px] h-[320px] sm:h-[420px] rounded-full bg-neon/5 blur-[100px]" />
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
