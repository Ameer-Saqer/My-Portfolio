import React from 'react';

export default function SectionDivider({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full flex items-center justify-center pointer-events-none select-none my-0 overflow-hidden ${className}`}
    >
      {/* Hairline background gold line */}
      <div className="w-full h-[1px] bg-[rgba(212,175,55,0.18)]" />

      {/* Short brighter gold segment in the center */}
      <div className="absolute w-24 sm:w-36 h-[1.5px] bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.65)]" />

      {/* Tiny center diamond accent */}
      <div className="absolute w-2 h-2 rotate-45 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
    </div>
  );
}

