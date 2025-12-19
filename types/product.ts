export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string | null;
  active: boolean;
  categoryId: number | null;
  categoryName: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}
