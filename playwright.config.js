import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './framework/tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  timeout: 60000,
  reporter: [
    ['html', { outputFolder: './framework/data/reports' }],
    ['junit', { outputFile: './framework/data/reports/junit-report.xml' }],
    ['json', { outputFile: './framework/data/reports/test-results.json' }],
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    timezoneId: 'Europe/Budapest',
    locale: 'hu-HU',
  },
  projects: [
    {
      name: 'regression',
      grep: /@regression/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'smoke',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});

