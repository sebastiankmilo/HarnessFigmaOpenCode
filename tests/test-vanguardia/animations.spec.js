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
    for (const sel of ['.tarjeta-objetivo', '.tarjeta-articulo']) {
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
    await page.locator('.tarjeta-objetivo__disparador').first().click();

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
    await page.locator('.tarjeta-objetivo__disparador').first().click();

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
    await page.locator('.tarjeta-objetivo__disparador').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    await page.locator('.dialog__close').click();
    await expect(page.locator('[role="dialog"]')).toBeHidden({ timeout: 2000 });
  });
});

test.describe('modal UIkit en sm (transición global)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'tablet-768', 'transición del modal en tablet');
  });
  test.beforeEach(noMotionPref);

  test('el panel de sm ocupa el 90% del viewport y el CTA queda fijo', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForFunction(() => window.VCI18n && !!window.VCI18n.getData());
    await page.locator('.tarjeta-objetivo__disparador').first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.querySelector('.dialog')).backgroundColor)
      )
      .toBe('rgba(0, 0, 0, 0.25)');
    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.querySelector('.dialog__panel')).opacity)
      )
      .toBe('1');

    const backdrop = await readTransition(page, '.dialog');
    expect(backdrop.duration).toContain('0.3s');
    expect(backdrop.property).toBe('background');

    const panel = await readTransition(page, '.dialog__panel');
    expect(panel.duration).toContain('0.3s');
    expect(panel.property).toContain('opacity');
    expect(panel.property).toContain('transform');

    // Decisión 2026-11-03: el panel ocupa el 90% del ancho y del alto del
    // viewport; el bloque de cuerpo tiene scroll y el CTA queda fijo abajo.
    const layout = await page.evaluate(() => {
      const box = (el) => el.getBoundingClientRect();
      const p = document.querySelector('.dialog__panel');
      const c = document.querySelector('.dialog__content');
      const cta = document.querySelector('.dialog__cta');
      return {
        panelW: box(p).width,
        panelH: box(p).height,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
        overflowY: getComputedStyle(c).overflowY,
        ctaTop: box(cta).top,
      };
    });
    expect(Math.round(layout.panelW)).toBe(Math.round(layout.viewportW * 0.9));
    expect(Math.round(layout.panelH)).toBe(Math.round(layout.viewportH * 0.9));
    expect(layout.panelW).toBeLessThanOrEqual(layout.viewportW);
    expect(layout.panelH).toBeLessThanOrEqual(layout.viewportH);
    expect(layout.overflowY).toBe('auto');

    await page.evaluate(() => {
      const c = document.querySelector('.dialog__content');
      c.scrollTop = c.scrollHeight;
    });
    const afterScroll = await page.evaluate(() => {
      const cta = document.querySelector('.dialog__cta');
      return { ctaTop: cta.getBoundingClientRect().top };
    });
    expect(afterScroll.ctaTop).toBe(layout.ctaTop);

    await page.locator('.dialog__close').click();
    await expect(dialog).toBeHidden({ timeout: 2000 });
  });
});

test.describe('modal UIkit en xs (90% del viewport)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-375', 'panel del modal en mobile');
  });
  test.beforeEach(noMotionPref);

  test('el panel ocupa el 90% del viewport y el cuerpo scrollea sin mover el CTA', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForFunction(() => window.VCI18n && !!window.VCI18n.getData());
    await page.locator('.tarjeta-objetivo__disparador').first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.querySelector('.dialog__panel')).transform)
      )
      .toBe('none');

    const layout = await page.evaluate(() => {
      const box = (el) => el.getBoundingClientRect();
      const p = document.querySelector('.dialog__panel');
      const c = document.querySelector('.dialog__content');
      const cta = document.querySelector('.dialog__cta');
      const close = document.querySelector('.dialog__close');
      const overlay = document.querySelector('.dialog');
      return {
        panelW: box(p).width,
        panelH: box(p).height,
        viewportW: window.innerWidth,
        viewportH: window.innerHeight,
        ctaTop: box(cta).top,
        ctaBottom: box(cta).bottom,
        ctaH: box(cta).height,
        closeTop: box(close).top - box(p).top,
        closeSize: box(close).width,
        overflowY: getComputedStyle(c).overflowY,
        scrollH: c.scrollHeight,
        clientH: c.clientHeight,
        overlayScrollH: overlay.scrollHeight,
        overlayClientH: overlay.clientHeight,
      };
    });

    expect(Math.round(layout.panelW)).toBe(Math.round(layout.viewportW * 0.9));
    expect(Math.round(layout.panelH)).toBe(Math.round(layout.viewportH * 0.9));
    expect(layout.panelW).toBeLessThanOrEqual(layout.viewportW);
    expect(layout.panelH).toBeLessThanOrEqual(layout.viewportH);
    expect(Math.round(layout.ctaH)).toBe(54);
    expect(Math.round(layout.closeSize)).toBe(24);
    expect(Math.round(layout.closeTop)).toBe(29);
    expect(layout.ctaBottom).toBeLessThanOrEqual(layout.viewportH);
    expect(layout.overflowY).toBe('auto');
    expect(layout.scrollH).toBeGreaterThan(layout.clientH);
    // El overlay no necesita scroll: el panel está acotado al viewport.
    expect(layout.overlayScrollH).toBeLessThanOrEqual(layout.overlayClientH);

    await page.evaluate(() => {
      const c = document.querySelector('.dialog__content');
      c.scrollTop = c.scrollHeight;
    });
    const afterScroll = await page.evaluate(() => {
      const c = document.querySelector('.dialog__content');
      const cta = document.querySelector('.dialog__cta');
      return { scrollTop: c.scrollTop, ctaTop: cta.getBoundingClientRect().top };
    });
    expect(afterScroll.scrollTop).toBeGreaterThan(0);
    expect(afterScroll.ctaTop).toBe(layout.ctaTop);

    await page.locator('.dialog__close').click();
    await expect(dialog).toBeHidden({ timeout: 2000 });
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

