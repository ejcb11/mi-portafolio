import React from 'react';
import { motion } from 'framer-motion';
import { TextAnimation } from './ui/staggerText';

export const TelemetryStats: React.FC = () => {
  return (
    <section id="experience" className="py-24 bg-dark-bg relative border-b border-dark-border overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* LEFT: FORMACIÓN UNIVERSITARIA & PERFIL PROFESIONAL */}
          <div className="w-full lg:w-7/12 flex flex-col justify-center">
            
            {/* Title with slightly slower StaggerText animation */}
            <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase leading-[1.08] mb-8">
              <TextAnimation divideBy="word" delay={0.1}>
                FORMACIÓN UNIVERSITARIA & PERFIL PROFESIONAL
              </TextAnimation>
            </h2>

            {/* Main bio paragraph */}
            <div className="font-space text-zinc-300 text-base sm:text-lg leading-relaxed mb-10 max-w-2xl">
              <TextAnimation divideBy="word" delay={0.25}>
                TSU en Informática y estudiante del último año de Ingeniería en Informática en la UPTAIET. Diseño y desarrollo aplicaciones web y móviles de alto impacto con arquitecturas modernas, enfoque en código limpio y experiencia de usuario.
              </TextAnimation>
            </div>

            {/* Clean flowing text sections (without banners or boxes) */}
            <div className="space-y-8 max-w-2xl">
              <div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-neon tracking-tight mb-2">
                  <TextAnimation divideBy="word" delay={0.35}>
                    UPTAIET • TSU Graduado & Ingeniería en Informática
                  </TextAnimation>
                </h3>
                <p className="font-space text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <TextAnimation divideBy="word" delay={0.45}>
                    Formación universitaria rigurosa enfocada en análisis de sistemas, algoritmos, arquitectura de software, bases de datos relacionales y metodologías ágiles de ingeniería.
                  </TextAnimation>
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white tracking-tight mb-2">
                  <TextAnimation divideBy="word" delay={0.55}>
                    Desarrollo Integral • React 19, Flutter & Cloud Supabase
                  </TextAnimation>
                </h3>
                <p className="font-space text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <TextAnimation divideBy="word" delay={0.65}>
                    Creación de soluciones operativas completas: interfaces web modulares de carga instantánea, aplicaciones móviles nativas multiplataforma con integración QR y persistencia de datos en tiempo real.
                  </TextAnimation>
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white tracking-tight mb-2">
                  <TextAnimation divideBy="word" delay={0.75}>
                    Certificaciones Internacionales • Anthropic AI & Ciberseguridad IBM
                  </TextAnimation>
                </h3>
                <p className="font-space text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <TextAnimation divideBy="word" delay={0.85}>
                    Certificado internacional en Anthropic AI Fluency para optimización y desarrollo asistido por IA, y Ciberseguridad por IBM y Banco Santander aplicando estándares de código seguro y mitigación de vulnerabilidades.
                  </TextAnimation>
                </p>
              </div>

              <div>
                <h3 className="font-syne font-bold text-lg sm:text-xl text-white tracking-tight mb-2">
                  <TextAnimation divideBy="word" delay={0.95}>
                    Estándares de Rendimiento • Lighthouse 100/100 & Inglés B2
                  </TextAnimation>
                </h3>
                <p className="font-space text-sm sm:text-base text-zinc-400 leading-relaxed">
                  <TextAnimation divideBy="word" delay={1.05}>
                    Priorización de arquitecturas sin bloatware con calificaciones perfectas de rendimiento y accesibilidad, acompañado de comunicación técnica en inglés intermedio-avanzado.
                  </TextAnimation>
                </p>
              </div>
            </div>

          </div>

          {/* RIGHT: EDUARDO IA PORTRAIT (Pure static image, no hover glow, sliding in from right) */}
          <div className="w-full lg:w-5/12 flex items-center justify-center">
            <motion.div
              initial={{ x: 280, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm sm:max-w-md rounded-2xl border border-dark-border overflow-hidden bg-dark-card shadow-2xl"
            >
              <div className="relative aspect-[9/16] w-full overflow-hidden">
                <img
                  src="/profile/eduardo_ia.jpg"
                  alt="Eduardo Contreras"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover block"
                />
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TelemetryStats;
