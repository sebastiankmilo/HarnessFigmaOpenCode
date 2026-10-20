import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
  testDir: '.',
  outputDir: 'reports/test-results',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: 'never' }],
    ['json', { outputFile: 'reports/results.json' }],
  ],
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    reducedMotion: 'reduce',
    colorScheme: 'light',
    locale: 'es-CO',
    timezoneId: 'America/Bogota',
    deviceScaleFactor: 1,
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },
  projects: [
    {
      name: 'desktop-1448',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1448, height: 1000 } },
    },
    {
      name: 'mobile-375',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 812 } },
    },
  ],
  webServer: {
    command: `python3 -m http.server ${PORT} --directory ../../site`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
