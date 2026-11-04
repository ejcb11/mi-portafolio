import React, { useEffect, useState } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { FlipText } from '@/components/ui/flip-text';

interface SkillCardData {
  id: string;
  name: string;
  category: 'FRONTEND' | 'MOBILE' | 'BACKEND' | 'IA & SEGURIDAD';
  tagline: string;
  description: string;
  tools?: string[];
  icon?: React.ReactNode;
}

const ALL_SKILLS: SkillCardData[] = [
  {
    id: 'react-ts',
    name: 'React 19 & TypeScript',
    category: 'FRONTEND',
    tagline: 'Arquitectura Modular & Estado',
    description: 'Desarrollo con React 19, Vite, TypeScript, hooks personalizados y arquitectura de componentes desacoplados de alto rendimiento.',
  },
  {
    id: 'flutter-dart',
    name: 'Flutter & Dart (Mobile)',
    category: 'MOBILE',
    tagline: 'Apps Multiplataforma iOS & Android',
    description: 'Desarrollo de aplicaciones móviles completas: hardware, lectura QR, estado reactivo y consumo de APIs en tiempo real.',
  },
  {
    id: 'supabase-postgres',
    name: 'PostgreSQL & Supabase',
    category: 'BACKEND',
    tagline: 'Persistencia & Realtime Cloud',
    description: 'Bases de datos en la nube, sincronización en tiempo real vía WebSockets, políticas Row Level Security (RLS) y SQL relacional.',
  },
  {
    id: 'tailwind-css',
    name: 'Tailwind CSS & UI/UX',
    category: 'FRONTEND',
    tagline: 'Diseño Brutalista & Responsive',
    description: 'Maquetación responsive avanzada, Flexbox, CSS Grid, variables dinámicas y micro-interacciones fluidas a 60 FPS.',
  },
  {
    id: 'node-express',
    name: 'Node.js & Express REST APIs',
    category: 'BACKEND',
    tagline: 'Servidores Asíncronos & JWT',
    description: 'Arquitectura de endpoints RESTful seguros, control de sesiones mediante tokens JWT, CORS y middleware optimizado.',
  },
  {
    id: 'threejs-webgl',
    name: 'Three.js & Gráficos WebGL',
    category: 'FRONTEND',
    tagline: 'Gráficos 3D & Shaders GLSL',
    description: 'Modelos 3D interactivos en canvas, shaders GLSL instanciados, partículas reactivas y aceleración por hardware GPU.',
  },
  {
    id: 'python-sqlite',
    name: 'Python, Flask & SQLite3',
    category: 'BACKEND',
    tagline: 'Lógica de Negocio & Reportes',
    description: 'Microservicios con Flask, automatización de scripts, generación de reportes y almacenamiento local relacional.',
  },
  {
    id: 'anthropic-ai',
    name: 'Anthropic AI Fluency',
    category: 'IA & SEGURIDAD',
    tagline: 'Desarrollo Asistido por IA',
    description: 'Certificación oficial de Anthropic. Integración de modelos LLM, ingeniería de prompts y optimización asistida de flujos dev.',
  },
  {
    id: 'ibm-security',
    name: 'Ciberseguridad IBM & Santander',
    category: 'IA & SEGURIDAD',
    tagline: 'Código Seguro & Mitigación',
    description: 'Certificación internacional en ciberseguridad. Buenas prácticas de código seguro, sanitización y protección de datos.',
  },
  {
    id: 'component-systems',
    name: 'Component Systems & Modales',
    category: 'FRONTEND',
    tagline: 'Sistemas Reutilizables Desacoplados',
    description: 'Diseño e implementación de modales interactivos, tablas dinámicas, filtros en tiempo real y carruseles fluidos.',
  },
];

