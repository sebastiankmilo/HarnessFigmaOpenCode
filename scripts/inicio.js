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
