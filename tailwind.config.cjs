module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    screens: {
      mobile: '320px',
      tablet: '800px',
      desktop: '1300px',
    },
    extend: {
      gridTemplateColumns: {
        1: 'repeat(1, minmax(0, 1fr))',
        2: 'repeat(2, minmax(0, 1fr))',
        3: 'repeat(3, minmax(0, 1fr))',
        4: 'repeat(4, minmax(0, 1fr))',
        5: 'repeat(5, minmax(0, 1fr))',
        6: 'repeat(6, minmax(0, 1fr))',
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))',
        10: 'repeat(10, minmax(0, 1fr))',
        11: 'repeat(11, minmax(0, 1fr))',
        12: 'repeat(12, minmax(0, 1fr))',
        none: 'none',
        'fill-40': 'repeat(auto-fill, 10rem)',
      },
      letterSpacing: {
        maxtight: '-0.1rem',
        maxtighter: '-0.15rem',
      },
      colors: {
        'main-1': '#403b71',
        'main-2': '#7a6fe7',
        'main-3': '#fadbdb',
        'main-4': '#0c0546',

        'main-5': '#C1B5B7',
        'main-6': '#A66569',
        'main-7': '#cfdae0',
        naver: '#2DBF00',
      },
      rotate: {
        135: '135deg',
        225: '225deg',
      },
      fontSize: {
        20: '20px',
        24: '24px',
        xs: '0.75rem',
        '2xs': '0.6rem',
      },

      borderWidth: {
        DEFAULT: '1px',
      },
      keyframes: {
        slide: {
          '0%': { marginLeft: '-100%' },
          '100%': { marginLeft: '0' },
        },
        fadeIn: {
          '0%': { display: 'block', opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', display: 'none' },
        },
        dimmed: {
          '0%': { display: 'block', opacity: '0' },
          '100%': { opacity: '0.8' },
        },
        sparkle: {
          '0%': {
            backgroundSize: '400% 400%',
            backgroundImage: `linear-gradient(
              90deg,
              #7fefbd 0%,
              #fff689 11%,
              #ec0b43 22%,
              #7fefbd 33%,
              #fff689 44%,
              #ec0b43 55%,
              #7fefbd 66%,
              #fff689 77%,
              #ec0b43 88%,
              #7fefbd 100%
            )`,
            backgroundPosition: '0% 50%',
          },
          '100%': {
            backgroundSize: '400% 400%',
            backgroundImage: `linear-gradient(
              90deg,
              #7fefbd 0%,
              #fff689 11%,
              #ec0b43 22%,
              #7fefbd 33%,
              #fff689 44%,
              #ec0b43 55%,
              #7fefbd 66%,
              #fff689 77%,
              #ec0b43 88%,
              #7fefbd 100%
            )`,
            backgroundPosition: '400% 50%',
          },
        },
        sparkleBorder: {
          '0%': {
            backgroundPosition: '0% 50%',
          },
          '50%': {
            backgroundPosition: '100% 50%',
          },
          '100%': {
            backgroundPosition: '0% 50%',
          },
        },

        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)',
          },
        },
      },
      animation: {
        'reverse-spin': 'reverse-spin 1s linear infinite',
        slide: 'slide 0.5s ease-in-out forwards',
        fadeIn: 'fadeIn 0.2s ease-in-out forwards',
        fadeOut: 'fadeOut 0.2s ease-in-out forwards',
        dimmed: 'dimmed 0.2s ease-in-out forwards',
        sparkle: 'sparkle 12s linear infinite',
        sparkleBorder: 'sparkleBorder 12s linear infinite',
      },
    },
  },
  plugins: [],
};
