# Página: inicio

---
fuente: Figma — página `1448-lg`, frame `inicio` (`110:2277`); página `1024-sm`, frame `268:3128` (leído el 2026-10-05)
extraido: 2026-10-03 (sm: 2026-10-05)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_node_info`, `get_nodes_info`, `get_reactions`, `export_node_as_image`)
---

Frame: `110:2277` — 1448×4499. Ancho del contenedor de contenido: 1384 (padding
lateral 32). Ritmo vertical, grillas y alturas de sección:
[layout.md](../layout.md).

## Secciones (en orden)

| # | Sección | Nodo | Componentes usados | Baseline |
| --- | --- | --- | --- | --- |
| 1 | Header / nav | `2338:2192` (instancia `components/nav`, declarada la última pero colocada arriba, `y=-27` = origen del frame) | `nav` | `tests/visual/baseline/inicio-1448.png` — PENDIENTE (`tests/` fuera de alcance) |
| 2 | Encabezado con contenido | `2325:3824` | `buttons` ×2 + `icons/heart-fill` | — |
| 3 | Sección de video | `2325:3923` | `images` (media 1124×634 centrada) | — |
| 4 | Nuestros objetivos | `2326:4021` | `goal-card` ×4, `buttons`, `icons/prev`, `dotnav`, `icons/next` | — |
| 5 | La Materia Prima | `2328:4236` | `container-and-card` ×4, `images`, `buttons` | — |
| 6 | Únete | `2328:4249` | `images` (dos columnas 792 + 560) | — |
| 7 | Footer | `2328:4305` | `icons/logo-02`, `icons/facebook`, `icons/instagram`, `icons/youtube`, `icons/x`, `icons/tik-tok` | — |

Detalle de componentes extraídos en este ticket:
[components/nav](../components/nav.md),
[components/header-two-columns](../components/header-two-columns.md),
[components/goal-card](../components/goal-card.md).

## Detalle por sección

### 2 — `encabezado-contenido` (`2325:3824`)

1448×674, fondo `--color-surface-muted`, padding vertical **162**.

- `encabezado-texto` (`2325:3822`) 914×262, `pL=32`:
  - `2325:3792` «Vanguardia Colombiana» — Bold 52/58.24 (`--font-size-l-h1-xxl`),
    `--color-text-primary`.
  - `2325:3793` párrafo — Medium 20.2/30.3 (`--font-size-body-m`),
    `--color-text-secondary`, gap **24** bajo el título.
- `botones` (`2325:3823`) 343×52, `pT=460` (gap **36** bajo el bloque de texto):
  - `2325:3794` «Nuestro programa» — 224×52, relleno `--color-text-secondary`,
    etiqueta `--color-on-dark`. → `Programa` (`2328:4307`).
  - `2325:3817` «Únete» — 103×52, **outline** `stroke #333333` 1 px, fondo
    transparente (se ve `--color-surface-muted`), etiqueta `--color-text-secondary`.
    → `Únete` (`2335:1229`).
  - gap entre botones **16**.

### 3 — `sección-video` (`2325:3923`)

Grupo 1448×634, sin padding (media a sangre):

- `Rectangle 1` (`2325:3857`) 1448×634, relleno `--color-video-band` (`#adadad`).
- `video` (`2325:3922`) 1124×634, centrado (162 libres a cada lado):
  - `components/images` (`2325:3851`) `ratio=16:9`, relleno `--color-media-video`
    (`#c2c2c2`), etiqueta `16:9` en el offset fijo **(120, 66)**.
  - `Polygon 1` (`2325:3856`) — triángulo de play blanco, 96×85 medido, centrado por
    su **centroide** sobre la media → `left:50%; top:50%;
    transform: translate(-33.33%, -50%)`, ancho **8.5 %** del ancho de la media.

### 4 — `seccion-objetivos` (`2326:4021`)

1448×1065, sin relleno (hereda `--color-surface`), padding vertical **96**.

