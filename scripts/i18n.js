/* Diccionario y conmutador de idioma (sin dependencias).
 *
 * El texto de cada idioma llega ya escrito en el HTML desde el build
 * (scripts/inject-content.mjs): aquí no se traduce nada al cargar. El módulo
 * hace dos cosas:
 *
 *  1. Publica el diccionario del idioma de la página para los componentes que
 *     generan markup en runtime (el diálogo de objetivos de inicio).
 *  2. Hace que el cambio de idioma NO recargue la página: el selector son
 *     enlaces reales (con href y hreflang, para que cada idioma tenga su URL e
 *     índice), pero el clic se intercepta para sustituir el texto en su sitio y
 *     actualizar la URL con history.pushState. Se conserva la posición del
 *     scroll y la tecla Atrás funciona.
 *
 * Degradación: sin JavaScript, o si el diccionario no se puede leer, el enlace
 * navega a la URL del otro idioma, que ya viene traducida desde el build.
 *
 * API: window.VCI18n.getLocale() / getData() / load(locale).
 */
(function () {
  var BASE_LOCALE = "es";

  // Absoluta a propósito: tras `pushState` cambia la URL del documento y una
  // ruta relativa dejaría de resolver contra el mismo sitio.
  var contentBase = new URL(
    document.documentElement.getAttribute("data-content-base") || "content/",
    window.location.href
  ).href;

  var locale = document.documentElement.lang || BASE_LOCALE;
  var currentData = null;
  var cache = {};
  // URL absoluta de cada idioma, leída de los enlaces que genera el build.
  var targets = {};

  function getLocale() {
    return locale;
  }

  function getData() {
    return currentData;
  }

  function lookup(data, key) {
    var node = data;
    var parts = key.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return typeof node === "string" ? node : undefined;
  }

  function load(targetLocale) {
    if (cache[targetLocale]) return Promise.resolve(cache[targetLocale]);
    return fetch(contentBase + targetLocale + ".json")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        cache[targetLocale] = data;
        return data;
      });
  }

  function langLinks() {
    return document.querySelectorAll("[data-lang]");
  }

  // Memoriza a dónde apunta cada idioma antes de tocar nada.
  function readTargets() {
    var links = langLinks();
    for (var i = 0; i < links.length; i++) {
      var key = links[i].getAttribute("data-lang");
      if (key && !targets[key]) {
        targets[key] = new URL(links[i].getAttribute("href"), window.location.href).href;
      }
    }
  }

  function syncSwitcher() {
    var links = langLinks();
    for (var i = 0; i < links.length; i++) {
      var key = links[i].getAttribute("data-lang");
      var active = key === locale;
      links[i].classList.toggle("is-active", active);
      if (active) {
        links[i].setAttribute("aria-current", "true");
      } else {
        links[i].removeAttribute("aria-current");
      }
      // Tras cambiar de idioma, el href relativo del build ya no sirve para el
      // idioma de origen: se reescribe siempre en absoluto.
      if (targets[key]) links[i].setAttribute("href", targets[key]);
    }
  }

  // El <title> también lleva data-i18n, así que se actualiza con el resto.
  function applyTexts(data) {
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var value = lookup(data, nodes[i].getAttribute("data-i18n"));
      // Clave ausente: se conserva el texto actual (el build garantiza paridad).
      if (value !== undefined) nodes[i].textContent = value;
    }
  }

  function localeForUrl(url) {
    var found = BASE_LOCALE;
    for (var key in targets) {
      if (targets[key] === url) found = key;
    }
    return found;
  }

  /** Salta sin animación, aunque la página tenga `scroll-behavior: smooth`. */
  function jumpTo(y) {
    var root = document.documentElement;
    var previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    root.style.scrollBehavior = previous;
  }

  /**
   * Identifica la página con independencia del idioma y del subdirectorio donde
   * esté montado el sitio (aquí se sirve en `/HarnessFigmaOpenCode/site/…`), así
   * que basta con el nombre del archivo: `decalogo.html` ↔ `pt/decalogo.html`.
   */
  function pageKey(href) {
    var path = new URL(href, window.location.href).pathname;
    var last = path.split("/").pop();
    return last || "index.html";
  }

  /**
   * Cambia el idioma sin recargar. `url` es la URL canónica del idioma destino;
   * `push` queda en false al responder a Atrás/Adelante, que ya movieron la URL.
   */
  function switchTo(targetLocale, url, push) {
    if (targetLocale === locale) return Promise.resolve();
    var anchorY = window.scrollY;
    // Red de seguridad: si el navegador lleva el scroll muy lejos del sitio
    // donde estaba (un salto al principio, no el ajuste normal de una o dos
    // líneas de texto que cambian de alto), se repone. El umbral evita pelearse
    // con el anclaje de scroll, que es lo que mantiene el contenido quieto.
    var keepScroll = function () {
      if (Math.abs(window.scrollY - anchorY) > window.innerHeight * 0.5) jumpTo(anchorY);
    };
    return load(targetLocale)
      .then(function (data) {
        var swap = function () {
          locale = targetLocale;
          currentData = data;
          document.documentElement.lang = targetLocale;
          applyTexts(data);
          syncSwitcher();
          if (push && url && window.location.href !== url) {
            window.history.pushState({ locale: targetLocale }, "", url);
          }
        };
        // Mismo fundido que entre páginas (`@view-transition` en main.css) para
        // que el cambio de idioma no se sienta distinto a navegar.
        var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced && document.startViewTransition) {
          var transition = document.startViewTransition(swap);
          if (transition && transition.finished) {
            transition.finished.then(keepScroll, keepScroll);
          }
        } else {
          swap();
          window.requestAnimationFrame(keepScroll);
        }
      })
      .catch(function (error) {
        // Sin diccionario a mano se navega: el HTML del otro idioma ya está
        // traducido, así que el usuario no se queda a medias. Se guarda la
        // posición del scroll para reponerla al llegar (si no, aterrizaría
        // arriba del todo).
        console.warn(
          "[i18n] no pude cambiar a \"" + targetLocale + "\" en sitio: " + error +
            " — se navega a la versión del otro idioma."
        );
        if (url) {
          try {
            sessionStorage.setItem(
              "vc-scroll",
              JSON.stringify({ page: pageKey(url), y: anchorY })
            );
          } catch (storageError) {
            /* almacenamiento no disponible: se navega sin reponer scroll */
          }
          window.location.href = url;
        }
      });
  }

  function onClick(event) {
    // Clic con modificador o botón distinto: que lo maneje el navegador
    // (pestaña nueva, descarga…), que para eso el enlace tiene href real.
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    var key = event.currentTarget.getAttribute("data-lang");
    if (!key || key === locale || !targets[key]) return;
    event.preventDefault();
    switchTo(key, targets[key], true);
  }

  function bindSwitcher() {
    readTargets();
    var links = langLinks();
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", onClick);
      // Precarga del catálogo del otro idioma en cuanto se apunta al selector:
      // así el primer cambio no depende de una descarga a mitad de clic (era
      // el caso en el que el navegador acababa navegando y yéndose arriba).
      var key = links[i].getAttribute("data-lang");
      if (!key || key === locale) continue;
      (function (target) {
        var warm = function () {
          load(target).catch(function () {
            /* si falla, el clic ya tiene su propia ruta de reserva */
          });
        };
        links[i].addEventListener("pointerenter", warm, { once: true });
        links[i].addEventListener("focus", warm, { once: true });
        links[i].addEventListener("touchstart", warm, { once: true, passive: true });
      })(key);
    }
    // Atrás/Adelante devuelven la URL de otro idioma: se reaplica el texto.
    window.addEventListener("popstate", function () {
      var target = localeForUrl(window.location.href);
      if (target !== locale) switchTo(target, null, false);
    });
  }

  window.VCI18n = {
    getLocale: getLocale,
    getData: getData,
    load: load,
  };

  /**
   * Repone el scroll tras la navegación de reserva. Con `file://` el navegador
   * bloquea el fetch y el cambio de idioma no puede hacerse en sitio: se navega
   * a la página hermana, y sin esto el usuario aterrizaría al principio.
   * La marca se empareja por página (sin el prefijo de idioma), así vale también
   * si el servidor redirige o añade una barra.
   */
  function restoreScrollAfterFallback() {
    var saved = null;
    try {
      saved = JSON.parse(sessionStorage.getItem("vc-scroll") || "null");
      if (saved && saved.page) {
        sessionStorage.removeItem("vc-scroll");
        if (saved.page !== pageKey(window.location.href)) saved = null;
      } else {
        saved = null;
      }
    } catch (error) {
      saved = null;
    }
    if (!saved) return;
    // Al `load` las fuentes e imágenes ya ocupan su sitio y la altura es la real.
    var restore = function () {
      jumpTo(saved.y);
    };
    if (document.readyState === "complete") restore();
    else window.addEventListener("load", restore, { once: true });
  }

  restoreScrollAfterFallback();

  // El enlace se intercepta siempre que el DOM esté listo: si luego falta el
  // diccionario, `switchTo` cae en la navegación normal.
  function start() {
    bindSwitcher();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }

  // Carga de mejor esfuerzo del idioma de la página: si falla (p. ej. abierta
  // con file://, donde el navegador bloquea el fetch), `getData()` devuelve
  // null y los componentes se quedan con el texto ya inyectado en el HTML.
  load(locale)
    .then(function (data) {
      currentData = data;
    })
    .catch(function (error) {
      console.warn(
        "[i18n] no pude cargar " + contentBase + locale + ".json: " + error +
          " — si abriste la página con file://, sírvela con un servidor local."
      );
    });
})();
