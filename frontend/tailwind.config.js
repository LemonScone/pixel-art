/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {},
  safelist: [
    ...[...Array(121).keys()]
      .filter(i => i > 4)
      .flatMap(i => [`w-[calc(100%/${i})]`, `basis-[calc(100%/${i})]`]),
  ],
  plugins: [],
};
