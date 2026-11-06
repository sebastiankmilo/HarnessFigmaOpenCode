(function () {
  const menu = document.querySelector(".site-nav__menu");
  const openButton = document.querySelector(".js-menu-open");
  const closeButton = document.querySelector(".js-menu-close");

  if (!menu || !openButton || !closeButton) return;

  // El overlay se oculta con una transición de opacidad de 0,3 s (CSS). Se
  // marca `inert` al cerrar para que, mientras se desvanece, su contenido no
  // sea enfocable; se retira al abrir.
  if (!menu.classList.contains("is-open")) menu.setAttribute("inert", "");

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
    menu.removeAttribute("inert");
    menu.classList.add("is-open");
    menu.removeAttribute("aria-hidden");
    openButton.setAttribute("aria-expanded", "true");
    document.addEventListener("keydown", onKeydown);
    closeButton.focus();
  }

  function close() {
    menu.classList.remove("is-open");
    menu.setAttribute("inert", "");
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
   * la barra se ancla al viewport y, al superar su alto completo, pasa al
   * estado compacto. En xs: 83,38 → 56 (logo 48 → 40); en sm: 75 → 56
   * (48 → 40); en lg: 160 → 83 (96 → 59). El umbral se lee del token de alto
   * completo de cada breakpoint y no de `offsetHeight`: justo al quitar la
   * clase la transición devuelve una altura intermedia. */
  var navRoot = document.querySelector(".site-nav");
  var navInner = document.querySelector(".site-nav__inner");
  var isTablet = window.matchMedia("(min-width: 768px)");
  var isDesktop = window.matchMedia("(min-width: 1448px)");
  var threshold = 0;

  function measure() {
    if (!navRoot || !navInner) return;
    navRoot.classList.remove("is-reduced");
    var token = isDesktop.matches
      ? "--nav-height-lg"
      : isTablet.matches
        ? "--nav-height-sm"
        : "--nav-height-xs";
    var raw = getComputedStyle(navInner).getPropertyValue(token);
    threshold = parseFloat(raw) || navInner.offsetHeight;
    onScroll();
  }

  function onScroll() {
    if (!navRoot) return;
    navRoot.classList.toggle("is-reduced", window.scrollY > threshold);
  }

  if (navRoot && navInner) {
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);
    isTablet.addEventListener("change", measure);
    isDesktop.addEventListener("change", measure);
  }
})();
