import { Restaurant, MenuItem, City } from '../types';

// Cities Data
export const cities: City[] = [
  {
    id: 'blr',
    name: 'Bangalore',
    state: 'Karnataka',
    famousDishes: ['Masala Dosa', 'Bisi Bele Bath', 'Ragi Mudde', 'Filter Coffee'],
    popularCuisines: ['South Indian', 'North Indian', 'Chinese', 'Italian'],
    location: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: 'mum',
    name: 'Mumbai',
    state: 'Maharashtra',
    famousDishes: ['Vada Pav', 'Pav Bhaji', 'Misal Pav', 'Bombay Sandwich'],
    popularCuisines: ['Street Food', 'Maharashtrian', 'Seafood', 'Chinese'],
    location: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'pun',
    name: 'Pune',
    state: 'Maharashtra',
    famousDishes: ['Misal Pav', 'Mastani', 'Bhakarwadi', 'Puran Poli'],
    popularCuisines: ['Maharashtrian', 'Street Food', 'North Indian', 'Italian'],
    location: { lat: 18.5204, lng: 73.8567 }
  },
  {
    id: 'del',
    name: 'Delhi',
    state: 'Delhi',
    famousDishes: ['Chole Bhature', 'Butter Chicken', 'Paranthe', 'Nihari'],
    popularCuisines: ['North Indian', 'Mughlai', 'Street Food', 'Chinese'],
    location: { lat: 28.7041, lng: 77.1025 }
  },
  {
    id: 'hyd',
    name: 'Hyderabad',
    state: 'Telangana',
    famousDishes: ['Hyderabadi Biryani', 'Haleem', 'Mirchi ka Salan', 'Double ka Meetha'],
    popularCuisines: ['Hyderabadi', 'Biryani', 'Mughlai', 'Chinese'],
    location: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: 'ahm',
    name: 'Ahmedabad',
    state: 'Gujarat',
    famousDishes: ['Dhokla', 'Khandvi', 'Thepla', 'Fafda-Jalebi'],
    popularCuisines: ['Gujarati', 'Street Food', 'Vegetarian', 'North Indian'],
    location: { lat: 23.0225, lng: 72.5714 }
  }
];

// Helper function to create restaurant for all cities
const createRestaurantForAllCities = (baseId: string, name: string, image: string, cuisine: string[], rating: number, deliveryTime: string, priceForTwo: number, offer?: string) => {
  return cities.map((city, index) => ({
    id: `${baseId}_${city.id}`,
    name,
    image,
    cuisine,
    rating: rating + (Math.random() * 0.3 - 0.15), // Slight variation
    deliveryTime,
    priceForTwo,
    offer,
    address: `${['MG Road', 'Main Street', 'City Center', 'Park Avenue', 'Lake Road', 'Station Road'][index]}, ${city.name}`,
    city: city.name,
    location: { lat: city.location.lat + (Math.random() * 0.05 - 0.025), lng: city.location.lng + (Math.random() * 0.05 - 0.025) },
    isOpen: Math.random() > 0.1 // 90% open
  }));
};

