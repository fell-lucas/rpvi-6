module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#009045',
        secondary: '#1bb55c',
        bg1: '#f4f4f4',
        bg2: '#fafafa',
        'bg-inactive': '#c4c4c4',
        'gray-text': '#263238',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
