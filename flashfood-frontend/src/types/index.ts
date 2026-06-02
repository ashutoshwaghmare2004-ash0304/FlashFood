export interface Restaurant {
  id: string;
  name: string;
  image: string;
  cuisine: string[];
  rating: number;
  deliveryTime: string;
  priceForTwo: number;
  offer?: string;
  address: string;
  city: string;
  location: {
    lat: number;
    lng: number;
  };
  isOpen: boolean;
  famousDish?: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  isVeg: boolean;
  rating: number;
  bestseller?: boolean;
  localFavorite?: boolean;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  restaurantId: string;
  restaurantName: string;
  items: CartItem[];
  totalAmount: number;
  deliveryAddress: string;
  status: 'pending' | 'confirmed' | 'preparing' | 'out-for-delivery' | 'delivered' | 'cancelled';
  orderDate: string;
  estimatedDelivery: string;
  deliveryPartner?: DeliveryPartner;
}

export interface DeliveryPartner {
  name: string;
  phone: string;
  vehicle: string;
  currentLocation: {
    lat: number;
    lng: number;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  addresses: Address[];
  foodPreferences: string[];
  currentCity: string;
  currentLocation?: {
    lat: number;
    lng: number;
  };
}

export interface Address {
  id: string;
  label: string;
  addressLine: string;
  landmark?: string;
  city: string;
  pincode: string;
  location: {
    lat: number;
    lng: number;
  };
  isDefault: boolean;
}

export interface City {
  id: string;
  name: string;
  state: string;
  famousDishes: string[];
  popularCuisines: string[];
  location: {
    lat: number;
    lng: number;
  };
}

export interface RegistrationStep {
  step: number;
  data: Partial<User>;
  otpVerified: boolean;
}

export interface AppContextType {
  user: User | null;
  cart: CartItem[];
  orders: Order[];
  currentCity: string;
  cities: City[];
  login: (email: string, password: string) => boolean;
  register: (userData: Partial<User>) => void;
  logout: () => void;
  addToCart: (item: MenuItem) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (restaurantId: string, restaurantName: string, deliveryAddress: string) => void;
  setCurrentCity: (city: string) => void;
  updateUserLocation: (location: { lat: number; lng: number }) => void;
  cancelOrder: (orderId: string) => void;
}
