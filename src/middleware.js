import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(req) {
    // This function runs after authentication is verified
    // You can add additional logic here if needed
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Only allow authenticated users
    },
    pages: {
      signIn: '/login', // Redirect to login page if not authenticated
    },
  }
);

export const config = {
  matcher: [
    '/dashboard/:path*', // Protect all dashboard routes
  ],
};