// Restaurants Data (Available in ALL cities)
export const restaurants: Restaurant[] = [
  // Pizza Places (in all cities)
  ...createRestaurantForAllCities('pizza1', 'Domino\'s Pizza', 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400', 
    ['Pizza', 'Italian', 'Fast Food'], 4.2, '30-35 mins', 400, '50% OFF on pizzas'),
  
  ...createRestaurantForAllCities('pizza2', 'Pizza Hut', 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400', 
    ['Pizza', 'Italian', 'Pasta'], 4.1, '30-40 mins', 450, '40% OFF'),

  // Burger Places (in all cities)
  ...createRestaurantForAllCities('burger1', 'McDonald\'s', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400', 
    ['Burgers', 'American', 'Fast Food'], 4.0, '20-25 mins', 350),
  
  ...createRestaurantForAllCities('burger2', 'Burger King', 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=400', 
    ['Burgers', 'American', 'Fast Food'], 4.1, '25-30 mins', 350, '20% OFF'),

  // Chicken Places (in all cities)
  ...createRestaurantForAllCities('chicken1', 'KFC', 'https://images.unsplash.com/photo-1626082910374-a1f03d6d6b45?w=400', 
    ['Chicken', 'Fast Food', 'American'], 4.2, '25-30 mins', 450),

  // Biryani Places (in all cities)
  ...createRestaurantForAllCities('biryani1', 'Paradise Biryani', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', 
    ['Biryani', 'Indian', 'Hyderabadi'], 4.5, '35-40 mins', 500, '30% OFF'),
  
  ...createRestaurantForAllCities('biryani2', 'Biryani Blues', 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400', 
    ['Biryani', 'North Indian', 'Mughlai'], 4.4, '30-35 mins', 450),

  // Chinese Places (in all cities)
  ...createRestaurantForAllCities('chinese1', 'Mainland China', 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400', 
    ['Chinese', 'Asian', 'Noodles'], 4.3, '30-35 mins', 600, '25% OFF'),
  
  ...createRestaurantForAllCities('chinese2', 'Wow! Momo', 'https://images.unsplash.com/photo-1496116218417-1a781b1c416c?w=400', 
    ['Chinese', 'Momos', 'Fast Food'], 4.2, '20-25 mins', 300),

  // South Indian (in all cities)
  ...createRestaurantForAllCities('south1', 'Saravana Bhavan', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', 
    ['South Indian', 'Vegetarian', 'Breakfast'], 4.4, '25-30 mins', 300),
  
  ...createRestaurantForAllCities('south2', 'Sangeetha Restaurant', 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?w=400', 
    ['South Indian', 'Vegetarian', 'Thali'], 4.3, '25-30 mins', 350),

  // North Indian (in all cities)
  ...createRestaurantForAllCities('north1', 'Punjabi Rasoi', 'https://images.unsplash.com/photo-1585937421612-70e008356ccb?w=400', 
    ['North Indian', 'Punjabi', 'Tandoor'], 4.3, '30-35 mins', 500),

  // Desserts & Ice Cream (in all cities)
  ...createRestaurantForAllCities('dessert1', 'Baskin Robbins', 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400', 
    ['Ice Cream', 'Desserts', 'Beverages'], 4.4, '15-20 mins', 250, 'Buy 1 Get 1'),
  
  ...createRestaurantForAllCities('dessert2', 'NIC Ice Creams', 'https://images.unsplash.com/photo-1567327711183-f3c4d2e6d8f0?w=400', 
    ['Ice Cream', 'Desserts', 'Natural'], 4.5, '15-20 mins', 200),

  // Mexican (in all cities)
  ...createRestaurantForAllCities('mexican1', 'Taco Bell', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400', 
    ['Mexican', 'Fast Food', 'Burritos'], 4.0, '25-30 mins', 400),

  // Cafe/Coffee (in all cities)
  ...createRestaurantForAllCities('cafe1', 'Cafe Coffee Day', 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400', 
    ['Cafe', 'Coffee', 'Beverages', 'Snacks'], 4.1, '15-20 mins', 300),
  
  ...createRestaurantForAllCities('cafe2', 'Starbucks', 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=400', 
    ['Cafe', 'Coffee', 'Beverages', 'Bakery'], 4.3, '15-20 mins', 400),

  // Sandwich & Wraps (in all cities)
  ...createRestaurantForAllCities('sandwich1', 'Subway', 'https://images.unsplash.com/photo-1555072956-7ef5e96f3165?w=400', 
    ['Sandwiches', 'Healthy', 'Fast Food'], 4.1, '20-25 mins', 300),

  // Seafood (in all cities - coastal and inland)
  ...createRestaurantForAllCities('seafood1', 'Fish & More', 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?w=400', 
    ['Seafood', 'Fish', 'Coastal'], 4.2, '35-40 mins', 700),

  // Sushi & Japanese (in all cities)
  ...createRestaurantForAllCities('sushi1', 'Sushi Bar', 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400', 
    ['Japanese', 'Sushi', 'Asian'], 4.3, '40-45 mins', 800),

  // Kebabs & Grills (in all cities)
  ...createRestaurantForAllCities('kebab1', 'Barbeque Nation', 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400', 
    ['Barbecue', 'Grills', 'North Indian'], 4.4, '40-45 mins', 900, '15% OFF'),

  // Thali/Combo Meals (in all cities)
  ...createRestaurantForAllCities('thali1', 'Rajdhani Thali', 'https://images.unsplash.com/photo-1585937421612-70e008356ccb?w=400', 
    ['Thali', 'Rajasthani', 'Vegetarian'], 4.3, '30-35 mins', 500),

  // Street Food (in all cities)
  ...createRestaurantForAllCities('street1', 'Chaat Corner', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', 
    ['Street Food', 'Chaat', 'Snacks'], 4.2, '20-25 mins', 200),

  // Pasta & Italian (in all cities)
  ...createRestaurantForAllCities('pasta1', 'La Pinoz Pizza', 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400', 
    ['Italian', 'Pasta', 'Pizza'], 4.2, '30-35 mins', 450),

  // Healthy Food (in all cities)
  ...createRestaurantForAllCities('healthy1', 'Salad Days', 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400', 
    ['Healthy', 'Salads', 'Bowls'], 4.3, '25-30 mins', 400),

  // Bakery (in all cities)
  ...createRestaurantForAllCities('bakery1', 'Theobroma', 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=400', 
    ['Bakery', 'Desserts', 'Cakes'], 4.5, '25-30 mins', 350),

  // Rolls & Shawarma (in all cities)
  ...createRestaurantForAllCities('rolls1', 'Rollsking', 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=400', 
    ['Rolls', 'Wraps', 'Fast Food'], 4.1, '20-25 mins', 250),

  // Continental (in all cities)
  ...createRestaurantForAllCities('continental1', 'The Continental', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', 
    ['Continental', 'Multi-Cuisine', 'Fine Dining'], 4.4, '45-50 mins', 1000),
];

