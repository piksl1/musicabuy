
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  features: string[];
  colors: ProductColor[];
  specs: Record<string, string>;
  relatedProducts: string[];
}

export interface ProductColor {
  name: string;
  value: string;
}

export interface NavigationItem {
  name: string;
  href: string;
}
