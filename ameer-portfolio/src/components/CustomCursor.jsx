import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState('default');
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const cursorX = useSpring(-100, springConfig);
  const cursorY = useSpring(-100, springConfig);

  useEffect(() => {
    // Disable on touch devices, mobile screens, or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches || window.innerWidth < 1024;
    if (isTouch || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let idleTimer = null;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);

      if (idleTimer) clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    };

    const handleMouseLeave = () => {
      if (idleTimer) clearTimeout(idleTimer);
      setIsVisible(false);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleTouchStart = () => {
      if (idleTimer) clearTimeout(idleTimer);
      setIsVisible(false);
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('[data-cursor]');
      if (target) {
        const type = target.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorVariant('view');
          setCursorText('VIEW');
        } else if (type === 'drag') {
          setCursorVariant('drag');
          setCursorText('DRAG');
        } else if (type === 'hover') {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (e.target.closest('a, button, input, textarea, [role="button"]')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('blur', handleMouseLeave);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    return () => {
      if (idleTimer) clearTimeout(idleTimer);
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('blur', handleMouseLeave);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [cursorX, cursorY, isVisible]);

  // Completely disabled on mobile devices or when not visible
  if (typeof window !== 'undefined' && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches)) {
    return null;
  }

  if (!isVisible) return null;

  const isExpanded = cursorVariant === 'view' || cursorVariant === 'drag';
  const isHovered = cursorVariant === 'hover';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-50 flex items-center justify-center rounded-full bg-accent text-[#0F1B2E] font-mono font-bold tracking-widest text-xs uppercase select-none shadow-[0_0_12px_rgba(212,175,55,0.65)]"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isExpanded ? 64 : isHovered ? 36 : 12,
        height: isExpanded ? 64 : isHovered ? 36 : 12,
        opacity: isVisible ? 1 : 0,
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          className="text-[#0F1B2E] font-extrabold leading-none text-xs"
        >
          {cursorText}
        </motion.span>
      )}
    </motion.div>
  );
}
