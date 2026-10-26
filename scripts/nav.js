(function () {
  const menu = document.querySelector(".site-nav__menu");
  const openButton = document.querySelector(".site-nav__menu-open");
  const closeButton = document.querySelector(".site-nav__menu-close");

  if (!menu || !openButton || !closeButton) return;

  let lastFocused = null;

  function focusables() {
    return Array.prototype.slice
      .call(menu.querySelectorAll("a[href], button:not([disabled])"))
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

  function open() {
    lastFocused = document.activeElement;
    menu.classList.add("is-open");
    menu.removeAttribute("aria-hidden");
    openButton.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeydown);
    closeButton.focus();
  }

  function close() {
    menu.classList.remove("is-open");
    menu.setAttribute("aria-hidden", "true");
    openButton.setAttribute("aria-expanded", "false");
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused && typeof lastFocused.focus === "function") {
      lastFocused.focus();
    }
  }

  openButton.addEventListener("click", open);
  closeButton.addEventListener("click", close);

  /* Navegación reducida (frame `4518:1968`, specs/interactions.md):
   * al superar el alto del header completo en el scroll, la barra pasa al
   * estado compacto (CSS `.is-reduced` en `main.css`, solo ≥1448). */
  var navRoot = document.querySelector(".site-nav");
  var navInner = document.querySelector(".site-nav__inner");
  var isDesktop = window.matchMedia("(min-width: 1448px)");
  var threshold = 0;

  function measure() {
    if (!navRoot || !navInner) return;
    navRoot.classList.remove("is-reduced");
    threshold = navInner.offsetHeight;
    onScroll();
  }

  function onScroll() {
    if (!navRoot || !isDesktop.matches) {
      if (navRoot) navRoot.classList.remove("is-reduced");
      return;
    }
    navRoot.classList.toggle("is-reduced", window.scrollY > threshold);
  }

  if (navRoot && navInner) {
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    isDesktop.addEventListener("change", measure);
  }
})();
