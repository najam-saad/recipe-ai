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
      maxInitialRequests: 20,
      minSize: 20000,
      maxSize: 10000000, // Reduced to 10MB
      cacheGroups: {
        default: false,
        vendors: false,
        framework: {
          chunks: 'all',
          name: 'framework',
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
          priority: 40,
          enforce: true,
        },
        lib: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name(module: any) {
            // Handle null or undefined module.context
            if (!module.context) return 'vendor';
            
            // Safe regex match
            const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
            if (!match || !match[1]) return 'vendor';
            
            return `npm.${match[1].replace('@', '')}`;
          },
          priority: 30,
        },
        commons: {
          name: 'commons',
          minChunks: 2,
          priority: 20,
        },
      },
    };
    
    // Apply additional optimizations
    config.optimization.minimize = true;
    config.optimization.minimizer = config.optimization.minimizer || [];
    
    // Reduce memory usage
    config.optimization.moduleIds = 'deterministic';
    config.optimization.runtimeChunk = 'single';
    
    return config;
  },
  
  // Optimize package imports
  experimental: {
    optimizePackageImports: [
      '@radix-ui/react-icons',
      'lucide-react',
      '@radix-ui/react-*',
      'framer-motion',
      'date-fns',
    ],
    // Disable CSS optimization to avoid critters issues
    memoryBasedWorkersCount: true,
    optimizeCss: false,
  },
};

export default nextConfig;
