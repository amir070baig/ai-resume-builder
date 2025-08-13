module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        green: {
          500: '#22c55e',
          600: '#16a34a'
        },
        gray: {
          700: '#374151',
          800: '#1f2937',
          200: '#e5e7eb'
        },
        white: '#ffffff'
      }
    },
  },
  plugins: [],
};
