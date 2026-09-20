/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          400: '#d4af37',
          500: '#c5a059',
          600: '#b08d44',
        }
      }
    },
  },
  plugins: [],
}
