/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1A237E",
        secondary: "#FF6F00",
        accent: "#FF6F00",
        success: "#2E7D32",
        warning: "#FF8F00",
        danger: "#C62828",
        bg: "#F5F7FB",
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(26, 35, 126, 0.08)',
        'float': '0 10px 30px -5px rgba(26, 35, 126, 0.12)',
        'glow': '0 0 15px rgba(255, 111, 0, 0.3)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        }
      }
    },
  },
  plugins: [],
}
