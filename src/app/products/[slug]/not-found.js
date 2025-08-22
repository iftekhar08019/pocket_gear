'use client';

import Link from 'next/link';
import { FaArrowLeft, FaSearch, FaHome } from 'react-icons/fa';
import { useTheme } from '../../contexts/ThemeContext';

export default function ProductNotFound() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-md mx-auto text-center px-4">
        {/* Icon */}
        <div className="mb-6">
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
            isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}>
            <FaSearch className={`w-12 h-12 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
        </div>

        {/* Title */}
        <h1 className={`text-3xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Product Not Found
        </h1>

        {/* Description */}
        <p className={`text-lg mb-8 ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Sorry, the product you're looking for doesn't exist or may have been removed.
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            href="/products"
            className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <FaArrowLeft className="mr-2 w-4 h-4" />
            Browse All Products
          </Link>
          
          <Link
            href="/"
            className={`inline-flex items-center justify-center w-full px-6 py-3 rounded-lg font-medium transition-colors ${
              isDarkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            }`}
          >
            <FaHome className="mr-2 w-4 h-4" />
            Back to Home
          </Link>
        </div>

        {/* Help Text */}
        <p className={`text-sm mt-8 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-500'
        }`}>
          Can't find what you're looking for? Try searching our product catalog or contact our support team.
        </p>
      </div>
    </div>
  );
}
