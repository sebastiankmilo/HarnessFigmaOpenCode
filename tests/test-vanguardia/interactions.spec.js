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

test.describe('scrollspy del índice de puntos (UIkit)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'desktop-1448', 'el índice lateral solo existe en 1448');
  });

  const PAGES = [
    ['programa.html', 9],
    ['decalogo.html', 10],
  ];

  for (const [file, total] of PAGES) {
    test(`${file}: UIkit Scrollspy Nav está cargado`, async ({ page }) => {
      await page.goto(`/${file}`);
      expect(
        await page.evaluate(() => typeof window.UIkit?.scrollspyNav),
      ).toBe('function');
      await expect(page.locator('.page-index a')).toHaveCount(total);
      await expect(page.locator('.page-index a[aria-current="true"]')).toHaveCount(0);
    });

    test(`${file}: marca el punto visible y sincroniza aria-current`, async ({ page }) => {
      await page.goto(`/${file}`);
      const links = page.locator('.page-index a');

      await page.evaluate(() => document.getElementById('point-4').scrollIntoView());
      await expect(links.nth(3)).toHaveClass(/uk-active/);
      await expect(links.nth(3)).toHaveAttribute('aria-current', 'true');
      await expect(links).toHaveCount(total);
      await expect(links.nth(2)).not.toHaveAttribute('aria-current', 'true');

      await page.evaluate(() => document.getElementById('point-2').scrollIntoView());
      await expect(links.nth(1)).toHaveClass(/uk-active/);
      await expect(links.nth(3)).not.toHaveClass(/uk-active/);
      await expect(page.locator('.page-index a[aria-current="true"]')).toHaveCount(1);
    });

    test(`${file}: el índice permanece visible mientras el texto se mueve`, async ({ page }) => {
      await page.goto(`/${file}`);
      await page.evaluate(() => document.getElementById('point-5').scrollIntoView());
      const box = await page.locator('.page-index').boundingBox();
      // sticky: anclado bajo la nav (83) + 32 → 115
      expect(box.y).toBeGreaterThanOrEqual(100);
      expect(box.y).toBeLessThanOrEqual(130);
      const link = page.locator('.page-index a.uk-active');
      await expect(link).toHaveAttribute('href', '#point-5');
      const lb = await link.boundingBox();
      expect(Math.round(lb.width)).toBe(290);
    });

    test(`${file}: el clic salta al punto por debajo de la nav sticky`, async ({ page }) => {
      await page.goto(`/${file}`);
      await page.locator('.page-index a[href="#point-3"]').click();
      await expect(page).toHaveURL(/#point-3$/);
      await expect(page.locator('.page-index a').nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(page.locator('header.site-nav')).toHaveClass(/is-reduced/);
      const nav = await page.locator('header.site-nav').boundingBox();
      const title = await page.locator('#point-3 h3').boundingBox();
      expect(title.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1);
    });
  }
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
