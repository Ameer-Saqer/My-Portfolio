import React from 'react';

/**
 * Reusable brand logo mark:
 * A rounded gold square (#D4AF37) with the navy (#0F1B2E) letter "A".
 * Clean, razor-sharp vector path matching the favicon.
 */
export default function LogoMark({ className = 'w-9 h-9', size = 36 }) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} select-none shrink-0 transition-transform duration-200 group-hover:scale-105`}
      aria-hidden="true"
    >
      <rect width="100" height="100" rx="22" fill="#D4AF37" />
      <path
        d="M 42 20 L 58 20 L 78 80 L 63.5 80 L 58.5 62 L 41.5 62 L 36.5 80 L 22 80 Z M 44 48 L 56 48 L 50 30 Z"
        fill="#0F1B2E"
      />
    </svg>
  );
}

