import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

export default function CompareSlider({
  rawImage = '/compare/raw.webp',
  finalImage = '/compare/final.webp',
  className = '',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isInteracting, setIsInteracting] = useState(false);
  const hasAutoSwept = useRef(false);

  // Auto-sweep interaction to teach user on first view
  useEffect(() => {
    if (!isInView || hasAutoSwept.current) return;
    hasAutoSwept.current = true;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let start = null;
    const duration = 1600; // ms

    // 20% -> 70% -> 50%
    const sweep = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;

      if (progress < 0.45) {
        // 50 -> 20 -> 70
        const p = progress / 0.45;
        setSliderPos(50 + (25 - 50) * Math.sin(p * Math.PI));
      } else if (progress < 1) {
        const p = (progress - 0.45) / 0.55;
        // Ease into 50
        setSliderPos(70 + (50 - 70) * (0.5 - 0.5 * Math.cos(p * Math.PI)));
      } else {
        setSliderPos(50);
        return;
      }

      requestAnimationFrame(sweep);
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(sweep);
    }, 400);

    return () => clearTimeout(timer);
  }, [isInView]);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const handlePointerDown = (e) => {
    setIsInteracting(true);
    updatePosition(e.clientX);
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isInteracting) return;
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      setIsInteracting(false);
    };

    if (isInteracting) {
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    }

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isInteracting, updatePosition]);

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(0, prev - 5));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div
      ref={containerRef}
      role="slider"
      aria-label="Before and after code comparison slider"
      aria-valuenow={Math.round(sliderPos)}
      aria-valuemin={0}
      aria-valuemax={100}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
      data-cursor="drag"
      className={`relative w-full h-[320px] sm:h-[420px] lg:h-[480px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-line bg-surface focus:outline-none focus:ring-2 focus:ring-white ${className}`}
    >
      {/* Background Image: Final Real Version */}
      <img
        src={finalImage}
        alt="Final Rendered Interface"
        className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none filter grayscale contrast-[1.05]"
        loading="lazy"
      />

      {/* Foreground Image: Raw Wireframe / Skeleton Version (Clipped) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
        }}
      >
        <img
          src={rawImage}
          alt="Raw Wireframe Interface"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none filter grayscale contrast-[0.9] brightness-[0.7]"
          loading="lazy"
        />
        {/* Subtle grid pattern over raw wireframe */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
            backgroundSize: '16px 16px',
          }}
        />
      </div>

      {/* Vertical Divider Line with Center Drag Handle (Gold) */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-accent pointer-events-none z-20"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Center Round Handle with ‹ › arrows in Gold with Navy arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-accent text-[#0F1B2E] shadow-[0_0_20px_rgba(212,175,55,0.7)] border border-[#0F1B2E]/20 flex items-center justify-center font-mono text-xs font-bold tracking-tighter select-none">
          <span>‹</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F1B2E] mx-0.5" />
          <span>›</span>
        </div>
      </div>

      {/* Pinned Bottom Corner Badges */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded bg-bg/85 backdrop-blur-sm border border-line font-mono text-[10px] tracking-widest text-white uppercase pointer-events-none">
        RAW / SKELETON
      </div>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded bg-bg/85 backdrop-blur-sm border border-line font-mono text-[10px] tracking-widest text-white uppercase pointer-events-none">
        REAL / PRODUCTION
      </div>
    </div>
  );
}

