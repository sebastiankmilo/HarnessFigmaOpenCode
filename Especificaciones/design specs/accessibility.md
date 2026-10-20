# Accesibilidad derivada del diseño

---
fuente: Figma — pares texto/fondo medidos en `1448-lg > inicio`, `Únete`,
`Objetivo-modal`, `Programa`, `Decálogo` y `Política de privacidad` y en los
componentes de `components`, contrastados contra `site/styles/tokens.css`
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_nodes_info`) + cálculo de ratio WCAG 2.1
---

Ratios calculados con la fórmula WCAG (AA texto ≥ 4.5:1, UI/grande ≥ 3:1) sobre los
hexadecimales reales extraídos de Figma.

## Pares de color que sí cumplen

| Par | Ratio | Uso observado |
| --- | --- | --- |
| `#000000` sobre `#ffffff` | 21.00 | Titulares sobre la página (`inicio` tiene fondo `--color-surface`) |
| `#000000` sobre `#fafafa` | 20.12 | Títulos de `goal-card` y enlaces del nav |
| `#000000` sobre `#ebebeb` | 17.62 | Títulos en `encabezado-contenido` |
| `#000000` sobre `#d6d6d6` | 14.45 | Título de `sección-La-Materia-Prima` |
| `#333333` sobre `#ffffff` | 12.63 | Cuerpo de texto sobre página |
| `#ffffff` sobre `#333333` | 12.63 | Texto del footer y del botón de `goal-card` |
| `#333333` sobre `#fafafa` | 12.10 | Cuerpo sobre `sección-únete` y tarjetas |
| `#000000` sobre `#fc6b38` | 7.30 | Texto sobre `--color-brand` (si se usa como fondo) |
| `#333333` sobre `#ebebeb` | 10.60 | Cuerpo sobre `encabezado-contenido` y media |
| `#333333` sobre `#d6d6d6` | 8.69 | Cuerpo sobre `sección-La-Materia-Prima` |
| `#ffffff` sobre `#000000` | 21.00 | Texto de botón primario por defecto |
| `#5c5c5c` sobre `#ffffff` | 6.69 | Punto activo del `dotnav` en `inicio` (override de instancia) |

## Pares que NO cumplen

| Par | Ratio | Dónde | Gravedad |
| --- | --- | --- | --- |
| `#d6d6d6` sobre `#ffffff` | **1.45** | Puntos **inactivos** del `dotnav` de `inicio` (`2326:4033`) | No cumple: los indicadores de paginación son el único indicador de posición |
| `#fafafa` sobre `#d6d6d6` | **1.39** | Borde visual de `container-and-card` sobre la sección «La Materia Prima» | La tarjeta no se distingue por contraste (sin stroke ni sombra) |
| `#ffffff` sobre `#c2c2c2` | **1.78** | Etiqueta `16:9` de los bloques de vídeo (`inicio` 3 y 6, `Únete`) | No cumple (ni siquiera para texto grande); es una anotación de placeholder del wireframe |
| `#704a24` sobre `#333333` | **1.63** | Etiqueta «Nuestro programa» del botón de `Objetivo-modal` (`2358:1158`), tal como la pinta Figma | No cumple: override defectuoso de la instancia. Se implementa en `--color-on-dark` (12.63:1); ver [pages/objetivo-modal](./pages/objetivo-modal.md) |
| `#ffffff` sobre `#ebebeb` | **1.19** | Puntos inactivos del `dotnav` por defecto del componente (`slideshow`) | No cumple |
| `#858585` sobre `#ebebeb` | **3.10** | Punto **activo** por defecto del componente | Solo alcanza el mínimo de UI (3:1), no el de texto |
| `#ffffff` sobre `#adadad` | **2.24** | Etiqueta `16:9` sobre el `Rectangle` de `sección-video` | No cumple (y es anotación de wireframe, no texto de interfaz) |
| `#fc6b38` sobre `#fafafa` | 2.76 | `--color-brand` usado como texto | Prohibido por [tokens.md](./tokens.md): es color de acción, no de texto |
| `#83cfdb` sobre `#ffffff` | 1.76 | `--color-accent-blue` como texto/fondo de texto | No cumple |
| `#6de4da` sobre `#ffffff` | 1.53 | `--color-accent-mint` como texto/fondo de texto | No cumple |
| `#995edd` sobre `#ffffff` | 4.20 | `--color-accent-purple` como texto | Solo cumple para texto grande/UI |
| `#fafafa` sobre `#ffffff` | 1.05 | Borde visual de `goal-card` sobre la página (sin stroke ni sombra) | La tarjeta no se distingue por contraste |

