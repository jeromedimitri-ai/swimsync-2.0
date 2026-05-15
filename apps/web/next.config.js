/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React Strict Mode for better development warnings
  reactStrictMode: true,

  // Experimental features
  experimental: {
    // Enable server actions
    serverActions: true,
  },

  // Image optimization
  images: {
    domains: [
      'localhost',
      'lh3.googleusercontent.com', // Google OAuth profile images
    ],
  },

  // Environment variables to expose to the browser
  env: {
    NEXT_PUBLIC_APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLUB_NAME: process.env.NEXT_PUBLIC_CLUB_NAME,
  },

  // Webpack configuration
  webpack: (config) => {
    // Add any custom webpack config here
    return config;
  },

  // Redirects
  async redirects() {
    return [
      // Redirect root to dashboard when logged in (will be handled in middleware)
    ];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
