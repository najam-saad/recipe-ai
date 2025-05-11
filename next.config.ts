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
  // Back to standalone for server actions support
  output: 'standalone',
  
  // Configure webpack to create smaller chunks
  webpack: (config, { isServer }) => {
    // Optimize chunk size for both client and server
    config.optimization.splitChunks = {
      chunks: 'all',
      maxInitialRequests: 25,
      minSize: 20000,
      maxSize: 15000000, // 15MB (under Cloudflare's 25MB limit)
    };
    
    // Apply additional server-side optimizations
    if (isServer) {
      // Add specific server-side optimizations
      config.optimization.minimize = true;
    }
    
    return config;
  },
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
};

export default nextConfig;
