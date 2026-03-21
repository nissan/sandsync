import { chromium } from '@playwright/test';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('https://web-eta-black-15.vercel.app/showcase', { timeout: 30000 });
await page.waitForTimeout(6000);

// Try various selectors
const grid = await page.locator('[class*="grid"]').count();
console.log(`[class*="grid"] count: ${grid}`);

const gridDirect = await page.locator('div.grid').count();
console.log(`div.grid count: ${gridDirect}`);

// Check all divs with grid in class
const all = await page.locator('[class*="grid"] > div').count();
console.log(`[class*="grid"] > div count: ${all}`);

// Cards have cursor-pointer
const cards = await page.locator('[class*="cursor-pointer"]').count();
console.log(`cursor-pointer elements: ${cards}`);

// h3 titles
const titles = await page.locator('h3').count();
console.log(`h3 elements: ${titles}`);
if (titles > 0) {
  console.log(`First h3: ${await page.locator('h3').first().textContent()}`);
}

// Images
const imgs = await page.locator('img').count();
console.log(`Total imgs: ${imgs}`);
const loaded = await page.locator('img').evaluateAll(imgs => imgs.filter(i => i.naturalWidth > 0).length);
console.log(`Loaded imgs: ${loaded}`);

await browser.close();
