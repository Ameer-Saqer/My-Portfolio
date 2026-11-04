import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onCompleteRef.current?.();
      return;
    }

    // Lock scroll while loader is active
    document.body.style.overflow = 'hidden';

    const duration = 1800; // ms
    let startTime = null;
    let frameId;
    let completed = false;

    const finishLoader = () => {
      if (completed) return;
      completed = true;
      setPercent(100);
      setTimeout(() => {
        setIsFinished(true);
        document.body.style.overflow = '';
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 850); // Wait for split curtain exit animation
      }, 150);
    };

    const updateLoader = (now) => {
      if (!startTime) startTime = now;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Smooth progress calculation (0 to 100)
      const currentPercent = Math.min(100, Math.floor(progress * 100));
      setPercent(currentPercent);

      if (progress < 1) {
        frameId = requestAnimationFrame(updateLoader);
      } else {
        finishLoader();
      }
    };

    frameId = requestAnimationFrame(updateLoader);

    // Guaranteed fallback so loader never hangs under any browser throttle condition
    const safetyTimer = setTimeout(() => {
      finishLoader();
    }, duration + 600);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg overflow-hidden select-none">
          {/* Faint wireframe grid assembling */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.08] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                <rect width="80" height="80" fill="none" stroke="#D4AF37" strokeWidth="1" strokeDasharray="4 4" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            {/* Animated drawing rectangles */}
            <motion.rect
              x="15%"
              y="20%"
              width="30%"
              height="40%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.8, ease: 'easeInOut' }}
            />
            <motion.rect
              x="55%"
              y="35%"
              width="35%"
              height="45%"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: 'easeInOut', delay: 0.2 }}
            />
          </svg>

          {/* Central Logo & Progress */}
          <div className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center text-4xl sm:text-5xl font-display tracking-tight text-white mb-6"
            >
              <span>A</span>
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent ml-1" />
            </motion.div>

            {/* Thin progress line container */}
            <div className="w-48 sm:w-64 h-[2px] bg-white/10 relative overflow-hidden mb-3">
              <div
                className="absolute top-0 left-0 h-full bg-accent will-change-[width]"
                style={{ width: `${percent}%` }}
              />
            </div>

            {/* Mono counter 000 -> 100 */}
            <div className="font-mono text-xs tracking-[0.25em] text-muted">
              {String(percent).padStart(3, '0')} / 100
            </div>
          </div>
        </div>
      ) : (
        /* Split-half curtain slide exit: top half slides up, bottom half slides down */
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '-100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-bg border-b border-line"
          />
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-bg border-t border-line"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
