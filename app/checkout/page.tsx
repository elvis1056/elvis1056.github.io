'use client';

import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';

import CheckoutContent from './CheckoutContent';
import CheckoutEmpty from './CheckoutEmpty';

export default function CheckoutPage() {
  const user = useAuthStore((state) => state.user);
  const { cart } = useCartStore();

  // 未登入
  if (!user) {
    return <CheckoutEmpty type="not-logged-in" />;
  }

  // 購物車為空
  if (!cart || cart.items.length === 0) {
    return <CheckoutEmpty type="empty-cart" />;
  }

  // 正常結帳流程
  return <CheckoutContent />;
}
