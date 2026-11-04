import React, { useRef } from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import { Sparkles, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../utils/portfolioData';

export const PerspectiveScroll: React.FC = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start start', 'end end'],
  });

  // Calculate dynamic vertical crawl across the 3D perspective field
  const yMotionValue = useTransform(scrollYProgress, [0, 1], [480, -580]);
  const transform = useMotionTemplate`rotateX(26deg) translate3d(0px, ${yMotionValue}px, 0px)`;

  return (
    <section
      ref={targetRef}
      id="perspective-manifesto"
      className="relative z-0 h-[165vh] sm:h-[200vh] md:h-[230vh] w-full bg-dark-bg text-white border-b border-dark-border select-none"
    >
      {/* STICKY 3D PERSPECTIVE STAGE */}
      <div
        className="sticky top-0 mx-auto flex h-screen w-full items-center justify-center bg-dark-bg py-12 sm:py-20 overflow-hidden"
        style={{
          perspective: '260px',
        }}
      >
        {/* Top horizon fade */}
        <div className="absolute top-0 left-0 right-0 h-32 sm:h-44 bg-gradient-to-b from-dark-bg via-dark-bg/90 to-transparent pointer-events-none z-20" />

        {/* Bottom horizon fade */}
        <div className="absolute bottom-0 left-0 right-0 h-36 sm:h-52 bg-gradient-to-t from-dark-bg via-dark-bg/95 to-transparent pointer-events-none z-20" />

        {/* Left and right vignette edges */}
        <div className="absolute top-0 bottom-0 left-0 w-6 sm:w-20 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none z-20" />
        <div className="absolute top-0 bottom-0 right-0 w-6 sm:w-20 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none z-20" />

        {/* 3D CRAWLING TEXT MATRIX (Single GPU texture layer) */}
        <motion.div
          style={{
            transform,
            willChange: 'transform',
          }}
          className="w-full max-w-5xl px-6 sm:px-8 text-center font-syne font-black text-[clamp(1.05rem,4.5vw,1.65rem)] sm:text-4xl md:text-5xl lg:text-6xl leading-[1.18] tracking-tight uppercase break-words"
        >
            {/* Block 1: Identity & Engineering */}
            <div className="mb-10 sm:mb-14">
              <span className="text-zinc-500 block text-xs sm:text-base md:text-xl font-mono tracking-widest font-normal mb-2">
                01 // IDENTIDAD & VISIÓN
              </span>
              <span className="text-white">
                {PORTFOLIO_DATA.driver.firstName} {PORTFOLIO_DATA.driver.lastName}
              </span>
              <br />
              <span className="text-neon text-neon-glow">
                SOFTWARE DEVELOPER & FULL STACK
              </span>
            </div>

            {/* Block 2: Academic Background */}
            <div className="mb-10 sm:mb-14">
              <span className="text-zinc-500 block text-xs sm:text-base md:text-xl font-mono tracking-widest font-normal mb-2">
                02 // FORMACIÓN UNIVERSITARIA RIGUROSA
              </span>
              <span className="text-white">
                TSU EN INFORMÁTICA Y ESTUDIANTE DE ÚLTIMO AÑO DE{' '}
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon via-white to-zinc-300">
                INGENIERÍA EN INFORMÁTICA
              </span>{' '}
              <span className="text-zinc-400">EN LA UPTAIET.</span>
            </div>

            {/* Block 3: Frontend & Design Architecture */}
            <div className="mb-10 sm:mb-14">
              <span className="text-zinc-500 block text-xs sm:text-base md:text-xl font-mono tracking-widest font-normal mb-2">
                03 // ARQUITECTURA FRONTEND & UI/UX
              </span>
              <span className="text-white">INTERFACES ULTRA-RÁPIDAS CON </span>
              <span className="text-neon">REACT 19</span>,{' '}
              <span className="text-white">TYPESCRIPT Y </span>
              <span className="text-neon">TAILWIND CSS</span>.
              <br />
              <span className="text-zinc-300">
                COMPONENTES DESACOPLADOS, CARGA INSTANTÁNEA Y LIGHTHOUSE 100/100.
              </span>
            </div>

            {/* Block 4: Mobile & Backend Ecosystems */}
            <div className="mb-10 sm:mb-14">
              <span className="text-zinc-500 block text-xs sm:text-base md:text-xl font-mono tracking-widest font-normal mb-2">
                04 // MOBILE MULTIPLATAFORMA & CLOUD
              </span>
              <span className="text-white">DESARROLLO MÓVIL EN </span>
              <span className="text-neon">FLUTTER & DART</span>.
              <br />
              <span className="text-zinc-300">
                BASES DE DATOS RELACIONALES OPTIMIZADAS EN{' '}
              </span>
              <span className="text-white">SUPABASE & POSTGRESQL</span>{' '}
              <span className="text-zinc-400">CON POLÍTICAS RLS Y APIS EN NODE.JS Y PYTHON.</span>
            </div>

            {/* Block 5: International Certifications */}
            <div className="mb-10 sm:mb-14">
              <span className="text-zinc-500 block text-xs sm:text-base md:text-xl font-mono tracking-widest font-normal mb-2">
                05 // CERTIFICACIONES GLOBALES
              </span>
              <span className="text-neon">ANTHROPIC AI FLUENCY</span>{' '}
              <span className="text-white">EN DESARROLLO ASISTIDO POR IA Y </span>
              <span className="text-white">CIBERSEGURIDAD POR </span>
              <span className="text-neon">IBM & BANCO SANTANDER</span>.
            </div>

            {/* Block 6: Manifesto & Closing Callsign */}
            <div className="mb-6">
              <span className="text-zinc-400 block text-base sm:text-lg font-mono tracking-widest font-normal mb-3">
                // COMPROMISO DE INGENIERÍA
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-neon">
                TRANSFORMANDO LÓGICA COMPLEJA EN PRODUCTOS DIGITALES ELEGANTE,
                ESCALABLES Y OPERATIVOS.
              </span>
              <div className="mt-8 font-mono text-sm tracking-widest text-neon font-black">
                [ TAG: {PORTFOLIO_DATA.driver.tag} // SISTEMAS EN PRODUCCIÓN ]
              </div>
            </div>
          </motion.div>
        </div>

      {/* BOTTOM HUD STATUS BAR */}
      <div className="absolute bottom-6 left-6 right-6 z-30 flex items-center justify-between font-mono text-[11px] sm:text-xs text-zinc-400 pointer-events-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-neon" />
          <span>UPTAIET • INFORMÁTICA • EJCB</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-neon" />
          <span>TRANSFORM 3D PERSPECTIVE</span>
        </div>
      </div>
    </section>
  );
};

export default PerspectiveScroll;
