import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const lineRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          const p = self.progress;
          if (lineRef.current) {
            lineRef.current.style.transform = `scaleY(${p})`;
          }
          if (dotRef.current) {
            dotRef.current.style.top = `${p * 100}%`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:block fixed left-0 top-0 bottom-0 w-[2px] z-30 pointer-events-none"
    >
      {/* Background track (subtle gold line) */}
      <div className="absolute inset-0 bg-[rgba(212,175,55,0.12)]" />

      {/* Progress fill line (Gold) */}
      <div
        ref={lineRef}
        className="absolute top-0 left-0 w-full h-full bg-accent origin-top will-change-transform"
        style={{ transform: 'scaleY(0)' }}
      />

      {/* Glowing tip dot (Gold) */}
      <div
        ref={dotRef}
        className="absolute left-[-2px] w-[6px] h-[6px] -translate-y-1/2 rounded-full bg-accent shadow-[0_0_12px_rgba(212,175,55,0.8)] will-change-[top]"
        style={{ top: '0%' }}
      />
    </div>
  );
}
