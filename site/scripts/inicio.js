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

  // Un objetivo = un objeto `inicio.goals.card-N`: `title`, `body-small`
  // (extracto de la card) y `body-complete` (array de párrafos del modal).
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
      node.textContent = texts[i];
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

  function open(card) {
    const index = cards.indexOf(card);
    if (index !== -1) fillDialog(card, index);
    // UIkit usa `target` para devolver el foco al cerrar (y sincronizar
    // `aria-expanded` si la card lo declara).
    modal.target = card;
    modal.show();
  }

  cards.forEach(function (card) {
    card.addEventListener("click", function () {
      open(card);
    });
    card.addEventListener("keydown", function (event) {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        open(card);
      }
    });
  });
})();

/* Carruseles de «Nuestros objetivos» y «La Materia Prima».
 * Contrato: specs/interactions.md — «Carruseles de `inicio`». */
(function () {
  var isDesktop = window.matchMedia("(min-width: 1448px)");
  var isTablet = window.matchMedia("(min-width: 768px) and (max-width: 1447px)");
  // Huecos de la grilla en `lg` (`grid-template-columns: repeat(4, 1fr)`).
  var VISIBLE_LG = 4;

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

    function render() {
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
    }

    function goTo(newIndex) {
      var focusedItem =
        document.activeElement && items.indexOf(document.activeElement) !== -1
          ? document.activeElement
          : null;

      index = (newIndex + items.length) % items.length;
      render();

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
        goTo(index - 1);
      });
    }

    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1);
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
        goTo(index - 1);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1);
      }
    }

    controls.addEventListener("keydown", onKeydown);
    grid.addEventListener("keydown", onKeydown);

    render();

    // Al cruzar un breakpoint hay que rehacer la ventana de tarjetas visibles
    // (y soltar `is-out` si `lg` deja de ser la referencia).
    isDesktop.addEventListener("change", render);
    isTablet.addEventListener("change", render);
  }

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-carousel]"),
    initCarousel
  );
})();
