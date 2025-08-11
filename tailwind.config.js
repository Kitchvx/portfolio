/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: { colors: { brand: { DEFAULT:"#7C3AED", dark:"#6D28D9", light:"#A78BFA" } } } },
  plugins: [],
};
