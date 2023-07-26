/** @type {import('next').NextConfig} */
var nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['img.innoloft.com', 'maps.googleapis.com'],
  },
}

module.exports = nextConfig
