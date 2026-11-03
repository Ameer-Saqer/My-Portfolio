import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, stats } from "../data/content";
import { useCountUp } from "../hooks/useCountUp";
import { useMagnetic } from "../hooks/useMagnetic";
import { HiArrowNarrowRight, HiArrowDown } from "react-icons/hi";

gsap.registerPlugin(ScrollTrigger);

function StatItem({ value, suffix, label, startCount }) {
  const count = useCountUp(value, 1.4, startCount);

  return (
    <div className="py-4 border-b border-line last:border-b-0 flex flex-col items-end">
      <div className="flex items-baseline gap-1 font-display text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">
        <span>
          {count}
          {suffix}
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] text-dim uppercase text-right mt-1">
        {label}
      </span>
    </div>
  );
}

export default function Hero({ readyToAnimate = true }) {
  const heroRef = useRef(null);
  const giantWordRef = useRef(null);
  const portraitRef = useRef(null);
  const textColRef = useRef(null);
  const statsColRef = useRef(null);

  const [statsTriggered, setStatsTriggered] = useState(false);
  const magneticWorkBtn = useMagnetic(0.35, 70);
  const magneticCvBtn = useMagnetic(0.35, 70);

  useEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (isReduced) {
      setStatsTriggered(true);
      return;
    }

    const timer = setTimeout(() => {
      setStatsTriggered(true);
    }, 1200);

    const ctx = gsap.context(() => {
      // Scroll-scrubbed hero parallax
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      if (giantWordRef.current) {
        tl.to(giantWordRef.current, { yPercent: 18, ease: "none" }, 0);
      }
      if (portraitRef.current) {
        tl.to(
          portraitRef.current,
          { yPercent: -12, scale: 1.05, ease: "none" },
          0,
        );
      }
      if (textColRef.current) {
        tl.to(textColRef.current, { y: -120, opacity: 0, ease: "none" }, 0);
      }
      if (statsColRef.current) {
        tl.to(statsColRef.current, { y: -60, opacity: 0, ease: "none" }, 0);
      }

      // Desktop mouse-move parallax on portrait only (max 8px)
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (!isTouch && portraitRef.current) {
        const xPortTo = gsap.quickTo(portraitRef.current, "x", {
          duration: 0.8,
          ease: "power2.out",
        });
        const yPortTo = gsap.quickTo(portraitRef.current, "y", {
          duration: 0.8,
          ease: "power2.out",
        });

        const handleMouseMove = (e) => {
          const xPercent = (e.clientX / window.innerWidth - 0.5) * 2;
          const yPercent = (e.clientY / window.innerHeight - 0.5) * 2;

          // Light parallax capped at 8px
          xPortTo(xPercent * 8);
          yPortTo(yPercent * 8);
        };

        window.addEventListener("mousemove", handleMouseMove, {
          passive: true,
        });
        return () => window.removeEventListener("mousemove", handleMouseMove);
      }
    }, heroRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, []);

  const giantWord = "PORTFOLIO";
  const nameLetters = profile.brand.split("");

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen w-full bg-bg overflow-hidden flex flex-col justify-between pt-24 pb-12 px-5 sm:px-8 lg:px-14 select-none"
    >
      {/* 1. Soft Gold Radial Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-80"
        style={{
          background:
            "radial-gradient(60% 60% at 68% 52%, rgba(212, 175, 55, 0.16), transparent 70%)",
        }}
      />

      {/* 2. Giant Background Word PORTFOLIO in Low-Strength Gold Gradient */}
      <div
        ref={giantWordRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-[-4vw] right-[-4vw] z-1 flex justify-between select-none overflow-hidden opacity-90"
      >
        <motion.div
          initial={{ y: "60%", opacity: 0 }}
          animate={readyToAnimate ? { y: "0%", opacity: 1 } : {}}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="flex w-full justify-between items-center text-[22vw] leading-[0.8] font-display uppercase tracking-tighter"
          style={{
            background:
              "linear-gradient(to bottom, rgba(212, 175, 55, 0.55), rgba(212, 175, 55, 0.08))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {giantWord}
        </motion.div>
      </div>

      {/* 3. Portrait Cut-Out with light mouse parallax only (max 8px, grayscale preserved) */}
      <div
        ref={portraitRef}
        className="pointer-events-none absolute bottom-0 right-[5%] sm:right-[12%] lg:right-[20%] z-10 w-[78vw] sm:w-[48vw] lg:w-[32vw] max-w-[440px] flex items-end justify-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={readyToAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full origin-bottom"
        >
          <img
            src="/images/ameer-cutout.png"
            alt="Ameer Saqer Portrait"
            className="w-full h-auto object-contain filter grayscale contrast-[1.08] brightness-[0.98] drop-shadow-[0_15px_35px_rgba(10,19,34,0.9)] max-h-[580px] sm:max-h-[640px]"
            loading="eager"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, black 18%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 18%, black 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* 4. Main Columns (Left: Text & CTA, Right: Stats) */}
      <div className="relative z-20 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div
          ref={textColRef}
          className="lg:col-span-7 flex flex-col items-start justify-center pt-8 sm:pt-0"
        >
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={readyToAnimate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-muted mb-3"
          >
            <span className="w-8 h-[1px] bg-accent/60" />
            <span>— {profile.role}</span>
          </motion.div>

          {/* Script + Name Container */}
          <div className="relative mb-3">
            {/* Caveat Script Overlap */}
            <motion.span
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={
                readyToAnimate ? { opacity: 1, scale: 1, rotate: -4 } : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute -top-7 sm:-top-9 left-2 font-script text-3xl sm:text-4xl lg:text-5xl text-white select-none pointer-events-none drop-shadow-md z-30"
            >
              Hello, I'm
            </motion.span>

            {/* Giant Name: AMEER. */}
            <div className="overflow-hidden">
              <h1 className="font-display text-[clamp(4.2rem,11.5vw,10.5rem)] leading-[0.88] uppercase text-white tracking-tight flex items-baseline mt-8">
                {nameLetters.map((l, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: "110%" }}
                    animate={readyToAnimate ? { y: "0%" } : {}}
                    transition={{
                      duration: 0.9,
                      delay: 0.55 + i * 0.05,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block"
                  >
                    {l}
                  </motion.span>
                ))}
                <span className="inline-block text-accent ml-1">.</span>
              </h1>
            </div>
          </div>

          {/* Static Clean Role Text */}
          <div className="overflow-hidden mb-4">
            <motion.div
              initial={{ y: "100%", opacity: 0 }}
              animate={readyToAnimate ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.85,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-mono text-xs sm:text-sm tracking-[0.25em] text-accent uppercase font-bold"
            >
              UI/UX &amp; FRONT-END DEVELOPER
            </motion.div>
          </div>

          {/* Bio Paragraph */}
          <div className="overflow-hidden mb-8 max-w-[430px]">
            <motion.p
              initial={{ y: "100%", opacity: 0 }}
              animate={readyToAnimate ? { y: "0%", opacity: 1 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.95,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="font-sans text-sm sm:text-base text-muted leading-relaxed"
            >
              {profile.bio}
            </motion.p>
          </div>

          {/* Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={readyToAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6 sm:gap-8"
          >
            {/* Primary View Work Button: Gold background, NAVY text; hover = white background, navy text */}
            <div ref={magneticWorkBtn}>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold rounded-full overflow-hidden transition-all duration-300 hover:bg-white border border-accent hover:border-white focus-ring shadow-lg shadow-accent/25"
              >
                <span className="text-[#0F1B2E] transition-colors duration-300">
                  View my work
                </span>
                <HiArrowNarrowRight className="text-base text-[#0F1B2E] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Secondary CV Button: Transparent with 1px gold border and white text, hover fills gold-soft */}
            <div ref={magneticCvBtn}>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border border-accent bg-transparent hover:bg-accent-soft transition-all duration-300 focus-ring"
                aria-label="Download CV PDF"
              >
                {/* Circular Text SVG */}
                <svg
                  className="absolute inset-0 w-full h-full origin-center transition-transform duration-700 ease-out group-hover:rotate-45"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="cvTextCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-[9px] uppercase tracking-[0.19em] fill-white/80 group-hover:fill-accent transition-colors">
                    <textPath href="#cvTextCircle" startOffset="0%">
                      DOWNLOAD CV · PDF · AMEER ·
                    </textPath>
                  </text>
                </svg>

                {/* Center Down Arrow */}
                <HiArrowDown className="text-sm sm:text-base text-white group-hover:text-accent group-hover:translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Stats (stacked, right aligned) */}
        <div
          ref={statsColRef}
          className="lg:col-span-5 flex flex-col items-start lg:items-end justify-center mt-6 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={readyToAnimate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[280px] bg-surface/50 backdrop-blur-sm lg:bg-transparent p-4 sm:p-6 lg:p-0 rounded-2xl lg:rounded-none border border-line lg:border-none"
          >
            {stats.map((st) => (
              <StatItem
                key={st.label}
                value={st.value}
                suffix={st.suffix}
                label={st.label}
                startCount={statsTriggered}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Hero Bottom Row: Freelance Badge & Scroll Down */}
      <div className="relative z-20 flex items-center justify-between pt-6 border-t border-line/60">
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>AVAILABLE FOR FREELANCE</span>
        </div>

        <div className="font-mono text-[10px] tracking-widest text-dim uppercase">
          [ 2026 ]
        </div>
      </div>
    </section>
  );
}
