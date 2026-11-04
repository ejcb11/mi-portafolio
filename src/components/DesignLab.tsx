import React, { useState } from 'react';
import { Palette, Sparkles, Layers, Sliders, CheckCircle2, ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

export const DesignLab: React.FC = () => {
  const [activeTheme, setActiveTheme] = useState<'neon' | 'cyan' | 'orange' | 'mono'>('neon');
  const [sliderValue, setSliderValue] = useState(75);
  const [isPressed, setIsPressed] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<'primary' | 'outline' | 'chamfer'>('primary');

  const themes = [
    { id: 'neon', name: 'VOLT NEON (LN4)', hex: '#D2F532', bg: 'bg-[#D2F532]', text: 'text-[#D2F532]', border: 'border-[#D2F532]' },
    { id: 'cyan', name: 'CYAN AERO', hex: '#00F0FF', bg: 'bg-[#00F0FF]', text: 'text-[#00F0FF]', border: 'border-[#00F0FF]' },
    { id: 'orange', name: 'PAPAYA RACING', hex: '#FF6B00', bg: 'bg-[#FF6B00]', text: 'text-[#FF6B00]', border: 'border-[#FF6B00]' },
    { id: 'mono', name: 'PURE BRUTALIST', hex: '#FFFFFF', bg: 'bg-[#FFFFFF]', text: 'text-[#FFFFFF]', border: 'border-[#FFFFFF]' },
  ] as const;

  const currentTheme = themes.find(t => t.id === activeTheme) || themes[0];

  const handleThemeChange = (id: 'neon' | 'cyan' | 'orange' | 'mono') => {
    sounds.playClick();
    setActiveTheme(id);
  };

  return (
    <section id="design-lab" className="py-24 bg-dark-bg relative border-b border-dark-border overflow-hidden">
      {/* Background glow */}
      <div 
        className="absolute top-1/2 right-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-colors duration-500"
        style={{ backgroundColor: currentTheme.hex }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-dark-border/80 pb-8">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs tracking-widest uppercase mb-2" style={{ color: currentTheme.hex }}>
              <Palette className="w-4 h-4" />
              <span>SECTOR 03 // DESIGN LAB & SISTEMAS DE DISEÑO</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase">
              DESIGN CRAFT & SYSTEM
            </h2>
          </div>
          <p className="font-space text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
            Un vistazo interactivo al laboratorio de diseño: tokens, componentes modulares y la metodología que conecta Figma directamente con el código frontend.
          </p>
        </div>

        {/* 2-COLUMN LAB ENVIRONMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: INTERACTIVE DESIGN TOKENS CONTROLLER */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Theme switcher card */}
            <div className="bg-dark-card border border-dark-border p-6 cut-corner-br">
              <div className="flex items-center justify-between mb-4">
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2">
                  <Sliders className="w-4 h-4" style={{ color: currentTheme.hex }} />
                  <span>TOKENS DINÁMICOS // COLOR PRIMARIO</span>
                </span>
                <span className="font-mono text-[11px] text-zinc-400">4 PALETAS</span>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {themes.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => handleThemeChange(t.id)}
                    onMouseEnter={() => sounds.playHover()}
                    className={`p-3 rounded-lg border text-left transition-all font-mono text-xs flex items-center gap-3 ${
                      activeTheme === t.id
                        ? 'border-white bg-dark-surface shadow-lg text-white'
                        : 'border-dark-border bg-dark-card hover:border-zinc-600 text-zinc-400'
                    }`}
                  >
                    <span className={`w-3.5 h-3.5 rounded-full ${t.bg} shrink-0`} />
                    <span className="font-semibold truncate">{t.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Tokens */}
            <div className="bg-dark-card border border-dark-border p-6 cut-corner-br space-y-4">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold flex items-center gap-2 pb-3 border-b border-dark-border">
                <Layers className="w-4 h-4" style={{ color: currentTheme.hex }} />
                <span>JERARQUÍA TIPOGRÁFICA & ESCALA</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-baseline justify-between">
                  <span className="text-zinc-400">DISPLAY TITLES:</span>
                  <span className="font-syne font-black text-white text-lg">Syne 900 Black</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-zinc-400">BODY / UI:</span>
                  <span className="font-space text-white text-sm">Space Grotesk</span>
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-zinc-400">TELEMETRY / CODES:</span>
                  <span className="font-mono text-white text-xs" style={{ color: currentTheme.hex }}>JetBrains Mono</span>
                </div>
              </div>
            </div>

            {/* Design to Code Pipeline */}
            <div className="bg-dark-card border border-dark-border p-6 cut-corner-br">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-300 font-bold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" style={{ color: currentTheme.hex }} />
                <span>PIPELINE: FIGMA ➔ FRONTEND</span>
              </div>

              <div className="space-y-3 font-mono text-xs">
                {[
                  { step: "01", name: "FIGMA ARCHITECTURE", detail: "Componentes atómicos con Auto-Layout y variantes tipadas." },
                  { step: "02", name: "TOKEN EXPORT", detail: "Sincronización de variables a Tailwind Config y CSS Tokens." },
                  { step: "03", name: "REACT + TYPESCRIPT", detail: "Componentes limpios y reutilizables con accesibilidad probada." },
                  { step: "04", name: "GPU ACCELERATION", detail: "Animaciones a 60-120 FPS sin caídas de rendimiento." },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded bg-dark-surface/60 border border-dark-border/60">
                    <span className="font-bold text-xs" style={{ color: currentTheme.hex }}>{item.step}</span>
                    <div>
                      <div className="font-syne font-bold text-white text-xs">{item.name}</div>
                      <div className="font-space text-zinc-400 text-[11px] leading-tight">{item.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE COMPONENT PLAYGROUND */}
          <div className="lg:col-span-7 bg-dark-card border border-dark-border p-6 sm:p-10 cut-corner-br space-y-8">
            
            {/* Playground Header */}
            <div className="flex items-center justify-between pb-4 border-b border-dark-border">
              <div>
                <h3 className="font-syne font-bold text-xl sm:text-2xl text-white uppercase">
                  COMPONENT PLAYGROUND
                </h3>
                <div className="font-mono text-xs text-zinc-400">
                  Prueba en vivo la respuesta del sistema de diseño
                </div>
              </div>

              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-dark-border bg-dark-surface font-mono text-xs text-zinc-300">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentTheme.hex }} />
                <span>LIVE SYSTEM</span>
              </div>
            </div>

            {/* BUTTONS DEMO */}
            <div className="space-y-3">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                1. BOTONES RACING & VARIANTES
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* Chamfered Primary Button */}
                <button
                  onMouseEnter={() => sounds.playHover()}
                  onClick={() => {
                    sounds.playClick();
                    setIsPressed(!isPressed);
                  }}
                  className="px-6 py-3 font-syne font-black text-xs uppercase tracking-wider text-black cut-corner-br transition-all duration-200 active:scale-95 shadow-lg flex items-center gap-2"
                  style={{ backgroundColor: currentTheme.hex, boxShadow: `0 0 20px ${currentTheme.hex}40` }}
                >
                  <span>{isPressed ? 'ESTADO ACTIVADO' : 'BOTÓN PRIMARIO'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Ghost Outline Button */}
                <button
                  onMouseEnter={() => sounds.playHover()}
                  onClick={() => sounds.playClick()}
                  className="px-6 py-3 font-mono text-xs uppercase tracking-wider text-white bg-dark-surface border transition-all duration-200 cut-corner-br hover:text-white"
                  style={{ borderColor: currentTheme.hex }}
                >
                  <span>OUTLINE ACCENT</span>
                </button>

                {/* Micro Tag Chip */}
                <span 
                  className="px-3 py-1 font-mono text-[11px] font-bold cut-corner-sm flex items-center gap-1.5"
                  style={{ backgroundColor: `${currentTheme.hex}20`, color: currentTheme.hex, border: `1px solid ${currentTheme.hex}50` }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>STATUS PILL</span>
                </span>
              </div>
            </div>

            {/* INTERACTIVE SLIDER */}
            <div className="space-y-3 pt-4 border-t border-dark-border/60">
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-zinc-400 uppercase tracking-wider">2. CONTROL DE VELOCIDAD / SLIDER UI:</span>
                <span className="font-bold text-white" style={{ color: currentTheme.hex }}>{sliderValue}% VELOCIDAD</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderValue}
                onChange={(e) => {
                  setSliderValue(Number(e.target.value));
                  if (Number(e.target.value) % 15 === 0) sounds.playHover();
                }}
                className="w-full h-2 bg-dark-surface rounded-lg appearance-none cursor-pointer accent-neon"
                style={{ accentColor: currentTheme.hex }}
              />
            </div>

            {/* VARIANT SEGMENTED SWITCHER */}
            <div className="space-y-3 pt-4 border-t border-dark-border/60">
              <div className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                3. SEGMENTED TABS (CONTROL FIGMA):
              </div>
              <div className="flex bg-dark-surface p-1 rounded-lg border border-dark-border">
                {(['primary', 'outline', 'chamfer'] as const).map((variant) => (
                  <button
                    key={variant}
                    onClick={() => {
                      sounds.playClick();
                      setSelectedVariant(variant);
                    }}
                    onMouseEnter={() => sounds.playHover()}
                    className={`flex-1 py-2 font-mono text-xs uppercase tracking-wider rounded-md transition-all ${
                      selectedVariant === variant
                        ? 'bg-dark-card text-white font-bold shadow'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                    style={selectedVariant === variant ? { color: currentTheme.hex } : {}}
                  >
                    {variant}
                  </button>
                ))}
              </div>
            </div>

            {/* LIVE SPEC TELEMETRY PREVIEW */}
            <div className="p-5 bg-dark-surface border border-dark-border/80 rounded-lg font-mono text-xs text-zinc-400 space-y-2">
              <div className="flex items-center justify-between text-zinc-300 font-bold border-b border-dark-border/60 pb-2">
                <span>INSPECTOR DE ESTILOS CSS</span>
                <span style={{ color: currentTheme.hex }}>--accent-color: {currentTheme.hex};</span>
              </div>
              <div className="text-[11px] space-y-1">
                <div>border-radius: <span className="text-white">chamfer-polygon(16px);</span></div>
                <div>font-family: <span className="text-white">'Syne', 'Space Grotesk', sans-serif;</span></div>
                <div>transition-timing: <span className="text-white">cubic-bezier(0.16, 1, 0.3, 1);</span></div>
                <div>motion-performance: <span className="text-green-400">GPU layer enabled (will-change: transform)</span></div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
