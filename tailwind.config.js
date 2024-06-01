/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark]"'],
  content: ['./src/app/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '450px',
      sm: '640px',

      md: '768px',

      lg: '1100px',

      xl: '1280px',

      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '##000937',
        secondray: '#708cfb',
        teritary: '#2399f8',
        'white-100': '#f3f3f3',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/mainBG.png')",
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat',
        repeat: 'repeat',
        'repeat-x': 'repeat-x',
        'repeat-y': 'repeat-y',
      },
      boxShadow: {
        top: '0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    },
  },
  plugins: [],
  corePlugins: { preflight: false },
  blocklist: ['table'],
}
