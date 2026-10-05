# Interacciones y flujos

---
fuente: Figma — página `1448-lg` (`110:1162`), reacciones de los nodos clicables
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_reactions`)
---

`get_reactions` sobre la página `1448-lg`: **124 nodos con reacciones, 125 reacciones,
122 únicas**. Transición por defecto del prototipo: `DISSOLVE`, `EASE_OUT`, **0.3s**.

## Flujos de navegación

### `inicio` (`110:2277`)

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| nav > `logo` | click | `inicio` (`110:2277`) — NAVIGATE | URL + visión vs baseline |
| nav > enlace 1 | click | `Programa` (`2328:4307`) | URL + visión |
| nav > enlace 2 | click | `Decálogo` (`2334:1005`) | URL + visión |
| nav > enlace 3 | click | `Únete` (`2335:1229`) | URL + visión |
| nav > enlace 4 | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| nav > iconos `platforms` | click | URL externa: Facebook, Instagram, YouTube, X, TikTok | apertura externa |
| encabezado > botón 1 | click | `Programa` — NAVIGATE | URL + visión |
| encabezado > botón 2 | click | `Únete` — NAVIGATE | URL + visión |
| `goal-card` ×4 | click | `Objetivo-modal` (`2358:932`) — **OVERLAY** | dialog visible + visión |
| `goal-card` (2.ª) | `ON_DRAG` | `Objetivo-modal` — OVERLAY, `MOVE_IN` RIGHT 0.3s | arrastre + visión |
| `seccion-objetivos` > botón | click | `Programa` — NAVIGATE | URL + visión |
| `sección-La-Materia-Prima` > `container-and-card` ×4 | click | URL externa `lamateriaprima.org` (4 artículos distintos) | apertura externa |
| `sección-La-Materia-Prima` > botón | click | URL externa `lamateriaprima.org/` | apertura externa |
| footer > enlace `Programa` | click | `Programa` | URL + visión |
| footer > enlace `Decálogo` | click | `Decálogo` | URL + visión |
| footer > enlace `Únete` | click | `Únete` | URL + visión |
| footer > enlace `Pólitica de privacidad` | click | `Política de privacidad` (`2335:1533`) | URL + visión |
| footer > enlace `La Materia Prima` | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| footer > iconos `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) | apertura externa |

### `Objetivo-modal` (`2358:932`)

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| `modal > icons/close` | click | **CLOSE** (cierra el overlay) | aserción funcional |
| `modal > components/buttons` | click | `Programa` — NAVIGATE | URL + visión |

Al cerrar con `CLOSE`, el flujo de vuelta es al estado anterior (`inicio`): aserción
funcional de que el diálogo desaparece.

### `Únete` (`2335:1229`)

22 nodos con reacción, **todos en `nav` y `footer`** — el cuerpo de la pantalla
(media + texto) no tiene ninguna interacción.

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| nav > `logo` | click | `inicio` (`110:2277`) — NAVIGATE | URL + visión |
| nav > enlace 1 | click | `Programa` (`2328:4307`) | URL + visión |
| nav > enlace 2 | click | `Decálogo` (`2334:1005`) | URL + visión |
| nav > enlace 3 «Únete» | click | **sin `destinationId`** (página actual) | — |
| nav > enlace 4 | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| nav > iconos `platforms` | click | URL externa: Facebook, Instagram, YouTube, X, TikTok | apertura externa |
| footer > `logo-02` | click | `inicio` — NAVIGATE | URL + visión |
| footer > enlace `Inicio` | click | `inicio` | URL + visión |
| footer > enlace `Programa` | click | `Programa` | URL + visión |
| footer > enlace `Decálogo` | click | `Decálogo` | URL + visión |
| footer > enlace `Únete` | click | **sin `destinationId`** (página actual) | — |
| footer > enlace `La Materia Prima` | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| footer > enlace `Pólitica de privacidad` | click | `Política de privacidad` (`2335:1533`) | URL + visión |
| footer > iconos `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) | apertura externa |

**Sin reacción**: el enlace `Aporta` del footer y el cuerpo de la pantalla.

### `Programa` (`2328:4307`)

23 reacciones: `nav` (10), `footer` (12) y el CTA de `sección-puntos`.

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| `sección-puntos` > `components/buttons` `2334:998` | click | `Únete` (`2335:1229`) — NAVIGATE, sin transición | URL + visión |
| nav > `logo` | click | `inicio` (`110:2277`) — NAVIGATE | URL + visión |
| nav > enlace 1 «Programa» | click | **sin `destinationId`** (página actual) | — |
| nav > enlace 2 | click | `Decálogo` (`2334:1005`) | URL + visión |
| nav > enlace 3 | click | `Únete` (`2335:1229`) | URL + visión |
| nav > enlace 4 | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| nav > iconos `platforms` | click | URL externa: Facebook, Instagram, YouTube, X, TikTok | apertura externa |
| footer > `logo-02` | click | `inicio` — NAVIGATE | URL + visión |
| footer > enlace `Inicio` | click | `inicio` | URL + visión |
| footer > enlace `Programa` | click | **sin `destinationId`** (página actual) | — |
| footer > enlace `Decálogo` | click | `Decálogo` | URL + visión |
| footer > enlace `Únete` | click | `Únete` | URL + visión |
| footer > enlace `La Materia Prima` | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| footer > enlace `Pólitica de privacidad` | click | `Política de privacidad` (`2335:1533`) | URL + visión |
| footer > iconos `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) | apertura externa |

