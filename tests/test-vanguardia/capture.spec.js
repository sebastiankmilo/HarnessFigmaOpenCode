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

// Nombre de salida de componentes/estados (§4.1 / §5.1.2): en desktop-1448
// conservan su nombre actual; en tablet-768 y mobile-375 van como
// <base>-<viewport> para que un proyecto nunca sobrescriba la captura de otro.
function capName(width, desktopName, base) {
  return width === 1448 ? desktopName : `${base}-${width}.png`;
}

// Si el sujeto no está visible en este viewport (p. ej. el botón del nav,
// oculto hasta 1448), no hay imagen que capturar: se omite el caso en lugar
// de fallar la corrida. Nunca se captura un elemento oculto.
async function requireVisible(page, selector) {
  const el = page.locator(selector).first();
  if (!(await el.isVisible())) {
    test.skip(true, `sujeto no visible en este viewport: ${selector}`);
  }
  return el;
}

// La nav es fija y nav.js añade .is-reduced al hacer scroll: en lg la barra
// baja de 160 a 83 px y el contenido sube 77 px (en sm, 75 → 56). Si se
// captura antes de que termine esa transición, el recorte sale desplazado
// (par inválido). Por eso se scrollea, se espera la transición (0.3 s) y se
// captura después.
async function shotCard(page, selector, name) {
  const card = await requireVisible(page, selector);
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
      // Los vídeos son iframes de YouTube: la miniatura la sirve un tercero y
      // cambia con el tiempo (o no carga), así que se enmascara el reproductor
      // para que el juez visual compare solo lo que diseñamos.
      mask: [page.locator('.media__iframe')],
      maskColor: '#c2c2c2',
    });
  });
}

test.describe('componentes y estados', () => {
  test('nav (par: baseline/nav.png)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const nav = await requireVisible(page, 'header.site-nav');
    await nav.screenshot({
      path: path.join(OUT, capName(width, 'nav.png', 'nav')),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('goal-card default (par: baseline/goal-card.png)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    await shotCard(page, '.goals__grid > .goal-card:not(.is-active)', capName(width, 'goal-card.png', 'goal-card'));
  });

  test('goal-card is-active (evidencia, sin par)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    await shotCard(page, '.goals__grid > .goal-card.is-active', capName(width, 'goal-card-is-active.png', 'goal-card-is-active'));
  });

  test('buttons-s dark (par: baseline/buttons-s.png)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const btn = await requireVisible(page, 'header .btn--dark.btn--s');
    await btn.screenshot({
      path: path.join(OUT, capName(width, 'buttons-s.png', 'buttons-s')),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m primary (par: baseline/buttons-m.png)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const btn = await requireVisible(page, '.btn--primary.btn--m');
    await btn.screenshot({
      path: path.join(OUT, capName(width, 'buttons-m.png', 'buttons-m')),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m hover (evidencia, sin par)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const btn = await requireVisible(page, '.btn--primary.btn--m');
    await btn.hover();
    await page.waitForTimeout(350);
    await btn.screenshot({
      path: path.join(OUT, capName(width, 'buttons-m-hover.png', 'buttons-m-hover')),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('buttons-m focus-visible (evidencia, sin par)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const btn = await requireVisible(page, '.btn--primary.btn--m');
    await btn.focus();
    await btn.screenshot({
      path: path.join(OUT, capName(width, 'buttons-m-focus.png', 'buttons-m-focus')),
      animations: 'disabled',
      caret: 'hide',
    });
  });

  test('objetivo-modal abierto (par: baseline/objetivo-modal-1448.png)', async ({ page }) => {
    const width = page.viewportSize().width;
    await page.goto('/index.html');
    await settle(page);
    const card = await requireVisible(page, '.goal-card');
    await card.click();
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();
    await settle(page);
    const panel = await requireVisible(page, '.dialog__panel');
    await panel.screenshot({
      path: path.join(OUT, capName(width, 'objetivo-modal-1448.png', 'objetivo-modal')),
      animations: 'disabled',
      caret: 'hide',
    });
  });
});
