/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xsm: "200px",
      // => @media (min-width: 300px) { ... }

      sm: "400px",
      // => @media (min-width: 400px) { ... }

      md: "520px",
      // => @media (min-width: 515px) { ... }

      lg: "825px",
      // => @media (min-width: 825px) { ... }

      xl: "1024px",
      // => @media (min-width: 1024px) { ... }

      "2xl": "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {},

    colors: {
      primaryBackground: "black",
      white: "#ffffff",
      black: "black",
      gray: "#d1d5db",
      darkGray: "#64748b",
      "dark-gray": "#71717a",
      blue: "#2563eb",
      red: "red",
      danger: "#b91c1c",
      green: "#22c55e",
      darkGreen: "#22c55e",
      emerald: "#022c22",
      button: "rgb(14 165 233)",
    },

    fontFamily: {
      Inter: ["Andika", "sans-serif"],
      Mingzant: ["Mingzat", "sans-serif"],
      Noto: ["Noto Serif", "serif"],
      Liber: ["Libre Baskerville", "serif"],
      Lexend: ["Lexend", "serif"],
    },
  },
  plugins: [],
};