**Sin reacción**: el enlace `Aporta` del footer y el cuerpo de la pantalla.

### `Decálogo` (`2334:1005`)

23 reacciones: mismo mapa que `Programa`, con la variante del enlace activo.

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| `sección-puntos` > `components/buttons` `2334:1059` | click | `Únete` (`2335:1229`) — NAVIGATE, sin transición | URL + visión |
| nav > `logo` | click | `inicio` (`110:2277`) — NAVIGATE | URL + visión |
| nav > enlace 1 | click | `Programa` (`2328:4307`) | URL + visión |
| nav > enlace 2 «Decálogo» | click | **sin `destinationId`** (página actual) | — |
| nav > enlace 3 | click | `Únete` (`2335:1229`) | URL + visión |
| nav > enlace 4 | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| nav > iconos `platforms` | click | URL externa: Facebook, Instagram, YouTube, X, TikTok | apertura externa |
| footer > `logo-02` | click | `inicio` — NAVIGATE | URL + visión |
| footer > enlace `Inicio` | click | `inicio` | URL + visión |
| footer > enlace `Programa` | click | `Programa` | URL + visión |
| footer > enlace `Decálogo` | click | **sin `destinationId`** (página actual) | — |
| footer > enlace `Únete` | click | `Únete` | URL + visión |
| footer > enlace `La Materia Prima` | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| footer > enlace `Pólitica de privacidad` | click | `Política de privacidad` (`2335:1533`) | URL + visión |
| footer > iconos `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) | apertura externa |

**Sin reacción**: el enlace `Aporta` del footer y el cuerpo de la pantalla.

### `Política de privacidad` (`2335:1533`)

22 reacciones: `nav` (10) y `footer` (12). El cuerpo no tiene ninguna.

| Origen | Trigger | Destino | Verificación |
| --- | --- | --- | --- |
| nav > `logo` | click | `inicio` (`110:2277`) — NAVIGATE | URL + visión |
| nav > enlace 1 | click | `Programa` (`2328:4307`) | URL + visión |
| nav > enlace 2 | click | `Decálogo` (`2334:1005`) | URL + visión |
| nav > enlace 3 | click | `Únete` (`2335:1229`) | URL + visión |
| nav > enlace 4 | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| nav > iconos `platforms` | click | URL externa: Facebook, Instagram, YouTube, X, TikTok | apertura externa |
| footer > `logo-02` | click | `inicio` — NAVIGATE | URL + visión |
| footer > enlace `Inicio` | click | `inicio` | URL + visión |
| footer > enlace `Programa` | click | `Programa` | URL + visión |
| footer > enlace `Decálogo` | click | `Decálogo` | URL + visión |
| footer > enlace `Únete` | click | `Únete` | URL + visión |
| footer > enlace `La Materia Prima` | click | URL externa `https://lamateriaprima.org/` | apertura externa |
| footer > enlace `Pólitica de privacidad` | click | **sin `destinationId`** (página actual) | — |
| footer > iconos `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) | apertura externa |

**Sin reacción**: el enlace `Aporta` del footer, el cuerpo de la pantalla y el botón
`components/buttons` «Volver al inicio» (`2335:1574`) — **`PENDIENTE-FIGMA`**:
`get_reactions` sobre `sección-puntos` (`2335:1540`) devuelve 0.

### Elementos de `inicio` sin comportamiento

Verificado con `get_reactions` el 2026-10-03: `icons/prev` (`2326:4023`),
`components/dotnav` (`2326:4033`) e `icons/next` (`2326:4032` > `2326:4026`) **no
tienen ninguna reacción**. **PENDIENTE de especificación de diseño**: se dibujan y no
se les asigna comportamiento.

## Estados interactivos por componente

- [components/nav.md](./components/nav.md): subrayado de enlace activo; hamburguesa
  **sin reacción** registrada (la variante `status=open-modal` existe pero el
  prototipo no expone su conexión).
- [components/goal-card.md](./components/goal-card.md): `ON_CLICK` y `ON_DRAG` al overlay.
- [components/header-two-columns.md](./components/header-two-columns.md): **sin
  reacciones** — slideshow y botones no tienen comportamiento definido.
- [components/container-and-card.md](./components/container-and-card.md): click →
  URL externa `lamateriaprima.org`; sin estados hover.
- [components/buttons.md](./components/buttons.md): la reacción la lleva la
  instancia, no el componente (cada pantalla la declara arriba).
- [components/dotnav.md](./components/dotnav.md): **sin reacciones** (pendiente de
  diseño), igual que `icons/prev` e `icons/next`.
- [components/images.md](./components/images.md), [components/footer.md](./components/footer.md):
  los destinos viven en los enlaces del footer (arriba).

## Inconsistencias observadas (registradas, no corregidas)

- En **las cinco pantallas**, el icono `youtube` del footer apunta a
  `https://www.instagram.com/vanguardiacol` (mismo destino que el de Instagram);
  en el nav, `youtube` sí apunta a `https://www.youtube.com/@VanguardiaColombiana`.
