import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    spacing: {
      0: '0px',
      1: '1px',
      2: '2px',
      4: '4px',
      6: '6px',
      8: '8px',
      12: '12px',
      16: '16px',
      20: '20px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
      80: '80px',
      96: '96px',
      128: '128px',
    },
    extend: {
      maxWidth: {
        article: '720px',
        content: '1120px',
      },
      width: {
        sidebar: '224px',
      },
      colors: {
        bg: {
          DEFAULT: '#FAFAFA',
          dark: '#0A0A0A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#141414',
        },
        surface2: {
          DEFAULT: '#F5F5F5',
          dark: '#1E1E1E',
        },
        hover: {
          DEFAULT: '#F0F0F0',
          dark: '#262626',
        },
        border: {
          DEFAULT: '#E5E5E5',
          dark: '#262626',
        },
        ink: {
          DEFAULT: '#0A0A0A',
          dark: '#FAFAFA',
        },
        ink2: {
          DEFAULT: '#525252',
          dark: '#A3A3A3',
        },
        muted: {
          DEFAULT: '#A3A3A3',
          dark: '#525252',
        },
        accent: {
          DEFAULT: '#5E6AD2',
          dark: '#818CF8',
        },
        'rating-gold': {
          DEFAULT: '#B7862C',
          dark: '#D6A85A',
        },
        success: {
          DEFAULT: '#16A34A',
          dark: '#4ADE80',
        },
        danger: {
          DEFAULT: '#DC2626',
          dark: '#F87171',
        },
        code: {
          DEFAULT: '#F5F5F5',
          dark: '#141414',
        },
      },
      fontFamily: {
        display: ['"Geist Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.08', letterSpacing: '-0.025em', fontWeight: '700' }],
        hero: ['36px', { lineHeight: '1.12', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['30px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        h2: ['22px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        h3: ['18px', { lineHeight: '1.35', letterSpacing: '-0.01em', fontWeight: '600' }],
        h4: ['15px', { lineHeight: '1.4', fontWeight: '600' }],
        'body-large': ['17px', { lineHeight: '1.6' }],
        body: ['15px', { lineHeight: '1.65' }],
        caption: ['13px', { lineHeight: '1.5' }],
        meta: ['12px', { lineHeight: '1.5', fontFamily: '"JetBrains Mono", ui-monospace, monospace' }],
        xs: ['11px', { lineHeight: '1.4' }],
      },
      borderRadius: {
        4: '4px',
        6: '6px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        card: '12px',
        control: '8px',
        pill: '999px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0,0,0,0.03)',
        medium: '0 2px 8px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
        large: '0 8px 24px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
        card: '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
      },
      transitionDuration: {
        150: '150ms',
        200: '200ms',
      },
    },
  },
  plugins: [typography],
};
