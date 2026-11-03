import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function BigMarquee({ text = "REACT • TAILWIND • CLEAN CODE • PIXEL PERFECT • " }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let velocityMultiplier = 1;
    let direction = 1;
    let currentX = 0;
    let animationFrameId = null;
    let isVisible = false;

    // ScrollTrigger to detect scroll velocity & direction reversal
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        direction = self.direction === -1 ? -1 : 1;
        const vel = Math.min(Math.abs(self.getVelocity() / 500), 2.0);
        velocityMultiplier = 1 + vel;
      },
    });

    // Pause when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animationFrameId) {
          loop();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    const loop = () => {
      if (!isVisible) {
        animationFrameId = null;
        return;
      }

      // Base movement speed (calm and slow)
      const baseSpeed = 0.45 * velocityMultiplier * direction;
      currentX -= baseSpeed;

      const singleWidth = track.scrollWidth / 2;
      if (currentX <= -singleWidth) {
        currentX = 0;
      } else if (currentX >= 0) {
        currentX = -singleWidth;
      }

      track.style.transform = `translate3d(${currentX}px, 0, 0)`;

      // Smoothly interpolate back to base speed
      velocityMultiplier = gsap.utils.interpolate(velocityMultiplier, 1, 0.04);

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      st.kill();
    };
  }, []);

  const items = Array(4).fill(text);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full py-6 sm:py-10 bg-bg-deep overflow-hidden select-none border-y border-line pointer-events-none"
    >
      {/* Edge gradient fade masks */}
      <div className="absolute top-0 bottom-0 left-0 w-20 sm:w-36 z-10 bg-gradient-to-r from-bg-deep to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-20 sm:w-36 z-10 bg-gradient-to-l from-bg-deep to-transparent" />

      <div className="flex overflow-hidden">
        <div ref={trackRef} className="flex whitespace-nowrap will-change-transform">
          {items.map((str, idx) => (
            <span
              key={idx}
              className="font-display text-5xl sm:text-7xl lg:text-9xl uppercase tracking-tighter outline-text opacity-75 px-4"
              style={{
                WebkitTextStroke: '1.2px rgba(212, 175, 55, 0.32)',
              }}
            >
              REACT <span className="text-accent">•</span> TAILWIND <span className="text-accent">•</span> CLEAN CODE <span className="text-accent">•</span> PIXEL PERFECT <span className="text-accent">•</span>{' '}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

