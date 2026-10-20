import { test, expect } from '@playwright/test';

test.describe('navegación interna (lo que la visión no verifica)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1448', 'links desktop solo en desktop');
  });

  const NAV_LINKS = [
    ['Programa', 'programa.html'],
    ['Decálogo', 'decalogo.html'],
    ['Únete', 'unete.html'],
  ];

  for (const [label, file] of NAV_LINKS) {
    test(`nav → ${label}`, async ({ page }) => {
      await page.goto('/index.html');
      await page.locator(`header .site-nav__inner a[href="${file}"]`).click();
      await expect(page).toHaveURL(new RegExp(file.replace('.', '\\.')));
    });
  }

  test('footer → Política de privacidad', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator(`footer a[href="politica-de-privacidad.html"]`).click();
    await expect(page).toHaveURL(/politica-de-privacidad\.html/);
  });

  test('footer → Programa', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator(`footer a[href="programa.html"]`).click();
    await expect(page).toHaveURL(/programa\.html/);
  });
});

test.describe('diálogo de objetivos', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1448', 'diálogo solo en desktop');
  });

  test('goal-card abre el diálogo', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.goal-card').first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-hidden', 'false');
  });

  test('Escape cierra el diálogo', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.goal-card').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).toBeHidden();
  });
});

test.describe('accesibilidad de interacción', () => {
  test('foco visible con teclado (:focus-visible)', async ({ page }) => {
    await page.goto('/index.html');
    await page.keyboard.press('Tab');
    const outline = await page.evaluate(() => {
      const el = document.activeElement;
      const s = getComputedStyle(el);
      return { style: s.outlineStyle, width: s.outlineWidth, tag: el.tagName };
    });
    expect(outline.style).not.toBe('none');
    expect(parseFloat(outline.width)).toBeGreaterThan(0);
  });

  test('prefers-reduced-motion anula transiciones', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    const durations = await page.evaluate(() => {
      const els = [...document.querySelectorAll('.btn, .goal-card')].slice(0, 5);
      return els.map((el) => parseFloat(getComputedStyle(el).transitionDuration));
    });
    for (const d of durations) expect(d).toBeLessThan(0.01);
  });
});

test('menú móvil: abre y aria-expanded', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile-375', 'menú móvil solo en 375');
  await page.goto('/index.html');
  const open = page.locator('.site-nav__menu-open');
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await open.click();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-menu')).toBeVisible();
  await page.locator('.site-nav__menu-close').click();
  await expect(open).toHaveAttribute('aria-expanded', 'false');
});
