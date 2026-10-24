import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "rgb(var(--tcb-navy) / <alpha-value>)",
        signal: {
          DEFAULT: "rgb(var(--tcb-signal) / <alpha-value>)",
          hover: "rgb(var(--tcb-signal-hover) / <alpha-value>)",
        },
        deep: {
          DEFAULT: "rgb(var(--tcb-deep) / <alpha-value>)",
          hover: "rgb(var(--tcb-deep-hover) / <alpha-value>)",
        },
        paper: "rgb(var(--tcb-paper) / <alpha-value>)",
        slate: { DEFAULT: "rgb(var(--tcb-slate) / <alpha-value>)" },
        mist: "rgb(var(--tcb-mist) / <alpha-value>)",
        gold: "rgb(var(--tcb-gold) / <alpha-value>)",
        tint: "rgb(var(--tcb-tint) / <alpha-value>)",
        goldTint: "rgb(var(--tcb-gold-tint) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter Variable", "Inter", "-apple-system", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
        display: ["Montserrat Variable", "Montserrat", "Inter Variable", "Arial", "sans-serif"],
      },
      maxWidth: { content: "72rem" },
      borderRadius: { card: "1rem" },
    },
  },
  plugins: [],
};
export default config;
