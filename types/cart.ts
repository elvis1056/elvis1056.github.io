/**
 * 購物車項目
 */
export interface CartItem {
  id: number;
  productId: number;
  productName: string;
  productDescription: string;
  productPrice: number;
  productImageUrl: string | null;
  quantity: number;
  subtotal: number;
  availableStock: number;
  inStock: boolean;
}

/**
 * 購物車
 */
export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  totalItems: number; // 幾種商品
  totalQuantity: number; // 商品總數量
  totalAmount: number; // 總金額
  createdAt: string;
  updatedAt: string;
}

/**
 * 加入購物車的請求 Body
 */
export interface AddToCartRequest {
  productId: number;
  quantity: number;
}

/**
 * 更新購物車項目數量的請求 Body
 */
export interface UpdateCartItemRequest {
  quantity: number;
}
