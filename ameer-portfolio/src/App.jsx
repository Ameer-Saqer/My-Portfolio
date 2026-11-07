import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { useLenis } from './hooks/useLenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import Loader from './components/Loader';
import CursorSpotlight from './components/CursorSpotlight';
import ScrollProgress from './components/ScrollProgress';
import Grain from './components/Grain';
import SectionDivider from './components/SectionDivider';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import Work from './sections/Work';
import TechStrip from './sections/TechStrip';
import About from './sections/About';
import Footer from './sections/Footer';

// Lazy-loaded heavy below-the-fold sections
const Achievements = lazy(() => import('./sections/Achievements'));
const Journey = lazy(() => import('./sections/Journey'));
const Contact = lazy(() => import('./sections/Contact'));

gsap.registerPlugin(ScrollTrigger);

function AppContent() {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const { lang, dir } = useLanguage();

  const handleLoaderComplete = useCallback(() => {
    setLoaderComplete(true);
  }, []);

  // Initialize Lenis smooth scroll bridge
  useLenis();

  // Refresh ScrollTrigger after web fonts have fully loaded
  useEffect(() => {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }
  }, []);

  // Refresh ScrollTrigger after the initial intro loader finishes and restores scroll
  useEffect(() => {
    if (loaderComplete) {
      ScrollTrigger.refresh();
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [loaderComplete]);

  // Refresh ScrollTrigger when language/dir changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);
    return () => clearTimeout(timer);
  }, [lang, dir]);

  return (
    <div className="relative min-h-screen bg-bg text-white font-sans overflow-x-clip selection:bg-accent selection:text-[#0F1B2E]">
      {/* 1. Cinematic Film Grain Overlay */}
      <Grain />

      {/* 2. Soft Gold Cursor Spotlight Glow (desktop only) */}
      <CursorSpotlight />

      {/* 3. Initial Assemble Loader (plays once) */}
      <Loader onComplete={handleLoaderComplete} />

      {/* 5. Left/Right Edge Vertical Scroll Progress Indicator */}
      <ScrollProgress />

      {/* 6. Fixed Navigation Header */}
      <Navbar />

      {/* 7. Main Portfolio Flow */}
      <main className="relative z-10 w-full overflow-x-clip">
        <Hero readyToAnimate={loaderComplete} />
        <SectionDivider />
        <Work />
        {/* Tools Marquee Strip: Clean transition between Work and Achievements */}
        <TechStrip />
        <Suspense fallback={<div className="min-h-[580px] w-full" aria-hidden="true" />}>
          <Achievements />
        </Suspense>
        <SectionDivider />
        <About />
        <SectionDivider />
        <Suspense fallback={<div className="min-h-[700px] w-full" aria-hidden="true" />}>
          <Journey />
        </Suspense>
        <SectionDivider />
        <Suspense fallback={<div className="min-h-[800px] w-full" aria-hidden="true" />}>
          <Contact />
        </Suspense>
      </main>

      {/* 8. Footer */}
      <SectionDivider />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}
