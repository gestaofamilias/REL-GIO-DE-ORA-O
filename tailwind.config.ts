import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        kerigma: {
          blue: '#0057FF',
          orange: '#FF6A00',
          deep: '#003083',
          light: '#4DA6FF',
          navy: '#001A4E',
          dark: '#000D2E',
        },
        glass: {
          white: 'rgba(255,255,255,0.06)',
          blue: 'rgba(0,87,255,0.15)',
          orange: 'rgba(255,106,0,0.15)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundImage: {
        'kerigma-gradient': 'linear-gradient(135deg, #000D2E 0%, #001A4E 40%, #003083 70%, #0057FF 100%)',
        'hero-gradient': 'radial-gradient(ellipse at top, #0057FF22 0%, transparent 60%)',
        'card-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
        'btn-primary': 'linear-gradient(135deg, #0057FF 0%, #FF6A00 100%)',
        'btn-blue': 'linear-gradient(135deg, #0057FF 0%, #003083 100%)',
        'glow-blue': 'radial-gradient(circle, rgba(0,87,255,0.3) 0%, transparent 70%)',
        'glow-orange': 'radial-gradient(circle, rgba(255,106,0,0.3) 0%, transparent 70%)',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glow-blue': '0 0 20px rgba(0,87,255,0.4), 0 0 40px rgba(0,87,255,0.2)',
        'glow-orange': '0 0 20px rgba(255,106,0,0.4), 0 0 40px rgba(255,106,0,0.2)',
        'card': '0 20px 60px rgba(0,0,0,0.4)',
        'inner-glow': 'inset 0 0 30px rgba(0,87,255,0.1)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'count-up': 'countUp 2s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'wave': 'wave 8s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        wave: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};

export default config;
