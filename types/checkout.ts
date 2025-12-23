/**
 * 結帳相關 Types
 */

import type { DeliveryTimeSlot, PaymentMethod } from './payment';

// 收件地址（會員常用地址）
export interface Address {
  id: number;
  userId: number;
  recipientName: string;
  recipientPhone: string;
  city: string; // 縣市
  district: string; // 鄉鎮市區
  postalCode: string; // 郵遞區號
  addressLine: string; // 詳細地址
  isDefault: boolean; // 是否為預設地址
  createdAt: string;
  updatedAt: string;
}

// 建立地址請求
export interface CreateAddressRequest {
  recipientName: string;
  recipientPhone: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  isDefault?: boolean;
}

// 建立訂單請求
export interface CreateOrderRequest {
  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  deliveryTimeSlot: DeliveryTimeSlot;
  note?: string;

  // 付款方式
  paymentMethod: PaymentMethod;

  // 可選：是否將此地址儲存為常用地址
  saveAddress?: boolean;
  setAsDefaultAddress?: boolean;
}

// 結帳表單資料（前端使用）
export interface CheckoutFormData {
  // 收件資訊
  recipientName: string;
  recipientPhone: string;
  recipientEmail: string;
  city: string;
  district: string;
  postalCode: string;
  addressLine: string;
  deliveryTimeSlot: DeliveryTimeSlot;
  note: string;

  // 付款方式
  paymentMethod: PaymentMethod;

  // 地址相關
  selectedAddressId: number | null; // 選擇的常用地址 ID
  saveAddress: boolean; // 是否儲存為常用地址
  setAsDefaultAddress: boolean; // 是否設為預設地址
}
