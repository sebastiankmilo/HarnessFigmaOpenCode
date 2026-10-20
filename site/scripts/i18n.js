/* Motor de runtime multilenguaje (sin dependencias).
 * Contrato: Especificaciones/docs/Arness/tickets/1-sistema-contenidos-json/
 * (1-tarea-descripcion.md §3.5). La página nace con el locale base ya
 * inyectado en el HTML; este motor solo cambia de idioma en ejecución.
 * API: window.VCI18n.setLocale(locale) / window.VCI18n.getLocale(). */
(function () {
  var STORAGE_KEY = "vc-locale";
  var BASE_LOCALE = "es";

  function lookup(data, key) {
    var node = data;
    var parts = key.split(".");
    for (var i = 0; i < parts.length; i++) {
      if (node === null || typeof node !== "object") return undefined;
      node = node[parts[i]];
    }
    return typeof node === "string" ? node : undefined;
  }

  function apply(data, locale) {
    document.documentElement.lang = locale;
    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var value = lookup(data, nodes[i].getAttribute("data-i18n"));
      // Clave faltante en el locale: se conserva el texto actual (fallback).
      if (value !== undefined) nodes[i].textContent = value;
    }
    syncLangSwitch(locale);
  }

  // Selector ES/PT del nav: refleja el locale activo en el estado del botón.
  function syncLangSwitch(locale) {
    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      var active = buttons[i].getAttribute("data-lang") === locale;
      buttons[i].classList.toggle("is-active", active);
      buttons[i].setAttribute("aria-pressed", active ? "true" : "false");
    }
  }

  function setLocale(locale) {
    return fetch("content/" + locale + ".json")
      .then(function (response) {
        if (!response.ok) throw new Error("HTTP " + response.status);
        return response.json();
      })
      .then(function (data) {
        apply(data, locale);
        try {
          localStorage.setItem(STORAGE_KEY, locale);
        } catch (error) {
          /* almacenamiento no disponible: la página sigue funcionando */
        }
        return locale;
      })
      .catch(function (error) {
        // Locale inexistente o fetch fallido: se conserva el texto actual
        // (el conmutador ya se ha marcado igualmente en bindLangSwitch).
        console.warn(
          '[i18n] no se pudo aplicar el locale "' + locale + '": ' + error +
          ' — si la página está abierta con file:// el navegador bloquea el fetch;' +
          " sírvela con un servidor local."
        );
        return null;
      });
  }

  function getLocale() {
    return document.documentElement.lang || BASE_LOCALE;
  }

  window.VCI18n = { setLocale: setLocale, getLocale: getLocale };

  // Conmutador ES/PT: clic → estado visual inmediato → setLocale (persiste en
  // localStorage) → apply(). El estado se marca antes del fetch para que el
  // conmutador responda aunque la carga del JSON tarde o falle.
  function bindLangSwitch() {
    var buttons = document.querySelectorAll("[data-lang]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (event) {
        var locale = event.currentTarget.getAttribute("data-lang");
        if (locale === getLocale()) return;
        document.documentElement.lang = locale;
        syncLangSwitch(locale);
        setLocale(locale);
      });
    }
    syncLangSwitch(getLocale());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindLangSwitch);
  } else {
    bindLangSwitch();
  }

  var stored = null;
  try {
    stored = localStorage.getItem(STORAGE_KEY);
  } catch (error) {
    stored = null;
  }
  // Solo se aplica un locale elegido explícitamente distinto del base;
  // el texto base ya está estático en el HTML (no hay auto-detección).
  if (stored && stored !== BASE_LOCALE) setLocale(stored);
})();
