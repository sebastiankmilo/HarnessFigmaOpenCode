---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/footer` (`4370:4879`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info, get_reactions`)
---

# Componente: `footer`

`COMPONENT_SET` `4370:4879`.

## Anatomía

Variante `size=lg` (`4370:4878`, 1448×405, relleno **`#ffd633`**):

1. `icons/logo` `4370:4828` — 128×128, booleano `#191919`.
2. `footer-nav` `4370:4829` (1384×117):
   - `platforms` `4370:4830` — 184×24, 5 iconos 24×24
     (`facebook`, `instagram`, `youtube`, `x`, `tik-tok`), fill `#30250f`.
   - `Frame 5` `4370:4836` — 1384×21, **7 enlaces**: Inicio · Programa ·
     Decálogo · Únete · La Materia Prima · Aporta · Pólitica de privacidad,
     todos `#30250f`.
   - Copyright `4370:4844` — 1384×24, `#30250f`.

## Variantes y estados

Propiedad del set: **`size`** (xs | sm | lg). Sin variantes de estado.

| Variante | Nodo | Tamaño | `footer-nav` | `Frame 5` (enlaces) |
| --- | --- | --- | --- | --- |
| `size=lg` | `4370:4878` | **1448×405** | 1384×117 | 1384×21 (una línea) |
| `size=sm` | `4436:2833` | **768×450** | 720×162 | 558×66 (dos líneas) |
| `size=xs` | `4440:3129` | **375×715** | 333×427 | PENDIENTE-FIGMA (no se leyó en profundidad) |

## `1024-sm`

### Barra (variante `size=sm`)

`4436:2833` — **768×450**, relleno `#ffd633`.

| Parte | Nodo | Tamaño |
| --- | --- | --- |
| `icons/logo` | `4436:2834` | 128×128 (booleano `#191919`) |
| `footer-nav` | `4436:2835` | **720×162** |
| ↳ `platforms` | `4436:2836` | 184×24 (5 iconos) |
| ↳ `Frame 5` | `4436:2842` | **558×66** — los 7 enlaces pasan a **dos líneas** |
| ↳ copyright | `4436:2850` | 720×24 |

Comparado con `lg` (`1384×117`, enlaces en una sola línea de 1384×21): en `sm`
la fila de enlaces se parte y `footer-nav` pasa de 117 a 162 de alto.

### Instancias en las páginas `sm`

| Página | Instancia | Tamaño |
| --- | --- | --- |
| inicio | `4436:3004` | 768×450 |
| programa | `4442:3668` | 768×450 |
| decálogo | `4442:3714` | 768×450 |
| Únete | `4442:3760` | 768×450 |
| política | `4442:3806` | 768×450 |

Además, `programa` y `decálogo` en `sm` contienen un frame **`footer`** plano
(`2408:1858` y `2408:2100`, ambos **768×405**) hermano de las secciones, junto
al `components/footer` de la tabla. Son dos representaciones del pie en la misma
página; la instancia del componente es la que se usa.

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Fondo | `--color-footer-bg` | `#ffd633` |
| Texto e iconos | `--color-text-brown` | `#30250f` |
| Padding vertical lg | `--space-7` | 64px |

Los iconos van **oscuros sobre amarillo**: no aplica ningún filtro
`brightness/invert`.

## Comportamiento

`get_reactions`: en **todas** las páginas, `footer-nav > Frame 5 > <enlace>`
navega a su destino con `NAVIGATE`; `icons/logo` navega a `inicio`. El enlace
de la página actual apunta a `destinationId: null`. `platforms > icons/*`
ejecutan acciones **`URL`** (Facebook, Instagram, YouTube, X, TikTok).

## Accesibilidad

Par `#30250f` sobre `#ffd633` — ratio en
[`../accessibility.md`](../accessibility.md).

## Baseline

No tiene par propio; se juzga dentro de los pares de página
(`tests/test-vanguardia/baseline/*-1448.png`).