- `objetivos-texto` (`2326:3925`) 912×92, `pL=32`:
  - `2325:3890` «Nuestros objetivos» — Bold 36.49/40.87 (`--font-size-l-h1`).
  - `2325:3891` «Los puntos básicos que guían nuestras ideas y nuestro proyecto
    político son:» — Medium 18/27 (`--font-size-body-base`), gap **24**.
- `objetivos-tarjetas` (`2326:4209`) 1384×633, gap **48** bajo el texto:
  - `objetivos` (`2326:4020`) — grilla de **4** `goal-card` de 322 (gap **32**),
    alturas 537/537/**529**/537.
  - `Frame 1` (`2326:4032`) 1384×64, gap **32** bajo las tarjetas:
    `icons/prev` 64×64 (izquierda) · `components/dotnav` 80×8 centrado
    (centro exacto del contenedor, `y+28`) · `icons/next` 64×64 (derecha).
- `components/buttons` (`2326:4014`) «Nuestro programa» 224×52, gap **48** bajo la
  fila de paginación → `Programa` (`2328:4307`).

### 5 — `sección-La-Materia-Prima` (`2328:4236`)

1448×957.2, fondo `--color-surface-strong` (`#d6d6d6`), padding vertical **96**.

- `objetivos-texto` (`2326:4122`) 912×92, `pL=32`:
  - `2326:4123` «La Materia Prima» — Bold 36.49/40.87.
  - `2326:4124` «Revista dedicada al análisis de temas actuales desde el materialismo
    político.» — Medium 18/27, gap **24**.
- `artículos` (`2328:4234`) 1384×525.2, gap **48** bajo el texto — grilla de **4**
  `container-and-card` de 322 (gap **32**). Textos (título Bold 25.6/28.67 +
  entradilla Medium 16/24):
  1. «¿Está Cuba vendiendo una nueva imagen al mundo?»
  2. «Ontología del Materialismo Político»
  3. «¿De qué hablamos cuando hablamos del Materialismo Político?»
  4. «Elecciones en Colombia: Entre el fraude y la ilusión democrática»
- `components/buttons` (`2328:4237`) «lamateriaprima.org» 234×52, gap **48** bajo la
  grilla → URL externa `lamateriaprima.org`.

### 6 — `sección-únete` (`2328:4249`)

1448×638.7, fondo `--color-surface-alt`, padding vertical **96**. **Idéntica a la
sección 2 de la página [`Únete`](./unete.md)** (misma media 792×446.73, mismo bloque
de texto 560×285, mismo triángulo de play, gap 32 entre columnas).

### 7 — `footer` (`2328:4305`)

1448×405, fondo `--color-surface-dark` (`#333333`), padding vertical **64**.
Compartido por todas las pantallas: ver [components/footer](../components/footer.md).

## Puntos de entrada del prototipo

Registrados con `get_reactions` (tabla completa en
[interactions.md](../interactions.md)):

- Botones del encabezado → `Programa` (`2328:4307`) y `Únete` (`2335:1229`).
- Cada `goal-card` → abre `Objetivo-modal` (`2358:932`) como overlay.
- `container-and-card` y el botón de la sección → URL externa `lamateriaprima.org`.
- Nav y footer → navegación a las otras pantallas y a redes.

## Notas de verificación (2026-10-03, con `export_node_as_image`)

Registradas para no perder lo observado al implementar:

1. **Nav sin enlace activo**: en esta pantalla las 4 líneas de subrayado del nav **no
   son visibles** (el muestreo de píxeles del export devuelve color de fondo en
   `y=121–124`); **ningún enlace aparece activo**. (Contradice el texto de
   [components/nav](../components/nav.md), que afirma que el enlace 1 va en
   `--color-text-primary`.)
