/** @type { import('tailwindcss').Config } */
module.exports = {
  content: [
    "./index.html",
    "./src/App.vue",
    "./src/**/*.{vue,ts}"
  ],
  theme: {
    extend: {
      colors: {
        "neon-green": "#39ff14",
        "neon-red": "hsl(0 100% 60%)"
      }
    },
  },
  plugins: [],
}
