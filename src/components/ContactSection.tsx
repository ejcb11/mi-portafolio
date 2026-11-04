import React, { useState, useEffect } from 'react';
import { Send, Copy, Check, MessageSquare, Terminal, Clock, Globe, Mail } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PORTFOLIO_DATA } from '../utils/portfolioData';
import { sounds } from '../utils/sound';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'CONSULTA POR PROYECTO O POSICIÓN',
    message: ''
  });

  // Local live clock ticker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('es-ES', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    sounds.playClick();
    navigator.clipboard.writeText(PORTFOLIO_DATA.driver.email);
    setCopied(true);
    sounds.playSuccess();

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#D2F532', '#ffffff', '#22c55e']
      });
    } catch {}

    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playClick();
    setFormStatus('sending');

    setTimeout(() => {
      setFormStatus('sent');
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#D2F532', '#ffffff']
        });
      } catch {}

      setTimeout(() => {
        setFormStatus('idle');
        setFormData({ name: '', email: '', subject: 'CONSULTA POR PROYECTO O POSICIÓN', message: '' });
      }, 4000);
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 bg-dark-surface relative border-b border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 font-mono text-xs text-neon tracking-widest uppercase mb-2">
              <MessageSquare className="w-4 h-4" />
              <span>CONTACTO DIRECTO & COLABORACIÓN</span>
            </div>
            <h2 className="font-syne font-black text-4xl sm:text-5xl md:text-7xl text-white tracking-tight uppercase leading-none">
              TRABAJEMOS JUNTOS
            </h2>
          </div>
          <p className="font-space text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
            ¿Tienes un proyecto en mente, requieres desarrollo frontend o mobile, o deseas evaluar mi incorporación a tu equipo? Conversemos.
          </p>
        </div>

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: DIRECT CONTACT INFO */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card */}
            <div className="bg-dark-card border border-dark-border p-6 sm:p-8 cut-corner-br">
              <div className="font-mono text-xs text-zinc-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-neon" />
                <span>CORREO ELECTRÓNICO OFICIAL:</span>
              </div>
              <div className="font-syne font-black text-xl sm:text-2xl text-white break-all mb-4">
                {PORTFOLIO_DATA.driver.email}
              </div>
              <button
                onClick={handleCopyEmail}
                onMouseEnter={() => sounds.playHover()}
                className="w-full py-3.5 bg-neon hover:bg-neon-hover text-black font-syne font-bold text-xs uppercase tracking-wider cut-corner-sm flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(210,245,50,0.3)] active:scale-95"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡CORREO COPIADO AL PORTAPAPELES!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>COPIAR CORREO (1-CLICK)</span>
                  </>
                )}
              </button>
            </div>

            {/* Live Status Info */}
            <div className="bg-dark-card border border-dark-border p-6 space-y-4 cut-corner-br font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-dark-border text-zinc-400">
                <span className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-neon" />
                  <span>ESTADO DE DISPONIBILIDAD</span>
                </span>
                <span className="text-neon font-bold">DISPONIBLE</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-zinc-400" />
                  <span>HORA LOCAL:</span>
                </span>
                <span className="text-white font-bold">{currentTime || '12:00:00'}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  <span>UBICACIÓN:</span>
                </span>
                <span className="text-white font-bold">{PORTFOLIO_DATA.driver.location}</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-zinc-400">MODALIDAD:</span>
                <span className="text-neon font-bold">REMOTO / TIEMPO COMPLETO / FREELANCE</span>
              </div>
            </div>

          </div>

          {/* RIGHT: INTERACTIVE FORM */}
          <div className="lg:col-span-7 bg-dark-card border border-dark-border p-6 sm:p-10 cut-corner-br">
            <h3 className="font-syne font-bold text-xl sm:text-2xl text-white uppercase mb-2">
              ENVIAR MENSAJE DIRECTO
            </h3>
            <p className="font-space text-zinc-400 text-xs sm:text-sm mb-6">
              Completa el formulario y te responderé en un lapso menor a 24 horas.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                    TU NOMBRE *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Carlos Mendoza"
                    className="w-full bg-dark-surface border border-dark-border focus:border-neon focus:ring-1 focus:ring-neon rounded-lg px-4 py-3 text-white font-space text-sm outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                    TU CORREO ELECTRÓNICO *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="carlos@empresa.com"
                    className="w-full bg-dark-surface border border-dark-border focus:border-neon focus:ring-1 focus:ring-neon rounded-lg px-4 py-3 text-white font-space text-sm outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                  MOTIVO O PROYECTO
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-dark-surface border border-dark-border focus:border-neon focus:ring-1 focus:ring-neon rounded-lg px-4 py-3 text-white font-space text-sm outline-none transition-colors"
                >
                  <option>DESARROLLO DE APLICACIÓN WEB (REACT / NEXT.JS)</option>
                  <option>DESARROLLO DE APLICACIÓN MÓVIL (FLUTTER)</option>
                  <option>SISTEMA COMPLETO / FULL STACK (SUPABASE / NODE)</option>
                  <option>OPORTUNIDAD LABORAL / CONTRATACIÓN</option>
                  <option>OTRA CONSULTA TÉCNICA</option>
                </select>
              </div>

              <div>
                <label className="block font-mono text-xs uppercase text-zinc-400 mb-1.5">
                  MENSAJE *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribe aquí los detalles del proyecto, requerimientos o mensaje..."
                  className="w-full bg-dark-surface border border-dark-border focus:border-neon focus:ring-1 focus:ring-neon rounded-lg px-4 py-3 text-white font-space text-sm outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === 'sending' || formStatus === 'sent'}
                onMouseEnter={() => sounds.playHover()}
                className={`w-full py-4 font-syne font-extrabold text-sm uppercase tracking-wider cut-corner-sm flex items-center justify-center gap-2 transition-all ${
                  formStatus === 'sent'
                    ? 'bg-green-500 text-black'
                    : 'bg-white hover:bg-neon text-black hover:shadow-[0_0_25px_rgba(210,245,50,0.5)]'
                }`}
              >
                {formStatus === 'sending' && (
                  <span className="font-mono text-xs">ENVIANDO MENSAJE...</span>
                )}
                {formStatus === 'sent' && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>¡MENSAJE ENVIADO CORRECTAMENTE!</span>
                  </>
                )}
                {formStatus === 'idle' && (
                  <>
                    <span>ENVIAR MENSAJE</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
