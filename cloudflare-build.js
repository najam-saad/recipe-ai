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

// Function to clean up unnecessary files
function cleanupBuild() {
  const dirsToClean = [
    path.join('.next', 'cache'),
    path.join('.next', 'server', 'app', 'api'),
    path.join('.next', 'server', 'pages', 'api'),
  ];

  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      log(`Cleaning up directory: ${dir}`);
      deleteFolderRecursive(dir);
    }
  });

  // Clean up source maps
  const cleanSourceMaps = (dir) => {
    if (fs.existsSync(dir)) {
      fs.readdirSync(dir).forEach(file => {
        if (file.endsWith('.map')) {
          fs.unlinkSync(path.join(dir, file));
          log(`Removed source map: ${file}`);
        }
      });
    }
  };

  cleanSourceMaps(path.join('.next', 'static', 'chunks'));
  cleanSourceMaps(path.join('.next', 'static', 'css'));
}

// Main function
async function main() {
  try {
    // Set Node.js memory limit
    // process.env.NODE_OPTIONS = '--max-old-space-size=2048';
    
    // Build the Next.js app
    log('Building Next.js app...');
    execSync('npm run build:cloudflare', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        // NODE_OPTIONS: '--max-old-space-size=2048',
        NEXT_TELEMETRY_DISABLED: '1'
      }
    });
    
    // Clean up unnecessary files
    log('Cleaning up build artifacts...');
    cleanupBuild();
    
    log('Build completed successfully');
  } catch (error) {
    log(`Error during build: ${error.message}`);
    process.exit(1);
  }
}

main(); 