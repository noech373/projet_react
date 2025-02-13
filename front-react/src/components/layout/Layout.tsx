import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { FiShoppingCart, FiSun, FiMoon, FiHome } from 'react-icons/fi';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { cartItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className={`flex items-center space-x-2 ${
                  location.pathname === '/' 
                    ? 'text-primary-light dark:text-primary-dark' 
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <FiHome className="w-5 h-5" />
                <span className="hidden sm:block">Accueil</span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <FiMoon className="w-5 h-5 text-gray-600" />
                )}
              </button>

              <Link 
                to="/cart" 
                className={`flex items-center space-x-2 ${
                  location.pathname === '/cart'
                    ? 'text-primary-light dark:text-primary-dark'
                    : 'text-gray-600 dark:text-gray-300'
                }`}
              >
                <div className="relative">
                  <FiShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </div>
                <span className="hidden sm:block">Panier</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-gray-500 dark:text-gray-400">
            © 2024 Event Booking. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  );
};