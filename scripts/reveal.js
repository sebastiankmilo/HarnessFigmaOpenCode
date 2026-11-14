/* Entrada al hacer scroll: recorte de las placas y fundido de las secciones.
 *
 * Dos gestos, de dos fuentes distintas, que NO se suman sobre el mismo bloque:
 *  - el destape de las placas es de la variante editorial (`site_v_impeccable`,
 *    `scripts/revelar.js`): la foto entra recortada un 6 % por arriba y se
 *    descubre en 1 s cuando cruza el viewport;
 *  - el fundido de sección es la nota `4649:2018` de Figma.
 * Decisión 2026-11-14: la sección que trae una placa **no** se funde — se
 * destapa su placa. Es la regla de «un solo gesto por zona» del diseño
 * editorial: si se hicieran los dos, el mismo bloque entraría moviéndose y
 * recortándose a la vez.
 *
 * El fundido solo se aplica por debajo del primer viewport (por Lighthouse);
 * el destape también corre en el primer viewport, como en la variante
 * editorial. Con `prefers-reduced-motion` las clases se añaden igual, pero el
 * CSS no recorta ni oculta nada (ver main.css).
 */
(function () {
  if (!("IntersectionObserver" in window)) return;

  /* ── 1. Placas con foto: se destapan ──────────────────────────── *
   * Se descartan los marcos que solo llevan el iframe del vídeo: recortar un
   * reproductor se ve raro, y no es una foto.
   *
   * Y se descartan las placas que ya están a la vista al cargar. No es un
   * matiz: este script corre después del primer pintado, así que recortar una
   * placa que el usuario ya está viendo le corta el 6 % de arriba de golpe y
   * luego se lo devuelve en 1 s — un parpadeo en toda regla. Es lo que pasaba
   * en el hero de Programa y Decálogo al recargar (medido 2026-11-14: a los
   * 36 ms la foto entera a la vista, a los 51 ms recortada). El destape es
   * para lo que llega con el scroll; lo que ya está en pantalla se queda
   * quieto, igual que el fundido de sección, que tampoco toca el primer
   * viewport (nota 4649:2018). */
  var altoVentana = window.innerHeight;
  var placas = Array.prototype.filter.call(
    document.querySelectorAll("main .media, main .tarjeta-articulo__media"),
    function (placa) {
      if (!placa.querySelector("img")) return false;
      return placa.getBoundingClientRect().top >= altoVentana;
    }
  );

  /* Secciones que ya se animan con su placa: quedan fuera del fundido. Se
   * miran todas las placas —también las que están sobre el pliegue—, porque el
   * reparto «un gesto por zona» no depende de que la placa llegue a destaparse. */
  var conPlaca = [];
  Array.prototype.forEach.call(
    document.querySelectorAll("main .media, main .tarjeta-articulo__media"),
    function (placa) {
      if (!placa.querySelector("img")) return;
      var seccion = placa.closest("main > section");
      if (seccion && conPlaca.indexOf(seccion) === -1) conPlaca.push(seccion);
    }
  );

  /* ── 2. Fundido de las secciones que no tienen placa ──────────── */
  Array.prototype.forEach.call(
    document.querySelectorAll("main > section"),
    function (section, indice) {
      // El primer viewport no se toca: solo las secciones que arrancan más abajo
      if (indice === 0 || section.offsetTop < window.innerHeight) return;
      if (conPlaca.indexOf(section) !== -1) return;
      section.classList.add("js-reveal");
    }
  );

  var secciones = document.querySelectorAll("main > section.js-reveal");
  if (secciones.length) {
    var observadorSecciones = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (!entrada.isIntersecting) return;
          entrada.target.classList.add("is-visible");
          observadorSecciones.unobserve(entrada.target);
        });
      },
      // threshold 0: basta con que el borde superior entre en el viewport (el
      // rootMargin recorta el 10 % inferior). Con una fracción fija (0.05) las
      // secciones más altas que el viewport no la alcanzan nunca —su 5 % no cabe
      // en pantalla— y se quedaban con `opacity: 0` para siempre: es lo que le
      // pasaba a `programa-puntos`, de más de 20 000 px en móvil.
      { rootMargin: "0px 0px -10% 0px", threshold: 0 }
    );
    Array.prototype.forEach.call(secciones, function (seccion) {
      observadorSecciones.observe(seccion);
    });
  }

  /* ── 3. Fotos que llegan tarde: fundido en vez de aparecer de golpe ── *
   * Si la foto todavía no está al cargar la página (caché fría, red lenta),
   * el hueco queda vacío y la imagen aparecía de un salto — el parpadeo que se
   * ve al recargar Programa y Decálogo. Cuando falta, se pinta con un fundido
   * corto. Si ya está (el caso normal con la precarga del <head>), no se toca
   * nada: ni clase ni transición. */
  Array.prototype.forEach.call(
    document.querySelectorAll("main .media__img, main .hero__media"),
    function (imagen) {
      if (imagen.complete) return;
      imagen.classList.add("js-esperando");
      var soltar = function () {
        imagen.classList.remove("js-esperando");
      };
      imagen.addEventListener("load", soltar, { once: true });
      imagen.addEventListener("error", soltar, { once: true });
    }
  );

  /* ── 4. Destape de las placas ─────────────────────────────────── */
  if (!placas.length) return;

  placas.forEach(function (placa) {
    placa.classList.add("js-placa");
  });

  var observadorPlacas = new IntersectionObserver(
    function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        entrada.target.classList.add("is-visible");
        observadorPlacas.unobserve(entrada.target);
      });
    },
    // 8 % por debajo del borde inferior, como en la variante editorial: la
    // placa empieza a destaparse cuando ya se ve, no cuando asoma 1 px.
    { rootMargin: "0px 0px -8% 0px", threshold: 0 }
  );

  placas.forEach(function (placa) {
    observadorPlacas.observe(placa);
  });
})();
