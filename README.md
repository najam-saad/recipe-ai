# Recipe AI

A modern recipe generator and recipe sharing website built with Next.js.

## Features

- AI-powered recipe generation
- Recipe listings with category filtering
- SEO optimized with structured data
- Mobile responsive design
- AdSense integration
- Sitemap and robots.txt for better indexing

## Deployment on Cloudflare Pages

This project is configured for deployment on Cloudflare Pages. To deploy:

1. Fork or clone this repository to your GitHub account
2. Sign in to your Cloudflare account and go to Pages
3. Connect your GitHub account and select this repository
4. Configure your build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Environment variables: Set `NODE_VERSION` to `20`
5. Deploy!

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## License

MIT
