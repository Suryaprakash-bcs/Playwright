import { defineConfig, devices } from '@playwright/test';
import  dotenv from 'dotenv';
import path from 'path';
// import path from 'path';
dotenv.config();
// dotenv.config({ path: path.resolve(__dirname, '../env/', 'variOne.env') });

// dotenv.config({
//   path: './env/.env.varFILE1',
// });


if (!process.env.NODE_ENV) {
  dotenv.config({ path: path.join(__dirname, 'src','.env') });
}
else {
  dotenv.config({ path: path.join(__dirname, 'src',`.env.${process.env.NODE_ENV}`) });
}
 

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const screenshotpath = process.env.Screenshot_path || './tests/screenshots';
const reportPath = process.env.report_path || './tests/reports';

export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    headless: false,
    // screenshot: 'on',
  },


  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
  outputDir:path.resolve(screenshotpath),
  reporter: [
    ['list'],
    // ['html', { outputFolder: 'playwright-report', open: 'never' }],
    // ['./Report.ts'],
    ['html', { outputFolder:reportPath }],
  ],

});