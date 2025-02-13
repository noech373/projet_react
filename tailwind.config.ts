/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#646cff',
            dark: '#535bf2',
          },
          secondary: {
            DEFAULT: '#1a1a1a',
            dark: '#242424',
          }
        }
      },
    },
    plugins: [],
  }