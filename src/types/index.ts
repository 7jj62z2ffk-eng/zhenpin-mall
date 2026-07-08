export interface Product {
  id: string;
  name: { en: string; ar: string };
  category: { en: string; ar: string };
  price: number;
  originalPrice?: number;
  images: string[];
  description: { en: string; ar: string };
  specifications: { key: { en: string; ar: string }; value: { en: string; ar: string } }[];
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: { en: string; ar: string }[];
  ingredients: { en: string; ar: string };
  benefits: string[];
  brewMethod: { en: string; ar: string };
  isHalal: boolean;
  isOrganic?: boolean;
  weight: string;
  boxSize: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface Review {
  id: string;
  name: { en: string; ar: string };
  rating: number;
  comment: { en: string; ar: string };
  date: string;
  avatar: string;
}
