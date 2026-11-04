import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause, Volume2, Volume1, VolumeX, Maximize, Minimize } from 'lucide-react';

export const ShowreelSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sliderRef = useRef<HTMLInputElement | null>(null);
  const timeDisplayRef = useRef<HTMLSpanElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const timeRef = useRef(0);
  const prevTimeRef = useRef(-1);
  const playingRef = useRef(true);
  const mutedRef = useRef(false);
  const volumeRef = useRef(0.85);
  const scrubbingRef = useRef(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const reverbNodeRef = useRef<ConvolverNode | null>(null);
  const pinkNoiseBufferRef = useRef<AudioBuffer | null>(null);
  const firedCuesRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    mutedRef.current = isMuted;
    volumeRef.current = volume;
    if (masterGainRef.current && audioCtxRef.current) {
      const targetGain = isMuted ? 0 : volume * 0.85;
      masterGainRef.current.gain.setTargetAtTime(
        targetGain,
        audioCtxRef.current.currentTime,
        0.02
      );
    }
  }, [isMuted, volume]);

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const actx = new AudioCtx();
      audioCtxRef.current = actx;

      const comp = actx.createDynamicsCompressor();
      comp.threshold.setValueAtTime(-14, actx.currentTime);
      comp.knee.setValueAtTime(10, actx.currentTime);
      comp.ratio.setValueAtTime(5, actx.currentTime);
      comp.attack.setValueAtTime(0.003, actx.currentTime);
      comp.release.setValueAtTime(0.12, actx.currentTime);

      const master = actx.createGain();
      master.gain.setValueAtTime(mutedRef.current ? 0 : volumeRef.current * 0.85, actx.currentTime);
      masterGainRef.current = master;

      const reverb = actx.createConvolver();
      const revLen = Math.floor(actx.sampleRate * 1.1);
      const revBuf = actx.createBuffer(2, revLen, actx.sampleRate);
      for (let c = 0; c < 2; c++) {
        const d = revBuf.getChannelData(c);
        for (let i = 0; i < revLen; i++) {
          d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / revLen, 3.2) * 0.4;
        }
      }
      reverb.buffer = revBuf;
      reverbNodeRef.current = reverb;

      const revLp = actx.createBiquadFilter();
      revLp.type = 'lowpass';
      revLp.frequency.setValueAtTime(2800, actx.currentTime);
      const revGain = actx.createGain();
      revGain.gain.setValueAtTime(0.22, actx.currentTime);

      reverb.connect(revLp);
      revLp.connect(revGain);
      revGain.connect(comp);

      comp.connect(master);
      master.connect(actx.destination);

      const sr = actx.sampleRate;
      const pBuf = actx.createBuffer(1, sr * 2, sr);
      const out = pBuf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < out.length; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
        b6 = white * 0.115926;
      }
      pinkNoiseBufferRef.current = pBuf;
    }

    const actx = audioCtxRef.current;
    if (actx && actx.state === 'suspended') {
      actx.resume();
    }
  };

  const togglePlay = () => {
    initAudio();
    setIsPlaying((prev) => !prev);
  };

  const toggleMute = () => {
    initAudio();
    setIsMuted((prev) => !prev);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    initAudio();
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    initAudio();
    const val = parseFloat(e.target.value);
    timeRef.current = val;
    firedCuesRef.current.clear();
    if (timeDisplayRef.current) {
      timeDisplayRef.current.textContent = `${formatTime(val)} / 0:15`;
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    const DURATION = 15.0;

    const COL_NEON = '#D2F532';
    const COL_BLACK = '#080809';
    const COL_DARK = '#121318';
    const COL_WHITE = '#FFFFFF';
    const COL_GRAY = '#A1A1AA';

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const norm = (v: number, a: number, b: number) => clamp((v - a) / (b - a), 0, 1);
    const easeOutExpo = (x: number) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));
    const easeOutBack = (x: number) => {
      const c1 = 1.70158;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
    };
    const easeInOutCubic = (x: number) =>
      x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

    const playKineticThud = (freqStart = 125, freqEnd = 34, duration = 0.28, vol = 0.75) => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (!actx || actx.state !== 'running' || mutedRef.current || volumeRef.current === 0 || !master)
        return;
      const now = actx.currentTime;

      const osc = actx.createOscillator();
      const g = actx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqStart, now);
      osc.frequency.exponentialRampToValueAtTime(freqEnd, now + duration);
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(vol, now + 0.006);
      g.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + duration + 0.01);

      const knock = actx.createOscillator();
      const kg = actx.createGain();
      knock.type = 'triangle';
      knock.frequency.setValueAtTime(freqStart * 2.2, now);
      knock.frequency.exponentialRampToValueAtTime(55, now + 0.025);
      kg.gain.setValueAtTime(vol * 0.3, now);
      kg.gain.exponentialRampToValueAtTime(0.001, now + 0.028);
      knock.connect(kg);
      kg.connect(master);
      knock.start(now);
      knock.stop(now + 0.03);
    };

    const playAirWhoosh = (
      duration = 0.34,
      startF = 180,
      peakF = 1150,
      panDir = 1,
      vol = 0.55
    ) => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      const reverb = reverbNodeRef.current;
      const pBuf = pinkNoiseBufferRef.current;
      if (
        !actx ||
        actx.state !== 'running' ||
        mutedRef.current ||
        volumeRef.current === 0 ||
        !master ||
        !reverb ||
        !pBuf
      )
        return;
      const now = actx.currentTime;

      const src = actx.createBufferSource();
      src.buffer = pBuf;

      const filter = actx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.Q.setValueAtTime(1.6, now);
      filter.frequency.setValueAtTime(startF, now);
      filter.frequency.exponentialRampToValueAtTime(peakF, now + duration * 0.55);
      filter.frequency.exponentialRampToValueAtTime(200, now + duration);

      const g = actx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(vol, now + duration * 0.45);
      g.gain.exponentialRampToValueAtTime(0.001, now + duration);

      src.connect(filter);
      filter.connect(g);

      if (actx.createStereoPanner) {
        const panner = actx.createStereoPanner();
        panner.pan.setValueAtTime(-0.65 * panDir, now);
        panner.pan.linearRampToValueAtTime(0.65 * panDir, now + duration);
        g.connect(panner);
        panner.connect(master);
        panner.connect(reverb);
      } else {
        g.connect(master);
        g.connect(reverb);
      }

      src.start(now);
      src.stop(now + duration + 0.02);
    };

    const playTactileSnap = (pitch = 920, vol = 0.22) => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (!actx || actx.state !== 'running' || mutedRef.current || volumeRef.current === 0 || !master)
        return;
      const now = actx.currentTime;

      const osc = actx.createOscillator();
      const g = actx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(pitch, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.022);

      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.024);

      osc.connect(g);
      g.connect(master);
      osc.start(now);
      osc.stop(now + 0.026);
    };

    const playMechanicalShutter = (clicks = 5, spacing = 0.048, vol = 0.25) => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      if (!actx || actx.state !== 'running' || mutedRef.current || volumeRef.current === 0 || !master)
        return;
      for (let i = 0; i < clicks; i++) {
        const t0 = actx.currentTime + i * spacing;
        const osc = actx.createOscillator();
        const g = actx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600 + i * 95, t0);
        osc.frequency.exponentialRampToValueAtTime(140, t0 + 0.018);
        g.gain.setValueAtTime(vol, t0);
        g.gain.exponentialRampToValueAtTime(0.001, t0 + 0.02);
        osc.connect(g);
        g.connect(master);
        osc.start(t0);
        osc.stop(t0 + 0.022);
      }
    };

    const playRadarPulse = (freq = 528, vol = 0.16) => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      const reverb = reverbNodeRef.current;
      if (
        !actx ||
        actx.state !== 'running' ||
        mutedRef.current ||
        volumeRef.current === 0 ||
        !master ||
        !reverb
      )
        return;
      const now = actx.currentTime;
      [freq, freq * 1.5].forEach((f, idx) => {
        const osc = actx.createOscillator();
        const g = actx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now);
        g.gain.setValueAtTime(0.001, now);
        g.gain.linearRampToValueAtTime(idx === 0 ? vol : vol * 0.35, now + 0.015);
        g.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
        osc.connect(g);
        g.connect(master);
        g.connect(reverb);
        osc.start(now);
        osc.stop(now + 0.56);
      });
    };

    const playFinalChord = () => {
      const actx = audioCtxRef.current;
      const master = masterGainRef.current;
      const reverb = reverbNodeRef.current;
      if (
        !actx ||
        actx.state !== 'running' ||
        mutedRef.current ||
        volumeRef.current === 0 ||
        !master ||
        !reverb
      )
        return;
      const now = actx.currentTime;
      const notes = [146.83, 220.0, 293.66, 329.63, 369.99, 440.0];

      const lp = actx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(1800, now);
      lp.frequency.exponentialRampToValueAtTime(480, now + 1.8);

      const g = actx.createGain();
      g.gain.setValueAtTime(0.001, now);
      g.gain.linearRampToValueAtTime(0.22, now + 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + 1.9);

      lp.connect(g);
      g.connect(master);
      g.connect(reverb);

      notes.forEach((f, i) => {
        const osc = actx.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        osc.detune.setValueAtTime((i - 2.5) * 5, now);
        osc.connect(lp);
        osc.start(now);
        osc.stop(now + 1.95);
      });
    };

    const SOUND_CUES = [
      {
        time: 0.04,
        id: 's1_ring',
        fn: () => {
          playRadarPulse(440, 0.16);
          playAirWhoosh(0.32, 160, 900, 1, 0.45);
        },
      },
      {
        time: 0.16,
        id: 's1_ejcb_slam',
        fn: () => {
          playKineticThud(140, 32, 0.34, 0.85);
          playTactileSnap(1100, 0.25);
        },
      },
      {
        time: 0.56,
        id: 's1_banner',
        fn: () => {
          playAirWhoosh(0.24, 240, 1200, -1, 0.4);
          playTactileSnap(880, 0.22);
        },
      },
      { time: 1.85, id: 's1_wipe', fn: () => playAirWhoosh(0.36, 180, 1450, 1, 0.65) },
      {
        time: 2.2,
        id: 's2_enter',
        fn: () => {
          playKineticThud(130, 36, 0.28, 0.78);
          playTactileSnap(980, 0.24);
        },
      },
      {
        time: 2.85,
        id: 's2_card2',
        fn: () => {
          playAirWhoosh(0.24, 220, 1100, 1, 0.45);
          playKineticThud(110, 40, 0.22, 0.55);
          playTactileSnap(1080, 0.2);
        },
      },
      {
        time: 3.45,
        id: 's2_card3',
        fn: () => {
          playAirWhoosh(0.24, 240, 1250, -1, 0.45);
          playKineticThud(118, 38, 0.24, 0.6);
          playTactileSnap(1240, 0.22);
        },
      },
      { time: 4.85, id: 's2_shutter', fn: () => playMechanicalShutter(5, 0.046, 0.24) },
      {
        time: 5.2,
        id: 's3_bento_top',
        fn: () => {
          playAirWhoosh(0.34, 200, 1300, 1, 0.58);
          playKineticThud(125, 35, 0.28, 0.72);
          playRadarPulse(528, 0.15);
        },
      },
      {
        time: 5.9,
        id: 's3_bento_bot',
        fn: () => {
          playAirWhoosh(0.28, 220, 1150, -1, 0.48);
          playKineticThud(115, 38, 0.25, 0.65);
          playTactileSnap(960, 0.22);
        },
      },
      { time: 6.8, id: 's3_sonar2', fn: () => playRadarPulse(587.33, 0.14) },
      { time: 7.7, id: 's3_sonar3', fn: () => playRadarPulse(659.25, 0.14) },
      { time: 8.15, id: 's3_wipe', fn: () => playAirWhoosh(0.3, 200, 1350, 1, 0.52) },
      {
        time: 8.4,
        id: 's4_p1',
        fn: () => {
          playKineticThud(135, 34, 0.26, 0.8);
          playTactileSnap(920, 0.25);
        },
      },
      {
        time: 9.17,
        id: 's4_p2',
        fn: () => {
          playAirWhoosh(0.2, 260, 1300, -1, 0.42);
          playKineticThud(142, 36, 0.26, 0.8);
          playTactileSnap(1040, 0.25);
        },
      },
      {
        time: 9.94,
        id: 's4_p3',
        fn: () => {
          playAirWhoosh(0.2, 280, 1400, 1, 0.42);
          playKineticThud(150, 38, 0.26, 0.8);
          playTactileSnap(1160, 0.25);
        },
      },
      {
        time: 10.71,
        id: 's4_p4',
        fn: () => {
          playAirWhoosh(0.22, 300, 1500, -1, 0.45);
          playKineticThud(158, 40, 0.26, 0.82);
          playTactileSnap(1280, 0.25);
        },
      },
      { time: 11.15, id: 's4_shutter_out', fn: () => playMechanicalShutter(4, 0.05, 0.2) },
      {
        time: 11.5,
        id: 's5_cta_reveal',
        fn: () => {
          playAirWhoosh(0.45, 180, 1400, 1, 0.6);
          playKineticThud(145, 30, 0.42, 0.88);
          playFinalChord();
        },
      },
      {
        time: 12.25,
        id: 's5_buttons',
        fn: () => {
          playTactileSnap(1020, 0.2);
          setTimeout(() => playTactileSnap(1320, 0.2), 70);
        },
      },
    ];

    const processAudioTimeline = (t: number) => {
      const actx = audioCtxRef.current;
      if (!actx || actx.state !== 'running' || mutedRef.current || volumeRef.current === 0) return;

      if (t < prevTimeRef.current) {
        firedCuesRef.current.clear();
      }

      for (const cue of SOUND_CUES) {
        if (t >= cue.time && t - cue.time < 0.25 && !firedCuesRef.current.has(cue.id)) {
          firedCuesRef.current.add(cue.id);
          cue.fn();
        }
      }

      prevTimeRef.current = t;
    };

    const fontSizeCache = new Map<string, number>();

    const fillFittedText = (
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      maxFontSize: number,
      weight: string,
      family: string,
      color: string,
      align: CanvasTextAlign = 'center'
    ) => {
      ctx.save();
      ctx.textAlign = align;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = color;
      const cacheKey = `${text}|${maxWidth}|${maxFontSize}|${weight}|${family}`;
      let size = fontSizeCache.get(cacheKey);
      if (size === undefined) {
        size = maxFontSize;
        ctx.font = `${weight} ${size}px ${family}`;
        while (ctx.measureText(text).width > maxWidth && size > 10) {
          size -= 1;
          ctx.font = `${weight} ${size}px ${family}`;
        }
        fontSizeCache.set(cacheKey, size);
      } else {
        ctx.font = `${weight} ${size}px ${family}`;
      }
      ctx.fillText(text, x, y);
      ctx.restore();
    };

    const defineCutBoxPath = (x: number, y: number, w: number, h: number, cut: number) => {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + w - cut, y);
      ctx.lineTo(x + w, y + cut);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + cut, y + h);
      ctx.lineTo(x, y + h - cut);
      ctx.closePath();
    };

    const drawCutBox = (
      x: number,
      y: number,
      w: number,
      h: number,
      cut: number,
      fill: string | null,
      stroke: string | null,
      lineWidth = 2,
      renderInside?: () => void
    ) => {
      ctx.save();
      defineCutBoxPath(x, y, w, h, cut);
      if (fill) {
        ctx.fillStyle = fill;
        ctx.fill();
      }
      if (renderInside) {
        ctx.save();
        defineCutBoxPath(x, y, w, h, cut);
        ctx.clip();
        renderInside();
        ctx.restore();
      }
      if (stroke) {
        defineCutBoxPath(x, y, w, h, cut);
        ctx.strokeStyle = stroke;
        ctx.lineWidth = lineWidth;
        ctx.stroke();
      }
      ctx.restore();
    };

    const particles = Array.from({ length: 65 }, (_, i) => ({
      x: (Math.sin(i * 78.233) * 0.5 + 0.5) * W,
      y: (Math.cos(i * 45.164) * 0.5 + 0.5) * H,
      size: (i % 4) + 1.5,
      speedX: ((i % 7) - 3) * 40,
      speedY: ((i % 5) - 2) * 35,
      isNeon: i % 3 === 0,
    }));

    const drawTechGrid = (alpha = 0.12, color = COL_WHITE, spacing = 64, shiftX = 0, shiftY = 0) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.globalAlpha = alpha;
      ctx.lineWidth = 1;
      const offsetX = ((shiftX % spacing) + spacing) % spacing;
      const offsetY = ((shiftY % spacing) + spacing) % spacing;
      ctx.beginPath();
      for (let x = offsetX; x < W; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
      }
      for (let y = offsetY; y < H; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
      }
      ctx.stroke();
      ctx.restore();
    };

    const drawCrosshairs = (color = COL_NEON, inset = 36, size = 14) => {
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      const corners = [
        [inset, inset],
        [W - inset, inset],
        [inset, H - inset],
        [W - inset, H - inset],
      ];
      corners.forEach(([cx, cy]) => {
        ctx.beginPath();
        ctx.moveTo(cx - size, cy);
        ctx.lineTo(cx + size, cy);
        ctx.moveTo(cx, cy - size);
        ctx.lineTo(cx, cy + size);
        ctx.stroke();
      });
      ctx.restore();
    };

    const drawWireframeSphere = (cx: number, cy: number, radius: number, t: number, color = COL_NEON) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.strokeStyle = color;
      ctx.globalAlpha = 0.88;
      ctx.lineWidth = 1.8;

      const rotY = t * 2.2;
      const rotX = t * 1.3;
      const latLines = 6;
      const lonLines = 10;

      for (let i = 1; i < latLines; i++) {
        const phi = (i / latLines) * Math.PI;
        ctx.beginPath();
        for (let j = 0; j <= 40; j++) {
          const theta = (j / 40) * Math.PI * 2;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
          const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
          const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
          if (j === 0) ctx.moveTo(x1, y2);
          else ctx.lineTo(x1, y2);
        }
        ctx.stroke();
      }

      for (let i = 0; i < lonLines; i++) {
        const theta = (i / lonLines) * Math.PI;
        ctx.beginPath();
        for (let j = 0; j <= 40; j++) {
          const phi = (j / 40) * Math.PI * 2;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.cos(phi);
          const z = radius * Math.sin(phi) * Math.sin(theta);
          const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
          const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
          const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
          if (j === 0) ctx.moveTo(x1, y2);
          else ctx.lineTo(x1, y2);
        }
        ctx.stroke();
      }
      ctx.restore();
    };

    const renderScene1 = (t: number) => {
      ctx.fillStyle = COL_BLACK;
      ctx.fillRect(0, 0, W, H);
      drawTechGrid(0.14, COL_NEON, 56, t * 120, t * 60);

      for (let i = 0; i < 6; i++) {
        const bp = (t * 2.5 + i * 0.22) % 1;
        const bx = bp * (W + 400) - 200;
        ctx.save();
        ctx.strokeStyle = i % 2 === 0 ? COL_NEON : COL_WHITE;
        ctx.globalAlpha = 0.25;
        ctx.lineWidth = i % 2 === 0 ? 4 : 1.5;
        ctx.beginPath();
        ctx.moveTo(bx, 0);
        ctx.lineTo(bx - 240, H);
        ctx.stroke();
        ctx.restore();
      }

      const ringScale = easeOutExpo(norm(t, 0.05, 1.4));
      ctx.save();
      ctx.translate(W / 2, H / 2 - 25);
      ctx.strokeStyle = COL_NEON;
      ctx.lineWidth = 2;
      ctx.globalAlpha = 0.5 * (1 - norm(t, 1.6, 2.2));
      ctx.beginPath();
      ctx.arc(0, 0, 210 * ringScale, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      const slam = easeOutBack(norm(t, 0.15, 0.75));
      ctx.save();
      ctx.translate(W / 2, H / 2 - 42);
      ctx.scale(slam, slam);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const glitchX = t < 0.5 ? Math.sin(t * 90) * 10 : 6;
      ctx.font = '800 150px Syne, system-ui, sans-serif';
      ctx.strokeStyle = COL_NEON;
      ctx.lineWidth = 3;
      ctx.strokeText('EJCB', glitchX, 6);
      ctx.fillStyle = COL_WHITE;
      ctx.fillText('EJCB', 0, 0);
      ctx.restore();

      if (t > 0.55) {
        const subP = easeOutExpo(norm(t, 0.55, 1.1));
        const boxW = 680 * subP;
        const boxY = H / 2 + 68;
        const boxH = 50;
        drawCutBox(W / 2 - boxW / 2, boxY, boxW, boxH, 12, COL_NEON, null, 0, () => {
          if (subP > 0.45) {
            fillFittedText(
              'EDUARDO CONTRERAS // SOFTWARE DEVELOPER',
              W / 2,
              boxY + boxH / 2,
              620,
              19,
              '800',
              'monospace',
              COL_BLACK,
              'center'
            );
          }
        });
      }

      drawCrosshairs(COL_NEON, 36, 14);

      if (t > 1.85) {
        const wp = easeInOutCubic(norm(t, 1.85, 2.2));
        ctx.save();
        ctx.fillStyle = COL_NEON;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(W * wp * 1.3, 0);
        ctx.lineTo(W * wp * 1.3 - 260, H);
        ctx.lineTo(0, H);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    const renderScene2 = (t: number) => {
      const localT = t - 2.2;
      const isInverted = localT < 0.42;
      ctx.fillStyle = isInverted ? COL_NEON : COL_BLACK;
      ctx.fillRect(0, 0, W, H);
      drawTechGrid(isInverted ? 0.2 : 0.12, isInverted ? COL_BLACK : COL_WHITE, 64, -t * 150, 0);

      const sphereScale = easeOutBack(norm(localT, 0.1, 0.8));
      drawWireframeSphere(1010, H * 0.5, 155 * sphereScale, t, isInverted ? COL_BLACK : COL_NEON);

      const items = [
        { word: 'REACT 19 & TS', sub: 'ARQUITECTURA MODULAR DE COMPONENTES', start: 0.05, accent: true },
        { word: 'TAILWIND CSS', sub: 'DISEÑO BRUTALISTA & INTERFACES 60 FPS', start: 0.65, accent: false },
        { word: 'THREE.JS & WEBGL', sub: 'SHADERS GLSL & ACELERACIÓN GPU 3D', start: 1.25, accent: true },
      ];

      items.forEach((item, idx) => {
        const ip = easeOutExpo(norm(localT, item.start, item.start + 0.5));
        if (ip <= 0) return;
        const cardW = 640;
        const cardH = 136;
        const cardX = 76 - (1 - ip) * 180;
        const cardY = 86 + idx * 166;

        ctx.save();
        ctx.globalAlpha = ip;

        drawCutBox(
          cardX,
          cardY,
          cardW,
          cardH,
          16,
          isInverted ? COL_BLACK : COL_DARK,
          isInverted ? COL_BLACK : COL_NEON,
          2,
          () => {
            const tagFill = isInverted ? COL_NEON : item.accent ? COL_NEON : '#1f212b';
            const tagTextCol = isInverted ? COL_BLACK : item.accent ? COL_BLACK : COL_NEON;
            drawCutBox(cardX + 24, cardY + 18, 420, 28, 6, tagFill, null, 0);
            fillFittedText(
              item.sub,
              cardX + 36,
              cardY + 32,
              396,
              12,
              '800',
              'monospace',
              tagTextCol,
              'left'
            );

            fillFittedText(
              item.word,
              cardX + 24,
              cardY + 92,
              cardW - 48,
              46,
              '800',
              'Syne, system-ui, sans-serif',
              COL_WHITE,
              'left'
            );
          }
        );

        ctx.restore();
      });

      drawCrosshairs(isInverted ? COL_BLACK : COL_NEON, 36, 12);
    };

    const renderScene3 = (t: number) => {
      const localT = t - 5.2;
      ctx.fillStyle = COL_BLACK;
      ctx.fillRect(0, 0, W, H);

      for (let r = 0; r < 5; r++) {
        const rp = (localT * 0.6 + r * 0.2) % 1;
        ctx.save();
        ctx.strokeStyle = r % 2 === 0 ? COL_NEON : COL_WHITE;
        ctx.globalAlpha = (1 - rp) * 0.35;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(W / 2, H / 2, rp * 560, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      const slideIn = easeOutExpo(norm(localT, 0.05, 0.65));
      const topY = 85;
      const boxW = 550;
      const boxH = 215;

      const leftX = 70 - (1 - slideIn) * 300;
      drawCutBox(leftX, topY, boxW, boxH, 20, COL_DARK, COL_NEON, 2, () => {
        fillFittedText(
          'DESARROLLO MÓVIL MULTIPLATAFORMA',
          leftX + 28,
          topY + 42,
          boxW - 56,
          13,
          '800',
          'monospace',
          COL_NEON,
          'left'
        );
        fillFittedText(
          'FLUTTER & DART',
          leftX + 28,
          topY + 108,
          boxW - 56,
          42,
          '800',
          'Syne, system-ui, sans-serif',
          COL_WHITE,
          'left'
        );
        fillFittedText(
          'iOS & Android  •  Escaneo QR  •  Estado Reactivo',
          leftX + 28,
          topY + 168,
          boxW - 56,
          15,
          '600',
          'system-ui, -apple-system, sans-serif',
          COL_GRAY,
          'left'
        );
      });

      const rightX = W - 70 - boxW + (1 - slideIn) * 300;
      drawCutBox(rightX, topY, boxW, boxH, 20, COL_NEON, COL_WHITE, 2, () => {
        fillFittedText(
          'PERSISTENCIA RELACIONAL & REALTIME CLOUD',
          rightX + 28,
          topY + 42,
          boxW - 56,
          13,
          '800',
          'monospace',
          COL_BLACK,
          'left'
        );
        fillFittedText(
          'SUPABASE & SQL',
          rightX + 28,
          topY + 108,
          boxW - 56,
          42,
          '800',
          'Syne, system-ui, sans-serif',
          COL_BLACK,
          'left'
        );
        fillFittedText(
          'PostgreSQL  •  Políticas RLS  •  WebSockets en Vivo',
          rightX + 28,
          topY + 168,
          boxW - 56,
          15,
          '700',
          'system-ui, -apple-system, sans-serif',
          COL_BLACK,
          'left'
        );
      });

      if (localT > 0.7) {
        const botP = easeOutBack(norm(localT, 0.7, 1.3));
        const botY = 335 + (1 - botP) * 200;
        const botW = W - 140;
        const botH = 215;
        drawCutBox(70, botY, botW, botH, 22, COL_BLACK, COL_WHITE, 2, () => {
          fillFittedText(
            'BACKEND, APIS REST & CERTIFICACIONES INTERNACIONALES',
            100,
            botY + 44,
            botW - 60,
            13,
            '800',
            'monospace',
            COL_NEON,
            'left'
          );
          fillFittedText(
            'NODE.JS  •  PYTHON  •  ANTHROPIC AI',
            100,
            botY + 110,
            botW - 60,
            38,
            '800',
            'Syne, system-ui, sans-serif',
            COL_WHITE,
            'left'
          );
          fillFittedText(
            'EXPRESS REST API   //   FLASK & SQLITE   //   IBM CYBERSECURITY',
            100,
            botY + 170,
            botW - 60,
            15,
            '800',
            'monospace',
            COL_NEON,
            'left'
          );
        });
      }

      drawCrosshairs(COL_NEON, 30, 12);
    };

    const renderScene4 = (t: number) => {
      const localT = t - 8.4;
      ctx.fillStyle = COL_BLACK;
      ctx.fillRect(0, 0, W, H);

      const slides = [
        {
          badge: 'ECOSISTEMA MÓVIL & CLOUD',
          title: 'FERREIRA FITNESS GYM',
          detail: 'APP FLUTTER  •  CARNET QR  •  RECEPCIÓN EN TIEMPO REAL',
          invert: false,
        },
        {
          badge: 'E-COMMERCE & UI LIBRARY',
          title: 'GEARSTORE HARDWARE',
          detail: 'REACT 19  •  COMPONENTES MODULARES  •  100/100 LIGHTHOUSE',
          invert: true,
        },
        {
          badge: 'SISTEMAS HOSPITALARIOS & SALUD',
          title: 'VIDACLINIC & CLINIMANT',
          detail: 'PYTHON  •  NODE.JS  •  LIQUIDACIÓN MÉDICA  •  API BCV',
          invert: false,
        },
        {
          badge: 'FORMACIÓN UNIVERSITARIA',
          title: 'INGENIERÍA EN INFORMÁTICA',
          detail: 'TSU GRADUADO & ÚLTIMO AÑO DE INGENIERÍA — UPTAIET',
          invert: true,
        },
      ];

      const idx = clamp(Math.floor(localT / 0.77), 0, slides.length - 1);
      const slideT = (localT % 0.77) / 0.77;
      const current = slides[idx];
      const scale = easeOutBack(clamp(slideT * 2.5, 0, 1));

      const boxW = 1040;
      const boxH = 310;

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.scale(scale, scale);

      drawCutBox(
        -boxW / 2,
        -boxH / 2,
        boxW,
        boxH,
        28,
        current.invert ? COL_NEON : COL_DARK,
        current.invert ? COL_WHITE : COL_NEON,
        3,
        () => {
          fillFittedText(
            current.badge,
            0,
            -92,
            boxW - 96,
            15,
            '800',
            'monospace',
            current.invert ? COL_BLACK : COL_NEON,
            'center'
          );
          fillFittedText(
            current.title,
            0,
            -6,
            boxW - 96,
            52,
            '800',
            'Syne, system-ui, sans-serif',
            current.invert ? COL_BLACK : COL_WHITE,
            'center'
          );
          fillFittedText(
            current.detail,
            0,
            84,
            boxW - 96,
            16,
            '800',
            'monospace',
            current.invert ? COL_BLACK : COL_WHITE,
            'center'
          );
        }
      );

      ctx.restore();
      drawCrosshairs(COL_NEON, 36, 14);
    };

    const renderScene5 = (t: number) => {
      const localT = t - 11.5;
      const enterP = easeOutExpo(norm(localT, 0, 0.9));
      ctx.fillStyle = COL_BLACK;
      ctx.fillRect(0, 0, W, H);
      drawTechGrid(0.1, COL_NEON, 64, t * 25, -t * 20);

      particles.forEach((pt) => {
        const px = (pt.x + pt.speedX * t + W * 10) % W;
        const py = (pt.y + pt.speedY * t + H * 10) % H;
        ctx.save();
        ctx.fillStyle = pt.isNeon ? COL_NEON : COL_WHITE;
        ctx.globalAlpha = pt.isNeon ? 0.65 : 0.25;
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      ctx.save();
      ctx.translate(W / 2, H / 2 - 20);
      ctx.scale(0.85 + 0.15 * enterP, 0.85 + 0.15 * enterP);
      ctx.globalAlpha = enterP;

      fillFittedText(
        'DISPONIBLE PARA PROYECTOS & DESARROLLO FULL STACK',
        0,
        -132,
        980,
        15,
        '800',
        'monospace',
        COL_NEON,
        'center'
      );

      fillFittedText(
        'EDUARDO CONTRERAS',
        0,
        -54,
        980,
        58,
        '800',
        'Syne, system-ui, sans-serif',
        COL_WHITE,
        'center'
      );

      fillFittedText(
        'CONSTRUYAMOS EL FUTURO DIGITAL',
        0,
        18,
        980,
        34,
        '800',
        'Syne, system-ui, sans-serif',
        COL_NEON,
        'center'
      );

      const pillY = 84;
      const pillW = 390;
      const pillH = 56;

      drawCutBox(-pillW - 18, pillY, pillW, pillH, 12, COL_DARK, COL_NEON, 2, () => {
        fillFittedText(
          'GITHUB // github.com/ejcb11',
          -pillW / 2 - 18,
          pillY + pillH / 2,
          pillW - 36,
          15,
          '800',
          'monospace',
          COL_WHITE,
          'center'
        );
      });

      drawCutBox(18, pillY, pillW, pillH, 12, COL_NEON, null, 0, () => {
        fillFittedText(
          'LINKEDIN // eduardo-contreras-dev',
          pillW / 2 + 18,
          pillY + pillH / 2,
          pillW - 36,
          15,
          '800',
          'monospace',
          COL_BLACK,
          'center'
        );
      });

      ctx.restore();
      drawCrosshairs(COL_NEON, 32, 16);
    };

    const renderFrame = (t: number) => {
      ctx.clearRect(0, 0, W, H);
      if (t < 2.2) renderScene1(t);
      else if (t < 5.2) renderScene2(t);
      else if (t < 8.4) renderScene3(t);
      else if (t < 11.5) renderScene4(t);
      else renderScene5(t);
    };

    let rafId: number;
    let lastTs = performance.now();
    let isVisible = true;
    let observer: IntersectionObserver | null = null;

    if (containerRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

    const loop = (now: number) => {
      rafId = requestAnimationFrame(loop);
      if (!isVisible) return;

      const dt = (now - lastTs) / 1000;
      lastTs = now;

      if (playingRef.current && !scrubbingRef.current) {
        timeRef.current += dt;
        if (timeRef.current >= DURATION) {
          timeRef.current = 0;
        }
        processAudioTimeline(timeRef.current);
        if (sliderRef.current) {
          sliderRef.current.value = timeRef.current.toFixed(2);
        }
        if (timeDisplayRef.current) {
          const secs = Math.floor(timeRef.current);
          const m = Math.floor(secs / 60);
          const s = secs % 60;
          timeDisplayRef.current.textContent = `${m}:${s.toString().padStart(2, '0')} / 0:15`;
        }
      }

      renderFrame(timeRef.current);
    };

    rafId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafId);
      if (observer) observer.disconnect();
    };
  }, []);

  return (
    <section className="py-16 md:py-24 bg-dark-bg border-b border-dark-border select-none">
      {/* 75% of the window width (desktop), responsive on smaller viewports */}
      <div className="w-full max-w-[94vw] lg:max-w-[75vw] mx-auto">
        <div
          ref={containerRef}
          className="relative w-full aspect-[1280/656] bg-black rounded-xl overflow-hidden border border-zinc-800 shadow-[0_20px_50px_rgba(0,0,0,0.8)] group"
        >
          {/* Main Video Canvas */}
          <canvas
            ref={canvasRef}
            width={1280}
            height={656}
            onClick={togglePlay}
            className="w-full h-full block cursor-pointer object-cover"
          />

          {/* Center Play Overlay Icon when paused */}
          {!isPlaying && (
            <button
              type="button"
              onClick={togglePlay}
              className="absolute inset-0 flex items-center justify-center bg-black/35 backdrop-blur-[1px] transition-all cursor-pointer"
              aria-label="Reproducir video"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900/90 border border-white/20 flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-transform">
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white translate-x-0.5" />
              </div>
            </button>
          )}

          {/* Classic Video Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/95 via-black/80 to-transparent pt-6 pb-2 px-3 sm:px-4 transition-opacity duration-200">
            {/* Timeline Progress Slider */}
            <div className="relative w-full mb-2">
              <input
                ref={sliderRef}
                type="range"
                min={0}
                max={15}
                step={0.01}
                defaultValue={0}
                onMouseDown={() => {
                  scrubbingRef.current = true;
                }}
                onTouchStart={() => {
                  scrubbingRef.current = true;
                }}
                onChange={handleSeek}
                onMouseUp={() => {
                  scrubbingRef.current = false;
                }}
                onTouchEnd={() => {
                  scrubbingRef.current = false;
                }}
                className="w-full h-1 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition"
              />
            </div>

            {/* Classic Controls: Play/Pause, Volume, Time, Fullscreen */}
            <div className="flex items-center justify-between text-white/90">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Play / Pause */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="p-1.5 text-white/90 hover:text-white transition cursor-pointer"
                  aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-current" />
                  )}
                </button>

                {/* Volume & Mute */}
                <div className="flex items-center gap-2 group/vol">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1.5 text-white/90 hover:text-white transition cursor-pointer"
                    aria-label={isMuted ? 'Activar sonido' : 'Silenciar'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-5 h-5 sm:w-5 sm:h-5 text-zinc-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 className="w-5 h-5 sm:w-5 sm:h-5 text-white/90" />
                    ) : (
                      <Volume2 className="w-5 h-5 sm:w-5 sm:h-5 text-white/90" />
                    )}
                  </button>

                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-14 sm:w-20 h-1 bg-zinc-700/80 rounded-lg appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition"
                    aria-label="Volumen"
                  />
                </div>

                {/* Time Display */}
                <span
                  ref={timeDisplayRef}
                  className="font-sans text-xs text-zinc-300 font-medium tracking-tight select-none"
                >
                  0:00 / 0:15
                </span>
              </div>

              {/* Fullscreen */}
              <button
                type="button"
                onClick={toggleFullscreen}
                className="p-1.5 text-white/80 hover:text-white transition cursor-pointer"
                aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShowreelSection;
