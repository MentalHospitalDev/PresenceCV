/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'mirage': {
          '50': '#f3f6fc',
          '100': '#e7edf7',
          '200': '#cad8ed',
          '300': '#9bb7de',
          '400': '#6591cb',
          '500': '#4173b6',
          '600': '#305999',
          '700': '#28487c',
          '800': '#243e68',
          '900': '#233657',
          '950': '#101828',
        },
      }
    },
  },
  plugins: [],
}

