import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { restaurants, menuItems, cities as citiesData } from '../data/mockData';
import { useApp } from '../contexts/AppContext';

const Home = () => {
  const { currentCity, setCurrentCity, user, updateUserLocation } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [showCityModal, setShowCityModal] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);

  const cuisines = ['All', 'South Indian', 'North Indian', 'Biryani', 'Street Food', 'Seafood', 
    'Gujarati', 'Mughlai', 'Pizza', 'Chicken', 'Desserts'];

  // Get current city data
  const currentCityData = citiesData.find(c => c.name === currentCity);
  
  // Filter restaurants by current city
  const cityRestaurants = restaurants.filter(r => r.city === currentCity);

  // Further filter by search and cuisine
  const filteredRestaurants = cityRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.some(c => c.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine.includes(selectedCuisine);
    return matchesSearch && matchesCuisine;
  });

  // Get local favorites based on city
  const localFavorites = menuItems.filter(item => 
    item.localFavorite && cityRestaurants.some(r => r.id === item.restaurantId)
  ).slice(0, 5);

  const handleLocationAccess = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          updateUserLocation({ lat: latitude, lng: longitude });
          setLocationEnabled(true);
          
          // Find nearest city (simplified - in real app would use distance calculation)
          alert(`Location accessed: ${latitude.toFixed(4)}, ${longitude.toFixed(4)}\nShowing restaurants in ${currentCity}`);
        },
        (error) => {
          console.error('Location error:', error);
          alert('Unable to access location. Showing restaurants in ' + currentCity);
        }
      );
    }
  };

  useEffect(() => {
    // Auto-request location on first visit
    if (user && !locationEnabled) {
      handleLocationAccess();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* City Selector */}
          <div className="mb-6">
            <button
              onClick={() => setShowCityModal(true)}
              className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg transition"
            >
              <span className="text-xl">📍</span>
              <div className="text-left">
                <div className="text-xs opacity-80">Delivering to</div>
                <div className="font-semibold">{currentCity}</div>
              </div>
              <span className="text-xl">▼</span>
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">Order Food Online in {currentCity}</h1>
            <p className="text-xl mb-2">From your favorite local restaurants</p>
            {currentCityData && (
              <p className="text-sm opacity-90">
                Famous for: {currentCityData.famousDishes.join(', ')}
              </p>
            )}
            
            {/* Location Access */}
            {!locationEnabled && (
              <button
                onClick={handleLocationAccess}
                className="mt-4 bg-white text-orange-600 px-6 py-2 rounded-lg hover:bg-orange-50 font-semibold transition"
              >
                📍 Enable Location for Better Suggestions
              </button>
            )}

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mt-6">
              <div className="bg-white rounded-lg shadow-lg p-2 flex items-center">
                <span className="text-2xl pl-3">🔍</span>
                <input
                  type="text"
                  placeholder="Search for restaurants or cuisines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-3 outline-none text-gray-800"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* City Modal */}
      {showCityModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Select Your City</h2>
                <button
                  onClick={() => setShowCityModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {citiesData.map(city => (
                  <button
                    key={city.id}
                    onClick={() => {
                      setCurrentCity(city.name);
                      setShowCityModal(false);
                    }}
                    className={`p-4 rounded-lg border-2 text-left hover:border-orange-500 transition ${
                      currentCity === city.name
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <h3 className="font-bold text-lg">{city.name}</h3>
                    <p className="text-sm text-gray-600">{city.state}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Famous: {city.famousDishes[0]}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Local Favorites */}
      {localFavorites.length > 0 && (
        <div className="bg-yellow-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ⭐ Local Favorites in {currentCity}
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {localFavorites.map(item => (
                <Link
                  key={item.id}
                  to={`/restaurant/${item.restaurantId}`}
                  className="flex-shrink-0 w-64 bg-white rounded-lg shadow-md hover:shadow-lg transition p-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-600">₹{item.price}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-green-600">⭐</span>
                    <span className="text-sm font-semibold">{item.rating}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cuisine Filter */}
      <div className="bg-white shadow-sm sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {cuisines.map(cuisine => (
              <button
                key={cuisine}
                onClick={() => setSelectedCuisine(cuisine)}
                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition ${
                  selectedCuisine === cuisine
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cuisine}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Restaurants Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredRestaurants.length} restaurants in {currentCity}
          </h2>
          {cityRestaurants.length > 0 && (
            <p className="text-sm text-gray-600">
              Popular cuisines: {currentCityData?.popularCuisines.join(', ')}
            </p>
          )}
        </div>

        {filteredRestaurants.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">🍽️</span>
            <p className="text-xl text-gray-500">No restaurants found</p>
            <p className="text-gray-400 mt-2">Try a different search or change city</p>
            <button
              onClick={() => setShowCityModal(true)}
              className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
            >
              Change City
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredRestaurants.map(restaurant => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  {restaurant.offer && (
                    <div className="absolute bottom-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-semibold">
                      {restaurant.offer}
                    </div>
                  )}
                  {restaurant.famousDish && (
                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-md text-xs font-semibold">
                      Famous: {restaurant.famousDish}
                    </div>
                  )}
                  {!restaurant.isOpen && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white text-lg font-semibold">Closed</span>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {restaurant.cuisine.join(', ')}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-1">
                      <span className="text-green-600">⭐</span>
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <span className="text-gray-600">• {restaurant.deliveryTime}</span>
                  </div>
                  
                  <div className="mt-2 text-sm text-gray-600">
                    ₹{restaurant.priceForTwo} for two
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Order From FlashFood?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl mb-4">📍</div>
              <h3 className="text-xl font-bold mb-2">Location-Based</h3>
              <p className="text-gray-600">Get restaurants and dishes popular in your area</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Get your food delivered in 30 minutes or less</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Track your delivery partner in real-time</p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold mb-2">Best Offers</h3>
              <p className="text-gray-600">Exclusive deals on local favorites</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
