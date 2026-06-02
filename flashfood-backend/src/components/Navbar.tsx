import { Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';

const Navbar = () => {
  const { user, cart } = useApp();
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-3xl">🍔</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              FlashFood
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-orange-500 font-medium transition">
              Home
            </Link>
            
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-orange-500 font-medium transition">
                Orders
              </Link>
            )}

            {/* Cart */}
            <Link to="/cart" className="relative text-gray-700 hover:text-orange-500 transition">
              <span className="text-2xl">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Profile/Login */}
            {user ? (
              <Link to="/profile" className="flex items-center space-x-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition">
                <span>👤</span>
                <span className="font-medium">{user.name}</span>
              </Link>
            ) : (
              <Link to="/login" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition font-medium">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
