import type { Config } from "tailwindcss";

export default <Config>{
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
      },
      boxShadow: {
        light: "0 2px 4px 0 rgba(255, 255, 255, 0.05)",
        "light-md":
          "0 4px 6px -1px rgba(255, 255, 255, .1), 0 2px 4px -1px rgba(255, 255, 255, .06)",
        "light-lg":
          "0 10px 15px -3px rgba(255, 255, 255, .1), 0 4px 6px -2px rgba(255, 255, 255, .05)",
        "light-xl":
          "0 20px 25px -5px rgba(255, 255, 255, .1), 0 10px 10px -5px rgba(0, 0, 0, .04)",
      },
      fontFamily: {
        base: [
          "Merriweather",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "serif",
        ],
        headings: ["Montserrat", "sans-serif"],
        code: [
          "Hasklig",
          "Consolas",
          "Menlo",
          "Monaco",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        "code-comment": "#20ff7d",
        body: {
          first: "#0d1016",
          second: "#0b0e15",
        },
      },
      backgroundColor: {
        code: "#011627",
      },
    },
  },
  safelist: [
    "is-active",
    "hr",
    "strong",
    "small",
    "em",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "marginless",
    "button",
    "p",
    "a",
    "pre",
    "code",
    "ul",
    "ol",
    "page-enter-active",
    "page-leave-to",
    "page-leave-active",
    "page-enter-from",
    "text-teal-500",
    "text-purple-700",
    "text-green-500",
    "text-green-700",
    "text-red-500",
    "text-blue-500",
    "text-orange-500"
  ],
  plugins: [],
};
