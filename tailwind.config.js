/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jade: {
          bg: "#0F1712",
          surface: "#16261F",
          border: "#2E4A3A",
          dark: "#1A5140",
          mid: "#288760",
          accent: "#5CA87C",
          light: "#B7E5BA",
          heading: "#EAF7EE",
          body: "#9FCFAE",
          muted: "#6E9A7C",
          // Palet terang untuk layout playful/modern
          paper: "#F1FAF4",
          card: "#FFFFFF",
          ink: "#16261F",
          inkMuted: "#4B6B57",
          pill: "#DFF3E6",
          pillText: "#1F6B45",
          yellow: "#FCE7A8",
          yellowText: "#8A6D1F",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        xl2: "16px",
      },
    },
  },
  plugins: [],
};
