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
| Placeholder de media | `--color-media-placeholder` | `#ebebeb` | variantes de `components/images` `19:91`…`243:5129` |
| Acento de hover | `--color-hover-accent` | `#ff4520` | `Line 8` del enlace sobre el que está el cursor en `hovers` → `right-nav` `4672:3064` |
| Hover de tarjeta | `--color-card-hover` | `#f0ece6` | segundo par de `goal-card` en `hovers` (`4518:2267`) |
| Idioma inactivo | `--color-lang-inactive` | `#9e9382` | `Es`/`PT` del selector en `hovers` → `links` `4672:2994` y `4672:3000` |
| Texto on-dark / sobre botón | `--color-on-dark` | `#ffffff` | `Botón` del set maestro `13:71` |

> `get_styles` devuelve `colors: []` en este archivo: **no hay estilos de color
> locales**. Todos los colores se leen de los rellenos de los nodos.

### Pares que exigen contraste AA
Ver [`accessibility.md`](accessibility.md).

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

## Radios

Ningún nodo leído (`nav`, `goal-card`, `buttons`, `form`, `header-two-columns`)
devuelve `cornerRadius`: **esquinas rectas** (`--radius-none: 0`). Los círculos
(avatares, puntos del dotnav) son `Ellipse` → `--radius-circle`.
