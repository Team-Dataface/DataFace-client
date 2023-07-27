/* eslint-disable prettier/prettier */
/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
      },
    },
    colors: {
      "white": "#FFFFFF",
      "black-bg": "#393939",
      "black-text": "#000000",
      "light-grey": "#F5F5F5",
      "grey": "#D9D9D9",
      "dark-grey": "#B1B1B1",
      "yellow": "#F4F0CD",
      "blue": "#5AA6FF",
      "google-blue": "#4285F4",
      "google-blue-hover": "#679df5",
      "inherit": "inherit",
    },
  },
  plugins: [],
};
