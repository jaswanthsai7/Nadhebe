import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    spacing: {
      0: '0px',
      4: '4px',
      8: '8px',
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
      48: '48px',
      64: '64px',
      96: '96px',
    },
    extend: {
      maxWidth: {
        article: '720px',
      },
      width: {
        sidebar: '224px',
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
          DEFAULT: '#5E6AD2', // Premium Indigo
          dark: '#818CF8',    // Smooth Indigo for dark mode
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
        display: ['56px', { lineHeight: '1.05', letterSpacing: '-0.02em', fontWeight: '700' }],
        hero: ['40px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['32px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['20px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        h4: ['16px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-large': ['18px', { lineHeight: '1.5' }],
        body: ['15px', { lineHeight: '1.6' }],
        caption: ['13px', { lineHeight: '1.4' }],
        meta: ['13px', { lineHeight: '1.4', fontFamily: '"JetBrains Mono", ui-monospace, monospace' }],
      },
      borderRadius: {
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
        card: '12px',
        control: '8px',
        pill: '999px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.04), 0 0 1px rgba(0,0,0,0.08)',
        medium: '0 4px 12px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.04)',
        large: '0 12px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        card: '0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.04)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
        250: '250ms',
      },
    },
  },
  plugins: [typography],
};
