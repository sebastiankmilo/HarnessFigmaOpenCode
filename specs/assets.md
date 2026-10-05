# Assets — manifiesto

---
fuente: Figma — componentes `icons/*` de la página `components` + nodo `2325:3856`
de la página `1448-lg` (triángulo de play)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`export_node_as_image`, `get_local_components`)
---

## Limitación de formato observada (registro, no se esquivó)

`export_node_as_image` del plugin `cursor-talk-to-figma-mcp` **ignora el parámetro
`format`** y devuelve siempre PNG: en el código del plugin la línea es
`const format = "PNG";`. Por eso:

- Los iconos están exportados como **PNG a escala 4** (128×128) en
  [`site/assets/icons/`](../site/assets/icons/) — y a escala 8 (256×256) `logo`
  y `logo-02`, que se usan a 96px y 128px—, no en SVG como pide
  [especificaciones-diseño §4.9](../docs/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md).
- La exportación SVG queda **PENDIENTE**: requiere un plugin que respete `format` o
  exportar a mano desde Figma.

## Iconos exportados (17)

| Archivo | Nodo Figma | Formato/escala | Usado en |
| --- | --- | --- | --- |
| `site/assets/icons/play.png` | `1448-lg` / `2325:3856` | PNG @4x (384×340) | Triángulo de play de los bloques de vídeo: `inicio` secciones 3 y 6, y página `Únete` (centrado por su centroide: `translate(-33.33%, -50%)`) |
| `site/assets/icons/logo.png` | `components` / `27:1675` | PNG @8x (256×256) | `nav` (32px en xs/sm, 64px en open-modal, **96px** en lg) |
| `site/assets/icons/logo-02.png` | `components` / `2328:4285` | PNG @8x (256×256) | `footer` de todas las pantallas (**128px**) |
| `site/assets/icons/heart-fill.png` | `components` / `21:262` | PNG @4x (128×128) | icono de `components/buttons` (16px y 24px). **Oculto en todas las instancias de `1448-lg`** (verificado con `export_node_as_image` → 1×1): no aparece en `inicio`, `Únete` ni `Objetivo-modal`. |
| `site/assets/icons/prev.png` | `components` / `21:176` | PNG @4x (128×128) | `slideshow` (48px) y fila de paginación de `inicio` (64px) |
| `site/assets/icons/next.png` | `components` / `21:168` | PNG @4x (128×128) | `slideshow` (48px) y fila de paginación de `inicio` (64px) |
| `site/assets/icons/search.png` | `components` / `21:160` | PNG @4x (128×128) | `nav` (24px) |
| `site/assets/icons/hamburger-two.png` | `components` / `21:150` | PNG @4x (128×128) | `nav` (24px) |
| `site/assets/icons/close.png` | `components` / `21:155` | PNG @4x (130×128) | `nav` open-modal (32px) y `Objetivo-modal` |
| `site/assets/icons/facebook.png` | `components` / `27:1930` | PNG @4x (128×128) | `platforms` del nav y del footer (24px) |
| `site/assets/icons/instagram.png` | `components` / `27:1934` | PNG @4x (128×128) | `platforms` del nav y del footer (24px) |
| `site/assets/icons/youtube.png` | `components` / `27:1951` | PNG @4x (128×128) | `platforms` del nav y del footer (24px) |
| `site/assets/icons/x.png` | `components` / `27:1993` | PNG @4x (128×128) | `platforms` del nav y del footer (24px) |
| `site/assets/icons/tik-tok.png` | `components` / `27:1977` | PNG @4x (128×128) | `platforms` del nav y del footer (24px) |
| `site/assets/icons/weibo.png` | `components` / `27:2005` | PNG @4x (128×128) | `platforms` **por defecto** del `nav` (variante de componente) |
| `site/assets/icons/xiao-hong-shu.png` | `components` / `27:1984` | PNG @4x (128×128) | `platforms` **por defecto** del `nav` |
| `site/assets/icons/wechat.png` | `components` / `27:2007` | PNG @4x (128×128) | `platforms` **por defecto** del `nav` |

**Observación de uso:** el componente `nav` trae por defecto `weibo`,
`xiao-hong-shu` y `wechat` (tres `wechat` en `size=lg`); las instancias reales del
`nav` en `1448-lg` los sustituyen por `facebook`, `instagram`, `youtube`, `x` y
`tik-tok`. Se exportaron los dos juegos porque los dos existen en el diseño.

## Imágenes

No hay assets de imagen exportables: todas las medias del wireframe son rellenos
sólidos de `components/images` (`--color-media-placeholder` `#ebebeb`), el avatar de
`goal-card` es un `Ellipse` `#d9d9d9` y el fondo de `sección-video` es un
`Rectangle` `#adadad`. **No existe ningún bitmap en el archivo Figma.**

| Archivo | Nodo Figma | Formato/escala | Usado en |
| --- | --- | --- | --- |
| `site/assets/img/…` | PENDIENTE-FIGMA | — | Slots de imagen de `inicio` (hero/video, slideshow, artículos, avatar): hasta que el diseño incluya imagen real |

## Pendientes de esta fase

1. ~~Reexportar `logo.png` y `logo-02.png` a mayor escala~~ — **hecho**: 256×256
   (escala 8) el 2026-10-03.
2. Exportar en SVG (limitación del plugin descrita arriba).
3. Assets de imagen cuando el diseño los incluya (`PENDIENTE-FIGMA`).
4. Baselines de `tests/visual/baseline/…` — **fuera de alcance** del plan
   (`tests/` requiere autorización explícita).

## Uso en `1024-sm` (verificado el 2026-10-05)

Los 6 frames tablet **no requieren exportar ningún asset nuevo**: usan los iconos
ya versionados — `logo` (48 px en la barra, 64 px en el overlay), `logo-02`
(128 px en el footer), `play` (bloques de vídeo), `prev`/`next` (64 px),
`hamburger-two` (24 px), `close` (32 px en el overlay) y las 5 plataformas
(`facebook`, `instagram`, `youtube`, `x`, `tik-tok`: 24 px en la barra, 32 px en
el overlay). `search` y `wechat` existen como archivo pero **no se usan** a tablet
(ocultos en el render).

Las medias de `sección-ejes` y `sección-materialismo` **no se renderizan** a
tablet (nodos ocultos), así que tampoco aportan slots de imagen nuevos.
