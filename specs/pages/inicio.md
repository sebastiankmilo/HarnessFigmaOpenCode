# Página: inicio

---
fuente: Figma — página `1448-lg`, frame `inicio` (`110:2277`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_node_info`, `get_nodes_info`, `get_reactions`, `export_node_as_image`)
---

Frame: `110:2277` — 1448×4499. Ancho del contenedor de contenido: 1384 (padding
lateral 32). Ritmo vertical, grillas y alturas de sección:
[layout.md](../../specs/layout.md).

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
[components/nav](../../specs/components/nav.md),
[components/header-two-columns](../../specs/components/header-two-columns.md),
[components/goal-card](../../specs/components/goal-card.md).

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
Compartido por todas las pantallas: ver [components/footer](../../specs/components/footer.md).

## Puntos de entrada del prototipo

Registrados con `get_reactions` (tabla completa en
[interactions.md](../../specs/interactions.md)):

- Botones del encabezado → `Programa` (`2328:4307`) y `Únete` (`2335:1229`).
- Cada `goal-card` → abre `Objetivo-modal` (`2358:932`) como overlay.
- `container-and-card` y el botón de la sección → URL externa `lamateriaprima.org`.
- Nav y footer → navegación a las otras pantallas y a redes.

## Notas de verificación (2026-10-03, con `export_node_as_image`)

Registradas para no perder lo observado al implementar:

1. **Nav sin enlace activo**: en esta pantalla las 4 líneas de subrayado del nav **no
   son visibles** (el muestreo de píxeles del export devuelve color de fondo en
   `y=121–124`); **ningún enlace aparece activo**. (Contradice el texto de
   [components/nav](../../specs/components/nav.md), que afirma que el enlace 1 va en
   `--color-text-primary`.)
2. **`goal-card` sin botón**: en las 4 instancias el `components/buttons` «Leer más»
   está **oculto** (el export del nodo devuelve 1×1); el botón, además, apuntaba a
   `y=345` y se solapaba con el párrafo. Las tarjetas se renderizan con avatar,
   título y párrafo, **sin botón**. El componente por sí mismo sí lo muestra
   (ver [components/goal-card](../../specs/components/goal-card.md)).
3. **Paginación sin comportamiento**: `icons/prev` (`2326:4023`),
   `components/dotnav` (`2326:4033`) e `icons/next` (`2326:4026`) **no tienen
   reacciones** registradas. **PENDIENTE de especificación de diseño**: se dibujan,
   no se les asigna comportamiento.
4. **Iconos de los botones ocultos**: los dos `icons/heart-fill` de cada
   `components/buttons` están ocultos en todas las instancias de la pantalla.
5. **Colores sin token de rol**: la media de vídeo (`#c2c2c2`), la banda del vídeo
   (`#adadad`), el fondo de «La Materia Prima» (`#d6d6d6`) y el footer (`#333333`)
   — se añadieron como tokens de rol en [tokens.md](../../specs/tokens.md).
6. **Nav en `xs`/`sm`**: las variantes del componente muestran los 3 iconos por
   defecto (`weibo`, `xiao-hong-shu`, `wechat`), no los 5 reales del `lg`, y en `sm`
   solo 3 enlaces con texto de relleno (`Enlace 01`). La implementación sigue la
   variante en `xs` (menú y plataformas) y deja el tramo tablet **PENDIENTE**, igual
   que el propio [breakpoints.md](../../specs/breakpoints.md) (1024 vs 768 sin
   confirmar). En `lg` se usan las instancias reales (5 plataformas, 4 enlaces).
7. **Enlaces sin destino en el prototipo**: los botones `Aporta` y `Botón` del nav y
   el enlace `Aporta` del footer **no tienen reacción**; se dibujan como elementos
   no interactivos hasta que el diseño los defina.
8. **Desviación respecto a Figma (registrada)**: en ambos footers el icono
   `youtube` apunta a Instagram. La implementación usa la URL de YouTube correcta
   (`https://www.youtube.com/@VanguardiaColombiana`, la misma que el `nav`); el valor
   real de Figma queda registrado en
   [interactions.md](../../specs/interactions.md) y [components/footer](../../specs/components/footer.md).
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

**PENDIENTE de confirmación con el diseño.** El archivo no tiene la versión móvil ni
tablet de `inicio`: `375-xs` y `1024-sm` solo contienen guías de estilos y pantallas de
plantilla (`index`, `post`, `404`) — confirmado por el equipo el 2026-10-03. Lo único
comparable entre breakpoints son las variantes `xs`/`sm`/`lg` de los componentes (ver
[breakpoints.md](../../specs/breakpoints.md)).
