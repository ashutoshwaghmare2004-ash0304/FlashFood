import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, orders, cancelOrder } = useApp();

  if (!user) {
    navigate('/login');
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-yellow-100 text-yellow-800';
      case 'out-for-delivery': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return '✓';
      case 'preparing': return '👨‍🍳';
      case 'out-for-delivery': return '🛵';
      case 'delivered': return '✅';
      case 'cancelled': return '❌';
      default: return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-8xl mb-4 block">📦</span>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start ordering from your favorite restaurants</p>
            <button
              onClick={() => navigate('/')}
              className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition font-semibold"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4 pb-4 border-b">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{order.restaurantName}</h3>
                    <p className="text-sm text-gray-600">
                      {new Date(order.orderDate).toLocaleString('en-IN', {
                        dateStyle: 'medium',
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  <div className={`px-4 py-2 rounded-full font-semibold ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)} {order.status.replace('-', ' ').toUpperCase()}
                  </div>
                </div>

                {/* Order Items */}
                <div className="space-y-2 mb-4">
                  {order.items.map(item => (
                    <div key={item.id} className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <span className={item.isVeg ? 'text-green-600' : 'text-red-600'}>
                          {item.isVeg ? '🟢' : '🔴'}
                        </span>
                        <span>{item.name}</span>
                        <span className="text-gray-500">x {item.quantity}</span>
                      </div>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between pt-4 border-t">
                  <div>
                    <p className="text-sm text-gray-600">📍 {order.deliveryAddress}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Est. Delivery: {new Date(order.estimatedDelivery).toLocaleTimeString('en-IN', {
                        timeStyle: 'short'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-orange-600">₹{order.totalAmount.toFixed(2)}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {order.status !== 'cancelled' && order.status !== 'delivered' && (
                    <button
                      onClick={() => {
                        if (window.confirm('Are you sure you want to cancel this order?')) {
                          cancelOrder(order.id);
                        }
                      }}
                      className="bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition font-semibold"
                    >
                      ❌ Cancel
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/track-order/${order.id}`)}
                    className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition font-semibold"
                  >
                    🗺️ Track
                  </button>
                  <button
                    onClick={() => navigate(`/restaurant/${order.restaurantId}`)}
                    className="bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition font-semibold"
                  >
                    🔄 Reorder
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
