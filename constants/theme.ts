export const colors = {
  // Primary - 深橄欖綠系列（自然、專業、沉穩）
  primary: {
    main: '#6B7F5C', // 深橄欖綠
    light: '#8FA17D', // 淺橄欖綠
    dark: '#4D5E42', // 深綠
    50: '#f4f6f2', // 最淺（淡綠白）
    100: '#e8ede4', // 很淺
    200: '#8FA17D', // 淺色
    300: '#6B7F5C', // 主色
    400: '#4D5E42', // 深色
    500: '#3A4833', // 最深
  },

  // Secondary - 金棕色系列（溫暖、奢華）
  secondary: {
    main: '#9B764F', // 金棕色
    light: '#B89470', // 淺金棕
    dark: '#7A5D3F', // 深棕
  },

  // Accent - 金色點綴
  accent: {
    main: '#D4AF37', // 金色
    light: '#E5C56B', // 淺金
    dark: '#B8942A', // 深金
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
    default: '#f5e6d3', // 淺米黃紙質色
    paper: '#faf6f0', // 卡片背景稍亮一點
    hover: '#ebe1d0', // hover 稍深一點
  },

  // Border
  border: {
    light: '#e8ede4', // 淺綠白
    main: '#8FA17D', // 淺橄欖綠
    dark: '#6B7F5C', // 深橄欖綠
  },

  // Text
  text: {
    primary: '#000000', // 主要文字：黑色
    secondary: '#374151', // 次要文字：深灰
    disabled: '#9ca3af', // 禁用文字：淺灰
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
    xs: '0.75rem', // 12px
    sm: '0.875rem', // 14px
    base: '1rem', // 16px
    lg: '1.125rem', // 18px
    xl: '1.25rem', // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '2rem', // 32px
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
  sm: '0 1px 2px rgba(107, 127, 92, 0.06)', // 深橄欖綠陰影
  md: '0 2px 8px rgba(107, 127, 92, 0.1)',
  lg: '0 4px 16px rgba(107, 127, 92, 0.15)',
} as const;

export const zIndex = {
  base: 1,
  dropdown: 10,
  navbar: 100,
  mobileMenu: 101,
  modal: 200,
  modalBackdrop: 199,
  notification: 300,
  overlay: 1000,
} as const;

export const theme = {
  colors,
  spacing,
  typography,
  breakpoints,
  shadows,
  zIndex,
} as const;
