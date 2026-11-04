import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INICIALIZANDO ECOSISTEMA...');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const diagnosticSteps = [
      { at: 15, text: 'CALIBRANDO INTERFAZ REACT & VITE...' },
      { at: 35, text: 'INICIALIZANDO MOTOR GRÁFICO THREE.JS...' },
      { at: 60, text: 'COMPILANDO LIBRERÍAS & ESTADOS...' },
      { at: 85, text: 'OPTIMIZANDO RENDIMIENTO LIGHTHOUSE...' },
      { at: 98, text: 'SISTEMA LISTO.' },
    ];

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(onComplete, 600);
          }, 300);
          return 100;
        }

        const next = prev + Math.floor(Math.random() * 8) + 4;
        const capped = Math.min(next, 100);

        const currentStep = diagnosticSteps.find((s) => capped >= s.at && prev < s.at);
        if (currentStep) {
          setStatusText(currentStep.text);
        }

        return capped;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-12 bg-[#08080A] text-white transition-all duration-700 ease-in-out select-none ${
        isDone ? '-translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between border-b border-dark-border pb-4 font-mono text-xs text-zinc-400">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-neon animate-ping" />
          <span className="text-white font-bold">EDUARDO CONTRERAS</span>
          <span className="text-zinc-600">/</span>
          <span>SOFTWARE DEVELOPER</span>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <span className="text-neon">UPTAIET INFORMÁTICA</span>
        </div>
      </div>

      {/* CENTER HUGE PERCENTAGE COUNTER */}
      <div className="my-auto flex flex-col items-center justify-center text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-2 flex items-center gap-2">
          <span>{statusText}</span>
        </div>

        <div className="relative font-syne font-black text-8xl sm:text-9xl md:text-[12rem] tracking-tighter leading-none text-white select-none">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500">
            {progress.toString().padStart(3, '0')}
          </span>
          <span className="text-neon text-4xl sm:text-6xl md:text-7xl font-mono ml-2">%</span>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 blur-sm font-mono text-[14rem] text-neon">
            EC
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-md h-1.5 bg-dark-card border border-dark-border mt-6 relative overflow-hidden rounded-full">
          <div
            className="h-full bg-neon transition-all duration-100 ease-out shadow-[0_0_15px_#D2F532]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* FOOTER DIAGNOSTICS */}
      <div className="flex items-center justify-between border-t border-dark-border pt-4 font-mono text-[11px] text-zinc-400">
        <div className="flex items-center gap-3">
          <span>REACT 19</span>
          <span>FLUTTER</span>
          <span className="text-neon">SUPABASE</span>
        </div>
        <div className="tracking-wider">
          CÓDIGO LIMPIO // ALTO RENDIMIENTO
        </div>
      </div>
    </div>
  );
};
