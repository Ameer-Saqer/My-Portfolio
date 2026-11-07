import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { ui } from './ui';
import * as contentEn from '../data/content.en';
import * as contentAr from '../data/content.ar';

const LanguageContext = createContext(null);

const STORAGE_KEY = 'portfolio_lang';

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'en';

  const pathname = window.location.pathname;
  if (pathname === '/ar' || pathname.startsWith('/ar/')) {
    return 'ar';
  }

  // First visit check: if at root and browser prefers Arabic, redirect to /ar once
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      const browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
      if (browserLang.startsWith('ar')) {
        const target = '/ar' + (window.location.search || '') + (window.location.hash || '');
        window.history.replaceState(null, '', target);
        return 'ar';
      }
    }
  } catch (e) {
    // LocalStorage might be restricted
  }

  return 'en';
}

// Dev-only parity checker for missing keys
if (import.meta.env.DEV) {
  function compareKeys(objA, objB, prefix = '', langA = 'EN', langB = 'AR') {
    for (const key of Object.keys(objA)) {
      const currentPath = prefix ? `${prefix}.${key}` : key;
      if (!(key in objB)) {
        console.warn(`[i18n Warning] Key "${currentPath}" exists in ${langA} but is missing in ${langB}`);
      } else if (
        typeof objA[key] === 'object' &&
        objA[key] !== null &&
        !Array.isArray(objA[key]) &&
        typeof objB[key] === 'object' &&
        objB[key] !== null &&
        !Array.isArray(objB[key])
      ) {
        compareKeys(objA[key], objB[key], currentPath, langA, langB);
      }
    }
  }

  try {
    compareKeys(ui.en, ui.ar, 'ui', 'EN', 'AR');
    compareKeys(ui.ar, ui.en, 'ui', 'AR', 'EN');
    compareKeys(contentEn, contentAr, 'content', 'EN', 'AR');
    compareKeys(contentAr, contentEn, 'content', 'AR', 'EN');
  } catch (err) {
    console.error('[i18n Parity Check Error]', err);
  }
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLanguage);

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const sx = dir === 'rtl' ? -1 : 1;

  // Language setter with URL synchronization and localStorage persistence
  const setLang = useCallback((nextLang) => {
    if (nextLang !== 'en' && nextLang !== 'ar') return;

    try {
      localStorage.setItem(STORAGE_KEY, nextLang);
    } catch (e) {
      // Ignore localStorage errors
    }

    const currentHash = window.location.hash || '';
    const currentSearch = window.location.search || '';
    const nextPath = nextLang === 'ar' ? '/ar' : '/';
    const nextUrl = nextPath + currentSearch + currentHash;

    window.history.pushState(null, '', nextUrl);
    setLangState(nextLang);
  }, []);

  // Listen to popstate (browser Back / Forward navigation)
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const urlLang = pathname === '/ar' || pathname.startsWith('/ar/') ? 'ar' : 'en';
      setLangState((prev) => (prev !== urlLang ? urlLang : prev));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Synchronize HTML attributes, document title and SEO meta tags
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;

    const seo = ui[lang].seo;
    document.title = seo.title;

    // Update Meta description
    const descMeta = document.querySelector('meta[name="description"]');
    if (descMeta) descMeta.setAttribute('content', seo.description);

    // Update Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', seo.title);

    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', seo.description);

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', seo.canonical);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) {
      ogLocale.setAttribute('content', seo.locale);
    } else {
      const newLocale = document.createElement('meta');
      newLocale.setAttribute('property', 'og:locale');
      newLocale.setAttribute('content', seo.locale);
      document.head.appendChild(newLocale);
    }

    // Update Twitter tags
    const twTitle = document.querySelector('meta[name="twitter:title"]');
    if (twTitle) twTitle.setAttribute('content', seo.title);

    const twDesc = document.querySelector('meta[name="twitter:description"]');
    if (twDesc) twDesc.setAttribute('content', seo.description);

    // Update Canonical link
    const canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) canonicalLink.setAttribute('href', seo.canonical);
  }, [lang, dir]);

  // Translation lookup helper: t('nav.work') or t('hero.greeting')
  const t = useCallback(
    (keyPath) => {
      const keys = keyPath.split('.');
      let current = ui[lang];
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          // Fallback to English if missing
          let fallback = ui.en;
          for (const fbKey of keys) {
            if (fallback && typeof fallback === 'object' && fbKey in fallback) {
              fallback = fallback[fbKey];
            } else {
              return keyPath;
            }
          }
          return fallback || keyPath;
        }
      }
      return current ?? keyPath;
    },
    [lang]
  );

  const content = useMemo(() => {
    return lang === 'ar' ? contentAr : contentEn;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      dir,
      sx,
      setLang,
      t,
      content,
    }),
    [lang, dir, sx, setLang, t, content]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useContent() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useContent must be used within a LanguageProvider');
  }
  return context.content;
}

