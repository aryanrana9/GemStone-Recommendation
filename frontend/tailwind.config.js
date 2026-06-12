/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        cosmic: {
          950: '#030014', // Very deep space black
          900: '#080721', // Dark space navy
          800: '#0f0c31', // Space dark blue
          700: '#1a155c', // Cosmic indigo
          DEFAULT: '#6366f1'
        },
        gem: {
          ruby: '#e11d48',
          emerald: '#10b981',
          sapphire: '#2563eb',
          yellow: '#eab308',
          pearl: '#f8fafc',
          coral: '#f97316',
          diamond: '#38bdf8',
          opal: '#a855f7',
          amethyst: '#8b5cf6',
          topaz: '#f59e0b'
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        twinkle: {
          '0%, 100%': { opacity: 0.2 },
          '50%': { opacity: 0.8 },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg) translateX(10px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(10px) rotate(-360deg)' }
        }
      }
    },
  },
  plugins: [],
}
