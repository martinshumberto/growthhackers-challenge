module.exports = {
  content: ['./index.html', '**/*.{ts,jsx,tsx}'],
  theme: {
    extend: {
      fontWeight: ['hover', 'focus'],
      colors: {
        primary: {
          DEFAULT: '#003459',
          900: '#00171F',
        },
        secondary: {
          DEFAULT: '#007EA7',
        },
        tertiary: {
          DEFAULT: '#00A8E8',
        },
      },
    },
  },
};
