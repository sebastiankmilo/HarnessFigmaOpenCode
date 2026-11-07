/* Navegación entre páginas (sin dependencias).
 *
 * El sitio es multipágina, así que cada clic del nav es una navegación real.
 * Dos mejoras progresivas para que no se sienta como un salto:
 *
 *  1. Prerenderizado de los enlaces locales al pasar el cursor o tocar en
 *     móvil (`speculationrules`). El navegador descarga y renderiza la página
 *     en segundo plano, así el clic la muestra al instante. Si el navegador no
 *     soporta la API, no pasa nada: los enlaces son enlaces normales.
 *  2. El fundido de entrada/salida vive en el CSS (`@view-transition` en
 *     main.css), no aquí.
 *
 * No se prerenderizan enlaces externos, ni los que abren pestaña, ni descargas:
 * solo rutas del propio sitio.
 */
(function () {
  var supportsPrerender =
    HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules");
  if (!supportsPrerender) return;

  // Guarda de datos: en ahorro de datos o conexión lenta, no se adelanta trabajo.
  var connection = navigator.connection;
  if (connection && (connection.saveData || /^(slow-)?2g$/.test(connection.effectiveType || ""))) {
    return;
  }

  var rules = {
    prerender: [
      {
        // `moderate`: al pasar el cursor o al empezar a tocar. Es el equilibrio
        // entre sentirse instantáneo y no descargar media web por adelantado.
        where: {
          and: [
            { href_matches: "/*" },
            { not: { href_matches: "/*\\?*" } },
            { not: { href_matches: "/politica-de-privacidad.html" } },
          ],
        },
        eagerness: "moderate",
      },
    ],
  };

  var script = document.createElement("script");
  script.type = "speculationrules";
  script.textContent = JSON.stringify(rules);
  document.head.appendChild(script);
})();
