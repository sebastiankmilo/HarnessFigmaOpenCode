(function () {
  const dialog = document.querySelector(".dialog");
  const cards = Array.prototype.slice.call(document.querySelectorAll(".tarjeta-objetivo"));
  const dialogTitle = dialog ? dialog.querySelector(".dialog__title") : null;
  const dialogContent = dialog ? dialog.querySelector(".dialog__content") : null;

  if (!dialog || !cards.length) return;

  // Modal de UIkit: gestiona apertura/cierre, Escape, clic en el backdrop,
  // foco (trampa y retorno) y el bloqueo del scroll. El contenido se rellena
  // antes de `show()` porque depende de la card pulsada.
  const modal = window.UIkit && window.UIkit.modal
    ? window.UIkit.modal(dialog, { bgClose: true, escClose: true })
    : null;
  if (!modal) return;

  // Un objetivo = un objeto `inicio.goals.card-N`: `title`, `body-complete`
  // (párrafos: el primero es el que enseña la card, recortado por líneas, y
  // todos juntos son el texto del modal) y `body-small` (extracto, solo como
  // reserva si el catálogo no ha llegado todavía).
  function prefixFor(index) {
    return "inicio.goals.card-" + (index + 1);
  }

  function lookup(data, key) {
    let node = data;
    const parts = key.split(".");
    for (let i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return node && typeof node === "object" ? node : undefined;
  }

  // El copy puede traer `**negrita**` o `*cursiva*`: lo resuelve `i18n.js`, que
  // es también quien lo repone cuando cambia el idioma con el diálogo abierto.
  const ponerTexto =
    window.VCI18n && window.VCI18n.ponerTexto
      ? window.VCI18n.ponerTexto
      : function (nodo, texto) {
          nodo.textContent = texto;
        };

  // El número de párrafos varía por objetivo (de 1 a 3): se ajustan los
  // nodos al catálogo y se reapunta `data-i18n` para que un cambio de idioma
  // con el diálogo abierto los vuelva a traducir.
  function setParagraphs(attrs, texts) {
    if (!dialogContent) return;
    let nodes = Array.prototype.slice.call(
      dialogContent.querySelectorAll(".dialog__body")
    );
    while (nodes.length > texts.length) {
      dialogContent.removeChild(nodes.pop());
    }
    while (nodes.length < texts.length) {
      dialogContent.appendChild(nodes[0].cloneNode(true));
      nodes = Array.prototype.slice.call(
        dialogContent.querySelectorAll(".dialog__body")
      );
    }
    nodes.forEach(function (node, i) {
      node.setAttribute("data-i18n", attrs[i]);
      ponerTexto(node, texts[i]);
    });
  }

  function fillDialog(card, index) {
    const prefix = prefixFor(index);
    const data = window.VCI18n ? window.VCI18n.getData() : null;
    const block = lookup(data, prefix);
    const cardTitle = card.querySelector("h3");
    const cardBody = card.querySelector("p");

    if (dialogTitle) {
      const title = block && typeof block.title === "string" ? block.title : null;
      dialogTitle.setAttribute("data-i18n", prefix + ".title");
      dialogTitle.textContent = title || cardTitle.textContent;
    }

    // `body-complete` es el array de párrafos del modal; se publica cada uno
    // con su índice para que i18n lo vuelva a traducir en runtime.
    const bodies =
      block && Array.isArray(block["body-complete"]) ? block["body-complete"] : null;

    if (bodies && bodies.length) {
      setParagraphs(
        bodies.map(function (_, i) {
          return prefix + ".body-complete." + i;
        }),
        bodies
      );
    } else {
      // Sin diccionario todavía (fetch pendiente o fallado): el texto de la card.
      setParagraphs([prefix + ".body-small"], [cardBody ? cardBody.textContent : ""]);
    }
  }

  function open(card, trigger) {
    const index = cards.indexOf(card);
    if (index !== -1) fillDialog(card, index);
    // UIkit usa `target` para devolver el foco al cerrar. El disparador es el
    // <button> de la tarjeta y no el <li>: así el foco vuelve a un control real.
    modal.target = trigger || card;
    modal.show();
  }

  // El disparador es un <button> real, así que ya emite `click` con Intro y
  // Espacio: no hay que simular el teclado a mano. El <li> conserva su rol de
  // list item, y el nombre accesible del botón sale del <h3> vía
  // `aria-labelledby`, que el build traduce como cualquier otro texto.
  cards.forEach(function (card) {
    const trigger = card.querySelector(".tarjeta-objetivo__disparador");
    if (!trigger) return;
    trigger.addEventListener("click", function () {
      open(card, trigger);
    });
  });
})();

/* Carruseles de «Nuestros objetivos» y «La Materia Prima».
 * Contrato: specs/interactions.md — «Carruseles de `inicio`». */
(function () {
  var isDesktop = window.matchMedia("(min-width: 1280px)");
  var isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1279px)");
  // Huecos de la grilla en `lg` (`grid-template-columns: repeat(4, 1fr)`).
  var VISIBLE_LG = 4;

  /* Desplazamiento del carrusel: la misma duración y la misma curva que el
   * carrusel de la variante editorial, para que el gesto sea uno solo. */
  var DESPLAZAMIENTO = 380;
  var reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");

  function initCarousel(grid) {
    var name = grid.getAttribute("data-carousel");
    var controls = document.querySelector('[data-carousel-controls="' + name + '"]');
    if (!controls) return;

    var items = Array.prototype.slice.call(grid.children);
    var dots = Array.prototype.slice.call(controls.querySelectorAll("[data-carousel-dot]"));
    var prev = controls.querySelector("[data-carousel-prev]");
    var next = controls.querySelector("[data-carousel-next]");
    if (!items.length) return;

    var index = 0;
    // Temporizadores por tarjeta: si se pulsa dos veces seguidas, la segunda
    // animación no puede quedarse a medias por el `setTimeout` de la primera.
    var pendientes = new Map();

    function soltar(item) {
      var pendiente = pendientes.get(item);
      if (pendiente) window.clearTimeout(pendiente);
      pendientes.delete(item);
      item.style.transition = "";
      item.style.transform = "";
    }

    /** Desliza las tarjetas de su posición anterior a la nueva (FLIP). */
    function deslizar(antes, direccion) {
      var hueco = parseFloat(getComputedStyle(grid).columnGap) || 0;

      items.forEach(function (item) {
        soltar(item);
        // Oculta: no hay caja que medir ni nada que animar.
        if (item.offsetParent === null) return;

        var despues = item.getBoundingClientRect();
        var previa = antes.get(item);
        var delta;
        if (previa) {
          delta = previa.left - despues.left;
          if (!delta) return;
        } else {
          // Entra desde el lado hacia el que se avanzó: la página «corre» en
          // el sentido contrario al que se pidió, como una tira de película.
          delta = (direccion < 0 ? -1 : 1) * (despues.width + hueco);
        }

        item.style.transition = "none";
        item.style.transform = "translateX(" + delta + "px)";
        window.requestAnimationFrame(function () {
          item.style.transition =
            "transform " + DESPLAZAMIENTO + "ms cubic-bezier(0.16, 1, 0.3, 1)";
          item.style.transform = "translateX(0)";
          pendientes.set(
            item,
            window.setTimeout(function () {
              soltar(item);
            }, DESPLAZAMIENTO + 60)
          );
        });
      });
    }

    function render(animar, direccion) {
      // Estado de partida: solo se mide lo que se estaba viendo.
      var antes = new Map();
      if (animar && !reducirMovimiento.matches) {
        items.forEach(function (item) {
          if (item.offsetParent === null) return;
          antes.set(item, item.getBoundingClientRect());
        });
      }
      var nextIndex = (index + 1) % items.length;
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
        // `is-next` alimenta la ventana de 2 tarjetas de `sm` (inicio.css)
        item.classList.toggle("is-next", i === nextIndex);
        // Ventana: en `lg` solo caben `VISIBLE_LG` tarjetas, así que con más
        // items que huecos las que quedan fuera se ocultan (`is-out`) y las
        // visibles se reordenan, también cuando la vuelta activa items de los
        // extremos a la vez.
        if (isDesktop.matches && items.length > VISIBLE_LG) {
          var offset = ((i - index) % items.length + items.length) % items.length;
          var inside = offset < VISIBLE_LG;
          item.classList.toggle("is-out", !inside);
          item.style.order = inside ? String(offset) : "";
        } else {
          item.classList.remove("is-out");
          item.style.order = "";
        }
      });
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle("is-active", active);
        if (active) {
          dot.setAttribute("aria-current", "true");
        } else {
          dot.removeAttribute("aria-current");
        }
      });

      if (antes.size) deslizar(antes, direccion);
    }

    function goTo(newIndex, direccion) {
      var focusedItem =
        document.activeElement && items.indexOf(document.activeElement) !== -1
          ? document.activeElement
          : null;

      var anterior = index;
      index = (newIndex + items.length) % items.length;
      // Sin dirección explícita se deduce del salto; con un solo paso el signo
      // es el del botón, y así el ciclo (5 → 0 y 0 → 5) también se mueve hacia
      // donde toca en vez de retroceder de golpe.
      var sentido = direccion !== undefined ? direccion : index >= anterior ? 1 : -1;
      render(true, sentido);

      if (isDesktop.matches) {
        // `lg`: las 4 tarjetas siguen visibles; el foco pasa a la del índice.
        items[index].focus();
      } else if (focusedItem) {
        // `xs`: foco en la única visible; `sm`: si salió de la ventana de 2,
        // el foco pasa a la del nuevo índice (interactions.md §Comportamiento).
        var pos = items.indexOf(focusedItem);
        var inWindow = isTablet.matches
          ? pos === index || pos === (index + 1) % items.length
          : pos === index;
        if (!inWindow) {
          items[index].focus();
        }
      }
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(index - 1, -1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1, 1);
      });
    }

    dots.forEach(function (dot) {
      dot.addEventListener("click", function () {
        goTo(Number(dot.getAttribute("data-carousel-dot")));
      });
    });

    function onKeydown(event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1, -1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1, 1);
      }
    }

    controls.addEventListener("keydown", onKeydown);
    grid.addEventListener("keydown", onKeydown);

    render(false, 0);

    // Al cruzar un breakpoint hay que rehacer la ventana de tarjetas visibles
    // (y soltar `is-out` si `lg` deja de ser la referencia).
    isDesktop.addEventListener("change", function () { render(false, 0); });
    isTablet.addEventListener("change", function () { render(false, 0); });
  }

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-carousel]"),
    initCarousel
  );
})();

