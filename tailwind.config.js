/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neon: {
          DEFAULT: '#00D2FF',
          bright: '#38BDF8',
          dim: '#0288A8',
          deep: '#014155',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          deep: '#050505',
          card: '#0E0E0E',
          border: '#1A1A1A',
        },
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 210, 255, 0.3), 0 0 40px rgba(0, 210, 255, 0.15)',
        'neon-lg': '0 0 30px rgba(0, 210, 255, 0.4), 0 0 60px rgba(0, 210, 255, 0.2), 0 0 80px rgba(0, 210, 255, 0.1)',
        'neon-sm': '0 0 10px rgba(0, 210, 255, 0.4)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s ease-out infinite',
      },
    },
  },
  plugins: [],
};
