'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

export default function Footer() {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`transition-colors duration-300 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-flex items-center space-x-3 mb-4 hover:opacity-80 transition-opacity focus:outline-none">
              <Image 
                src="https://p1.hiclipart.com/preview/439/774/372/mobile-app-icon-virtual-reality-icon-mobile-phone-case-green-line-technology-symbol-mobile-phone-accessories-logo-png-clipart.jpg"
                alt="PocketGear Logo"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
              <h3 className="text-2xl font-bold">PocketGear</h3>
            </Link>
            <p className={`mb-4 ${
              isDarkMode ? 'text-gray-300' : 'text-gray-300'
            }`}>
              Your one-stop destination for premium tech accessories and gadgets. 
              Quality products at competitive prices.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/Iftekar.alam.joy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <FaFacebook className="w-6 h-6" />
              </a>
              <a 
                href="https://x.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="X (Twitter)"
              >
                <FaTwitter className="w-6 h-6" />
              </a>
              <a 
                href="https://www.instagram.com/iftekhar.joy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <FaInstagram className="w-6 h-6" />
              </a>
              <a 
                href="https://www.linkedin.com/in/mdiftekharulalam21/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
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
            © 2025 PocketGear. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
