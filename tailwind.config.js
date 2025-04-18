/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        red: {
          600: "#E41E26", // Swiss red
        },
        // New color scheme
        "hunter-green": "#386641",
        asparagus: "#6a994e",
        "yellow-green": "#a7c957",
        parchment: "#f2e8cf",
        bittersweet: "#bc4749",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", "Helvetica", "Arial", "sans-serif"],
      },
      keyframes: {
        levitate: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(2px, -2px)' },
          '50%': { transform: 'translate(-2px, 2px)' },
          '75%': { transform: 'translate(2px, 2px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        levitate1: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(3px, -1px)' },
          '50%': { transform: 'translate(-1px, 3px)' },
          '75%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        levitate2: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(-2px, 1px)' },
          '50%': { transform: 'translate(1px, -3px)' },
          '75%': { transform: 'translate(-1px, 2px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        levitate3: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(1px, 3px)' },
          '50%': { transform: 'translate(-3px, -1px)' },
          '75%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
        levitate4: {
          '0%': { transform: 'translate(0px, 0px)' },
          '25%': { transform: 'translate(-1px, -2px)' },
          '50%': { transform: 'translate(3px, 1px)' },
          '75%': { transform: 'translate(-2px, 2px)' },
          '100%': { transform: 'translate(0px, 0px)' },
        },
      },
      animation: {
        levitate: 'levitate 6s ease-in-out infinite',
        levitate1: 'levitate1 6s ease-in-out infinite',
        levitate2: 'levitate2 6s ease-in-out infinite',
        levitate3: 'levitate3 6s ease-in-out infinite',
        levitate4: 'levitate4 6s ease-in-out infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