// Menu Items - Create items for each restaurant type
const createMenuItems = () => {
  const items: MenuItem[] = [];
  let itemId = 1;

  // For each city
  cities.forEach(city => {
    // Pizza items (Domino's)
    const dominosId = `pizza1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: dominosId,
        name: 'Margherita Pizza',
        description: 'Classic cheese and tomato',
        price: 249,
        image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?w=300',
        category: 'Pizza',
        isVeg: true,
        rating: 4.5,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: dominosId,
        name: 'Pepperoni Pizza',
        description: 'Spicy pepperoni with cheese',
        price: 399,
        image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=300',
        category: 'Pizza',
        isVeg: false,
        rating: 4.6
      },
      {
        id: `m${itemId++}`,
        restaurantId: dominosId,
        name: 'Garlic Bread',
        description: 'Freshly baked garlic bread',
        price: 99,
        image: 'https://images.unsplash.com/photo-1573140401552-3fab0b24306f?w=300',
        category: 'Sides',
        isVeg: true,
        rating: 4.3
      }
    );

    // Burger items (McDonald's)
    const mcdonaldsId = `burger1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: mcdonaldsId,
        name: 'McAloo Tikki Burger',
        description: 'Crispy potato patty burger',
        price: 89,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300',
        category: 'Burgers',
        isVeg: true,
        rating: 4.4,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: mcdonaldsId,
        name: 'Chicken Maharaja Mac',
        description: 'Double chicken patty burger',
        price: 189,
        image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300',
        category: 'Burgers',
        isVeg: false,
        rating: 4.5,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: mcdonaldsId,
        name: 'French Fries',
        description: 'Crispy golden fries',
        price: 89,
        image: 'https://images.unsplash.com/photo-1630384082687-4e7b2c0c9e5f?w=300',
        category: 'Sides',
        isVeg: true,
        rating: 4.3
      }
    );

    // KFC items
    const kfcId = `chicken1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: kfcId,
        name: 'Chicken Bucket',
        description: '8 pieces of fried chicken',
        price: 499,
        image: 'https://images.unsplash.com/photo-1626082910374-a1f03d6d6b45?w=300',
        category: 'Chicken',
        isVeg: false,
        rating: 4.5,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: kfcId,
        name: 'Zinger Burger',
        description: 'Spicy chicken burger',
        price: 189,
        image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=300',
        category: 'Burgers',
        isVeg: false,
        rating: 4.4
      },
      {
        id: `m${itemId++}`,
        restaurantId: kfcId,
        name: 'Popcorn Chicken',
        description: 'Bite-sized chicken pieces',
        price: 149,
        image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300',
        category: 'Chicken',
        isVeg: false,
        rating: 4.3
      }
    );

    // Biryani items (Paradise)
    const biryaniId = `biryani1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: biryaniId,
        name: 'Hyderabadi Chicken Biryani',
        description: 'Authentic slow-cooked biryani',
        price: 350,
        image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300',
        category: 'Biryani',
        isVeg: false,
        rating: 4.8,
        bestseller: true,
        localFavorite: city.name === 'Hyderabad'
      },
      {
        id: `m${itemId++}`,
        restaurantId: biryaniId,
        name: 'Veg Biryani',
        description: 'Mixed vegetables with basmati rice',
        price: 280,
        image: 'https://images.unsplash.com/photo-1642821373181-696a54913e93?w=300',
        category: 'Biryani',
        isVeg: true,
        rating: 4.6
      },
      {
        id: `m${itemId++}`,
        restaurantId: biryaniId,
        name: 'Raita',
        description: 'Cooling yogurt side',
        price: 49,
        image: 'https://images.unsplash.com/photo-1626200419199-391ae4be7a41?w=300',
        category: 'Sides',
        isVeg: true,
        rating: 4.5
      }
    );

    // Chinese items (Mainland China)
    const chineseId = `chinese1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: chineseId,
        name: 'Hakka Noodles',
        description: 'Stir-fried noodles with vegetables',
        price: 220,
        image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=300',
        category: 'Noodles',
        isVeg: true,
        rating: 4.4,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: chineseId,
        name: 'Chicken Manchurian',
        description: 'Spicy chicken in Manchurian sauce',
        price: 280,
        image: 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=300',
        category: 'Chinese',
        isVeg: false,
        rating: 4.5
      },
      {
        id: `m${itemId++}`,
        restaurantId: chineseId,
        name: 'Fried Rice',
        description: 'Aromatic fried rice',
        price: 200,
        image: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=300',
        category: 'Rice',
        isVeg: true,
        rating: 4.3
      }
    );

    // South Indian items (Saravana Bhavan)
    const southId = `south1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: southId,
        name: 'Masala Dosa',
        description: 'Crispy dosa with potato filling',
        price: 89,
        image: 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=300',
        category: 'South Indian',
        isVeg: true,
        rating: 4.7,
        bestseller: true,
        localFavorite: city.name === 'Bangalore'
      },
      {
        id: `m${itemId++}`,
        restaurantId: southId,
        name: 'Idli Sambar',
        description: 'Soft rice cakes with lentil soup',
        price: 69,
        image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=300',
        category: 'South Indian',
        isVeg: true,
        rating: 4.6
      },
      {
        id: `m${itemId++}`,
        restaurantId: southId,
        name: 'Filter Coffee',
        description: 'Authentic South Indian coffee',
        price: 45,
        image: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=300',
        category: 'Beverages',
        isVeg: true,
        rating: 4.8
      }
    );

    // Ice Cream items (Baskin Robbins)
    const icecreamId = `dessert1_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: icecreamId,
        name: 'Chocolate Fudge',
        description: 'Rich chocolate ice cream',
        price: 150,
        image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300',
        category: 'Ice Cream',
        isVeg: true,
        rating: 4.6,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: icecreamId,
        name: 'Mango Delight',
        description: 'Fresh mango ice cream',
        price: 140,
        image: 'https://images.unsplash.com/photo-1567327711183-f3c4d2e6d8f0?w=300',
        category: 'Ice Cream',
        isVeg: true,
        rating: 4.5
      }
    );

    // Cafe items (Starbucks)
    const cafeId = `cafe2_${city.id}`;
    items.push(
      {
        id: `m${itemId++}`,
        restaurantId: cafeId,
        name: 'Caffe Latte',
        description: 'Smooth espresso with milk',
        price: 220,
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=300',
        category: 'Coffee',
        isVeg: true,
        rating: 4.5,
        bestseller: true
      },
      {
        id: `m${itemId++}`,
        restaurantId: cafeId,
        name: 'Chocolate Croissant',
        description: 'Buttery croissant with chocolate',
        price: 180,
        image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300',
        category: 'Bakery',
        isVeg: true,
        rating: 4.4
      }
    );
  });

  return items;
};

export const menuItems: MenuItem[] = createMenuItems();
