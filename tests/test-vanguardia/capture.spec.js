import path from 'node:path';
import { test, expect } from '@playwright/test';

const OUT = path.join(__dirname, 'actual');

const PAGES = [
  { url: '/index.html', slug: 'inicio' },
  { url: '/programa.html', slug: 'programa' },
  { url: '/decalogo.html', slug: 'decalogo' },
  { url: '/unete.html', slug: 'unete' },
  { url: '/politica-de-privacidad.html', slug: 'politica-de-privacidad' },
];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
}

// La nav es sticky y nav.js añade .is-reduced al hacer scroll: la barra baja
// de 160 a 83 px y el contenido sube 77 px. Si se captura antes de que termine
// esa transición, el recorte sale 77 px por debajo (par inválido). Por eso se
// scrollea, se espera la transición (0.3 s) y se captura después.
async function shotCard(page, selector, name) {
  const card = page.locator(selector).first();
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await settle(page);
  await card.screenshot({
    path: path.join(OUT, name),
    animations: 'disabled',
    caret: 'hide',
  });
}

for (const { url, slug } of PAGES) {
  test(`página ${slug} fullPage`, async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto(url);
    await settle(page);
    await page.screenshot({
      path: path.join(OUT, `${slug}-${width}.png`),
      fullPage: true,
      animations: 'disabled',
      caret: 'hide',
    });
  });
}

test.describe('componentes y estados', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1448', 'componentes solo en desktop');
  });

  test('nav (par: baseline/nav.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('header.site-nav').screenshot({
      path: path.join(OUT, 'nav.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('goal-card default (par: baseline/goal-card.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await shotCard(page, '.goals__grid > .goal-card:not(.is-active)', 'goal-card.png');
  });

  test('goal-card is-active (evidencia, sin par)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await shotCard(page, '.goals__grid > .goal-card.is-active', 'goal-card-is-active.png');
  });

  test('buttons-s dark (par: baseline/buttons-s.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('header .btn--dark.btn--s').first().screenshot({
      path: path.join(OUT, 'buttons-s.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m primary (par: baseline/buttons-m.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('.btn--primary.btn--m').first().screenshot({
      path: path.join(OUT, 'buttons-m.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m hover (evidencia, sin par)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    const btn = page.locator('.btn--primary.btn--m').first();
    await btn.hover();
    await page.waitForTimeout(350);
    await btn.screenshot({
      path: path.join(OUT, 'buttons-m-hover.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m focus-visible (evidencia, sin par)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    const btn = page.locator('.btn--primary.btn--m').first();
    await btn.focus();
    await btn.screenshot({
      path: path.join(OUT, 'buttons-m-focus.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('objetivo-modal abierto (par: baseline/objetivo-modal-1448.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('.goal-card').first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await settle(page);
    await page.locator('.dialog__panel').screenshot({
      path: path.join(OUT, 'objetivo-modal-1448.png'),
      animations: 'disabled',
      caret: 'hide',
    });
  });
});
