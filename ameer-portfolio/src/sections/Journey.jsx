import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { journeyItems, milestones } from '../data/content';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const sectionRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);
  const dotRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

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
    <section id="journey" ref={sectionRef} className="relative py-28 sm:py-36 bg-bg-deep border-t border-line overflow-hidden">
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

        {/* 2-Column Grid: Timeline on Left, Sticky Milestones on Right */}
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

          {/* Right Column: Sticky Milestones */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 flex flex-col pt-6 lg:pt-0">
            <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white mb-6 leading-[0.95]">
              SMALL WINS.<br />
              <span className="text-accent">BIG MEANING</span>
              <span className="text-accent ml-1">.</span>
            </h3>

            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-4 block">
              KEY MILESTONES
            </span>

            <div className="flex flex-col divide-y divide-line rounded-2xl bg-surface border border-line p-6">
              {milestones.map((m, idx) => {
                const isHovered = hoveredMilestone === idx;
                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredMilestone(idx)}
                    onMouseLeave={() => setHoveredMilestone(null)}
                    className="py-4 first:pt-1 last:pb-1 flex items-center justify-between group cursor-default transition-transform duration-300"
                    style={{
                      transform: isHovered ? 'translateX(8px)' : 'translateX(0px)',
                    }}
                  >
                    <span className="font-sans text-xs sm:text-sm text-white/90 group-hover:text-white transition-colors">
                      {m.title}
                    </span>
                    <span className="font-mono text-xs text-accent tracking-wider font-semibold">
                      {m.year}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
