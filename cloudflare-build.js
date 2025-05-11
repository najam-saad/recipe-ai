// Custom build script to optimize assets for Cloudflare Pages
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log with timestamp
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Main function
async function main() {
  try {
    // Build the Next.js app
    log('Building Next.js app...');
    execSync('npm run build', { stdio: 'inherit' });
    
    // Clean up large cache files that Cloudflare doesn't need
    log('Cleaning up webpack cache files...');
    const cacheDir = path.join('.next', 'cache', 'webpack');
    
    if (fs.existsSync(cacheDir)) {
      const files = fs.readdirSync(cacheDir, { recursive: true });
      
      // Look for large pack files
      for (const file of files) {
        const filePath = path.join(cacheDir, file);
        if (fs.statSync(filePath).isFile() && file.endsWith('.pack')) {
          log(`Removing large webpack cache file: ${filePath}`);
          fs.unlinkSync(filePath);
        }
      }
    }
    
    log('Build completed successfully');
  } catch (error) {
    log(`Error during build: ${error.message}`);
    process.exit(1);
  }
}

main(); 