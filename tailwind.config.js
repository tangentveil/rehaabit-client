/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "custom-shadow": "0px 4px 4px 0px rgba(0, 0, 0, 0.1)",
      }
    },
  },
  plugins: [],
};