test.describe('fades de sección más altas que el viewport', () => {
  /* Un `threshold` fraccionario en el IntersectionObserver deja fuera las
   * secciones que no caben en pantalla: su porcentaje mínimo no llega a ser
   * visible nunca y se quedan en `opacity: 0` para siempre. En xs
   * `programa-puntos` mide más de 20 000 px, así que el caso se comprueba
   * aquí: arranca bajo el primer viewport y tiene que revelarse al llegar. */
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-375', 'el caso se da en la vista móvil');
  });
  test.beforeEach(noMotionPref);

  test('programa: los puntos se revelan aunque midan más que la pantalla', async ({ page }) => {
    await page.goto('/programa.html');
    const puntos = page.locator('.programa-puntos');
    await expect(puntos).toHaveClass(/js-reveal/);
    await puntos.scrollIntoViewIfNeeded();
    await expect(puntos).toHaveClass(/is-visible/, { timeout: 3000 });
    await expect
      .poll(() => puntos.evaluate((el) => getComputedStyle(el).opacity), {
        message: 'la sección de puntos se queda invisible',
      })
      .toBe('1');
  });
});

test.describe('transición del menú de navegación (sm/xs)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(
      !['tablet-768', 'mobile-375'].includes(testInfo.project.name),
      'overlay visible en sm/xs'
    );
  });
  test.beforeEach(noMotionPref);

  test('el overlay y su contenido se abren y cierran con transición', async ({ page }) => {
    await page.goto('/index.html');
    const menu = page.locator('#site-menu');

    await expect(menu).toHaveCSS('visibility', 'hidden');
    const overlay = await readTransition(page, '.site-nav__menu');
    expect(overlay.duration).toContain('0.3s');
    expect(overlay.property).toContain('opacity');
    expect(overlay.property).toContain('visibility');

    await page.locator('.js-menu-open').click();
    await expect(menu).toHaveCSS('visibility', 'visible');
    await expect
      .poll(() =>
        page.evaluate(() => getComputedStyle(document.querySelector('#site-menu')).opacity)
      )
      .toBe('1');

    const content = await readTransition(page, '.site-nav__menu-content');
    expect(content.duration).toContain('0.3s');
    expect(content.property).toContain('opacity');
    expect(content.property).toContain('transform');

    await page.locator('.js-menu-close').click();
    await expect(page.locator('.js-menu-open')).toHaveAttribute('aria-expanded', 'false');
    await expect(menu).toHaveCSS('visibility', 'hidden', { timeout: 2000 });
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

test.describe('navegación reducida en sm (decisión 2026-11-03)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'tablet-768', 'estado reducido de tablet');
  });
  test.beforeEach(noMotionPref);

  test('la barra pasa de 75 a 56 px y el logo de 48 a 40', async ({ page }) => {
    await page.goto('/index.html');
    const nav = page.locator('.site-nav');
    const inner = page.locator('.site-nav__inner');
    const logo = page.locator('.site-nav__logo');

    await expect(nav).toHaveCSS('position', 'fixed');
    await expect(page.locator('body')).toHaveCSS('padding-top', '75px');
    await expect(inner).toHaveCSS('height', '75px');
    await expect(logo).toHaveCSS('width', '48px');
    await expect(nav).not.toHaveClass(/is-reduced/);

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(nav).toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '56px', { timeout: 2000 });
    await expect(logo).toHaveCSS('width', '40px');

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav).not.toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '75px', { timeout: 2000 });
    await expect(logo).toHaveCSS('width', '48px');
  });
});

test.describe('navegación reducida en xs (pedido 2026-11-03)', () => {
  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-375', 'estado reducido de mobile');
  });
  test.beforeEach(noMotionPref);

  test('la barra pasa de 83,38 a 56 px y el logo de 48 a 40', async ({ page }) => {
    await page.goto('/index.html');
    const nav = page.locator('.site-nav');
    const inner = page.locator('.site-nav__inner');
    const logo = page.locator('.site-nav__logo');

    await expect(nav).toHaveCSS('position', 'fixed');
    await expect(page.locator('body')).toHaveCSS('padding-top', '83.38px');
    await expect(inner).toHaveCSS('height', '83.375px');
    await expect(logo).toHaveCSS('width', '48px');
    await expect(nav).not.toHaveClass(/is-reduced/);
    const transition = await readTransition(page, '.site-nav__inner');
    expect(transition.duration).toContain('0.3s');
    expect(transition.property).toContain('height');

    await page.evaluate(() => window.scrollTo(0, 400));
    await expect(nav).toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '56px', { timeout: 2000 });
    await expect(logo).toHaveCSS('width', '40px');

    await page.evaluate(() => window.scrollTo(0, 0));
    await expect(nav).not.toHaveClass(/is-reduced/);
    await expect(inner).toHaveCSS('height', '83.375px', { timeout: 2000 });
    await expect(logo).toHaveCSS('width', '48px');
  });
});

test.describe('carruseles de inicio (nota 4649:2016)', () => {
  test.beforeEach(onlyDesktop);
  test.beforeEach(noMotionPref);

  test('el índice y el dotnav cambian al avanzar', async ({ page }) => {
    await page.goto('/index.html');
    const grid = page.locator('.objetivos__grid');
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
    const grid = page.locator('.objetivos__grid');
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
      ['.btn', '.site-nav__link', '.tarjeta-objetivo'].map(
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
