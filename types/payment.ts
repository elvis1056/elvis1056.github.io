/**
 * 付款相關 Types
 */

// 付款方式
export type PaymentMethod =
  | 'CASH_ON_DELIVERY'
  | 'ATM'
  | 'CREDIT_CARD'
  | 'LINE_PAY';

// 配送時段
export type DeliveryTimeSlot =
  | 'DELIVERY_MORNING' // 上午 (09:00-12:00)
  | 'DELIVERY_AFTERNOON' // 下午 (12:00-18:00)
  | 'DELIVERY_EVENING'; // 晚上 (18:00-21:00)

// 付款狀態
export type PaymentStatus =
  | 'PAYMENT_PENDING'
  | 'PAYMENT_PAID'
  | 'PAYMENT_FAILED'
  | 'PAYMENT_REFUNDED';
