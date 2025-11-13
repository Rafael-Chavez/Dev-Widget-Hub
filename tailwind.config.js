/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e0e1dd',
          100: '#d1d3ce',
          200: '#b4b7af',
          300: '#9ba09a',
          400: '#8a9099',
          500: '#778da9',
          600: '#415a77',
          700: '#1b263b',
          800: '#0d1b2a',
          900: '#080f1a',
        },
        deepsea: {
          darkest: '#0d1b2a',
          dark: '#1b263b',
          medium: '#415a77',
          light: '#778da9',
          lightest: '#e0e1dd',
        },
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}