- 6 reacciones `NAVIGATE` sin `destinationId`: en todas, el origen es el enlace de la
  **página actual** (el enlace del footer y el del nav de `Programa`, `Decálogo` y
  `Únete` apuntando a sí mismas).
- `nav` y `footer` repiten la misma lista de enlaces y destinos en todas las
  pantallas, salvo el enlace de la página actual.

## `375-xs` — reacciones leídas el 2026-10-04

`get_reactions` sobre los nodos de las vistas móviles:

| Origen | Nodo | Trigger | Destino |
| --- | --- | --- | --- |
| `objetivos` (contenedor de las `goal-card`) | `2392:4000` | `ON_CLICK` | `Objetivo-modal` (`2404:3499`) — **OVERLAY**, `DISSOLVE` 0.3s `EASE_OUT` |
| `icons/prev` / `components/dotnav` / `icons/next` de objetivos | `2392:4005` | — | **0 reacciones** |
| `icons/prev` / `components/dotnav` / `icons/next` de «La Materia Prima» | `2392:4101` | — | **0 reacciones** |
| Botón «Volver al inicio» | `2396:2891` | — | **0 reacciones** → `PENDIENTE-FIGMA` (igual que en `lg`) |
| hamburguesa del nav | instancia `35:703` | — | **0 reacciones** (la variante `status=open-modal` existe, el prototipo no expone la conexión) |

Los destinos de `nav` y `footer` en `375-xs` son los mismos que en `1448-lg`
(tablas de más arriba), con la particularidad de que el overlay del menú añade los
enlaces «La Materia Prima» y «Política de privacidad».

## Menú móvil (`nav` `2396:2902`)

Figma no registra reacción para la hamburguesa; el comportamiento lo fija el ticket
(regla 4 de la §3.2) y ya está implementado en [site/scripts/nav.js](../site/scripts/nav.js):

