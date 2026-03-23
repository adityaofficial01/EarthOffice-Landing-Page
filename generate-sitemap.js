// generate-sitemap.js
const fs = require('fs');
const path = require('path');
const { SitemapStream, streamToPromise } = require('sitemap');

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: 'https://www.supercar-connect.com' });

  // Define your routes here
  const links = [
    { url: '/', changefreq: 'daily', priority: 1.0 },
  ];

  // Write each link into the sitemap stream
  links.forEach(link => sitemap.write(link));
  sitemap.end();

  // Convert stream to a promise and write to file
  const data = await streamToPromise(sitemap);
  const filePath = path.resolve(__dirname, 'public', 'sitemap.xml');

  fs.writeFileSync(filePath, data.toString());
  console.log('✅ Sitemap generated at:', filePath);
}

// Execute the generator
generateSitemap().catch((err) => {
  console.error('❌ Error generating sitemap:', err);
});
