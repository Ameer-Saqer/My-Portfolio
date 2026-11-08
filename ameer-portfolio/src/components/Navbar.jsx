import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { profile } from '../data/content';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoMark from './LogoMark';

const NAV_LINKS = [
  { name: 'Work', href: '#work' },
  { name: 'Stack', href: '#stack' },
  { name: 'About', href: '#about' },
  { name: 'Journey', href: '#journey' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Scrolled styling threshold
      if (currentScrollY > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = ['work', 'stack', 'about', 'journey', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-in-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          scrolled
            ? 'bg-bg/85 backdrop-blur-md border-b border-line py-3.5'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          {/* Left: Logo Mark */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center group focus-ring rounded-lg min-h-[44px] min-w-[44px]"
            aria-label="Ameer Saqer"
          >
            <LogoMark size={36} className="w-9 h-9" />
          </a>

          {/* Center: Desktop Navigation Links (Clean, calm) */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.name.toLowerCase();
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`relative font-mono text-xs uppercase tracking-[0.2em] transition-colors py-1 focus-ring ${
                    isActive ? 'text-accent font-bold' : 'text-muted hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline in Accent Gold */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ease-out origin-left ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Available status + Let's Talk Secondary Button */}
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-2 font-mono text-xs text-muted tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              <span>{profile.status}</span>
            </div>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 min-h-[44px] inline-flex items-center rounded-full border border-accent text-xs font-mono uppercase tracking-widest text-white hover:bg-accent-soft transition-all duration-200 focus-ring"
            >
              Let's Talk ↗
            </a>
          </div>

          {/* Mobile Hamburger Button (at least 44x44px touch target) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus-ring text-2xl"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu Overlay (Navy Background) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-[#0F1B2E] flex flex-col justify-between px-7 py-8 md:hidden overflow-y-auto"
          >
            {/* Top Bar inside Overlay: Logo & Close */}
            <div className="flex items-center justify-between pb-6 border-b border-line">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center min-h-[44px] min-w-[44px]"
                aria-label="Ameer Saqer"
              >
                <LogoMark size={36} className="w-9 h-9" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-2xl rounded-lg focus-ring"
                aria-label="Close Menu"
              >
                <FiX />
              </button>
            </div>

            {/* Staggered Anton Navigation Links */}
            <div className="flex flex-col gap-4 my-auto py-6">
              {NAV_LINKS.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white hover:text-accent transition-colors min-h-[44px] flex items-center"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.45 }}
              className="flex flex-col gap-4 border-t border-line pt-6 mt-auto"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>{profile.status}</span>
                </div>
              </div>

              {/* Primary Mobile CTA: Gold background with Navy text (>= 44px) */}
              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 min-h-[44px] flex items-center justify-center bg-accent text-[#0F1B2E] font-mono text-xs font-bold uppercase tracking-widest rounded-full hover:bg-white transition-colors shadow-lg shadow-accent/20"
              >
                Let's Talk ↗
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}