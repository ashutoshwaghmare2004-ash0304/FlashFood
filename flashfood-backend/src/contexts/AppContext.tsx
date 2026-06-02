import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, CartItem, Order, MenuItem, AppContextType, City, DeliveryPartner } from '../types';
import { cities as citiesData } from '../data/mockData';

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USERS: 'flashfood_users',
  USER: 'flashfood_user',
  CART: 'flashfood_cart',
  ORDERS: 'flashfood_orders',
  CITY: 'flashfood_city'
};

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentCity, setCurrentCityState] = useState<string>('Bangalore');
  const [cities] = useState<City[]>(citiesData);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
    const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const savedCity = localStorage.getItem(STORAGE_KEYS.CITY);

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedCity) setCurrentCityState(savedCity);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CITY, currentCity);
  }, [currentCity]);

  const login = (email: string, password: string): boolean => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const foundUser = users.find((u: User) => u.email === email && u.password === password);
    
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (userData: Partial<User>) => {
    const users = JSON.parse(localStorage.getItem(STORAGE_KEYS.USERS) || '[]');
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      phone: userData.phone || '',
      password: userData.password || '',
      addresses: userData.addresses || [],
      foodPreferences: userData.foodPreferences || [],
      currentCity: userData.currentCity || currentCity,
      currentLocation: userData.currentLocation
    };
    
    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
    setCart([]);
  };

  const addToCart = (item: MenuItem) => {
    const existingItem = cart.find(i => i.id === item.id);
    if (existingItem) {
      setCart(cart.map(i => 
        i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(i => i.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(itemId);
    } else {
      setCart(cart.map(i => 
        i.id === itemId ? { ...i, quantity } : i
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const placeOrder = (restaurantId: string, restaurantName: string, deliveryAddress: string) => {
    if (!user || cart.length === 0) return;

    const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const now = new Date();
    const estimatedDelivery = new Date(now.getTime() + 25 * 60000); // 25 minutes

    // Simulate delivery partner location
    const deliveryPartner: DeliveryPartner = {
      name: 'Raj Kumar',
      phone: '+91 98765 43210',
      vehicle: 'Bike',
      currentLocation: {
        lat: user.currentLocation?.lat || 12.9716,
        lng: user.currentLocation?.lng || 77.5946
      }
    };

    const newOrder: Order = {
      id: Date.now().toString(),
      userId: user.id,
      restaurantId,
      restaurantName,
      items: [...cart],
      totalAmount: totalAmount + 40 + (totalAmount * 0.05), // Add delivery and tax
      deliveryAddress,
      status: 'confirmed',
      orderDate: now.toISOString(),
      estimatedDelivery: estimatedDelivery.toISOString(),
      deliveryPartner
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
  };

  const setCurrentCity = (city: string) => {
    setCurrentCityState(city);
    // Clear cart when changing city (optional)
    setCart([]);
  };

  const updateUserLocation = (location: { lat: number; lng: number }) => {
    if (user) {
      const updatedUser = { ...user, currentLocation: location };
      setUser(updatedUser);
    }
  };

  const cancelOrder = (orderId: string) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' as const } : order
    ));
  };

  return (
    <AppContext.Provider value={{
      user,
      cart,
      orders,
      currentCity,
      cities,
      login,
      register,
      logout,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      placeOrder,
      setCurrentCity,
      updateUserLocation,
      cancelOrder
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
