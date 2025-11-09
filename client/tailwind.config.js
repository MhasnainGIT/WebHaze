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
          DEFAULT: '#0b61ff',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#0b61ff',
          600: '#0952d9',
          700: '#0743b3',
          900: '#1e3a8a'
        },
        secondary: {
          DEFAULT: '#0b9bff',
          500: '#0b9bff'
        },
        success: {
          DEFAULT: '#00c48c',
          dark: '#047857',
          light: '#d1fae5',
        },
        background: '#f7faff',
        surface: '#ffffff',
        text: {
          DEFAULT: '#0f172a',
          light: '#475569',
        },
      },
      fontFamily: {
        body: ['Inter', ...defaultTheme.fontFamily.sans],
        heading: ['Inter', ...defaultTheme.fontFamily.sans],
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