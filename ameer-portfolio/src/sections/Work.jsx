import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { projects, projectCategories } from '../data/content';
import { FiArrowUpRight, FiGithub, FiExternalLink, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Project Card component with tall screenshot auto-scroll, 3D tilt and hover interactions
function ProjectCard({ project, onOpenLightbox, isHoveredSibling, onHoverStart, onHoverEnd }) {
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
        {/* Chip top-left */}
        <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md bg-bg/85 backdrop-blur-md border border-line text-xs font-mono tracking-widest text-white uppercase">
          {project.category}
        </div>

        {/* Gallery indicator chip top-right if lightbox exists (Gold with Navy text) */}
        {project.galleryCount && (
          <div className="absolute top-3 right-3 z-10 px-2.5 py-1 rounded-full bg-accent text-[#0F1B2E] text-xs font-mono font-bold tracking-wider shadow-sm">
            +{project.galleryCount - 1} PAGES
          </div>
        )}

        {/* Project Image (auto-scroll on hover or tap for tall screenshots) */}
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
            loading="lazy"
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
            <span className="font-display text-2xl sm:text-3xl text-white/40 group-hover:text-accent transition-colors duration-300">
              {project.id}
            </span>
            <div className="flex flex-col">
              <h3 className="font-sans font-bold text-sm sm:text-base text-white uppercase tracking-tight group-hover:text-white leading-tight">
                {project.title}
              </h3>
              <span className="font-mono text-xs tracking-wider text-accent/80 mt-1">
                {project.tag}
              </span>
            </div>
          </div>

          {/* Arrow top-right that rotates and fills accent on hover */}
          <div className="w-9 h-9 rounded-full border border-line group-hover:border-accent group-hover:bg-accent flex items-center justify-center transition-all duration-300 flex-shrink-0">
            <FiArrowUpRight className="text-white group-hover:text-white transition-all duration-300 transform group-hover:rotate-45" />
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-xs text-muted leading-relaxed line-clamp-2 mt-1">
          {project.description}
        </p>

        {/* Footer Row: Live link & GitHub link */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-line/50">
          <span className="font-mono text-xs uppercase tracking-widest text-dim group-hover:text-muted transition-colors">
            {project.hasLightbox ? 'CLICK TO EXPLORE' : project.live !== '#' ? 'LIVE PREVIEW' : 'SOURCE CODE'}
          </span>

          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            {project.live && project.live !== '#' && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent p-2 min-h-[44px] min-w-[44px] flex items-center justify-center transition-colors"
                title="Live Demo"
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
                title="Source Code"
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

// Fullscreen Lightbox for Kafeeli Platform gallery
function ProjectLightbox({ project, onClose }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrentIdx((prev) => (prev + 1) % project.gallery.length);
      if (e.key === 'ArrowLeft') setCurrentIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [project, onClose]);

  const titles = [
    '01 / For Organizations (إدارة الكفالات في نظام واحد)',
    '02 / How It Works (كيف تعمل كفيلي؟)',
    '03 / About Us (من نحن)',
    '04 / Contact Us (تواصل معنا)',
  ];

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
          <h4 className="font-sans text-sm sm:text-base font-bold text-white">
            {titles[currentIdx] || `Page ${currentIdx + 1}`}
          </h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="font-mono text-xs tracking-widest text-muted">
            {currentIdx + 1} / {project.gallery.length}
          </span>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full border border-line hover:border-accent hover:bg-accent hover:text-[#0F1B2E] flex items-center justify-center text-white transition-all focus-ring"
            aria-label="Close Lightbox"
          >
            <FiX className="text-xl" />
          </button>
        </div>
      </div>

      {/* Lightbox Content: Vertically scrollable single page container */}
      <div className="flex-1 relative flex items-center justify-center my-4 overflow-hidden">
        {/* Navigation Left */}
        <button
          onClick={() => setCurrentIdx((prev) => (prev - 1 + project.gallery.length) % project.gallery.length)}
          className="absolute left-2 sm:left-6 z-20 w-12 h-12 rounded-full bg-surface/80 border border-line hover:border-accent text-white flex items-center justify-center text-2xl transition-all"
          aria-label="Previous Page"
        >
          <FiChevronLeft />
        </button>

        {/* Scrollable Page Preview */}
        <div className="w-full max-w-4xl h-[70vh] sm:h-[78vh] overflow-y-auto no-scrollbar rounded-xl border border-line bg-surface/50 p-2 sm:p-4">
          <img
            key={project.gallery[currentIdx]}
            src={project.gallery[currentIdx]}
            alt={titles[currentIdx]}
            className="w-full h-auto object-top rounded-lg shadow-2xl"
          />
        </div>

        {/* Navigation Right */}
        <button
          onClick={() => setCurrentIdx((prev) => (prev + 1) % project.gallery.length)}
          className="absolute right-2 sm:right-6 z-20 w-12 h-12 rounded-full bg-surface/80 border border-line hover:border-accent text-white flex items-center justify-center text-2xl transition-all"
          aria-label="Next Page"
        >
          <FiChevronRight />
        </button>
      </div>

      {/* Lightbox Footer hint */}
      <div className="flex items-center justify-between pt-2 border-t border-line text-dim font-mono text-xs tracking-wider uppercase">
        <span>USE ARROW KEYS OR BUTTONS TO NAVIGATE · SCROLL VERTICALLY INSIDE PAGE</span>
        <span>PRESS ESC TO CLOSE</span>
      </div>
    </motion.div>
  );
}

export default function Work() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [activeLightboxProject, setActiveLightboxProject] = useState(null);

  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const filteredProjects =
    activeCategory === 'All'
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
        <SectionLabel label="01 / SELECTED WORK" />

        {/* Section Title and View All */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-line">
          <Reveal>
            <h2 className="font-display text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.9] uppercase text-white tracking-tight">
              PROJECTS THAT <span className="text-accent">SPEAK</span>
              <span className="text-accent ml-1">.</span>
            </h2>
          </Reveal>

          <a
            href="https://github.com/Ameer-Saqer"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent flex items-center gap-2 group focus-ring py-2 transition-colors"
          >
            <span>MORE ON GITHUB</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>

        {/* Filter Tabs (min 44px touch height) */}
        <div className="flex items-center gap-2 sm:gap-6 pt-6 overflow-x-auto no-scrollbar">
          {projectCategories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative min-h-[44px] px-3 py-2.5 font-mono text-xs sm:text-sm uppercase tracking-wider transition-colors whitespace-nowrap focus-ring flex items-center ${
                  isActive ? 'text-accent font-bold' : 'text-muted hover:text-white'
                }`}
              >
                <span>{category}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTabUnderline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent"
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

        {/* Drag Hint indicator on right edge */}
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-2 font-mono text-xs tracking-widest text-dim uppercase bg-surface/90 px-3 py-1.5 rounded-full border border-line">
          <span>DRAG TO SCROLL</span>
          <span className="text-accent">→</span>
        </div>
      </div>

      {/* Fullscreen Lightbox for multi-page projects */}
      <AnimatePresence>
        {activeLightboxProject && (
          <ProjectLightbox
            project={activeLightboxProject}
            onClose={() => setActiveLightboxProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
