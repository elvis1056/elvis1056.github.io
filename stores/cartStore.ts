import { create } from 'zustand';

import {
  addToCart,
  clearCart,
  fetchCart,
  removeCartItem,
  updateCartItem,
} from '@/lib/api/cart';
import type { Cart } from '@/types';

interface CartStore {
  // 購物車狀態
  cart: Cart | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  loadCart: () => Promise<void>;
  addItem: (productId: number, quantity: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearAllItems: () => Promise<void>;

  // Computed values (透過 getter)
  getTotalItems: () => number;
  getTotalAmount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  // 初始狀態
  cart: null,
  isLoading: false,
  error: null,

  // 載入購物車
  loadCart: async () => {
    set({ isLoading: true, error: null });
    try {
      const cart = await fetchCart();
      set({ cart, isLoading: false });
    } catch (error) {
      console.error('Failed to load cart:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to load cart',
        isLoading: false,
      });
    }
  },

  // 加入商品到購物車
  addItem: async (productId: number, quantity: number) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await addToCart({ productId, quantity });
      set({ cart, isLoading: false });
    } catch (error) {
      console.error('Failed to add item:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to add item',
        isLoading: false,
      });
      throw error; // 讓呼叫者知道失敗
    }
  },

  // 更新商品數量
  updateQuantity: async (itemId: number, quantity: number) => {
    // 樂觀更新（先更新 UI）
    const prevCart = get().cart;
    if (prevCart) {
      const updatedCart = {
        ...prevCart,
        items: prevCart.items.map((item) =>
          item.id === itemId
            ? { ...item, quantity, subtotal: item.productPrice * quantity }
            : item
        ),
      };
      set({ cart: updatedCart });
    }

    try {
      const cart = await updateCartItem(itemId, { quantity });
      set({ cart, error: null });
    } catch (error) {
      console.error('Failed to update quantity:', error);
      // 還原為原本的購物車狀態
      set({
        cart: prevCart,
        error:
          error instanceof Error ? error.message : 'Failed to update quantity',
      });
      throw error;
    }
  },

  // 移除商品
  removeItem: async (itemId: number) => {
    set({ isLoading: true, error: null });
    try {
      const cart = await removeCartItem(itemId);
      set({ cart, isLoading: false });
    } catch (error) {
      console.error('Failed to remove item:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to remove item',
        isLoading: false,
      });
      throw error;
    }
  },

  // 清空購物車
  clearAllItems: async () => {
    set({ isLoading: true, error: null });
    try {
      await clearCart();
      set({ cart: null, isLoading: false });
    } catch (error) {
      console.error('Failed to clear cart:', error);
      set({
        error: error instanceof Error ? error.message : 'Failed to clear cart',
        isLoading: false,
      });
      throw error;
    }
  },

  // Getters
  getTotalItems: () => {
    return get().cart?.totalItems || 0;
  },

  getTotalAmount: () => {
    return get().cart?.totalAmount || 0;
  },
}));
