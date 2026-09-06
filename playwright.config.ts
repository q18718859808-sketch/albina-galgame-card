import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  // The local Krea2 preview builder intentionally uses one guarded staging root.
  // Keep desktop/mobile review runs deterministic instead of racing a shared build.
  workers: 1,
  retries: 0,
  reporter: 'list',
  outputDir: process.env.PLAYWRIGHT_OUTPUT_DIR ?? 'test-results',
  use: { baseURL: 'http://127.0.0.1:4174', trace: 'retain-on-failure', ...(!process.env.CI ? { channel: 'chrome' as const } : {}) },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
  webServer: {
    command: 'node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 4174',
    url: 'http://127.0.0.1:4174',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
