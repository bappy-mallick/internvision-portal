import type { Config } from "tailwindcss";

/**
 * InternVision Portal — Tailwind CSS Configuration
 *
 * Design system tokens sourced from UI/UX Specification v1.0.
 * Compatible with shadcn/ui component library.
 */
const config: Config = {
  // Enable class-based dark mode (controlled by next-themes)
  darkMode: ["class"],

  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ── Colors (CSS variable driven for theme switching) ──────────
      colors: {
        // shadcn/ui semantic tokens
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // InternVision design system fixed tokens (from UI/UX spec)
        "iv-primary": "#2563EB",    // Blue 600
        "iv-secondary": "#1E293B",  // Slate 800
        "iv-success": "#22C55E",    // Green 500
        "iv-error": "#EF4444",      // Red 500
        "iv-warning": "#F59E0B",    // Amber 500
        "iv-bg-light": "#FFFFFF",
        "iv-bg-dark": "#0F172A",
        "iv-card-light": "#F8FAFC",
        "iv-card-dark": "#1E293B",
      },

      // ── Border Radius (from UI/UX spec) ───────────────────────────
      borderRadius: {
        lg: "16px",   // Large cards
        md: "12px",   // Buttons
        sm: "10px",   // Inputs
        DEFAULT: "var(--radius)",
      },

      // ── Typography ────────────────────────────────────────────────
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },

      // ── Animations (from UI/UX spec) ──────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out forwards",
        "slide-up": "slide-up 0.4s ease-out forwards",
      },
    },
  },

  plugins: [],
};

export default config;
