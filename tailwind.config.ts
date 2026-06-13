import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './sections/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1280px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          50: '#f0f0f5',
          100: '#d9d9e6',
          200: '#b3b3cc',
          300: '#8d8db3',
          400: '#666699',
          500: '#1a1a2e',
          600: '#151525',
          700: '#10101c',
          800: '#0a0a12',
          900: '#050509',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          50: '#fef9e8',
          100: '#fdf0c2',
          200: '#fbe18a',
          300: '#f9d252',
          400: '#f7c32a',
          500: '#d4a017',
          600: '#a87d12',
          700: '#7c5c0d',
          800: '#503b08',
          900: '#241a04',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: '#10b981',
        warning: '#f59e0b',
        error: '#f43f5e',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        arabic: ['var(--font-amiri)', 'serif'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 6vw, 4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(1.75rem, 4vw, 2.8rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.5rem, 3vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        'gradient-warm': 'linear-gradient(135deg, #1a1a2e 0%, #2d132c 50%, #1a1a2e 100%)',
        'gradient-gold': 'linear-gradient(135deg, #d4a017 0%, #f9d252 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'arabesque-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cpath fill='%23d4a017' fill-opacity='0.05' d='M40 0L80 40L40 80L0 40Z M40 10L70 40L40 70L10 40Z'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-in': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 160, 23, 0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212, 160, 23, 0)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s ease-out',
        'accordion-up': 'accordion-up 0.3s ease-out',
        'fade-in': 'fade-in 0.6s ease-out forwards',
        'pulse-glow': 'pulse-glow 2.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 30s linear infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      boxShadow: {
        subtle: '0 4px 24px rgba(26, 26, 46, 0.08)',
        elevated: '0 12px 48px rgba(26, 26, 46, 0.12)',
        'gold-glow': '0 0 32px rgba(212, 160, 23, 0.35)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
