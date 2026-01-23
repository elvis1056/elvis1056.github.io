export const colors = {
  // Primary - 經典藍系列（信賴、專業、科技感）
  primary: {
    main: '#0071E3', // 經典藍
    light: '#0077ED', // 淺藍（Hover 狀態）
    dark: '#006EDB', // 深藍（Active 狀態）
    50: '#E6F2FF', // 最淺藍白
    100: '#CCE5FF', // 很淺藍
    200: '#99CBFF', // 淺藍
    300: '#0071E3', // 主色
    400: '#006EDB', // 深藍
    500: '#0062CC', // 最深藍
  },

  // Secondary - 深灰系列（專業、穩重）
  secondary: {
    main: '#86868B', // 次要灰
    light: '#A1A1A6', // 淺灰
    dark: '#6E6E73', // 深灰
  },

  // Accent - 橙色點綴（活力、引導）
  accent: {
    main: '#F56300', // 橙色
    light: '#FF7A1F', // 淺橙
    dark: '#D45500', // 深橙
  },

  // Neutral - 中性色系
  neutral: {
    white: '#FFFFFF',
    gray50: '#FAFAFA',
    gray100: '#F5F5F7',
    gray200: '#E8E8ED',
    gray300: '#D2D2D7',
    gray400: '#AEAEB2',
    gray500: '#86868B',
    gray600: '#6E6E73',
    gray700: '#515154',
    gray900: '#1D1D1F',
    black: '#000000',
  },

  // Semantic - 語意色
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0071E3', // 使用 藍作為 info 色

  // Background
  background: {
    default: '#F5F5F7', // 淺灰背景
    paper: '#FFFFFF', // 純白卡片
    hover: '#FAFAFA', // hover 稍微變色
  },

  // Border
  border: {
    light: '#E8E8ED', // 很淺灰邊框
    main: '#D2D2D7', // 標準邊框
    dark: '#AEAEB2', // 深灰邊框
  },

  // Text
  text: {
    primary: '#1D1D1F', // 主要文字：深灰黑
    secondary: '#86868B', // 次要文字：中灰
    disabled: '#AEAEB2', // 禁用文字：淺灰
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
  sm: '0 1px 2px rgba(0, 0, 0, 0.06)', // 風格陰影
  md: '0 2px 8px rgba(0, 0, 0, 0.1)',
  lg: '0 4px 16px rgba(0, 0, 0, 0.15)',
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
