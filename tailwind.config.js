/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      jeju: ["JejuMyeongjo", "sans-serif"],
      roboto: ["Roboto", "sans-serif"],
      roadrage: ["Road Rage", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#02191D",
        secondary: "#0E464F",
        color: "#197686",
        shade: "#041E23",
        shade2: "#072C31",
        button: "#24A0B5",
      },
      screens: {
        xs: "480px",
        xxl: "1500px",
      },
    },
  },
  plugins: [],
};
