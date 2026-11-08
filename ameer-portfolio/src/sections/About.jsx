import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import {
  profile,
  educationItems,
  creativeToolkitPills,
  processSteps,
} from '../data/content';
import {
  Html5Icon,
  Css3Icon,
  JsIcon,
  ReactIcon,
  TailwindIcon,
  GithubIcon,
} from '../components/TechIcons';

gsap.registerPlugin(ScrollTrigger);

const TILES = [
  { name: 'HTML5', icon: Html5Icon },
  { name: 'CSS3', icon: Css3Icon },
  { name: 'JavaScript', icon: JsIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Tailwind CSS', icon: TailwindIcon },
  { name: 'GitHub', icon: GithubIcon },
];

export default function About() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const timelineLineRef = useRef(null);
  const quoteCardRef = useRef(null);
  const paragraphRef = useRef(null);
  const wordsRef = useRef([]);
  const [activeStep, setActiveStep] = useState(0);

  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      if (wordsRef.current) {
        wordsRef.current.forEach((w) => {
          if (w) {
            w.style.color = '#ffffff';
            w.style.opacity = '1';
          }
        });
      }
      return;
    }

    const ctx = gsap.context(() => {
      // Scroll-scrubbed word-by-word color reveal in the about paragraph (ends fully opaque #ffffff)
      if (paragraphRef.current && wordsRef.current.length > 0) {
        gsap.fromTo(
          wordsRef.current,
          { color: '#8892B0', opacity: 0.85 },
          {
            color: '#ffffff',
            opacity: 1,
            stagger: 0.08,
            ease: 'none',
            scrollTrigger: {
              trigger: paragraphRef.current,
              start: 'top 85%',
              end: 'bottom 55%',
              scrub: 0.5,
            },
          }
        );
      }
      // Timeline scrubbed line fill
      if (timelineRef.current && timelineLineRef.current) {
        ScrollTrigger.create({
          trigger: timelineRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.5,
          onUpdate: (self) => {
            const p = self.progress;
            if (timelineLineRef.current) {
              timelineLineRef.current.style.transform = `scaleY(${p})`;
            }
            // Step index activation
            const stepIndex = Math.min(
              processSteps.length - 1,
              Math.floor(p * processSteps.length)
            );
            setActiveStep(stepIndex);
          },
        });
      }

      // Parallax float on the Quote Card
      if (quoteCardRef.current) {
        gsap.to(quoteCardRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: quoteCardRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="relative py-28 sm:py-36 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label="02 / BEHIND THE CODE" />

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16 pb-8 border-b border-line items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <h2 className="font-display heading-display text-[clamp(2.6rem,7vw,6.2rem)] uppercase text-white tracking-tight">
                NOT JUST CODE.<br />
                <span className="text-accent">A WAY OF BUILDING</span>
                <span className="text-accent ml-1">.</span>
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-4" ref={paragraphRef}>
            <p className="font-sans text-xs sm:text-sm leading-relaxed">
              {profile.about.split(' ').map((word, i) => (
                <span
                  key={i}
                  ref={(el) => (wordsRef.current[i] = el)}
                  className="inline-block mr-1 transition-colors"
                  style={{ color: '#8892B0', opacity: 0.85 }}
                >
                  {word}
                </span>
              ))}
            </p>
          </div>
        </div>

        {/* 3-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-start">
          {/* Column 1: Education & Skills (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
            {/* Education Sub-section */}
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-4 block">
                EDUCATION
              </span>
              <div className="flex flex-col divide-y divide-line">
                {educationItems.map((item, i) => (
                  <div key={i} className="py-3 flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-sans text-sm font-semibold text-white">
                        {item.title}
                      </h4>
                      <p className="font-mono text-xs text-muted mt-0.5">
                        {item.sub}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-accent font-semibold whitespace-nowrap pt-1">
                      {item.year}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Creative Toolkit Pills */}
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-4 block">
                CREATIVE TOOLKIT
              </span>
              <div className="flex flex-wrap gap-2">
                {creativeToolkitPills.map((pill, idx) => (
                  <motion.span
                    key={pill}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.1 + idx * 0.04, duration: 0.4 }}
                    className="px-3.5 py-1.5 rounded-full border border-line bg-surface/50 font-mono text-xs tracking-wider text-white uppercase transition-colors duration-200 hover:bg-accent hover:text-[#0F1B2E] hover:border-accent cursor-default select-none"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Software Tiles (6 items) */}
            <div>
              <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-4 block">
                CORE TECH TILES
              </span>
              <div className="grid grid-cols-6 gap-3">
                {TILES.map((t) => {
                  const Icon = t.icon;
                  return (
                    <div
                      key={t.name}
                      title={t.name}
                      className="w-12 h-12 rounded-xl bg-surface border border-line flex items-center justify-center text-white/80 hover:text-accent hover:border-accent transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                    >
                      <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Process Timeline (lg:col-span-4) */}
          <div ref={timelineRef} className="lg:col-span-4 flex flex-col relative px-2 sm:px-4">
            <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-6 block">
              FROM IDEA TO FINAL PIXEL
            </span>

            <div className="relative pl-8 flex flex-col gap-8">
              {/* Background Line Track */}
              <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-white/10" />

              {/* Scrubbed Gold Fill Line */}
              <div
                ref={timelineLineRef}
                className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-accent origin-top will-change-transform"
                style={{ transform: 'scaleY(0)' }}
              />

              {/* Steps */}
              {processSteps.map((step, idx) => {
                const isPassed = activeStep >= idx;
                return (
                  <div key={step.index} className="relative flex flex-col group">
                    {/* Node Dot */}
                    <div
                      className={`absolute -left-[27px] top-1 w-[12px] h-[12px] rounded-full border-2 transition-all duration-300 z-10 ${
                        isPassed
                          ? 'border-accent bg-accent shadow-[0_0_10px_rgba(212,175,55,0.7)]'
                          : 'border-line bg-bg'
                      }`}
                    />

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-mono text-xs text-accent font-bold">{step.index} ·</span>
                      <h4 className="font-sans font-bold text-sm uppercase text-white tracking-wide">
                        {step.title}
                      </h4>
                    </div>

                    <p className="font-sans text-xs text-muted leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Column 3: The Quote Card (lg:col-span-4) — Solid Gold with Navy Text & Serif Font */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div
              ref={quoteCardRef}
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-[340px] rounded-2xl bg-accent text-[#0F1B2E] p-8 sm:p-10 shadow-2xl shadow-accent/20 flex flex-col justify-between min-h-[440px] select-none border border-[#0F1B2E]/15"
            >
              {/* Top Quote Mark & Serif Body */}
              <div>
                <span className="font-serif text-7xl leading-none text-[#0F1B2E]/60 block select-none">
                  “
                </span>
                <p className="font-serif italic text-2xl sm:text-[1.65rem] font-medium text-[#0F1B2E] tracking-normal leading-snug mt-3">
                  From pixels to performance — interfaces that feel alive.
                </p>
              </div>

              {/* Signature and Caption in Navy */}
              <div className="pt-8 border-t border-[#0F1B2E]/25 mt-8 flex flex-col">
                <span className="font-script text-4xl sm:text-5xl text-[#0F1B2E] -rotate-3 select-none mb-2">
                  Ameer
                </span>
                <span className="font-mono text-xs tracking-[0.25em] text-[#0F1B2E]/85 uppercase font-semibold">
                  UI/UX · FRONT-END · REACT
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
