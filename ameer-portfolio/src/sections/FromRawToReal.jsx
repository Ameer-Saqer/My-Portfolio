import React from 'react';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import CompareSlider from '../components/CompareSlider';

export default function FromRawToReal() {
  return (
    <section className="relative py-28 sm:py-36 bg-bg-deep overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label="A LOOK UNDER THE SURFACE" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Text */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[0.92] uppercase text-white tracking-tight mb-6">
                FROM RAW.<br />
                <span className="text-accent">TO REAL</span>
                <span className="text-accent ml-1">.</span>
              </h2>
            </Reveal>

            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed mb-8 max-w-md">
              One page. Layers of work. Drag to watch a raw HTML wireframe skeleton turn into a polished, production-ready interface.
            </p>

            {/* Meta Tags */}
            <div className="flex flex-col gap-2 border-l-2 border-accent pl-4 py-1">
              <span className="font-mono text-xs text-white uppercase tracking-widest">
                OCEAN LANDING PAGE / 2025
              </span>
              <span className="font-mono text-[11px] text-accent/80 tracking-wider">
                REACT · TAILWIND CSS · FRAMER MOTION
              </span>
            </div>

            <div className="mt-8 flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-dim uppercase">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>DRAG TO SEE THE PROCESS</span>
            </div>
          </div>

          {/* Right Column: Compare Slider + Peeking Stage Card */}
          <div className="lg:col-span-7 relative flex items-center">
            <div className="w-full">
              <CompareSlider
                rawImage="/compare/raw.webp"
                finalImage="/compare/final.webp"
              />
            </div>

            {/* Peeking Next Stage Card */}
            <div
              aria-hidden="true"
              className="hidden xl:block absolute -right-24 top-6 bottom-6 w-20 rounded-2xl bg-surface border border-line opacity-30 pointer-events-none overflow-hidden"
            >
              <img
                src="/projects/auto.webp"
                alt="Next Stage Preview"
                className="w-full h-full object-cover filter grayscale contrast-125"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
