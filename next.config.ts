import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false, // Disable React Strict Mode
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true, // This helps with Cloudflare Pages deployment
  },
  // Explicitly set output mode to ensure compatibility with Cloudflare
  output: 'standalone',
  
  // Configure webpack to create smaller chunks
  webpack: (config, { isServer }) => {
    // Optimize chunk size for Cloudflare Pages (25MB limit)
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 20000000, // 20MB (under Cloudflare's 25MB limit)
    };
    
    return config;
  },
};

export default nextConfig;
