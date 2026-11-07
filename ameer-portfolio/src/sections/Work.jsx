import React, { useState, useRef, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { useLanguage, useContent } from '../i18n/LanguageContext';
import { FiArrowUpRight, FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectLightbox = lazy(() => import('../components/ProjectLightbox'));

// Project Card component with tall screenshot auto-scroll, 3D tilt and hover interactions
function ProjectCard({ project, onOpenLightbox, isHoveredSibling, onHoverStart, onHoverEnd }) {
  const { dir, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const [scrollDistance, setScrollDistance] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const isScrolling = (isHovered || isTapped) && project.isTall;

  // Calculate vertical travel for tall screenshots
  useEffect(() => {
    if (project.isTall && imgRef.current) {
      const img = imgRef.current;
      const updateDistance = () => {
        const h = img.naturalHeight || img.offsetHeight;
        const containerH = 260; // Card image container height
        if (h > containerH * 1.2) {
          const ratio = img.offsetWidth / (img.naturalWidth || 1);
          const scaledH = h * ratio;
          setScrollDistance(Math.max(0, scaledH - containerH));
        }
      };
      if (img.complete) updateDistance();
      img.onload = updateDistance;
    }
  }, [project.isTall]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    onHoverStart?.();
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const normX = x / rect.width;
    const normY = y / rect.height;
    // 3D tilt reduced to max 3deg
    setTilt({
      x: (normY - 0.5) * -6,
      y: (normX - 0.5) * 6,
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsTapped(false);
    setTilt({ x: 0, y: 0 });
    onHoverEnd?.();
  };

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{
        opacity: isHoveredSibling ? 0.55 : 1,
        y: 0,
        scale: 1,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: isHovered ? 'transform 0.15s ease-out' : 'transform 0.5s ease-out',
      }}
      className="group relative flex-shrink-0 w-[86vw] sm:w-[360px] lg:w-[410px] rounded-2xl bg-surface border border-line p-4 transition-all duration-500 hover:border-accent hover:shadow-[0_0_25px_rgba(212,175,55,0.12)] select-none cursor-pointer flex flex-col justify-between overflow-hidden"
      onClick={() => {
        if (project.hasLightbox) {
          onOpenLightbox?.(project);
        } else if (project.live && project.live !== '#') {
          window.open(project.live, '_blank', 'noopener,noreferrer');
        } else if (project.repo) {
          window.open(project.repo, '_blank', 'noopener,noreferrer');
        }
      }}
    >
      {/* 4:3 Image Container with clipping */}
      <div className="relative w-full h-[230px] sm:h-[260px] rounded-xl overflow-hidden bg-navy-deep/70 mb-4">
        {/* Chip top-start */}
        <div className="absolute top-3 start-3 z-10 px-2.5 py-1 rounded-md bg-bg/85 backdrop-blur-md border border-line text-xs font-mono tracking-widest text-white uppercase">
          {project.category}
        </div>

        {/* Gallery indicator chip top-end if lightbox exists */}
        {project.galleryCount && (
          <div className="absolute top-3 end-3 z-10 px-2.5 py-1 rounded-full bg-accent text-[#0F1B2E] text-xs font-mono font-bold tracking-wider shadow-sm flex items-center gap-1" dir="ltr">
            <span>+{project.galleryCount - 1}</span>
            <span>{t('work.pages')}</span>
          </div>
        )}

        {/* Project Image */}
        <div
          className="w-full h-full overflow-hidden relative cursor-pointer"
          onClick={(e) => {
            if (project.isTall && (window.innerWidth < 1024 || window.matchMedia('(pointer: coarse)').matches)) {
              e.stopPropagation();
              setIsTapped((prev) => !prev);
            }
          }}
        >
          <img
            ref={imgRef}
            src={project.image}
            alt={project.title}
            width="820"
            height="820"
            loading="lazy"
            decoding="async"
            className={`w-full block transition-all duration-700 ease-out filter grayscale contrast-[1.05] group-hover:grayscale-0 ${
              isTapped ? 'grayscale-0' : ''
            } ${
              project.isMockup ? 'scale-[1.18] object-cover object-center' : 'object-cover object-top'
            } ${!project.isTall ? 'h-full group-hover:scale-105' : ''}`}
            style={{
              transform:
                project.isTall && isScrolling && scrollDistance > 0
                  ? `translateY(-${Math.min(scrollDistance, 750)}px)`
                  : 'translateY(0px)',
              transitionDuration: isScrolling && project.isTall ? '8s' : '0.8s',
              transitionTimingFunction: isScrolling ? 'linear' : 'ease-out',
            }}
          />
        </div>

        {/* Navy overlay that lifts on hover */}
        <div className="absolute inset-0 bg-navy-deep/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
      </div>

      {/* Card Info Details */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-2xl sm:text-3xl text-white/40 group-hover:text-accent transition-colors duration-300" dir="ltr">
              {project.id}
            </span>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-sm sm:text-base text-white uppercase rtl:normal-case tracking-tight rtl:tracking-normal group-hover:text-white leading-tight">
                {project.title}
              </h3>
              <span className="font-mono rtl:font-sans text-xs tracking-wider rtl:tracking-normal text-accent/80 mt-1">
                <bdi>{project.tag}</bdi>
              </span>
            </div>
          </div>

          {/* Arrow top-end that rotates and fills accent on hover */}
          <div className="w-9 h-9 rounded-full border border-line group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-300 flex-shrink-0">
            <FiArrowUpRight className="text-white group-hover:text-[#0F1B2E] transition-all duration-300 transform group-hover:rotate-45 rtl:-scale-x-100 rtl:group-hover:-rotate-45" />
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-xs text-muted leading-relaxed line-clamp-2 mt-1">
          {project.description}
        </p>

        {/* Footer Row: Status & external links */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-line/50">
          <span className="font-mono text-xs uppercase tracking-widest text-dim group-hover:text-muted transition-colors">
            {project.hasLightbox
              ? t('work.clickToExplore')
              : project.live && project.live !== '#'
              ? t('work.livePreview')
              : t('work.sourceCode')}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                title={t('work.livePreview')}
                aria-label={t('work.livePreview')}
              >
                <FiExternalLink className="text-base" />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                title={t('work.sourceCode')}
                aria-label={t('work.sourceCode')}
              >
                <FiGithub className="text-base" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const { dir, t } = useLanguage();
  const { projects, projectCategories } = useContent();

  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeLightboxProject, setActiveLightboxProject] = useState(null);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const activeCategory = projectCategories[activeCategoryIndex] || projectCategories[0];
  const filteredProjects =
    activeCategoryIndex === 0
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  // Mouse drag-to-scroll implementation
  const handleMouseDown = (e) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <section id="work" className="relative py-28 sm:py-36 bg-bg-deep overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 mb-10">
        <SectionLabel label={t('sectionLabels.work')} />

        {/* Section Title and View All */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <Reveal>
            <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.9] uppercase text-white tracking-tight">
              {t('work.titleLine1')}{' '}
              <span className="text-accent">{t('work.titleLine2')}</span>
              <span className="text-accent ms-1">.</span>
            </h2>
          </Reveal>

          <a
            href="https://github.com/Ameer-Saqer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent flex items-center gap-2 group focus-ring py-2 transition-colors"
          >
            <span>{t('work.moreOnGithub')}</span>
            <span className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform rtl:-scale-x-100">
              →
            </span>
          </a>
        </div>

        {/* Filter Tabs (min 44px touch height) */}
        <div className="flex items-center gap-2 sm:gap-6 pt-6 overflow-x-auto no-scrollbar">
          {projectCategories.map((category, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={category}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`relative min-h-[44px] px-3 py-2.5 font-mono rtl:font-['Cairo'] rtl:font-bold text-xs sm:text-sm uppercase rtl:normal-case tracking-wider rtl:tracking-normal transition-colors whitespace-nowrap focus-ring flex items-center ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-white'
                }`}
              >
                <span>{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 start-0 end-0 h-[2px] bg-accent"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Horizontal Drag & Touch Slider */}
      <div className="w-full relative">
        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseLeave={handleMouseLeave}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar px-5 sm:px-8 lg:px-14 cursor-grab active:cursor-grabbing pb-8 pt-2 touch-pan-x overscroll-x-contain scroll-smooth"
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                isHoveredSibling={hoveredCardId !== null && hoveredCardId !== project.id}
                onHoverStart={() => setHoveredCardId(project.id)}
                onHoverEnd={() => setHoveredCardId(null)}
                onOpenLightbox={(p) => setActiveLightboxProject(p)}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Drag Hint indicator on end edge */}
        <div className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 font-mono text-xs tracking-widest text-dim uppercase bg-surface/90 px-3 py-1.5 rounded-full border border-line">
          <span>{t('work.dragToScroll')}</span>
          <span className="text-accent rtl:-scale-x-100">→</span>
        </div>
      </div>

      {/* Fullscreen Lightbox for multi-page projects (Lazy Loaded) */}
      <AnimatePresence>
        {activeLightboxProject && (
          <Suspense fallback={null}>
            <ProjectLightbox
              project={activeLightboxProject}
              onClose={() => setActiveLightboxProject(null)}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </section>
  );
}
