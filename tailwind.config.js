/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E1E1E',
        secondary: 'var(--secondaryColor)',
        extraDark: '#0B0B0B',
        muted: '#57585A',
        skiyBlue: '#0057FF',
      },
      fontSize: {
        sm: [
          '13px',
          {
            lineHeight: '21px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        xs: [
          '11px',
          {
            lineHeight: '21px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],

        md: [
          '18px',
          {
            lineHeight: '22px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        lg: [
          '19px',
          {
            lineHeight: '27px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        xl: [
          '23px',
          {
            lineHeight: '39px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
        base: [
          '16px',
          {
            lineHeight: '24px',
            letterSpacing: '-0.01em',
            fontWeight: '400',
          },
        ],
      },
    },
  },
  plugins: [],
};
