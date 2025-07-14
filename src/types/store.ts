export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isAvailable: boolean;
  preparationTime?: string;
  ingredients?: string[];
  allergens?: string[];
  isPopular?: boolean;
  discount?: {
    percentage: number;
    originalPrice: number;
  };
}

export interface MenuCategory {
  id: string;
  name: string;
  icon: string;
  items: MenuItem[];
}

export interface Store {
  id: string;
  name: string;
  description: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  category: 'panadería' | 'repostería' | 'pastelería' | 'cafetería';
  isOpen: boolean;
  distance: string;
  specialties: string[];
  minimumOrder?: number;
  menu?: MenuCategory[];
  address?: string;
  phone?: string;
  openingHours?: {
    [key: string]: string;
  };
  totalReviews?: number;
}

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
}
