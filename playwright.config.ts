import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
  ],
  fullyParallel: true,
  use: {
    baseURL: 'https://markadvk.github.io/verifykoders/demos/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
