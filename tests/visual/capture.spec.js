import { test, expect } from '@playwright/test';

const PAGES = [
  { path: '/index.html', slug: 'inicio' },
  { path: '/programa.html', slug: 'programa' },
  { path: '/decalogo.html', slug: 'decalogo' },
  { path: '/unete.html', slug: 'unete' },
  { path: '/politica-de-privacidad.html', slug: 'politica-de-privacidad' },
];

async function settle(page) {
  await page.evaluate(() => document.fonts.ready);
}

for (const { path, slug } of PAGES) {
  test(`página ${slug} fullPage`, async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto(path);
    await settle(page);
    await page.screenshot({
      path: `actual/${slug}-${width}.png`,
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
      path: 'actual/nav.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('goal-card default (par: baseline/goal-card.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('.goal-card:not(.is-active)').first().screenshot({
      path: 'actual/goal-card.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('goal-card is-active (evidencia, sin par)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('.goal-card.is-active').first().screenshot({
      path: 'actual/goal-card-is-active.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-s dark (par: baseline/buttons-s.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('header .btn--dark.btn--s').first().screenshot({
      path: 'actual/buttons-s.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m primary (par: baseline/buttons-m.png)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.locator('.btn--primary.btn--m').first().screenshot({
      path: 'actual/buttons-m.png',
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
      path: 'actual/buttons-m-hover.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m focus-visible (evidencia, sin par)', async ({ page }) => {
    await page.goto('/index.html');
    await settle(page);
    await page.keyboard.press('Tab');
    const btn = page.locator('.btn--primary.btn--m').first();
    await btn.focus();
    await btn.screenshot({
      path: 'actual/buttons-m-focus.png',
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
      path: 'actual/objetivo-modal-1448.png',
      animations: 'disabled',
      caret: 'hide',
    });
  });
});

test('menú móvil abierto (evidencia, sin par)', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-375', 'menú móvil solo en 375');
  await page.goto('/index.html');
  await settle(page);
  await page.locator('.site-nav__menu-open').click();
  await expect(page.locator('.site-nav__menu-open')).toHaveAttribute('aria-expanded', 'true');
  await settle(page);
  await page.screenshot({
    path: 'actual/nav-menu-open-375.png',
    animations: 'disabled',
    caret: 'hide',
  });
});
