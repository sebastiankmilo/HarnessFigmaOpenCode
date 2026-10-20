# Componente: `nav`

---
fuente: Figma — página `components`, nodo `36:720` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`)
---

## Anatomía

`size=lg` (`111:5222`, la variante usada en `inicio`):

1. Contenedor de barra (1448×125, fondo `--color-surface-alt`).
2. `logo` → instancia `icons/logo` (96×96), centrada verticalmente (14.5 libres
   arriba y abajo), padding lateral **32**.
3. `right-nav`, con 3 bloques y **gap 28** entre ellos:
   - `links` → 4 × `link` (83/83/83/86 de ancho, **gap 24**): texto Bold 18/27
     `--color-text-primary` + `Line` de subrayado en el borde inferior del enlace
     (83–86×0, `--color-text-primary` en el activo, `--color-surface` en el resto).
   - `buttons` → 2 × `components/buttons` (relleno `--color-text-primary` y outline
     `--color-text-secondary`), **gap 16**, size=s (79×40 y 103×40).
   - `platforms, search and toggle` → `platforms` 5 × icono 24×24 (**gap 16**) y
     `search and toggle` 2 × icono 24×24 (**gap 16**), separados 16.

## Variantes y estados

Propiedades del set: `size` (xs | sm | lg) y `status` (open-modal, solo en xs).

| Estado | Variante Figma | Nodo | Medida | Notas |
| --- | --- | --- | --- | --- |
| default móvil | `size=xs` | `36:719` | 375×64 | padding **16**; logo 32×32; `platforms` 3×24 (gap 16); `search and toggle` 2×24 (gap 16); **sin enlaces de texto**; gap entre bloques 32 |
| menú abierto | `size=xs, status=open-modal` | `38:1012` | 375×812 | fondo `--color-surface-alt`; `icons/close` 32×32 arriba-derecha (padding 16); `nav-content` 343×417 centrado con logo 64×64, `links` 87×153, `platforms` 144×32 y `buttons` 343×40 |
| default tablet | `size=sm` | `101:3316` | **768**×64 | padding **16**; logo 32×32; `right-nav` con **3 enlaces** (gap 16) + `platforms` 104 + `search and toggle` 64 (gap 28); sin botones |
| default desktop | `size=lg` | `111:5222` | 1448×125 | padding **32**; logo 96×96; **4 enlaces** + 2 botones + 5 plataformas + búsqueda/hamburguesa |

- Existen **solo** estas 4 variantes: no hay variantes `hover`, `focus`, `active`,
  `disabled` ni `current-page` en Figma. PENDIENTE de especificación de diseño:
  sin ella, el agente no construye esos estados.
- Estado operativo observado: en `inicio` el enlace 1 muestra el subrayado
  `--color-text-primary` y los demás `--color-surface` (subrayado oculto sobre el
  fondo), es decir, un "enlace activo" implícito. En `Programa` el enlace 1 y en
  `Decálogo` el enlace 2 apuntan a **`destinationId: null`** (la pantalla actual);
  `Política de privacidad` no está en el nav, así que sus 4 enlaces tienen destino.
- Baseline: ver «Baseline por vista» más abajo (exportado 2026-10-19).

## Baseline por vista (exportación)

**Criterio (ticket Arness 2, 2026-10-19):** el baseline visual de `nav` **no**
se exporta del nodo maestro `111:5222` (guía de anatomía únicamente): se exporta
con `export_node_as_image` (PNG @1x) el **nodo de instancia tal como aparece en
cada vista**, con sus overrides. El par *maestro ↔ instancia real* produce
falsos positivos en el juez (el maestro tiene 2 botones + búsqueda; la vista
puede no tenerlos) — el juez lo detecta como `par_invalido` según la regla de
triage de [`tests/visual/rubric.md`](../../../tests/visual/rubric.md) §1.0.

Localizar la instancia en la tabla de secciones de la spec de la página
([`pages/inicio.md`](../pages/inicio.md)) o escaneando hijos `INSTANCE` del frame
con `scan_nodes_by_types`.

| Vista | Nodo de instancia | Baseline |
| --- | --- | --- |
| `1448-lg` › `inicio` (header) | `2338:2192` (1448×125) | `tests/visual/baseline/nav.png` |
| Otras vistas / breakpoints | *PENDIENTE: añadir fila al exportarlas* | — |

## Medidas y tokens

- Fondo: `--color-surface-alt`.
- Padding lateral: `--space-3` (16) en xs/sm, `--space-5` (32) en lg.
- Gap entre bloques de `right-nav`: 28 (medido, fuera de la escala `--space-*`;
  registrar tal cual).
- Gap de enlaces: `--space-4` (24) en lg, 16 en sm.
- Gap de botones y de iconos: `--space-3` (16).
- Tipografía de enlaces: `links/base` → `--font-size-body-base` + `--font-weight-bold`.
- Sin `border-radius` (`--radius-none`).

## Comportamiento

Ver [interactions.md](../interactions.md). Registrado con `get_reactions`:

| Origen | Trigger | Destino |
| --- | --- | --- |
| `logo` | click | `inicio` (`110:2277`) — NAVIGATE, DISSOLVE 0.3s |
| enlace 1 | click | `Programa` (`2328:4307`) |
| enlace 2 | click | `Decálogo` (`2334:1005`) |
| enlace 3 | click | `Únete` (`2335:1229`) |
| enlace 4 | click | URL externa `https://lamateriaprima.org/` |
| iconos de `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) |
| hamburguesa (`icons/hamburger-two`) | — | **sin reacción registrada**; el estado `open-modal` existe como variante pero el prototipo no expone su conexión |

## Accesibilidad

- Enlaces y texto sobre `--color-surface-alt`: 20.12:1 (`--color-text-primary`).
- Foco visible: **no especificado en Figma** — PENDIENTE de diseño
  (obligatorio en `AGENTS.md`).
- El menú móvil es un modal a pantalla completa (`status=open-modal`): requiere
  cierre por `icons/close` y, al abrir, foco atrapado y restauración al cerrar —
  comportamiento no documentado en el prototipo.

## Instancias en `375-xs` (leídas el 2026-10-04)

Las 7 pantallas usan una instancia de `components/nav` de **375×80** (la variante
`size=xs` mide 64): la medida de la instancia manda sobre la de la variante.

- Relleno `--color-surface-alt`, padding lateral **16**, `icons/logo` **48×48**
  centrado verticalmente ((80−48)/2 = 16).
- Bloque derecho a `xs`: **solo se renderiza `icons/hamburger-two` (24×24)**, a
  **16** del borde derecho y centrado verticalmente ((80−24)/2 = 28).
  **Relectura `2026-10-04` con `export_node_as_image` sobre `2392:2395` (PNG @2x)**:
  en la instancia, `platforms` (104×24), `icons/search` y la hamburguesa comparten
  la misma coordenada (`x=335` relativa al frame) y `xiao-hong-shu`/`wechat` caen
  **fuera** del frame de 375; el export devuelve **únicamente la hamburguesa** (las
  capas debajo no se ven). **Decisión**: la barra `xs` implementa **logo +
  hamburguesa**; las plataformas viven en el overlay del menú (6) y en `lg` siguen
  siendo las 5 de escritorio. La nota anterior («se mantiene el contenido de la
  variante `xs`») queda **superada por esta relectura**.

### Overlay del menú abierto — frame `2396:2902` (375×812)

Instancia `2396:3288`, relleno `--color-surface-alt`:

| Elemento | Nodo | Medida / valor |
| --- | --- | --- |
| `icons/close` | `I2396:3288;38:1068` | **32×32**, esquina superior derecha (padding **16**) |
| `nav-content` | `I2396:3288;38:1048` | **343×591**, centrado (110.5 libres arriba y abajo) |
| `icons/logo` | `I2396:3288;38:1049` | **64×64**, centrado |
| `links` | `I2396:3288;38:1051` | **5 enlaces**, `link-nav` de alto **35** (texto 27 + subrayado 1 px a 8), gap **24** (paso 59), Bold 18/27. **Centrados uno a uno**: el frame mide 191 de ancho (el de «Política de privacidad») y cada `link-nav` arranca en una `x` distinta con el mismo centro (1449.5) |
| `buttons` | `I2396:3288;38:1065` | **Solo «Aporta» 87×40** (relleno `#000000`, etiqueta Bold 16/24 blanca, centrado en el frame de 343). El segundo nodo (`38:1067`, outline 103×40 con `strokes #000000` y **sin contenido visible**) **no aparece en el export** → no se implementa, mismo criterio que el outline de la barra `lg` |
| `platforms` | `I2396:3288;38:1061` | **5 iconos 32×32 visibles**: fila 1 (facebook, instagram, youtube) e fila 2 (**x, tik-tok**, como par de 88 centrado en la caja de 145), gap **24**, caja **145×88**. El nodo `icons/wechat` existe (x 1489) pero está **oculto**: `scan_nodes_by_types` no lo devuelve y el export no lo pinta (misma evidencia que la barra, cuyos `platforms`/`search` tampoco se devuelven) → **no se implementa** |

