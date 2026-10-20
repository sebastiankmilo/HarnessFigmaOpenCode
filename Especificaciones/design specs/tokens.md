# Tokens — reglas de uso

---
fuente: Figma — página `components`, nodo `11:229` (`colors`) + estilos locales del
archivo + rellenos de los frames de `1448-lg` (`inicio`, `Únete`, `Objetivo-modal`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_styles`, `get_node_info`, `get_nodes_info`)
---

Los **valores** están en [`site/styles/tokens.css`](../../site/styles/tokens.css).
Este documento dice **qué token se usa para qué rol**. Fuera de esta tabla,
`--color-brand` no debe usarse como color de texto de párrafo.

## Color

Fuente: muestras de la página `components` (nodo `11:229`, 17 muestras con su nombre
en Figma). `get_styles` devuelve `colors: []` — el archivo **no tiene estilos de color
definidos**; el color sale de los rellenos de los nodos.

| Token | Rol | Regla |
| --- | --- | --- |
| `--color-surface` | Fondo principal de página | Único fondo base; sobre él va `--color-text-primary` o `--color-text-secondary` |
| `--color-surface-alt` | Fondo de nav, cards y bloques alternos | No usar como color de texto |
| `--color-surface-muted` | Bloques destacados (`encabezado-contenido`, `components/images`) | Fondo solo; texto encima `--color-text-primary`/`--color-text-secondary` |
| `--color-surface-strong` | Fondo de la sección «La Materia Prima» (`inicio` §5) | Fondo solo; nunca como color de texto |
| `--color-surface-dark` | Fondo del `footer` (todas las pantallas) | Fondo solo; el texto encima va siempre en `--color-on-dark` |
| `--color-text-primary` | Titulares y texto sobre fondos claros | Único color de texto de titular |
| `--color-text-secondary` | Cuerpo de texto y estados outline | Nunca para titulares |
| `--color-on-dark` | Texto/iconos sobre `--color-text-primary` | Solo dentro de botón primario o fondos oscuros |
| `--color-border-input` | Borde de inputs (`form`) | Solo en campos de formulario |
| `--color-border-soft` | Borde de muestras y divisores finos | No usar en inputs |
| `--color-brand` | Acciones principales (botones primarios, acentos) | **Nunca** como color de texto de párrafo (ratio 2.76:1 sobre `--color-surface-alt`) |
| `--color-accent-blue` / `--color-accent-purple` / `--color-accent-mint` | Acentos decorativos de la paleta | No usar como fondo de texto (ratios 1.76 / 4.20 / 1.53:1) |
| `--color-media-placeholder` | Relleno de `components/images` en el wireframe | Solo mientras el diseño no incluya imagen real |
| `--color-media-video` | Relleno de las medias de vídeo (`inicio` §3 y §6, página `Únete`) | Mismo caso que el anterior; **no** usarlo como borde (para eso está `--color-border-input`, mismo valor) |
| `--color-video-band` | Banda a sangre de `sección-video` (`inicio` §3) | Fondo solo; no usar como color de texto |
| `--color-avatar-placeholder` | Avatar de `goal-card` | Mismo caso que `--color-media-placeholder` |
| `--color-dot-inactive` | Punto activo/inactivo del `dotnav` | Ver [components/nav](./components/nav.md) y [pages/inicio](./pages/inicio.md) |

### Mapeo desde los nombres de Figma

| Nombre en Figma | Hex | Token |
| --- | --- | --- |
| Bright | `#ffffff` | `--color-surface` |
| Neutral 0 | `#fafafa` | `--color-surface-alt` |
| Neutral 10 | `#ebebeb` | `--color-surface-muted` |
| Neutral 20 | `#d6d6d6` | `--color-border-soft` · `--color-surface-strong` |
| Neutral 30 | `#c2c2c2` | `--color-border-input` · `--color-media-video` |
| Neutral 40–90 | `#adadad` … `#474747` | `--neutral-40` … `--neutral-90` · `--color-video-band` (`#adadad`) |
| Text | `#333333` | `--color-text-secondary` · `--color-surface-dark` |
| Dark | `#000000` | `--color-text-primary` |
| Main Orange | `#fc6b38` | `--color-brand` |
| Main Blue | `#83cfdb` | `--color-accent-blue` |
| Secondary Purple | `#995edd` | `--color-accent-purple` |
| Secondary Mint | `#6de4da` | `--color-accent-mint` |

## Tipografía

- Familia única en todo el archivo: **DM Sans** (`--font-family-base`).
- Pesos usados: **Bold** (titulares, links, labels, botones) y **Medium** (cuerpo).
- Dos escalas de titular en Figma: `l/` (desktop) y `xs/` (móvil). Detalle completo
  en [typography.md](./typography.md).
- Regla: los párrafos usan `--font-weight-medium`; titulares, labels y botones
  `--font-weight-bold`.
- Interlineado fijo observado: titulares ×1.12 (`--line-height-heading`),
  párrafos ×1.5 (`--line-height-body`).

## Espaciado

Escala derivada de los auto-layouts leídos con `get_node_info` (padding y gaps
calculados sobre `absoluteBoundingBox`, porque el plugin no expone `padding`/
`itemSpacing` directamente).

- Entre secciones de página: las secciones de `inicio` se tocan (gap **0**); el ritmo
  vertical lo da el padding interno de cada sección (**96px** superior e inferior en
  `seccion-objetivos`: primer hijo a 96px del borde y último botón a 96px del fondo).
- Dentro de tarjetas: padding `--space-4` (24px) en `goal-card`, con
  `--space-6` (48px) inferior.
- Márgenes laterales del contenido: `--space-3` (16px) en 375, `--space-4` (24px) en
  768 (tablet), `--space-5` (32px) en 1448.
- Grillas de 4 columnas: gap `--space-5` (32px).
- Botón `components/buttons`: padding propio por tamaño (h 12/16/18/22/24/28 ·
  v 6/8/9/11/12/14 para size xs→xl). Son medidas del componente, no de la escala.

### Medidas puntuales (fuera de la escala `--space-*`)

Extraídas de los frames de `1448-lg` el 2026-10-03 y registradas en `tokens.css`
para no hardcodearlas en el CSS:

| Token | Valor | Dónde se mide |
| --- | --- | --- |
| `--space-8` | 96px | padding vertical de las secciones de contenido (`seccion-objetivos`, `sección-La-Materia-Prima`, `sección-únete`) |
| `--space-header` | 162px | padding vertical del `encabezado-contenido` |
| `--space-header-cta` | 36px | gap entre `encabezado-texto` y `botones` |
| `--nav-gap-blocks` | 28px | gap entre bloques del `right-nav` del `nav` (lg); fuera de la escala, registrado tal cual |
| `--nav-height-xs` / `--nav-height-sm` / `--nav-height-lg` | 80 / **75** / 125px | alto de la barra del `nav` en las instancias de `375-xs`, `1024-sm` (**medido el 2026-10-05**: instancias 768×75) y `1448-lg` |
| `--nav-logo-xs` / `--nav-logo-sm` / `--nav-logo-lg` | 48 / **48** / 96px | `icons/logo` dentro de la barra del `nav` en los tres breakpoints |
| `--menu-close-top-sm` / `--menu-close-right-sm` | 18 / 21px | offset del `icons/close` en el overlay de `1024-sm` (`2424:1003`); en `xs` es 16/16 (`--space-3`) |
| `--btn-padding-x-m` / `--btn-padding-y-m` | 22 / 11px | padding del `components/buttons` `size=m` (la escala no cubre ese tamaño) |
| `--media-label-top` / `--media-label-left` | 66 / 120px | offset de la etiqueta `16:9` dentro de `components/images` |

## Radios

Ningún componente inspeccionado (`nav`, `goal-card`, `form`, `buttons`,
`header-two-columns`) reporta `cornerRadius`: el diseño usa esquinas rectas —
`--radius-none` (0).

Único caso circular: el avatar de `goal-card` (`Ellipse 1`) y los puntos del
`dotnav` (`Ellipse`), que usan **`--radius-circle`** (50 %). Si otra sección necesita
radio, extraerlo de Figma antes de usarlo.


## Tokens nuevos del diseño definitivo (2026-10-20 — ticket 4)

Extraídos de la capa `hovers`, `navegación-reducida` y las secciones releídas;
valores aplicados en [`site/styles/tokens.css`](../../site/styles/tokens.css):

| Token | Valor | Rol observado |
| --- | --- | --- |
| `--color-surface-page` | `#fdfcfa` | fondo de página, nav, tarjetas default, secciones |
| `--color-button-fill` | `#ffcd00` | relleno de `components/buttons` (Aporta, Nuestro programa) |
| `--color-hover-accent` | `#ff4520` | hover de botones, subrayado de enlaces, enlace activo del índice |
| `--color-card-hover` | `#f0ece6` | hover de `goal-card` y `container-and-card` |
| `--color-dot-active` | `#65543a` | punto activo del `dotnav` |
| `--color-dot-inactive-new` | `#d7d2ca` | puntos inactivos del `dotnav` y bordes suaves |
| `--color-cta-default` | `#ceac57` | fondo default del CTA `lamateriaprima.org` |
| `--color-cta-hover` | `#1b2c43` | fondo hover del CTA / texto default del CTA |
| `--color-text-brown` | `#30250f` | texto de nav, botones y enlaces del índice |
| `--color-heading-brown` | `#53411e` | titulares (modal, Puntos, goal-card, sección-únete) |
| `--color-link-underline` | `#786952` | subrayado default del enlace de texto de Únete |
| `--color-link-underline-hover` | `#003399` | subrayado hover del índice de puntos |
| `--nav-height-lg` | `160px` (antes 125) | alto de la barra del nav desktop |
| `--nav-height-reduced` | `83px` | alto del header de `navegación-reducida` |
| `--font-family-display` | `"Bebas Neue"` | titulares del diseño definitivo (modal, sección-únete, labels de media) — **archivo .woff2 pendiente de vendorizar** |

Nota: `--color-dot-inactive` (`#858585`) del wireframe queda **superado** por
`--color-dot-inactive-new` (`#d7d2ca`) en el diseño definitivo.
