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

### Public Routes
- **`/`** - Home page with featured products and hero section
- **`/products`** - Product catalog with search and filtering
- **`/products/[slug]`** - Individual product detail page
- **`/login`** - User authentication page

### Protected Routes (Dashboard)
- **`/dashboard`** - Main dashboard with statistics and recent products
- **`/dashboard/add-product`** - Add new product form

### API Routes
- **`/api/auth/[...nextauth]`** - NextAuth.js authentication endpoints
- **`/api/products`** - Product CRUD operations
- **`/api/test-mongodb`** - MongoDB connection test

### Components
- **`/components/Navbar.js`** - Main navigation with theme toggle
- **`/components/Footer.js` - Footer with social links and company info

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
