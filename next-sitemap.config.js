const fetch = require('node-fetch');

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://kaiperez.com', // Replace with your domain
  generateRobotsTxt: true,           // Generate a robots.txt file
  changefreq: 'daily',
  priority: 0.7,
  exclude: ['/admin/*'],             // Pages to exclude
  additionalPaths: async (config) => {
    const res = await fetch('https://kaiperez.com/api/posts'); // Replace with your API endpoint
    const posts = await res.json();

    return posts.map((post) => ({
      loc: `/projects/${post.slug}`,  // Adjust the path to match your dynamic route
      lastmod: post.updatedAt,   // Optional: Use a last modified date if available
    }));
  },
};
