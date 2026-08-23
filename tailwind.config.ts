import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        onyx: {
          950: "#050507",
          900: "#09090d",
          850: "#0e0e14",
          800: "#13131b",
          700: "#1b1b26",
          600: "#262636",
          500: "#36364a",
        },
        gold: {
          50: "#faf6ed",
          100: "#f3ead2",
          200: "#e7d4a4",
          300: "#dbbe76",
          400: "#d2ac52",
          500: "#dfb15b",
          600: "#c7963b",
          700: "#a27429",
          800: "#825b26",
          900: "#6b4a22",
        },
        platinum: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
        },
        surface: {
          DEFAULT: "rgba(19, 19, 27, 0.7)",
          elevated: "rgba(27, 27, 38, 0.8)",
          glass: "rgba(255, 255, 255, 0.03)",
          border: "rgba(255, 255, 255, 0.08)",
          "border-gold": "rgba(223, 177, 91, 0.25)",
        }
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        display: ["var(--font-display)", "Syne", "Outfit", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-up": "slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        "border-glow": "borderGlow 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        borderGlow: {
          "0%, 100%": { borderColor: "rgba(223, 177, 91, 0.2)" },
          "50%": { borderColor: "rgba(223, 177, 91, 0.5)" },
        },
      },
      boxShadow: {
        luxury: "0 20px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.05)",
        gold: "0 10px 30px -5px rgba(223, 177, 91, 0.15), 0 0 0 1px rgba(223, 177, 91, 0.3)",
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  plugins: [],
} satisfies Config;
