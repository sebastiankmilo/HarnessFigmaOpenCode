(function () {
  const dialog = document.querySelector(".dialog");
  const cards = Array.prototype.slice.call(document.querySelectorAll(".goal-card"));
  const closeButton = dialog ? dialog.querySelector(".dialog__close") : null;

  if (!dialog || !cards.length || !closeButton) return;

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

  function open(card) {
    lastFocused = card;
    dialog.hidden = false;
    dialog.setAttribute("aria-hidden", "false");
    document.addEventListener("keydown", onKeydown);
    closeButton.focus();
  }

  function close() {
    dialog.hidden = true;
    dialog.setAttribute("aria-hidden", "true");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
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
      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
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
      } else if (focusedItem && focusedItem !== items[index]) {
        // `xs`: si el foco quedó en una tarjeta oculta, va a la visible.
        items[index].focus();
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
  }

  Array.prototype.forEach.call(
    document.querySelectorAll("[data-carousel]"),
    initCarousel
  );
})();
