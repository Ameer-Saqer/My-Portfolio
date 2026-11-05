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
      <span className="font-mono text-xs tracking-[0.2em] text-dim uppercase text-right mt-1">
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
      // Desktop only scroll-scrubbed hero parallax
      const isDesktop = window.innerWidth >= 1024;
      if (!isDesktop) return;

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
      className="relative min-h-screen w-full bg-bg overflow-hidden flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-12 px-5 sm:px-8 lg:px-14 select-none"
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

      {/* 2. Desktop Only Portrait Cut-Out (Absolute on right behind text) */}
      <div
        ref={portraitRef}
        className="hidden lg:flex pointer-events-none absolute bottom-0 lg:right-[30%] z-10 lg:w-[32vw] max-w-[440px] items-end justify-center will-change-transform"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={readyToAnimate ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full origin-bottom"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)",
          }}
        >
          <img
            src="/images/ameer-cutout.webp"
            alt="Ameer Saqer Portrait"
            width="408"
            height="612"
            decoding="async"
            loading="eager"
            fetchpriority="high"
            className="w-full h-auto object-contain contrast-[1.08] brightness-[0.98] max-h-[580px] sm:max-h-[640px]"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
            }}
          />
        </motion.div>
      </div>

      {/* 3. Mobile Flow: Strict Vertical Stack (No overlap, 100% readable) */}
      <div className="lg:hidden relative z-20 flex flex-col items-start w-full max-w-lg mx-auto pt-2 pb-6">
        {/* Step 1: Small Tag */}
        <div className="flex items-center gap-2 font-mono text-xs text-muted uppercase tracking-widest mb-3">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
          <span>{profile.status}</span>
        </div>

        {/* Step 2 & 3: "Hello, I'm" + Name */}
        <div className="relative mb-2">
          <span className="font-script text-3xl sm:text-4xl text-white select-none pointer-events-none block mb-1">
            Hello, I'm
          </span>
          <h1 className="font-display text-[clamp(3.8rem,16vw,6.5rem)] leading-[0.88] uppercase text-white tracking-tight flex items-baseline">
            <span>AMEER</span>
            <span className="text-accent ml-1">.</span>
          </h1>
        </div>

        {/* Step 4: Role Label with clear spacing and responsive wrapping */}
        <div className="mt-2 mb-4 font-mono text-xs sm:text-sm tracking-[0.16em] text-accent uppercase font-bold leading-normal break-words">
          UI/UX &amp; FRONT-END DEVELOPER
        </div>

        {/* Step 5: Short Paragraph */}
        <p className="font-sans text-sm text-muted leading-relaxed mb-6">
          {profile.bio}
        </p>

        {/* Step 6: Buttons (View my work + CV) with at least 44px touch targets */}
        <div className="flex items-center gap-4 mb-6">
          <a
            href="#work"
            className="min-h-[44px] inline-flex items-center gap-2.5 px-6 py-3 bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold rounded-full hover:bg-white transition-colors shadow-lg shadow-accent/20"
          >
            <span>View my work</span>
            <HiArrowNarrowRight className="text-base text-[#0F1B2E]" />
          </a>

          <a
            href={profile.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] min-w-[44px] w-12 h-12 flex items-center justify-center rounded-full border border-accent bg-transparent hover:bg-accent-soft text-white transition-colors"
            aria-label="Download CV PDF"
          >
            <HiArrowDown className="text-base text-accent" />
          </a>
        </div>

        {/* Step 7: Portrait Below (Full width, fades into background at bottom edge) */}
        <div className="w-full max-w-[320px] mx-auto my-4 flex justify-center overflow-hidden">
          <img
            src="/images/ameer-cutout.webp"
            alt="Ameer Saqer Portrait"
            width="408"
            height="612"
            decoding="async"
            loading="eager"
            fetchpriority="high"
            className="w-full h-auto object-contain filter contrast-[1.08] brightness-[0.98] max-h-[380px]"
            style={{
              maskImage:
                "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
              WebkitMaskImage:
                "linear-gradient(to top, transparent 0%, black 25%, black 100%)",
            }}
          />
        </div>

        {/* Step 8: Three Stats as a 3-column row under the portrait */}
        <div className="grid grid-cols-3 gap-2 w-full pt-6 pb-2 border-t border-b border-line text-center">
          {stats.map((st) => (
            <div key={st.label} className="flex flex-col items-center">
              <div className="flex items-baseline gap-0.5 font-display text-2xl sm:text-3xl text-white tracking-tight">
                <span>
                  {st.value}
                  {st.suffix}
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>
              <span className="font-mono text-xs tracking-wider text-muted uppercase mt-1">
                {st.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Desktop Main Columns (Unchanged) */}
      <div className="hidden lg:grid relative z-20 flex-1 grid-cols-12 gap-8 items-center max-w-7xl mx-auto w-full">
        {/* Left Column */}
        <div
          ref={textColRef}
          className="lg:col-span-7 flex flex-col items-start justify-center"
        >
          {/* Script + Name Container */}
          <div className="relative mb-3">
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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={readyToAnimate ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center gap-6 sm:gap-8"
          >
            <div ref={magneticWorkBtn}>
              <a
                href="#work"
                className="group relative inline-flex items-center gap-3 px-8 py-4 bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold rounded-full overflow-hidden transition-all duration-300 hover:bg-white border border-accent hover:border-white focus-ring shadow-lg shadow-accent/25 min-h-[44px]"
              >
                <span className="text-[#0F1B2E] transition-colors duration-300">
                  View my work
                </span>
                <HiArrowNarrowRight className="text-base text-[#0F1B2E] transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            <div ref={magneticCvBtn}>
              <a
                href={profile.cv}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center rounded-full border border-accent bg-transparent hover:bg-accent-soft transition-all duration-300 focus-ring min-h-[44px] min-w-[44px]"
                aria-label="Download CV PDF"
              >
                <svg
                  className="absolute inset-0 w-full h-full origin-center transition-transform duration-700 ease-out group-hover:rotate-45"
                  viewBox="0 0 100 100"
                >
                  <path
                    id="cvTextCircle"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="font-mono text-xs uppercase tracking-[0.19em] fill-white/80 group-hover:fill-accent transition-colors">
                    <textPath href="#cvTextCircle" startOffset="0%">
                      DOWNLOAD CV · PDF · AMEER ·
                    </textPath>
                  </text>
                </svg>

                <HiArrowDown className="text-sm sm:text-base text-white group-hover:text-accent group-hover:translate-y-0.5 transition-all" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Right Column: Stats (Desktop) */}
        <div
          ref={statsColRef}
          className="lg:col-span-5 flex flex-col items-end justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={readyToAnimate ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-[280px]"
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

      {/* Hero Bottom Row */}
      <div className="relative z-20 flex items-center justify-between pt-6 border-t border-line/60">
        <div className="flex items-center gap-2 font-mono text-xs tracking-[0.2em] text-muted uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          <span>UI/UX × FRONT-END</span>
        </div>

        <div className="font-mono text-xs tracking-widest text-dim uppercase">
          [ 2026 ]
        </div>
      </div>
    </section>
  );
}