2. **`goal-card` sin botón**: en las 4 instancias el `components/buttons` «Leer más»
   está **oculto** (el export del nodo devuelve 1×1); el botón, además, apuntaba a
   `y=345` y se solapaba con el párrafo. Las tarjetas se renderizan con avatar,
   título y párrafo, **sin botón**. El componente por sí mismo sí lo muestra
   (ver [components/goal-card](../components/goal-card.md)).
3. **Paginación sin comportamiento en el prototipo**: `icons/prev` (`2326:4023`),
   `components/dotnav` (`2326:4033`) e `icons/next` (`2326:4026`) **no tienen
   reacciones** registradas (verificado también en `375-xs`: `2392:4005` y
   `2392:4101`). **Actualización v1.2 del ticket (2026-10-04)**: pese a eso, los
   controles **sí deben ser funcionales**; el comportamiento se definió en
   [interactions.md](../interactions.md) y se implementa en
   `site/scripts/inicio.js`.
4. **Iconos de los botones ocultos**: los dos `icons/heart-fill` de cada
   `components/buttons` están ocultos en todas las instancias de la pantalla.
5. **Colores sin token de rol**: la media de vídeo (`#c2c2c2`), la banda del vídeo
   (`#adadad`), el fondo de «La Materia Prima» (`#d6d6d6`) y el footer (`#333333`)
   — se añadieron como tokens de rol en [tokens.md](../tokens.md).
6. **Nav en `xs`/`sm`**: las variantes del componente traen los 3 iconos por
   defecto (`weibo`, `xiao-hong-shu`, `wechat`), no los 5 reales del `lg`, y en `sm`
   solo 3 enlaces con texto de relleno (`Enlace 01`). **Relectura `2026-10-04`**:
   el export de la instancia `2392:2395` renderiza **solo logo + hamburguesa**
   (`platforms`/`search` quedan ocultas o fuera del frame) → la implementación
   sigue **ese render**, no la variante (ver
   [components/nav.md](../components/nav.md)). El tramo tablet **ya no está
   pendiente**: se leyó el 2026-10-05 (barra 768×75 = logo + 5 plataformas +
   hamburguesa; overlay `2424:446`) y está documentado en la sección `sm` de
   este archivo, en [components/nav.md](../components/nav.md) y en
   [breakpoints.md](../breakpoints.md) (umbral **768px**). En `lg` se
   usan las instancias reales (5 plataformas, 4 enlaces).
7. **Enlaces sin destino en el prototipo**: los botones `Aporta` y `Botón` del nav y
   el enlace `Aporta` del footer **no tienen reacción**; se dibujan como elementos
   no interactivos hasta que el diseño los defina.
8. **Desviación respecto a Figma (registrada)**: en ambos footers el icono
   `youtube` apunta a Instagram. La implementación usa la URL de YouTube correcta
   (`https://www.youtube.com/@VanguardiaColombiana`, la misma que el `nav`); el valor
   real de Figma queda registrado en
   [interactions.md](../interactions.md) y [components/footer](../components/footer.md).
9. **Contenido del `Objetivo-modal`**: Figma define **un único** diálogo (título y
   cuerpo de la primera `goal-card`); las 4 tarjetas abren ese mismo diálogo.
   Contenido por objetivo: **PENDIENTE**.
10. **Revisión del header contra Figma (2026-10-03, export + muestreo de píxeles)**:
    - Fondo del nav: **`#fafafa`** (`--color-surface-alt`), idéntico en `xs` y `lg`.
    - **El botón outline «Botón» de la barra NO es visible** en las pantallas: el
      `buttons` de la instancia mide 87px y cubre solo «Aporta»; el muestreo en
      `y=42–82` devuelve fondo en `x=1212–1315`. La barra implementa **solo
      «Aporta»**; los dos botones se conservan en el menú móvil
      (`status=open-modal`), donde Figma sí los muestra.
    - **Subrayado del enlace activo**: negro, **4px**, anclado al borde inferior del
      nav (`y=121–124` de 125); en `inicio` no hay ninguno. Tokens
      `--nav-underline-lg` y `--nav-link-top` (offset del texto: `y=47`).
    - **Gaps del `right-nav`**: **28px** entre bloques en `lg`
      (`--nav-gap-blocks`) y **32px** en `xs` entre `platforms` y
      `search and toggle` (`--space-5`).
    - **Menú móvil (`status=open-modal`)**: subrayado de **1px**
      (`--nav-underline-menu`) bajo el enlace activo, a 8px del texto; gaps
      links 24 · logo→links 64 · links→plataformas 32 · plataformas→botones 32 ·
      botones 16; el botón outline lleva `icons/heart-fill` de **16px** tras el
      texto (el relleno no).
    - **Tolerancia medida** entre el export de Figma y Chrome a 1448: ≤2px en el
      bloque de enlaces y en el ancho de «Aporta» (métrica de fuente); el borde
      derecho (`x=1416`), el logo y las 5 plataformas coinciden exactamente.

