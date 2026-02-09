import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
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
        rose: {
          DEFAULT: "hsl(var(--rose))",
          foreground: "hsl(var(--rose-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Extended luxury palette
        caption: "hsl(var(--text-caption))",
        divider: "hsl(var(--divider))",
        cream: "hsl(var(--cream))",
        champagne: "hsl(var(--champagne))",
        "charcoal-soft": "hsl(var(--charcoal-soft))",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "Times New Roman", "serif"],
        sans: ["DM Sans", "system-ui", "-apple-system", "sans-serif"],
      },
      fontSize: {
        // Display Scale — Cinematic Headlines
        "display-hero": ["clamp(3rem, 8vw, 8rem)", { lineHeight: "1.05", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(2.5rem, 6vw, 6rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2rem, 5vw, 4.5rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3rem)", { lineHeight: "1.15", letterSpacing: "0" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2.25rem)", { lineHeight: "1.2", letterSpacing: "0.01em" }],
        // Body Scale
        "body-xl": ["1.25rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.75", letterSpacing: "0.01em" }],
        "body-md": ["1rem", { lineHeight: "1.75", letterSpacing: "0.015em" }],
        "body-sm": ["0.875rem", { lineHeight: "1.7", letterSpacing: "0.02em" }],
        // Caption Scale
        "caption-lg": ["0.8125rem", { lineHeight: "1.4", letterSpacing: "0.2em" }],
        caption: ["0.6875rem", { lineHeight: "1.4", letterSpacing: "0.25em" }],
        "caption-sm": ["0.625rem", { lineHeight: "1.3", letterSpacing: "0.3em" }],
      },
      spacing: {
        // Section Spacing — Generous Whitespace
        "section-hero": "clamp(6rem, 12vh, 10rem)",
        "section-xl": "clamp(5rem, 10vh, 8rem)",
        "section-lg": "clamp(4rem, 8vh, 6rem)",
        "section-md": "clamp(3rem, 6vh, 4rem)",
        "section-sm": "clamp(2rem, 4vh, 3rem)",
        // Gutter Spacing
        "gutter-xl": "3rem",
        "gutter-lg": "2rem",
        "gutter-md": "1.5rem",
        "gutter-sm": "1rem",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
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
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in-slow": {
          "0%": { opacity: "0", transform: "translateY(20px)", filter: "blur(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
        "fade-in-blur": {
          "0%": { opacity: "0", filter: "blur(20px)", transform: "scale(1.03)" },
          "100%": { opacity: "1", filter: "blur(0)", transform: "scale(1)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(1.08)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(60px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up-slow": {
          "0%": { opacity: "0", transform: "translateY(80px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-bottom": {
          "0%": { opacity: "0", transform: "translateY(100%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-right": {
          "0%": { transform: "scaleX(1)" },
          "100%": { transform: "scaleX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "zoom-subtle": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        "pan-slow": {
          "0%": { transform: "scale(1.1) translate(0, 0)" },
          "100%": { transform: "scale(1.1) translate(-3%, -2%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-slow": "fade-in-slow 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in-blur": "fade-in-blur 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up": "slide-up 1s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-up-slow": "slide-up-slow 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-bottom": "slide-in-bottom 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "reveal-right": "reveal-right 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        shimmer: "shimmer 2s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "zoom-subtle": "zoom-subtle 20s ease-out forwards",
        "pan-slow": "pan-slow 30s ease-out forwards",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1000": "1000ms",
        "1200": "1200ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
        "luxury-out": "cubic-bezier(0.0, 0, 0.2, 1)",
        "luxury-in": "cubic-bezier(0.4, 0, 1, 1)",
        editorial: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
