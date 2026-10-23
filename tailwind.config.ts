import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "var(--tcb-navy)",
        signal: "var(--tcb-signal)",
        deep: { DEFAULT: "var(--tcb-deep)", hover: "var(--tcb-deep-hover)" },
        paper: "var(--tcb-paper)",
        slate: { DEFAULT: "var(--tcb-slate)" },
        mist: "var(--tcb-mist)",
        gold: "var(--tcb-gold)",
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
