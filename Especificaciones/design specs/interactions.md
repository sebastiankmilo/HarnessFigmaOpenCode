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
