/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ps: {
          base: '#111111',
          panel: '#1E1E1E',
          light: '#323232',
          blue: '#31A8FF',
          blueDark: '#001E36',
        },
        primary: {
          light: '#31A8FF',
          dark: '#31A8FF',
        },
        background: {
          light: '#FFFFFF',
          dark: '#111111',
        },
        card: {
          light: '#F8FAFC',
          dark: '#1E1E1E',
        },
        text: {
          light: '#1E293B',
          dark: '#d4d4d4',
        },
        success: {
          light: '#10B981',
          dark: '#34D399',
        },
        error: {
          light: '#EF4444',
          dark: '#F87171',
        },
        warning: {
          light: '#F59E0B',
          dark: '#FBBF24',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'ps-gradient': 'linear-gradient(to right, #31A8FF, #8cd0ff)',
        'glass': 'linear-gradient(145deg, rgba(40, 40, 40, 0.6) 0%, rgba(20, 20, 20, 0.4) 100%)',
        'glass-hover': 'linear-gradient(145deg, rgba(50, 50, 50, 0.7) 0%, rgba(30, 30, 30, 0.5) 100%)',
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.5)',
        'button-hover': '0 10px 20px -10px rgba(49, 168, 255, 0.4)',
        'ps-blue': '0 0 10px rgba(49, 168, 255, 0.3)',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'blob': 'blob 10s infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};