import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { achievements, profile } from '../data/content';
import { useCountUp } from '../hooks/useCountUp';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Achievements() {
  const panelRef = useRef(null);
  const isInView = useInView(panelRef, { once: true, amount: 0.25 });
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

  // Certificates count up
  const certsTotal = achievements.length;
  const certsCount = useCountUp(certsTotal, 1.4, isInView);

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
            <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase mb-4">
              MILESTONES & CERTIFICATES
            </span>

            <h2 className="font-display heading-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight mb-8">
              THE CODE.<br />
              <span className="text-accent">THE CRAFT</span>
              <span className="text-accent ml-1">.</span>
            </h2>

            {/* Laurel Wreath with animated leaves drawing in */}
            <div className="relative my-4 flex items-center justify-center w-full max-w-[340px] sm:max-w-[360px] h-[200px]">
              <svg
                viewBox="0 0 340 200"
                className="absolute inset-0 w-full h-full text-white/80 pointer-events-none"
                fill="none"
              >
                {/* Left Branch - Widened to cradle counter with zero text overlap */}
                <motion.path
                  d="M85,180 C30,165 20,75 60,25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Right Branch - Symmetrically widened */}
                <motion.path
                  d="M255,180 C310,165 320,75 280,25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>

              {/* Center Counter (white number with gold label, comfortable interior spacing) */}
              <div className="flex flex-col items-center justify-center z-10 px-4 text-center">
                <span className="font-display text-6xl sm:text-7xl text-white tracking-tight leading-none">
                  {certsCount}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-accent font-semibold uppercase mt-2.5">
                  CERTIFICATES EARNED
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-muted leading-relaxed mt-4 max-w-sm">
              Every certificate links to its public verification page.
            </p>

            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-accent transition-colors mt-6 group py-1"
            >
              <span>VIEW ON LINKEDIN</span>
              <FiArrowUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Right Column: Numbered List */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase mb-6">
              SELECTED RECOGNITION
            </span>

            <div className="flex flex-col divide-y divide-line">
              {achievements.map((item, index) => {
                const isHovered = hoveredRow === index;
                const isClickable = !!item.url;
                const RowTag = isClickable ? motion.a : motion.div;

                return (
                  <RowTag
                    key={item.id}
                    href={item.url || undefined}
                    target={isClickable ? '_blank' : undefined}
                    rel={isClickable ? 'noopener noreferrer' : undefined}
                    aria-label={item.url ? `Verify ${item.title} certificate` : undefined}
                    initial={{ opacity: 0, x: 40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + index * 0.1,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => setHoveredRow(null)}
                    className={`py-5 flex items-center justify-between group ${
                      isClickable ? 'cursor-pointer' : 'cursor-default'
                    } transition-transform duration-300`}
                    style={{
                      transform: isHovered && isClickable ? 'translateX(12px)' : 'translateX(0px)',
                    }}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 pr-4">
                      <span className="font-mono text-xs text-accent/70 group-hover:text-accent font-bold transition-colors flex-shrink-0">
                        {item.id}
                      </span>
                      <div className="min-w-0">
                        <h4 className="font-sans text-sm sm:text-base font-semibold text-white/90 group-hover:text-white transition-colors truncate">
                          {item.title}
                        </h4>
                        <span className="font-mono text-xs text-muted tracking-wide block truncate">
                          {item.sub}
                        </span>
                      </div>
                    </div>

                    {/* Right column: always reserves arrow space so years align in one clean column */}
                    <div className="flex items-center gap-3 w-20 justify-end flex-shrink-0">
                      <span className="font-mono text-xs text-accent tracking-wider font-semibold text-right">
                        {item.year}
                      </span>
                      <FiArrowUpRight
                        aria-hidden={!item.url}
                        className={`w-4 h-4 text-accent transition-all duration-300 flex-shrink-0 ${
                          item.url
                            ? isHovered
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 -translate-x-1'
                            : 'opacity-0 pointer-events-none'
                        }`}
                      />
                    </div>
                  </RowTag>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
