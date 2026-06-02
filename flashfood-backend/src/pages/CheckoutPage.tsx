import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { restaurants } from '../data/mockData';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, user, placeOrder } = useApp();

  if (!user || cart.length === 0) {
    navigate('/');
    return null;
  }

  const restaurantId = cart[0].restaurantId;
  const restaurant = restaurants.find(r => r.id === restaurantId);
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 40;
  const tax = subtotal * 0.05;
  const total = subtotal + deliveryFee + tax;

  const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];

  const handlePlaceOrder = () => {
    if (restaurant && defaultAddress) {
      const addressStr = `${defaultAddress.addressLine}, ${defaultAddress.landmark ? defaultAddress.landmark + ', ' : ''}${defaultAddress.city} - ${defaultAddress.pincode}`;
      placeOrder(restaurant.id, restaurant.name, addressStr);
      navigate('/orders');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {/* Delivery Address */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
          {defaultAddress && (
            <div className="border-l-4 border-orange-500 pl-4">
              <p className="font-semibold">{defaultAddress.label}</p>
              <p className="text-gray-700">{defaultAddress.addressLine}</p>
              {defaultAddress.landmark && (
                <p className="text-gray-600 text-sm">Landmark: {defaultAddress.landmark}</p>
              )}
              <p className="text-gray-700">{defaultAddress.city} - {defaultAddress.pincode}</p>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
          
          {restaurant && (
            <div className="flex items-center gap-3 mb-4 pb-4 border-b">
              <img src={restaurant.image} alt={restaurant.name} className="w-12 h-12 object-cover rounded" />
              <div>
                <p className="font-semibold">{restaurant.name}</p>
                <p className="text-sm text-gray-600">{restaurant.address}</p>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className={item.isVeg ? 'text-green-600' : 'text-red-600'}>
                    {item.isVeg ? '🟢' : '🔴'}
                  </span>
                  <span>{item.name}</span>
                  <span className="text-gray-500">x {item.quantity}</span>
                </div>
                <span className="font-semibold">₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill Details */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bill Details</h2>
          <div className="space-y-3">
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
            <div className="border-t pt-3 flex justify-between font-bold text-xl">
              <span>TO PAY</span>
              <span className="text-orange-600">₹{total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <button
          onClick={handlePlaceOrder}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition font-bold text-lg shadow-lg"
        >
          Place Order - ₹{total.toFixed(2)}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
