/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://recipe-ai.vercel.app',
  generateRobotsTxt: true, // Auto generate robots.txt
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
    ],
    additionalSitemaps: [
      'https://recipe-ai.vercel.app/sitemap-recipes.xml', // optional additional sitemap
    ],
  },
  exclude: ['/404'], // Exclude specific pages from sitemap
  // Add a transform function to customize each URL entry
  transform: async (config, path) => {
    // Custom priority based on path
    let priority = 0.7;
    if (path === '/') {
      priority = 1.0;
    } else if (path.startsWith('/recipes/')) {
      priority = 0.8;
    } else if (path === '/recipes') {
      priority = 0.9;
    }

    // Customize changefreq based on path
    let changefreq = 'weekly';
    if (path === '/') {
      changefreq = 'daily';
    } else if (path.startsWith('/recipes/')) {
      changefreq = 'monthly';
    }

    // Return the entry with custom data
    return {
      loc: path, // URL path
      changefreq: changefreq,
      priority: priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs || [],
    };
  },
  additionalPaths: async (config) => {
    // Add dynamic paths that can't be automatically discovered
    // This would be populated from your database in a real app
    const result = [];
    
    // For demo: manually add recipe paths
    const paths = [
      '/recipes/classic-spaghetti-carbonara',
      '/recipes/homemade-margherita-pizza',
      '/recipes/chocolate-chip-cookies',
    ];
    
    for (const path of paths) {
      result.push({
        loc: path,
        changefreq: 'monthly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      });
    }
    
    return result;
  },
}; 