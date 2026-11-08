import { test, expect } from '@playwright/test';

/* Guardia del layout de escritorio entre 1280 y 1447 px.
 *
 * El frame de Figma mide 1448, pero el ancho de un portátil no: 1920×1080 al
 * 150 % de escala son 1280 px de CSS, un portátil de 1366 son 1366 y un
 * monitor de 1440 son 1440. Con el corte en 1448 todas esas pantallas caían al
 * layout de tablet (barra sin enlaces y héroe con la foto a sangre completa).
 * Desde que el corte es 1280, estas tres anchuras tienen que comportarse como
 * escritorio: sin scroll horizontal, con los enlaces del nav a la vista y sin
 * que la foto del héroe tape el texto. */

const PAGINAS = ['index', 'programa', 'decalogo', 'unete'];
const ANCHOS = [1280, 1366, 1440];

// Corre una sola vez (no hace falta repetirlo en los tres proyectos: el ancho
// lo fija cada caso).
test.beforeEach(async ({}, testInfo) => {
  test.skip(testInfo.project.name !== 'desktop-1448', 'se valida una vez, con anchos propios');
});

for (const ancho of ANCHOS) {
  test.describe(`escritorio a ${ancho}px`, () => {
    test.use({ viewport: { width: ancho, height: 900 } });

    for (const pagina of PAGINAS) {
      test(`${pagina}: sin scroll horizontal`, async ({ page }) => {
        await page.goto(`/${pagina}.html`);
        const anchos = await page.evaluate(() => ({
          contenido: document.documentElement.scrollWidth,
          ventana: document.documentElement.clientWidth,
        }));
        expect(anchos.contenido).toBeLessThanOrEqual(anchos.ventana);
      });
    }

    test('nav: se ven los enlaces de escritorio y no la hamburguesa', async ({ page }) => {
      await page.goto('/index.html');
      await expect(page.locator('.site-nav__links')).toBeVisible();
      await expect(page.locator('.site-nav__lang')).toBeVisible();
      await expect(page.locator('.site-nav__toggle')).toBeHidden();
    });

    test('héroe: la foto no tapa el texto', async ({ page }) => {
      await page.goto('/index.html');
      const cajas = await page.evaluate(() => {
        const texto = document.querySelector('.hero__text').getBoundingClientRect();
        const media = document.querySelector('.hero__media').getBoundingClientRect();
        return { textoDer: texto.right, mediaIzq: media.left, mediaAncho: media.width };
      });
      expect(cajas.textoDer).toBeLessThanOrEqual(cajas.mediaIzq);
      expect(cajas.mediaAncho).toBeGreaterThan(0);
    });
  });
}
