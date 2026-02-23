/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#ff3b3b',
        'dark': '#0a0a0a'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanVertical': 'scanVertical 8s ease-in-out infinite alternate',
      },
      keyframes: {
        scanVertical: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(230%)' }, // Adjusts the distance the plasma travels down the screen
        }
      }
    },
  },
  plugins: [],
}
