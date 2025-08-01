import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  reporter: [['list'], ['html', { open: 'never' }]],
  fullyParallel: true,
  use: {
    baseURL: 'https://markadvk.github.io/rapidtest/',
    browserName: 'chromium',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // Uncomment the following projects to enable cross-browser testing when needed:

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
