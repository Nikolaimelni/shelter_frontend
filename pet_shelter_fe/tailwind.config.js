/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue-start': '#227175',
        'custom-blue-end': '#126A8C',
        'main-color': '#15708F',
      },
      backgroundImage: theme => ({
        'button-gradient': `linear-gradient(90deg, ${theme('colors.custom-blue-start')} 0%, ${theme('colors.custom-blue-end')} 100%)`,
      }),
    },
  },
  plugins: [],
}

