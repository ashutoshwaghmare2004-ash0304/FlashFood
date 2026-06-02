import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { restaurants, menuItems } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

const RestaurantPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const restaurant = restaurants.find(r => r.id === id);
  const menu = menuItems.filter(item => item.restaurantId === id);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">🍽️</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Restaurant not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const categories = ['All', ...new Set(menu.map(item => item.category))];
  const filteredMenu = selectedCategory === 'All' 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  const handleAddToCart = (item: typeof menu[0]) => {
    addToCart(item);
    // Simple success feedback
    const button = document.getElementById(`add-${item.id}`);
    if (button) {
      button.textContent = '✓ Added';
      setTimeout(() => {
        button.textContent = 'Add to Cart';
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center"
          >
            ← Back to restaurants
          </button>

          <div className="flex items-start gap-6">
            <img
              src={restaurant.image}
              alt={restaurant.name}
              className="w-32 h-32 object-cover rounded-lg shadow-md"
            />
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-2">{restaurant.cuisine.join(', ')}</p>
              <p className="text-gray-600 mb-3">📍 {restaurant.address}</p>
              
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-green-600">⭐</span>
                  <span className="font-semibold">{restaurant.rating}</span>
                </div>
                <span>🕐 {restaurant.deliveryTime}</span>
                <span>₹{restaurant.priceForTwo} for two</span>
              </div>

              {restaurant.offer && (
                <div className="mt-3 inline-block bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-semibold">
                  🎉 {restaurant.offer}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Categories */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🍽️</span>
            <p className="text-xl text-gray-500">No items in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredMenu.map(item => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-lg transition"
              >
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />

                {/* Item Details */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                          {item.isVeg ? '🟢' : '🔴'}
                        </span>
                        {item.bestseller && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full font-semibold">
                            ⭐ Bestseller
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-green-600">⭐ {item.rating}</span>
                      </div>
                    </div>

                    {/* Price and Add Button */}
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-gray-900 mb-3">₹{item.price}</p>
                      <button
                        id={`add-${item.id}`}
                        onClick={() => handleAddToCart(item)}
                        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantPage;