## Diferencias por breakpoint

### `xs` (375) — frame `322:6042`, 375×4545 (leído el 2026-10-04)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2392:2395` | **80** | 125 → 80; logo 96 → 48; padding 32 → 16 |
| 1 | `encabezado-contenido` | `2392:3972` | 854 | padding **64** (162); `encabezado-texto` 343 con `pL=16`; h1 **46.1** (52); párrafo 20.2 igual; gap texto→botones **36** (igual); botones 224×52 + 103×52 con gap 16 |
| 2 | `Frame 1` (video) | `2396:2407` | 289.47 | media **343×193.47** con padding **48** arriba/abajo (en lg la media va a sangre sin padding) |
| 3 | `seccion-objetivos` | `2392:3995` | 920 | padding **48** (96); **1 columna** (343); h2 **32.4** (36.49); gaps texto→tarjetas **32** (48), tarjetas→controles **32**, controles→CTA **32** (48) |
| 4 | `sección-La-Materia-Prima` | `2392:4053` | 935 | padding **48** (96); **1 columna**; **añade fila de paginación** `2392:4101` que en 1448 no existe |
| 5 | `sección-únete` | `2392:4114` | 788.39 | padding **64** (96); **apilado**: media 341×192.39 arriba, texto debajo (gap **32**); h2 **32.4**; gap título→párrafo **16** |
| 6 | `footer` | `2395:4123` | 714 | padding **64**; logo 128 centrado; 7 enlaces **apilados y centrados** (Bold 16, gap **24**); copyright Medium 14.2 centrado |

Detalles de `goal-card` a 375 (instancia `2392:4001`, **343×498**): padding **16**
laterales/superior e **32** inferior (24/24/48 en lg), avatar 137×137, título **25.6**
(28.8), párrafo 16. El `components/buttons` de la instancia (104×40) se solapa con el
párrafo — mismo defecto que en `1448-lg`, donde se decidió **no renderizar el botón**
(nota 2): se mantiene esa decisión en `xs`.

`container-and-card` a 375 (`2392:4058`, 343×513): imagen 343×274 (5:4), texto con
padding 16, título 25.6, entradilla 16, gap **8** entre título y entradilla.

**Carrusel** (v1.2/v1.4 del ticket): a 375 se ve **1 tarjeta** por sección (`objetivos`
`2392:4000`; artículos `2392:4057` con controles `2392:4101`), a 1448 se ven las 4.
El comportamiento de `prev`/`next`/`dotnav` está definido en
[interactions.md](../interactions.md) y se implementa en `site/scripts/inicio.js`.

