/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "4xl": { max: "2500px" },
      // => @media (max-width: 2500px) { ... }

      "3xl": { max: "1880px" },
      // => @media (max-width: 1880px) { ... }

      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "600px" },
      // => @media (max-width: 600px) { ... }

      "2sm": { max: "499px" },
      // => @media (max-width: 499px) { ... }
    },
    extend: {
      colors: {
        "my-primary": "#228B22",
        "my-primary-bg": "#FFFFFF",
        "my-primary-text": "#000000",
        "my-divider": "#EEE",
        "my-scrollbar-btn": "#AAA",
        "my-black-rgba": "rgba(0,0,0,0.2)",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
