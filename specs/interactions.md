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

### Pantallas restantes (fuera de este lote de specs)

Conteo de reacciones únicas por página: `Programa` 23, `Decálogo` 23,
`Política de privacidad` 22 (`Únete` 22 — ya especificada arriba). Sus specs se
extraen al abrir cada ticket de sección
([especificaciones-diseño §6](../docs/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md)).

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

- En `inicio`, el icono `youtube` del footer apunta a
  `https://www.instagram.com/vanguardiacol` (mismo destino que el de Instagram);
  en el nav, `youtube` sí apunta a `https://www.youtube.com/@VanguardiaColombiana`.
- 6 reacciones `NAVIGATE` sin `destinationId`: en todas, el origen es el enlace de la
  **página actual** (el enlace del footer y el del nav de `Programa`, `Decálogo` y
  `Únete` apuntando a sí mismas).
- `nav` y `footer` repiten la misma lista de enlaces y destinos en todas las
  pantallas, salvo el enlace de la página actual.
