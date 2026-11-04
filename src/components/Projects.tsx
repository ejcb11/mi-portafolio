import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, CheckCircle2, X, Cpu, Database, Play, Image as ImageIcon } from 'lucide-react';
import { PORTFOLIO_DATA, type Project } from '../utils/portfolioData';
import { LinkedinIcon } from './Icons';
import { FlipText } from './ui/flip-text';

export const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalMediaMode, setModalMediaMode] = useState<'demo' | 'static'>('demo');

  // Active accordion card ID (defaults to the first project)
  const [activeProjectId, setActiveProjectId] = useState<string>(
    PORTFOLIO_DATA.projects[0]?.id || ''
  );

  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setModalMediaMode(project.demoGif ? 'demo' : 'static');
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-dark-surface relative border-b border-dark-border select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER SECTION (Clean, without filters or redundant badges) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <h2>
              <FlipText className="font-syne font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase">
                PROYECTOS DESTACADOS
              </FlipText>
            </h2>
          </div>
        </div>

        {/* DYNAMIC HOVER EXPAND ACCORDION (Skiper52 Inspired) */}
        <div className="w-full">
          {/* DESKTOP ACCORDION (md and up): Horizontal smooth expansion */}
          <div className="hidden md:flex items-stretch gap-3 w-full h-[560px] lg:h-[600px]">
            {PORTFOLIO_DATA.projects.map((project) => {
              const isActive = activeProjectId === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  transition={{ type: "spring", stiffness: 300, damping: 32 }}
                  onMouseEnter={() => setActiveProjectId(project.id)}
                  onClick={() => openProjectModal(project)}
                  className={`relative group cursor-pointer overflow-hidden rounded-2xl border transition-colors duration-300 ${
                    isActive
                      ? 'flex-[3.8] lg:flex-[4.2] border-neon/70 shadow-[0_0_35px_rgba(210,245,50,0.18)]'
                      : 'flex-1 border-dark-border hover:border-zinc-500'
                  }`}
                >
                  {/* BACKGROUND MEDIA */}
                  <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
                    <img
                      src={isActive ? project.image : (project.staticPreview || project.image)}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        isActive
                          ? 'grayscale-0 scale-100 opacity-90'
                          : 'grayscale brightness-[0.35] group-hover:brightness-50 scale-105 opacity-60'
                      }`}
                    />
                    
                    {/* Gradients */}
                    <div className={`absolute inset-0 transition-opacity duration-300 ${
                      isActive
                        ? 'bg-gradient-to-t from-dark-bg via-dark-bg/50 to-black/30'
                        : 'bg-black/60'
                    }`} />
                  </div>

                  {/* ACTIVE CARD OVERLAY CONTENT */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="relative z-10 w-full h-full flex flex-col justify-between p-6 lg:p-8"
                      >
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-mono text-xs bg-neon/15 border border-neon/40 text-neon font-bold px-3 py-1 rounded-full shadow-sm">
                            {project.discipline}
                          </span>
                          <div className="flex items-center gap-2">
                            {project.demoGif && (
                              <span className="font-mono text-[10px] bg-black/85 backdrop-blur-md text-neon border border-neon/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5">
                                <Play className="w-2.5 h-2.5 fill-neon" />
                                <span>VIDEO / DEMO</span>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Bottom Info Details */}
                        <motion.div
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.3, delay: 0.05 }}
                        >
                          <div className="flex items-center gap-2 font-mono text-xs text-neon tracking-wider uppercase mb-1.5">
                            <Cpu className="w-3.5 h-3.5" />
                            <span>{project.tagline}</span>
                          </div>

                          <h3 className="font-syne font-black text-2xl lg:text-3xl xl:text-4xl text-white uppercase tracking-tight mb-2 drop-shadow-md">
                            {project.title}
                          </h3>

                          <p className="font-space text-zinc-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                            {project.description}
                          </p>

                          {/* Quick Metrics */}
                          <div className="flex flex-wrap items-center gap-2.5 mb-4">
                            {project.metrics.map((metric, i) => (
                              <div
                                key={i}
                                className="px-3 py-1 bg-black/75 backdrop-blur-md border border-dark-border rounded text-left"
                              >
                                <span className="font-mono font-bold text-white text-xs block leading-tight">
                                  {metric.value}
                                </span>
                                <span className="font-mono text-[9px] text-zinc-400 uppercase block">
                                  {metric.label}
                                </span>
                              </div>
                            ))}
                          </div>

                          {/* Tech Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-5">
                            {project.tags.slice(0, 5).map((tag, i) => (
                              <span
                                key={i}
                                className={`px-2.5 py-0.5 border font-mono text-[11px] rounded ${
                                  tag === 'Flutter' || tag === 'Supabase' || tag === 'React 19' || tag === 'Python'
                                    ? 'bg-neon/15 border-neon/40 text-neon font-bold'
                                    : 'bg-black/60 border-dark-border text-zinc-300'
                                }`}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>

                          {/* Inspect Trigger Button */}
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                openProjectModal(project);
                              }}
                              className="px-5 py-2.5 bg-neon hover:bg-neon-hover text-black font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(210,245,50,0.3)] hover:scale-[1.02]"
                            >
                              <span>INSPECCIONAR PROYECTO & DEMO</span>
                              <ArrowUpRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* INACTIVE CARD VERTICAL STRIP */}
                  <AnimatePresence>
                    {!isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 w-full h-full flex flex-col justify-between items-center py-8 px-2 pointer-events-none"
                      >
                        {/* Dot indicator top */}
                        <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-neon transition-colors" />

                        {/* Vertical Title Ribbon */}
                        <div className="my-auto whitespace-nowrap">
                          <span className="font-syne font-bold text-xs lg:text-sm tracking-widest text-zinc-400 group-hover:text-neon uppercase [writing-mode:vertical-rl] rotate-180 transition-colors select-none">
                            {project.title}
                          </span>
                        </div>

                        {/* Dot indicator bottom */}
                        <span className="w-2 h-2 rounded-full bg-zinc-600 group-hover:bg-neon transition-colors" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* MOBILE ACCORDION (< md): Vertical smooth expansion */}
          <div className="flex md:hidden flex-col gap-3 w-full">
            {PORTFOLIO_DATA.projects.map((project) => {
              const isActive = activeProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => {
                    if (isActive) {
                      openProjectModal(project);
                    } else {
                      setActiveProjectId(project.id);
                    }
                  }}
                  className={`relative rounded-2xl border overflow-hidden transition-all duration-300 ${
                    isActive
                      ? 'border-neon/70 shadow-[0_0_25px_rgba(210,245,50,0.15)]'
                      : 'border-dark-border bg-dark-card'
                  }`}
                >
                  {/* Collapsed Bar */}
                  {!isActive ? (
                    <div className="flex items-center justify-between p-4 bg-dark-card cursor-pointer">
                      <div>
                        <h4 className="font-syne font-bold text-sm text-white uppercase">
                          {project.title}
                        </h4>
                        <p className="font-mono text-[10px] text-zinc-400">
                          {project.discipline}
                        </p>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-neon" />
                    </div>
                  ) : (
                    /* Active Expanded Mobile Card */
                    <div className="relative flex flex-col justify-between p-5 min-h-[460px] bg-black">
                      {/* Background image */}
                      <div className="absolute inset-0 w-full h-full bg-black overflow-hidden">
                        <img
                          src={isActive ? project.image : (project.staticPreview || project.image)}
                          alt={project.title}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover opacity-75"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-black/40" />
                      </div>

                      {/* Content */}
                      <div className="relative z-10 flex items-center justify-between mb-4">
                        <span className="font-mono text-[11px] bg-neon/15 border border-neon/40 text-neon font-bold px-2.5 py-0.5 rounded-full">
                          {project.discipline}
                        </span>
                        {project.demoGif && (
                          <span className="font-mono text-[10px] bg-black/80 text-neon border border-neon/40 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                            <Play className="w-2.5 h-2.5 fill-neon" />
                            <span>DEMO</span>
                          </span>
                        )}
                      </div>

                      <div className="relative z-10 mt-auto pt-6">
                        <div className="flex items-center gap-1.5 font-mono text-[11px] text-neon uppercase mb-1">
                          <Cpu className="w-3 h-3" />
                          <span>{project.tagline}</span>
                        </div>

                        <h3 className="font-syne font-black text-2xl text-white uppercase tracking-tight mb-2">
                          {project.title}
                        </h3>

                        <p className="font-space text-zinc-300 text-xs leading-relaxed mb-4 line-clamp-3">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.slice(0, 4).map((tag, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 border border-dark-border bg-black/70 font-mono text-[10px] text-zinc-300 rounded"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openProjectModal(project);
                          }}
                          className="w-full py-2.5 bg-neon text-black font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm flex items-center justify-center gap-2 shadow-lg"
                        >
                          <span>INSPECCIONAR PROYECTO & DEMO</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* PROJECT INSPECTION MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-3xl bg-dark-card border border-neon/50 max-h-[92vh] overflow-y-auto cut-corner-tl-br shadow-[0_0_50px_rgba(210,245,50,0.2)]">
            
            {/* Modal Header */}
            <div className="sticky top-0 bg-dark-card/95 backdrop-blur-md border-b border-dark-border p-4 sm:p-6 flex items-center justify-between z-20">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs bg-neon text-black px-2.5 py-0.5 font-bold cut-corner-sm">
                  {selectedProject.discipline}
                </span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="p-1.5 text-zinc-400 hover:text-white hover:bg-dark-border rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              {/* MEDIA PREVIEW WITH SWITCHER */}
              <div className="space-y-3">
                {selectedProject.demoGif && selectedProject.staticPreview && (
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-zinc-400">VISUALIZACIÓN DE PROYECTO:</span>
                    <div className="flex items-center gap-1 bg-dark-surface p-1 rounded-lg border border-dark-border font-mono text-xs">
                      <button
                        type="button"
                        onClick={() => setModalMediaMode('demo')}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all ${
                          modalMediaMode === 'demo' ? 'bg-neon text-black font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <Play className="w-3 h-3" />
                        <span>DEMO ANIMADA</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalMediaMode('static')}
                        className={`px-3 py-1 rounded flex items-center gap-1.5 transition-all ${
                          modalMediaMode === 'static' ? 'bg-neon text-black font-bold' : 'text-zinc-400 hover:text-white'
                        }`}
                      >
                        <ImageIcon className="w-3 h-3" />
                        <span>CAPTURA ESTÁTICA</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="w-full h-64 sm:h-96 rounded-lg overflow-hidden border border-dark-border bg-black flex items-center justify-center">
                  <img
                    src={modalMediaMode === 'demo' && selectedProject.demoGif ? selectedProject.demoGif : (selectedProject.staticPreview || selectedProject.image)}
                    alt={selectedProject.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain sm:object-cover"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-syne font-black text-3xl sm:text-4xl text-white uppercase mb-2">
                  {selectedProject.title}
                </h3>
                <p className="font-mono text-xs text-neon mb-4">{selectedProject.tagline}</p>
                <p className="font-space text-zinc-300 text-base leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* FEATURES & ARCHITECTURE HIGHLIGHTS */}
              <div className="bg-dark-surface p-5 rounded-lg border border-dark-border">
                <h4 className="font-mono text-xs uppercase tracking-wider text-neon mb-3 flex items-center gap-2">
                  <Database className="w-4 h-4" />
                  <span>FUNCIONALIDADES & ARQUITECTURA TÉCNICA</span>
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <span className="text-neon font-bold font-mono text-xs mt-0.5">[{idx + 1}]</span>
                      <span className="font-space text-zinc-300 text-xs sm:text-sm">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                  MÉTRICAS DEL SISTEMA
                </h4>
                <div className="grid grid-cols-3 gap-4">
                  {selectedProject.metrics.map((m, i) => (
                    <div key={i} className="p-4 bg-dark-surface border border-dark-border rounded-lg text-center">
                      <div className="font-syne font-bold text-xl text-neon">{m.value}</div>
                      <div className="font-mono text-xs text-zinc-400">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h4 className="font-mono text-xs uppercase tracking-wider text-zinc-400 mb-3">
                  TECNOLOGÍAS & HERRAMIENTAS
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-dark-surface border border-dark-border text-white font-mono text-xs rounded-full flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-neon" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-dark-border flex flex-wrap items-center justify-end gap-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-6 py-2.5 font-mono text-xs text-zinc-400 hover:text-white border border-dark-border rounded transition-colors"
                >
                  CERRAR INSPECCIÓN
                </button>
                <a
                  href={PORTFOLIO_DATA.driver.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-neon text-black font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm hover:bg-neon-hover shadow-lg"
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>CONTACTAR EN LINKEDIN</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
