---
fuente: Figma — páginas `1448-lg` y `components-diseño` — pares de rellenos leídos con `get_node_info`
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_node_info, get_styles`)
---

# Accesibilidad derivada del diseño

Ratios calculados con la fórmula WCAG 2.1 (relativo a la luminancia), sobre los
pares de relleno **leídos de Figma**, no supuestos.

## Contraste de pares texto/fondo

| Par | Fondo | Texto | Ratio | AA normal (4.5) | AA grande (3.0) | Dónde |
| --- | --- | --- | --- | --- | --- | --- |
| nav / enlaces / footer sobre fondo de página | `#fdfcfa` | `#30250f` | **14.66** | SÍ | SÍ | `--color-text-brown / --color-surface-page` |
| titulares (hero, modal, goal-card) | `#fdfcfa` | `#53411e` | **9.56** | SÍ | SÍ | `--color-heading-brown / --color-surface-page` |
| cuerpo de texto | `#fdfcfa` | `#333333` | **12.32** | SÍ | SÍ | `--color-text-secondary / --color-surface-page` |
| rótulo de botón primario | `#ffcd00` | `#30250f` | **10.01** | SÍ | SÍ | `--color-text-brown / --color-button-fill` |
| texto e iconos del footer | `#ffd633` | `#30250f` | **10.68** | SÍ | SÍ | `--color-text-brown / --color-footer-bg` |
| rótulo «Leer más» de goal-card | `#003399` | `#fdfcfa` | **10.59** | SÍ | SÍ | `--color-surface-page / #003399` |
| idioma inactivo (PT) | `#fdfcfa` | `#9e9382` | **2.95** | NO | NO | `--color-lang-inactive / --color-surface-page` |
| acento de hover (subrayado, no texto) | `#fdfcfa` | `#ff4520` | **3.34** | NO | SÍ | `--color-hover-accent / --color-surface-page` |
| título sobre tarjeta en hover | `#53411e` | `#f0ece6` | **8.33** | SÍ | SÍ | `--color-card-hover / --color-heading-brown` |
| rótulo del set maestro de botones | `#000000` | `#ffffff` | **21.00** | SÍ | SÍ | `--color-on-dark / #000000` |

> «AA normal» exige 4,5:1 para texto corriente; «AA grande» exige 3,0:1 para
> texto ≥ 24 px (o ≥ 18,66 px en negrita). Los titulares de `h1`/`h2` con Bebas
> a 46 px o más entran en la categoría grande.

## Estados de foco

**PENDIENTE-FIGMA**: ningún nodo de `components-diseño` ni de `1448-lg` expone
un estado `focus` (el `COMPONENT_SET` de `nav` solo tiene `size` y `status`;
el de `buttons` solo `size`). El diseño no especifica foco visible → se toma de
la regla de accesibilidad del proyecto, no se inventa aquí.

## Movimiento

- Prototipo: `DISSOLVE` / `MOVE_IN` de **0,3 s** con `EASE_OUT`.
- Indicación del diseñador (`4649:2012`): `transition: all .4s ease` en hover.
- Indicación `4649:2018`: no animar el above the fold (impacto en Lighthouse).

**PENDIENTE-FIGMA**: si existe soporte de `prefers-reduced-motion` en el
diseño; Figma no lo modela.

## Elementos interactivos sin estado especificado

| Componente | Estados que **sí** están dibujados | Estados que faltan |
| --- | --- | --- |
| `nav` (`36:720`) | hover de enlaces (en `hovers`) | `focus`, `active`, `disabled`, `current-page` |
| `buttons` (`14:74`) | hover (en `hovers`) | `focus`, `disabled`, `loading` |
| `goal-card` (`4436:2781`) | hover (en `hovers`) | `focus` |
| `container-and-card` (`91:973`) | hover (en `hovers`) | `focus` |
| `dotnav` (`114:6780`) | — | `focus`, indicador de punto activo en el set |
