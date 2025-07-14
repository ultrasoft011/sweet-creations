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
}

export interface StoreCategory {
  id: string;
  name: string;
  icon: string;
}
