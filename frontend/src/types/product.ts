export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string | null;
  stock_quantity: number;
  store?: number;
  store_name?: string;
  is_active?: boolean;
}