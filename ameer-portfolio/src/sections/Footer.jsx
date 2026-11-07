import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage, useContent } from '../i18n/LanguageContext';
import LogoMark from '../components/LogoMark';
import {
  FiGithub,
  FiLinkedin,
  FiFacebook,
  FiInstagram,
  FiArrowUp,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const { lang, t } = useLanguage();
  const { profile } = useContent();

  const footerRef = useRef(null);
  const bigWordRef = useRef(null);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) return;

    const ctx = gsap.context(() => {
      if (bigWordRef.current) {
        gsap.to(bigWordRef.current, {
          y: -40,
          ease: 'none',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top bottom',
            end: 'bottom bottom',
            scrub: true,
          },
        });
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { name: 'WhatsApp', href: profile.socials.whatsapp, icon: FaWhatsapp },
    { name: 'LinkedIn', href: profile.socials.linkedin, icon: FiLinkedin },
    { name: 'GitHub', href: profile.socials.github, icon: FiGithub },
    { name: 'Instagram', href: profile.socials.instagram, icon: FiInstagram },
    { name: 'Facebook', href: profile.socials.facebook, icon: FiFacebook },
  ];

  return (
    <footer
      ref={footerRef}
      className="relative bg-bg-deep text-white pt-20 pb-10 px-5 sm:px-8 lg:px-14 border-t border-line overflow-hidden select-none"
    >
      <div className="max-w-7xl mx-auto flex flex-col justify-between relative z-10">
        {/* Main Footer Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-16">
          {/* Start: Brand, Tagline & Copyright */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href={lang === 'ar' ? '/ar' : '/'}
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center group focus-ring rounded-lg mb-1"
              aria-label="Ameer Saqer"
            >
              <LogoMark size={36} className="w-9 h-9" />
            </a>
            {/* Tagline */}
            <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-muted">
              <span>{t('footer.tagline1')}</span>
              <span className="text-accent font-semibold">{t('footer.tagline2')}</span>
            </div>
            <p className="font-mono text-xs text-muted tracking-wider">
              © 2026 {profile.name} — {t('footer.rights')}
            </p>
          </div>

          {/* Center: Social Icons */}
          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border border-line flex items-center justify-center text-white/80 hover:text-[#0F1B2E] hover:bg-accent hover:border-accent transition-all duration-300 focus-ring shadow-sm"
                >
                  <Icon className="text-base" />
                </a>
              );
            })}
          </div>

          {/* End: Back to top */}
          <button
            onClick={scrollToTop}
            className="min-h-[44px] flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors group focus-ring px-3 py-2"
          >
            <span>{t('footer.backToTop')}</span>
            <div className="w-7 h-7 rounded-full border border-line group-hover:border-accent group-hover:bg-accent-soft flex items-center justify-center transition-colors">
              <FiArrowUp className="text-xs transform group-hover:-translate-y-0.5 transition-transform text-white group-hover:text-accent" />
            </div>
          </button>
        </div>
      </div>

      {/* Huge Faded Background Word AMEER cropped at bottom edge */}
      <div
        ref={bigWordRef}
        aria-hidden="true"
        className="pointer-events-none relative w-full overflow-hidden text-center -mb-8 sm:-mb-14 text-accent opacity-[0.06] will-change-transform"
      >
        <span className="font-display text-[26vw] leading-[0.7] uppercase tracking-tighter text-white inline-block">
          {profile.brand}
        </span>
      </div>
    </footer>
  );
}
