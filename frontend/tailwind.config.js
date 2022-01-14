const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'cultured': '#fafafa',
      'baby-blue-eyes': '#b7d7fd',
      'french-sky-blue': '#73b3ff',
      'blue-crayola': '#1d79ff',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
    }
  },
  plugins: [],
}
