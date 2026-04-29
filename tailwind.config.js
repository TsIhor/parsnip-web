import daisyui from 'daisyui';

export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cream: { 50: '#FDFAF4', 100: '#F8F0DC', 200: '#F0DFB0' },
        forest: { 400: '#5C8A5C', 500: '#3D6B3D', 600: '#2C502C' },
        rust: { 400: '#D4704A', 500: '#B85A35', 600: '#9A4525' },
      }
    }
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: '#0A6644',
          'primary-content': '#FFFFFF',
          secondary: '#FFFFFF',
          'secondary-content': '#152B1E',
          accent: '#F5A623',
          'accent-content': '#FFFFFF',
          neutral: '#2D4A3E',
          'neutral-content': '#FFFFFF',
          'base-100': '#F5FAF7',
          'base-200': '#FFFFFF',
          'base-300': '#DCE8E2',
          'base-content': '#152B1E',
        }
      },
      {
        dark: {
          primary: '#648b8e',
          secondary: '#182b30',
          accent: '#9AD1D4',
          neutral: '#d8d3b6',
          'base-100': '#3e5255',
          'base-content': '#FFFFFF',
        }
      }
    ]
  }
};
