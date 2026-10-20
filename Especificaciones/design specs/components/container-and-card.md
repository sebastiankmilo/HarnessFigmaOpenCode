---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/container-and-card` (`91:973`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info, get_reactions`)
---

# Componente: `container-and-card`

`COMPONENT_SET` `91:973`.

## Anatomía

Dos familias según `type`:

- **`type=container`** → `text-and-button` > `text` + `components/buttons`
  (CTA externo).
- **`type=card`** → `components/images` (con la etiqueta de ratio) +
  `text-container` > `text` (título + cuerpo).

## Variantes y estados

Propiedades: `type` (container | card), `size` (xs | sm | lg),
`orientation` (horizontal | vertical). **10 variantes**, sin estados de hover
en el set (el hover está en `hovers` `4518:2148`, pares `4518:2299` /
`4518:2309`).

| Variante | Nodo | Tamaño |
| --- | --- | --- |
| `type=container, size=xs, orientation=vertical` | `91:972` | 343×499 |
| `type=card, size=xs, orientation=vertical` | `93:129` | 343×474 |
| `type=container, size=sm, orientation=horizontal` | `106:2897` | 720×348 |
| `type=container, size=sm, orientation=vertical` | `106:2961` | 348×503 |
| `type=card, size=sm, orientation=horizontal` | `107:2200` | 720×348 |
| `type=card, size=sm, orientation=vertical` | `107:2253` | 348×473 |
| `type=container, size=lg, orientation=horizontal` | `113:6079` | 592×280 |
| `type=container, size=lg, orientation=vertical` | `113:6173` | 280×483 |
| `type=card, size=lg, orientation=horizontal` | `113:6316` | 592×280 |
| `type=card, size=lg, orientation=vertical` | `113:6341` | 280×490 |

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Alto de la tarjeta de artículo (lg) | `--article-card-height` | 525px |
| Fondo hover | `--color-card-hover` | `#f0ece6` |

## Comportamiento

`get_reactions`: los 4 `container-and-card` de `inicio › sección-La-Materia-Prima`
ejecutan acciones **`URL`** externas a `lamateriaprima.org`
(4 artículos + el CTA de la sección, que es un `components/buttons`).

## Accesibilidad

Los enlaces abren en el mismo contexto (acción `URL`, sin `target` en Figma):
**PENDIENTE-FIGMA** si deben abrir en pestaña nueva.

## Baseline

No tiene par propio; se juzga dentro del par `inicio-1448`.
