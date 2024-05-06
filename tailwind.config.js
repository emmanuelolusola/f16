/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        128: "32rem",
        84: "21rem",
        72: "18rem",
        160: "160px",
        240: "240px",
        85: "85px",
      },
    },
  },
  plugins: [],
};
