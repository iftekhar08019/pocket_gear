'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaPlus, 
  FaImage, 
  FaSave, 
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle
} from 'react-icons/fa';
import { useTheme } from '@/app/contexts/ThemeContext';


export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    details: '',
    image: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});
  const router = useRouter();
  const { isDarkMode } = useTheme();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear message when user makes changes
    if (message.text) {
      setMessage({ type: '', text: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Product name must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Product description is required';
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!formData.price) {
      newErrors.price = 'Price is required';
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Price must be a positive number';
    }

    if (!formData.details.trim()) {
      newErrors.details = 'Product details are required';
    } else if (formData.details.trim().length < 10) {
      newErrors.details = 'Details must be at least 10 characters';
    }

    if (!formData.image.trim()) {
      newErrors.image = 'Image URL is required';
    } else if (!isValidUrl(formData.image)) {
      newErrors.image = 'Please enter a valid image URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          description: formData.description.trim(),
          price: parseFloat(formData.price),
          details: formData.details.trim(),
          image: formData.image.trim()
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: 'Product added successfully! Redirecting to products...'
        });
        
        // Reset form
        setFormData({
          name: '',
          description: '',
          price: '',
          details: '',
          image: ''
        });
        
        // Redirect after a short delay
        setTimeout(() => {
          router.push('/products');
        }, 2000);
      } else {
        setMessage({
          type: 'error',
          text: data.error || 'Failed to add product. Please try again.'
        });
      }
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage({
        type: 'error',
        text: 'Network error. Please check your connection and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      details: '',
      image: ''
    });
    setErrors({});
    setMessage({ type: '', text: '' });
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="text-center">
        <h1 className={`text-3xl font-bold mb-2 ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Add New Product
        </h1>
        <p className={`text-lg ${
          isDarkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Create a new product listing for your store
        </p>
      </div>

      {/* Message Display */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-lg flex items-center space-x-3 ${
            message.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <FaCheckCircle className="w-5 h-5 text-green-600" />
          ) : (
            <FaExclamationTriangle className="w-5 h-5 text-red-600" />
          )}
          <span className="font-medium">{message.text}</span>
        </motion.div>
      )}

      {/* Product Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl shadow-lg p-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`}>
              Product Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Enter product name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          {/* Product Description */}
          <div>
            <label htmlFor="description" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`}>
              Description *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="Describe your product in detail"
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">{errors.description}</p>
            )}
          </div>

          {/* Price and Image Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Price */}
            <div>
              <label htmlFor="price" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Price ($) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                step="0.01"
                min="0"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.price
                    ? 'border-red-500 focus:ring-red-500'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                placeholder="0.00"
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">{errors.price}</p>
              )}
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  errors.image
                    ? 'border-red-500 focus:ring-red-500'
                    : isDarkMode
                      ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                      : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
                }`}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <label htmlFor="details" className={`block text-sm font-medium mb-2 ${
              isDarkMode ? 'text-white' : 'text-gray-700'
            }`}>
              Product Details *
            </label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                errors.details
                  ? 'border-red-500 focus:ring-red-500'
                  : isDarkMode
                    ? 'border-gray-600 bg-gray-700 text-white placeholder-gray-400'
                    : 'border-gray-300 bg-white text-gray-900 placeholder-gray-500'
              }`}
              placeholder="List key features and specifications (comma-separated)"
            />
            <p className={`mt-1 text-xs ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Example: Bluetooth 5.3, 24-hour battery, IPX5 water-resistant, touch controls
            </p>
            {errors.details && (
              <p className="mt-1 text-sm text-red-600">{errors.details}</p>
            )}
          </div>

          {/* Image Preview */}
          {formData.image && !errors.image && (
            <div>
              <label className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-700'
              }`}>
                Image Preview
              </label>
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Product preview"
                  className="w-full max-w-md h-48 object-cover rounded-lg border"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="hidden w-full max-w-md h-48 bg-gray-200 rounded-lg border flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <FaImage className="w-12 h-12 mx-auto mb-2" />
                    <p>Image not available</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className={`flex-1 inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-300 ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Adding Product...
                </>
              ) : (
                <>
                  <FaSave className="w-5 h-5 mr-2" />
                  Add Product
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={handleReset}
              disabled={isLoading}
              className={`inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-lg transition-colors ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : isDarkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              <FaTimes className="w-5 h-5 mr-2" />
              Reset
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
