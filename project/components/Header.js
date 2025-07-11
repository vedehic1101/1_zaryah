'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { useLocation } from '@/contexts/LocationContext';
import { Heart, ShoppingBag, User, LogOut, MapPin, Package, MessageCircle } from 'lucide-react';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems, setIsOpen } = useCart();
  const { location } = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navigationItems = [
    { name: 'Home', href: '/', icon: Heart },
    { name: 'Shop', href: '/shop', icon: ShoppingBag },
    { name: 'Products', href: '/products', icon: Package },
    { name: 'Gift Suggester', href: '/gift-suggester', icon: Heart },
    { name: 'Hamper Builder', href: '/hamper-builder', icon: ShoppingBag },
    { name: 'Support', href: '/support', icon: MessageCircle },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-amber-800">Zaryah</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-gray-700 hover:text-amber-600 transition-colors duration-200"
              >
                <item.icon className="w-4 h-4" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Location */}
            <div className="hidden sm:flex items-center space-x-1 text-sm text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{location.city}</span>
              <button className="text-amber-600 hover:text-amber-700 font-medium">
                Change
              </button>
            </div>

            {/* Notifications */}
            <button className="p-2 text-gray-600 hover:text-amber-600 transition-colors">
              <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-amber-800">3</span>
              </div>
            </button>

            {/* Cart */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 text-gray-600 hover:text-amber-600 transition-colors relative"
            >
              <ShoppingBag className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>

            {/* User menu */}
            <div className="relative">
              {user ? (
                <div>
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 p-2 text-gray-600 hover:text-amber-600 transition-colors"
                  >
                    <User className="w-6 h-6" />
                    <span className="hidden sm:inline text-sm font-medium">
                      {user.name}
                    </span>
                  </button>
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Profile
                        </Link>
                        <Link
                          href="/orders"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Orders
                        </Link>
                        <Link
                          href="/wishlist"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Wishlist
                        </Link>
                        <Link
                          href="/support"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Support
                        </Link>
                        {user.role === 'seller' && (
                          <Link
                            href="/seller/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Seller Dashboard
                          </Link>
                        )}
                        {user.role === 'admin' && (
                          <Link
                            href="/admin/dashboard"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            Admin Dashboard
                          </Link>
                        )}
                        <button
                          onClick={logout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <LogOut className="w-4 h-4 inline mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>Login</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;