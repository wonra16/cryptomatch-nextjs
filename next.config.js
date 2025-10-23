/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'pbs.twimg.com',
      'imagedelivery.net',
      'i.imgur.com'
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