## Foco visible

**No especificado en Figma.** Ningún componente leído (`nav`, `goal-card`, `form`,
`buttons`, `header-two-columns`, `dotnav`, `container-and-card`, `footer`) declara
variantes `focus` ni anillo de foco.
`AGENTS.md` lo hace obligatorio: el anillo debe definirse en CSS
(`:focus-visible`) y quedar documentado aquí cuando el diseño lo especifique.
**PENDIENTE de especificación de diseño.**

Obligaciones que ya aplican a las vistas `inicio`, `Únete`, `Objetivo-modal`,
`Programa`, `Decálogo` y `Política de privacidad` aunque Figma no las especifique:

- Foco visible en enlaces, botones, `goal-card` y `container-and-card` (controles
  completos).
- **Foco atrapado** dentro del diálogo `Objetivo-modal` y restauración a la tarjeta
  que lo abrió al cerrar; cierre con `Escape`.
- **Foco atrapado** en el menú móvil `nav > status=open-modal` (ya registrado abajo).

## Movimiento (`prefers-reduced-motion`)

Animaciones observadas en el prototipo (`get_reactions`):

| Animación | Detalle | Dónde |
| --- | --- | --- |
| Navegación entre pantallas | `DISSOLVE`, `EASE_OUT`, 0.3s | nav, footer, botones del encabezado |
| Apertura del `Objetivo-modal` | `DISSOLVE` 0.3s (click) y `MOVE_IN` desde la derecha 0.3s (drag) | `goal-card` |

Ninguna animación esencial (sin `prefers-reduced-motion`) y ninguna animación
infinita. Regla de implementación: al activar `prefers-reduced-motion: reduce`,
sustituir `DISSOLVE`/`MOVE_IN` por cambio de estado inmediato, conservando la
misma navegación.

## Nombres y roles

- Iconos sociales del nav y del footer navegan a URLs externas: deben exponerse como
  enlaces con nombre accesible (p. ej. `aria-label="Facebook"`), no como botón mudo.
- La tarjeta `goal-card` es un control completo (click y drag abren el overlay):
  requiere nombre accesible y foco. **No especificado en Figma** — PENDIENTE.
- El menú móvil (`status=open-modal`) es un modal a pantalla completa: requiere
  foco atrapado y restauración al cerrar. **No especificado en Figma** — PENDIENTE.
- El diálogo `Objetivo-modal` se expone como `role="dialog"` con `aria-modal="true"`
  y toma como nombre accesible su título; `icons/close` necesita nombre accesible
  (`aria-label="Cerrar"`). **No especificado en Figma** — obligatorio por `AGENTS.md`.
- El avatar de `goal-card` y las medias de `components/images` son placeholders
  sólidos sin contenido real: texto alternativo **PENDIENTE de especificación**.

## `375-xs` (2026-10-04)

Los pares de color no cambian (mismos tokens); lo nuevo es el contexto móvil:

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Etiquetas del menú móvil `#000000` sobre `--color-surface-alt` (`#fafafa`) | 20.12 | AA |
| Etiqueta del botón «Aporta» `#ffffff` sobre `#000000` (overlay) | 21.00 | AA |
| Enlaces y copyright del footer `#ffffff` sobre `--color-surface-dark` (`#333333`) | 12.63 | AA |
| Punto activo del `dotnav` de «La Materia Prima» `#5c5c5c` sobre `--color-surface-strong` (`#d6d6d6`) | 4.60 | AA |
| Puntos inactivos del `dotnav` de «La Materia Prima» `#fafafa` sobre `#d6d6d6` | 1.39 | **No cumple** (mismo caso que los inactivos sobre `#ebebeb`) |

