/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FFFFFF',
          50: '#F9F9F9',
          100: '#F3F3F3',
          500: '#FFFFFF',
          600: '#E5E5E5',
          700: '#CCCCCC',
          900: '#333333'
        },
        secondary: {
          DEFAULT: '#FFFFFF',
          500: '#FFFFFF'
        },
        tertiary: {
          DEFAULT: '#888888',
          500: '#888888'
        },
        success: {
          DEFAULT: '#FFFFFF',
          dark: '#E5E5E5',
          light: '#F3F3F3',
        },
        background: '#000000',
        surface: '#0A0A0A',
        'surface-variant': '#141414',
        text: {
          DEFAULT: '#FFFFFF',
          light: '#888888',
        },
      },
      fontFamily: {
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Outfit', ...defaultTheme.fontFamily.sans],
        display: ['Outfit', ...defaultTheme.fontFamily.sans],
      },
      spacing: {
        'site-x': '1.5rem',
        'site-y': '2rem',
        'section-y': '6rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}