export const SkillsCarousel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="skills" className="py-24 bg-dark-bg relative border-b border-dark-border overflow-hidden select-none">
      {/* Background ambient glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[550px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(210, 245, 50, 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* SECTION HEADER: Clean & Breathing */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-dark-border/80 pb-6">
          <div>
            <h2>
              <FlipText className="font-syne font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                SKILLS
              </FlipText>
            </h2>
          </div>
        </div>

        {/* EMBLA CAROUSEL (Skiper54 Animation) */}
        <div className="relative w-full">
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{
              loop: true,
              slidesToScroll: 1,
              align: 'center',
            }}
            plugins={[
              Autoplay({
                delay: 3500,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
          >
            <CarouselContent className="flex h-[380px] sm:h-[400px] w-full items-center py-4">
              {ALL_SKILLS.map((skill, index) => {
                const isActive = current === index;
                return (
                  <CarouselItem
                    key={skill.id}
                    className="relative flex h-[88%] w-full basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33%] xl:basis-[30%] items-center justify-center p-2.5"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        clipPath: !isActive
                          ? 'inset(8% 0 8% 0 round 1.75rem)'
                          : 'inset(0% 0 0% 0 round 1.75rem)',
                        scale: isActive ? 1.02 : 0.95,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                      onClick={() => api?.scrollTo(index)}
                      className={`h-full w-full overflow-hidden rounded-3xl cursor-pointer transition-shadow duration-500 ${
                        isActive
                          ? 'shadow-[0_0_35px_rgba(210,245,50,0.22)] border-neon'
                          : 'border-dark-border hover:border-zinc-600'
                      }`}
                    >
                      {/* CARD BODY: Clean, elegant, no percentages or numbers */}
                      <div className="relative h-full w-full bg-gradient-to-b from-dark-card via-dark-surface to-dark-card border border-dark-border rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden">
                        
                        {/* Ambient glow accent inside card */}
                        <div
                          className={`absolute top-0 right-0 w-44 h-44 pointer-events-none transition-opacity duration-300 ${
                            isActive ? 'opacity-100' : 'opacity-30'
                          }`}
                          style={{
                            background: isActive
                              ? 'radial-gradient(circle at top right, rgba(210, 245, 50, 0.16) 0%, transparent 70%)'
                              : 'radial-gradient(circle at top right, rgba(255, 255, 255, 0.06) 0%, transparent 70%)',
                          }}
                        />

                        {/* CARD CONTENT: Clean, elegant typography without icons or tag chips */}
                        <div className="relative z-10 flex flex-col h-full justify-between">
                          <div>
                            <div className="flex items-center justify-between mb-5">
                              <span className="font-mono text-xs font-bold tracking-wider text-neon uppercase">
                                // {skill.category}
                              </span>
                              <span className="font-mono text-xs text-zinc-500 font-bold">
                                0{index + 1}
                              </span>
                            </div>

                            <h3 className="font-syne font-black text-xl sm:text-2xl text-white tracking-tight mb-2">
                              {skill.name}
                            </h3>

                            <div className="font-mono text-xs text-neon mb-3 font-semibold">
                              {skill.tagline}
                            </div>

                            <p className="font-space text-xs sm:text-sm text-zinc-300 leading-relaxed">
                              {skill.description}
                            </p>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  </CarouselItem>
                );
              })}
            </CarouselContent>

            {/* PREV / NEXT NAVIGATION BUTTONS */}
            <div className="flex items-center justify-between px-2 mt-4">
              <button
                aria-label="Previous skill"
                onClick={() => api?.scrollPrev()}
                className="p-3 rounded-full bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon transition-all duration-200 shadow-lg active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* PAGINATION DOTS */}
              <div className="flex items-center justify-center gap-2">
                {Array.from({ length: ALL_SKILLS.length }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(index)}
                    className={cn(
                      'h-2 cursor-pointer rounded-full transition-all duration-300',
                      current === index
                        ? 'w-8 bg-neon shadow-[0_0_12px_rgba(210,245,50,0.6)]'
                        : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                    )}
                    aria-label={`Ir a habilidad ${index + 1}`}
                  />
                ))}
              </div>

              <button
                aria-label="Next skill"
                onClick={() => api?.scrollNext()}
                className="p-3 rounded-full bg-dark-card hover:bg-neon hover:text-black text-white border border-dark-border hover:border-neon transition-all duration-200 shadow-lg active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </Carousel>

          {/* DYNAMIC TRANSITION ACTIVE CALLSIGN (Clean, no index numbers) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="mt-6 flex flex-col items-center justify-center text-center px-4"
            >
              <div className="font-syne font-black text-lg sm:text-xl text-white tracking-tight">
                {ALL_SKILLS[current]?.name}{' '}
                <span className="text-zinc-400 font-normal">
                  — {ALL_SKILLS[current]?.tagline}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>

      </div>
    </section>
  );
};

export default SkillsCarousel;
