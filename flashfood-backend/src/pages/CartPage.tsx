import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { restaurants } from '../data/mockData';

const CartPage = () => {
  const navigate = useNavigate();
  const { cart, updateQuantity, removeFromCart, user } = useApp();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <span className="text-8xl mb-4 block">🛒</span>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add items from a restaurant to get started</p>
          <button
            onClick={() => navigate('/')}
            className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
          >
            Browse Restaurants
          </button>
        </div>
      </div>
    );
  }

  const restaurantId = cart[0].restaurantId;
  const restaurant = restaurants.find(r => r.id === restaurantId);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 40;
  const tax = subtotal * 0.05; // 5% GST
  const total = subtotal + deliveryFee + tax;

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
    } else {
      navigate('/checkout');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Restaurant Info */}
            {restaurant && (
              <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
                <img
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-gray-900">{restaurant.name}</h3>
                  <p className="text-sm text-gray-600">{restaurant.address}</p>
                </div>
              </div>
            )}

            {/* Cart Items List */}
            {cart.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`text-sm mr-2 ${item.isVeg ? 'text-green-600' : 'text-red-600'}`}>
                          {item.isVeg ? '🟢' : '🔴'}
                        </span>
                        <h3 className="font-bold text-gray-900 inline">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">₹{item.price}</p>
                      </div>
                      
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        🗑️
                      </button>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                      <span className="ml-auto font-bold text-gray-900">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bill Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Bill Details</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Item Total</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  <span>₹{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Taxes & Charges</span>
                  <span>₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>TO PAY</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600 transition font-semibold text-lg"
              >
                {user ? 'Proceed to Checkout' : 'Login to Continue'}
              </button>

              <p className="text-xs text-gray-500 mt-4 text-center">
                By placing your order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
