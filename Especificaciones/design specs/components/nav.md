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
| `nav-content` | `2424:974` | 736×709 | x=16, y≈157,5 |
| `icons/close` | `2424:1003` | 24×24 | x=728 (borde derecho 16), y=24 |

Dentro de `nav-content`:

| Parte | Nodo | Tamaño | Detalle |
| --- | --- | --- | --- |
| `logo-dorado` | `4439:3417` | 128×137 | PNG con transparencia `logo-menu.png` (256×275 @2x) |
| `links` | `2424:977` | 239×256 | 5 enlaces de 32 (16 px Black, tracking 1.92) con 24 entre sí |
| `buttons` | `2424:993` | 736×44 | «Aporta» `2424:994` 107×44, relleno `#ffcd00`, texto `#30250f` |
| `platforms` | `2424:996` | 145×32 | 5 iconos de 32 con gap 24; la fila visible mide 256 (los hijos desbordan el frame) |
| `links` (idioma) | `4672:3475` | 83×32 | `ES` 22 + 16 + `/` 7 + 16 + `PT` 22; el inactivo es `#9e9382` |

Separación vertical: logo → enlaces 64; entre enlaces, botón, plataformas e
idioma, 48. El contenido queda centrado en el viewport (y≈157,5 en 1024).

### Instancias en las páginas `sm`

| Página | Instancia | Tamaño |
| --- | --- | --- |
| inicio | `2424:1959` | 768×75 |
| programa | `4436:3057` | 768×75 |
| decálogo | `2424:2007` | 768×75 |
| Únete | `2424:2055` | 768×75 |
| política | `2424:2103` | 768×75 |

## `375-xs`

### Barra (variante `size=xs`)

Instancias **375×83,38**, relleno `#fdfcfa`; logo 48 y los 3 iconos móviles
(`is-mobile`) + hamburguesa. Alto actualizado por el ticket 6 (§2.3).

La barra es `position: fixed` con `body { padding-top: 83,38 }`; al superar
83,38 de scroll pasa a **56** y el logo de **48 → 40**, con transición de
0,3 s (mismo patrón que sm/lg; decisión 2026-11-03).

### Menú abierto (overlay)

Frame **`2396:2902`** — **375×812**, relleno `#f0ece6`:

| Parte | Nodo | Tamaño | Detalle |
| --- | --- | --- | --- |
| `nav-content` | `2396:3288;38:1048` | 343×609 | x=16, y≈101,5 (centrado) |
| `logo-color` | `2396:3288;4835:3945` | 96×103 | PNG transparente `logo-menu.png` |
| `links` | `2396:3288;38:1051` | 212×241 | 5 enlaces de 29 (14,2 Black, tracking 1.704) con 24 entre sí |
| `buttons` | `2396:3288;38:1065` | 343×44 | «Aporta» `38:1066` 107×44, `#ffcd00` |
| `platforms` | `2396:3288;38:1061` | 343×32 | 5 iconos de 32 con gap 24, en una fila |
| `links` (idioma) | `2396:3288;4672:3813` | 82×29 | `ES` / `/` / `PT` 14,2 Black tracking 1.704 |
| `icons/close` | `2396:3288;38:1068` | 24×24 | x=335 (borde derecho 16), y=24 |

Separación vertical: logo → enlaces 64; entre enlaces, botón, plataformas e
idioma, 32. El contenido queda centrado en el viewport (y≈101,5 en 812).

## Medidas y tokens

| Elemento | Valor | Token |
| --- | --- | --- |
| Alto barra lg | 160 | `--nav-height-lg` |
| Alto barra sm / xs | 75 / 83,38 | `--nav-height-sm` / `--nav-height-xs` |
| Alto barra xs / sm reducida | 56 / 56 | `--nav-height-xs-reduced` / `--nav-height-sm-reduced` |
| Logo lg / sm / xs | 96 / 48 / 48 | `--nav-logo-lg` / `--nav-logo-sm` / `--nav-logo-xs` |
| Logo xs / sm reducido | 40 / 40 | `--nav-logo-xs-reduced` / `--nav-logo-sm-reduced` |
| Fondo | `#fdfcfa` | `--color-surface-page` |
| Fondo del overlay xs / sm | `#f0ece6` | `--color-surface-menu` |
| Ancho de `nav-content` en xs / sm | 343 / 736 | `--menu-content-width-xs` / `--menu-content-width` |
| Logo / close del overlay xs | 96 / 24 | `--icon-menu-logo` / `--icon-menu-close` |
| Logo / close del overlay sm | 128 / 24 | `--icon-menu-logo-sm` / `--icon-menu-close-sm` |
| Tracking de los textos del overlay xs / sm | 1.704 / 1.92 | `--nav-link-tracking` / `--menu-link-tracking` |
| Padding vertical del «Aporta» del overlay | 10 | `--menu-btn-padding-y` |
| Texto de enlaces | `#30250f` | `--color-text-brown` |
| Gap entre bloques de `right-nav` | 28 | `--nav-gap-blocks` |
| Botón primario del nav | `#ffcd00` | `--color-button-fill` |

## Comportamiento

`get_reactions` sobre `1448-lg`: en **todas** las pantallas, `nav > logo` y
`nav > logo-dorado` navegan a `inicio`; `right-nav > links > link` navegan a
`Programa` (`2328:4307`), `Decálogo` (`2334:1005`) y `Únete` (`2335:1229`)
con transición `DISSOLVE` 0,3 s. El enlace de la página actual apunta a
`destinationId: null`. El selector `Es / / / PT` **no tiene reacciones**.

La barra es `position: fixed` en los tres breakpoints y `body` reserva su
altura con `padding-top`. Al superar el alto completo se aplica `.is-reduced`:
`83,38 → 56` con logo `48 → 40` en xs, `75 → 56` con logo `48 → 40` en sm
(decisión 2026-11-03, ver
[`../interactions.md`](../interactions.md) §Navegación reducida) y
`160 → 83` con logo `96 → 59` en lg (`4518:1968`).

El overlay de menú (`#site-menu`) se abre/cierra con un fade de 0,3 s y un
desplazamiento de 12 px de su contenido (decisión 2026-11-03, ver
[`../interactions.md`](../interactions.md) §Menú de navegación (overlay sm/xs)).

## Accesibilidad

`Line 8` del enlace activo: en `hovers` (`4672:3064`) el stroke pasa a
`#ff4520` → par `#30250f` sobre `#fdfcfa` y acento `#ff4520`. Contraste
calculado en [`../accessibility.md`](../accessibility.md).

## Baseline

`tests/test-vanguardia/baseline/nav.png` — par `nav`, viewport 1448.
