import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Html5Icon,
  Css3Icon,
  JsIcon,
  ReactIcon,
  TailwindIcon,
  BootstrapIcon,
  GitIcon,
  GithubIcon,
  FigmaIcon,
} from '../components/TechIcons';
import { toolsList } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

// Neutral dot fallback for any unknown tool names
function NeutralDot({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-2.5 h-2.5 rounded-full bg-accent/60 ${className}`}
    />
  );
}

const ICON_MAP = {
  HTML5: Html5Icon,
  CSS3: Css3Icon,
  JavaScript: JsIcon,
  React: ReactIcon,
  'Tailwind CSS': TailwindIcon,
  Bootstrap: BootstrapIcon,
  Git: GitIcon,
  GitHub: GithubIcon,
  Figma: FigmaIcon,
};

const TECH_ITEMS = toolsList.map((name) => ({
  name,
  icon: ICON_MAP[name] || NeutralDot,
}));

export default function TechStrip() {
  const { t, sx } = useLanguage();
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

    const onMouseEnter = () => {
      isPaused = true;
    };
    const onMouseLeave = () => {
      isPaused = false;
    };

    const el = containerRef.current;
    if (el) {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    }

    const animate = () => {
      if (!isPaused && marquee) {
        // Mirrored velocity in RTL: moves right-to-left in LTR, left-to-right in RTL
        const speed = 0.8 * marqueeVelocity * direction * sx;
        currentX -= speed;

        const totalWidth = marquee.scrollWidth / 3;
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
  }, [sx]);

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative w-full py-5 sm:py-6 bg-bg overflow-hidden select-none"
    >
      {/* Top 1px gold line at 18% opacity with centered brighter gold segment */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 w-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-[1px] bg-[rgba(212,175,55,0.18)]" />
        <div className="absolute w-24 sm:w-36 h-[1.5px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.65)]" />
        <div className="absolute w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
      </div>

      {/* Start/end edge fade masks */}
      <div className="pointer-events-none absolute top-0 bottom-0 start-0 w-20 sm:w-36 z-10 ltr:bg-gradient-to-r rtl:bg-gradient-to-l from-bg to-transparent" />
      <div className="pointer-events-none absolute top-0 bottom-0 end-0 w-20 sm:w-36 z-10 ltr:bg-gradient-to-l rtl:bg-gradient-to-r from-bg to-transparent" />

      <div className="flex items-center">
        {/* Start editorial label */}
        <div className="hidden lg:flex items-center gap-3 px-8 border-e border-[rgba(212,175,55,0.18)] flex-shrink-0 z-20 bg-bg">
          <span className="font-mono text-xs font-bold tracking-[0.25em] text-white uppercase whitespace-nowrap">
            {t('techStrip.label')}
          </span>
        </div>

        {/* Marquee Container */}
        <div className="overflow-hidden flex-1 relative flex">
          <div
            ref={marqueeRef}
            className="flex items-center gap-12 whitespace-nowrap will-change-transform"
          >
            {[...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="group flex items-center gap-3 px-4 py-2 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white transition-all duration-300 group-hover:scale-110 group-hover:text-accent" />
                  <span className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-white uppercase group-hover:text-accent transition-colors" dir="ltr">
                    <bdi>{item.name}</bdi>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom 1px gold line at 18% opacity with centered brighter gold segment */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 inset-x-0 w-full flex items-center justify-center pointer-events-none"
      >
        <div className="w-full h-[1px] bg-[rgba(212,175,55,0.18)]" />
        <div className="absolute w-24 sm:w-36 h-[1.5px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.65)]" />
        <div className="absolute w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
      </div>
    </section>
  );
}
