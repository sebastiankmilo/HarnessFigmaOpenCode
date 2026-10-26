import { test, expect } from '@playwright/test';

/* Hovers, enlaces configurables y diálogo por card — especificación:
 *   Especificaciones/design specs/interactions.md §Hovers (capa `hovers`)
 *   frame `hovers` `4518:2148` (pares default ↔ hover) y nota `4649:2013`.
 *
 * La visión no puede evaluar esto: los baselines se capturan sin puntero, así
 * que un hover roto pasa desapercibido para el juez. Estos tests miden el
 * color renderizado real (se muestrea el PNG de la captura por canvas). */

const ACENTO = '255,69,32,255'; // #ff4520

// La capa `hovers` vive en el bloque de 1448 y el selector ES/PT se oculta
// por debajo de ese ancho: en mobile-375 no hay nada que comprobar.
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1448', 'hovers y ES/PT definidos a 1448');
});

/** Muestrea un elemento tras hacerle hover y devuelve el recuento de píxeles
 *  de cada color, ya descompuesto el PNG por canvas (sin dependencias). */
async function coloresEnHover(page, locator) {
  await locator.first().scrollIntoViewIfNeeded();
  await locator.first().hover();
  await page.waitForTimeout(500);
  const box = await locator.first().boundingBox();
  const png = await page.screenshot({
    clip: { x: box.x - 1, y: box.y - 1, width: box.width + 2, height: box.height + 2 },
  });
  return page.evaluate(async (b64) => {
    const img = new Image();
    img.src = 'data:image/png;base64,' + b64;
    await img.decode();
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const counts = {};
    for (let i = 0; i < data.length; i += 4) {
      const key = data[i] + ',' + data[i + 1] + ',' + data[i + 2] + ',' + data[i + 3];
      counts[key] = (counts[key] || 0) + 1;
    }
    return counts;
  }, png.toString('base64'));
}

test.describe('hovers de la capa `hovers` (4518:2148)', () => {
  test('los iconos de redes se ponen #ff4520 (nav y footer)', async ({ page }) => {
    await page.goto('/index.html');

    const nav = await coloresEnHover(page, page.locator('.site-nav__platforms .is-desktop img'));
    expect(nav[ACENTO], 'icono del nav en rojo').toBeGreaterThan(100);

    await page.mouse.move(0, 0);
    const footer = await coloresEnHover(page, page.locator('.site-footer__platforms a img'));
    expect(footer[ACENTO], 'icono del footer en rojo').toBeGreaterThan(100);
  });

  test('el logo del footer es clicable y se pone rojo al hover', async ({ page }) => {
    await page.goto('/index.html');
    const link = page.locator('.site-footer__logo-link');
    await expect(link).toHaveAttribute('href', 'index.html');
    expect(await link.locator('img').count(), 'envuelve la imagen').toBe(1);

    const colores = await coloresEnHover(page, link);
    expect(colores[ACENTO]).toBeGreaterThan(1000);
  });

  test('los links del footer pasan a #ff4520 sin subrayado', async ({ page }) => {
    await page.goto('/index.html');
    const link = page.locator('.site-footer__links a').first();

    await page.mouse.move(0, 0);
    await link.hover();
    await page.waitForTimeout(500);
    await expect(link).toHaveCSS('color', 'rgb(255, 69, 32)');
    await expect(link).toHaveCSS('border-bottom-width', '0px');
  });

  test('la card de La Materia Prima se pone #f0ece6 al hover', async ({ page }) => {
    await page.goto('/index.html');
    // `.articles .article-card` (inicio.css) tiene la misma especificidad que
    // `.article-card:hover` y va después: por eso el hover se comprobaba aquí.
    const card = page.locator('.article-card').nth(1);
    await card.scrollIntoViewIfNeeded();
    await card.hover();
    await page.waitForTimeout(500);
    await expect(card).toHaveCSS('background-color', 'rgb(240, 236, 230)');
  });

  test('los botones amarillos pasan a #ff4520 con rótulo #fdfcfa', async ({ page }) => {
    await page.goto('/index.html');
    // Par del frame `hovers` 4518:2148: relleno #ffcd00 → #ff4520 y
    // rótulo #30250f → #fdfcfa («Aporta» del nav y CTA `.btn--primary`).
    const aporta = page.locator('.site-nav__buttons .btn--dark');
    await aporta.hover();
    await page.waitForTimeout(500);
    await expect(aporta).toHaveCSS('background-color', 'rgb(255, 69, 32)');
    await expect(aporta).toHaveCSS('color', 'rgb(253, 252, 250)');

    await page.mouse.move(0, 0);
    const cta = page.locator('.btn--primary').first();
    await cta.scrollIntoViewIfNeeded();
    await cta.hover();
    await page.waitForTimeout(500);
    await expect(cta).toHaveCSS('background-color', 'rgb(255, 69, 32)');
    await expect(cta).toHaveCSS('color', 'rgb(253, 252, 250)');
  });

  test('el botón «Únete» del hero: stroke #ffcd00, rótulo #30250f y hover rojo', async ({ page }) => {
    await page.goto('/index.html');
    // Instancia Figma `2325:3817` (107×47): stroke #ffcd00 por dentro,
    // rótulo #30250f, padding 20/10 (hoy el texto mide 68 px y Figma 67,
    // así que el ancho queda 108 frente a 107 — 1 px de métrica de fuente).
    const btn = page.locator('.btn--outline');
    await expect(btn).toHaveCSS('color', 'rgb(48, 37, 15)');
    await expect(btn).toHaveCSS('box-shadow', 'rgb(255, 205, 0) 0px 0px 0px 1px inset');
    await expect(btn).toHaveCSS('padding-left', '20px');
    await expect(btn).toHaveCSS('border-radius', '0px');
    const box = await btn.boundingBox();
    expect(Math.round(box.height)).toBe(47);
    expect(box.width).toBeGreaterThanOrEqual(105);
    expect(box.width).toBeLessThanOrEqual(110);

    // Hover: mismo par que los botones amarillos (`4518:2148`).
    await btn.hover();
    await page.waitForTimeout(500);
    await expect(btn).toHaveCSS('background-color', 'rgb(255, 69, 32)');
    await expect(btn).toHaveCSS('color', 'rgb(253, 252, 250)');
    await expect(btn).toHaveCSS('box-shadow', 'rgb(255, 69, 32) 0px 0px 0px 1px inset');
  });
});

