import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useInView } from 'framer-motion';

export default function CompareSlider({
  image = '/compare/final.webp',
  className = '',
}) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isInteracting, setIsInteracting] = useState(false);
  const hasAutoSwept = useRef(false);

  // Auto-sweep interaction on first view (20% -> 70% -> 50%)
  useEffect(() => {
    if (!isInView || hasAutoSwept.current) return;
    hasAutoSwept.current = true;

    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    let start = null;
    const duration = 1800; // ms

    const sweep = (timestamp) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);

      if (progress < 0.3) {
        // 50% -> 20%
        const p = progress / 0.3;
        const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        setSliderPos(50 - 30 * ease);
      } else if (progress < 0.7) {
        // 20% -> 70%
        const p = (progress - 0.3) / 0.4;
        const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        setSliderPos(20 + 50 * ease);
      } else {
        // 70% -> 50%
        const p = (progress - 0.7) / 0.3;
        const ease = 0.5 - 0.5 * Math.cos(p * Math.PI);
        setSliderPos(70 - 20 * ease);
      }

      if (progress < 1) {
        requestAnimationFrame(sweep);
      } else {
        setSliderPos(50);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(sweep);
    }, 450);

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
      className={`relative w-full h-[340px] sm:h-[450px] lg:h-[520px] rounded-2xl overflow-hidden select-none cursor-ew-resize border border-[rgba(212,175,55,0.35)] shadow-[0_0_40px_rgba(212,175,55,0.08)] bg-surface focus:outline-none focus:ring-1 focus:ring-accent touch-pan-y ${className}`}
    >
      {/* 1. Base Layer: RAW / SKELETON (grayscale(1) brightness(0.8) contrast(1.05) + dotted grid) */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <img
          src={image}
          alt="Raw Wireframe Skeleton"
          className="w-full h-full object-cover object-top filter grayscale brightness-[0.8] contrast-[1.05]"
          loading="lazy"
        />
        {/* Subtle dotted-grid overlay: 1px dots, 24px spacing, 8% opacity */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none opacity-[0.08]"
          style={{
            backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      {/* 2. Top Layer: REAL / PRODUCTION in FULL ORIGINAL COLORS (Revealed by clip-path) */}
      <div
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{
          clipPath: `inset(0 0 0 ${sliderPos}%)`,
          WebkitClipPath: `inset(0 0 0 ${sliderPos}%)`,
        }}
      >
        <img
          src={image}
          alt="Real Production Interface"
          className="w-full h-full object-cover object-top"
          loading="lazy"
        />
      </div>

      {/* 3. Vertical Divider Line with Center Drag Handle (Gold, min 44px) */}
      <div
        className="absolute top-0 bottom-0 w-[2px] bg-accent pointer-events-none z-20 shadow-[0_0_10px_rgba(212,175,55,0.7)]"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Center Round Handle with ‹ › arrows in Gold with Navy text (at least 44px) */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-11 h-11 min-w-[44px] min-h-[44px] rounded-full bg-accent text-[#0F1B2E] shadow-[0_0_20px_rgba(212,175,55,0.7)] border border-[#0F1B2E]/20 flex items-center justify-center font-mono text-xs font-bold tracking-tighter select-none">
          <span>‹</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#0F1B2E] mx-0.5" />
          <span>›</span>
        </div>
      </div>

      {/* 4. Pinned Bottom Corner Badges */}
      <div className="absolute bottom-4 left-4 z-20 px-3 py-1 rounded bg-[#0F1B2E]/90 backdrop-blur-sm border border-[rgba(212,175,55,0.25)] font-mono text-xs tracking-widest text-muted uppercase pointer-events-none select-none">
        RAW / SKELETON
      </div>

      <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded bg-[#0F1B2E]/90 backdrop-blur-sm border border-[rgba(212,175,55,0.25)] font-mono text-xs tracking-widest text-accent uppercase pointer-events-none select-none">
        REAL / PRODUCTION
      </div>
    </div>
  );
}
