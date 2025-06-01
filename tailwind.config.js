/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#7C3AED',
          dark: '#8B5CF6',
        },
        background: {
          light: '#FFFFFF',
          dark: '#0F172A',
        },
        card: {
          light: '#F8FAFC',
          dark: '#1E293B',
        },
        text: {
          light: '#1E293B',
          dark: '#F1F5F9',
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
        sans: ['Inter', 'Roboto', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12)',
        'button-hover': '0 10px 15px -3px rgba(124, 58, 237, 0.3)',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};