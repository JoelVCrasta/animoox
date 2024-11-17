/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["res.cloudinary.com", "daqnioq8w8j1r.cloudfront.net"],
    domains: ["example.com"],
  },
}

module.exports = nextConfig