/* Relleno del texto de las cards de objetivo.
 *
 * La card muestra el texto largo del objetivo (`body-complete`) y lo recorta
 * donde ya no cabe: se reserva el 10 % inferior del alto de la card y el
 * cuerpo se queda con las líneas enteras que entran hasta esa línea, con «…»
 * al final (`-webkit-line-clamp`). El alto de la card lo fija `inicio.css`,
 * no el contenido, así que medir y recortar no se retroalimentan: se puede
 * repetir tantas veces como haga falta sin que la card cambie de tamaño. */
(function () {
  var grid = document.querySelector(".objetivos__grid");
  if (!grid) return;

  var cards = Array.prototype.slice.call(
    grid.querySelectorAll(".tarjeta-objetivo")
  );
  if (!cards.length) return;

  // Aire inferior: 10 % del alto de la card, tal como se pidió.
  var AIRE = 0.1;
  var pendiente = null;

  function ajustar() {
    pendiente = null;
    cards.forEach(function (card) {
      var cuerpo = card.querySelector("p");
      if (!cuerpo) return;

      var caja = card.getBoundingClientRect();
      // Tarjeta oculta por el carrusel: se mide cuando vuelva a verse.
      if (!caja.height) return;

      var corte = caja.top + caja.height * (1 - AIRE);
      var arriba = cuerpo.getBoundingClientRect().top;
      var alto = parseFloat(window.getComputedStyle(cuerpo).lineHeight) || 24;
      var lineas = Math.max(1, Math.floor((corte - arriba) / alto));

      cuerpo.style.setProperty("--lineas", String(lineas));
    });
  }

  // Se agrupa en un frame: `resize` y el observer llegan a ráfagas.
  function programar() {
    if (pendiente) window.cancelAnimationFrame(pendiente);
    pendiente = window.requestAnimationFrame(ajustar);
  }

  programar();

  // Las medidas dependen de la tipografía real: hasta que DM Sans no carga,
  // el navegador mide con la de reserva y el corte cae en otro sitio.
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(programar);
  }

  window.addEventListener("resize", programar);

  // El carrusel muestra u oculta tarjetas cambiando clases, y el cambio de
  // idioma reescribe el texto: las dos cosas mueven la línea de corte. Los
  // `style` que escribe `ajustar` no están en el filtro, así que no se
  // realimenta.
  if (window.MutationObserver) {
    new MutationObserver(programar).observe(grid, {
      attributes: true,
      attributeFilter: ["class"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }
})();
