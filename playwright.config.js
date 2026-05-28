// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  timeout: 60000,

  fullyParallel: false,

  retries: 0,

  workers: 1,

  reporter: 'html',

  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'Chrome',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

