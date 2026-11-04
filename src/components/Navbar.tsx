import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';
import { BrandLogo } from './BrandLogo';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // When near top (hero section), no nav link should be active
      if (scrollY < 300) {
        setActiveSection('');
        return;
      }

      const sections = ['experience', 'projects', 'skills', 'career'];
      let current = '';

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            current = sectionId;
            break;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'EXPERIENCIA', href: '#experience', targetId: 'experience' },
    { label: 'PROYECTOS', href: '#projects', targetId: 'projects' },
    { label: 'SKILLS', href: '#skills', targetId: 'skills' },
    { label: 'TRAYECTORIA', href: '#career', targetId: 'career' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 select-none ${
        scrolled 
          ? 'bg-dark-bg/90 backdrop-blur-xl border-b border-dark-border/80 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.6)]' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* BRAND / LOGO */}
          <a 
            href="#" 
            className="group flex items-center gap-3 text-white transition-transform active:scale-95"
            aria-label="Eduardo Contreras - Inicio"
          >
            <div className="relative w-10 h-10 rounded-xl overflow-hidden transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(210,245,50,0.4)] group-hover:scale-105">
              <BrandLogo className="w-full h-full" />
            </div>
            <div className="flex flex-col">
              <div className="font-mono text-[11px] tracking-wider text-neon">
                SOFTWARE DEVELOPER
              </div>
              <span className="font-syne font-black text-sm tracking-widest text-zinc-200 group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.driver.firstName} {PORTFOLIO_DATA.driver.lastName}
              </span>
            </div>
          </a>

          {/* DYNAMIC CAPSULE NAV LINKS */}
          <nav className="hidden md:flex items-center gap-1 bg-dark-surface/90 backdrop-blur-md px-2 py-1.5 rounded-full border border-dark-border/80 shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.targetId}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`relative px-4 py-1.5 font-mono text-xs tracking-wider font-semibold rounded-full transition-all duration-300 ${
                    isActive 
                      ? 'text-black bg-neon shadow-[0_0_20px_rgba(210,245,50,0.5)] font-bold scale-105' 
                      : 'text-zinc-400 hover:text-white hover:bg-dark-card/80'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              );
            })}
          </nav>

          {/* RIGHT ACTION: GITHUB & LINKEDIN CONTACT ICONS */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={PORTFOLIO_DATA.driver.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub de Eduardo Contreras"
              title="GitHub"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon transition-all duration-200 cut-corner-sm flex items-center justify-center hover:shadow-[0_0_20px_rgba(210,245,50,0.4)] active:scale-95"
            >
              <GithubIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            <a
              href={PORTFOLIO_DATA.driver.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn de Eduardo Contreras"
              title="LinkedIn"
              className="w-9 h-9 sm:w-10 sm:h-10 bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon transition-all duration-200 cut-corner-sm flex items-center justify-center hover:shadow-[0_0_20px_rgba(210,245,50,0.4)] active:scale-95"
            >
              <LinkedinIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 bg-dark-card border border-dark-border text-zinc-300 hover:text-white rounded-lg transition-colors ml-1"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FLYOUT MENU */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-surface/98 backdrop-blur-xl border-b border-dark-border px-6 py-6 transition-all animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-2">
            <div className="pb-3 border-b border-dark-border text-xs font-mono text-zinc-400">
              NAVEGACIÓN
            </div>
            {navLinks.map((link) => {
              const isActive = activeSection === link.targetId;
              return (
                <a
                  key={link.targetId}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`py-3 px-3 rounded-lg font-mono text-sm transition-colors font-semibold ${
                    isActive
                      ? 'text-neon bg-dark-card/90 font-bold border-l-2 border-neon'
                      : 'text-zinc-200 hover:text-neon hover:bg-dark-card'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
            
            {/* Mobile Contact Shortcuts */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-dark-border">
              <a
                href={PORTFOLIO_DATA.driver.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm flex items-center justify-center gap-2 transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GITHUB</span>
              </a>
              <a
                href={PORTFOLIO_DATA.driver.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 bg-neon text-black font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm flex items-center justify-center gap-2 shadow-lg"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LINKEDIN</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
