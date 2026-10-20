import { defineConfig, devices } from '@playwright/test';
import { loadTestEnv } from '../visual/tools/load-test-env.js';

const env = loadTestEnv();
const PORT = Number(env.port) || 4173;
const SITE_DIR = env.site_dir || '../../site';
const viewport = (value, fallback) => {
  const m = /^(\d+)x(\d+)$/.exec(value || '');
  return m ? { width: Number(m[1]), height: Number(m[2]) } : fallback;
};

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
    locale: env.locale || 'es-CO',
    timezoneId: env.timezone || 'America/Bogota',
    deviceScaleFactor: 1,
    screenshot: 'off',
    trace: 'off',
    video: 'off',
  },
  projects: [
    {
      name: 'desktop-1448',
      use: { ...devices['Desktop Chrome'], viewport: viewport(env.viewport_desktop, { width: 1448, height: 1000 }) },
    },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: viewport(env.viewport_tablet, { width: 768, height: 1024 }) },
    },
    {
      name: 'mobile-375',
      use: { ...devices['Desktop Chrome'], viewport: viewport(env.viewport_mobile, { width: 375, height: 812 }) },
    },
  ],
  webServer: {
    command: `python3 -m http.server ${PORT} --directory ${SITE_DIR}`,
    url: `http://127.0.0.1:${PORT}`,
    reuseExistingServer: true,
    timeout: 15000,
  },
});
