import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { profile } from '../data/content';
import { useMagnetic } from '../hooks/useMagnetic';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight, FiCheck } from 'react-icons/fi';

export default function Contact() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  // 3D tilt poster card
  const posterRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const magneticBtnRef = useMagnetic(0.35, 60);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Poster card mouse tilt
  const handlePosterMouseMove = (e) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -6,
      y: (x / (rect.width / 2)) * 6,
    });
  };

  const handlePosterMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Form validation & submission
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    // TODO: Wire your EmailJS or Formspree service here:
    // e.g., emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
    setTimeout(() => {
      // Fallback: opens mail client with prefilled fields
      const mailtoUrl = `mailto:${profile.email}?subject=Project inquiry from ${encodeURIComponent(
        formData.name
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;

      setSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }, 600);
  };

  const contactLinks = [
    {
      label: 'EMAIL',
      val: profile.email,
      href: `mailto:${profile.email}`,
      icon: FiMail,
    },
    {
      label: 'PHONE / WHATSAPP',
      val: profile.phone,
      href: profile.whatsapp,
      icon: FiPhone,
    },
    {
      label: 'GITHUB',
      val: 'github.com/Ameer-Saqer',
      href: profile.socials.github,
      icon: FiGithub,
    },
    {
      label: 'LINKEDIN',
      val: 'linkedin.com/in/ameer-saqer-59243b264',
      href: profile.socials.linkedin,
      icon: FiLinkedin,
    },
    {
      label: 'INSTAGRAM',
      val: '@ameer_saqer_',
      href: profile.socials.instagram,
      icon: FiInstagram,
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 sm:py-36 bg-bg border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <SectionLabel label="04 / YOUR NEXT PROJECT" />

        {/* Tagline */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-muted mb-4">
          <span>Crafting Digital</span>
          <span className="text-accent font-bold">Experiences</span>
        </div>

        {/* Massive Title */}
        <div className="mb-8">
          <Reveal>
            <h2 className="font-display text-[clamp(3.4rem,10.5vw,9.5rem)] leading-[0.88] uppercase text-white tracking-tight">
              LET'S BUILD<br />
              <span className="text-accent">TOGETHER</span>
              <span className="text-accent ml-1">.</span>
            </h2>
          </Reveal>
        </div>

        {/* Subtitle & Direct Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-12 mb-16 border-b border-line">
          <p className="font-sans text-base sm:text-lg text-muted max-w-lg leading-relaxed">
            Got an idea you want to bring to life? Let's make something worth visiting.
          </p>

          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent hover:text-white py-2 border-b border-accent focus-ring whitespace-nowrap transition-colors"
          >
            <span>START A CONVERSATION</span>
            <FiArrowUpRight className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* Top Split: Contact Info List on Left, 3D Poster Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Contact Rows */}
          <div className="lg:col-span-7 flex flex-col divide-y divide-line">
            {contactLinks.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="py-5 flex items-center justify-between group cursor-pointer focus-ring rounded"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl border border-line flex items-center justify-center text-white group-hover:bg-accent group-hover:text-[#0F1B2E] group-hover:border-accent transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase group-hover:text-accent transition-colors">
                        {item.label}
                      </span>
                      <span className="font-sans text-sm sm:text-base font-semibold text-white group-hover:text-accent transition-colors">
                        {item.val}
                      </span>
                    </div>
                  </div>

                  <FiArrowUpRight className="text-muted group-hover:text-accent transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                </motion.a>
              );
            })}
          </div>

          {/* Right Column: 3D Tilting Poster Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={posterRef}
              onMouseMove={handlePosterMouseMove}
              onMouseLeave={handlePosterMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.15s ease-out',
              }}
              className="w-full max-w-[340px] rounded-2xl bg-surface border border-line p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden select-none hover:border-accent/60 transition-colors"
            >
              {/* Top Tag */}
              <div className="flex items-center justify-between font-mono text-[10px] tracking-widest text-muted uppercase mb-8">
                <span>PREVIEW</span>
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              </div>

              {/* Big Stacked Text */}
              <div className="my-4">
                <span className="font-display text-5xl uppercase tracking-tight text-white block leading-none">
                  BUILD IT.
                </span>
                <span className="font-display text-5xl uppercase tracking-tight text-accent block leading-none mt-1">
                  SHIP IT.
                </span>
              </div>

              {/* Mini Looping Thumbnail */}
              <div className="w-full h-36 rounded-xl overflow-hidden border border-line bg-navy-deep/60 mt-6 relative">
                <img
                  src="/projects/ocean.webp"
                  alt="Mini project preview"
                  className="w-full h-full object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Form (Underline Style) */}
        <div className="pt-12 border-t border-line">
          <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-8 block">
            TELL ME ABOUT YOUR PROJECT
          </span>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {/* Name */}
            <div className="relative flex flex-col">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase"
              >
                Your Name *
              </label>
              {errors.name && (
                <span className="font-mono text-[10px] text-accent mt-1">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="relative flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase"
              >
                Your Email *
              </label>
              {errors.email && (
                <span className="font-mono text-[10px] text-accent mt-1">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="relative flex flex-col">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase"
              >
                Phone Number (optional)
              </label>
            </div>

            {/* Message */}
            <div className="relative flex flex-col md:col-span-2">
              <textarea
                id="message"
                name="message"
                rows="3"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-[10px] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-[10px] uppercase"
              >
                Project Details & Timeline *
              </label>
              {errors.message && (
                <span className="font-mono text-[10px] text-accent mt-1">{errors.message}</span>
              )}
            </div>

            {/* Submit Button: Gold background with NAVY text, hover = white background navy text */}
            <div className="md:col-span-2 pt-4 flex items-center justify-between">
              <div ref={magneticBtnRef}>
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="group px-8 py-4 rounded-full bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white border border-accent hover:border-white transition-all duration-300 focus-ring flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-accent/25"
                >
                  {submitted ? (
                    <>
                      <FiCheck className="text-base text-[#0F1B2E]" />
                      <span className="text-[#0F1B2E]">Message Sent</span>
                    </>
                  ) : submitting ? (
                    <span className="text-[#0F1B2E]">Sending...</span>
                  ) : (
                    <>
                      <span className="text-[#0F1B2E]">Send Message</span>
                      <span className="text-[#0F1B2E] transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </>
                  )}
                </button>
              </div>

              <span className="font-mono text-[10px] tracking-wider text-dim">
                SECURE & DIRECT TRANSMISSION
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
