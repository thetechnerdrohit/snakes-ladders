/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-gray': '#282c34',
        'purple': '#800080',
        'orange': '#ffa500'
      },
    },
  },
  plugins: [],
}