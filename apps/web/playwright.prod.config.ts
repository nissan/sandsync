import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: false,
  forbidOnly: false,
  retries: 0,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "https://web-eta-black-15.vercel.app",
    trace: "off",
    video: "off",
    actionTimeout: 30_000,
    navigationTimeout: 90_000, // Increased navigation timeout for potentially slow page loads
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  // Explicitly disable webServer for production tests
  webServer: undefined, // Or null/false depending on Playwright version
  // Increase test timeout to accommodate longer pipeline runs
  timeout: 360_000, // Global test timeout: 6 minutes (2min pipeline + buffer)
