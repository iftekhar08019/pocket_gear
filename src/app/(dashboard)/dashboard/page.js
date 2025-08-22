'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaList, 
  FaChartLine, 
  FaUsers,
  FaBox,
  FaArrowRight
} from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';


export default function DashboardHome() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalUsers: 0,
    recentProducts: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch products count from MongoDB API
        const productsResponse = await fetch('/api/products');
        if (productsResponse.ok) {
          const products = await productsResponse.json();
          setStats(prev => ({
            ...prev,
            totalProducts: products.length,
            recentProducts: products.slice(0, 3)
          }));
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="text-center">
        <h1 className={`text-4xl font-bold mb-4 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to Your Dashboard
        </h1>
        <p className={`text-xl ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Manage your products and monitor your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Total Products
              </p>
              <p className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {stats.totalProducts}
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-blue-600' : 'bg-blue-100'
            }`}>
              <FaBox className={`w-6 h-6 ${
                isDarkMode ? 'text-white' : 'text-blue-600'
              }`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Store Performance
              </p>
              <p className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Excellent
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-green-600' : 'bg-green-100'
            }`}>
              <FaChartLine className={`w-6 h-6 ${
                isDarkMode ? 'text-white' : 'text-green-600'
              }`} />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`p-6 rounded-xl shadow-lg transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Users
              </p>
              <p className={`text-3xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Growing
              </p>
            </div>
            <div className={`p-3 rounded-full ${
              isDarkMode ? 'bg-purple-600' : 'bg-purple-100'
            }`}>
              <FaUsers className={`w-6 h-6 ${
                isDarkMode ? 'text-white' : 'text-purple-600'
              }`} />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h2 className={`text-2xl font-bold mb-6 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Quick Actions
        </h2>
        <div className="flex flex-col justify-center items-center gap-4">
          <Link
            href="/dashboard/add-product"
            className={`p-6 rounded-lg border-2 border-dashed transition-all duration-300 hover:border-solid hover:scale-105 ${
              isDarkMode 
                ? 'border-gray-600 hover:border-blue-500 hover:bg-gray-700' 
                : 'border-gray-300 hover:border-blue-500 hover:bg-blue-50'
            }`}
          >
            <div className="text-center">
              <FaPlus className={`w-12 h-12 mx-auto mb-4 ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`} />
              <h3 className={`text-lg font-semibold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Add New Product
              </h3>
              <p className={`text-sm ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Create a new product listing
              </p>
            </div>
          </Link>

         
        </div>
      </motion.div>

      {/* Recent Products */}
      {stats.recentProducts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className={`rounded-xl shadow-lg p-6 transition-colors duration-300 ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Recent Products
            </h2>
            <Link
              href="/products"
              className={`inline-flex items-center text-sm font-medium transition-colors ${
                isDarkMode 
                  ? 'text-blue-400 hover:text-blue-300' 
                  : 'text-blue-600 hover:text-blue-700'
              }`}
            >
              View All
              <FaArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {stats.recentProducts.map((product, index) => (
              <div
                key={product._id || index}
                className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {product.name}
                  </h3>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    ${product.price}
                  </p>
                </div>
                <Link
                  href={`/products/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    isDarkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
