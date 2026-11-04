import React from 'react';
import { StickyCard002, type CardData } from './ui/sticky-cards';

const MOODBOARD_CARDS: CardData[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
    alt: 'Obsidian Fluid 3D Surface',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1600&auto=format&fit=crop',
    alt: 'Cybernetic Neon Architecture',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1600&auto=format&fit=crop',
    alt: 'Parametric Monolith & Metallic Forms',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
    alt: 'Retro-Futuristic Tech Hardware',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1600&auto=format&fit=crop',
    alt: 'Aerodynamics & Noir Visions',
  },
];

export const DesignGallery: React.FC = () => {
  return (
    <section id="gallery" className="relative bg-dark-bg border-b border-dark-border select-none">
      {/* SECTION HEADER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dark-border/80 pb-6">
          <div>
            <h2 className="font-syne font-black text-3xl sm:text-4xl md:text-5xl text-white tracking-tight uppercase">
              DIRECCIÓN DE ARTE & MOODBOARD
            </h2>
          </div>
          <p className="font-space text-zinc-400 max-w-md text-sm leading-relaxed">
            Exploración estética, contrastes oscuros y composiciones tridimensionales que inspiran el diseño de mis interfaces y experiencias frontend.
          </p>
        </div>
      </div>

      {/* FULL-SPACE GSAP PINNED STACKING CARDS */}
      <StickyCard002 cards={MOODBOARD_CARDS} />
    </section>
  );
};

export default DesignGallery;
