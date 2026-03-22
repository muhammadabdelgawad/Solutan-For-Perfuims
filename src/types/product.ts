export type Category = 'perfumes' | 'makeup' | 'skincare';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  customerName: string;
  phone: string;
  address: string;
  paymentMethod: 'cod';
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  createdAt: string;
}
