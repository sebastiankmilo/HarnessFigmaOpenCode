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

  test('article-card: background 0.4s ease', async ({ page }) => {
    await page.goto('/index.html');
    const t = await readTransition(page, '.tarjeta-articulo');
    expect(t, 'no existe .tarjeta-articulo').not.toBeNull();
    expect(t.duration).toContain('0.4s');
    expect(t.timing).toContain('ease');
    expect(t.property).toContain('background');
  });

  test('goal-card: solo crece, el fondo no se tiñe (decisión 2026-11-14)', async ({ page }) => {
    await page.goto('/index.html');
    const ficha = page.locator('.objetivos__grid .tarjeta-objetivo.is-active');

    // La transición es del crecimiento; el fondo dejó de animarse.
    const t = await readTransition(page, '.objetivos__grid .tarjeta-objetivo');
    expect(t.property).toContain('scale');
    expect(t.property).not.toContain('background');

    // Y el color no cambia al pasar el cursor.
    const fondo = () => ficha.evaluate((el) => getComputedStyle(el).backgroundColor);
    const reposo = await fondo();
    await ficha.hover();
    await page.waitForTimeout(600);
    expect(await fondo()).toBe(reposo);
    await expect
      .poll(() => ficha.evaluate((el) => parseFloat(getComputedStyle(el).scale)))
      .toBeGreaterThan(1);
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

test.describe('entrada de la portada (inicio)', () => {
  /* Portada de `site_v_impeccable/` traída al hero de `site/`: titular con
   * barrido `clip-path`, foto que se asienta y entradilla + botones
   * escalonados. La nota 4649:2018 pide no animar el above the fold con fades
   * de scrollspy; esto es otra cosa — una entrada de carga, una sola vez, y
   * sin desplazar el layout. */

  /* El navegador conserva la unidad de los extremos al interpolar (de
   * `inset(0 100% 0 0)` sale `inset(0px 0% 0px 0px)`), así que el «sin
   * recorte» se comprueba por valor —todo cero— y no por cadena exacta. */
  const sinRecorte = (valor) =>
    valor === 'none' || /^inset\((0(px|%)?)( 0(px|%)?){0,3}\)$/.test(valor.trim());

  test('los cuatro elementos arrancan con la curva y los tiempos del sistema', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');

    const leidas = await page.evaluate(() =>
      ['.hero__title', '.hero__media', '.hero__lead', '.hero__actions'].map((sel) => {
        const s = getComputedStyle(document.querySelector(sel));
        return {
          sel,
          nombre: s.animationName,
          duracion: s.animationDuration,
          curva: s.animationTimingFunction,
          retardo: s.animationDelay,
          relleno: s.animationFillMode,
        };
      })
    );

    const [titulo, foto, entradilla, acciones] = leidas;

    expect(titulo.nombre).toBe('tinta');
    expect(titulo.duracion).toBe('1.05s');
    expect(titulo.curva).toBe('cubic-bezier(0.16, 1, 0.3, 1)');

    expect(foto.nombre).toBe('asentar');
    expect(foto.duracion).toBe('1.5s');

    expect(entradilla.nombre).toBe('subir');
    expect(entradilla.duracion).toBe('0.9s');
    expect(entradilla.retardo).toBe('0.12s');

    expect(acciones.nombre).toBe('subir');
    expect(acciones.duracion).toBe('0.9s');
    expect(acciones.retardo).toBe('0.22s');

    // `both`: nada se queda visible antes ni parpadea después.
    for (const leida of leidas) expect(leida.relleno).toBe('both');
  });

  test('a mitad del barrido el titular sigue recortado y la foto sigue crecida', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');

    // Se congela el tiempo de la animación a los 400 ms de los 1050.
    const medio = await page.evaluate(() => {
      const titulo = document.querySelector('.hero__title');
      const foto = document.querySelector('.hero__media');
      const animaciones = document.getAnimations();
      for (const animacion of animaciones) {
        animacion.pause();
        if (animacion.effect && animacion.effect.target === titulo) {
          animacion.currentTime = 400;
        }
        if (animacion.effect && animacion.effect.target === foto) {
          animacion.currentTime = 400;
        }
      }
      return {
        recorte: getComputedStyle(titulo).clipPath,
        escala: getComputedStyle(foto).transform,
      };
    });

    // A mitad del barrido el titular sigue descubriéndose: `clip-path` ya no
    // es `none` (hay recorte activo) y la foto todavía está crecida.
    expect(medio.recorte).toMatch(/^inset\(/);
    expect(medio.recorte).not.toMatch(/inset\(0(px)?( 0(px)?){0,3}\)/);
    expect(medio.escala).not.toBe('none');
  });

  test('al terminar, el titular queda entero y sin transformaciones', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');
    await page.waitForTimeout(1800);

    const final = await page.evaluate(() => {
      const lee = (sel) => getComputedStyle(document.querySelector(sel));
      return {
        recorte: lee('.hero__title').clipPath,
        foto: lee('.hero__media').transform,
        entradilla: lee('.hero__lead').opacity,
        acciones: lee('.hero__actions').opacity,
      };
    });

    expect(sinRecorte(final.recorte)).toBe(true);
    // Con `fill-mode: both` la animación sigue aplicada al terminar, así que
    // la matriz identidad —no `none`— es el estado final.
    expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(final.foto);
    expect(final.entradilla).toBe('1');
    expect(final.acciones).toBe('1');
  });

  test('la foto crecida no abre scroll horizontal en móvil', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'mobile-375', 'el sobrante se recorta en xs');
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');

    // En el pico del `scale(1.05)` la foto se sale 2,5 % por cada lado.
    const desborde = await page.evaluate(() => {
      const foto = document.querySelector('.hero__media');
      for (const animacion of document.getAnimations()) {
        if (animacion.effect && animacion.effect.target === foto) {
          animacion.pause();
          animacion.currentTime = 0;
        }
      }
      return {
        documento: document.documentElement.scrollWidth,
        ventana: window.innerWidth,
        recorte: getComputedStyle(document.querySelector('.hero')).overflowX,
      };
    });

    expect(desborde.recorte).toBe('clip');
    expect(desborde.documento).toBeLessThanOrEqual(desborde.ventana);
  });

  test('con prefers-reduced-motion la portada nace en su estado final', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');

    const estado = await page.evaluate(() => {
      const lee = (sel) => getComputedStyle(document.querySelector(sel));
      return {
        duracion: parseFloat(lee('.hero__title').animationDuration),
        retardo: parseFloat(lee('.hero__lead').animationDelay),
        recorte: lee('.hero__title').clipPath,
        entradilla: lee('.hero__lead').opacity,
        acciones: lee('.hero__actions').opacity,
      };
    });

    expect(estado.duracion).toBeLessThan(0.01);
    expect(estado.retardo).toBe(0);
    expect(sinRecorte(estado.recorte)).toBe(true);
    expect(estado.entradilla).toBe('1');
    expect(estado.acciones).toBe('1');
  });

  /* Las cuatro animaciones nacen en pausa y se sueltan cuando el documento y
   * las fuentes están listos: sin eso, los 150–300 ms que tarda el arranque de
   * esta carpeta (UIkit, catálogo de idioma, carrusel) se comían el principio
   * del barrido y el titular aparecía de golpe ya descubierto un tercio. */
  test('el documento deja la entrada en pausa y luego la suelta', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');
    await page.waitForFunction(() => document.documentElement.classList.contains('con-entrada'), {
      timeout: 3000,
    });
    expect(
      await page.evaluate(() => document.documentElement.classList.contains('js-entrada'))
    ).toBe(true);

    const alSoltar = await page.evaluate(() => ({
      estado: getComputedStyle(document.querySelector('.hero__title')).animationPlayState,
      corriendo: document.getAnimations().some((a) => a.playState === 'running'),
    }));
    expect(alSoltar.estado).toBe('running');
    expect(alSoltar.corriendo).toBe(true);
  });

  test('con la clase de pausa puesta el titular espera recortado del todo', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.goto('/index.html');
    await page.waitForFunction(() => document.documentElement.classList.contains('con-entrada'));

    // Se devuelve al estado de antes de soltar: el titular tiene que estar
    // entero recortado (nada impreso) y la animación detenida en el primer
    // cuadro, que es lo que impide que el barrido arranque a medias.
    const enPausa = await page.evaluate(() => {
      document.documentElement.classList.remove('con-entrada');
      const titulo = document.querySelector('.hero__title');
      for (const animacion of document.getAnimations()) animacion.currentTime = 0;
      return {
        estado: getComputedStyle(titulo).animationPlayState,
        recorte: getComputedStyle(titulo).clipPath,
      };
    });

    expect(enPausa.estado).toBe('paused');
    expect(enPausa.recorte).toMatch(/100%/);
  });
});

