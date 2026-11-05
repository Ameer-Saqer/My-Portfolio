import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { journeyItems, journeyStats } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';

gsap.registerPlugin(ScrollTrigger);

function JourneyStatTile({ value, suffix, label, startCount }) {
  const count = useCountUp(value, 1.4, startCount);

  return (
    <div className="rounded-2xl border border-line bg-white/[0.02] p-4 sm:p-6 flex flex-col justify-center min-h-[120px] sm:min-h-[140px] hover:border-accent/40 transition-colors">
      <div className="font-display text-4xl sm:text-5xl lg:text-6xl text-accent tracking-tight leading-none flex items-baseline">
        <span>{count}</span>
        {suffix && <span>{suffix}</span>}
      </div>
      <span className="font-mono text-[10px] sm:text-xs tracking-wider text-muted uppercase leading-snug mt-3">
        {label}
      </span>
    </div>
  );
}

export default function Journey() {
  const sectionRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);
  const dotRef = useRef(null);
  const statsGridRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const statsInView = useInView(statsGridRef, { once: true, amount: 0.2 });

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (lineTrackRef.current && lineFillRef.current && dotRef.current) {
        ScrollTrigger.create({
          trigger: lineTrackRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            lineFillRef.current.style.transform = `scaleY(${p})`;
            dotRef.current.style.top = `${p * 100}%`;
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="relative py-28 sm:py-36 bg-bg-deep border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label="03 / THE JOURNEY" />

        <div className="mb-14">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none uppercase text-white tracking-tight">
              ALWAYS BUILDING. <span className="text-accent">ALWAYS LEARNING</span>
              <span className="text-accent ml-1">.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Grid: Timeline on Left, Sticky 2x2 Stats Grid on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Timeline with scrubbed line */}
          <div ref={lineTrackRef} className="lg:col-span-7 relative pl-8 sm:pl-10">
            {/* Background line track */}
            <div className="absolute left-2 sm:left-3 top-3 bottom-4 w-[2px] bg-white/10" />

            {/* Scrubbed line fill (Gold) */}
            <div
              ref={lineFillRef}
              className="absolute left-2 sm:left-3 top-3 bottom-4 w-[2px] bg-accent origin-top will-change-transform"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Glowing tip dot (Gold) */}
            <div
              ref={dotRef}
              className="absolute left-[9px] sm:left-[13px] -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.75)] z-10 will-change-[top]"
              style={{ top: '0%' }}
            />

            {/* Journey Items */}
            <div className="flex flex-col divide-y divide-line">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.2 + index * 0.12,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-8 first:pt-2 last:pb-2 flex flex-col gap-2"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs sm:text-sm text-accent tracking-widest uppercase font-semibold">
                      {item.period}
                    </span>
                  </div>

                  <h3 className="font-sans font-bold text-base sm:text-lg text-white uppercase tracking-tight">
                    {item.role}
                  </h3>

                  <span className="font-mono text-xs text-muted">
                    {item.subtitle}
                  </span>

                  <p className="font-sans text-xs sm:text-sm text-muted/80 leading-relaxed mt-1 max-w-xl">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Sticky 2x2 Stats Grid (Desktop sticky, mobile 2x2 after timeline) */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 self-start flex flex-col pt-6 lg:pt-0">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-8 leading-[0.95]">
              SMALL WINS.<br />
              <span className="text-accent">BIG MEANING</span>
              <span className="text-accent ml-1">.</span>
            </h3>

            <div ref={statsGridRef} className="grid grid-cols-2 gap-4 sm:gap-5">
              {journeyStats.map((stat, idx) => (
                <JourneyStatTile
                  key={idx}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                  startCount={statsInView}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
