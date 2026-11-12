/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ocean: {
          midnight: '#002C3A',
          dark: '#003B48',
          teal: '#004C59',
          abyss: '#001F2A',
        },
        aqua: {
          cyan: '#00D9E8',
          base: '#27C9D0',
          light: '#80F5F5',
        },
        gold: {
          accent: '#FFC75E',
          bright: '#FFE08A',
          deep: '#D89E36',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#C6E4E8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'Noto Sans Arabic', 'sans-serif'],
        display: ['Manrope', 'Inter', 'Noto Sans Arabic', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '1360px',
      },
    },
  },
  plugins: [],
}
