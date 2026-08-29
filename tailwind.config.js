/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F6F7FB',
        surface: '#FFFFFF',
        ink: '#0E2A2E',
        inkmuted: '#4B6360',
        line: '#E1E5EA',
        teal: {
          DEFAULT: '#0F6E6A',
          dark: '#0A4F4C',
          light: '#E4F3F2',
        },
        marigold: {
          DEFAULT: '#E8A33D',
          dark: '#B97E24',
          light: '#FBF0DC',
        },
        coral: {
          DEFAULT: '#E3573D',
          dark: '#B93F29',
          light: '#FCEAE6',
        },
        sage: {
          DEFAULT: '#4F8F63',
          dark: '#396B49',
          light: '#E9F3EC',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Manrope"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(14, 42, 46, 0.04), 0 8px 24px rgba(14, 42, 46, 0.06)',
        panel: '0 12px 40px rgba(14, 42, 46, 0.12)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
};