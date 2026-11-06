/* Enlaces configurables (sin dependencias).
 * Contrato: content/enlaces.json.
 *   { "porDefecto": "…", "aporta": "…", "video": "…", "articulos": { "1": "…", … } }
 * Un campo vacío de `aporta`/`articulos` cae en `porDefecto`, así que cambiando
 * ese valor se mueven todos los destinos de una vez. Los HTML llevan ya el href
 * por defecto escrito, de modo que si el fetch falla los enlaces siguen siendo
 * válidos. `video` no se consume aquí: el build lo incrusta como reproductor
 * (`scripts/build/pages.mjs` → `expandVideo`).
 */
(function () {
  var FALLBACK = "https://lamateriaprima.org/";
  // La copia en /pt/ se sirve desde un subdirectorio: la ruta de los datos la
  // publica el build en <html data-content-base>.
  var contentBase =
    document.documentElement.getAttribute("data-content-base") || "content/";

  function destino(cfg, clave) {
    var base = (cfg && typeof cfg.porDefecto === "string" && cfg.porDefecto) || FALLBACK;
    var url = "";
    if (clave === "aporta") {
      url = cfg && typeof cfg.aporta === "string" ? cfg.aporta : "";
    } else if (clave.indexOf("articulo-") === 0) {
      var n = clave.slice("articulo-".length);
      url = cfg && cfg.articulos && typeof cfg.articulos[n] === "string" ? cfg.articulos[n] : "";
    }
    return url || base;
  }

  function aplicar(cfg) {
    var nodos = document.querySelectorAll("[data-enlace]");
    for (var i = 0; i < nodos.length; i++) {
      var url = destino(cfg, nodos[i].getAttribute("data-enlace"));
      if (url) {
        nodos[i].href = url;
      } else {
        nodos[i].removeAttribute("href");
      }
    }
  }

  fetch(contentBase + "enlaces.json")
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(aplicar)
    .catch(function (error) {
      console.warn("[enlaces] no pude leer content/enlaces.json; mantengo los href del HTML: " + error);
    });
})();
