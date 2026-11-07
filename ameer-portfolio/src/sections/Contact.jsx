import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionLabel from '../components/SectionLabel';
import Reveal from '../components/Reveal';
import { useLanguage, useContent } from '../i18n/LanguageContext';
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiInstagram, FiArrowUpRight, FiCheck } from 'react-icons/fi';

export default function Contact() {
  const { lang, t } = useLanguage();
  const { profile } = useContent();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.15 });

  useEffect(() => {
    ScrollTrigger.refresh();
  }, []);

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

  // Form validation & submission
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = t('contact.nameRequired');
    if (!formData.email.trim()) {
      newErrors.email = t('contact.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('contact.emailInvalid');
    }
    if (!formData.message.trim()) newErrors.message = t('contact.messageRequired');
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
      const subject =
        lang === 'ar'
          ? `رسالة جديدة من الموقع: ${formData.name}`
          : `New portfolio message from ${formData.name}`;

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: profile.web3formsKey,
          subject,
          from_name: 'Ameer Saqer Portfolio',
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          language: lang,
          botcheck: false,
        }),
      });

      const data = await res.json();

      if (data && data.success === true) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
      } else {
        setErrorMessage(t('contact.errorMessage'));
      }
    } catch (err) {
      console.error('Submission error:', err);
      setErrorMessage(t('contact.errorMessage'));
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfoBlock = (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col gap-4">
        {/* Email row */}
        <a
          href={`mailto:${profile.email}`}
          className="flex items-center gap-3.5 text-muted hover:text-accent transition-colors group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-xl border border-line flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-[#0F1B2E] transition-all duration-300 flex-shrink-0">
            <FiMail className="text-base" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              {t('contact.emailLabel')}
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors truncate" dir="ltr">
              {profile.email}
            </span>
          </div>
        </a>

        {/* Phone row */}
        <a
          href={`tel:${profile.phone.replace(/\s+/g, '')}`}
          className="flex items-center gap-3.5 text-muted hover:text-accent transition-colors group min-h-[44px]"
        >
          <div className="w-10 h-10 rounded-xl border border-line flex items-center justify-center text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-[#0F1B2E] transition-all duration-300 flex-shrink-0">
            <FiPhone className="text-base" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-mono text-[10px] tracking-widest text-muted uppercase">
              {t('contact.phoneLabel')}
            </span>
            <span className="font-sans text-xs sm:text-sm font-semibold text-white group-hover:text-accent transition-colors truncate" dir="ltr">
              {profile.phone}
            </span>
          </div>
        </a>
      </div>

      {/* 3 Round Social Icon Buttons */}
      <div className="flex items-center gap-3 pt-2">
        <a
          href={profile.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'ar' ? 'حساب GitHub' : 'GitHub profile'}
          className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-white hover:text-[#0F1B2E] hover:bg-accent hover:border-accent transition-all duration-300 focus-ring"
        >
          <FiGithub className="text-lg" />
        </a>
        <a
          href={profile.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'ar' ? 'حساب LinkedIn' : 'LinkedIn profile'}
          className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-white hover:text-[#0F1B2E] hover:bg-accent hover:border-accent transition-all duration-300 focus-ring"
        >
          <FiLinkedin className="text-lg" />
        </a>
        <a
          href={profile.socials.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={lang === 'ar' ? 'حساب Instagram' : 'Instagram profile'}
          className="w-11 h-11 rounded-full border border-line flex items-center justify-center text-white hover:text-[#0F1B2E] hover:bg-accent hover:border-accent transition-all duration-300 focus-ring"
        >
          <FiInstagram className="text-lg" />
        </a>
      </div>
    </div>
  );

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 sm:py-32 bg-bg border-t border-line overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-stretch">
          {/* Start Column (5 cols, sticky on desktop) */}
          <div className="lg:col-span-5 flex flex-col items-start justify-between">
            <div>
              <SectionLabel label={t('sectionLabels.contact')} />

              <div className="my-4">
                <Reveal>
                  <h2 className="font-display text-[clamp(2.75rem,5.5vw,4.75rem)] leading-[0.95] uppercase text-white tracking-tight">
                    <span>{t('contact.titleLine1')}</span>
                    <span className="block text-accent mt-[0.05em]">
                      {t('contact.titleLine2')}
                      <span className="text-accent ms-1">.</span>
                    </span>
                  </h2>
                </Reveal>
              </div>

              <p className="font-sans text-sm sm:text-base text-muted leading-relaxed mb-6">
                {t('contact.subtitle')}
              </p>

              {/* Availability Pill with Gold Dot */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-line bg-surface/60 mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_rgba(212,175,55,0.85)] flex-shrink-0" />
                <span className="font-mono text-[11px] sm:text-xs tracking-wider text-accent uppercase font-bold">
                  {t('contact.pill')}
                </span>
              </div>

              {/* Single Primary Action Button: Chat on WhatsApp */}
              <div className="w-full mb-8">
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white border border-accent hover:border-white transition-all duration-300 min-h-[44px] shadow-lg shadow-accent/20 focus-ring"
                >
                  <span>{t('contact.whatsappBtn')}</span>
                  <FiArrowUpRight className="text-base transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:group-hover:-translate-x-0.5 transition-transform rtl:-scale-x-100" />
                </a>
              </div>
            </div>

            {/* Desktop Contact Details & Social Icons (pinned to bottom of column) */}
            <div className="hidden lg:block w-full pt-6 border-t border-line/60 mt-8">
              {contactInfoBlock}
            </div>
          </div>

          {/* End Column (7 cols): Single Form Card */}
          <div className="lg:col-span-7 w-full flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-line bg-white/[0.02] p-6 sm:p-8 lg:p-10 shadow-[0_0_40px_rgba(212,175,55,0.04)] flex flex-col h-full"
            >
              <span className="font-mono text-xs tracking-[0.25em] text-accent uppercase mb-6 block">
                {t('contact.cardTitle')}
              </span>

              <form onSubmit={handleSubmit} className="flex flex-col flex-1 gap-6">
                {/* Honeypot spam protection */}
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  checked={botcheck}
                  onChange={(e) => setBotcheck(e.target.checked)}
                />

                {/* Name & Email side-by-side */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="relative flex flex-col pt-3">
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
                      className="peer w-full bg-transparent border-b border-line focus:border-accent py-2.5 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
                    />
                    <label
                      htmlFor="name"
                      className="absolute start-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs uppercase"
                    >
                      {t('contact.nameLabel')}
                    </label>
                    {errors.name && (
                      <span className="font-mono text-xs text-accent mt-1">{errors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative flex flex-col pt-3">
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
                      className="peer w-full bg-transparent border-b border-line focus:border-accent py-2.5 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
                    />
                    <label
                      htmlFor="email"
                      className="absolute start-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs uppercase"
                    >
                      {t('contact.emailInputLabel')}
                    </label>
                    {errors.email && (
                      <span className="font-mono text-xs text-accent mt-1">{errors.email}</span>
                    )}
                  </div>
                </div>

                {/* Phone */}
                <div className="relative flex flex-col pt-3">
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
                    className="peer w-full bg-transparent border-b border-line focus:border-accent py-2.5 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors"
                  />
                  <label
                    htmlFor="phone"
                    className="absolute start-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs uppercase"
                  >
                    {t('contact.phoneInputLabel')}
                  </label>
                </div>

                {/* Message */}
                <div className="relative flex flex-col pt-3 flex-1">
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errorMessage) setErrorMessage('');
                      if (errors.message) setErrors((prev) => ({ ...prev, message: '' }));
                    }}
                    placeholder=" "
                    className="peer w-full bg-transparent border-b border-line focus:border-accent py-2.5 font-sans text-sm sm:text-base text-white placeholder-transparent focus:outline-none transition-colors resize-none flex-1 min-h-[160px]"
                  />
                  <label
                    htmlFor="message"
                    className="absolute start-0 top-3 font-mono text-xs tracking-wider text-muted pointer-events-none transition-all duration-200 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-accent peer-[:not(:placeholder-shown)]:-top-2 peer-[:not(:placeholder-shown)]:text-xs uppercase"
                  >
                    {t('contact.messageLabel')}
                  </label>
                  {errors.message && (
                    <span className="font-mono text-xs text-accent mt-1">{errors.message}</span>
                  )}
                </div>

                {/* Inline Status Announcement */}
                {errorMessage && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-xl border border-accent/40 bg-accent-soft/20 text-white font-sans text-sm flex items-center gap-2"
                  >
                    <span>
                      {lang === 'ar' ? (
                        <>
                          تعذر إرسال رسالتك. يرجى المحاولة مرة أخرى أو مراسلتي عبر{' '}
                          <a
                            href={profile.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-accent underline font-semibold hover:text-white transition-colors"
                          >
                            واتساب
                          </a>
                          .
                        </>
                      ) : (
                        <>
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
                        </>
                      )}
                    </span>
                  </div>
                )}

                {submitted && (
                  <div
                    role="status"
                    aria-live="polite"
                    className="p-4 rounded-xl border border-accent/40 bg-accent-soft/20 text-white font-sans text-sm flex items-center gap-2"
                  >
                    <FiCheck className="text-accent text-base flex-shrink-0" />
                    <span>{t('contact.successMessage')}</span>
                  </div>
                )}

                {/* Submit Button */}
                <div className="pt-2 mt-auto flex flex-col sm:flex-row items-stretch sm:items-center sm:justify-end gap-4">
                  <button
                    type="submit"
                    disabled={submitting || submitted}
                    className="group px-8 py-4 rounded-full bg-accent text-[#0F1B2E] font-mono text-xs uppercase tracking-widest font-bold hover:bg-white border border-accent hover:border-white transition-all duration-300 focus-ring flex items-center justify-center gap-3 disabled:opacity-50 shadow-lg shadow-accent/25 min-h-[44px] w-full sm:w-auto"
                  >
                    {submitted ? (
                      <>
                        <FiCheck className="text-base text-[#0F1B2E]" />
                        <span className="text-[#0F1B2E]">{t('contact.sentBtn')}</span>
                      </>
                    ) : submitting ? (
                      <span className="text-[#0F1B2E]">{t('contact.sendingBtn')}</span>
                    ) : (
                      <>
                        <span className="text-[#0F1B2E]">{t('contact.sendBtn')}</span>
                        <span className="text-[#0F1B2E] transition-transform duration-300 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:-scale-x-100">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Mobile Contact Details & Social Icons */}
            <div className="block lg:hidden w-full pt-8 mt-10 border-t border-line/60">
              {contactInfoBlock}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
