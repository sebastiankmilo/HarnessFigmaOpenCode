/* Fades de secciones al entrar en viewport (nota 4649:2018, ticket 4).
 * Especificación: specs/interactions.md §Animaciones — solo se anima lo que
 * está por debajo del primer viewport (sin above-the-fold, por Lighthouse);
 * con prefers-reduced-motion el CSS ya deja todo visible (main.css). */
(function () {
  var sections = document.querySelectorAll("main > section");
  if (!sections.length || !("IntersectionObserver" in window)) return;

  Array.prototype.forEach.call(sections, function (section, i) {
    // El primer viewport no se toca: solo las secciones que arrancan más abajo
    if (i === 0 || section.offsetTop < window.innerHeight) return;
    section.classList.add("js-reveal");
  });

  var targets = document.querySelectorAll("main > section.js-reveal");
  if (!targets.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
  );

  Array.prototype.forEach.call(targets, function (section) {
    observer.observe(section);
  });
})();
