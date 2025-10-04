export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category?: string;
  featured?: boolean;
  imageUrl: string;
  createdAt: string;
}
