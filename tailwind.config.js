// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['FranklinGothic', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        'background-image-move': 'background-image-move 30s linear infinite alternate',
      },
      keyframes: {
        'background-image-move': {
          from: { backgroundPosition: '0% -100%' },
          to: { backgroundPosition: '0% 0%' },
        },
      },
    },
  },
};
