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
    await page.locator('.tarjeta-objetivo').first().click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');
    await expect(page.locator('.dialog')).toHaveClass(/uk-open/);
  });

  test('Escape cierra el diálogo', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.tarjeta-objetivo').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.locator('[role="dialog"]')).toBeHidden();
  });

  test('el backdrop cierra el diálogo (UIkit)', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.tarjeta-objetivo').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.locator('[role="dialog"]')).toBeHidden();
  });

  test('UIkit bloquea el scroll de la página con el diálogo abierto', async ({ page }) => {
    await page.goto('/index.html');
    await page.locator('.tarjeta-objetivo').first().click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    await expect
      .poll(() => page.evaluate(() => document.scrollingElement.style.overflowY))
      .toBe('clip');
    await page.locator('.dialog__close').click();
    await expect(page.locator('[role="dialog"]')).toBeHidden();
    await expect
      .poll(() => page.evaluate(() => document.scrollingElement.style.overflowY))
      .toBe('');
  });

  test('la card recorta el cuerpo a 3 líneas y el modal conserva el completo', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForFunction(() => window.VCI18n && !!window.VCI18n.getData());
    const card = page.locator('.tarjeta-objetivo').nth(1);
    await card.scrollIntoViewIfNeeded();
    const body = card.locator('p');

    const brevity = await body.evaluate((el) => {
      const cs = getComputedStyle(el);
      return {
        clamp: cs.webkitLineClamp,
        size: cs.fontSize,
        line: cs.lineHeight,
        height: el.getBoundingClientRect().height,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        text: el.textContent,
      };
    });
    expect(brevity.clamp).toBe('3');
    expect(brevity.size).toBe('16px');
    expect(brevity.line).toBe('24px');
    expect(Math.round(brevity.height)).toBe(72);
    expect(brevity.scrollHeight).toBeGreaterThan(brevity.clientHeight);

    await card.click();
    await expect(page.locator('[role="dialog"]')).toBeVisible();
    const modal = await page.evaluate(() => {
      const bodies = [...document.querySelectorAll('.dialog__body')];
      const cs = getComputedStyle(bodies[0]);
      return {
        size: cs.fontSize,
        line: cs.lineHeight,
        text: bodies.map((b) => b.textContent).join('\n'),
      };
    });
    expect(modal.size).toBe('18px');
    expect(modal.line).toBe('31px');
    expect(modal.text.length).toBeGreaterThanOrEqual(brevity.text.length);
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
      const els = [...document.querySelectorAll('.btn, .tarjeta-objetivo')].slice(0, 5);
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
      await expect(page.locator('.indice a')).toHaveCount(total);
      await expect(page.locator('.indice a[aria-current="true"]')).toHaveCount(0);
    });

    test(`${file}: marca el punto visible y sincroniza aria-current`, async ({ page }) => {
      await page.goto(`/${file}`);
      const links = page.locator('.indice a');

      await page.evaluate(() => document.getElementById('point-4').scrollIntoView());
      await expect(links.nth(3)).toHaveClass(/uk-active/);
      await expect(links.nth(3)).toHaveAttribute('aria-current', 'true');
      await expect(links).toHaveCount(total);
      await expect(links.nth(2)).not.toHaveAttribute('aria-current', 'true');

      await page.evaluate(() => document.getElementById('point-2').scrollIntoView());
      await expect(links.nth(1)).toHaveClass(/uk-active/);
      await expect(links.nth(3)).not.toHaveClass(/uk-active/);
      await expect(page.locator('.indice a[aria-current="true"]')).toHaveCount(1);
    });

    test(`${file}: el índice permanece visible mientras el texto se mueve`, async ({ page }) => {
      await page.goto(`/${file}`);
      await page.evaluate(() => document.getElementById('point-5').scrollIntoView());
      const box = await page.locator('.indice').boundingBox();
      // sticky: anclado bajo la nav (83) + 32 → 115
      expect(box.y).toBeGreaterThanOrEqual(100);
      expect(box.y).toBeLessThanOrEqual(130);
      const link = page.locator('.indice a.uk-active');
      await expect(link).toHaveAttribute('href', '#point-5');
      const lb = await link.boundingBox();
      expect(Math.round(lb.width)).toBe(290);
    });

    test(`${file}: el clic salta al punto por debajo de la nav sticky`, async ({ page }) => {
      await page.goto(`/${file}`);
      await page.locator('.indice a[href="#point-3"]').click();
      await expect(page).toHaveURL(/#point-3$/);
      await expect(page.locator('.indice a').nth(2)).toHaveAttribute('aria-current', 'true');
      await expect(page.locator('header.site-nav')).toHaveClass(/is-reduced/);
      const nav = await page.locator('header.site-nav').boundingBox();
      const title = await page.locator('#point-3 h3').boundingBox();
      expect(title.y).toBeGreaterThanOrEqual(nav.y + nav.height - 1);
    });
  }
});

