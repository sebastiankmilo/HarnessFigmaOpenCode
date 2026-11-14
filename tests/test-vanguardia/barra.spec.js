import { test, expect } from '@playwright/test';

/* Carga de la barra y cierre inferior — decisiones del 2026-11-14:
 *
 *  1. Las dos fuentes se precargan en el `<head>`. Sin preload, DM Sans
 *     llegaba después del primer pintado y el `font-display: swap` cambiaba el
 *     ancho de los enlaces del nav (medido: 98 → 95 px en `Programa` a 1448),
 *     así que las letras se desplazaban solas al cargar. No era una animación:
 *     era el intercambio de fuentes.
 *  2. La barra lleva un filete de 1 px abajo, tomado de la variante editorial.
 *
 * ESPECIFICACIÓN: `Especificaciones/design specs/interactions.md` §Barra.
 */

const PAGINAS = ['index.html', 'programa.html', 'decalogo.html', 'unete.html'];
const PAGINAS_PT = PAGINAS.map((p) => `pt/${p}`);

const DESKTOP = 'desktop-1448';
const onlyDesktop = async ({}, testInfo) => {
  test.skip(testInfo.project.name !== DESKTOP, 'la barra muestra enlaces desde 1280');
};

test.describe('precarga de fuentes en la barra', () => {
  /* Sin esto vuelve el salto de letras del header: la comprobación es sobre el
   * HTML servido, porque el fallo depende de la red y no siempre se reproduce. */
  for (const ruta of [...PAGINAS, ...PAGINAS_PT]) {
    test(`${ruta}: precarga Bebas Neue y DM Sans`, async ({ page, request }) => {
      const html = await (await request.get(`/${ruta}`)).text();
      const preloads = [...html.matchAll(/<link rel="preload"[^>]*>/g)].map((m) => m[0]);
      const fuentes = preloads.filter((tag) => tag.includes('as="font"'));
      expect(fuentes.length, `${ruta} sin preload de fuentes`).toBeGreaterThanOrEqual(2);
      expect(fuentes.some((t) => t.includes('bebas-neue-latin.woff2'))).toBe(true);
      expect(fuentes.some((t) => t.includes('dm-sans-latin.woff2'))).toBe(true);
      // `crossorigin` es obligatorio aunque el archivo sea del mismo origen:
      // sin él el navegador descarga la fuente dos veces y la precarga no sirve.
      for (const tag of fuentes) expect(tag).toContain('crossorigin');
      // Rutas relativas correctas según el idioma de la página.
      const prefijo = ruta.startsWith('pt/') ? '../assets/fonts/' : 'assets/fonts/';
      for (const tag of fuentes) expect(tag).toContain(`href="${prefijo}`);
      await page.goto(`/${ruta}`);
    });
  }
});

test.describe('la barra no se reacomoda al cargar', () => {
  test.beforeEach(onlyDesktop);

  test('el ancho y la posición de los enlaces no cambian desde el primer cuadro', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });

    // Se muestrea cuadro a cuadro desde antes de que exista el DOM.
    await page.addInitScript(() => {
      const muestras = [];
      const inicio = performance.now();
      const paso = () => {
        const enlace = document.querySelector('.site-nav__link');
        if (enlace) {
          const caja = enlace.getBoundingClientRect();
          muestras.push([Math.round(caja.x), Math.round(caja.width)]);
        }
        if (performance.now() - inicio < 1200) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
      window.__muestras = () => muestras;
    });

    await page.goto('/index.html');
    await page.waitForTimeout(1300);
    const muestras = await page.evaluate(() => window.__muestras());

    expect(muestras.length).toBeGreaterThan(10);
    const posiciones = new Set(muestras.map(([x]) => x));
    const anchos = new Set(muestras.map(([, w]) => w));
    expect(anchos.size, `el ancho del enlace cambió: ${[...anchos]}`).toBe(1);
    expect(posiciones.size, `el enlace se movió: ${[...posiciones]}`).toBe(1);
  });

  test('la barra queda en DM Sans, no en la fuente de respaldo', async ({ page }) => {
    await page.goto('/index.html');
    await page.evaluate(() => document.fonts.ready);
    const cargadas = await page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === 'loaded').map((f) => f.family)
    );
    expect(cargadas).toContain('DM Sans');
    await expect(page.locator('.site-nav__link').first()).toHaveCSS('font-family', /DM Sans/);
  });
});

test.describe('filete de cierre de la barra', () => {
  test('la barra cierra con 1 px del color del filete', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');

    const filete = await page.evaluate(() => {
      const barra = document.querySelector('.site-nav');
      const estilo = getComputedStyle(barra, '::after');
      const caja = barra.getBoundingClientRect();
      return {
        alto: estilo.height,
        color: estilo.backgroundColor,
        posicion: estilo.position,
        // Se lee del token, no de un literal.
        token: getComputedStyle(document.documentElement).getPropertyValue('--color-linea-nav').trim(),
        barraAbajo: Math.round(caja.bottom),
      };
    });

    expect(filete.alto).toBe('1px');
    expect(filete.token).toBe('#d7cdbc');
    // #d7cdbc en rgb
    expect(filete.color).toBe('rgb(215, 205, 188)');
    expect(filete.posicion).toBe('absolute');
  });

  test('el filete no altera el alto de la barra ni el hueco que reserva el body', async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');

    const medidas = await page.evaluate(() => {
      const barra = document.querySelector('.site-nav');
      const interior = document.querySelector('.site-nav__inner');
      return {
        barra: Math.round(barra.getBoundingClientRect().height),
        interior: Math.round(interior.getBoundingClientRect().height),
        body: getComputedStyle(document.body).paddingTop,
      };
    });

    // El filete es un `::after` absoluto: el alto de la barra es el del
    // interior, y el body reserva exactamente eso (83,38 en xs, redondeado a
    // 83 por el navegador, así que se comparan redondeados).
    expect(medidas.barra).toBe(medidas.interior);
    expect(Math.round(parseFloat(medidas.body))).toBe(medidas.interior);
  });

  test('el primer contenido no queda tapado por la barra', async ({ page }) => {
    await page.goto('/index.html');
    const solape = await page.evaluate(() => {
      const barra = document.querySelector('.site-nav').getBoundingClientRect();
      const hero = document.querySelector('.hero').getBoundingClientRect();
      return { barraAbajo: Math.round(barra.bottom), heroArriba: Math.round(hero.top) };
    });
    expect(solape.heroArriba).toBeGreaterThanOrEqual(solape.barraAbajo - 1);
  });
});
