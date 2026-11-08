---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/goal-card` (`4436:2781`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info`)
---

# Componente: `goal-card`

`COMPONENT_SET` `4436:2781`.

## Anatomía

Variante `size=lg` (`2326:3924`, 322×420, relleno `#fdfcfa`):

1. `Rectangle 177` `4347:1392` — media, 322×194 (relleno `#ebebeb` en el wireframe).
2. `text` `2325:3901` (322×162) > `text` `2325:3902` (274×162):
   - Título `2325:3903` 274×82, `#53411e`.
   - Cuerpo `2325:3904` 274×72, `#333333`.
3. `components/buttons` `2325:3908` 123×44, relleno `#003399`, rótulo
   `#fdfcfa` DM Sans 16/24 w900 («Leer más»).

## Variantes y estados

Propiedad del set: **`size`** (xs | sm | lg). **No hay variantes de estado**:
el hover está dibujado en el frame `hovers` `4518:2148`
(`4518:2257` default `#fdfcfa` ↔ `4518:2267` hover `#f0ece6`).

| Variante | Nodo | Tamaño | Media | Caja de texto |
| --- | --- | --- | --- | --- |
| `size=lg` | `2326:3924` | 322×420 | 322×194 | 322×162 (interna 274) |
| `size=sm` | `4436:2782` | 348×412 | 348×210 | 348×138 (interna 316) |
| `size=xs` | `4440:2731` | 343×412 | 343×210 | 343×138 (interna 311) |

Las tres variantes llevan el mismo botón 123×44 `#003399`.

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo default | `--color-surface-page` | `#fdfcfa` |
| Fondo hover | `--color-card-hover` | `#f0ece6` |
| Título | `--color-heading-brown` | `#53411e` |
| Cuerpo | `--color-text-secondary` | `#333333` |
| Relleno del CTA | `--color-link-underline` no aplica → `#003399` | **PENDIENTE-FIGMA** (no hay token `--color-goal-cta` en `tokens.css`) |

El **cuerpo de la card** usa `paragraphs/s` (16/24) sobre el texto largo del
objetivo —el mismo `body-complete` que desarrolla `Objetivo-modal` con
`paragraphs/base` (18/30,96)— y se recorta donde ya no cabe: se reserva el
**10 % inferior** del alto de la card y el cuerpo se queda con las líneas
enteras que entran hasta esa línea, con «…» al final (`-webkit-line-clamp`).
El número de líneas lo mide `inicio.js` (`--lineas`), porque depende del alto
de la card y de cuánto ocupe el título.

**Desviación del componente** (decisión de contenido, 2026-11-08): el
componente recorta a 3 líneas fijas (72 px = 3 × 24, la caja de `2325:3904`) y
muestra el extracto `body-small`. En la web la card enseña el texto largo, así
que la caja del componente ya no se cumple y la comparación visual contra
`baseline/goal-card.png` difiere a propósito.

## Comportamiento

`get_reactions`: cada `goal-card` de `seccion-objetivos` abre
`Objetivo-modal` (`2358:932`) como **`OVERLAY`** con `DISSOLVE` 0,3 s, tanto en
`ON_CLICK` como en `ON_DRAG`.

## Accesibilidad

Par título `#53411e` / fondo `#fdfcfa` y cuerpo `#333333` / `#fdfcfa`:
ratios en [`../accessibility.md`](../accessibility.md).

## Baseline

`tests/test-vanguardia/baseline/goal-card.png` — par `goal-card`, viewport 1448,
instancia `2326:3937` (322×615, la segunda de la grilla).
