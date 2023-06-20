/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-color": "#aff285",
        "primary-color-100": "#f7fdf2",
        "primary-color-200": "#e7fbda",
        "primary-color-300": "#d7f8c2",
        "primary-color-400": "#c7f5a9",
        "primary-color-500": "#bff49d",
        "primary-color-600": "#aff285",
      },
    },
  },
  safelist: [
    ...[...Array(121).keys()]
      .filter((i) => i > 4)
      .flatMap((i) => [`w-[calc(100%/${i})]`, `pb-[calc(100%/${i})]`]),
  ],
  plugins: [],
};
