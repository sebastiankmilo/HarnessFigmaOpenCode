---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/header-two-columns` (`70:1341`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info`)
---

# Componente: `header-two-columns`

`COMPONENT_SET` `70:1341` — encabezado de dos columnas: bloque de texto +
botones a la izquierda, media a la derecha.

## Anatomía

`text-and-buttons` > `text` (título + lead) + `buttons` (2 ×
`components/buttons`). La media es un `components/images` hermano.

## Variantes y estados

Propiedades: `size` (xs | sm | lg) y `variant` (01 | 02). **6 variantes**,
sin estados.

| Variante | Nodo | Tamaño |
| --- | --- | --- |
| `size=xs, variant=01` | `70:1340` | 375×917 |
| `size=xs, variant=02` | `70:1483` | 375×973 |
| `size=sm, variant=01` | `103:1945` | 768×550 |
| `size=sm, variant=02` | `112:5449` | 768×695 |
| `size=lg, variant=01` | `103:2441` | **1448×708** |
| `size=lg, variant=02` | `112:5752` | **1448×828** |

## Instancia usada en `1448-lg`

El hero de `inicio` **no** es una instancia de este set: es un `FRAME` libre,
`encabezado-contenido` `2325:3824` (1448×740):

| Parte | Nodo | Tamaño | Medidas |
| --- | --- | --- | --- |
| Bloque de texto | `texto-y-botones` `4333:3201` | 794×471 | x=32 respecto al frame |
| Título | `2325:3792` | 792×74 | Bebas Neue **65.7 / 73.584**, ls 2.628, `#53411e` |
| Lead | `2325:3793` | 792×310 | DM Sans **18 / 30.96**, w400, `#333333` |
| Botones | `2325:3823` | 389×47 | 266×47 (`#ffcd00`) + 107×47 (outline) |
| Media | `components/images` `4329:2096` | **590×740** | pegada al borde derecho (x=858 relativo) |

**PENDIENTE-FIGMA**: qué relación guarda esta instancia libre con las
variantes `lg` del set (`103:2441` / `112:5752`); no se asume equivalencia.

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Título hero | `--font-size-display-hero` / `--line-height-display-hero` / `--tracking-display-hero` | 65.7 / 73.584 / 2.628 |
| Fondo | `--color-surface-page` | `#fdfcfa` |
| Margen lateral | `--space-5` | 32px |

## Comportamiento

`get_reactions`: los dos botones del hero de `inicio` navegan a `Programa`
(`2328:4307`) y `Únete` (`2335:1229`), `DISSOLVE` 0,3 s.

## Baseline

No tiene par propio; se juzga dentro del par `inicio-1448` (tile `t00`).
