---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/nav` (`36:720`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info, get_reactions`)
---

# Componente: `nav`

`COMPONENT_SET` `36:720` en la página `components-diseño`.

## Anatomía

Variante usada en desktop, `size=lg` (`111:5222`, 1448×160, relleno `#fdfcfa`):

1. `logo` → `icons/logo` `111:5224` (96×96, booleano `#191919`). El set trae
   además `logo-dorado` `4362:3364` y dos `logo-color` (`4331:2649`,
   `4331:2133`) como capas hermanas.
2. `right-nav` `111:5225` (1043×53), con 4 bloques:
   - `links` `111:5226` (451×53) → 4 × `link` (88 / 88 / 88 / 91 de ancho):
     texto `#30250f` + `Line 8` (stroke `#ffffff`, opacidad 0 sobre `#fdfcfa`).
   - `buttons` `315:5104` (210×37) → `315:5105` 85×37 relleno `#ffcd00` y
     `315:5106` 109×37 outline `#30250f`.
   - `platforms, search and toggle` `111:5236` (236×24) → `platforms`
     184×24 (5 iconos 24×24, gap 16) y `search and toggle` 24×24.
   - `links` `4672:2012` (62×53) → selector de idioma `Es` (19) / `/` (7) /
     `PT` (20).

## Variantes y estados

Propiedades del set: `size` (xs | sm | lg) y `status` (open-modal, solo en xs).
**El set no tiene variantes `hover`/`focus`/`disabled`/`current-page`**: los
estados hover están dibujados aparte, en el frame `hovers` `4518:2148`
(ver [`../interactions.md`](../interactions.md) §Estados).

| Estado | Variante Figma | Nodo | Medida | Notas |
| --- | --- | --- | --- | --- |
| default móvil | `size=xs` | `36:719` | **375×83** | relleno `#fdfcfa`; `logo-dorado` 48×51; `platforms` 104×24 (3 iconos); `search and toggle` 64×24; **sin enlaces de texto**; bloque derecho 200×24 |
| menú abierto | `size=xs, status=open-modal` | `38:1012` | PENDIENTE-FIGMA | contiene `nav-content`, `links-platforms-buttons` y un `links` extra (`4672:3813`) |
| default tablet | `size=sm` | `101:3316` | **768×75** | `logo` 48×79; `right-nav` 603×57 con **3 enlaces** (88/88/91) + `platforms` 184×24 + `search and toggle` 64×24; **sin botones** |
| default desktop | `size=lg` | `111:5222` | **1448×160** | `logo` 96×96; **4 enlaces** + 2 botones + 5 plataformas + búsqueda/hamburguesa + selector ES/PT |

## `1024-sm`

### Barra (variante `size=sm`)

`101:3316` — **768×75**, relleno `#fdfcfa`.

| Parte | Nodo | Tamaño | Contenido |
| --- | --- | --- | --- |
| `logo` | `101:3354` | 48×79 | `logo-dorado` `4436:1995` 48×51 |
| `right-nav` | `102:3367` | 603×57 | 3 bloques |
| ↳ `links` | `102:3361` | 299×36 | **3 enlaces**: 88 / 88 / 91 |
| ↳ `platforms` | `101:3319` | 184×24 | 5 iconos 24×24 |
| ↳ `search and toggle` | `101:3323` | 64×24 | `icons/search` + `icons/hamburger-two` |

**Sin botones** (`Aporta` no aparece en `sm`) y sin selector de idioma.

### Menú abierto (overlay)

Frame `nav` **`2424:446`** — **768×1024**, relleno `#f0ece6`:

| Parte | Nodo | Tamaño | Posición relativa |
| --- | --- | --- | --- |
| `components/nav` | `2424:973` | 768×1024 | 0,0 |
| `nav-content` | `2424:974` | 736×709 | x=16, y≈157 |
| `icons/close` | `2424:1003` | 24×24 | x=728 (borde derecho 16), y=24 |

### Instancias en las páginas `sm`

| Página | Instancia | Tamaño |
| --- | --- | --- |
| inicio | `2424:1959` | 768×75 |
| programa | `4436:3057` | 768×75 |
| decálogo | `2424:2007` | 768×75 |
| Únete | `2424:2055` | 768×75 |
| política | `2424:2103` | 768×75 |

## Medidas y tokens

| Elemento | Valor | Token |
| --- | --- | --- |
| Alto barra lg | 160 | `--nav-height-lg` |
| Alto barra sm / xs | 75 / 83 | `--nav-height-sm` / `--nav-height-xs` |
| Logo lg / sm / xs | 96 / 48 / 48 | `--nav-logo-lg` / `--nav-logo-sm` / `--nav-logo-xs` |
| Fondo | `#fdfcfa` | `--color-surface-page` |
| Texto de enlaces | `#30250f` | `--color-text-brown` |
| Gap entre bloques de `right-nav` | 28 | `--nav-gap-blocks` |
| Botón primario del nav | `#ffcd00` | `--color-button-fill` |

## Comportamiento

`get_reactions` sobre `1448-lg`: en **todas** las pantallas, `nav > logo` y
`nav > logo-dorado` navegan a `inicio`; `right-nav > links > link` navegan a
`Programa` (`2328:4307`), `Decálogo` (`2334:1005`) y `Únete` (`2335:1229`)
con transición `DISSOLVE` 0,3 s. El enlace de la página actual apunta a
`destinationId: null`. El selector `Es / / / PT` **no tiene reacciones**.

## Accesibilidad

`Line 8` del enlace activo: en `hovers` (`4672:3064`) el stroke pasa a
`#ff4520` → par `#30250f` sobre `#fdfcfa` y acento `#ff4520`. Contraste
calculado en [`../accessibility.md`](../accessibility.md).

## Baseline

`tests/test-vanguardia/baseline/nav.png` — par `nav`, viewport 1448.
