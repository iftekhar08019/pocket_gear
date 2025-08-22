# NextAuth.js Setup Guide

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth (Optional - for Google login)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## Google OAuth Setup (Optional)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Set Application Type to "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
7. Copy Client ID and Client Secret to your `.env.local` file

## Demo Credentials

For testing without Google OAuth, use these demo credentials:
- **Email**: demo@example.com
- **Password**: demo123

## Features

✅ **Google OAuth Login** - Sign in with Google account
✅ **Credential Login** - Email/password authentication
✅ **Protected Routes** - Products page requires authentication
✅ **Auto-redirect** - Redirects to /products after successful login
✅ **Session Management** - Persistent login state
✅ **Sign Out** - Logout functionality
✅ **Responsive Design** - Works on all devices

## Security Notes

- In production, replace demo credentials with proper database authentication
- Use strong, unique NEXTAUTH_SECRET
- Enable HTTPS in production
- Implement proper password hashing for credential provider
