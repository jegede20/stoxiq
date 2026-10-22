/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Backgrounds
        'bg-base-0': '#0A0A0F',
        'bg-base-1': '#0F0F1A',
        'bg-surface-2': '#13131F',
        'bg-elevated-3': '#1A1A2E',

        // Glass Layers
        'glass-1': 'rgba(255,255,255,0.03)',
        'glass-2': 'rgba(255,255,255,0.06)',
        'glass-3': 'rgba(255,255,255,0.10)',
        'glass-border': 'rgba(255,255,255,0.08)',
        'glass-hover': 'rgba(255,255,255,0.07)',

        // Text
        'text-primary': '#F5F4EF',
        'text-secondary': '#A8A89C',
        'text-tertiary': '#5C5C54',
        'text-accent': '#D4C99A',

        // Gold (Primary Brand Accent)
        'gold-base': '#C9A84C',
        'gold-light': '#E8D08A',
        'gold-dim': '#7A6430',
        'gold-glow': 'rgba(201,168,76,0.15)',
        'gold-border': 'rgba(201,168,76,0.30)',
        'gold-fill': 'rgba(201,168,76,0.08)',

        // Semantic
        'positive': '#4ADE80',
        'positive-dim': 'rgba(74,222,128,0.10)',
        'negative': '#F87171',
        'negative-dim': 'rgba(248,113,113,0.10)',
        'warning': '#F59E0B',
        'warning-dim': 'rgba(245,158,11,0.10)',
        'neutral': '#94A3B8',

        // Graph
        'graph-line': '#C9A84C',
        'graph-line-2': '#6366F1',
        'graph-fill': 'rgba(201,168,76,0.08)',
        'graph-grid': 'rgba(255,255,255,0.04)',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        playfair: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['72px', { lineHeight: '1.08', letterSpacing: '-1.5px', fontWeight: '700' }],
        'display-l': ['56px', { lineHeight: '1.12', letterSpacing: '-1px', fontWeight: '700' }],
        'display-m': ['48px', { lineHeight: '1.15', letterSpacing: '-0.5px', fontWeight: '700' }],
        'h1': ['40px', { lineHeight: '1.2', fontWeight: '600' }],
        'h2': ['30px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3': ['22px', { lineHeight: '1.4', fontWeight: '500' }],
        'h4': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'subtitle': ['18px', { lineHeight: '1.8', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.8', fontWeight: '400' }],
        'body-sm': ['15px', { lineHeight: '1.9', fontWeight: '400' }],
        'small': ['13px', { lineHeight: '1.5', fontWeight: '400' }],
        'xs-caps': ['11px', { lineHeight: '1.2', letterSpacing: '2px', fontWeight: '700' }],
        'micro': ['10px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        full: '9999px',
      },
      boxShadow: {
        'glass-1': '0 2px 8px rgba(10,10,15,0.45), 0 1px 0 rgba(245,244,239,0.06) inset',
        'glass-2': '0 8px 32px rgba(10,10,15,0.55), 0 1px 0 rgba(245,244,239,0.06) inset',
        'glass-3': '0 16px 48px rgba(10,10,15,0.65), 0 1px 0 rgba(245,244,239,0.06) inset',
        'glass-gold': '0 8px 32px rgba(10,10,15,0.55), 0 1px 0 rgba(245,244,239,0.06) inset, 0 0 20px rgba(201,168,76,0.08)',
        'glass-amber': '0 8px 32px rgba(10,10,15,0.55), 0 1px 0 rgba(245,244,239,0.06) inset, 0 0 20px rgba(245,158,11,0.10)',
      },
      keyframes: {
        float1: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        float2: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(8px)' },
        },
        float3: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        heroFadeUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        goldBloom: {
          '0%': { opacity: '0', transform: 'translateY(12px)', filter: 'drop-shadow(0 0 0px rgba(201,168,76,0))' },
          '60%': { opacity: '1', transform: 'translateY(0)', filter: 'drop-shadow(0 0 18px rgba(201,168,76,0.45))' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'drop-shadow(0 0 8px rgba(201,168,76,0.15))' },
        },
        pageIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0.35)' },
          '50%': { boxShadow: '0 0 0 8px rgba(201,168,76,0)' },
        },
        bounceCheck: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '55%': { transform: 'scale(1.18)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        shimmerBorder: {
          '0%, 100%': { borderColor: 'rgba(201,168,76,0.28)' },
          '50%': { borderColor: 'rgba(232,208,138,0.65)' },
        },
      },
      animation: {
        'float-1': 'float1 6s ease-in-out infinite',
        'float-2': 'float2 7s ease-in-out infinite 1s',
        'float-3': 'float3 5s ease-in-out infinite 2s',
        'hero-fade-up': 'heroFadeUp 600ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'gold-bloom': 'goldBloom 700ms cubic-bezier(0.22, 1, 0.36, 1) both',
        'page-in': 'pageIn 300ms ease-out both',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        'bounce-check': 'bounceCheck 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both',
        'marquee': 'marquee 28s linear infinite',
        'shimmer-border': 'shimmerBorder 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
