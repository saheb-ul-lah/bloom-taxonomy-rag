// tailwind.config.ts
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"], // Keep 'class' for manual toggling
  content: [
    "./pages/**/*.{ts,tsx,jsx}", // Added jsx
    "./components/**/*.{ts,tsx,jsx}", // Added jsx
    "./app/**/*.{ts,tsx,jsx}", // Added jsx
    "./src/**/*.{ts,tsx,jsx}", // Added jsx
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Default sans-serif
        heading: ['Montserrat', 'sans-serif'], // For headings
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
          // Lighter/darker shades for hover/active states
          light: 'hsl(var(--primary-light))',
          dark: 'hsl(var(--primary-dark))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
          light: 'hsl(var(--secondary-light))',
          dark: 'hsl(var(--secondary-dark))',
        },
        tertiary: { // Added tertiary color definition based on your theme
          DEFAULT: 'hsl(var(--tertiary))',
          foreground: 'hsl(var(--tertiary-foreground))',
          light: 'hsl(var(--tertiary-light))',
          dark: 'hsl(var(--tertiary-dark))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Your specific theme colors - we'll use HSL variables for these too
        // theme: {
        //   primary: '#C70039', // Will be var(--theme-primary-base)
        //   secondary: '#511849', // Will be var(--theme-secondary-base)
        //   tertiary: '#900C3F', // Will be var(--theme-tertiary-base)
        // }
        // New AI-SaaS inspired palette (can be adjusted)
        brand: {
          // A vibrant primary for AI feel
          primary: 'hsl(var(--brand-primary))', // e.g., A bright blue or teal
          secondary: 'hsl(var(--brand-secondary))', // e.g., A deep purple or indigo
          accent: 'hsl(var(--brand-accent))', // e.g., A vivid pink or orange for CTAs
        },
        // Gradients
        gradient: {
          start: 'hsl(var(--gradient-start))',
          middle: 'hsl(var(--gradient-middle))',
          end: 'hsl(var(--gradient-end))',
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
        '2xl': 'calc(var(--radius) + 8px)',
      },
      boxShadow: {
        'glow-primary': '0 0 15px 5px hsl(var(--primary) / 0.3)',
        'glow-accent': '0 0 15px 5px hsl(var(--brand-accent) / 0.4)',
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.03), 0 2px 4px -1px rgba(0, 0, 0, 0.02)', // Softer shadow
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' }
        },
        'slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px hsl(var(--primary-light))' },
          '50%': { boxShadow: '0 0 20px 10px hsl(var(--primary-light) / 0.5)' },
        },
        'gradient-flow': { // For animated gradients
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'fade-in-down': 'fade-in-down 0.6s ease-out forwards',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-out': 'fade-out 0.5s ease-out forwards',
        'slide-in-left': 'slide-in-left 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'slide-in-right': 'slide-in-right 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'pulse-glow': 'pulse-glow 2.5s infinite ease-in-out',
        'gradient-flow': 'gradient-flow 15s ease infinite',
        'shimmer': 'shimmer 2s infinite linear',
        'spin-slow': 'rotate 10s linear infinite',
        'float': 'float 3s ease-in-out infinite',
      }
    }
  },
  plugins: [tailwindcssAnimate, typography],
} satisfies Config;