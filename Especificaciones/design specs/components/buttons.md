---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/buttons` (`14:74`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info`)
---

# Componente: `buttons`

`COMPONENT_SET` `14:74`.

## Anatomía

Contenedor (relleno o stroke) > `icons-and-text` > [`icons/heart-fill` 16/24] +
`Botón` [`icons/heart-fill` 16/24]. Los dos `heart-fill` son **ornamentos del
maestro**: el baseline de la vista no los renderiza.

## Variantes y estados

Propiedad del set: **`size`** (xs | s | base | m | l | xl). **No hay** variantes
`hover`, `disabled`, `loading` ni `status`: los estados hover están en el frame
`hovers` `4518:2148` (ver [`../interactions.md`](../interactions.md)).

| Variante | Nodo | Tamaño | Relleno | Tipografía del rótulo |
| --- | --- | --- | --- | --- |
| `size=xs` | `13:73` | 85×37 | `#191919` | DM Sans Black **14.2 / 21.3**, ls 1.704 |
| `size=s` | `14:75` | 97×44 | `#191919` | DM Sans Black **16 / 24**, ls 1.92 |
| `size=base` | `14:80` | 113×47 | `#191919` | DM Sans Black **18 / 27**, ls 2.16 |
| `size=m` | `14:83` | 126×54 | `#191919` | DM Sans Black **20.2 / 30.3**, ls 2.424 |
| `size=l` | `14:86` | 137×57 | `#191919` | DM Sans Black **22 / 33**, ls 2.64 |
| `size=xl` | `14:89` | 155×66 | `#191919` | DM Sans Black **25.6 / 38.4**, ls 3.072 |

## Instancias observadas en `1448-lg` (con overrides de relleno)

| Instancia | Nodo | Tamaño | Relleno | Uso |
| --- | --- | --- | --- | --- |
| CTA hero «Nuestro programa» | `2325:3794` | **266×47** | `#ffcd00` | `inicio` › `encabezado-contenido` |
| CTA hero «Únete» | `2325:3817` | 107×47 | outline `#30250f` | ídem |
| Botón Aporta (nav lg) | `315:5105` | **85×37** | `#ffcd00` | `right-nav > buttons` |
| Botón secundario (nav lg) | `315:5106` | 109×37 | outline `#30250f` | ídem |
| «Leer más» de `goal-card` | `2325:3908` | 123×44 | `#003399` | dentro de `goal-card` |
| CTA del modal | `2358:1158` | 266×47 | `#ffcd00` | `Objetivo-modal` |

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Relleno primario | `--color-button-fill` | `#ffcd00` |
| Rótulo / outline | `--color-text-brown` | `#30250f` |
| Padding vertical (`size=m`, 47 = lh 27 + 20) | `--btn-padding-y-m` | 10px |
| Tracking (`size=m`) | `--btn-tracking-m` | 2.16px |

`cornerRadius` no está en ningún nodo → **esquinas rectas** (`--radius-none`).

## Comportamiento

`get_reactions` (224 acciones en `1448-lg`): los CTA del hero navegan a
`Programa` y `Únete`; el CTA de `seccion-objetivos` navega a `Programa`; el
del modal navega a `Programa`; los de `sección-puntos` navegan a `Únete`.
Todas `NAVIGATE` con `DISSOLVE` 0,3 s.

## Accesibilidad

Rótulo `#30250f` sobre `#ffcd00`: ratio en
[`../accessibility.md`](../accessibility.md).

## Baseline

- `tests/test-vanguardia/baseline/buttons-s.png` — par `buttons-s` (instancia
  del nav, 94×37).
- `tests/test-vanguardia/baseline/buttons-m.png` — par `buttons-m`
  (instancia `2325:3794`, 266×47).