test.describe('entrada del hero en las páginas interiores', () => {
  /* Decisión 2026-11-14: Programa y Decálogo estrenan el mismo gesto de la
   * portada — titular que se imprime, foto que se asienta y entradilla que
   * sube—, con el mismo reloj y la misma pausa hasta que el documento está
   * listo. */

  const HEROES = [
    { ruta: 'programa.html', titulo: '.programa-hero__title', foto: '.programa-hero .media__img', leads: '.programa-hero__lead' },
    { ruta: 'decalogo.html', titulo: '.decalogo-hero__title', foto: '.decalogo-hero .media__img', leads: '.decalogo-hero__lead' },
  ];

  test.beforeEach(noMotionPref);

  for (const { ruta, titulo, foto, leads } of HEROES) {
    test(`${ruta}: titular, foto y entradilla con los tiempos del sistema`, async ({ page }) => {
      await page.goto(`/${ruta}`);

      const estado = await page.evaluate(
        ({ titulo, foto, leads }) => {
          const lee = (sel) => {
            const el = document.querySelector(sel);
            if (!el) return null;
            const s = getComputedStyle(el);
            return {
              nombre: s.animationName,
              duracion: s.animationDuration,
              retardo: s.animationDelay,
              curva: s.animationTimingFunction,
              relleno: s.animationFillMode,
            };
          };
          return {
            titulo: lee(titulo),
            foto: lee(foto),
            lead: lee(leads),
            raiz: document.documentElement.className,
          };
        },
        { titulo, foto, leads }
      );

      expect(estado.titulo.nombre).toBe('tinta');
      expect(estado.titulo.duracion).toBe('1.05s');
      expect(estado.titulo.curva).toBe('cubic-bezier(0.16, 1, 0.3, 1)');

      expect(estado.foto.nombre).toBe('asentar');
      expect(estado.foto.duracion).toBe('1.5s');

      expect(estado.lead.nombre).toBe('subir');
      expect(estado.lead.duracion).toBe('0.9s');
      expect(estado.lead.retardo).toBe('0.12s');

      for (const pieza of [estado.titulo, estado.foto, estado.lead]) {
        expect(pieza.relleno).toBe('both');
      }

      // La cabecera también nace en pausa y se suelta sola.
      expect(estado.raiz).toContain('js-entrada');
      await page.waitForFunction(() => document.documentElement.classList.contains('con-entrada'), {
        timeout: 4000,
      });
    });
  }

  test('el 5 % que crece la foto queda recortado por el marco', async ({ page }) => {
    for (const { ruta } of HEROES) {
      await page.goto(`/${ruta}`);
      const recorte = await page.evaluate((sel) => {
        const marco = document.querySelector(sel);
        return getComputedStyle(marco).overflow;
      }, ruta === 'programa.html' ? '.programa-hero .media' : '.decalogo-hero .media');
      expect(recorte, `${ruta}: la foto se sale del marco al asentarse`).toBe('hidden');
    }
  });

  test('con prefers-reduced-motion la cabecera nace quieta y completa', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    for (const { ruta, titulo, foto } of HEROES) {
      await page.goto(`/${ruta}`);
      const estado = await page.evaluate(
        ({ titulo, foto }) => ({
          duracion: parseFloat(getComputedStyle(document.querySelector(titulo)).animationDuration),
          recorte: getComputedStyle(document.querySelector(titulo)).clipPath,
          foto: getComputedStyle(document.querySelector(foto)).transform,
        }),
        { titulo, foto }
      );
      expect(estado.duracion).toBeLessThan(0.01);
      expect(['none', 'inset(0px 0% 0px 0px)']).toContain(estado.recorte);
      expect(['none', 'matrix(1, 0, 0, 1, 0, 0)']).toContain(estado.foto);
    }
  });
});

