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
        "primary-color-700": "#8cc26a",
        "input-color": "#2c2c2c",
        "input-color-hover": "#414141",
      },
      keyframes: {
        "toast-in-right": {
          from: {
            transform: "translateX(100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        "toast-in-left": {
          from: {
            transform: "translateX(-100%)",
          },
          to: {
            transform: "translateX(0)",
          },
        },
        copy: {
          from: {
            transform: "translate(0, 0) scale(0.9)",
          },
          to: {
            transform: "translate(0, 0) scale(1.12)",
          },
        },
      },
      animation: {
        "toast-in-right": "toast-in-right 250ms",
        "toast-in-left": "toast-in-left 250ms",
        copy: "copy 1s",
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