Gaps dentro de `nav-content`: logo→links **64** · links→buttons **32** ·
buttons→platforms **32**. Enlaces, en orden: Programa · Decálogo · Únete ·
La Materia Prima · Política de privacidad.

El overlay con **5 enlaces centrados, botón «Aporta» único y 5 plataformas en 2
filas** es el que implementan los 5 HTML (relectura del render `2026-10-04`,
decisión 8 del plan — el diseño renderizado es la fuente de verdad).

## Instancias en `1024-sm` (leídas el 2026-10-05)

Las 5 pantallas usan una instancia de `components/nav` de **768×75** (la variante
`size=sm` mide 768×64): otra vez la medida de la instancia manda.

- Relleno `--color-surface-alt` (`#fafafa`), padding lateral **16**, `icons/logo`
  **48×48** a `y=11.5`.
- Bloque derecho `right-nav` **236×57** (offset `x=516`, padding derecho **16**):
  `platforms` **184×24** (5 iconos 24×24 con gap **16**) + `search and toggle`
  **24×24** en el que **solo se renderiza `icons/hamburger-two`** (el `icons/search`
  está oculto, misma evidencia que en `xs`: `export_node_as_image` sobre
  `2424:1959` pinta logo + 5 plataformas + hamburguesa).
- El frame `links` (284×36, 3 «Enlace» de relleno) **existe en el árbol pero no
  aparece en el render** → oculto, no se implementa.
