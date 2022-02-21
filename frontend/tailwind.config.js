module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  purge: {
    safelist: [
      'border-blue-500',
      'border-green-500',
      'border-red-500',
      'border-amber-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-red-500',
      'bg-amber-500',
      'text-blue-500',
      'text-green-500',
      'text-red-500',
      'text-amber-500',
    ]
  },
  theme: {
    extend: {
      colors: {
        primary: '#009045',
        secondary: '#1bb55c',
        bg1: '#f4f4f4',
        bg2: '#fafafa',
        inactive: '#c4c4c4',
        'gray-text': '#263238',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
