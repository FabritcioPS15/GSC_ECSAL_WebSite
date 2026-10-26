/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.wp.com',
      },
      {
        protocol: 'https',
        hostname: 'www.apeseg.org.pe',
      },
      {
        protocol: 'https',
        hostname: 'tecdrive.es',
      },
    ],
  },
  // Compress output
  compress: true,
  // Enable React strict mode for better performance debugging
  reactStrictMode: true,
  // Configure headers for caching.
  // Only apply in production: dev/Turbopack chunk URLs are reused while their
  // contents change, so immutable caching makes the browser serve stale modules.
  async headers() {
    if (process.env.NODE_ENV !== 'production') {
      return []
    }

    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|ico|gif)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Only content-hashed build output is safe to cache immutably.
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:all*(woff|woff2|eot|ttf|otf)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
