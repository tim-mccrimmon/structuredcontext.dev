// Quick script to generate OG image from HTML
// Run with: node generate-og-image.js
// Requires: npm install puppeteer

import puppeteer from 'puppeteer';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set viewport to exact OG image dimensions
  await page.setViewport({ width: 1200, height: 630 });

  // Load the HTML file
  const htmlPath = 'file://' + join(__dirname, 'og-image-generator.html');
  await page.goto(htmlPath, { waitUntil: 'networkidle0' });

  // Wait for fonts to load
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Find the og-image element and screenshot it
  const element = await page.$('.og-image');
  await element.screenshot({
    path: join(__dirname, 'public', 'og-image.png'),
    omitBackground: false
  });

  console.log('✅ OG image generated at public/og-image.png');

  await browser.close();
})();
