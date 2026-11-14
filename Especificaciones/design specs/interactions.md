---
fuente: Figma — página `1448-lg` (`110:1162`) — `get_reactions` + frame `hovers` (`4518:2148`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_node_info, get_reactions, scan_nodes_by_types`)
---

# Interacciones y flujos

`get_reactions` con `nodeIds: ["110:1162"]` devuelve **220 nodos con reacciones**
y **224 acciones** en total.

| Tipo de acción | Nº |
| --- | --- |
| `NODE` (navegar / abrir overlay) | 117 |
| `URL` (enlace externo) | 104 |
| `CLOSE` (cerrar overlay) | 3 |

| Trigger | Nº |
| --- | --- |
| `ON_CLICK` | 220 |
| `ON_DRAG` | 4 |

| Navegación | Transición | Nº |
| --- | --- | --- |
| `NAVIGATE` | `DISSOLVE` 0,3 s `EASE_OUT` | 99 |
| `NAVIGATE` | sin transición | 4 |
| `OVERLAY` | `DISSOLVE` 0,3 s | 10 |
| `OVERLAY` | `MOVE_IN` 0,3 s | 4 |

## Flujos de navegación

| Origen | Trigger | Destino | Nodo destino | Verificación |
| --- | --- | --- | --- | --- |
| `inicio` › hero › botón «Nuestro programa» | click | `Programa` | `2328:4307` | URL + visión vs `baseline/programa-1448.png` |
| `inicio` › hero › botón «Únete» | click | `Únete` | `2335:1229` | URL + visión vs `baseline/unete-1448.png` |
| `inicio` › `seccion-objetivos` › CTA | click | `Programa` | `2328:4307` | ídem |
| `inicio` › `seccion-objetivos` › `goal-card` | click / drag | **overlay** `Objetivo-modal` | `2358:932` | dialog visible + visión vs `baseline/objetivo-modal-1448.png` |
| `Objetivo-modal` › `icons/close` | click | `CLOSE` | — | aserción funcional: dialog oculto |
| `Objetivo-modal` › CTA | click | `Programa` | `2328:4307` | navegación |
| `nav > right-nav > links > link` (todas las páginas) | click | `Programa` / `Decálogo` / `Únete` | `2328:4307` / `2334:1005` / `2335:1229` | navegación |
| `nav > logo` / `logo-dorado` | click | `inicio` | `110:2277` | navegación |
| `footer > Frame 5 > <enlace>` | click | su página | — | navegación |
| `footer > icons/logo` | click | `inicio` | `110:2277` | navegación |
| `footer > platforms > icons/*` | click | **URL** externa | Facebook/Instagram/YouTube/X/TikTok | aserción de `href` |
| `inicio` › `sección-La-Materia-Prima` › `container-and-card` | click | **URL** `lamateriaprima.org` | 4 artículos | aserción de `href` |
| `Decálogo` / `Programa` › `sección-puntos` › CTA | click | `Únete` | `2335:1229` | navegación |
| `Política` › CTA | click | `inicio` | `110:2277` | navegación |

> El enlace de la **página actual** en `nav` y en `footer` apunta a
> `destinationId: null` en su frame de origen: es el estado «estás aquí».

## Animaciones y transiciones

Fuente: los 6 nodos `TEXT` sueltos de `1448-lg` con las indicaciones del
diseñador + las transiciones del prototipo (`get_reactions`).

### Indicaciones del diseñador (nodos `TEXT` de la página)

| Nodo | Indicación | Dónde se aplica |
| --- | --- | --- |
| `4649:2012` | `:hover { transition: all .4s ease; }` en enlaces, botones y tarjetas | `.btn`, `.goal-card`, `.article-card`, `.site-nav__link`, `.site-footer__links a`, `.page-index a` |
| `4649:2013` | enlaces: `text-decoration: none; border-bottom: 1px solid (color); padding-bottom: .015rem` | subrayado de enlaces |
| `4649:2014` | `html { scroll-behavior: smooth; }` en Decálogo y Programa | `html.has-smooth-scroll` |
| `4649:2016` | slideshow de tarjetas tipo <https://jitter.video> | carruseles de `inicio` |
| `4649:2017` | modales estilo UIkit, backdrop `rgba(0,0,0,0.25)` | `Objetivo-modal` |
| `4649:2018` | fades sutiles tipo scrollspy al entrar cada sección, **sin animar el above the fold** (impacta Lighthouse) | `main > section` |

### Transiciones del prototipo (`get_reactions`)

| Acción | Transición | Nº |
| --- | --- | --- |
| `NAVIGATE` | `DISSOLVE` · `EASE_OUT` · **0,3 s** | 99 |
| `OVERLAY` | `DISSOLVE` · **0,3 s** | 10 |
| `OVERLAY` | `MOVE_IN` · **0,3 s** | 4 |
| `NAVIGATE` | sin transición | 4 |

> Los estados hover de `hovers` (`4518:2148`) **no tienen `reactions` propias**:
> su duración y easing son los de `4649:2012` (0,4 s `ease`), no los del
> prototipo.

### Modal de objetivos (UIkit)

El overlay de `Objetivo-modal` usa el componente **Modal de UIkit**
(`assets/vendor/uikit/uikit.min.js`, ya vendorizado para Scrollspy Nav):
`uk-modal` en el contenedor, `uk-modal-dialog` en el panel y
`uk-modal-close` en el cierre. UIkit gestiona `uk-open`, `Escape`, el clic
en el backdrop, el foco (trampa y retorno a la card de origen),
`role="dialog"`/`aria-modal` y el bloqueo del scroll de la página.

El contenido de cada objetivo se rellena antes de `show()` desde
`content/es.json` (`inicio.goals.card-N`: `title`, `body-small` y
`body-complete`). La card muestra un **extracto de 3 líneas** del cuerpo
(`paragraphs/s`, 16/24); el modal el **texto completo** (`paragraphs/base`,
18/30,96). La estética sigue siendo la del diseño: en `lg`, panel 1024×604
con cuerpo de 233; en `sm`, panel del **90% del ancho y el 90% del alto del
viewport** (decisión 2026-11-03; el frame medía 720×624) con título y CTA
fijos y el cuerpo scrolleable si el texto no cabe; en `xs`, el panel también
ocupa el **90% del ancho y el 90% del alto del viewport** (el frame medía
343×1095), con el cuerpo scrollable y título/CTA fijos. El backdrop
`rgba(0,0,0,0.25)` y la transición de 0,3 s se aplican en los tres
breakpoints, sobre las clases de estado de UIkit.

### Menú de navegación (overlay sm/xs)

El overlay `#site-menu` se abre y se cierra con un fade de **0,3 s**; el
contenido (logo, enlaces, Aporta, redes e idioma) entra desde `translateY(12px)`
con el mismo fade. La `visibility` del overlay se retrasa 0,3 s al cerrar para
que la animación se vea y después queda oculto; en ese momento se marca
`inert` + `aria-hidden` para que su contenido no sea enfocable.

No hay una animación definida en Figma para este overlay: es una **decisión de
implementación (2026-11-03)**, basada en el mismo movimiento de 0,3 s del
resto del sitio.

### Entrada del hero (`inicio`, `programa`, `decalogo`)

**No viene de Figma.** Es la entrada de la portada de la variante editorial
(`site_v_impeccable/styles/inicio.css`, `.portada`), traída al hero de `site/`
a pedido del equipo el 2026-11-14: el gesto se aprobó, la puesta en página de
esa variante no. Desde ese mismo día la comparten las tres cabeceras —
Programa y Decálogo la recibieron después, porque sus heroes se sentían ajenos
al resto—. Vive en `site/styles/main.css` (un solo bloque y unos solos
`@keyframes`) y el script que la sincroniza está en el `<head>` de las tres
páginas.

| Elemento | Gesto | Propiedad | Duración | Retardo |
| --- | --- | --- | --- | --- |
| Titular (`.hero__title`, `.programa-hero__title`, `.decalogo-hero__title`) | barrido de tinta, izquierda → derecha | `clip-path: inset(0 100% 0 0)` → `inset(0)` | `--duracion-entrada` 1,05 s | — |
| Foto (`.hero__media` y el `.media__img` de los dos heroes interiores) | la foto se asienta | `transform: scale(1.05)` → `none` | `--duracion-entrada-placa` 1,5 s | — |
| Entradilla | fundido + subida de 14 px | `opacity` 0→1 y `translateY` | `--duracion-entrada-texto` 0,9 s | `--retardo-entrada-1` 0,12 s |
| Botones de la portada | ídem | ídem | 0,9 s | `--retardo-entrada-2` 0,22 s |

En Programa la segunda entradilla arranca con el retardo 2, para que la
cascada no salga plana. En los heroes interiores el 5 % que crece la foto lo
recorta el `overflow: hidden` del marco (`.programa-hero .media` y
`.decalogo-hero .media`); en la portada lo hace el `overflow-x: clip` de
`.hero`.

Curva única `--curva-salida` (`cubic-bezier(0.16, 1, 0.3, 1)`) y
`animation-fill-mode: both` en las cuatro.

**Arranque en pausa.** No arrancan solas: el script inline del `<head>` de
`index.html` pone `js-entrada` en `<html>` antes del primer cuadro y el CSS
las deja en `animation-play-state: paused`; cuando el documento y las fuentes
están listos (`DOMContentLoaded` + `document.fonts.ready`) se cambia a
`con-entrada` y corren. Es una decisión de implementación (2026-11-14) medida,
no un gusto: en esta carpeta el arranque ejecuta UIkit (154 KB), el catálogo de
idioma y el carrusel, y con la animación arrancando desde el primer cuadro esos
150–300 ms se comían el principio del barrido — el titular aparecía de golpe ya
descubierto un tercio (medido: primer cuadro visible con el 65 % aún recortado).
Pausada antes del primer cuadro, el barrido empieza en el primer cuadro libre
(primer cuadro visible con el 90 % recortado, es decir el 10 % ya impreso).
Sin JS no se pone ninguna de las dos clases y el hero se ve entero desde el
primer cuadro.

**Relación con `4649:2018`.** Esa nota pide *fades de scrollspy sin animar el
above the fold* por Lighthouse, y se sigue cumpliendo: `reveal.js` continúa sin
tocar la primera sección. La entrada de la portada es otra cosa —ocurre una
sola vez, en la carga, y no depende del scroll—, pero conviene tenerla
presente: es contenido animado sobre el primer viewport.

**Sobrante del 5 %.** La foto crece 2,5 % por lado al arrancar; `.hero` lleva
`overflow-x: clip` para que ese sobrante no abra scroll lateral entre 375 y
767 px. Se usa `clip` y no `hidden` porque no crea contenedor de scroll ni
altera el colapso de márgenes: el hueco media → texto (`--space-5`, 32 px)
sigue midiendo lo mismo. En `lg` el `overflow: hidden` del bloque de
escritorio ya cubría el eje vertical.

**Modo reducido.** El bloque global de `main.css` pone a cero duración,
retardo e iteración, así que los cuatro elementos nacen en su estado final.

### Carga de las fotos de cabecera (decisión 2026-11-14)

Al recargar Programa, Decálogo o Inicio se veía un parpadeo con un bloque gris
en el hueco de la foto. Medido con caché fría y red lenta: el relleno gris del
`.media` (`#d6d6d6` en el hero, `#ebebeb` en las demás) se quedaba **más de
tres segundos** a la vista mientras la foto viajaba.

Dos correcciones:

1. **La foto del hero no se carga en diferido.** `programa-header.webp` y
   `decalogo-header.webp` llevaban `loading="lazy"`: era el elemento LCP de la
   página pidiéndose tarde. Ahora van con `fetchpriority="high"` y se precargan
   desde el `<head>` (`rel="preload" as="image"`). En Inicio se precargan las
   dos variantes del `<picture>` con la misma media query que el `<source>`
   (1448 usa `hero.webp`, por debajo de 1280 `hero-media-compact.webp`).
2. **Una placa con foto no pinta relleno gris.** `.media:has(> .media__img)`
   toma el fondo de página. Los grises de los modificadores son rellenos del
   wireframe y solo se veían mientras la foto llegaba; con el fondo de página
   el hueco se lee como aire. Los marcos del vídeo (con `iframe`) conservan su
   relleno.

Tras el cambio, en recarga la placa pasa de la foto a la foto: no queda ningún
fotograma gris.

### Destape de las placas al entrar en pantalla (decisión 2026-11-14)

Las fotos grandes entran con el **6 % de arriba recortado** y se descubren en
**1 s** (`--recorte-placa`, `--duracion-placa`, curva `--curva-salida`) cuando
cruzan el viewport. No se desplazan ni cambian de opacidad: como el borde
inferior no se mueve, la imagen parece salir de abajo — un recorte de imprenta,
no un fundido. Es el gesto de la variante editorial (`site_v_impeccable`,
`revelar.js` + `base.css`).

**Reparto con la nota `4649:2018` (fade de sección).** Los dos gestos no se
suman sobre el mismo bloque: `site/scripts/reveal.js` deja fuera del fundido la
sección que trae una placa, así que esa zona tiene un solo gesto —el de su
placa— y las secciones sin foto conservan el fade que pidió Figma. Opción
elegida por el equipo entre las tres que se plantearon (sumar los dos, repartir,
o quedarse solo con el destape).

| Página | Se funde | Se destapa |
| --- | --- | --- |
| Inicio | «Objetivos», «Vídeo» | «Artículos» (4 placas) y «Únete» (1) |
| Programa | «Puntos» | «Ejes» (1) y «Materialismo» (2) |
| Decálogo | «Puntos» | — (su única placa está en la cabecera) |
| Únete | la única sección | — (no tiene fotos) |

El reparto no depende de que la placa llegue a destaparse: la sección con placa
nunca se funde, aunque su placa quede sobre el pliegue y por tanto quieta.

Los marcos que solo llevan el **iframe del vídeo** quedan fuera: recortar un
reproductor no es una placa. En xs y sm el diseño esconde las medias de
Programa (`.programa-ejes .media { display: none }`), así que allí no hay nada
que destapar.

**Solo las placas que llegan con el scroll.** El destape lo pone JS después del
primer pintado, así que recortar una placa que el usuario ya está viendo le
cortaba el 6 % de arriba de golpe y se lo devolvía en 1 s: un parpadeo. Se mide
en `reveal.js` por la posición inicial y quedan fuera las que ya están sobre el
pliegue (en Programa y Decálogo, su cabecera). Es la misma regla que el fade de
sección de `4649:2018`: lo que se ve al entrar no se anima. La clase la pone
JS, así que sin JavaScript no hay recorte; con `prefers-reduced-motion`
tampoco.

### Fundido entre páginas y cambio de idioma (decisión 2026-11-14)

El fundido de la View Transitions API es **simétrico y de 0,28 s** en las dos
capas de la raíz (`--duracion-pagina`), igual que la variante editorial
(`site_v_impeccable/styles/base.css`). Se usan las curvas del navegador
(`-ua-view-transition-fade-out` / `-ua-view-transition-fade-in`) y **no**
`@keyframes` propios.

Antes eran **0,16 s de salida y 0,26 s de entrada**, con `ease` y `both`: la
capa que salía se apagaba mucho antes de que la entrante llegara a opaca.

| | suma de opacidades de las dos capas |
| --- | --- |
| 0,16 / 0,26 (asimétrico) | cae a **0,64** y se queda por debajo de 0,95 durante 12 de 16 cuadros |
| 0,28 / 0,28 (simétrico) | **1** en los 15 cuadros del cruce |

Con la suma por debajo de 1 el contenido se destiñe hacia el fondo y vuelve:
ese es el parpadeo que se notaba al navegar. Lo mide
`tests/test-vanguardia/animations.spec.js` §fundido entre páginas.

El cambio de idioma (`document.startViewTransition` en `scripts/i18n.js`)
hereda exactamente este mismo fundido, porque no tiene reglas propias: medido
en `::view-transition-old/new(root)`, las dos capas dan 280 ms en navegación y
en idioma, con los mismos nombres de animación que la variante editorial.

**Punto de lectura.** Al cambiar de idioma se conserva el bloque de texto que
se estaba leyendo, no el píxel de scroll: `captureReadingPoint` guarda la clave
del copy y la parte de ese bloque que quedaba por encima del viewport, y
`restoreReadingPoint` lo devuelve a su sitio. Hacía falta porque el largo cambia
mucho entre idiomas —`programa-puntos` mide 13 736 px en español y 6 461 en
portugués— y con el anclaje anterior el lector aterrizaba en otra sección, como
si la página empezara de nuevo. Se aplica **dentro** del `swap`, antes de que el
navegador tome la instantánea, para que el cruce no se vea saltar.

> El prototipo de Figma pide `NAVIGATE · DISSOLVE · EASE_OUT · 0,3 s`. Los
> 0,28 s del sistema son la misma intención con el valor que ya usa la marca en
> el resto del sitio; no se cambia a 0,3 s para no partir el vocabulario.

### Carrusel de objetivos: deslizamiento y hover (decisión 2026-11-14)

El carrusel de «Nuestros objetivos» ya era cíclico, pero cambiaba de ventana de
golpe: `render()` reordenaba con `order` y ocultaba las fichas de fuera, sin
ningún movimiento. Ahora el cambio de ventana **se desliza** con FLIP, el mismo
gesto que el carrusel de la variante editorial (`carrusel.js`):

- se miden las fichas visibles antes de reordenar;
- tras el reordenado, cada ficha viaja de su posición anterior a la nueva con
  `transform: translateX()`, **380 ms** y `cubic-bezier(0.16, 1, 0.3, 1)`;
- la ficha que entra lo hace desde el lado contrario al avance, así que la tira
  parece correr: `siguiente` empuja hacia la izquierda y `anterior` hacia la
  derecha;
- el sentido se pasa explícito desde flechas y teclado, de modo que el salto
  cíclico (5 → 0 y 0 → 5) también se mueve hacia donde toca en vez de retroceder
  de golpe. Los puntos usan el signo del salto.

Con `prefers-reduced-motion` no se mide ni se anima: el cambio es instantáneo,
como antes.

**Hover de las fichas.** `.objetivos .tarjeta-objetivo:hover` crece a
`scale: 1.02` en `--duracion-media` con `--curva-salida`, y vuelve sola al salir.
**No cambia de fondo**: el par `#fdfcfa ↔ #f0ece6` de la nota `4649:2012` se
retiró para las fichas de objetivos (decisión 2026-11-14, a pedido del equipo:
el recuadro del texto se teñía al pasar el cursor). Las tarjetas de artículo
conservan ese hover.
Se anima la propiedad **`scale`** y no `transform` a propósito: el carrusel
escribe `transform` en línea para deslizar, y con `transform` el hover se
pelearía con el desplazamiento. Va dentro de `@media (hover: hover)` para que en
táctil no se quede pegada tras el toque. El fondo (`--color-card-hover`, 0,4 s)
se mantiene como estaba.

### Raya del enlace del nav (decisión 2026-11-14)

Los cuatro enlaces de la barra —Programa, Decálogo, Únete y La Materia Prima—
llevan una raya del color de acento (`#ff4520`) bajo el texto que **crece
desde la izquierda** al pasar el cursor: `transform: scaleX(0)` → `scaleX(1)`,
`--duracion-media` 0,5 s con `--curva-salida`, como la variante editorial.

Antes la raya era transparente y cambiaba a rojo de golpe: el
`transition: all 0.4s ease` de `4649:2012` se aplica al enlace, pero **no
alcanza a los pseudoelementos**, así que el hover no tenía animación ninguna.

El grosor se queda en **1,5 px** (`--nav-underline-lg`), que es el medido en
Figma; lo que se adopta es el movimiento, no la medida. El enlace de la página
actual (`is-current`) lleva la raya puesta desde el primer cuadro.

### Barra: filete de cierre y carga sin salto (decisión 2026-11-14)

Ninguna de las dos cosas viene del frame de Figma; las dos se adoptan de la
variante editorial (`site_v_impeccable/`) a pedido del equipo.

**Filete inferior.** La barra cierra con una línea de 1 px
(`--color-linea-nav`, `#d7cdbc`, el `--color-linea` de la variante) en los tres
breakpoints. Se dibuja con `.site-nav::after` absoluto y **no** con
`border-bottom`: un borde sumaría 1 px al alto de la barra fija, que `body`
reserva con `padding-top` exacto (`--nav-height-xs`, 83,38 en xs), y el
contenido quedaría 1 px por debajo. En la barra reducida el filete sigue en el
borde inferior de los 56/83 px.

**Sin salto de letras al cargar.** Las dos fuentes se precargan en el `<head>`
de las 8 páginas (`preload as="font" crossorigin`, ruta con `../` en `pt/`).
Sin eso, DM Sans llegaba después del primer pintado y el `font-display: swap`
cambiaba el ancho de los enlaces del nav — medido a 1448: el enlace `Programa`
pasaba de 98 a 95 px y, como la fila va alineada a la derecha, las letras se
desplazaban solas a los ~130 ms. No era una animación: era el intercambio de
fuentes. Con la precarga el ancho y la posición quedan fijos desde el primer
cuadro en los tres anchos. Lo vigila `tests/test-vanguardia/barra.spec.js`.



## Navegación reducida

Frame **`4518:1968`** de `1448-lg` — **1448×83**, relleno `#fdfcfa`.

Es el estado **colapsado de la barra del nav** al hacer scroll. No es una
pantalla: es la misma `size=lg` (1448×**160**) reducida a **83**.

| Propiedad | Valor | Nodo |
| --- | --- | --- |
| Tamaño | 1448×**83** | `4518:1968` |
| Fondo | `#fdfcfa` | relleno del frame |
| Contenido | `logo-color` `4518:1969`, `right-nav` `4518:2074` (4 `link`), `buttons` `4518:2088`, `platforms, search and toggle` `4518:2091`, selector de idioma `4672:2974` | hijos directos |

**Comportamiento:** al superar en el scroll el alto de la barra completa
(160 px), la barra pasa a 83 px. Tamaño completo → reducido: **160 → 83**.
La barra es `position: fixed` y `body` reserva su alto con `padding-top`.

### `sm` (768) — decisión 2026-11-03

La página `1024-sm` **no trae variante reducida**: solo la barra de 75. Por
decisión del equipo se aplica el mismo comportamiento que en `lg` con medidas
propias de tablet:

| Breakpoint | Alto completo | Alto reducido | Logo completo / reducido |
| --- | --- | --- | --- |
| `xs` | 83,38 | **56** | 48 → **40** |
| `sm` | 75 | **56** | 48 → **40** |
| `lg` | 160 | 83 | 96 → 59 |

El umbral es el alto completo (83,38 en xs, 75 en sm, 160 en lg). En los tres
la barra es `position: fixed`, `body` reserva su altura en `padding-top` y el
paso a `.is-reduced` transiciona el alto (y el ancho del logo) en 0,3 s.
Tokens: `--nav-height-xs-reduced`, `--nav-logo-xs-reduced`,
`--nav-height-sm-reduced`, `--nav-logo-sm-reduced` y `--nav-height-reduced`.

## Carruseles de `inicio`

Dos carruseles, ambos en `1448-lg`:

| Carrusel | Nodo | Ítems | Controles |
| --- | --- | --- | --- |
| Nuestros objetivos | `seccion-objetivos` `2326:4021` › `objetivos-tarjetas` | 4 × `goal-card` (`2326:3926`, `2326:3937`, `2326:3948`, `2326:3959`) | `Frame 1` con `icons/prev`, `components/dotnav` `2326:4033` (80×8, 4 puntos), `icons/next` |
| La Materia Prima | `sección-La-Materia-Prima` `2328:4236` › `artículos` | 4 × `container-and-card` (`2326:4137`, `2326:4173`, `2326:4185`, `2326:4197`) | mismos controles |

- `components/dotnav` `114:6780`: 4 elipses de 8×8, la activa rellena y las
  otras vacías → es el indicador de índice.
- Las 4 `goal-card` tienen `ON_DRAG` → `OVERLAY` además del `ON_CLICK`.
- En `hovers` los controles aparecen como par `Frame 1` `4518:2274` ↔
  `Frame 2` `4518:2287`.

**Estado por breakpoint:**
- `lg` (1448): las 4 tarjetas visibles a la vez.
- `sm` (768): ventana de **2 tarjetas** y los controles **no se dibujan** —
  en `1024-sm`, `seccion-objetivos` `2408:1650` no trae `Frame 1` de controles.
- `xs` (375): 1 tarjeta.

## Comportamiento

Reglas de interacción que no son ni navegación ni animación:

| Elemento | Regla |
| --- | --- |
| `goal-card` | `ON_CLICK` y `ON_DRAG` abren `Objetivo-modal` como `OVERLAY` (las 4 tarjetas) |
| `Objetivo-modal` | `icons/close` `2358:1153` → `CLOSE`; el CTA navega a `Programa` |
| Carrusel (`lg`) | al cambiar de índice, el foco pasa a la tarjeta del nuevo índice |
| Carrusel (`sm`) | el foco solo se mueve si la tarjeta enfocada sale de la ventana de 2 |
| Carrusel (`xs`) | el foco queda en la única tarjeta visible |
| Enlace de la página actual | `destinationId: null` (estado «estás aquí») |
| Selector ES/PT | **sin reacciones** en el prototipo |

## Estados interactivos por componente

Los estados hover **no son variantes del `COMPONENT_SET`**: están dibujados en
el frame **`hovers` `4518:2148`** de `1448-lg`, en pares default ↔ hover, con un
grupo `cursor` (y el frame `icons8-hand-cursor 1` `4519:2484`) marcando el
puntero.

| Elemento | Default | Hover | Nodos del par |
| --- | --- | --- | --- |
| Enlaces de `right-nav` | `Line 8` stroke `#ffffff` (invisible) | `Line 8` stroke **`#ff4520`** | `4672:3060` (`right-nav`) |
| Selector ES/PT | `PT` en `#9e9382`, separador `/` en `#30250f` | — | `4672:2992` (`links`) |
| `goal-card` | fondo `#fdfcfa` | fondo **`#f0ece6`** | `4518:2257` ↔ `4518:2267` |
| `buttons` | relleno `#ffcd00` | outline `#30250f` | pares `4518:2149`/`2157`/`2164`/`2167` |
| `container-and-card` | — | — | `4518:2299` ↔ `4518:2309` |
| `footer` | — | — | `4518:2316` ↔ `4518:2363` |
| `Objetivo-modal` | — | — | `4518:2402` ↔ `4518:2420` |
| `enlaces-puntos` (índice) | enlace activo subrayado `#ff4520`; resto `#ffffff` | subrayado **`#003399`** | `4518:2435` ↔ `4518:2460` |
| `dotnav` + `icons/prev`/`next` | — | — | `4518:2274` ↔ `4518:2287` |

Duración y easing de estos estados: ver [§Animaciones y transiciones](#animaciones-y-transiciones)
(`4649:2012`, 0,4 s `ease`). No tienen `reactions` propias en el prototipo.
