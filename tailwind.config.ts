import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#060C17",
          900: "#0A1322",
          800: "#101C32",
          700: "#182843",
          600: "#243659",
        },
        mint: { 300: "#7DF0C4", 400: "#34E3A0", 500: "#1FCB88", 600: "#12A56C" },
        paper: { DEFAULT: "#F6F3EC", 2: "#ECE7DA" },
        skysoft: "#BFD6F2",
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 80px -20px rgba(52,227,160,0.35)",
        card: "0 30px 60px -30px rgba(6,12,23,0.45)",
      },
    },
  },
  plugins: [],
};
export default config;