test.describe('entrada de la portada sin JavaScript', () => {
  /* Sin el script de la cabecera no se pone `js-entrada` y el CSS no pausa
   * nada: el hero tiene que verse entero desde el primer cuadro. */
  test.use({ javaScriptEnabled: false });

  test('el titular se ve completo y sin recorte', async ({ page }) => {
    await page.goto('/index.html');
    const estado = await page.evaluate(() => {
      const s = getComputedStyle(document.querySelector('.hero__title'));
      return { recorte: s.clipPath, estado: s.animationPlayState };
    });
    expect(['none', 'inset(0px 0% 0px 0px)']).toContain(estado.recorte);
  });
});

test.describe('fundido entre páginas y cambio de idioma (View Transitions)', () => {
  /* Decisión 2026-11-14: el fundido es simétrico y de 0,28 s en las dos capas,
   * como la variante editorial. Antes eran 0,16 s de salida y 0,26 s de
   * entrada: la capa que salía ya se había apagado mientras la que entraba
   * seguía a media opacidad, y en ese hueco se veía el fondo — el parpadeo que
   * se notaba al navegar. Ahora las dos cruzan el mismo tramo, con las curvas
   * del navegador (`-ua-view-transition-fade-out/in`) y sin `@keyframes` propios. */

  const DURACION = 280;

  /* Sonda instalada en cada documento: guarda el fundido de las dos capas de
   * la raíz en cuanto aparece. La transición dura 0,28 s, así que hay que
   * mirar cuadro a cuadro y no una sola vez al final. */
  const instalarSonda = () => {
    window.__capas = {};
    const paso = () => {
      for (const animacion of document.getAnimations()) {
        const seudo = animacion.effect && animacion.effect.pseudoElement;
        if (!seudo || !seudo.includes('view-transition')) continue;
        // Solo el fundido: la transición trae además la animación del grupo y
        // un `mix-blend-mode`, que no son opacidad.
        if (!animacion.animationName.includes('fade')) continue;
        window.__capas[seudo] = {
          nombre: animacion.animationName,
          duracion: animacion.effect.getTiming().duration,
        };
      }
      requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
  };

  test.beforeEach(async ({}, testInfo) => {
    test.skip(testInfo.project.name !== DESKTOP, 'transiciones medidas en 1448');
  });
  test.beforeEach(noMotionPref);

  test('navegar entre páginas funde las dos capas a la vez y en 0,28 s', async ({ page }) => {
    await page.addInitScript(instalarSonda);
    await page.goto('/index.html');
    await page.evaluate(() => (window.__capas = {}));

    await page.locator('.site-nav__link').first().click();
    await page.waitForURL(/programa\.html/);
    await page.waitForTimeout(300);

    const capas = await page.evaluate(() => window.__capas);
    expect(capas['::view-transition-old(root)'], 'no hay capa saliente').toBeTruthy();
    expect(capas['::view-transition-new(root)'], 'no hay capa entrante').toBeTruthy();
    expect(capas['::view-transition-old(root)'].duracion).toBe(DURACION);
    expect(capas['::view-transition-new(root)'].duracion).toBe(DURACION);
    // Mismas curvas del navegador, no `@keyframes` propios: es lo que garantiza
    // que las dos capas crucen exactamente el mismo tramo.
    expect(capas['::view-transition-old(root)'].nombre).toBe('-ua-view-transition-fade-out');
    expect(capas['::view-transition-new(root)'].nombre).toBe('-ua-view-transition-fade-in');
  });

  test('el cruce no tiene hueco: la suma de las dos capas se queda en 1', async ({ page }) => {
    /* Lo que hacía que el fundido anterior se sintiera menos limpio no era la
     * duración sino el reparto: con 0,16 s de salida y 0,26 s de entrada la
     * suma de opacidades caía a 0,64 y el contenido se destiñe hacia el fondo
     * y vuelve. Simétrico, suma 1 en todos los cuadros. Se lee del progreso de
     * las propias animaciones: el navegador no expone el estilo calculado de
     * los pseudos de la transición. */
    await page.addInitScript(() => {
      window.__suma = [];
      const inicio = performance.now();
      const paso = () => {
        let saliente = null;
        let entrante = null;
        for (const animacion of document.getAnimations()) {
          // Las animaciones de la transición aparecen y desaparecen entre
          // cuadros: leer una ya cancelada lanza y mataría la sonda.
          try {
            const seudo = animacion.effect && animacion.effect.pseudoElement;
            const nombre = animacion.animationName;
            if (nombre.includes('mix-blend') || nombre.includes('group')) continue;
            const progreso = animacion.effect.getComputedTiming().progress;
            if (progreso === null || progreso === undefined) continue;
            if (seudo === '::view-transition-old(root)') saliente = progreso;
            if (seudo === '::view-transition-new(root)') entrante = progreso;
          } catch {
            continue;
          }
        }
        if (saliente !== null && entrante !== null) {
          // Salir es 1 − progreso; entrar es el progreso.
          window.__suma.push(+((1 - saliente) + entrante).toFixed(3));
        }
        // La sonda vive desde el arranque del documento y la transición llega
        // después de `load`: la ventana tiene que cubrir toda la carga.
        if (performance.now() - inicio < 8000) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    });

    await page.goto('/index.html');
    await page.evaluate(() => (window.__suma = []));
    await page.locator('.site-nav__link').first().click();
    await page.waitForURL(/programa\.html/);
    await page.waitForTimeout(500);

    const sumas = await page.evaluate(() => window.__suma);
    expect(sumas.length, 'no se midió el cruce').toBeGreaterThan(5);
    // 0,02 de tolerancia: el muestreo cae entre cuadros, no en el cuadro exacto.
    const minimo = Math.min(...sumas);
    expect(minimo, `el cruce se abre: suma mínima ${minimo}`).toBeGreaterThanOrEqual(0.98);
  });

  test('cambiar de idioma usa el mismo fundido', async ({ page }) => {
    await page.addInitScript(instalarSonda);
    await page.goto('/index.html');
    await page.waitForFunction(() => window.VCI18n && window.VCI18n.getData());
    await page.evaluate(() => (window.__capas = {}));

    await page.locator('.site-nav__lang .site-nav__lang-btn[data-lang="pt"]').click();
    await page.waitForURL(/\/pt\//);
    await page.waitForTimeout(300);

    const capas = await page.evaluate(() => window.__capas);
    expect(capas['::view-transition-old(root)']).toBeTruthy();
    expect(capas['::view-transition-new(root)']).toBeTruthy();
    expect(capas['::view-transition-old(root)'].duracion).toBe(DURACION);
    expect(capas['::view-transition-new(root)'].duracion).toBe(DURACION);

    // Y el idioma cambió de verdad, sin recargar.
    expect(await page.locator('.site-nav__link').first().textContent()).toBe('Programa');
  });

  test('cambiar de idioma conserva el párrafo que se estaba leyendo', async ({ page }) => {
    /* El portugués de Programa mide la mitad que el español, así que anclar el
     * scroll a un píxel dejaba al lector en otra sección — como si la página
     * empezara de nuevo. Ahora se ancla al bloque de texto y a la parte de ese
     * bloque que se estaba leyendo. */
    await page.goto('/programa.html');
    await page.waitForFunction(() => window.VCI18n && window.VCI18n.getData());
    await page.evaluate(() => window.scrollTo({ top: 9000, behavior: 'instant' }));
    await page.waitForTimeout(400);

    const bloque = () =>
      page.evaluate(() => {
        const visible = [...document.querySelectorAll('main [data-i18n]')]
          .map((el) => ({ clave: el.getAttribute('data-i18n'), caja: el.getBoundingClientRect() }))
          .filter((x) => x.caja.height > 0 && x.caja.bottom > 0 && x.caja.top < window.innerHeight)
          .sort((a, b) => a.caja.top - b.caja.top)[0];
        return {
          clave: visible ? visible.clave : null,
          scrollY: Math.round(window.scrollY),
          alto: document.documentElement.scrollHeight,
        };
      });

    const antes = await bloque();
    expect(antes.clave).toBeTruthy();

    await page.locator('.site-nav__lang .site-nav__lang-btn[data-lang="pt"]').click();
    await page.waitForURL(/\/pt\//);
    await page.waitForTimeout(700);

    const despues = await bloque();
    expect(despues.clave, 'el lector cambió de párrafo al cambiar de idioma').toBe(antes.clave);
    // Y ya no se puede aterrizar fuera del documento.
    expect(despues.scrollY).toBeLessThanOrEqual(despues.alto);
    expect(despues.scrollY).toBeGreaterThan(0);
  });

  test('la duración sale del token, no de un literal suelto', async ({ page }) => {
    await page.goto('/index.html');
    const valor = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--duracion-pagina').trim()
    );
    expect(valor).toBe('0.28s');
  });

  test('con prefers-reduced-motion no hay fundido de página', async ({ page }) => {
    // Se comprueba por comportamiento y no leyendo la hoja: `@view-transition`
    // y sus `::view-transition-*(root)` son pseudos especiales que no aparecen
    // en `cssRules`, así que ahí no hay nada que inspeccionar.
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.addInitScript(instalarSonda);
    await page.goto('/index.html');
    await page.evaluate(() => (window.__capas = {}));

    await page.locator('.site-nav__link').first().click();
    await page.waitForURL(/programa\.html/);
    await page.waitForTimeout(300);

    const capas = await page.evaluate(() => window.__capas);
    expect(capas, 'con movimiento reducido no debe haber capas de transición').toEqual({});
  });
});

test.describe('destape de las placas al entrar en pantalla', () => {
  /* Decisión 2026-11-14 (opción B): la sección que trae una placa no se funde
   * — se destapa su placa. Un solo gesto por zona, como en la variante
   * editorial; y nunca los dos sobre el mismo bloque. */

  test.beforeEach(noMotionPref);

  test('portada: las placas se destapan y sus secciones no se funden', async ({ page }) => {
    await page.goto('/index.html');
    await page.waitForTimeout(200);

    const estado = await page.evaluate(() => {
      const secciones = [...document.querySelectorAll('main > section')];
      return {
        placas: document.querySelectorAll('.js-placa').length,
        // Ninguna placa recortada puede estar ya a la vista: recortarla después
        // del primer pintado es el parpadeo que se corrigió.
        recortadasALaVista: [...document.querySelectorAll('.js-placa')].filter(
          (el) => el.getBoundingClientRect().top < window.innerHeight && el.getBoundingClientRect().height > 0
        ).length,
        conAmbos: secciones.filter(
          (s) => s.classList.contains('js-reveal') && s.querySelector('.js-placa')
        ).length,
        articulos: document.querySelector('.articulos').classList.contains('js-reveal'),
        unete: document.querySelector('.bloque-unete').classList.contains('js-reveal'),
        objetivos: document.querySelector('.objetivos').classList.contains('js-reveal'),
      };
    });

    expect(estado.placas, 'las placas bajo el pliegue se destapan').toBeGreaterThan(0);
    expect(estado.recortadasALaVista, 'nada se recorta sobre el primer viewport').toBe(0);
    expect(estado.conAmbos, 'una sección no puede fundirse y destaparse a la vez').toBe(0);
    expect(estado.articulos, 'la sección de artículos se anima por sus placas').toBe(false);
    expect(estado.unete).toBe(false);
    // Sin foto grande, «Objetivos» conserva el fundido de la nota 4649:2018.
    expect(estado.objetivos).toBe(true);
  });

  test('ninguna página junta los dos gestos en la misma sección', async ({ page }) => {
    for (const ruta of ['/index.html', '/programa.html', '/decalogo.html', '/unete.html']) {
      await page.goto(ruta);
      await page.waitForTimeout(150);
      const dobles = await page.evaluate(() =>
        [...document.querySelectorAll('main > section')]
          .filter((s) => s.classList.contains('js-reveal') && s.querySelector('.js-placa'))
          .map((s) => s.className)
      );
      expect(dobles, `doble gesto en ${ruta}`).toEqual([]);
    }
  });

  test('la placa arranca recortada y termina entera al hacer scroll', async ({ page }) => {
    // Inicio: las placas de los artículos quedan bajo el pliegue en los tres
    // anchos, así que siempre son de las que se destapan.
    await page.goto('/index.html');

    const indice = await page.evaluate(() =>
      [...document.querySelectorAll('.js-placa')].findIndex(
        (el) => el.getBoundingClientRect().height > 0
      )
    );
    expect(indice, 'esta página tiene que tener al menos una placa visible').toBeGreaterThanOrEqual(0);

    const placa = page.locator('.js-placa').nth(indice);
    await expect(placa).toHaveCount(1);

    // Antes de entrar: 6 % tapado por arriba, como en la variante editorial.
    const inicial = await placa.evaluate((el) => getComputedStyle(el).clipPath);
    expect(inicial).toMatch(/^inset\(/);
    expect(inicial).not.toMatch(/^inset\(0(px)?( 0(px)?){0,3}\)$/);

    const transicion = await placa.evaluate((el) => {
      const s = getComputedStyle(el);
      return { propiedad: s.transitionProperty, duracion: s.transitionDuration };
    });
    expect(transicion.propiedad).toContain('clip-path');
    expect(transicion.duracion).toBe('1s');

    // Salto directo: Programa lleva `scroll-behavior: smooth` y la placa está a
    // 30 000 px en móvil, así que `scrollIntoView` se queda animando.
    await placa.evaluate((el) => {
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 200, behavior: 'instant' });
    });
    await expect(placa).toHaveClass(/is-visible/);
    // La transición dura 1 s: al terminar, el recorte es cero.
    await expect
      .poll(() => placa.evaluate((el) => getComputedStyle(el).clipPath), {
        timeout: 2500,
        message: 'la placa se queda recortada',
      })
      .toMatch(/^inset\(0(px)?( 0(px)?){0,3}\)$/);
  });

  test('la placa que ya está a la vista al cargar no se recorta', async ({ page }) => {
    /* El parpadeo del hero: este script corre después del primer pintado, así
     * que recortar una placa que el usuario ya está viendo le cortaba el 6 %
     * de arriba de golpe y se lo devolvía en 1 s. Ahora las placas que ya
     * están en pantalla no se tocan. */
    await page.goto('/programa.html');
    const placa = page.locator('.programa-hero .media');

    await expect(placa).not.toHaveClass(/js-placa/);
    const recorte = await placa.evaluate((el) => getComputedStyle(el).clipPath);
    expect(recorte).toBe('none');

    // Y sigue sin recortarse después de desplazarse.
    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForTimeout(300);
    await expect(placa).not.toHaveClass(/js-placa/);
    expect(await placa.evaluate((el) => getComputedStyle(el).clipPath)).toBe('none');
  });

  test('con prefers-reduced-motion nada se recorta', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/index.html');
    await page.waitForTimeout(200);

    const recortes = await page.evaluate(() =>
      [...document.querySelectorAll('.js-placa')].map((el) => getComputedStyle(el).clipPath)
    );
    expect(recortes.length).toBeGreaterThan(0);
    for (const valor of recortes) expect(valor).toBe('none');
  });

});

test.describe('destape de las placas sin JavaScript', () => {
  /* Sin el script no se pone `js-placa` y el CSS no recorta nada: las fotos
   * se ven enteras desde el primer cuadro. */
  test.use({ javaScriptEnabled: false });

  test('ninguna placa queda recortada', async ({ page }) => {
    await page.goto('/programa.html');
    const estado = await page.evaluate(() => ({
      clases: document.querySelectorAll('.js-placa').length,
      recortes: [...document.querySelectorAll('.media')].map(
        (el) => getComputedStyle(el).clipPath
      ),
    }));
    expect(estado.clases, 'sin JS no se pone la clase').toBe(0);
    for (const valor of estado.recortes) expect(valor).toBe('none');
  });
});

test.describe('carga de las fotos de cabecera', () => {
  /* Recargar Programa o Decálogo dejaba un bloque gris en el hueco de la foto:
   * el relleno del `.media` mientras la imagen viajaba. Medido con caché fría
   * y red lenta, más de tres segundos a la vista. También era el LCP de la
   * página pidiéndose con `loading="lazy"`. */

  const CABECERAS = [
    { ruta: 'programa.html', imagen: 'programa-header.webp', placa: '.programa-hero .media' },
    { ruta: 'decalogo.html', imagen: 'decalogo-header.webp', placa: '.decalogo-hero .media' },
    { ruta: 'index.html', imagen: 'hero.webp', placa: '.hero' },
  ];

  for (const { ruta, imagen, placa } of CABECERAS) {
    test(`${ruta}: precarga la foto del hero y la pide con prioridad`, async ({ page, request }) => {
      const html = await (await request.get(`/${ruta}`)).text();

      const preloads = [...html.matchAll(/<link rel="preload" as="image"[^>]*>/g)].map((m) => m[0]);
      expect(preloads.length, `${ruta} sin preload de la foto`).toBeGreaterThan(0);
      expect(preloads.some((t) => t.includes(imagen))).toBe(true);

      // La imagen del hero no puede ir en diferido ni con prioridad baja.
      const img = new RegExp(`<img[^>]*${imagen}[^>]*>`).exec(html)[0];
      expect(img).not.toContain('loading="lazy"');
      expect(img).toContain('fetchpriority="high"');

      await page.goto(`/${ruta}`);
    });
  }

  test('una placa con foto no pinta relleno gris', async ({ page }) => {
    for (const { ruta, placa } of CABECERAS) {
      await page.goto(`/${ruta}`);
      const fondo = await page.evaluate((sel) => {
        const caja = document.querySelector(sel);
        return getComputedStyle(caja).backgroundColor;
      }, placa);
      // --color-surface-page: el hueco se lee como aire, no como bloque gris.
      expect(fondo, `${ruta}: la placa pinta relleno`).toBe('rgb(253, 252, 250)');
    }
  });

  test('el marco del vídeo conserva su relleno', async ({ page }) => {
    await page.goto('/unete.html');
    const fondo = await page.evaluate(() => {
      const marco = document.querySelector('.media');
      return marco ? getComputedStyle(marco).backgroundColor : null;
    });
    if (fondo) expect(fondo).not.toBe('rgb(253, 252, 250)');
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

      /* Quién lleva `js-reveal` lo decide una regla, no el azar: las secciones
       * que arrancan por debajo del primer viewport y que no traen placa (la
       * placa, si la hay, es la que se destapa: ver §destape de las placas). */
      const info = await page.evaluate(() => {
        const sections = [...document.querySelectorAll('main > section')];
        const elegibles = sections
          .filter((s, i) => i > 0 && s.offsetTop >= window.innerHeight)
          .filter((s) => !s.querySelector('.js-placa'));
        const reveladas = sections.filter(
          (s, i) => i > 0 && s.offsetTop >= window.innerHeight && s.classList.contains('js-reveal')
        );
        return {
          total: sections.length,
          elegibles: elegibles.length,
          reveladas: reveladas.map((s) => s.className),
          firstHasReveal: sections[0].classList.contains('js-reveal'),
          above: [...document.querySelectorAll('main > section.js-reveal')]
            .filter((s) => s.offsetTop < window.innerHeight)
            .map((s) => s.className),
          conPlacaYFade: sections
            .filter((s) => s.classList.contains('js-reveal') && s.querySelector('.js-placa'))
            .map((s) => s.className),
        };
      });

      expect(info.total).toBeGreaterThan(1);
      expect(info.firstHasReveal, 'el hero no se anima (above the fold)').toBe(false);
      expect(info.above, 'ninguna sección visible al cargar lleva js-reveal').toEqual([]);
      expect(info.conPlacaYFade, 'la placa sustituye al fade, no se suman').toEqual([]);
      expect(info.reveladas.length, 'se revela exactamente lo elegible').toBe(info.elegibles);
    });

    test(`la sección revelada obtiene .is-visible (${url})`, async ({ page }) => {
      await page.goto(url);
      const target = page.locator('main > section.js-reveal').first();
      // En 1448 Programa no tiene ninguna sección que se funda: sus cuatro
      // llevan placa o quedan sobre el pliegue. El caso ya lo cubre el test
      // anterior; aquí solo se comprueba el recorrido cuando lo hay.
      test.skip((await target.count()) === 0, 'esta página no tiene secciones con fade');
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
