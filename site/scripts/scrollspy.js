/* Scrollspy del índice de puntos (Programa y Decálogo).
 * UIkit Scrollspy Nav (`uikit.min.js`, vendorizado en assets/vendor/uikit)
 * detecta la sección visible y le pone la clase `uk-active` al enlace; aquí
 * se refleja además en `aria-current` para que los lectores de pantalla
 * anuncien la sección actual. El subrayado activo (Figma 4518:2435, token
 * `--color-hover-accent`) cuelga de ambos selectores en main.css. */
(function () {
  function sync(nav) {
    var links = nav.querySelectorAll("a[href]");
    var current = nav.querySelector("a.uk-active");
    for (var i = 0; i < links.length; i++) {
      if (links[i] === current) {
        links[i].setAttribute("aria-current", "true");
      } else {
        links[i].removeAttribute("aria-current");
      }
    }
  }

  var navs = document.querySelectorAll("[uk-scrollspy-nav]");
  for (var i = 0; i < navs.length; i++) {
    (function (nav) {
      nav.addEventListener("active", function () {
        sync(nav);
      });
      sync(nav);
    })(navs[i]);
  }
})();
