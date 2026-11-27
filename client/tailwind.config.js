/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;

/** Aceternity helper — adds CSS variables for each color so components
 *  can use things like `bg-[--color-sky-500]` */
function addVariablesForColors({ addBase, theme }) {
  const allColors = flattenColorPalette(theme('colors'));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
  addBase({ ':root': newVars });
}

module.exports = {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      /* ─── Brand colours ─── */
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          50:  '#F9F9F9',
          100: '#F3F3F3',
          500: '#FFFFFF',
          600: '#E5E5E5',
          700: '#CCCCCC',
          900: '#333333',
        },
        secondary:  { DEFAULT: '#FFFFFF', 500: '#FFFFFF' },
        tertiary:   { DEFAULT: '#888888', 500: '#888888' },
        success:    { DEFAULT: '#FFFFFF', dark: '#E5E5E5', light: '#F3F3F3' },
        background: '#000000',
        surface:    '#0A0A0A',
        'surface-variant': '#141414',
        text: { DEFAULT: '#FFFFFF', light: '#888888' },
      },

      /* ─── Fonts ─── */
      fontFamily: {
        body:    ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Outfit', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
        mono:    ['Geist Mono', 'Fira Code', ...defaultTheme.fontFamily.mono],
      },

      /* ─── Spacing ─── */
      spacing: {
        'site-x':   '1.5rem',
        'site-y':   '2rem',
        'section-y':'6rem',
      },

      /* ─── Aceternity animations ─── */
      animation: {
        // Spotlight beam reveal
        spotlight:        'spotlight 2s ease .75s 1 forwards',
        // Shimmer sweep (used on buttons / cards)
        shimmer:          'shimmer 2s linear infinite',
        // Infinite marquee scroll (InfiniteMovingCards)
        scroll:           'scroll var(--animation-duration,40s) var(--animation-direction,forwards) linear infinite',
        // Aurora pulsing background
        aurora:           'aurora 60s linear infinite',
        // Meteor shower
        'meteor-effect':  'meteor 5s linear infinite',
        // Pulse variant
        'pulse-slow':     'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        // Text gradient
        'gradient-x':     'gradient-x 3s ease infinite',
        // Fade up
        'fade-up':        'fade-up 0.5s ease-out forwards',
        // Fade in
        'fade-in':        'fade-in 0.4s ease-out forwards',
        // Spin slow
        'spin-slow':      'spin 8s linear infinite',
        // Border rotate (HoverBorderGradient)
        'border-rotate':  'border-rotate 4s linear infinite',
        // Accordion (shadcn/ui compat)
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up':   'accordion-up 0.2s ease-out',
        // Tracing beam pulse
        'tracing-beam':   'tracing-beam 2s ease-in-out infinite',
        // Moving border path
        'moving-border':  'moving-border 2000ms linear infinite',
        // Grid shimmer
        'grid-shine':     'grid-shine 3s ease-in-out infinite',
        // Wave
        wave:             'wave 2.5s linear infinite',
        // Float
        float:            'float 6s ease-in-out infinite',
        // Globe glow
        'globe-pulse':    'globe-pulse 3s ease-in-out infinite',
      },

      /* ─── Keyframes ─── */
      keyframes: {
        spotlight: {
          '0%':   { opacity: 0, transform: 'translate(-72%,-62%) scale(0.5)' },
          '100%': { opacity: 1, transform: 'translate(-50%,-40%) scale(1)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scroll: {
          to: { transform: 'translate(calc(-50% - 0.5rem))' },
        },
        aurora: {
          from: { backgroundPosition: '50% 50%, 50% 50%' },
          to:   { backgroundPosition: '350% 50%, 350% 50%' },
        },
        meteor: {
          '0%':   { transform: 'rotate(215deg) translateX(0)',  opacity: 1 },
          '70%':  { opacity: 1 },
          '100%': { transform: 'rotate(215deg) translateX(-500px)', opacity: 0 },
        },
        'gradient-x': {
          '0%,100%': { backgroundSize: '200% 200%', backgroundPosition: 'left center' },
          '50%':     { backgroundSize: '200% 200%', backgroundPosition: 'right center' },
        },
        'fade-up': {
          '0%':   { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: 0 },
          '100%': { opacity: 1 },
        },
        'border-rotate': {
          '0%':   { '--angle': '0deg' },
          '100%': { '--angle': '360deg' },
        },
        'accordion-down': {
          from: { height: '0' },
          to:   { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to:   { height: '0' },
        },
        'tracing-beam': {
          '0%,100%': { opacity: 1 },
          '50%':     { opacity: 0.3 },
        },
        'moving-border': {
          '0%':   { offsetDistance: '0%' },
          '100%': { offsetDistance: '100%' },
        },
        'grid-shine': {
          '0%,100%': { opacity: 0.3 },
          '50%':     { opacity: 0.7 },
        },
        wave: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-20px)' },
        },
        'globe-pulse': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(255,255,255,0.1)' },
          '50%':     { boxShadow: '0 0 40px 10px rgba(255,255,255,0.05)' },
        },
      },

      /* ─── Background images / gradients ─── */
      backgroundImage: {
        // Aceternity shimmer card
        'shimmer-card':
          'linear-gradient(110deg,transparent 25%,rgba(255,255,255,0.05) 50%,transparent 75%)',
        // Radial glow
        'radial-glow':
          'radial-gradient(ellipse at center, rgba(255,255,255,0.08) 0%, transparent 70%)',
        // Dot grid (used in GridPattern)
        'dot-grid':
          'radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)',
      },

      /* ─── Box shadows ─── */
      boxShadow: {
        'aceternity':    '0 0 0 1px rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.6)',
        'aceternity-lg': '0 0 0 1px rgba(255,255,255,0.08), 0 8px 48px rgba(0,0,0,0.8)',
        'glow-sm':       '0 0 10px rgba(255,255,255,0.1)',
        'glow-md':       '0 0 30px rgba(255,255,255,0.08)',
        'glow-lg':       '0 0 60px rgba(255,255,255,0.06)',
        'inner-glow':    'inset 0 0 30px rgba(255,255,255,0.03)',
      },

      /* ─── Border radius ─── */
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      /* ─── Backdrop blur ─── */
      backdropBlur: {
        xs: '2px',
      },

      /* ─── Z-index ─── */
      zIndex: {
        60:  '60',
        70:  '70',
        80:  '80',
        90:  '90',
        100: '100',
        500: '500',
        1000:'1000',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('tailwindcss-animate'),
    // Aceternity plugin: adds all colors as CSS variables on :root
    addVariablesForColors,
  ],
};
