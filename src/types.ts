export enum Region {
  Pakistan = 'PK',
  Bangladesh = 'BD',
}

export interface Product {
  id: string;
  name: string;
  pricePKR: number;
  category: string;
  images: string[];
  description: string;
  fabric: string;
  stitching: string;
  care: string;
  delivery: {
    PK: string;
    BD: string;
  };
  sizes: string[];
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  location: string;
}