| Acción | Comportamiento |
| --- | --- |
| Clic en la hamburguesa | Abre el overlay `.site-nav__menu` a pantalla completa (`aria-expanded="true"`, `aria-hidden="false"`), mueve el foco al botón de cerrar |
| Clic en `icons/close` o `Escape` | Cierra el overlay y **devuelve el foco** a la hamburguesa que lo abrió |
| `Tab` dentro del overlay | Foco atrapado en los enlaces, plataformas y botones del menú |

## Carruseles de `inicio` — definición previa al JS (v1.2/v1.4 del ticket)

Figma **no registra reacciones** para `prev`/`next`/`dotnav`, pero el ticket los pide
funcionales. Esta definición es el contrato que implementa
[site/scripts/inicio.js](../site/scripts/inicio.js); si cambia, cambia primero
aquí.

### Alcance

Dos carruseles en [site/index.html](../site/index.html), con **una misma
implementación** y 4 elementos cada uno:

| Carrusel | Tarjetas | Controles | Visible a 375 | Visible a 1448 |
| --- | --- | --- | --- | --- |
| «Nuestros objetivos» | `.goal-card` ×4 | `.carousel__pagination` (en el HTML era `.goals__pagination`; renombrado a clases neutras para reutilizarlo en ambos carruseles) | 1 tarjeta | las 4 + controles |
| «La Materia Prima» | `.article-card` ×4 | `.carousel__pagination .articles__pagination` (**nuevo**, solo en HTML de `index.html`) | 1 tarjeta | las 4, **controles ocultos** (el diseño `lg` no los dibuja) |

### Estado

- `index` ∈ `0..3` por carrusel, **independiente** entre carruseles.
- **Recorrido circular**: `next` en 3 → 0 y `prev` en 0 → 3 (no hay estados
  deshabilitados porque el diseño no define estilos de `disabled`).
- El **punto activo** del `dotnav` es siempre el `index` (`aria-current="true"`).

### Comportamiento por breakpoint

| Breakpoint | Efecto de `prev`/`next`/punto |
| --- | --- |
| **375** (base) | Solo se renderiza la tarjeta `index`; las otras tres quedan `display:none` (fuera del flujo y del árbol de accesibilidad). Cambiar de índice **cambia la tarjeta visible** (Caso 18). |
| **1448** (`objetivos`) | Las 4 tarjetas siguen visibles; el control mueve el `index`, actualiza el punto activo y **lleva el foco** a la tarjeta `index` (Caso 19: el comportamiento se conserva con las 4 visibles). |
| **1448** (`artículos`) | Los controles están `display:none`; el índice no tiene efecto visible y las 4 tarjetas permanecen visibles. |

### Teclado y accesibilidad

- Los controles son `<button type="button">` con **nombre accesible**:
  «Objetivo anterior» / «Objetivo siguiente» y «Artículo anterior» /
  «Artículo siguiente»; cada punto es un botón «Ir al objetivo N» / «Ir al
  artículo N» con `aria-current="true"` en el activo.
- `Enter` y `Espacio` activan el control enfocado (nativo del `<button>`).
- `←` y `→` con el foco **dentro del carrusel** (controles o tarjetas) cambian de
  índice (equivalente a `prev`/`next`), en los dos breakpoints.
- Tras un cambio de índice:
  - **a 375**: el foco se queda donde estaba; si estaba en una tarjeta que pasa a
    `display:none`, se traslada a la tarjeta ahora visible.
  - **a 1448** (objetivos): el foco pasa a la tarjeta del nuevo índice, para que la
    navegación continúe desde ahí (las 4 siguen visibles).
- El foco usa el `:focus-visible` global de [main.css](../site/styles/main.css)
  (2 px `--color-text-primary`).
- **Sin animación de transición**: el cambio de tarjeta es instantáneo (el diseño no
  especifica movimiento), lo que además cumple `prefers-reduced-motion` sin
  condiciones adicionales.

### Fuera de esta definición

`ON_DRAG` de `goal-card`, autoplay, y `prev`/`next`/`dotnav` del slideshow del
encabezado de escritorio (OUT OF SCOPE del ticket).
