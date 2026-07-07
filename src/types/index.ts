export interface Product {
  id: string;
  name: { zh: string; en: string };
  category: { zh: string; en: string };
  price: number;
  originalPrice?: number;
  images: string[];
  description: { zh: string; en: string };
  specifications: { key: { zh: string; en: string }; value: { zh: string; en: string } }[];
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: { zh: string; en: string }[];
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Review {
  id: string;
  name: { zh: string; en: string };
  rating: number;
  comment: { zh: string; en: string };
  date: string;
  avatar: string;
}
