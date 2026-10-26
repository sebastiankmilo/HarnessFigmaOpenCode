(function () {
  const dialog = document.querySelector(".dialog");
  const cards = Array.prototype.slice.call(document.querySelectorAll(".goal-card"));
  const closeButton = dialog ? dialog.querySelector(".dialog__close") : null;
  const dialogTitle = dialog ? dialog.querySelector(".dialog__title") : null;
  const dialogContent = dialog ? dialog.querySelector(".dialog__content") : null;

  if (!dialog || !cards.length || !closeButton) return;

  // `inicio.dialog` (objetivo 1 conserva su key original) y `inicio.dialog-N`
  // para el resto: título + `body-1..body-N` desarrollados en content/es.json.
  function prefixFor(index) {
    return index === 0 ? "inicio.dialog" : "inicio.dialog-" + (index + 1);
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
      dialogTitle.setAttribute("data-i18n", title ? prefix + ".title" : "inicio.goals.card-" + (index + 1) + ".title");
      dialogTitle.textContent = title || cardTitle.textContent;
    }

    const bodyKeys = block
      ? Object.keys(block)
          .filter(function (key) {
            return /^body-\d+$/.test(key);
          })
          .sort()
      : [];

    if (bodyKeys.length) {
      setParagraphs(
        bodyKeys.map(function (key) {
          return prefix + "." + key;
        }),
        bodyKeys.map(function (key) {
          return block[key];
        })
      );
    } else {
      // Sin diccionario todavía (fetch pendiente o fallado): el texto de la card.
      setParagraphs(
        ["inicio.goals.card-" + (index + 1) + ".body"],
        [cardBody ? cardBody.textContent : ""]
      );
    }
  }

  let lastFocused = null;

  function focusables() {
    return Array.prototype.slice
      .call(dialog.querySelectorAll("a[href], button:not([disabled])"))
      .filter(function (el) {
        return el.offsetParent !== null;
      });
  }

  function onKeydown(event) {
    if (event.key === "Escape") {
      close();
      return;
    }
    if (event.key !== "Tab") return;

    const items = focusables();
    if (!items.length) return;

    const first = items[0];
    const last = items[items.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  var closeTimer = null;

  function open(card) {
    lastFocused = card;
    // Texto del diálogo = `inicio.dialog-N` del JSON (el objetivo 1 conserva
    // `inicio.dialog`); el título y los cuerpos salen del catálogo activo para
    // que ya salgan en el idioma en curso. Si el JSON aún no está cargado, se
    // recurre al texto de la propia card.
    const index = cards.indexOf(card);
    if (index !== -1) fillDialog(card, index);
    if (closeTimer) {
      clearTimeout(closeTimer);
      closeTimer = null;
    }
    dialog.hidden = false;
    dialog.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", onKeydown);
    // Fade del backdrop y del panel (nota 4649:2017) en el siguiente frame
    requestAnimationFrame(function () {
      dialog.classList.add("is-open");
    });
    closeButton.focus();
  }

  function close() {
    dialog.classList.remove("is-open");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
    if (reduceMotion.matches) {
      dialog.hidden = true;
      dialog.setAttribute("aria-hidden", "true");
      return;
    }
    closeTimer = setTimeout(function () {
      dialog.hidden = true;
      dialog.setAttribute("aria-hidden", "true");
      closeTimer = null;
    }, 300);
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

  closeButton.addEventListener("click", close);
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
