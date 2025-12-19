import type { Cart, AddToCartRequest, UpdateCartItemRequest } from '@/types';

import { apiClient } from './client';

/**
 * 查詢購物車
 */
export async function fetchCart(): Promise<Cart> {
  return apiClient.get<Cart>('/api/cart', { requiresAuth: true });
}

/**
 * 加入商品到購物車
 */
export async function addToCart(data: AddToCartRequest): Promise<Cart> {
  return apiClient.post<Cart>('/api/cart/items', data, {
    requiresAuth: true,
  });
}

/**
 * 更新購物車項目數量
 */
export async function updateCartItem(
  id: number,
  data: UpdateCartItemRequest
): Promise<Cart> {
  return apiClient.put<Cart>(`/api/cart/items/${id}`, data, {
    requiresAuth: true,
  });
}

/**
 * 移除購物車項目
 */
export async function removeCartItem(id: number): Promise<Cart> {
  return apiClient.delete<Cart>(`/api/cart/items/${id}`, {
    requiresAuth: true,
  });
}

/**
 * 清空購物車
 */
export async function clearCart(): Promise<void> {
  return apiClient.delete<void>('/api/cart', { requiresAuth: true });
}