test.describe('enlaces configurables (content/enlaces.json)', () => {
  test('«Aporta» es un enlace en nav, menú y footer', async ({ page }) => {
    await page.goto('/index.html');
    const aporta = page.locator('[data-enlace="aporta"]');
    await expect(aporta).toHaveCount(3);
    for (const tag of await aporta.evaluateAll((nodes) => nodes.map((n) => n.tagName))) {
      expect(tag).toBe('A');
    }
    await expect(aporta.first()).not.toHaveAttribute('href', '');
  });

  test('las 4 cards de La Materia Prima son enlaces etiquetados', async ({ page }) => {
    await page.goto('/index.html');
    const cards = page.locator('[data-enlace^="articulo-"]');
    await expect(cards).toHaveCount(4);

    // El destino sale del JSON: vacío → porDefecto.
    const cfg = await page.evaluate(() => fetch('content/enlaces.json').then((r) => r.json()));
    const claves = await cards.evaluateAll((nodes) =>
      nodes.map((n) => n.getAttribute('data-enlace'))
    );
    for (let i = 0; i < claves.length; i++) {
      const n = claves[i].replace('articulo-', '');
      const esperado = (cfg.articulos && cfg.articulos[n]) || cfg.porDefecto;
      expect(await cards.nth(i).getAttribute('href')).toBe(esperado);
    }

    // Sin texto propio: el nombre accesible lo da el <h3> de la card.
    for (let i = 0; i < 4; i++) {
      await expect(cards.nth(i)).toHaveAttribute('aria-labelledby', `article-${i + 1}-title`);
      await expect(page.locator(`#article-${i + 1}-title`)).toHaveCount(1);
    }
  });

  test('cambiar porDefecto en el JSON mueve todos los destinos', async ({ page }) => {
    await page.goto('/index.html');
    await page.route('**/content/enlaces.json', (route) =>
      route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({ porDefecto: 'https://ejemplo.test/x', aporta: '', articulos: { 1: '', 2: '', 3: '', 4: '' } }),
      })
    );
    await page.reload();
    await expect(page.locator('[data-enlace="aporta"]').first()).toHaveAttribute('href', 'https://ejemplo.test/x');
    await expect(page.locator('[data-enlace="articulo-3"]')).toHaveAttribute('href', 'https://ejemplo.test/x');
  });
  test('el póster del vídeo apunta a la URL de content/enlaces.json', async ({ page }) => {
    await page.goto('/index.html');
    const cfg = await page.evaluate(() => fetch('content/enlaces.json').then((r) => r.json()));
    test.skip(!cfg.video, 'sin `video` configurado en enlaces.json');

    await expect(page.locator('[data-video]')).toHaveAttribute('href', cfg.video);
    // La portada se mantiene: es lo que miden los tiles de inicio-1448.
    await expect(page.locator('.video__player .media__img')).toHaveCount(1);
    await expect(page.locator('.video__player iframe')).toHaveCount(0);
  });

  test('al hacer clic se inyecta el iframe de YouTube', async ({ page }) => {
    await page.goto('/index.html');
    const cfg = await page.evaluate(() => fetch('content/enlaces.json').then((r) => r.json()));
    const id = (String(cfg.video).match(/(?:v=|youtu\.be\/|shorts\/)([A-Za-z0-9_-]{11})/) || [])[1];
    test.skip(!id, 'sin `video` configurado en enlaces.json');

    await page.locator('[data-video]').click();
    const iframe = page.locator('.video__player iframe');
    await expect(iframe).toHaveCount(1);
    await expect(iframe).toHaveAttribute(
      'src',
      `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
    );
    await expect(iframe).toHaveAttribute('allowfullscreen');
    // El reemplazo se hace sobre `.media`: la portada no desaparece del todo
    // y el iframe la cubre con el mismo 16/9.
    await expect(page.locator('.video__player .media__img')).toHaveCount(1);
    await expect(page.locator('[data-video]')).toHaveCount(0);
  });
});

test.describe('diálogo de objetivos: texto por card', () => {
  test('cada card abre su diálogo con el título y los cuerpos de dialog-N', async ({ page }) => {
    await page.goto('/index.html');
    // El diálogo lee `content/es.json` en runtime (window.VCI18n.getData).
    await page.waitForFunction(() => window.VCI18n && !!window.VCI18n.getData());
    const cards = page.locator('.goal-card');

    // Objetivo 1 → `inicio.dialog` (conserva la key original, sin sufijo).
    await cards.nth(0).click();
    await expect(page.locator('.dialog')).toHaveClass(/is-open/);
    await expect(page.locator('.dialog__title')).toHaveAttribute('data-i18n', 'inicio.dialog.title');
    await expect(page.locator('.dialog__title')).toHaveText(await cards.nth(0).locator('h3').textContent());
    await expect(page.locator('.dialog__body')).toHaveCount(2);
    await expect(page.locator('.dialog__body').first()).toHaveAttribute('data-i18n', 'inicio.dialog.body-1');
    // El diálogo ya no repite el texto de la card: usa el desarrollo del JSON.
    expect(await page.locator('.dialog__body').first().textContent()).not.toBe(
      await cards.nth(0).locator('p').textContent()
    );
    await page.keyboard.press('Escape');
    await expect(page.locator('.dialog')).not.toHaveClass(/is-open/);

    // Objetivo 3 → `inicio.dialog-3` con tres párrafos.
    await cards.nth(2).click();
    await expect(page.locator('.dialog__title')).toHaveAttribute('data-i18n', 'inicio.dialog-3.title');
    await expect(page.locator('.dialog__body')).toHaveCount(3);
    await expect(page.locator('.dialog__body').first()).toHaveAttribute('data-i18n', 'inicio.dialog-3.body-1');
    await expect(page.locator('.dialog__title')).toHaveText(await cards.nth(2).locator('h3').textContent());

    // El panel sigue midiendo 1024×604 de Figma: lo largo se desplaza dentro.
    const panel = await page.locator('.dialog__panel').boundingBox();
    expect(panel.width).toBeGreaterThanOrEqual(1020);
    expect(panel.height).toBeLessThanOrEqual(615);
  });
});

test.describe('conmutador ES/PT', () => {
  test('el estado activo se voltea aunque falle la carga del JSON', async ({ page }) => {
    // Reproduce el caso real del usuario: el fetch de `content/pt.json` no
    // llega (p. ej. abriendo el HTML con file://). El conmutador debe responder.
    await page.route('**/content/pt.json', (route) => route.abort());
    await page.goto('/index.html');

    await expect(page.locator('[data-lang="es"]')).toHaveClass(/is-active/);
    await page.click('[data-lang="pt"]');

    await expect(page.locator('[data-lang="pt"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-lang="es"]')).not.toHaveClass(/is-active/);
    await expect(page.locator('[data-lang="pt"]')).toHaveCSS('color', 'rgb(48, 37, 15)');
    await expect(page.locator('[data-lang="es"]')).toHaveCSS('color', 'rgb(158, 147, 130)');

    // Y se puede volver sin quedarse atascado.
    await page.click('[data-lang="es"]');
    await expect(page.locator('[data-lang="es"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-lang="pt"]')).not.toHaveClass(/is-active/);
  });

  test('con el JSON disponible se aplica el locale', async ({ page }) => {
    await page.goto('/index.html');
    await page.click('[data-lang="pt"]');
    await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
    await expect(page.locator('[data-lang="pt"]')).toHaveClass(/is-active/);
    await expect(page.locator('[data-lang="pt"]')).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('[data-lang="es"]')).toHaveAttribute('aria-pressed', 'false');
  });
});
