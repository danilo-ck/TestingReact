/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores personalizados con tu color #00DDB4
        primary: {
          50: '#f0fdf9',
          100: '#ccfbef',
          200: '#99f6e0',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#00DDB4', // Tu color principal
          600: '#00c4a7',
          700: '#00a693',
          800: '#00857a',
          900: '#006b63',
        },
        accent: {
          500: '#3b82f6', // Azul para botones secundarios
          600: '#2563eb',
        }
      }
    },
  },
  plugins: [],
}
