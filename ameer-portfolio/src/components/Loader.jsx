import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Loader({ onComplete }) {
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Check if loader should be skipped (once per session or prefers-reduced-motion)
  const [shouldSkip] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const hasSeen = sessionStorage.getItem('loaderSeen');
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (hasSeen || reduced) return true;
      }
    } catch (e) {}
    return false;
  });

  const [percent, setPercent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (shouldSkip) {
      onCompleteRef.current?.();
      return;
    }

    try {
      sessionStorage.setItem('loaderSeen', 'true');
    } catch (e) {}

    // Lock scroll while loader is active
    document.body.style.overflow = 'hidden';

    const minDuration = 600; // ms minimum to prevent flash
    const maxDuration = 2500; // ms hard maximum so slow connection never blocks
    const startTime = performance.now();
    let isReady = false;
    let frameId;
    let completed = false;

    // Page readiness: document.fonts.ready AND hero image loaded (or window load)
    const fontPromise = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();

    const heroImagePromise = new Promise((resolve) => {
      const img = new Image();
      img.src = '/images/ameer-cutout.webp';
      if (img.complete) {
        resolve();
      } else {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      }
    });

    const windowLoadPromise = new Promise((resolve) => {
      if (document.readyState === 'complete') {
        resolve();
      } else {
        window.addEventListener('load', () => resolve(), { once: true });
      }
    });

    Promise.all([fontPromise, Promise.race([heroImagePromise, windowLoadPromise])])
      .then(() => {
        isReady = true;
      })
      .catch(() => {
        isReady = true;
      });

    const finishLoader = () => {
      if (completed) return;
      completed = true;
      setPercent(100);
      setTimeout(() => {
        setIsFinished(true);
        document.body.style.overflow = '';
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 500); // Shortened curtain exit to ~500ms
      }, 100);
    };

    const updateLoader = (now) => {
      if (completed) return;
      const elapsed = now - startTime;

      if (elapsed >= maxDuration) {
        finishLoader();
        return;
      }

      if (isReady && elapsed >= minDuration) {
        finishLoader();
        return;
      }

      // Smooth progress crawl up to 92% until ready or maxDuration
      let currentProgress;
      if (elapsed < minDuration) {
        currentProgress = (elapsed / minDuration) * 70;
      } else {
        const extraRatio = Math.min((elapsed - minDuration) / (maxDuration - minDuration), 1);
        currentProgress = 70 + extraRatio * 22;
      }

      setPercent(Math.min(99, Math.floor(currentProgress)));
      frameId = requestAnimationFrame(updateLoader);
    };

    frameId = requestAnimationFrame(updateLoader);

    const safetyTimer = setTimeout(() => {
      finishLoader();
    }, maxDuration + 100);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
      clearTimeout(safetyTimer);
      document.body.style.overflow = '';
    };
  }, [shouldSkip]);

  if (shouldSkip) {
    return null;
  }

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
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 left-0 right-0 h-1/2 bg-bg border-b border-line"
          />
          <motion.div
            initial={{ y: '0%' }}
            animate={{ y: '100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute bottom-0 left-0 right-0 h-1/2 bg-bg border-t border-line"
          />
        </div>
      )}
    </AnimatePresence>
  );
}
