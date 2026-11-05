import React from "react";
import SectionLabel from "../components/SectionLabel";
import Reveal from "../components/Reveal";
import CompareSlider from "../components/CompareSlider";
import { projects } from "../data/content";

export default function FromRawToReal() {
  const oceanProject = projects.find((p) => p.id === "04") || projects[3];

  return (
    <section className="relative py-24 sm:py-32 bg-bg-deep overflow-hidden border-t border-line">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label="A LOOK UNDER THE SURFACE" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column Text (~35-40% width on desktop) */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col items-start">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,5.5vw,4.8rem)] leading-[0.92] uppercase text-white tracking-tight mb-6">
                FROM RAW.
                <br />
                <span className="text-accent">TO REAL</span>
                <span className="text-accent ml-1">.</span>
              </h2>
            </Reveal>

            <p className="font-sans text-sm sm:text-base text-muted leading-relaxed mb-8 max-w-md">
              One page. Layers of work. Drag to watch a raw HTML wireframe
              skeleton turn into a polished, production-ready interface.
            </p>

            {/* Meta Tags reading real project data */}
            <div className="flex flex-col gap-2 border-l-2 border-accent pl-4 py-1">
              <span className="font-mono text-xs text-white uppercase tracking-widest font-semibold">
                OCEAN LANDING PAGE / {oceanProject.year}
              </span>
              <span className="font-mono text-xs text-accent tracking-wider font-semibold">
                {oceanProject.techStack
                  ? oceanProject.techStack.join(" · ")
                  : "HTML5 · CSS3 · JAVASCRIPT"}
              </span>
            </div>

            {/* Hint Indicator */}
            <div className="mt-8 flex items-center gap-3 font-mono text-xs tracking-[0.2em] text-dim uppercase">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span>DRAG TO SEE THE PROCESS</span>
            </div>
          </div>

          {/* Right Column: Single Large Compare Slider (~60-65% width on desktop, 100% on mobile) */}
          <div className="lg:col-span-7 xl:col-span-8 relative flex items-center w-full">
            <div className="w-full">
              <CompareSlider image="/compare/final.webp" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
