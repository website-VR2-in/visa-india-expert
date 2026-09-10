/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        saffron: {
          50: '#FFF5EB',
          100: '#FFECD9',
          200: '#FFE0B4',
          300: '#FFD08C',
          400: '#FFB85C',
          500: '#D4762C',
          600: '#B85E1E',
          700: '#9A4D1A',
          800: '#7D3F19',
          900: '#653517',
        },
        navy: {
          50: '#E6EAF0',
          100: '#CDD6E3',
          200: '#A2B2CC',
          300: '#778EB5',
          400: '#4D6A9E',
          500: '#1A2332',
          600: '#16202B',
          700: '#111722',
          800: '#0D0F1A',
          900: '#080811',
        },
        indiangreen: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#2D7D46',
          600: '#256B3A',
          700: '#1E592E',
          800: '#164723',
          900: '#0F3518',
        },
        ivory: '#FAF8F5',
        warmgray: {
          50: '#FAFAF8',
          100: '#F5F4F0',
          200: '#E8E6DF',
          300: '#D4D1C8',
          400: '#B0ADA2',
          500: '#8A8679',
          600: '#6E6B5F',
          700: '#57554C',
          800: '#48463F',
          900: '#3C3A35',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
