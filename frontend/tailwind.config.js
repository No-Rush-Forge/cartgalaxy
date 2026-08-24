import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: { "2xl": "1240px" },
    },
    extend: {
      colors: {
        // Core brand tokens for cartgalaxy — inspired by market signage & printed order tickets
        ink: {
          DEFAULT: "#16211D",
          light: "#3A4A44",
        },
        paper: {
          DEFAULT: "#F6F1E4",
          dim: "#EFE8D6",
        },
        night: {
          DEFAULT: "#0F1613",
          card: "#16201C",
          line: "#243330",
        },
        teal: {
          50: "#E6F2EF",
          100: "#C1E0D8",
          400: "#1C8D77",
          500: "#0F6B5C",
          600: "#0C5449",
          700: "#093F37",
        },
        gold: {
          100: "#FBEAC6",
          400: "#F0BB5C",
          500: "#E8A93B",
          600: "#CE8F22",
        },
        receipt: "#FFFDF7",
      },
      fontFamily: {
        display: ["'Inter'", "sans-serif"],
        body: ["'DM Sans'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        grain:
          "radial-gradient(circle at 1px 1px, rgba(22,33,29,0.06) 1px, transparent 0)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "ticket-line": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "print-out": {
          "0%": { transform: "translateY(-12px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) both",
        "ticket-line": "ticket-line 0.5s ease both",
        "print-out": "print-out 0.6s cubic-bezier(0.16,1,0.3,1) both",
        "float-slow": "float-slow 6s ease-in-out infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
