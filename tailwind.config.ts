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
        // Cores autênticas do Kerf Silicon Design System
        silicon: {
          950: "#0b0b0c", // Base ground deep space
          900: "#0a0e14", // Terminal strip panel surface
          800: "#121722", // Elevated cards and panels
          700: "#1a2232", // Borders & structural elements
          600: "#243041", // Structural rule line between cells
          500: "#374760", // Muted borders
        },
        electric: {
          blue: "#2f9bff", // Primary electric blue accent
          bright: "#3aa3ff", // Glow highlight
          glow: "rgba(47, 155, 255, 0.4)",
        },
        paper: {
          DEFAULT: "#ecebe6", // Primary crisp white/ink
          muted: "#8e8d8a", // Muted editorial text
          dark: "#697c90",  // Technical/mono grey
        },
        // Mapeamentos para compatibilidade suave
        ink: {
          950: "#0b0b0c",
          900: "#0a0e14",
          800: "#121722",
          700: "#1a2232",
          600: "#243041",
        },
        mint: {
          300: "#3aa3ff",
          400: "#2f9bff",
          500: "#1871d7",
          600: "#1558a8",
        },
      },
      fontFamily: {
        display: ["'IBM Plex Sans Condensed'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        sans: ["'IBM Plex Sans Condensed'", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "Menlo", "monospace"],
      },
      boxShadow: {
        laser: "0 0 14px 2px rgba(47, 155, 255, 0.8), 0 0 30px 4px rgba(47, 155, 255, 0.4)",
        glow: "0 0 24px -4px rgba(47, 155, 255, 0.6)",
        card: "6px 6px 0px rgba(3, 5, 9, 0.62)",
      },
    },
  },
  plugins: [],
};
export default config;
