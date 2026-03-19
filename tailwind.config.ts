import type { Config } from "tailwindcss";

export default <Config>{
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          '"Helvetica Neue"',
          "Arial",
          "sans-serif",
        ],
        display: [
          '"Space Grotesk"',
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        mono: [
          '"JetBrains Mono"',
          "Consolas",
          "Menlo",
          "Monaco",
          '"Liberation Mono"',
          '"Courier New"',
          "monospace",
        ],
      },
      colors: {
        theme: {
          bg: "var(--color-bg)",
          "bg-content": "var(--color-bg-content)",
          primary: "var(--color-text-primary)",
          secondary: "var(--color-text-secondary)",
          tertiary: "var(--color-text-tertiary)",
          border: "var(--color-border)",
          surface: "var(--color-surface)",
          "surface-light": "var(--color-surface-light)",
          header: "var(--color-header)",
        },
        surface: "#FAFAFA",
        "code-comment": "#20ff7d",
        body: {
          first: "#0d1016",
          second: "#0b0e15",
        },
        concept: {
          navy: "#0A0F1C",
          "navy-light": "#111827",
          "navy-surface": "#141B2D",
          coral: "#FF6B5B",
          blue: "#3B82F6",
          cream: "#FAF7F2",
          muted: "#94A3B8",
          border: "rgba(255, 255, 255, 0.08)",
        },
      },
      backgroundColor: {
        code: "#011627",
      },
      fontSize: {
        hero: ["3rem", { lineHeight: "1.1", fontWeight: "500" }],
        "hero-mobile": ["2rem", { lineHeight: "1.1", fontWeight: "500" }],
        "concept-hero": ["4.5rem", { lineHeight: "1.05", fontWeight: "500" }],
        "concept-hero-mobile": [
          "2.5rem",
          { lineHeight: "1.1", fontWeight: "500" },
        ],
      },
    },
  },
  safelist: [
    "is-active",
    "page-enter-active",
    "page-leave-to",
    "page-leave-active",
    "page-enter-from",
  ],
  plugins: [],
};