test('menú sm/xs: abre y aria-expanded', async ({ page }, testInfo) => {
  test.skip(
    !['tablet-768', 'mobile-375'].includes(testInfo.project.name),
    'menú solo en sm/xs'
  );
  await page.goto('/index.html');
  const open = page.locator('.js-menu-open');
  await expect(open).toHaveAttribute('aria-expanded', 'false');
  await open.click();
  await expect(open).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-menu')).toBeVisible();
  await page.locator('.js-menu-close').click();
  await expect(open).toHaveAttribute('aria-expanded', 'false');
});

test('fondo de La Materia Prima: recorte horizontal por breakpoint', async ({ page }, testInfo) => {
  const expected = {
    'mobile-375': '404.747% 100%',
    'tablet-768': '188.119% 100%',
    'desktop-1448': 'cover',
  }[testInfo.project.name];

  await page.goto('/index.html');
  const styles = await page.locator('.articulos').evaluate((el) => {
    const cs = getComputedStyle(el);
    return { size: cs.backgroundSize, color: cs.backgroundColor };
  });

  expect(styles.size).toBe(expected);
  expect(styles.color).toBe('rgb(27, 44, 67)');
});

test.describe('transición entre páginas', () => {
  test('los enlaces locales se prerenderizan al pasar el cursor', async ({ page }) => {
    await page.goto('/index.html');
    const rules = await page.evaluate(() => {
      const el = document.querySelector('script[type="speculationrules"]');
      return el ? JSON.parse(el.textContent) : null;
    });
    expect(rules).not.toBeNull();
    expect(rules.prerender[0].eagerness).toBe('moderate');
    // Solo rutas del propio sitio y sin querystring: nada de externos.
    expect(rules.prerender[0].where.and[0].href_matches).toBe('/*');
    expect(JSON.stringify(rules.prerender[0].where)).toContain('not');
  });

  test('el fundido entre páginas está declarado y respeta reduced motion', async ({ page, request }) => {
    const css = await (await request.get('/styles/main.css')).text();
    expect(css).toContain('@view-transition');
    // El bloque va dentro de `prefers-reduced-motion: no-preference`, así que
    // con motion reducido la navegación es la de siempre.
    const guard = css.slice(css.indexOf('@media (prefers-reduced-motion: no-preference)'));
    expect(guard.slice(0, guard.indexOf('@view-transition'))).not.toBe('');
    expect(await page.evaluate(() => CSS.supports('view-transition-name: none'))).toBe(true);
  });

  test('navegar cambia de página y de URL', async ({ page }) => {
    await page.goto('/index.html');
    // Se sale por el footer: sus enlaces están visibles en los tres viewports
    // (los del nav solo desde 1448).
    await page.locator('.site-footer__links a[href="programa.html"]').click();
    await page.waitForURL('**/programa.html');
    await expect(page.locator('h1')).toContainText('principios fundamentales');
    await expect(page.locator('.site-nav__link.is-current')).toHaveAttribute('href', 'programa.html');
  });

  // El arnés corre con `reducedMotion: reduce`, así que el fundido está apagado
  // por defecto; estos dos casos lo encienden y lo apagan a propósito.
  const recordTransition = async (page, motion) => {
    await page.emulateMedia({ reducedMotion: motion });
    await page.addInitScript(() => {
      window.addEventListener('pageswap', (event) => {
        sessionStorage.setItem('vt', event.viewTransition ? 'si' : 'no');
      });
    });
    await page.goto('/index.html');
    await page.evaluate(() => {
      window.location.href = 'programa.html';
    });
    await page.waitForURL('**/programa.html');
    return page.evaluate(() => sessionStorage.getItem('vt'));
  };

  test('la navegación crea una view transition entre documentos', async ({ page }) => {
    expect(await recordTransition(page, 'no-preference')).toBe('si');
  });

  test('con motion reducido no hay transición', async ({ page }) => {
    expect(await recordTransition(page, 'reduce')).toBe('no');
  });
});
