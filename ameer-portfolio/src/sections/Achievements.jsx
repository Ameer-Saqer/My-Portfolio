import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, useContent } from '../i18n/LanguageContext';
import { useCountUp } from '../hooks/useCountUp';
import { FiArrowUpRight } from 'react-icons/fi';

export default function Achievements() {
  const { lang, t, sx } = useLanguage();
  const { achievements, profile } = useContent();

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
        {/* Soft gold radial glow in top-start */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -start-24 w-96 h-96 rounded-full opacity-60"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left/Start Column: Laurel wreath, big number & message */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase mb-4">
              {t('achievements.label')}
            </span>

            <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-[0.95] mb-8">
              {t('achievements.titleLine1')}<br />
              <span className="text-accent">{t('achievements.titleLine2')}</span>
              <span className="text-accent ms-1">.</span>
            </h3>

            {/* Laurel Wreath with animated leaves drawing in */}
            <div className="relative my-4 flex items-center justify-center w-full max-w-[340px] sm:max-w-[360px] h-[200px]">
              <svg
                viewBox="0 0 340 200"
                className="absolute inset-0 w-full h-full text-white/80 pointer-events-none"
                fill="none"
              >
                {/* Left Branch */}
                <motion.path
                  d="M85,180 C30,165 20,75 60,25"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />

                {/* Right Branch */}
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

              {/* Center Counter */}
              <div className="flex flex-col items-center justify-center z-10 px-4 text-center">
                <span className="font-display text-6xl sm:text-7xl text-white tracking-tight leading-none">
                  {certsCount}
                </span>
                <span className="font-mono text-xs tracking-[0.2em] text-accent font-semibold uppercase mt-2.5">
                  {t('achievements.counterLabel')}
                </span>
              </div>
            </div>

            <p className="font-sans text-sm text-muted leading-relaxed mt-4 max-w-sm">
              {t('achievements.desc')}
            </p>

            <a
              href={profile.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white hover:text-accent transition-colors mt-6 group py-1"
            >
              <span>{t('achievements.viewLinkedin')}</span>
              <FiArrowUpRight className="transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform rtl:-scale-x-100" />
            </a>
          </div>

          {/* Right/End Column: Numbered List */}
          <div className="lg:col-span-7 flex flex-col">
            <span className="font-mono text-xs tracking-[0.22em] text-accent uppercase mb-6">
              {t('achievements.selectedRecognition')}
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
                    aria-label={
                      item.url
                        ? lang === 'ar'
                          ? `التحقق من شهادة ${item.title}`
                          : `Verify ${item.title} certificate`
                        : undefined
                    }
                    initial={{ opacity: 0, x: 40 * sx }}
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
                      transform:
                        isHovered && isClickable
                          ? `translateX(${12 * sx}px)`
                          : 'translateX(0px)',
                    }}
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 min-w-0 pe-4">
                      <span className="font-mono text-xs text-accent/70 group-hover:text-accent font-bold transition-colors flex-shrink-0" dir="ltr">
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

                    {/* End column: always reserves arrow space */}
                    <div className="flex items-center gap-3 w-20 justify-end flex-shrink-0">
                      <span className="font-mono text-xs text-accent tracking-wider font-semibold text-end" dir="ltr">
                        {item.year}
                      </span>
                      <FiArrowUpRight
                        aria-hidden={!item.url}
                        className={`w-4 h-4 text-accent transition-all duration-300 flex-shrink-0 rtl:-scale-x-100 ${
                          item.url
                            ? isHovered
                              ? 'opacity-100 translate-x-0'
                              : 'opacity-0 ltr:-translate-x-1 rtl:translate-x-1'
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
