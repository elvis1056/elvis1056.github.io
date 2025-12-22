/**
 * 結帳相關常數
 */

// 運費設定
export const SHIPPING_FEE = 100;
export const FREE_SHIPPING_THRESHOLD = 1000; // 滿額免運

// 付款方式選項
export const PAYMENT_METHODS = [
  { value: 'CASH_ON_DELIVERY', label: '貨到付款' },
  { value: 'CREDIT_CARD', label: '信用卡' },
  { value: 'ATM', label: 'ATM 轉帳' },
  { value: 'LINE_PAY', label: 'LINE Pay' },
] as const;

// 配送時段選項
export const DELIVERY_TIME_SLOTS = [
  { value: 'DELIVERY_MORNING', label: '上午 (9:00-12:00)' },
  { value: 'DELIVERY_AFTERNOON', label: '下午 (13:00-18:00)' },
  { value: 'DELIVERY_EVENING', label: '晚上 (18:00-21:00)' },
] as const;

// 表單驗證
export const FORM_VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9-]+$/,
  DEBOUNCE_DELAY: 300, // ms
} as const;

// 欄位標籤
export const FIELD_LABELS = {
  recipientName: '收件人姓名',
  recipientPhone: '聯絡電話',
  recipientEmail: 'Email',
  city: '縣市',
  district: '鄉鎮市區',
  postalCode: '郵遞區號',
  addressLine: '詳細地址',
} as const;
