import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { useLanguage, useContent } from '../i18n/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const { t, sx } = useLanguage();
  const { journeyItems, currentFocus } = useContent();

  const sectionRef = useRef(null);
  const lineTrackRef = useRef(null);
  const lineFillRef = useRef(null);
  const dotRef = useRef(null);

  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

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
    <section id="journey" ref={sectionRef} className="relative py-28 sm:py-36 bg-bg-deep border-t border-line overflow-x-clip">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label={t('sectionLabels.journey')} />

        <div className="mb-14">
          <Reveal>
            <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] leading-none uppercase text-white tracking-tight">
              {t('journey.titleLine1')}{' '}
              <span className="text-accent">{t('journey.titleLine2')}</span>
              <span className="text-accent ms-1">.</span>
            </h2>
          </Reveal>
        </div>

        {/* 2-Column Grid: Timeline on Start, Sticky "RIGHT NOW." Card on End */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Start Column: Timeline with scrubbed line */}
          <div ref={lineTrackRef} className="lg:col-span-7 relative ps-8 sm:ps-10">
            {/* Background line track */}
            <div className="absolute start-2 sm:start-3 top-3 bottom-4 w-[2px] bg-white/10" />

            {/* Scrubbed line fill (Gold) */}
            <div
              ref={lineFillRef}
              className="absolute start-2 sm:start-3 top-3 bottom-4 w-[2px] bg-accent origin-top will-change-transform"
              style={{ transform: 'scaleY(0)' }}
            />

            {/* Glowing tip dot (Gold) - perfectly centered in both LTR and RTL */}
            <div
              ref={dotRef}
              className="absolute start-[9px] sm:start-[13px] ltr:-translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.75)] z-10 will-change-[top]"
              style={{ top: '0%' }}
            />

            {/* Journey Items */}
            <div className="flex flex-col divide-y divide-line">
              {journeyItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -30 * sx }}
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

          {/* End Column: Sticky "RIGHT NOW." Card */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start flex flex-col pt-6 lg:pt-0">
            <div className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 flex flex-col shadow-[0_0_40px_rgba(212,175,55,0.03)]">
              {/* Card Header with pulsing gold dot */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.85)] flex-shrink-0" />
                <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase font-bold">
                  {t('journey.rightNow')}
                </span>
              </div>

              {/* 3 Short Rows: Label + Value */}
              <div className="flex flex-col divide-y divide-line/60">
                {currentFocus.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-0 last:pb-0 flex flex-col gap-1.5">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-muted uppercase">
                      {item.label}
                    </span>
                    <span className="font-sans text-sm sm:text-base font-semibold text-white">
                      <bdi>{item.value}</bdi>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