- Reacción: `search and toggle` → `OVERLAY 2424:446`; el padre `platforms, search
  and toggle` apunta además a `OVERLAY 2396:2902` (nav de `375-xs`) — hallazgo
  registrado en [interactions.md](../interactions.md); la implementación sigue
  `2424:446`.

### Overlay del menú abierto — frame `2424:446` (768×1024)

Relleno `--color-surface-alt`; `components/nav` `2424:973` ocupa todo el frame.

| Elemento | Nodo | Medida / valor |
| --- | --- | --- |
| `icons/close` | `2424:1003` | **32×32**, esquina superior derecha (`x=715` → padding **21**, `y=18`), reacción `CLOSE` con devolución de foco |
| `nav-content` | `2424:974` | **736×591**, centrado en los dos ejes (padding h **16**, 216.5 arriba y abajo) |
| `icons/logo` | `2424:975` | **64×64**, centrado en el frame de 768; reacción `NAVIGATE 268:3128` |
| `links` | `2424:977` | **5 `link-nav`**, alto 35 (texto 27), gap **24** (paso 59), Bold **18/27**, centrados uno a uno (frame 191 de ancho). Destinos: `2408:1816`, `2408:2098`, `2408:2315`, URL `https://lamateriaprima.org/`, `2421:1246` |
| `buttons` | `2424:993` | **Solo «Aporta» 87×40** visible (relleno `#000000`, etiqueta Bold 16/24 blanca). El segundo nodo `2424:995` (outline 103×40) **no aparece en el render** → no se implementa |
| `platforms` | `2424:996` | **5 iconos 32×32 visibles** (facebook, instagram, youtube / x, tik-tok), caja **145×88**, gap **24**; `icons/wechat` existe pero está **oculto** en el render → no se implementa |

Gaps dentro de `nav-content`: logo→links **64** · links→buttons **32** ·
buttons→platforms **32**. Enlaces, en orden: Programa · Decálogo · Únete ·
La Materia Prima · Política de privacidad.

## Diseño definitivo `1448-lg` (leído el 2026-10-20)

### Instancias desktop: **1448×160** (eran 125)

Las 5 pantallas usan instancias nuevas del componente (`4442:1753` en `inicio`,
`4442:1914` en `Programa`, `4442:2075` en `Decálogo`, `2338:2384` en `Únete`,
`2338:2512` en `Política`), todas **1448×160**, relleno `#fdfcfa`. El
`right-nav` (828×53) es **idéntico al de `navegación-reducida`** (ver abajo):
4 enlaces (Programa · Decálogo · Únete · La Materia Prima), botón «Aporta»
`#ffcd00` 94×37 + outline 109×37, 5 plataformas 24×24 + búsqueda + hamburguesa.
Enlaces: DM Sans Black 14.2/21.3, `letter-spacing` 1.704, texto `#30250f`;
`Line 8` de subrayado con stroke opacidad 0 (oculto por defecto).

- El alto pasa de 125 a **160** → token `--nav-height-lg` se actualiza en
  `tokens.css` (implementación del ticket 4).
- Los logos `logo-color`/`logo-dorado` apilados dentro de la instancia son
  variantes de diseño; el ícono renderizado es `icons/logo` 96×96 `#191919`.

### `navegación-reducida` — frame `4518:1968` (1448×83)

Header compacto que permanece fijo al hacer scroll (comportamiento en
[interactions.md](../interactions.md)). Relleno `#fdfcfa`:

| Elemento | Nodo | Medida / valor |
| --- | --- | --- |
| `logo` | `4518:2072` | **96×96**, `icons/logo` `#191919` |
| `right-nav` | `4518:2074` | **828×53** (mismo que en las instancias 160) |
| `links` | `4518:2075` | 4 × `link`: Programa 95×35, Decálogo 92×37, Únete 53×37, La Materia Prima 158×37; texto `#30250f` + `Line 8` |
| `buttons` | `4518:2088` | «Aporta» `components/buttons` **94×37** relleno `#ffcd00` + outline **109×37** stroke `#30250f` |
| `platforms, search and toggle` | `4518:2091` | **184×24**: 5 plataformas 24×24 + `search and toggle` 24×24 (search + hamburger) |

- Diferencia con la barra de 160: alto (83 vs 160) y logo monochrome 96×96
  (`icons/logo`) en lugar del logo color/dorado apilado.
- El prototipo **no tiene trigger de scroll** (0 reacciones `SCROLL_TO`/
  `AFTER_TIMEOUT`): el umbral se define en [interactions.md](../interactions.md)
  a partir de la altura del header completo.
