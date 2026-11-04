import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

export interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

export interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
}

export const StickyCard002 = ({
  cards,
  className,
  containerClassName,
}: StickyCard002Props) => {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cardElements = cardRefs.current.filter(Boolean) as HTMLDivElement[];
      const totalCards = cardElements.length;

      if (totalCards === 0) return;

      gsap.set(cardElements[0], { y: '0%', scale: 1, rotation: 0, opacity: 1 });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cardElements[i], { y: '100%', scale: 1, rotation: 0, opacity: 1 });
      }

      const stickyContainer = container.current?.querySelector('.sticky-cards');
      if (!stickyContainer) return;

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: stickyContainer,
          start: 'top top',
          end: `+=${window.innerHeight * (totalCards - 1) * 0.95}`,
          pin: true,
          scrub: 0.6,
          pinSpacing: true,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.9,
            rotation: (i % 2 === 0 ? 2 : -2),
            opacity: 0.45,
            duration: 1,
            ease: 'power1.inOut',
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: '0%',
            duration: 1,
            ease: 'power1.inOut',
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <div className={cn('relative w-full', className)} ref={container}>
      <div className="sticky-cards relative flex h-screen w-full items-center justify-center overflow-hidden p-2 sm:p-4 md:p-6 lg:p-8">
        <div
          className={cn(
            'relative h-[88vh] sm:h-[92vh] w-full max-w-[98vw] 2xl:max-w-[1600px] overflow-hidden rounded-2xl sm:rounded-3xl border border-dark-border/80 shadow-[0_30px_90px_rgba(0,0,0,0.95)] bg-dark-card',
            containerClassName
          )}
        >
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-dark-border/60 will-change-transform bg-dark-surface"
            >
              <img
                src={card.image}
                alt={card.alt || ''}
                className="h-full w-full object-cover"
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StickyCard002;
