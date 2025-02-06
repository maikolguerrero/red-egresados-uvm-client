/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'barlow-condensed': ["Barlow Condensed", "serif"],
        'barlow-semi-condensed': ["Barlow Semi Condensed", "serif"],
        'barolw': ["Barlow", "serif"]
      },
      colors: {
        'verdeA': "#88BD2D",
        'verdeB': "#13953E",
        'verdeC': "#1D555B",
        'verdeD': "#003C44",
        'RojoA': "#E02B20",
        'RojoB': "#D0342D",
        'RojoC': "#970808",
        'Blanco': "#FFFFFF",
        'Negro': "#000000",
        'Gris': "#EAEAEA",
      }
    },
  },
  plugins: [],
}

