import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Html5Icon,
  Css3Icon,
  JsIcon,
  ReactIcon,
  TailwindIcon,
  BootstrapIcon,
  GitIcon,
  GithubIcon,
  ViteIcon,
  FramerIcon,
  FigmaIcon,
  NpmIcon,
} from '../components/TechIcons';

gsap.registerPlugin(ScrollTrigger);

const TECH_ITEMS = [
  { name: 'HTML5', icon: Html5Icon },
  { name: 'CSS3', icon: Css3Icon },
  { name: 'JavaScript', icon: JsIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Tailwind CSS', icon: TailwindIcon },
  { name: 'Bootstrap', icon: BootstrapIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'GitHub', icon: GithubIcon },
  { name: 'Vite', icon: ViteIcon },
  { name: 'Framer Motion', icon: FramerIcon },
  { name: 'Figma', icon: FigmaIcon },
  { name: 'npm', icon: NpmIcon },
];

export default function TechStrip() {
  const containerRef = useRef(null);
  const marqueeRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let marqueeVelocity = 1;
    let direction = 1;
    let currentX = 0;

    const marquee = marqueeRef.current;
    if (!marquee) return;

    // Track scroll velocity & direction using ScrollTrigger
    const st = ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction === -1 ? -1 : 1;
        const vel = Math.min(Math.abs(self.getVelocity() / 300), 4);
        marqueeVelocity = 1 + vel;
      },
    });

    let animationFrameId;
    let isPaused = false;

    const onMouseEnter = () => { isPaused = true; };
    const onMouseLeave = () => { isPaused = false; };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    }

    const animate = () => {
      if (!isPaused && marquee) {
        const speed = 0.8 * marqueeVelocity * direction;
        currentX -= speed;

        const totalWidth = marquee.scrollWidth / 2;
        if (currentX <= -totalWidth) {
          currentX = 0;
        } else if (currentX >= 0) {
          currentX = -totalWidth;
        }

        marquee.style.transform = `translate3d(${currentX}px, 0, 0)`;
        marqueeVelocity = gsap.utils.interpolate(marqueeVelocity, 1, 0.05);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (el) {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      }
      st.kill();
    };
  }, []);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative w-full py-8 bg-surface-2 border-y border-line overflow-hidden select-none"
    >
      {/* Left/right edge fade masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-24 sm:w-40 z-10 bg-gradient-to-r from-surface-2 to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-24 sm:w-40 z-10 bg-gradient-to-l from-surface-2 to-transparent" />

      <div className="flex items-center">
        {/* Left tiny label */}
        <div className="hidden lg:flex items-center gap-3 px-8 border-r border-line flex-shrink-0 z-20 bg-surface-2">
          <span className="font-mono text-[10px] font-bold tracking-[0.25em] text-white uppercase whitespace-nowrap">
            THE TOOLS BEHIND THE WORK.
          </span>
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden flex-1 relative flex">
          <div
            ref={marqueeRef}
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
          >
            {[...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 px-4 py-2 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-accent" />
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white uppercase group-hover:text-accent transition-colors">
                    {item.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
