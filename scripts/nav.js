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
})();
