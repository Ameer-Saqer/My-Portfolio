import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useLanguage, useContent } from '../i18n/LanguageContext';

// Fullscreen Lightbox for Kafeeli Platform gallery
export default function ProjectLightbox({ project, onClose }) {
  const { lang, dir, t } = useLanguage();
  const { lightboxTitles } = useContent();
  const [currentIdx, setCurrentIdx] = useState(0);

  const titles = lightboxTitles || [
    '01 / For Organizations',
    '02 / How It Works',
    '03 / About Us',
    '04 / Contact Us',
  ];

  const goNext = () => setCurrentIdx((prev) => (prev + 1) % project.gallery.length);
  const goPrev = () => setCurrentIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        if (dir === 'rtl') goPrev();
        else goNext();
      }
      if (e.key === 'ArrowLeft') {
        if (dir === 'rtl') goNext();
        else goPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose, dir]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-bg-deep/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
    >
      {/* Lightbox Header */}
      <div className="flex items-center justify-between border-b border-line pb-4 z-20">
        <div>
          <span className="font-mono text-xs tracking-widest text-accent uppercase">
            {project.title}
          </span>
          <h4 className="font-sans text-sm sm:text-base font-bold text-white mt-0.5">
            {titles[currentIdx] || `Page ${currentIdx + 1}`}
          </h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-muted" dir="ltr">
            {currentIdx + 1} / {project.gallery.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-line hover:border-accent hover:bg-accent hover:text-[#0F1B2E] flex items-center justify-center text-white transition-all focus-ring"
            aria-label={t('lightbox.closeAria')}
          >
            <FiX className="text-xl" />
          </button>
        </div>
      </div>

      {/* Lightbox Content: Vertically scrollable single page container */}
      <div className="flex-1 relative flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Previous (Start edge) */}
        <button
          onClick={goPrev}
          className="absolute start-2 sm:start-6 z-20 w-12 h-12 rounded-full bg-surface/80 border border-line hover:border-accent text-white flex items-center justify-center text-2xl transition-all focus-ring"
          aria-label={t('lightbox.prevAria')}
        >
          {dir === 'rtl' ? <FiChevronRight /> : <FiChevronLeft />}
        </button>

        {/* Scrollable Page Preview */}
        <div className="w-full max-w-4xl h-[70vh] sm:h-[78vh] overflow-y-auto no-scrollbar rounded-xl border border-line bg-surface/50 p-2 sm:p-4">
          <img
            key={project.gallery[currentIdx]}
            src={project.gallery[currentIdx]}
            alt={titles[currentIdx] || `Page ${currentIdx + 1}`}
            width="1280"
            height="800"
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-top rounded-lg shadow-2xl"
          />
        </div>

        {/* Navigation Next (End edge) */}
        <button
          onClick={goNext}
          className="absolute end-2 sm:end-6 z-20 w-12 h-12 rounded-full bg-surface/80 border border-line hover:border-accent text-white flex items-center justify-center text-2xl transition-all focus-ring"
          aria-label={t('lightbox.nextAria')}
        >
          {dir === 'rtl' ? <FiChevronLeft /> : <FiChevronRight />}
        </button>
      </div>

      {/* Lightbox Footer hint */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-line text-dim font-mono text-xs tracking-wider uppercase">
        <span>{t('lightbox.useKeys')}</span>
        <span>{t('lightbox.pressEsc')}</span>
      </div>
    </motion.div>
  );
}
