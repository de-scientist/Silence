/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sacred: {
          50: '#f5f7fa',
          100: '#e4e9f2',
          200: '#cbd5e5',
          300: '#a8b9d3',
          400: '#7d94b8',
          500: '#5c739d',
          600: '#475b82',
          700: '#3a4a69',
          800: '#2f3c54',
          900: '#1a2436',
        },
        spirit: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bffa',
          500: '#0ba5ec',
          600: '#0284c7',
          700: '#036ba1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        serif: ['Crimson Pro', 'serif'],
      },
    },
  },
  plugins: [],
}