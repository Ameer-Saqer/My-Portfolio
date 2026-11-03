import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { achievements } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Achievements() {
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { once: true, amount: 0.25 });
  const [hoveredRow, setHoveredRow] = useState(null);

  // Big number 8 count up
  const shippedCount = useCountUp(8, 1.4, isInView);

  return (
    <section className="relative py-20 sm:py-32 bg-bg px-5 sm:px-8 lg:px-14">
      <div
        ref={panelRef}
        className="max-w-7xl mx-auto rounded-3xl bg-surface border border-[rgba(212,175,55,0.25)] p-6 sm:p-10 lg:p-16 relative overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.06)]"
      >
        {/* Soft gold radial glow in top-left */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Laurel wreath, big number & message */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-4">
              MILESTONES & CERTIFICATES
            </span>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-8">
              THE CODE.<br />
              <span className="text-accent">THE CRAFT</span>
              <span className="text-accent ml-1">.</span>
            </h3>

            {/* Laurel Wreath with animated leaves drawing in */}
            <div className="relative my-4 flex items-center justify-center w-full max-w-[280px] h-[180px]">
              <svg
                viewBox="0 0 240 180"
                className="absolute inset-0 w-full h-full text-white/80 pointer-events-none"
                fill="none"
              >
                {/* Left Branch */}
                <motion.path
                  d="M100,160 C50,140 25,90 45,35"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                {/* Left Leaves */}
                <motion.path
                  d="M48,40 C35,45 35,60 48,55 M42,65 C28,70 30,85 45,78 M42,95 C30,105 35,118 50,110 M52,125 C42,138 52,148 68,138 M75,150 C68,162 82,168 95,158"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
                />

                {/* Right Branch */}
                <motion.path
                  d="M140,160 C190,140 215,90 195,35"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
                {/* Right Leaves */}
                <motion.path
                  d="M192,40 C205,45 205,60 192,55 M198,65 C212,70 210,85 195,78 M198,95 C210,105 205,118 190,110 M188,125 C198,138 188,148 172,138 M165,150 C172,162 158,168 145,158"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.8, delay: 0.3, ease: 'easeOut' }}
                />
              </svg>

              {/* Center Counter (white number with red label) */}
              <div className="flex flex-col items-center justify-center z-10">
                <span className="font-display text-6xl sm:text-7xl text-white tracking-tight leading-none">
                  {shippedCount}+
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-accent font-semibold uppercase mt-1">
                  PROJECTS SHIPPED
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-muted leading-relaxed mt-4 max-w-sm">
              Work made with care. Every project is a reason to keep improving and refining modern digital experiences.
            </p>

            <a
              href="https://github.com/Ameer-Saqer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-accent transition-colors mt-6 group py-1"
            >
              <span>VIEW CERTIFICATES & REPOS</span>
              <FiArrowUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Numbered List */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase mb-6">
              SELECTED RECOGNITION
            </span>

            <div className="flex flex-col divide-y divide-line">
              {achievements.map((item, index) => {
                const isHovered = hoveredRow === index;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className="py-5 flex items-center justify-between group cursor-pointer transition-transform duration-300"
                    style={{
                      transform: isHovered ? 'translateX(12px)' : 'translateX(0px)',
                    }}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      <span className="font-mono text-xs text-accent/70 group-hover:text-accent font-bold transition-colors">
                        {item.id}
                      </span>
                      <div>
                        <h4 className="font-sans text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[11px] text-muted tracking-wide">
                          {item.sub}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-accent tracking-wider font-semibold">
                        {item.year}
                      </span>
                      <FiArrowUpRight
                        className={`text-accent transition-all duration-300 ${
                          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
