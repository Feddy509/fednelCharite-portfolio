import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Cobalt accent — primary action color, ramp built around #08428C
        accent: {
          50: "#EAF1FB",
          100: "#D0E1F7",
          200: "#A3C4EF",
          300: "#6FA3E5",
          400: "#3D82D9",
          500: "#1D63BE",
          600: "#08428C", // brand accent
          700: "#06336B",
          800: "#052A59",
          900: "#041F42",
        },
        // Dark foundation — cybersecurity / cloud register
        ink: {
          DEFAULT: "#0F172A", // page background
          surface: "#111827", // elevated card / nav surface
          border: "#1E293B",
          muted: "#334155",
        },
        // Light foundation — accessibility contrast layer
        paper: {
          DEFAULT: "#F8FAFC",
          dim: "#E2E8F0",
        },
      },
      fontFamily: {
        // 👈 Chanjman fèt la: Sora ranplase jakarta a isit la
        sans: ["var(--font-sora)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 20% 0%, rgba(8,66,140,0.25), transparent 45%), radial-gradient(circle at 85% 15%, rgba(8,66,140,0.15), transparent 40%)",
        "cta-gradient": "linear-gradient(135deg, #08428C 0%, #1D63BE 100%)",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(8,66,140,0.35), 0 8px 30px -8px rgba(8,66,140,0.45)",
        card: "0 1px 0 rgba(248,250,252,0.04) inset, 0 20px 40px -24px rgba(0,0,0,0.6)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-slow": "pulseSlow 3.5s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;