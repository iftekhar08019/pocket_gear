'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { FaPlus, FaHome } from 'react-icons/fa';
import { Geist, Geist_Mono } from "next/font/google";
import { useTheme } from '@/app/contexts/ThemeContext';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function DashboardLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300 ${
        isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null; // Will redirect to login
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className={`min-h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
          <div className="flex">
            {/* Left Sidebar */}
            <aside className={`w-64 min-h-screen transition-colors duration-300 ${
              isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-white border-r border-gray-200'
            }`}>
              <div className="p-6">
                {/* Dashboard Title and Welcome */}
                <div className="mb-8">
                  <h1 className={`text-2xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Dashboard
                  </h1>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    Welcome back, {session.user?.name || session.user?.email}
                  </p>
                </div>

                {/* Quick Actions */}
                <div>
                  <h2 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    Quick Actions
                  </h2>
                  <div className="space-y-2">
                    <Link
                      href="/dashboard"
                      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                        pathname === '/dashboard'
                          ? 'bg-blue-600 text-white'
                          : isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <FaHome className="w-4 h-4 mr-3" />
                      Home
                    </Link>
                    <Link
                      href="/dashboard/add-product"
                      className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                        pathname === '/dashboard/add-product'
                          ? 'bg-blue-600 text-white'
                          : isDarkMode 
                            ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <FaPlus className="w-4 h-4 mr-3" />
                      Add Product
                    </Link>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
