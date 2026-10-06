/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './public/**/*.html',
    './*.html',
  ],
  theme: {
    extend: {
      colors: {
        // primary (sky blue): { 50: '#F0F9FF', 100: '#E0F2FE', 500: '#0EA5E9', 600: '#0284C7' }
        primary: {
          50: '#F0F9FF',
          100: '#E0F2FE',
          500: '#0EA5E9',
          600: '#0284C7',
        },
        // accent (pastel yellow): { 100: '#FEF9C3', 400: '#FACC15', 500: '#EAB308' }
        accent: {
          100: '#FEF9C3',
          400: '#FACC15',
          500: '#EAB308',
        },
        // neutral canvas: '#F8FAFC'
        canvas: '#F8FAFC',
        neutral: {
          canvas: '#F8FAFC',
        },
      },
      borderRadius: {
        '3xl': '24px', // 24px default rounded for Card styling
      },
      boxShadow: {
        'soft-sm': '0 2px 8px 0 rgba(14, 165, 233, 0.04), 0 1px 3px 0 rgba(0, 0, 0, 0.02)',
        'soft-md': '0 10px 25px -5px rgba(14, 165, 233, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.02)',
        'soft-card': '0 10px 25px -5px rgba(0, 0, 0, 0.04), 0 4px 10px -2px rgba(0, 0, 0, 0.02)',
      },
    },
  },
  plugins: [],
};
