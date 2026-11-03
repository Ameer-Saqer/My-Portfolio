import React from 'react';

export default function SectionLabel({ label, className = '' }) {
  // Extract "01 / " to style the index number in accent red
  const match = label.match(/^(\d{2})(\s*\/\s*)(.*)$/);

  return (
    <div className={`flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-dim uppercase mb-4 select-none ${className}`}>
      <span className="w-6 h-[1px] bg-accent inline-block" />
      {match ? (
        <span>
          <span className="text-accent font-bold">{match[1]}</span>
          <span className="text-dim">{match[2]}</span>
          <span className="text-muted">{match[3]}</span>
        </span>
      ) : (
        <span className="text-muted">{label}</span>
      )}
    </div>
  );
}
