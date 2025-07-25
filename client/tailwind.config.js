/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "pacific": ["Pacifico", 'sans-serif'],
        "tektur" : ["Tektur", 'sans-serif']
      }
    },
  },
  plugins: [],

}


