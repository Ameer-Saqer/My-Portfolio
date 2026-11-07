import React from 'react';

export default function SectionLabel({ label, className = '' }) {
  // Extract "01 / " to style the index number in accent red
  const match = label.match(/^(\d{2})(\s*\/\s*)(.*)$/);

  return (
    <div className={`flex items-center gap-3 font-mono text-xs tracking-[0.22em] text-dim uppercase mb-4 select-none ${className}`}>
      {match ? (
        <span className="inline-flex items-center gap-1.5">
          <span className="text-accent font-bold font-mono" dir="ltr">{match[1]}</span>
          <span className="text-dim font-mono">/</span>
          <span className="text-muted">{match[3]}</span>
        </span>
      ) : (
        <span className="text-muted">{label}</span>
      )}
    </div>
  );
}