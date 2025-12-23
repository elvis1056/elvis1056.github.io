/**
 * 訂單相關 Types（訂單詳情頁使用）
 */

import type { DeliveryTimeSlot, PaymentMethod, PaymentStatus } from './payment';

// 訂單狀態
export type OrderStatus =
  | 'ORDER_PENDING' // 待處理
  | 'ORDER_CONFIRMED' // 已確認
  | 'ORDER_PROCESSING' // 處理中
  | 'ORDER_SHIPPING' // 配送中
  | 'ORDER_DELIVERED' // 已送達
  | 'ORDER_COMPLETED' // 已完成
  | 'ORDER_CANCELLED'; // 已取消

// 訂單商品項目
export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productName: string;
  productDescription: string;
  productImageUrl: string | null;
  unitPrice: number; // 單價
  quantity: number; // 數量
  subtotal: number; // 小計
}

// 訂單
export interface Order {
  id: number;
  userId: number;
  orderNumber: string; // 訂單編號（例如：ORD20250101001）
  status: OrderStatus;

  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  deliveryTimeSlot: DeliveryTimeSlot;
  note: string | null; // 訂單備註

  // 付款資訊
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;

  // 金額
  subtotal: number; // 商品小計
  shippingFee: number; // 運費
  totalAmount: number; // 總金額

  // 時間
  createdAt: string;
  updatedAt: string;
  paidAt: string | null; // 付款時間
  shippedAt: string | null; // 出貨時間
  deliveredAt: string | null; // 送達時間

  // 訂單項目
  items: OrderItem[];
}
