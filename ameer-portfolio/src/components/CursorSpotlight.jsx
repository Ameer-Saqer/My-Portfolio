import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorSpotlight() {
  const spotlightRef = useRef(null);

  useEffect(() => {
    // Disable on touch screens or reduced motion
    if (
      window.matchMedia('(pointer: coarse)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    const el = spotlightRef.current;
    if (!el) return;

    // Set initial position off-screen
    gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

    const xTo = gsap.quickTo(el, 'x', { duration: 0.65, ease: 'power2.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.65, ease: 'power2.out' });

    let hasMoved = false;

    const handleMouseMove = (e) => {
      if (!hasMoved) {
        gsap.to(el, { opacity: 1, duration: 0.8 });
        hasMoved = true;
      }
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const handleMouseLeave = () => {
      gsap.to(el, { opacity: 0, duration: 0.5 });
    };

    const handleMouseEnter = () => {
      if (hasMoved) {
        gsap.to(el, { opacity: 1, duration: 0.5 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <div
      ref={spotlightRef}
      aria-hidden="true"
      className="hidden md:block pointer-events-none fixed top-0 left-0 w-[500px] h-[500px] rounded-full z-0 will-change-transform mix-blend-screen opacity-0"
      style={{
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(212, 175, 55, 0.02) 45%, transparent 70%)',
      }}
    />
  );
}