### `sm` (768) — frame `268:3128`, 768×4233 (leído el 2026-10-05)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2424:1959` | **75** | 125 → 75; logo 96 → 48; padding 32 → 16; **sin enlaces de texto** (ocultos): logo + 5 plataformas 24×24 + hamburguesa |
| 1 | `encabezado-contenido` | `2408:1567` | 660 | padding **128** (162); `encabezado-texto` **720** con padding 24; h1 **46.1** (52); párrafo 20.2 igual; gap texto→botones **36** (igual); botones 224×52 + 103×52 con gap 16 |
| 2 | `sección-video` | `2408:1585` | 403 | media **713×402** centrada sobre `Rectangle 1` 768 a sangre (en lg: 1124 sin padding; en xs: 343 con padding 48) |
| 3 | `seccion-objetivos` | `2408:1650` | 1002 | padding **64** (96); **2 columnas** de **346** con gap **24** (frame de tarjetas 714); h2 **32.4**; gaps texto→tarjetas **53**, tarjetas→controles **32**, controles→CTA **64** |
| 4 | `sección-La-Materia-Prima` | `2408:1708` | 902 | padding **64** (96); **2 columnas** (**346** y **350**, gap **24**, total 720); **sin fila de paginación** (igual que 1448) |
| 5 | `sección-únete` | `2408:1756` | 786.12 | padding **64** (96); **apilado**: media 720×406.12 arriba, texto 720×220 debajo (gap **32**); h2 **32.4**; gap título→párrafo **16** |
| 6 | `footer` | `2408:1765` | **405** | padding **64**; logo 128 centrado; `footer-nav` 704×117 (padding h **32**) con plataformas 184×24 centradas, **fila de 7 enlaces** (Bold 16, gap **16**) y copyright Medium 14.2 (gap **24**) |

Detalles de `goal-card` a 768 (instancia `2408:1656`, **346×522**): padding
**24** laterales/superior y **48** inferior; gap avatar→texto **16**; avatar
137×137; título **25.6**, párrafo 16/20.2. El `components/buttons` de la
instancia (104×40) se solapa con el párrafo — mismo defecto que en `1448-lg`
y `375-xs`: se mantiene la decisión de **no renderizar el botón**.

`container-and-card` a 768 (`2408:1713`, 346×571): imagen **5:4** de 346×276.38,
gap imagen→texto **16**, texto con padding **24**, título **25.6**, entradilla
16, gap **8** entre título y entradilla.

**Carrusel**: a 768 se ven **2 tarjetas** de los 4 objetivos (controles
`2408:1661` prev 64×64, `2408:1662` dotnav 80×8 con 4 puntos, `2408:1663` next
64×64, en `2408:1660`, 714×64). El comportamiento está definido en
[interactions.md](../interactions.md) y se implementa en
`site/scripts/inicio.js`. El modal `Objetivo-modal` **no existe** en `1024-sm`
(Caso 19) y no se implementa a tablet.


## Diseño definitivo `1448-lg` (leído el 2026-10-20 — ticket 4)

Frame `110:2277`, **1448×4514**. Secciones directas (nodo · alto):

| Sección | Nodo | Alto |
| --- | --- | --- |
| `encabezado-contenido` | `2325:3824` | 740 |
| `sección-video` | `2325:3923` | 634 |
| `seccion-objetivos` | `2326:4021` | 1073 |
| `sección-La-Materia-Prima` | `2328:4236` | 887 |
| `sección-únete` (vídeo) | `2328:4249` | 555.25 |
| **`sección-únete` (imagen 3:2) — NUEVA** | `4426:1111` | **616.73** |
| `components/footer` | `4442:2242` | 405 |
| `components/nav` | `4442:1753` | **160** |

- La segunda `sección-únete` (`4426:1111`): `components/images` 643×424.73
  (3:2) a la izquierda + `Frame 3` 644×231 con título «Únete a Vanguardia
  Colombiana» (Bebas Neue 46/51.52, `#53411e`) y el mismo párrafo de la primera
  sección (DM Sans 18/30.96, `#333333`).
- `goal-card` de `seccion-objetivos`: `ON_CLICK` → OVERLAY `2358:932`
  (los 4 `ON_DRAG` residuales no se implementan).
- Frame `inicio-prueba` `4490:2493` (1448×2995): variante sin vídeo ni La
  Materia Prima — **no implementada** (Caso 21, ticket 4; confirmado por el
  equipo 2026-10-20).
