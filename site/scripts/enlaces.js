/* Enlaces configurables (sin dependencias).
 * Contrato: content/enlaces.json.
 *   { "porDefecto": "…", "aporta": "…", "video": "…", "articulos": { "1": "…", … } }
 * Un campo vacío de `aporta`/`articulos` cae en `porDefecto`, así que cambiando
 * ese valor se mueven todos los destinos de una vez. `video` no usa ese
 * fallback: es la URL de YouTube del póster del inicio y solo se pinta si
 * existe. Los HTML llevan ya el href por defecto escrito, de modo que si el
 * fetch falla los enlaces siguen siendo válidos. */
(function () {
  var FALLBACK = "https://lamateriaprima.org/";

  function destino(cfg, clave) {
    if (clave === "video") {
      return cfg && typeof cfg.video === "string" ? cfg.video : "";
    }
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

  // watch?v=…, youtu.be/…, /embed/…, /shorts/… o /live/… → id del vídeo.
  function idDeYouTube(url) {
    if (!url) return "";
    var match = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/
    );
    return match ? match[1] : "";
  }

  /* Fachada: la portada (`video-cover.png`) es ya la captura del reproductor
   * y es lo que mide el baseline, así que no se sustituye por el iframe hasta
   * que el usuario pide reproducir. Sin URL configurada no se hace nada. */
  function montarVideo() {
    var poster = document.querySelector("[data-video]");
    if (!poster) return;
    // `file://` no tiene origen ni referrer: el reproductor incrustado de
    // YouTube responde con el error 153 («Video player configuration error»).
    // En ese caso se deja el enlace tal cual, así que va a YouTube en una
    // pestaña nueva — que sí funciona — en vez de incrustar un reproductor roto.
    if (window.location.protocol === "file:") {
      console.warn(
        "[enlaces] la página está abierta con file://: el vídeo se abrirá en YouTube " +
        "porque el reproductor incrustado necesita un origen http(s). " +
        "Sírvela con un servidor local para verlo dentro de la página."
      );
      return;
    }
    poster.addEventListener("click", function (event) {
      var id = idDeYouTube(poster.getAttribute("href"));
      if (!id) return;
      event.preventDefault();

      var iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      iframe.title = poster.getAttribute("aria-label") || "Vídeo de YouTube";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      poster.parentNode.replaceChild(iframe, poster);
    });
  }

  montarVideo();

  fetch("content/enlaces.json")
    .then(function (response) {
      if (!response.ok) throw new Error("HTTP " + response.status);
      return response.json();
    })
    .then(aplicar)
    .catch(function (error) {
      console.warn("[enlaces] no pude leer content/enlaces.json; mantengo los href del HTML: " + error);
    });
})();
