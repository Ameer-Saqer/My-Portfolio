import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, delay = 0, duration = 0.9, className = '', once = true }) {
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    // Respect reduced motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      return;
    }

    // Safe fallback 1: Direct viewport position check on mount & scroll
    const checkVisibility = () => {
      if (isRevealed || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // If element is entering the viewport
      if (rect.top < window.innerHeight * 0.95 && rect.bottom > 0) {
        setIsRevealed(true);
      }
    };

    // Immediate check
    checkVisibility();

    // Safe fallback 2: Timer fallback so titles are guaranteed to be visible even if observer misses
    const safetyTimer = setTimeout(() => {
      setIsRevealed(true);
    }, 2800);

    window.addEventListener('scroll', checkVisibility, { passive: true });

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('scroll', checkVisibility);
    };
  }, [isRevealed]);

  return (
    <div ref={containerRef} className={`overflow-hidden py-1 ${className}`}>
      <motion.div
        initial={{ y: '110%', opacity: 0 }}
        animate={isRevealed ? { y: '0%', opacity: 1 } : undefined}
        whileInView={{ y: '0%', opacity: 1 }}
        viewport={{ once: true, margin: '-10%' }}
        onViewportEnter={() => setIsRevealed(true)}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
