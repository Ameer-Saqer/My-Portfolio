import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../i18n/LanguageContext';
import { FiMenu, FiX } from 'react-icons/fi';
import LogoMark from './LogoMark';

function LanguageToggle({ className = '', onSelect }) {
  const { lang, setLang } = useLanguage();

  const handleSelect = (newLang) => {
    if (newLang !== lang) {
      setLang(newLang);
      if (onSelect) onSelect();
    }
  };

  return (
    <div
      role="group"
      aria-label={lang === 'ar' ? 'التبديل بين اللغات' : 'Language switcher'}
      className={`inline-flex items-center rounded-full border border-line bg-white/[0.03] p-0.5 text-xs font-mono backdrop-blur-sm ${className}`}
    >
      <button
        type="button"
        onClick={() => handleSelect('en')}
        aria-pressed={lang === 'en'}
        aria-label="Switch language to English"
        className={`px-2.5 py-1 min-h-[32px] rounded-full transition-all duration-200 uppercase tracking-wider focus-ring ${
          lang === 'en'
            ? 'bg-accent/15 text-accent font-bold shadow-[0_0_10px_rgba(212,175,55,0.25)] border border-accent/40'
            : 'text-muted hover:text-white'
        }`}
      >
        EN
      </button>
      <span className="text-white/20 select-none px-0.5 text-[11px]" aria-hidden="true">|</span>
      <button
        type="button"
        onClick={() => handleSelect('ar')}
        aria-pressed={lang === 'ar'}
        aria-label="التبديل إلى العربية"
        className={`px-2.5 py-1 min-h-[32px] rounded-full transition-all duration-200 font-sans font-semibold focus-ring ${
          lang === 'ar'
            ? 'bg-accent/15 text-accent font-bold shadow-[0_0_10px_rgba(212,175,55,0.25)] border border-accent/40'
            : 'text-muted hover:text-white'
        }`}
      >
        ع
      </button>
    </div>
  );
}

export default function Navbar() {
  const { lang, t, sx } = useLanguage();

  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState('work');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Final 3 links: WORK · ABOUT · JOURNEY (الأعمال · عنّي · المسيرة)
  const navLinks = [
    { id: 'work', name: t('nav.work'), href: '#work' },
    { id: 'about', name: t('nav.about'), href: '#about' },
    { id: 'journey', name: t('nav.journey'), href: '#journey' },
  ];

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

      // Active section detection for the 3 main sections
      const sections = ['work', 'about', 'journey'];
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
        className={`fixed top-0 start-0 end-0 z-40 transition-transform duration-300 ease-in-out ${
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
            href={lang === 'ar' ? '/ar' : '/'}
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
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`relative font-mono rtl:font-['Cairo'] rtl:font-bold text-xs uppercase rtl:normal-case tracking-[0.2em] rtl:tracking-normal transition-colors py-1 focus-ring ${
                    isActive ? 'text-accent font-bold' : 'text-muted hover:text-white'
                  }`}
                >
                  <span>{link.name}</span>
                  {/* Underline in Accent Gold */}
                  <span
                    className={`absolute bottom-0 start-0 h-[2px] bg-accent transition-all duration-300 ease-out origin-start ${
                      isActive ? 'w-full' : 'w-0 hover:w-full'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Right: Language toggle + Let's Talk Action Button */}
          <div className="hidden lg:flex items-center gap-5">
            <LanguageToggle />

            <a
              href="#contact"
              className="px-4 py-2.5 min-h-[44px] inline-flex items-center gap-1.5 rounded-full border border-accent text-xs font-mono rtl:font-['Cairo'] rtl:font-bold uppercase rtl:normal-case tracking-widest rtl:tracking-normal text-white hover:bg-accent-soft transition-all duration-200 focus-ring"
            >
              <span>{t('nav.letsTalk')}</span>
              <span className="inline-block transition-transform rtl:-scale-x-100" aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Mobile Right Controls: Language toggle next to Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageToggle />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg focus-ring text-2xl"
              aria-label={mobileMenuOpen ? t('nav.closeMenu') : t('nav.toggleMenu')}
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
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
            className="fixed inset-0 z-50 bg-[#0F1B2E] flex flex-col justify-between px-7 py-8 lg:hidden overflow-y-auto"
          >
            {/* Top Bar inside Overlay: Logo, Language Toggle & Close */}
            <div className="flex items-center justify-between pb-6 border-b border-line">
              <a
                href={lang === 'ar' ? '/ar' : '/'}
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

              <div className="flex items-center gap-3">
                <LanguageToggle onSelect={() => setMobileMenuOpen(false)} />
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-11 h-11 min-w-[44px] min-h-[44px] flex items-center justify-center text-white text-2xl rounded-lg focus-ring"
                  aria-label={t('nav.closeMenu')}
                >
                  <FiX />
                </button>
              </div>
            </div>

            {/* Staggered Navigation Links: exactly the 3 links */}
            <div className="flex flex-col gap-6 my-auto py-6">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ opacity: 0, x: -30 * sx }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + idx * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display rtl:font-['Cairo'] rtl:font-bold text-4xl sm:text-5xl uppercase rtl:normal-case tracking-tight rtl:tracking-normal text-white hover:text-accent transition-colors min-h-[44px] flex items-center"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Bottom: Only the primary CTA button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="flex flex-col border-t border-line pt-6 mt-auto"
            >
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-3.5 min-h-[44px] flex items-center justify-center gap-2 bg-accent text-[#0F1B2E] font-mono rtl:font-['Cairo'] rtl:font-bold text-xs font-bold uppercase rtl:normal-case tracking-widest rtl:tracking-normal rounded-full hover:bg-white transition-colors shadow-lg shadow-accent/20"
              >
                <span>{t('nav.letsTalk')}</span>
                <span className="inline-block transition-transform rtl:-scale-x-100" aria-hidden="true">↗</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
