export interface Project {
  id: string;
  number: string;
  title: string;
  tagline: string;
  category: string;
  discipline: 'FULL STACK & MOBILE' | 'FRONTEND & UI/UX' | 'SISTEMAS & BACKEND';
  description: string;
  features: string[];
  tags: string[];
  metrics: { label: string; value: string }[];
  image: string;
  demoGif?: string;
  staticPreview?: string;
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  level: string;
  highlight?: boolean;
  tagline: string;
  description: string;
  tools: string[];
  iconType: 'react' | 'tailwind' | 'component' | 'html' | 'three' | 'flutter' | 'supabase' | 'node' | 'python' | 'ai' | 'security' | 'git';
}

export interface SkillCategory {
  title: string;
  code: string;
  subtitle: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  period: string;
  role: string;
  discipline: string;
  institution: string;
  location: string;
  summary: string;
  highlights: string[];
}

export const PORTFOLIO_DATA = {
  driver: {
    firstName: "EDUARDO",
    lastName: "CONTRERAS",
    tag: "EJCB",
    title: "SOFTWARE DEVELOPER & FULL STACK",
    tagline: "SOFTWARE DEVELOPER // FRONTEND & FULL STACK",
    subheading: "TSU en Informática y estudiante del último año de Ingeniería en Informática (UPTAIET). Diseño y desarrollo aplicaciones web y móviles de alto rendimiento con React, Flutter, Node.js y Supabase, priorizando código limpio, diseño UI/UX y arquitecturas escalables.",
    location: "Colón, Táchira (Remoto)",
    email: "ejcb2006@gmail.com",
    github: "https://github.com/ejcb11",
    linkedin: "https://www.linkedin.com/in/eduardo-contreras-dev/",
    englishLevel: "Nivel B1 (Intermedio)",
  },

  telemetry: [
    { label: "FORMACIÓN UNIVERSITARIA", value: "TSU + ING", unit: "UPTAIET", detail: "Título de TSU en Informática y último año de Ingeniería" },
    { label: "RENDIMIENTO & PERFORMANCE", value: "100/100", unit: "LIGHTHOUSE", detail: "Arquitecturas optimizadas, carga instantánea y cero bloatware" },
    { label: "ECOSISTEMAS COMPLETOS", value: "WEB + APP", unit: "REACT / FLUTTER", detail: "Desarrollo integral de clientes web, aplicaciones móviles y APIs" },
    { label: "CERTIFICACIONES INTERNACIONALES", value: "ANTHROPIC", unit: "IBM / SANTANDER", detail: "Certificaciones oficiales en IA, Ciberseguridad y Python" },
  ],

  engineeringPillars: [
    {
      code: "PILAR 01",
      title: "INTERFACES WEB & COMPONENTES MODULARES",
      description: "Construcción de bibliotecas desacopladas en React 19 y Tailwind CSS: modales, tablas dinámicas, filtros y carruseles con arquitectura limpia y responsive.",
      metric: "REACT 19 + TAILWIND"
    },
    {
      code: "PILAR 02",
      title: "DESARROLLO MÓVIL MULTIPLATAFORMA",
      description: "Creación de aplicaciones para iOS y Android con Flutter y Dart: escaneo de carnets digitales QR, seguimiento de progreso y consumo de APIs en tiempo real.",
      metric: "FLUTTER & DART"
    },
    {
      code: "PILAR 03",
      title: "PERSISTENCIA & BASES DE DATOS RELACIONALES",
      description: "Diseño e integración de esquemas relacionales optimizados en PostgreSQL (Supabase) y SQLite, con políticas de seguridad RLS y APIs REST en Node.js y Python.",
      metric: "POSTGRESQL & SQLITE"
    },
    {
      code: "PILAR 04",
      title: "CIBERSEGURIDAD & DESARROLLO CON IA",
      description: "Certificado en AI Fluency por Anthropic y Ciberseguridad por IBM/Santander. Aplicación de buenas prácticas de código seguro y optimización asistida por IA.",
      metric: "ANTHROPIC & IBM"
    }
  ],

  projects: [
    {
      id: "fitgym-ecosystem",
      number: "01",
      title: "FITGYM",
      tagline: "Ecosistema Integral: App Móvil, Recepción & Web",
      category: "MOBILE & CLOUD",
      discipline: "FULL STACK & MOBILE",
      description: "Ecosistema integral para centro deportivo. Aplicación móvil en Flutter para socios y entrenadores con carnet digital QR, rutinas semanales, catálogo de suplementos y panel administrativo de recepción conectado a Supabase.",
      features: [
        "Carnet digital interactivo con código QR para control de acceso y membresías.",
        "Módulo de rutinas y ejercicios con seguimiento semanal y catálogo de productos.",
        "Sincronización en tiempo real entre la recepción web y la app móvil vía PostgreSQL en Supabase."
      ],
      tags: ["Flutter", "Dart", "Supabase", "PostgreSQL", "JavaScript", "Realtime"],
      metrics: [
        { label: "PLATAFORMAS", value: "APP + WEB" },
        { label: "DB SYNC", value: "TIEMPO REAL" },
        { label: "ACCESO", value: "QR SCAN" }
      ],
      image: "/projects/ferreira_demo.gif",
      demoGif: "/projects/ferreira_demo.gif",
      staticPreview: "/projects/ferreira_hero.png",
      featured: true
    },
    {
      id: "gearstore-ecommerce",
      number: "02",
      title: "GEARSTORE HARDWARE",
      tagline: "E-Commerce de Periféricos & UI Component Library",
      category: "FRONTEND & UI/UX",
      discipline: "FRONTEND & UI/UX",
      description: "Tienda web especializada en hardware y periféricos para entusiastas del gaming y desarrollo. Construida desde cero sobre una arquitectura modular de componentes UI reutilizables (filtros dinámicos, modales, tablas y carruseles).",
      features: [
        "Librería personalizada de componentes UI desacoplados para alta mantenibilidad.",
        "Filtros avanzados por categoría, marcas, especificaciones técnicas y rangos de precio.",
        "Diseño ultra responsive adaptado a cualquier resolución con rendimiento Lighthouse 100."
      ],
      tags: ["React 19", "Vite", "React Router", "CSS3 Moderno", "Component Architecture"],
      metrics: [
        { label: "FRAMEWORK", value: "REACT 19" },
        { label: "BUNDLER", value: "VITE 8" },
        { label: "PERFORMANCE", value: "100/100" }
      ],
      image: "/projects/gearstore_demo.gif",
      demoGif: "/projects/gearstore_demo.gif",
      staticPreview: "/projects/gearstore_hero.png",
      featured: true
    },
    {
      id: "vidaclinic-medical",
      number: "03",
      title: "VIDACLINIC MEDICAL",
      tagline: "Suite Integral de Gestión Médica & Dividendos",
      category: "SISTEMAS & BACKEND",
      discipline: "SISTEMAS & BACKEND",
      description: "Sistema integral de consulta médica y administración hospitalaria. Gestiona expedientes clínicos, liquidación contable de dividendos para especialistas, portal de autoservicio de pacientes, reportes PDF/Excel y sincronización con la API oficial del BCV.",
      features: [
        "Módulo de liquidación contable automatizada de dividendos por consulta médica.",
        "Generación automática de informes clínicos y contables en formatos PDF y Excel.",
        "Sincronización en vivo con la tasa cambiaria oficial mediante la API del Banco Central de Venezuela."
      ],
      tags: ["Python", "Flask", "SQLite3", "ReportLab", "OpenPyXL", "BCV API"],
      metrics: [
        { label: "REPORTES", value: "PDF & EXCEL" },
        { label: "INTEGRACIÓN", value: "API BCV" },
        { label: "CONTABILIDAD", value: "DIVIDENDOS" }
      ],
      image: "/projects/vidaclinic_demo.gif",
      demoGif: "/projects/vidaclinic_demo.gif",
      staticPreview: "/projects/vidaclinic_dashboard.png",
      featured: true
    },
    {
      id: "clinimant-biomedical",
      number: "04",
      title: "CLINIMANT SISTEMAS",
      tagline: "Gestión Hospitalaria de Mantenimiento & Inventario",
      category: "SISTEMAS & BACKEND",
      discipline: "SISTEMAS & BACKEND",
      description: "Plataforma web para la gestión integral de mantenimiento de equipos biomédicos hospitalarios. Permite control de inventario de repuestos, directorio de técnicos especializados, proveedores y órdenes de servicio técnico.",
      features: [
        "API REST desarrollada con Node.js y Express con autenticación robusta y control de sesiones.",
        "Base de datos relacional SQLite con consultas normalizadas para auditoría de equipos críticos.",
        "Módulo de asignación de órdenes de servicio con estados en vivo y trazabilidad completa."
      ],
      tags: ["Node.js", "Express", "SQLite", "JavaScript", "REST API", "Auth Sessions"],
      metrics: [
        { label: "ARQUITECTURA", value: "REST API" },
        { label: "BASE DATOS", value: "SQLITE3" },
        { label: "SEGURIDAD", value: "AUTH SESSIONS" }
      ],
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=1200&auto=format&fit=crop",
      staticPreview: "/projects/clinimant_logo.jpg",
      featured: false
    }
  ] as Project[],

  arsenal: [
    {
      title: "FRONTEND & UI/UX",
      code: "01",
      subtitle: "INTERFACES & COMPONENTES",
      description: "Desarrollo de interfaces visuales modernas, librerías modulares y experiencias interactivas optimizadas.",
      skills: [
        { 
          name: "React 19 & JavaScript (ES6+)", 
          level: "96%", 
          highlight: true, 
          tagline: "Desarrollo Modular & Estado",
          description: "Desarrollo con React 19, Vite, React Router, Hooks personalizados y arquitectura de componentes desacoplados.",
          tools: ["React 19", "JavaScript ES6+", "Vite", "React Router", "Custom Hooks"],
          iconType: "react"
        },
        { 
          name: "Tailwind CSS & CSS3 Moderno", 
          level: "98%", 
          highlight: true, 
          tagline: "Diseño & Micro-Animaciones",
          description: "Maquetación responsive avanzada, Flexbox, CSS Grid, variables dinámicas y animaciones fluidas.",
          tools: ["Tailwind CSS", "CSS Grid", "Flexbox", "Responsive Design", "Custom Themes"],
          iconType: "tailwind"
        },
        { 
          name: "Librerías de Componentes UI", 
          level: "95%", 
          highlight: true, 
          tagline: "Sistemas Reutilizables",
          description: "Diseño e implementación de modales interactivos, tablas dinámicas, filtros en tiempo real y carruseles.",
          tools: ["UI Components", "Modales", "Data Tables", "Filtros Dinámicos", "Carruseles"],
          iconType: "component"
        },
        { 
          name: "HTML5 Semántico & Accesibilidad", 
          level: "99%", 
          highlight: false, 
          tagline: "SEO Técnico & Core Web Vitals",
          description: "Estructuras accesibles (WCAG 2.1), semántica web limpia, optimización SEO y 100/100 en Lighthouse.",
          tools: ["HTML5", "A11y", "Core Web Vitals", "Lighthouse 100", "Semantic Markup"],
          iconType: "html"
        },
        { 
          name: "Three.js & Gráficos WebGL", 
          level: "85%", 
          highlight: false, 
          tagline: "3D & Aceleración GPU",
          description: "Objetos 3D interactivos en canvas, iluminación PBR, materiales reflectantes y aceleración gráfica por hardware.",
          tools: ["Three.js", "WebGL", "Canvas API", "Shaders PBR", "GPU Performance"],
          iconType: "three"
        }
      ]
    },
    {
      title: "MOBILE & BACKEND",
      code: "02",
      subtitle: "ARQUITECTURA & DATOS",
      description: "Aplicaciones móviles nativas con Flutter, servicios en la nube y persistencia de datos relacionales.",
      skills: [
        { 
          name: "Flutter & Dart (Mobile)", 
          level: "94%", 
          highlight: true, 
          tagline: "Apps Multiplataforma iOS & Android",
          description: "Desarrollo de aplicaciones móviles completas: integración con hardware, lectores QR, estado reactivo y consumo de APIs.",
          tools: ["Flutter", "Dart", "Lector QR", "State Management", "Cross-Platform"],
          iconType: "flutter"
        },
        { 
          name: "PostgreSQL & Supabase", 
          level: "92%", 
          highlight: true, 
          tagline: "Bases de Datos & Realtime",
          description: "Bases de datos en la nube, sincronización en tiempo real vía WebSockets, autenticación y políticas de seguridad RLS.",
          tools: ["PostgreSQL", "Supabase", "Row Level Security", "WebSockets Realtime", "SQL"],
          iconType: "supabase"
        },
        { 
          name: "Node.js & Express REST APIs", 
          level: "90%", 
          highlight: true, 
          tagline: "Servidores Asíncronos & Sesiones",
          description: "Servidores asíncronos, arquitectura de endpoints RESTful, middleware de autenticación y control de sesiones.",
          tools: ["Node.js", "Express", "REST APIs", "JWT", "Session Control"],
          iconType: "node"
        },
        { 
          name: "Python, Flask & SQLite3", 
          level: "88%", 
          highlight: false, 
          tagline: "Lógica de Negocio & Reportes",
          description: "Microservicios con Flask, automatización de procesos, generación de reportes en PDF/Excel y bases SQLite.",
          tools: ["Python", "Flask", "SQLite3", "ReportLab", "OpenPyXL"],
          iconType: "python"
        }
      ]
    }
  ] as SkillCategory[],

  podiumHistory: [
    {
      period: "2024 — PRESENTE",
      role: "INGENIERÍA EN INFORMÁTICA & DESARROLLO FULL STACK",
      discipline: "WEB, MOBILE & GESTIÓN DE DATOS",
      institution: "UPTAIET & PROYECTOS INDEPENDIENTES",
      location: "Colón, Táchira (Remoto)",
      summary: "Cursando el último trayecto de Ingeniería en Informática. Desarrollo y puesta en producción de ecosistemas completos: FitGYM (App en Flutter + Web en Supabase), Clinimant y VidaClinic.",
      highlights: [
        "Desarrollo de la app móvil y recepción web FitGYM con carnet digital QR y sincronización en tiempo real vía Supabase.",
        "Certificación oficial de Anthropic en AI Fluency: Framework & Foundations (2026).",
        "Construcción y despliegue de soluciones con bases de datos relacionales en la nube."
      ]
    },
    {
      period: "2023 — 2024",
      role: "TÉCNICO SUPERIOR UNIVERSITARIO (TSU) EN INFORMÁTICA",
      discipline: "INGENIERÍA DE SOFTWARE & BASES DE DATOS",
      institution: "UPTAIET SEDE COLÓN",
      location: "Táchira, Venezuela",
      summary: "Obtención del título universitario de TSU en Informática con honores. Desarrollo de plataformas de mantenimiento como Clinimant y desarrollo de la tienda GearStore con arquitectura de componentes propios en React.",
      highlights: [
        "Obtención del título de Técnico Superior Universitario (TSU) en Informática.",
        "Diseño e implementación del sistema Clinimant para gestión de equipos biomédicos con Node.js, Express y SQLite.",
        "Construcción de GearStore utilizando una biblioteca propia de componentes interactivos en React."
      ]
    },
    {
      period: "2024 — 2026",
      role: "CERTIFICACIONES INTERNACIONALES EN IA, PYTHON & SEGURIDAD",
      discipline: "ESPECIALIZACIÓN TÉCNICA",
      institution: "ANTHROPIC · IBM · SANTANDER OPEN ACADEMY",
      location: "Certificaciones Remotas",
      summary: "Ampliación continua de competencias profesionales mediante programas internacionales de alta exigencia técnica.",
      highlights: [
        "AI Fluency: Framework & Foundations — Anthropic (2026).",
        "Fundamentos de Ciberseguridad — IBM / Santander Open Academy (2026).",
        "Cursor con Python: Desarrollo Inteligente con IA — Santander Open Academy (2026)."
      ]
    }
  ] as ExperienceItem[],

  quotes: [
    {
      quote: "EL SOFTWARE DE ALTO RENDIMIENTO NACE DE COMBINAR CÓDIGO LIMPIO, EXPERIENCIA DE USUARIO FLUIDA Y PERSISTENCIA DE DATOS ROBUSTA EN TIEMPO REAL.",
      author: "EDUARDO CONTRERAS // SOFTWARE DEVELOPER"
    }
  ]
};
