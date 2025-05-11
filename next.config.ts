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
  // Use "export" instead of "standalone" for Cloudflare Pages
  // This creates a static build compatible with Cloudflare Pages
  output: 'export',
  
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
      
      // Exclude large dependencies from the server bundle if possible
      config.externals = [...(config.externals || []), 
        // Add any large dependencies that can be loaded at runtime
        // This can help reduce the server bundle size
        '@genkit-ai/googleai',
        'genkit',
      ];
    }
    
    return config;
  },
  
  // Disable image optimization since we're using unoptimized images
  experimental: {
    // These experimental features help with static exports
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
};

export default nextConfig;
