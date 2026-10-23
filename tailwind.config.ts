import type { Config } from "tailwindcss";

// TCB palette: navy ground, blue workhorse accent, yellow used sparingly.
const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0E1E2B",
        blue: "#4A9FCC",
        blueDark: "#0C447C",
        yellow: "#E8E154",
        offwhite: "#F4F1E8",
        ink: "#2C2C2A",
        // Warm gray for paragraphs. DEFAULT so `text-slate` is this, not Tailwind’s blue-gray.
        slate: {
          DEFAULT: "#3E3D39",
        },
      },
      fontFamily: {
        sans: [
          "Inter Variable",
          "Inter",
          "-apple-system",
          "Segoe UI",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: ["Montserrat Variable", "Montserrat", "Inter Variable", "Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
