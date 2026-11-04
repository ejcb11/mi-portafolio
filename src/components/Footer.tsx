import React from 'react';
import { ArrowUp, MapPin, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { AnimatedFooter } from './ui/animated-footer';
import { GithubIcon, LinkedinIcon } from './Icons';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark-bg text-white relative border-t border-dark-border overflow-hidden select-none">
      
      {/* CINEMATIC ANIMATED ASCII FOOTER: EJCB REVEAL & INTERACTIVE HANDS */}
      <div className="relative h-[380px] sm:h-[480px] md:h-[600px] w-full overflow-hidden border-b border-dark-border bg-[#080809]">
        <AnimatedFooter
          headingLines={[PORTFOLIO_DATA.driver.tag]}
          leftImage="/animated-footer/hand-left.jpg"
          rightImage="/animated-footer/hand-right.jpg"
          background="#080809"
          textColor="#191a22"
          charColor="#222c0d"
          hoverColor="#D2F532"
          hoverCharColor="#080809"
          columns={typeof window !== 'undefined' && window.innerWidth < 768 ? 48 : 80}
          rootMargin="200px 0px 100px 0px"
          threshold={0}
          headingClassName="text-[#191a22] hover:text-[#232530] transition-colors duration-500 select-none"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* FOOTER MAIN ROW */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-dark-border">
          
          {/* LOGO & CALLSIGN */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(210,245,50,0.2)] border border-dark-border hover:border-neon transition-all">
              <BrandLogo className="w-full h-full" />
            </div>
            <div>
              <div className="font-syne font-black text-lg text-white">
                {PORTFOLIO_DATA.driver.firstName} {PORTFOLIO_DATA.driver.lastName}
              </div>
              <div className="font-mono text-xs text-zinc-400">
                SOFTWARE DEVELOPER & FULL STACK
              </div>
            </div>
          </div>

          {/* CONTACT INFO: GITHUB & LINKEDIN */}
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={PORTFOLIO_DATA.driver.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Eduardo Contreras"
              className="px-4 py-2.5 bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon font-mono text-xs uppercase tracking-wider transition-all cut-corner-sm flex items-center gap-2 group shadow-sm"
            >
              <GithubIcon className="w-4 h-4 text-neon group-hover:text-black transition-colors" />
              <span>GITHUB</span>
            </a>

            <a
              href={PORTFOLIO_DATA.driver.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Eduardo Contreras"
              className="px-4 py-2.5 bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon font-mono text-xs uppercase tracking-wider transition-all cut-corner-sm flex items-center gap-2 group shadow-sm"
            >
              <LinkedinIcon className="w-4 h-4 text-neon group-hover:text-black transition-colors" />
              <span>LINKEDIN</span>
            </a>

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-dark-surface border border-dark-border font-mono text-xs text-zinc-400 rounded-lg">
              <MapPin className="w-3.5 h-3.5 text-neon" />
              <span>{PORTFOLIO_DATA.driver.location}</span>
            </div>
          </div>

          {/* RETURN TO TOP BUTTON */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2.5 bg-dark-card hover:bg-dark-cardHover border border-dark-border hover:border-neon text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all cut-corner-sm shadow-sm"
          >
            <span>VOLVER ARRIBA</span>
            <ArrowUp className="w-4 h-4 text-neon" />
          </button>
        </div>

        {/* BOTTOM SUB-FOOTER */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} {PORTFOLIO_DATA.driver.firstName} {PORTFOLIO_DATA.driver.lastName} [{PORTFOLIO_DATA.driver.tag}]. TODOS LOS DERECHOS RESERVADOS.</span>
          </div>

          <div className="flex items-center gap-2 text-zinc-400">
            <ShieldCheck className="w-4 h-4 text-neon" />
            <span>INGENIERÍA EN INFORMÁTICA • UPTAIET</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
