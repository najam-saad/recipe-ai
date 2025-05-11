// Custom build script to optimize assets for Cloudflare Pages
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Log with timestamp
function log(message) {
  console.log(`[${new Date().toISOString()}] ${message}`);
}

// Function to delete directory recursively
function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        // Recursive call
        deleteFolderRecursive(curPath);
      } else {
        // Delete file
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    log(`Removed directory: ${folderPath}`);
  }
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
      log(`Removing webpack cache directory: ${cacheDir}`);
      deleteFolderRecursive(cacheDir);
    }
    
    // Create an empty cache directory to maintain structure
    fs.mkdirSync(cacheDir, { recursive: true });
    
    log('Build completed successfully');
  } catch (error) {
    log(`Error during build: ${error.message}`);
    process.exit(1);
  }
}

main(); 