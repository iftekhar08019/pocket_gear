# PocketGear - Premium Tech Accessories E-commerce

A modern, responsive e-commerce platform built with Next.js for premium tech accessories and gadgets. Features a clean dashboard for product management, user authentication, and a beautiful product catalog.

## 🚀 Features

- **Modern UI/UX** - Responsive design with dark/light theme support
- **User Authentication** - Google OAuth and email/password login
- **Product Management** - Add, view, and manage products
- **Dashboard** - Admin dashboard for product management
- **Image Optimization** - Next.js Image component for performance
- **SweetAlert Notifications** - Beautiful success/error alerts
- **MongoDB Integration** - Robust database for products and users
- **Responsive Design** - Mobile-first approach with Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: React Icons
- **Notifications**: SweetAlert2

## 🖼️ Image Handling Strategy

The application uses a hybrid approach for image optimization:

- **Static Assets** (logos, icons): Next.js `<Image>` component for automatic optimization
- **User-Uploaded Images** (product photos): Regular `<img>` tags for flexibility
- **Benefits**: Users can add product images from any external URL without hostname restrictions
- **Trade-offs**: Product images won't have automatic optimization but maintain user flexibility

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB database
- Google OAuth credentials (optional)

## ⚙️ Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd pocketgear
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 4. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🗺️ Route Summary

### Application Structure
```
pocketgear/
├── src/
│   ├── app/
│   │   ├── (dashboard)/           # Route group (no URL impact)
│   │   │   └── dashboard/         # /dashboard
│   │   │       ├── page.js        # Dashboard main page
│   │   │       └── add-product/   # /dashboard/add-product
│   │   │           └── page.js    # Add product form
│   │   ├── api/                   # API routes
│   │   │   ├── auth/
│   │   │   │   └── [...nextauth]/ # /api/auth/*
│   │   │   │       └── route.js   # NextAuth endpoints
│   │   │   ├── products/
│   │   │   │   └── route.js       # /api/products
│   │   │   └── test-mongodb/
│   │   │       └── route.js       # /api/test-mongodb
│   │   ├── components/            # Reusable components
│   │   │   ├── Navbar.js          # Main navigation
│   │   │   ├── Footer.js          # Footer component
│   │   │   └── contexts/
│   │   │       └── ThemeContext.js # Theme management
│   │   ├── dashboard/             # ❌ REMOVED (duplicate route)
│   │   ├── login/                 # /login
│   │   │   └── page.js            # Authentication page
│   │   ├── products/              # /products
│   │   │   ├── page.js            # Product catalog
│   │   │   └── [slug]/            # Dynamic product routes
│   │   │       ├── page.js        # /products/[slug]
│   │   │       └── not-found.js   # Product not found
│   │   ├── globals.css            # Global styles
│   │   ├── layout.js              # Root layout
│   │   ├── page.js                # Home page (/)
│   │   └── providers.js           # Context providers
│   └── lib/
│       └── mongodb.js             # Database connection
├── public/                         # Static assets
│   ├── logo.ico                   # Favicon
│   └── data.json                  # Sample data
├── next.config.mjs                # Next.js configuration
├── package.json                    # Dependencies
└── README.md                      # This file
```

### Route Details

#### 🌐 Public Routes
- **`/`** - Home page with featured products and hero section
- **`/products`** - Product catalog with search and filtering
- **`/products/[slug]`** - Individual product detail page
- **`/login`** - User authentication page

#### 🔒 Protected Routes (Dashboard)
- **`/dashboard`** - Main dashboard with statistics and recent products
- **`/dashboard/add-product`** - Add new product form

#### ⚙️ API Routes
- **`/api/auth/[...nextauth]`** - NextAuth.js authentication endpoints
- **`/api/products`** - Product CRUD operations (GET, POST)
- **`/api/test-mongodb`** - MongoDB connection test

#### 🧩 Components
- **`/components/Navbar.js`** - Main navigation with theme toggle and user menu
- **`/components/Footer.js`** - Footer with social links and company info
- **`/contexts/ThemeContext.js`** - Dark/light theme management

### File Organization Notes

- **Route Groups**: `(dashboard)` is a Next.js route group that doesn't affect the URL structure
- **Dynamic Routes**: `[slug]` creates dynamic product pages based on product names
- **API Routes**: All backend functionality is handled through Next.js API routes
- **Layouts**: `layout.js` files provide consistent structure across routes
- **Contexts**: Theme and authentication state is managed through React Context

## 🎨 Theme System

The application supports both light and dark themes:
- **Light Theme**: Clean, modern design with white backgrounds
- **Dark Theme**: Dark mode with gray backgrounds and white text
- **Theme Toggle**: Available in the navigation bar

## 🔐 Authentication

- **Google OAuth**: Sign in with Google account
- **Email/Password**: Traditional login system
- **Protected Routes**: Dashboard access requires authentication
- **Session Management**: NextAuth.js handles user sessions

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Responsive layouts for medium screens
- **Desktop Experience**: Full-featured desktop interface
- **Touch Friendly**: Optimized touch targets for mobile

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npm run start
```

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_URL` | Your application URL | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth | Yes |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID | No |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret | No |

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:
- Check the [Next.js Documentation](https://nextjs.org/docs)
- Review the [NextAuth.js Documentation](https://next-auth.js.org)
- Open an issue in the repository

---

Built with ❤️ using Next.js and modern web technologies.
