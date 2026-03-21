import { test, expect, Page } from "@playwright/test";

// Test real story ID for regression tests
const STORY_ID = "00aa7659-aae7-466e-aeaa-94d67167c240";

test.describe("Regression: Story Reader — AGENT_COLORS undefined crash", () => {
  test("navigates to story page and does not crash with undefined agent", async ({
    page,
  }) => {
    let pageErrors: string[] = [];

    // Listen for uncaught JS errors
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    // Navigate to the story page
    await page.goto(`/stories/${STORY_ID}`, { waitUntil: "domcontentloaded" });

    // Wait a bit for content to load
    await page.waitForTimeout(2000);

    // Assert no pageerrors were captured
    expect(
      pageErrors.filter(
        (e) => !e.includes("React") && !e.includes("DevTools")
      ).length
    ).toBe(0);

    // Assert body has content (not blank)
    const bodyText = await page.innerText("body");
    expect(bodyText.length).toBeGreaterThan(50);

    // Assert either story content OR "Story not found" message (both are fine — no crash)
    const hasContent =
      (await page
        .locator("h1, h2, h3, [role='heading']")
        .first()
        .isVisible()
        .catch(() => false)) ||
      (await page.getByText(/Story not found/i).isVisible().catch(() => false));
    expect(hasContent).toBe(true);
  });
});

test.describe("Regression: Story Reader — API fallback when PowerSync offline", () => {
  test("loads story content via API when WebSocket is blocked", async ({
    page,
  }) => {
    // Block WebSocket connections by intercepting them
    await page.route("**/*", (route) => {
      const url = route.request().url();
      if (url.includes("ws") || url.startsWith("ws://") || url.startsWith("wss://")) {
        // Return 503 to simulate offline
        route.abort("blockedbyclient");
      } else {
        route.continue();
      }
    });

    let pageErrors: string[] = [];
    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    // Navigate to story page
    await page.goto(`/stories/${STORY_ID}`, { waitUntil: "domcontentloaded" });

    // Wait 3+ seconds for API fetch to complete
    await page.waitForTimeout(3000);

    // Assert body has meaningful text content
    const bodyText = await page.innerText("body");
    expect(bodyText.length).toBeGreaterThan(100);

    // Assert no critical pageerrors
    const criticalErrors = pageErrors.filter(
      (e) => !e.includes("WebSocket") && !e.includes("ws://")
    );
    expect(criticalErrors.length).toBe(0);
  });
});

test.describe("Regression: Slides page renders and video overlay works", () => {
  test("loads /slides, shows content, and video overlay opens on button click", async ({
    page,
  }) => {
    await page.goto("/slides", { waitUntil: "domcontentloaded" });

    // Assert page has content (some slide text visible)
    const pageContent = await page.innerText("body");
    expect(pageContent.length).toBeGreaterThan(50);

    // Assert "Watch Presentation" button is visible
    const watchButton = page.getByRole("button", {
      name: /Watch Presentation/i,
    });
    await expect(watchButton).toBeVisible({ timeout: 5000 }).catch(() => {
      // If button not found by role, try by text
      return expect(
        page.getByText(/Watch Presentation/i)
      ).toBeVisible({ timeout: 5000 });
    });

    // Click the button
    try {
      await watchButton.click();
    } catch {
      // Fallback: click by text
      await page.getByText(/Watch Presentation/i).click();
    }

    // Wait a bit for overlay to appear
    await page.waitForTimeout(1000);

    // Assert video element or overlay is now visible
    const videoVisible = await page
      .locator("video, iframe[src*='youtube'], iframe[src*='vimeo'], [role='dialog']")
      .first()
      .isVisible()
      .catch(() => false);

    expect(videoVisible).toBe(true);
  });
});

test.describe("Regression: Home page — no JS errors on load", () => {
  test("navigates to home page without uncaught JS errors", async ({
    page,
  }) => {
    let pageErrors: string[] = [];

    page.on("pageerror", (error) => {
      pageErrors.push(error.message);
    });

    await page.goto("/", { waitUntil: "domcontentloaded" });

    // Wait for page to load and have content
    await page.waitForTimeout(2000);

    // Assert page has content loaded (body not empty)
    const bodyText = await page.innerText("body");
    expect(bodyText.length).toBeGreaterThan(50);

    // Filter out React DevTools and known non-critical warnings
    const criticalErrors = pageErrors.filter(
      (e) =>
        !e.includes("React") &&
        !e.includes("DevTools") &&
        !e.includes("React Developer Tools") &&
        !e.includes("Extension context invalidated") &&
        e.trim().length > 0
    );

    expect(criticalErrors.length).toBe(0);
  });
});

test.describe("Regression: Story reader — chapter images render without broken URLs", () => {
  test("loads story and verifies chapter images have valid src attributes", async ({
    page,
  }) => {
    // Allow up to 8 seconds for content
    await page.goto(`/stories/${STORY_ID}`, {
      waitUntil: "domcontentloaded",
    });

    // Wait for images to load (or fail to load)
    await page.waitForTimeout(3000);

    // Find all img elements
    const images = await page.locator("img").all();

    // If images exist, verify none have empty/broken src
    if (images.length > 0) {
      for (const img of images) {
        const src = await img.getAttribute("src");
        // Assert src is not empty, not undefined, not obviously broken
        expect(src).not.toBe("");
        expect(src).not.toBeNull();
        // Avoid simple "about:blank" or data URIs that are placeholders
        if (src && src.startsWith("http")) {
          // Real URL — we don't check HTTP 200 here, just that it's a real URL
          expect(src).toMatch(/^https?:\/\/[^\s]+/);
        }
      }
    }

    // Assert page has content (story loaded or "not found")
    const bodyText = await page.innerText("body");
    expect(bodyText.length).toBeGreaterThan(50);
  });
});
