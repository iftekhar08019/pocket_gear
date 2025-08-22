import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { NextAuthProvider } from "./providers";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PocketGear - Premium Tech Accessories",
  description: "Your one-stop destination for premium tech accessories and gadgets. Quality products at competitive prices.",
  icons: {
    icon: "https://p1.hiclipart.com/preview/439/774/372/mobile-app-icon-virtual-reality-icon-mobile-phone-case-green-line-technology-symbol-mobile-phone-accessories-logo-png-clipart.jpg",
    shortcut: "https://p1.hiclipart.com/preview/439/774/372/mobile-app-icon-virtual-reality-icon-mobile-phone-case-green-line-technology-symbol-mobile-phone-accessories-logo-png-clipart.jpg",
    apple: "https://p1.hiclipart.com/preview/439/774/372/mobile-app-icon-virtual-reality-icon-mobile-phone-case-green-line-technology-symbol-mobile-phone-accessories-logo-png-clipart.jpg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
