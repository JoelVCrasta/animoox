/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        domains: ['res.cloudinary.com'],
        domains: ['example.com'],
    },
}

module.exports = nextConfig;
