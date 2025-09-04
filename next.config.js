/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.clerk.com', 'images.clerk.dev'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig
