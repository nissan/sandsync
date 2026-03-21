import { chromium } from '@playwright/test';

const browser = await chromium.launch();
const page = await browser.newPage();

console.log('Testing https://web-eta-black-15.vercel.app/showcase...');
await page.goto('https://web-eta-black-15.vercel.app/showcase', { timeout: 30000 });
await page.waitForTimeout(5000);

const loadedImgs = await page.locator('.grid img').evaluateAll(
  (imgs) => imgs.filter(img => img.naturalWidth > 0).length
);
console.log(`Images loaded (naturalWidth > 0): ${loadedImgs} / 8`);

if (loadedImgs > 0) {
  console.log('✅ IMAGES ARE LOADING!');
} else {
  console.log('❌ Images still not loading');
  
  // Debug: check what we see
  const srcs = await page.locator('.grid img').evaluateAll(
    (imgs) => imgs.map(img => ({
      src: img.src.slice(-60),
      complete: img.complete,
      width: img.naturalWidth,
      error: img.complete && img.naturalWidth === 0 ? 'FAILED' : 'OK'
    }))
  );
  console.log('Image status:', srcs.slice(0, 2));
}

await browser.close();
