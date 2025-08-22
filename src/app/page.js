'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaUser, 
  FaArrowLeft, 
  FaArrowRight,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes
} from 'react-icons/fa';

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
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }

    // Auto-advance carousel
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    // Load products
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setProducts(data.slice(0, 4)))
      .catch(err => console.error('Error loading products:', err));

    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

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
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Navbar */}
      <nav className={`shadow-lg sticky top-0 z-50 transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img 
                src="https://p1.hiclipart.com/preview/439/774/372/mobile-app-icon-virtual-reality-icon-mobile-phone-case-green-line-technology-symbol-mobile-phone-accessories-logo-png-clipart.jpg"
                alt="PocketGear Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h1 className={`text-2xl font-bold ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>PocketGear</h1>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/"
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`transition-colors px-3 py-2 rounded-lg ${
                  pathname === "/products"
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                Products
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-yellow-400 hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle theme"
              >
                {isDarkMode ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`md:hidden p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
              </button>

              <Link href="/login" className={`hidden sm:flex items-center space-x-2 px-4 py-2 transition-colors ${
                isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}>
                <FaUser className="w-5 h-5" />
                <span className="hidden sm:inline">Login</span>
              </Link>

            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className={`py-4 space-y-2 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <Link 
                href="/" 
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/"
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/products" 
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/products"
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                href="/login" 
                className={`block px-4 py-2 rounded-lg transition-colors ${
                  pathname === "/login"
                    ? isDarkMode 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-blue-600 text-white'
                    : isDarkMode 
                      ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </nav>

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
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all ${
            isDarkMode ? 'bg-gray-800 bg-opacity-80 hover:bg-opacity-100' : 'bg-white bg-opacity-80 hover:bg-opacity-100'
          }`}
        >
          <FaArrowLeft className={`w-5 h-5 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`} />
        </button>
        
        <button
          onClick={nextSlide}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full shadow-lg transition-all ${
            isDarkMode ? 'bg-gray-800 bg-opacity-80 hover:bg-opacity-100' : 'bg-white bg-opacity-80 hover:bg-opacity-100'
          }`}
        >
          <FaArrowRight className={`w-5 h-5 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`} />
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
            }`}>Featured Products</h2>
            <p className={`text-base sm:text-lg lg:text-xl ${
              isDarkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>Discover our most popular tech accessories</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                }`}
              >
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className={`font-semibold mb-2 line-clamp-2 text-sm sm:text-base ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>{product.name}</h3>
                  <p className={`text-xs sm:text-sm mb-3 line-clamp-2 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>{product.description}</p>
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
                  ? 'bg-gray-700 text-white hover:bg-gray-600' 
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              View All Products
              <FaArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={`transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">PocketGear</h3>
              <p className={`mb-4 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-300'
              }`}>
                Your one-stop destination for premium tech accessories and gadgets. 
                Quality products at competitive prices.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaFacebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaTwitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <FaLinkedin className="w-6 h-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <FaPhone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaEnvelope className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">info@pocketgear.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300">123 Tech Street, Digital City</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2024 PocketGear. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