- **Carruseles**: los controles son `<button>` con nombre accesible, foco visible
  por `:focus-visible` global y teclado `←`/`→`; el cambio de tarjeta es
  instantáneo, así que `prefers-reduced-motion` no exige nada adicional (ver
  [interactions.md](./interactions.md)).
- **Menú móvil**: foco atrapado y devolución al cerrar (ya en
  [components/nav.md](./components/nav.md)).
- Las tarjetas ocultas por el carrusel a 375 usan `display:none`: quedan fuera del
  árbol de accesibilidad y no pueden recibir foco.

## `1024-sm` (2026-10-05)

Los pares de color no cambian (mismos tokens que en `xs` y `lg`); lo nuevo es el
contexto tablet:

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Enlaces del menú tablet `#000000` sobre `--color-surface-alt` (`#fafafa`) | 20.12 | AA |
| Etiqueta del botón «Aporta» `#ffffff` sobre `#000000` (overlay `2424:446`) | 21.00 | AA |
| Cuerpo y títulos `#333333` / `#000000` sobre `#fafafa` y `#ebebeb` | 12.10 / 20.12 | AA |
| Enlaces y copyright del footer `#ffffff` sobre `--color-surface-dark` (`#333333`) | 12.63 | AA |
| Punto activo del `dotnav` `#5c5c5c` sobre `#fafafa` | 6.41 | AA |
| Puntos inactivos del `dotnav` `#d6d6d6` sobre `#fafafa` | **1.39** | **No cumple** (mismo caso que en `lg` y `xs`) |

- **Elementos ocultos a tablet** (barra: `links` de texto e `icons/search`; overlay:
  botón outline y `icons/wechat`; `sección-ejes` y `sección-materialismo`: sus
  `components/images`): al ir con `display:none` **no entran en el árbol de
  accesibilidad ni pueden recibir foco** — comportamiento deseado.
- **Menú tablet**: el overlay `2424:446` es un modal a pantalla completa → foco
  atrapado y devolución al cerrar (`icons/close` → `CLOSE`), y nombre accesible en
  la hamburguesa y en el cierre.
- **Carrusel de objetivos** (2 tarjetas visibles): controles `<button>` con nombre
  accesible, `:focus-visible` y teclado `←`/`→`; las 2 tarjetas fuera de ventana
  usan `display:none` (ver [interactions.md](./interactions.md)).


## Diseño definitivo `1448-lg` (2026-10-20 — ticket 4)

- `prefers-reduced-motion: reduce` desactiva: transición de la navegación
  reducida (cambio de estado sin animación), `transition: all .4s ease` de
  hovers, apertura/cierre del `Objetivo-modal` (cambio instantáneo, backdrop
  sin fade), fades de secciones (visibles desde el inicio) y la transición del
  slideshow. `scroll-behavior` vuelve a `auto` en `Programa`/`Decálogo`.
- Fades de secciones: **nunca sobre el above-the-fold** (la nota `4649:2018`
  lo pide por Lighthouse); el observer solo aplica a secciones por debajo del
  primer viewport.
- Contraste de los nuevos colores sobre `#fdfcfa` (fondo de página del diseño):
  `#ff4520` ≈ 3.3:1 — **solo** para bordes/subrayados y fondos de botón con
  texto `#30250f` (≈ 4.9:1 sobre `#ff4520`, cumple AA para texto grande y
  normal 14.2 bold queda en el límite — verificar por elemento); `#30250f` ≈
  13:1; `#53411e` ≈ 7.4:1; `#1b2c43` ≈ 14:1; `#ceac57` con texto `#1b2c43` ≈
  8.5:1.
- Hover de tarjetas (`#fdfcfa` → `#f0ece6`) no altera el contraste del texto
  (`#53411e`/`#333333` siguen ≥ 4.5:1 sobre `#f0ece6`).
