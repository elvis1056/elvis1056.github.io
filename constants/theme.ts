export const colors = {
  // Primary - Macaron Blue 系列
  primary: {
    main: '#5fb8d6',      // 主色
    light: '#a0d8f1',     // 淺色
    dark: '#4a9ab8',      // 深色
    50: '#f0f9fc',        // 最淺
    100: '#e8f4f8',
    200: '#a0d8f1',
    300: '#5fb8d6',
    400: '#4a9ab8',
    500: '#357a94',       // 最深
  },

  // Secondary - 輔助色
  secondary: {
    main: '#7a9ca5',      // 次要色
    light: '#b8cfd5',
    dark: '#5a7c85',
  },

  // Neutral - 中性色
  neutral: {
    white: '#fefefe',
    gray50: '#f9fafb',
    gray100: '#f3f4f6',
    gray200: '#e5e7eb',
    gray300: '#d1d5db',
    gray400: '#9ca3af',
    gray500: '#6b7280',
    gray600: '#4b5563',
    gray700: '#374151',
    gray900: '#111827',
    black: '#000000',
  },

  // Semantic - 語意色
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',

  // Background
  background: {
    default: '#fefefe',
    paper: '#ffffff',
    hover: '#f0f9fc',
  },

  // Border
  border: {
    light: '#e8f4f8',
    main: '#a0d8f1',
    dark: '#5fb8d6',
  },
} as const;

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  '2xl': '48px',
} as const;

export const typography = {
  fontFamily: {
    base: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'inherit',
  },
  fontSize: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    base: '1rem',    // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem',   // 32px
  },
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const;

export const shadows = {
  sm: '0 1px 2px rgba(95, 184, 214, 0.05)',
  md: '0 2px 8px rgba(160, 216, 241, 0.08)',
  lg: '0 4px 16px rgba(95, 184, 214, 0.12)',
} as const;

export const theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  shadows,
} as const;
