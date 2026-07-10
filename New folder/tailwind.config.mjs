import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    spacing: {
      0: '0px',
      2: '2px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      48: '48px',
      64: '64px',
      96: '96px',
      128: '128px',
    },
    extend: {
      maxWidth: {
        article: '780px',
      },
      colors: {
        bg: {
          DEFAULT: '#FFFFFF',
          dark: '#000000',
        },
        surface: {
          DEFAULT: '#FBFBFD',
          dark: '#1C1C1E',
        },
        surface2: {
          DEFAULT: '#F5F5F7',
          dark: '#2C2C2E',
        },
        hover: {
          DEFAULT: '#F0F0F2',
          dark: '#38383A',
        },
        border: {
          DEFAULT: '#E4E4E7',
          dark: '#38383A',
        },
        ink: {
          DEFAULT: '#1D1D1F',
          dark: '#F5F5F7',
        },
        ink2: {
          DEFAULT: '#6E6E73',
          dark: '#98989D',
        },
        muted: {
          DEFAULT: '#A1A1A6',
          dark: '#6E6E73',
        },
        accent: {
          DEFAULT: '#3355FF',
          dark: '#5C7CFF',
        },
        'rating-gold': {
          DEFAULT: '#B7862C',
          dark: '#D6A85A',
        },
        success: {
          DEFAULT: '#1E8E5A',
          dark: '#3FBE84',
        },
        danger: {
          DEFAULT: '#C0392B',
          dark: '#E0584A',
        },
        code: {
          DEFAULT: '#F5F5F7',
          dark: '#0D0D0F',
        },
      },
      fontFamily: {
        display: ['"Geist Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        h1: ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        h2: ['28px', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        h3: ['20px', { lineHeight: '1.3', letterSpacing: '-0.02em' }],
        body: ['17px', { lineHeight: '1.6' }],
        meta: ['13px', { lineHeight: '1.4', fontFamily: '"JetBrains Mono", ui-monospace, monospace' }],
      },
      borderRadius: {
        card: '4px',
        control: '8px',
        pill: '999px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [typography],
};
