# 🏎️ PORTAFOLIO CREATIVO // INSPIRACIÓN LANDO NORRIS (LN4)

Portafolio de diseño de producto y desarrollo frontend de alta velocidad inspirado en la estética brutalista, cinemática y de alto rendimiento de **[landonorris.com](https://landonorris.com)**.

---

## ⚡ Características Principales

1. **Estética Motorsport & Streetwear Brutalist**:
   - Tipografía sobredimensionada (`Syne 900`, `Space Grotesk`, `JetBrains Mono`).
   - Acento signature verde neón / volt (`#D2F532`) sobre fondos mate obsidian (`#08080A`).
   - Cortes angulares aerodinámicos (chamfer racing corners) y patrones de cuadrícula técnica.

2. **Núcleo 3D Interactivo (Three.js WebGL)**:
   - Escultura geométrica cyber/aero con rotación interactiva por mouse o arrastre 360°.
   - Anillos de telemetría orbitales, núcleo pulsante y partículas flotantes.
   - Contador de FPS en tiempo real y fallback de alto rendimiento.

3. **Audio F1 Telemetry con Web Audio API**:
   - Efectos de sonido procedurales futuristas (clicks, hovers, beeps, quiéns de éxito) sin archivos de audio externos pesados.
   - Botón de alternancia rápida (Mute / Unmute) en la barra de navegación superior.

4. **Intro Preloader Cinemático ("LOAD TELEMETRY")**:
   - Contador de porcentaje de 0% a 100% con líneas de diagnóstico de arranque y transición de persiana.

5. **Design Lab & Playground de Tokens**:
   - Selector interactivo de temas cromáticos en vivo (`Volt Neon`, `Cyan Aero`, `Papaya Racing`, `Pure Mono`).
   - Inspector de jerarquía tipográfica y escala de tokens.
   - Playground de componentes (botones, sliders táctiles, tabs segmentados).
   - Diagrama del pipeline **Figma ➔ Tokens ➔ React/Tailwind ➔ GPU**.

6. **Race Archive (Proyectos Seleccionados)**:
   - Tarjetas de proyectos con métricas de rendimiento, tags de diseño y enlaces a Figma, GitHub y Demo.
   - Modal de inspección detallada con decisiones de diseño UI/UX y telemetría clave.

7. **Tech & Craft Arsenal (Especificaciones Técnicas)**:
   - Dividido en 3 sectores: *Product & UI/UX Design*, *Creative Frontend & Code*, *3D, Tools & Engineering*.

8. **Pit Stop & Contacto Instantáneo**:
   - Botón de copiado de correo con 1-click y lluvia de confeti neón.
   - Reloj local en tiempo real con telemetría de estado activo.
   - Formulario de transmisión interactivo.

---

## 🛠️ Cómo personalizar con tus datos

Todo el contenido del portafolio está centralizado en un solo archivo fácil de editar:

📁 **`src/utils/portfolioData.ts`**

En ese archivo puedes cambiar:
- Tu nombre, título, bio y callsign.
- Tus enlaces de **Figma, GitHub, LinkedIn, Twitter/X y correo**.
- Tus proyectos reales (imágenes, descripciones, tags y métricas).
- Tus habilidades y herramientas de diseño.
- Tu historial de experiencia y citas.

---

## 🚀 Comandos

```bash
# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción (carpeta /dist)
npm run build

# Previsualizar build de producción
npm run preview
```
