/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lwsGreen: "#00D991",
        deepDark: "#17181C",
        mediumDark: "#1E1F24",
        lighterDark: "#27292F",
      },
    },
  },
  plugins: [],
};
