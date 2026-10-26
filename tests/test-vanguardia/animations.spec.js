import { test, expect } from '@playwright/test';

/* Animaciones y transiciones — especificación:
 *   Especificaciones/design specs/interactions.md §Animaciones y transiciones
 *   Notas TEXT de Figma `4649:2012`, `4649:2014`, `4649:2016`, `4649:2017`,
 *   `4649:2018` y frame `navegación-reducida` `4518:1968`.
 *
 * La visión NO puede evaluar esto (son PNG sin eje temporal): es el único
 * punto donde el arnés mide tiempo, easing y orden.
 *
 * OJO: `playwright.config.js` fija `reducedMotion: 'reduce'`, que anula todas
 * las transiciones. Los tests que miden duración lo desactivan primero con
 * `emulateMedia({ reducedMotion: 'no-preference' })`.
 */

const DESKTOP = 'desktop-1448';

const onlyDesktop = async ({}, testInfo) => {
  test.skip(testInfo.project.name !== DESKTOP, 'animaciones medidas en 1448');
};

const noMotionPref = async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
};

/** Devuelve { duration, timing, property } como texto calculado. */
const readTransition = (page, selector) =>
  page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return null;
    const s = getComputedStyle(el);
    return {
      duration: s.transitionDuration,
      timing: s.transitionTimingFunction,
      property: s.transitionProperty,
      exists: true,
    };
  }, selector);

test.describe('transiciones de hover (nota 4649:2012)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  test('botones y enlaces: transition: all 0.4s ease', async ({ page }) => {
    await page.goto('/index.html');
    for (const sel of ['.btn--primary', '.site-nav__link', '.site-footer__links a']) {
      const t = await readTransition(page, sel);
      expect(t, `no existe ${sel}`).not.toBeNull();
      expect(t.duration, `${sel} duration`).toContain('0.4s');
      expect(t.timing, `${sel} timing`).toContain('ease');
      expect(t.property, `${sel} property`).toBe('all');
    }
  });

  test('goal-card y article-card: background 0.4s ease', async ({ page }) => {
    await page.goto('/index.html');
    for (const sel of ['.goal-card', '.article-card']) {
      const t = await readTransition(page, sel);
      expect(t, `no existe ${sel}`).not.toBeNull();
      expect(t.duration, `${sel} duration`).toContain('0.4s');
      expect(t.timing, `${sel} timing`).toContain('ease');
      expect(t.property, `${sel} property`).toContain('background');
    }
  });
});

test.describe('smooth scroll en Programa y Decálogo (nota 4649:2014)', () => {
  test.beforeEach(onlyDesktop);
  // bajo reducedMotion el CSS fuerza `scroll-behavior: auto`
  test.beforeEach(noMotionPref);

  for (const page_ of ['programa.html', 'decalogo.html']) {
    test(`${page_}: html.has-smooth-scroll → scroll-behavior smooth`, async ({ page }) => {
      await page.goto(`/${page_}`);
      const behavior = await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior
      );
      expect(behavior).toBe('smooth');
    });
  }

  test('inicio no lleva smooth scroll', async ({ page }) => {
    await page.goto('/index.html');
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(behavior).not.toBe('smooth');
  });
});

test.describe('modal estilo UIkit (nota 4649:2017)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  test('backdrop rgba(0,0,0,0.25) con fade de 0,3 s', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.goal-card').first().click();

    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await expect
      .poll(
        () =>
          page.evaluate(() => getComputedStyle(document.querySelector('.dialog')).backgroundColor),
        { message: 'backdrop no llega a rgba(0,0,0,0.25)' }
      )
      .toBe('rgba(0, 0, 0, 0.25)');

    const t = await readTransition(page, '.dialog');
    expect(t.duration).toContain('0.3s');
    expect(t.timing).toContain('ease');
    expect(t.property).toBe('background');
  });

  test('panel: opacity 0 → 1 con fade de 0,3 s', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.goal-card').first().click();

    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.querySelector('.dialog__panel')).opacity)
      )
      .toBe('1');

    const t = await readTransition(page, '.dialog__panel');
    expect(t.duration).toContain('0.3s');
    expect(t.property).toContain('opacity');
    expect(t.property).toContain('transform');
  });

  test('el backdrop vuelve a transparente al cerrar', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.goal-card').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await page.locator('.dialog__close').click();
    await expect(page.locator('[role="dialog"]')).toBeHidden({ timeout: 2000 });
  });
});

