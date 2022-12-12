/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["lh3.googleusercontent.com","localhost","res.cloudinary.com","http2.mlstatic.com", "m.media-amazon.com", "www.lg.com"],
  },
};

module.exports = nextConfig;
