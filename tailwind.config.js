/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#829AB1',
          500: '#627D98',
          600: '#486581',
          700: '#334E68',
          800: '#1E3A5F',
          900: '#0F243E',
          950: '#0A192F',
        },
        turquoise: {
          50: '#ECFEFF',
          100: '#CFFAFE',
          200: '#A5F3FC',
          300: '#67E8F9',
          400: '#22D3EE',
          500: '#06B6D4',
          600: '#0891B2',
          700: '#0E7490',
          800: '#155E75',
          900: '#164E63',
        },
        coral: {
          50: '#FFF5F2',
          100: '#FFE8E3',
          200: '#FFD1C7',
          300: '#FFAFA0',
          400: '#FF846D',
          500: '#FF5A36',
          600: '#EA431E',
          700: '#C5300F',
          800: '#9E270F',
          900: '#7F2413',
        },
        beige: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE7D8',
          300: '#E4D6BE',
          400: '#D5BF9E',
          500: '#C2A379',
          600: '#A9875C',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(15, 23, 42, 0.05)',
        'premium': '0 10px 30px -4px rgba(15, 36, 62, 0.08), 0 4px 12px -2px rgba(15, 36, 62, 0.04)',
        'glow': '0 0 25px rgba(6, 182, 212, 0.25)',
      },
    },
  },
  plugins: [],
}