test.describe('fades de sección (nota 4649:2018)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  // `reveal.js` se carga en inicio, programa y decálogo.
  for (const url of ['/index.html', '/programa.html']) {
    test(`solo se anima lo que arranca bajo el primer viewport (${url})`, async ({ page }) => {
      await page.goto(url);
      await page.waitForFunction(() => document.querySelectorAll('main > section').length > 0);

      const info = await page.evaluate(() => {
        const sections = [...document.querySelectorAll('main > section')];
        const revealed = [...document.querySelectorAll('main > section.js-reveal')];
        return {
          total: sections.length,
          revealed: revealed.length,
          firstHasReveal: sections[0].classList.contains('js-reveal'),
          above: revealed.filter((s) => s.offsetTop < window.innerHeight).map((s) => s.className),
        };
      });

      expect(info.total).toBeGreaterThan(1);
      expect(info.revealed).toBeGreaterThan(0);
      expect(info.firstHasReveal, 'el hero no se anima (above the fold)').toBe(false);
      expect(info.above, 'ninguna sección visible al cargar lleva js-reveal').toEqual([]);
    });

    test(`la sección revelada obtiene .is-visible (${url})`, async ({ page }) => {
      await page.goto(url);
      const target = page.locator('main > section.js-reveal').first();
      await target.scrollIntoViewIfNeeded();
      await expect(target).toHaveClass(/is-visible/, { timeout: 3000 });
    });
  }

  test('bajo prefers-reduced-motion las secciones nacen visibles', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/programa.html');
    const opacities = await page.evaluate(() =>
      [...document.querySelectorAll('main > section.js-reveal')].map(
        (s) => getComputedStyle(s).opacity
      )
    );
    for (const o of opacities) expect(o).toBe('1');
  });
});

test.describe('navegación reducida (frame 4518:1968)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  test('la barra pasa de 160 a 83 px al hacer scroll', async ({ page }) => {
    await page.goto('/index.html');
    const nav = page.locator('.site-nav');
    const inner = page.locator('.site-nav__inner');

    await expect(inner).toHaveCSS('height', '160px');
    await expect(nav).not.toHaveClass(/is-reduced/);

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(nav).toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '83px', { timeout: 2000 });

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav).not.toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '160px', { timeout: 2000 });
  });
});

test.describe('carruseles de inicio (nota 4649:2016)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  test('el índice y el dotnav cambian al avanzar', async ({ page }) => {
    await page.goto('/index.html');
    const grid = page.locator('.goals__grid');
    const controls = page.locator('[data-carousel-controls="goals"]');

    await expect(grid.locator('> li').first()).toHaveClass(/is-active/);
    await expect(controls.locator('[data-carousel-dot="0"]')).toHaveClass(/is-active/);

    await controls.locator('[data-carousel-next]').click();

    await expect(grid.locator('> li').first()).not.toHaveClass(/is-active/);
    await expect(grid.locator('> li').nth(1)).toHaveClass(/is-active/);
    // `is-next` apunta al siguiente del índice activo (1 → 2)
    await expect(grid.locator('> li').nth(2)).toHaveClass(/is-next/);
    await expect(grid.locator('> li').nth(1)).not.toHaveClass(/is-next/);
    await expect(controls.locator('[data-carousel-dot="0"]')).not.toHaveClass(/is-active/);
    await expect(controls.locator('[data-carousel-dot="1"]')).toHaveClass(/is-active/);
    await expect(controls.locator('[data-carousel-dot="1"]')).toHaveAttribute(
      'aria-current',
      'true'
    );
  });

  test('la ventana mantiene 4 tarjetas con 6 objetivos', async ({ page }) => {
    await page.goto('/index.html');
    const grid = page.locator('.goals__grid');
    const controls = page.locator('[data-carousel-controls="goals"]');

    await expect(grid.locator('> li')).toHaveCount(6);
    await expect(controls.locator('[data-carousel-dot]')).toHaveCount(6);
    // En `lg` solo caben 4: los dos últimos quedan fuera de la ventana.
    await expect(grid.locator('> li:not(.is-out)')).toHaveCount(4);
    await expect(grid.locator('> li.is-out')).toHaveCount(2);

    await controls.locator('[data-carousel-dot="5"]').click();

    // Ventana que arrastra el final y el principio: 6, 1, 2, 3.
    await expect(grid.locator('> li').nth(5)).not.toHaveClass(/is-out/);
    await expect(grid.locator('> li').nth(0)).not.toHaveClass(/is-out/);
    await expect(grid.locator('> li').nth(3)).toHaveClass(/is-out/);
    await expect(grid.locator('> li').nth(4)).toHaveClass(/is-out/);
    await expect(grid.locator('> li').nth(5)).toHaveCSS('order', '0');
    await expect(grid.locator('> li:not(.is-out)')).toHaveCount(4);
  });
});

test.describe('prefers-reduced-motion anula las animaciones', () => {
  test.beforeEach(onlyDesktop);

  test('transiciones a 0 y secciones visibles sin fade', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');

    const durations = await page.evaluate(() =>
      ['.btn', '.site-nav__link', '.goal-card'].map(
        (sel) => parseFloat(getComputedStyle(document.querySelector(sel)).transitionDuration)
      )
    );
    for (const d of durations) expect(d).toBeLessThan(0.01);

    const reveal = await page.evaluate(() => {
      const el = document.querySelector('main > section.js-reveal');
      if (!el) return null;
      const s = getComputedStyle(el);
      return { opacity: s.opacity, transition: s.transitionDuration };
    });
    if (reveal) {
      expect(parseFloat(reveal.transition)).toBeLessThan(0.01);
      expect(reveal.opacity).toBe('1');
    }
  });

  test('smooth scroll desactivado en Programa', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/programa.html');
    const behavior = await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior
    );
    expect(behavior).toBe('auto');
  });
});
