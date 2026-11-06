---
fuente: Figma — página `components-diseño` (`10:215`) y `1448-lg` (`110:1162`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_styles, get_node_info`)
---

# Tokens — reglas de uso

Los **valores ejecutables** viven en `site/styles/tokens.css`. Esta spec documenta
**qué token va en qué rol**, con la evidencia de Figma de la que sale cada rol.

## Color

Rollen observado sobre los rellenos reales leídos con `get_node_info`:

| Rol | Token | Valor | Evidencia Figma (nodo) |
| --- | --- | --- | --- |
| Fondo de página / nav / tarjeta default | `--color-surface-page` | `#fdfcfa` | `size=lg` del nav `111:5222` y `goal-card` `2326:3924` (relleno de ambos) |
| Texto de nav, botones y enlaces | `--color-text-brown` | `#30250f` | `Enlace 01` `111:5228`, `Botón` del hero `I2325:3794;14:81`, `Line 8` del índice |
| Titulares | `--color-heading-brown` | `#53411e` | `VANGUARDIA COLOMBIANA` `2325:3792`, título de `goal-card` `2325:3903` |
| Cuerpo de texto | `--color-text-secondary` | `#333333` | párrafo del hero `2325:3793`, cuerpo de `goal-card` `2325:3904` |
| Relleno de botón primario | `--color-button-fill` | `#ffcd00` | `components/buttons` `2325:3794` y `315:5105` |
| Fondo de footer | `--color-footer-bg` | `#ffd633` | `footer` `size=lg` `4370:4878` |
| Fondo sólido de La Materia Prima | `--color-materia-bg` | `#1b2c43` | frames `2408:1708` (sm) y `2392:4053` (xs) |
| Placeholder de media | `--color-media-placeholder` | `#ebebeb` | variantes de `components/images` `19:91`…`243:5129` |
| Acento de hover | `--color-hover-accent` | `#ff4520` | `Line 8` del enlace sobre el que está el cursor en `hovers` → `right-nav` `4672:3064` |
| Hover de tarjeta | `--color-card-hover` | `#f0ece6` | segundo par de `goal-card` en `hovers` (`4518:2267`) |
| Fondo del overlay del nav sm | `--color-surface-menu` | `#f0ece6` | frame `nav` `2424:446` |
| Idioma inactivo | `--color-lang-inactive` | `#9e9382` | `Es`/`PT` del selector en `hovers` → `links` `4672:2994` y `4672:3000` |
| Texto on-dark / sobre botón | `--color-on-dark` | `#ffffff` | `Botón` del set maestro `13:71` |

> `get_styles` devuelve `colors: []` en este archivo: **no hay estilos de color
> locales**. Todos los colores se leen de los rellenos de los nodos.

### Pares que exigen contraste AA
Ver [`accessibility.md`](accessibility.md).

### Recorte del fondo de La Materia Prima

En `xs`/`sm` el fill `IMAGE` de la sección es `STRETCH` con un recorte
horizontal (`imageTransform` x); `background-size` se calcula como
`100 / escala` para mostrar esa franja izquierda estirada:

| Breakpoint | Token | Valor | Evidencia |
| --- | --- | --- | --- |
| `xs` | `--materia-bg-scale-xs` | 404.747% | `2392:4053` (`imageTransform` x = 0.24706768989562988) |
| `sm` | `--materia-bg-scale-sm` | 188.119% | `2408:1708` (`imageTransform` x = 0.5315786004066467) |
| `lg` | — | `cover` | `2328:4236` (`scaleMode: FILL`) |

### Medidas de composición `xs` (ticket 6)

| Token | Valor | Uso |
| --- | --- | --- |
| `--nav-height-xs` | 83,38 px | barra del nav en 375 |
| `--nav-height-xs-reduced` / `--nav-logo-xs-reduced` | 56 / 40 px | barra reducida al scroll en 375 |
| `--article-card-height-xs` | 513 px | card de artículo en `2392:4053` |
| `--dialog-panel-width-xs` / `--dialog-panel-height-xs` | 90% / 90% | modal `2404:3499` (frame 343×1095); 5% de margen en el viewport |
| `--dialog-cta-width-xs` / `--dialog-cta-height-xs` | 297 / 54 px | CTA del modal xs |
| `--dialog-close-top-xs` / `--icon-dialog-close-xs` | 29 / 24 px | cierre del modal xs |
| `--join-media-aspect-xs` | 341,079 / 216 | media de Únete `2396:2714` |
| `--join-play-size` | 38,8 px | play de Únete `2396:2715` |
| `--prog-ejes-media-size-xs` | 337 px | media de ejes (oculta en el render) |
| `--prog-mat-media-gap-xs` | 18 px | gap de las dos imágenes de materialismo |
| `--prog-mat-bullet-indent-xs` / `--prog-mat-bullet-left-xs` | 40 / 24 px | viñeta de materialismo xs |

## Tipografía

Los 41 estilos de texto locales se listan en [`typography.md`](typography.md).
Regla de rol aquí: `--font-family-display` (Bebas Neue) para titulares,
`--font-family-base` (DM Sans) para cuerpo, enlaces y botones.

## Espaciado

Escala derivada de auto-layouts (`padding = hijo.x − padre.x`,
`gap = hijo[n+1].x − (hijo[n].x + hijo[n].width)`):

| Token | Valor | Dónde se observa |
| --- | --- | --- |
| `--space-3` | 16 | margen lateral móvil, gap de iconos 24×24 |
| `--space-4` | 24 | padding de tarjetas, gap de columnas |
| `--space-5` | 32 | margen lateral desktop (`texto-y-botones` x=142 sobre frame x=110) y gap de grillas |
| `--space-6` | 48 | padding inferior de tarjeta, margen lateral de secciones tablet |
| `--space-7` | 64 | padding vertical de secciones desktop |
| `--space-8` | 96 | padding vertical de secciones de contenido |

`get_node_info` **no expone** `padding`, `itemSpacing` ni `layoutMode`: todos los
valores anteriores se derivan de `absoluteBoundingBox`. Lo que no se pudo derivar
queda `PENDIENTE-FIGMA`.

## Navegación reducida

El comportamiento es global desde `sm`; el alto compacto y el logo reducido
cambian por breakpoint. En `xs` la barra no se reduce.

| Breakpoint | Alto completo | Alto reducido | Token alto | Logo reducido | Token logo |
| --- | --- | --- | --- | --- | --- |
| `sm` | 75 | 56 | `--nav-height-sm-reduced` | 40 | `--nav-logo-sm-reduced` |
| `lg` | 160 | 83 | `--nav-height-reduced` | 59 | `--nav-logo-reduced` |

> `sm` no tiene frame reducido en Figma (`1024-sm` solo trae la barra de 75).
> Las medidas 75 → 56 y 48 → 40 son una **decisión del equipo (2026-11-03)**,
> registrada en [`interactions.md`](interactions.md) §Navegación reducida.

## Radios

Ningún nodo leído (`nav`, `goal-card`, `buttons`, `form`, `header-two-columns`)
devuelve `cornerRadius`: **esquinas rectas** (`--radius-none: 0`). Los círculos
(avatares, puntos del dotnav) son `Ellipse` → `--radius-circle`.
