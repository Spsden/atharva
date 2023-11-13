/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        "moving-line": {
          from: {
            width: "0px",
            opacity: "0",
          },
          to: {
            width: "30%",
            opacity: "1",
          },
        },
      },
      animation: {
        "moving-line": "moving-line .8s ease .5s forwards",
      },
    },
  },
  plugins: [],
};
