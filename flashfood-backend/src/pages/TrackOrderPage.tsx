import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { useEffect, useState } from 'react';

const TrackOrderPage = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { orders, cancelOrder } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const order = orders.find(o => o.id === orderId);

  useEffect(() => {
    // Simulate order status progression
    if (order) {
      const statusSteps: Record<string, number> = {
        'confirmed': 0,
        'preparing': 1,
        'out-for-delivery': 2,
        'delivered': 3
      };
      setCurrentStep(statusSteps[order.status] || 0);
    }
  }, [order]);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <span className="text-6xl mb-4 block">📦</span>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
          <button
            onClick={() => navigate('/orders')}
            className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
          >
            View All Orders
          </button>
        </div>
      </div>
    );
  }

  const steps = [
    { id: 0, label: 'Order Confirmed', icon: '✓', time: new Date(order.orderDate).toLocaleTimeString() },
    { id: 1, label: 'Preparing Food', icon: '👨‍🍳', time: '' },
    { id: 2, label: 'Out for Delivery', icon: '🛵', time: '' },
    { id: 3, label: 'Delivered', icon: '✅', time: order.status === 'delivered' ? 'Completed' : '' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <button
          onClick={() => navigate('/orders')}
          className="text-gray-600 hover:text-gray-900 mb-6 flex items-center"
        >
          ← Back to Orders
        </button>

        {/* Order Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{order.restaurantName}</h1>
              <p className="text-sm text-gray-600 mt-1">Order #{order.id.slice(-6)}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600">Total Amount</div>
              <div className="text-2xl font-bold text-orange-600">₹{order.totalAmount.toFixed(2)}</div>
            </div>
          </div>

          {/* Order Items */}
          <div className="border-t pt-4 mb-4">
            <h3 className="font-semibold mb-2">Order Items:</h3>
            {order.items.map(item => (
              <div key={item.id} className="flex justify-between text-sm py-1">
                <span>
                  {item.isVeg ? '🟢' : '🔴'} {item.name} x {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Delivery Address */}
          <div className="border-t pt-4">
            <p className="text-sm font-semibold mb-1">Delivery Address:</p>
            <p className="text-sm text-gray-600">{order.deliveryAddress}</p>
          </div>
        </div>

        {/* Live Tracking - Order Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Order Status</h2>
          
          {/* Progress Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start mb-8 last:mb-0">
                {/* Step Icon */}
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                    currentStep >= step.id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    {step.icon}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`absolute top-12 left-6 w-0.5 h-16 ${
                      currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
                    }`}></div>
                  )}
                </div>

                {/* Step Info */}
                <div className="ml-4 flex-1">
                  <h3 className={`font-semibold ${
                    currentStep >= step.id ? 'text-green-700' : 'text-gray-500'
                  }`}>
                    {step.label}
                  </h3>
                  {step.time && (
                    <p className="text-sm text-gray-500">{step.time}</p>
                  )}
                  {currentStep === step.id && step.id < 3 && (
                    <p className="text-sm text-blue-600 mt-1 animate-pulse">● In Progress</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Estimated Delivery */}
          {order.status !== 'delivered' && (
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                Estimated Delivery: {new Date(order.estimatedDelivery).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>

        {/* Delivery Partner Info */}
        {order.deliveryPartner && order.status === 'out-for-delivery' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Partner</h2>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-3xl">
                🛵
              </div>
              <div>
                <h3 className="font-bold text-lg">{order.deliveryPartner.name}</h3>
                <p className="text-sm text-gray-600">{order.deliveryPartner.vehicle}</p>
                <p className="text-sm text-gray-600">📞 {order.deliveryPartner.phone}</p>
              </div>
            </div>

            {/* Live Location Map Placeholder */}
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <div className="mb-4">
                <span className="text-6xl">🗺️</span>
              </div>
              <p className="text-gray-700 font-semibold mb-2">Live Location</p>
              <p className="text-sm text-gray-600 mb-4">
                Your delivery partner is on the way!
              </p>
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-green-700 font-semibold">Moving towards you</span>
              </div>
              
              {/* In a real app, this would be a Google Maps integration */}
              <p className="text-xs text-gray-500 mt-4">
                Lat: {order.deliveryPartner.currentLocation.lat.toFixed(4)}, 
                Lng: {order.deliveryPartner.currentLocation.lng.toFixed(4)}
              </p>
            </div>
          </div>
        )}

        {/* Cancel Order Section */}
        {order.status !== 'cancelled' && order.status !== 'delivered' && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Cancel Order</h2>
            <p className="text-sm text-gray-600 mb-4">
              You can cancel your order before it's delivered. Refund will be processed within 3-5 business days.
            </p>
            <button
              onClick={() => {
                if (window.confirm('Are you sure you want to cancel this order? This action cannot be undone.')) {
                  cancelOrder(order.id);
                  alert('Order cancelled successfully! Refund will be processed shortly.');
                  navigate('/orders');
                }
              }}
              className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition font-semibold"
            >
              ❌ Cancel Order
            </button>
          </div>
        )}

        {/* Cancelled Message */}
        {order.status === 'cancelled' && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-6">
            <div className="text-center">
              <span className="text-6xl mb-4 block">❌</span>
              <h2 className="text-2xl font-bold text-red-700 mb-2">Order Cancelled</h2>
              <p className="text-red-600">
                Your order has been cancelled. Refund will be processed within 3-5 business days.
              </p>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Need Help?</h2>
          <div className="flex gap-4">
            <button className="flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
              📞 Call Restaurant
            </button>
            <button className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition">
              💬 Chat Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrderPage;
