'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaArrowLeft, 
  FaArrowRight
} from 'react-icons/fa';
import { useTheme } from './contexts/ThemeContext';

// Hero carousel images
const heroImages = [
  {
    url: "https://img.freepik.com/free-photo/headphones-with-minimalist-monochrome-background_23-2150763313.jpg?semt=ais_hybrid&w=740&q=80",
    title: "Premium Audio Experience",
    subtitle: "Discover our collection of high-quality headphones"
  },
  {
    url: "https://img.freepik.com/premium-photo/flat-lay-tech-gadgets-with-bold-red-sale-tags-clean-background_1310094-149825.jpg",
    title: "Tech Gadgets Sale",
    subtitle: "Amazing deals on premium tech accessories"
  },
  {
    url: "https://img.freepik.com/free-photo/elevated-view-camera-lens-spiral-notebook-cellphone-personal-accessories-background_23-2147856120.jpg",
    title: "Professional Photography",
    subtitle: "Capture every moment with our camera gear"
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [products, setProducts] = useState([]);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    // Auto-advance carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Load products from MongoDB API
    fetch('/api/products')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => setProducts(data.slice(0, 4)))
      .catch(err => {
        console.error('Error loading products:', err);
        // Keep empty products array, will show no featured products
      });

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Hero Carousel */}
      <section className="relative h-[600px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${heroImages[currentSlide].url})` }}
            >
              {/* Hero overlay with gradient for better readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>
              
              {/* Content container with proper spacing */}
              <div className="relative z-10 flex items-center justify-center h-full text-center text-white px-4">
                <div className="max-w-4xl mx-auto">
                  {/* Text container with background for better readability */}
                  <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
                    <motion.h1
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white drop-shadow-lg"
                    >
                      {heroImages[currentSlide].title}
                    </motion.h1>
                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl lg:text-2xl mb-8 text-gray-100 drop-shadow-md max-w-2xl mx-auto"
                    >
                      {heroImages[currentSlide].subtitle}
                    </motion.p>
                    <motion.button
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Shop Now
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
        >
          <FaArrowLeft className="w-5 h-5 text-gray-800" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-3 rounded-full shadow-lg transition-all"
        >
          <FaArrowRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Product Highlights */}
      <section className={`py-8 sm:py-12 lg:py-16 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Featured Products
            </h2>
            <p className={`text-base sm:text-lg lg:text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Discover our most popular tech accessories
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
                                   <motion.div
                       key={product.name}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: index * 0.1 }}
                       className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                         isDarkMode ? 'bg-gray-700' : 'bg-white'
                       }`}
                     >
                       <div className="aspect-square overflow-hidden">
                         <Image
                           src={product.image}
                           alt={product.name}
                           width={300}
                           height={300}
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                         />
                       </div>
                       <div className="p-3 sm:p-4">
                         <h3 className={`font-semibold mb-2 line-clamp-2 text-sm sm:text-base ${
                           isDarkMode ? 'text-white' : 'text-gray-800'
                         }`}>
                           {product.name}
                         </h3>
                         <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${
                           isDarkMode ? 'text-gray-300' : 'text-gray-600'
                         }`}>
                           {product.description}
                         </p>
                         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                           <span className="text-lg sm:text-xl font-bold text-blue-600">${product.price}</span>
                           <Link
                             href={`/products/${encodeURIComponent(product.name.toLowerCase().replace(/\s+/g, '-'))}`}
                             className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors text-center"
                           >
                             Details
                           </Link>
                         </div>
                       </div>
                     </motion.div>
            ))}
          </div>

                           <div className="text-center mt-8 sm:mt-12">
                   <Link
                     href="/products"
                     className={`inline-flex items-center px-6 sm:px-8 py-3 rounded-lg font-semibold transition-colors text-sm sm:text-base ${
                       isDarkMode 
                         ? 'bg-blue-600 text-white hover:bg-blue-700' 
                         : 'bg-gray-800 text-white hover:bg-gray-900'
                     }`}
                   >
                     View All Products
                     <FaArrowRight className="ml-2 w-4 h-4" />
                   </Link>
                 </div>
        </div>
      </section>
    </div>
  );
}
