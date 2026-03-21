from playwright.async_api import async_playwright
import asyncio

SLIDES_DIR = "/Users/loki/projects/sandsync/demo-video/slides"

async def screenshot_slides():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("https://sandsync.reddi.tech/slides")
        await page.wait_for_timeout(3000)  # wait for full load
        
        for i in range(14):
            path = f"{SLIDES_DIR}/slide_{i+1:02d}.png"
            await page.screenshot(path=path, full_page=False)
            print(f"  ✓ slide_{i+1:02d}.png")
            if i < 13:
                await page.keyboard.press("ArrowRight")
                await page.wait_for_timeout(800)
        
        await browser.close()
        print("Done!")

asyncio.run(screenshot_slides())
