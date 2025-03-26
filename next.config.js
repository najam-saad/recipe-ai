/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['example.com'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Enable to improve compatibility with Cloudflare Pages
    serverComponentsExternalPackages: ['next-sitemap'],
  },
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
};

module.exports = nextConfig; 