/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F1B2E',
        'bg-deep': '#0A1322',
        surface: '#14233B',
        'surface-2': '#1C3050',
        navy: '#0F1B2E',
        'navy-deep': '#0A1322',
        line: 'rgba(212, 175, 55, 0.18)',
        'line-dim': 'rgba(212, 175, 55, 0.08)',
        'line-bright': 'rgba(212, 175, 55, 0.35)',
        text: '#FFFFFF',
        muted: '#A9B4C6',
        dim: '#6E7D96',
        accent: '#D4AF37',
        'accent-soft': 'rgba(212, 175, 55, 0.15)',
      },
      fontFamily: {
        display: ['Anton', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        script: ['Caveat', 'cursive'],
      },
      keyframes: {
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.25' },
        },
      },
      animation: {
        'pulse-subtle': 'pulse-subtle 1.6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
