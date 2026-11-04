import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Preloader } from './components/Preloader';
import { Hero } from './components/Hero';
import { WaveGridSection } from './components/WaveGridSection';
import { MarqueeTicker } from './components/MarqueeTicker';
import { PerspectiveScroll } from './components/PerspectiveScroll';
import { TelemetryStats } from './components/TelemetryStats';
import { Projects } from './components/Projects';
import { SkillsCarousel } from './components/SkillsCarousel';
import { PodiumTimeline } from './components/PodiumTimeline';
import { ShowreelSection } from './components/ShowreelSection';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative min-h-screen bg-dark-bg text-white selection:bg-neon selection:text-black">
      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Intro Preloader screen */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* Dynamic Top Navigation Bar */}
      <Navbar />

      <main>
        {/* Integrated Hero: Typography + 3D WebGL Core */}
        <Hero />

        {/* Interactive 3D Wave Grid Field */}
        <WaveGridSection />

        {/* Tech ribbon ticker */}
        <MarqueeTicker />

        {/* 3D Perspective Text Scroll Manifesto */}
        <PerspectiveScroll />

        {/* Academic & Performance Highlights */}
        <TelemetryStats />

        {/* Selected Projects */}
        <Projects />

        {/* Dynamic Accordion Skills Deck */}
        <SkillsCarousel />

        {/* Academic & Professional Journey */}
        <PodiumTimeline />

        {/* 15s Motion Graphics Showreel (Classic Player, 75% Window Width) */}
        <ShowreelSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
