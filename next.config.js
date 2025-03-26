/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['example.com'],
  },
  experimental: {
    // Enable to improve compatibility with Cloudflare Pages
    serverComponentsExternalPackages: ['next-sitemap'],
  },
};

module.exports = nextConfig; 