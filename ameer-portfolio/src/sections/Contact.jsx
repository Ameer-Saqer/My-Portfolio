import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { profile, contactActionCard } from '../data/content';
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
  const [botcheck, setBotcheck] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Action card mouse tilt (max 3deg)
  const handlePosterMouseMove = (e) => {
    if (!posterRef.current) return;
    const rect = posterRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setTilt({
      x: (y / (rect.height / 2)) * -3,
      y: (x / (rect.width / 2)) * 3,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    // Spam protection: if honeypot is checked, silently show success without sending
    if (botcheck) {
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', message: '' });
      return;
    }

    if (!validate()) return;

    setSubmitting(true);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject: `New portfolio message from ${formData.name}`,
          from_name: 'Ameer Saqer Portfolio',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          botcheck: false,
        }),
      });

      const data = await res.json();

      if (data && data.success === true) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setErrorMessage("Couldn't send your message. Please try again or message me on WhatsApp.");
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage("Couldn't send your message. Please try again or message me on WhatsApp.");
    } finally {
      setSubmitting(false);
    }
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
      href: 'https://wa.me/972592161058',
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
        {/* ONE small label above the title */}
        <SectionLabel label="04 / YOUR NEXT PROJECT" />

        {/* Massive Title with proper spacing between lines */}
        <div className="mb-8">
          <Reveal>
            <h2 className="font-display text-[clamp(3.4rem,10.5vw,9.5rem)] leading-[0.95] uppercase text-white tracking-tight">
              <span>LET'S BUILD</span>
              <span className="block text-accent mt-[0.05em]">
                TOGETHER<span className="text-accent ml-1">.</span>
              </span>
            </h2>
          </Reveal>
        </div>

        {/* Subtitle & Primary Button on Left */}
        <div className="flex flex-col items-start gap-5 pb-12 mb-16 border-b border-line max-w-xl">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted">
            <span>Crafting Digital</span>
            <span className="text-accent font-bold">Experiences</span>
          </div>

          <p className="font-sans text-base sm:text-lg text-muted leading-relaxed">
            Got an idea you want to bring to life? Let's make something worth visiting.
          </p>

          <a
            href="https://wa.me/972592161058"
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-2 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white border border-accent hover:border-white transition-all duration-300 focus-ring shadow-lg shadow-accent/25 min-h-[44px]"
          >
            <span>START A CONVERSATION</span>
            <FiArrowUpRight className="text-base text-[#0F1B2E] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Top Split: Contact Info List on Left, 3D Action Card on Right */}
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
                  className="py-5 flex items-center justify-between group cursor-pointer focus-ring rounded min-h-[44px]"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-xl border border-line flex items-center justify-center text-white group-hover:bg-accent group-hover:text-[#0F1B2E] group-hover:border-accent transition-all duration-300">
                      <Icon className="text-xl" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-mono text-xs tracking-[0.22em] text-muted uppercase group-hover:text-accent transition-colors">
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

          {/* Right Column: 3D Tilting Action Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              ref={posterRef}
              onMouseMove={handlePosterMouseMove}
              onMouseLeave={handlePosterMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
                transition: 'transform 0.18s ease-out',
              }}
              className="w-full max-w-[360px] rounded-2xl bg-surface border border-[rgba(212,175,55,0.35)] p-7 sm:p-8 flex flex-col justify-between shadow-[0_0_40px_rgba(212,175,55,0.06)] relative overflow-hidden select-none hover:border-accent transition-colors"
            >
              {/* Top: Pulsing Gold Dot with Status */}
              <div className="flex items-center gap-2.5 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.85)]" />
                <span className="font-mono text-xs tracking-[0.2em] text-accent uppercase font-bold">
                  {contactActionCard.status}
                </span>
              </div>

              {/* Title: BUILD IT. SHIP IT. */}
              <div className="mb-4">
                <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-white block leading-[0.95]">
                  {contactActionCard.titleLine1}
                </span>
                <span className="font-display text-4xl sm:text-5xl uppercase tracking-tight text-accent block leading-[0.95] mt-1">
                  {contactActionCard.titleLine2}
                </span>
              </div>

              {/* Response Time */}
              <p className="font-sans text-xs sm:text-sm text-muted leading-relaxed mb-8">
                {contactActionCard.replyTime}
              </p>

              {/* Action Button: CHAT ON WHATSAPP */}
              <a
                href="https://wa.me/972592161058"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full py-3.5 px-6 rounded-xl bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-accent/20 focus-ring"
              >
                <span>{contactActionCard.cta}</span>
                <FiArrowUpRight className="text-base text-[#0F1B2E] transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Form (Underline Style) */}
        <div className="pt-12 border-t border-line">
          <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-8 block">
            TELL ME ABOUT YOUR PROJECT
          </span>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            {/* Honeypot spam protection (hidden from humans, trips bots) */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              checked={botcheck}
              onChange={(e) => setBotcheck(e.target.checked)}
            />

            {/* Name */}
            <div className="relative flex flex-col">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (errorMessage) setErrorMessage('');
                  if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="name"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase"
              >
                Your Name *
              </label>
              {errors.name && (
                <span className="font-mono text-xs text-accent mt-1">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div className="relative flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errorMessage) setErrorMessage('');
                  if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="email"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase"
              >
                Your Email *
              </label>
              {errors.email && (
                <span className="font-mono text-xs text-accent mt-1">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="relative flex flex-col">
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={(e) => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
              />
              <label
                htmlFor="phone"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase"
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
                onChange={(e) => {
                  setFormData({ ...formData, message: e.target.value });
                  if (errorMessage) setErrorMessage('');
                  if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                }}
                placeholder=" "
                className="peer w-full bg-transparent border-b border-line focus:border-accent py-3 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors resize-none"
              />
              <label
                htmlFor="message"
                className="absolute left-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs uppercase"
              >
                Project Details & Timeline *
              </label>
              {errors.message && (
                <span className="font-mono text-xs text-accent mt-1">{errors.message}</span>
              )}
            </div>

            {/* Inline Status Announcement (Success / Error) */}
            {errorMessage && (
              <div
                role="status"
                aria-live="polite"
                className="md:col-span-2 p-4 rounded-xl border border-accent/40 bg-accent-soft/20 text-white font-sans text-sm flex items-center gap-2"
              >
                <span>
                  Couldn't send your message. Please try again or message me on{' '}
                  <a
                    href={profile.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline font-semibold hover:text-white transition-colors"
                  >
                    WhatsApp
                  </a>
                  .
                </span>
              </div>
            )}

            {submitted && (
              <div
                role="status"
                aria-live="polite"
                className="md:col-span-2 p-4 rounded-xl border border-accent/40 bg-accent-soft/20 text-white font-sans text-sm flex items-center gap-2"
              >
                <FiCheck className="text-accent text-base flex-shrink-0" />
                <span>Thank you! Your message has been sent successfully.</span>
              </div>
            )}

            {/* Submit Button: Gold background with NAVY text, hover = white background navy text */}
            <div className="md:col-span-2 pt-4 flex items-center justify-between">
              <div ref={magneticBtnRef}>
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className="group px-8 py-4 rounded-full bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white border border-accent hover:border-white transition-all duration-300 focus-ring flex items-center gap-3 disabled:opacity-50 shadow-lg shadow-accent/25 min-h-[44px]"
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

              <span className="font-mono text-xs tracking-wider text-dim">
                SECURE & DIRECT TRANSMISSION
              </span>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
