# Layout — contenedores y ritmo vertical

---
fuente: Figma — página `1448-lg`, frame `inicio` (`110:2277`) y sus secciones;
guías de `375-xs` (`1:2`, `9:142`) y `1024-sm` (`98:1549`) para los márgenes;
los 7 frames de `375-xs` leídos el 2026-10-04
extraido: 2026-10-03 (actualizado 2026-10-04)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_nodes_info`, `scan_nodes_by_types`)
---

## Ancho de contenedor

| Breakpoint | Ancho de frame | Contenedor de contenido | Padding lateral |
| --- | --- | --- | --- |
| `lg` (1448) | 1448px | 1384px | 32px (medido: hijo en `x=142` sobre frame en `x=110`) |
| `sm` | 768px medido en las guías (la página se llama `1024-sm`; ver [breakpoints.md](./breakpoints.md)) | 720px | 24px |
| `xs` (375) | 375px | 343px | 16px |

Ancho máximo de contenedor: **1384px** a 1448. Todos los bloques de `inicio`
(`objetivos-texto`, `objetivos-tarjetas`, `artículos`, `footer-nav`) miden 1384.

## Secciones de `inicio` (frame `110:2277`, 1448×4499)

Orden real (hijos del frame, en el orden del árbol; `components/nav` está declarado
al final pero superpuesto arriba, en `y=-27`):

| # | Sección | Nodo | Alto | Padding vertical propio | Gap con la anterior |
| --- | --- | --- | --- | --- | --- |
| 0 | `components/nav` (superpuesto) | `2338:2192` | 125 | — | — |
| 1 | `encabezado-contenido` | `2325:3824` | 674 | 162 arriba / 162 abajo | 0 |
| 2 | `sección-video` | `2325:3923` | 634 | 0 (media a sangre) | 0 |
| 3 | `seccion-objetivos` | `2326:4021` | 1065 | 96 / 96 | 0 |
| 4 | `sección-La-Materia-Prima` | `2328:4236` | 957 | 96 / 96 | 0 |
| 5 | `sección-únete` | `2328:4249` | 639 | 96 / 96 | 0 |
| 6 | `footer` | `2328:4305` | 405 | 64 / 64 | 0 |

- **Las secciones se tocan: gap 0.** El ritmo vertical lo dan los paddings de cada
  sección (96 en las tres secciones de contenido, 64 en footer, 162 en encabezado).
- Dentro de una sección, el espacio entre el bloque de texto y la retícula es **48**
  (`seccion-objetivos` y `sección-La-Materia-Prima`).

## Grillas

| Grilla | Nodo | Columnas | Ancho de columna | Gap | Total |
| --- | --- | --- | --- | --- | --- |
| `objetivos` (goal-card) | `2326:4020` | **4** | 322px | 32px | 4×322 + 3×32 = 1384 |
| `artículos` (container-and-card) | `2328:4234` | **4** | 322px | 32px | 4×322 + 3×32 = 1384 |

Fila de paginación bajo `objetivos` (`2326:4032`, 1384×64):

- `icons/prev` 64×64 alineado a la izquierda (`x=142`).
- `components/dotnav` 80×8 centrado (centro en 834 = centro exacto del contenedor).
- `icons/next` 64×64 alineado a la derecha (termina en `x=1526` = borde del contenedor).

## Bloques concretos de `inicio`

| Bloque | Nodo | Medida | Observación |
| --- | --- | --- | --- |
| Texto del encabezado | `2325:3822` | 914×262 | Columna de texto, no llega al borde del contenedor |
| Botones del encabezado | `2325:3823` | 343×52 | Bajo el texto, gap 36 |
| Media del `sección-video` | `2325:3922` | 1124×634 | Centrada en 1448 (162 libres a cada lado); el `Rectangle` de fondo sí es 1448 a sangre |
| `sección-únete` columna izquierda | `2328:4250` | 792×447 | Media |
| `sección-únete` columna derecha | `2328:4248` | 560×285 | Gap 32 con la izquierda; 792 + 32 + 560 = 1384 |
| Logo del footer | `2328:4286` | 128×128 | Centrado |
| `footer-nav` | `2328:4304` | 1384×117 | Contenedor completo |

## Secciones de `Programa`, `Decálogo` y `Política de privacidad`

Mismo criterio que `inicio`: **gap 0 entre secciones**, ritmo vertical por paddings.

| Pantalla | Sección | Nodo | Alto | Padding vertical |
| --- | --- | --- | --- | --- |
| `Programa` | `header` | `2328:4508` | 520 | 96 / 96 (columna de texto; la media también arranca en 96) |
| `Programa` | `sección-ejes` | `2328:4509` | 737 | 96 / 96 |
| `Programa` | `sección-materialismo` | `2330:4593` | 938 | 96 / 96 |
| `Programa` | `sección-puntos` | `2330:4683` | 6745 | 96 / 96 |
| `Decálogo` | `header` | `2335:1221` | 600 | 96 / 96 |
| `Decálogo` | `sección-puntos` | `2334:1027` | 7764 | 96 / 96 |
| `Política de privacidad` | `sección-puntos` | `2335:1540` | 1304 | 96 / 96 |
| las tres | `footer` | `2338:2640` / `2338:2693` / `2338:2799` | 405 | 64 / 64 (igual que `inicio`) |

Rasgos horizontales (medidos sobre los frames, derivados de `absoluteBoundingBox`):

| Rasgo | Pantallas | Medida |
| --- | --- | --- |
| Header de dos columnas (media + texto) | `Programa`, `Decálogo` | media 438 de ancho con **padding lateral 32** y **gap 32** con la columna de texto |
| Bloque centrado estrecho | `sección-materialismo` (Frame 8, 912), `Política de privacidad` (910) | centrado en 1448: **padding lateral ≈ 269** |
| Dos columnas con índice lateral | `sección-puntos` de `Programa` y `Decálogo` | **padding lateral 150** · índice **322** · gap **32** · columna de contenido **794** (150+322+32+794+150 = 1448) |
| Imagen 1:1 + texto (`sección-materialismo` `Frame 7`) | `Programa` | padding lateral 149, imagen 320, gap 32, texto 798 |

## Diferencias por breakpoint

### `xs` (375) — medido en `375-xs` el 2026-10-04 (`get_node_info` de los 7 frames)

Contenedor: **343px** con padding lateral **16** (misma regla que la tabla de
§Ancho de contenedor). Gap 0 entre secciones, igual que en escritorio.

| Pantalla | Sección | Nodo | Alto | Padding vertical | Ritmo interno |
| --- | --- | --- | --- | --- | --- |
| las 7 | `components/nav` | (instancia por pantalla) | **80** | — | logo 48, padding 16 |
| `inicio` | `encabezado-contenido` | `2392:3972` | 854 | 64 / 64 | título→párrafo **24**; texto→botones **36**; entre botones **16** |
| `inicio` | `Frame 1` (video) | `2396:2407` | 289.47 | 48 / 48 | media 343×193.47 |
| `inicio` | `seccion-objetivos` | `2392:3995` | 920 | 48 / 48 | texto→tarjetas **32**; tarjetas→controles **32**; controles→CTA **32** |
| `inicio` | `sección-La-Materia-Prima` | `2392:4053` | 935 | 48 / 48 | mismo ritmo que la anterior; controles `2392:4101` |
| `inicio`, `Únete` | `sección-únete` | `2392:4114` / `2396:2712` | 788.39 | **64 / 64** | media→texto **32**; título→párrafo **16** |
| las 5 | `footer` | `2395:4123` y equivalentes | 714 | 64 / 64 | logo→nav **32**; plataformas→enlaces **24**; entre enlaces **24**; enlaces→copyright **24** |
| `Programa` | `header` | `2396:2399` | 1106 | 64 / 64 | media→texto **32**; h1→párrafo **24** |
| `Programa` | `sección-ejes` | `2396:2416` | 1583 | 64 / 64 | media→texto **32**; h2→párrafo **24** |
| `Programa` | `sección-materialismo` | `2396:2423` | 1811 | 64 / 64 | media→bloque **32**; h2→párrafo **24**; entre párrafos **24** |
| `Programa` | `sección-puntos` | `2396:2435` | 14941 | 64 / 64 | título→puntos **32**; entre puntos **32**; puntos→CTA **32**; **sin índice lateral** |
| `Decálogo` | `header` | `2396:2523` | 1358 | 64 / 64 | media→texto **32**; h1→párrafo **24** |
| `Decálogo` | `sección-puntos` | `2396:2543` | 17225 | 64 / 64 | entre puntos **32**; puntos→CTA **32**; **sin índice ni título de sección** |
| `Política de privacidad` | `sección-puntos` | `2396:2885` | 2326 | 64 / 64 | título→cuerpo **32**; cuerpo→CTA **32** |

Resumen del ritmo móvil: **padding 64** en secciones de contenido y footer, **48** en
`inicio` (objetivos, Materia Prima) y en la banda de vídeo, gaps **32** entre bloques y
**24** entre título y párrafo (16 en `sección-únete`).

### Grillas a 375

| Grilla | Columnas | Ancho | Gap |
| --- | --- | --- | --- |
| `objetivos` (goal-card) | **1** (carrusel: 1 tarjeta visible) | 343 | 32 entre tarjetas |
| `artículos` (container-and-card) | **1** (carrusel: 1 tarjeta visible) | 343 | 32 |

Fila de paginación a 375 (`2392:4005`, 343×64): `icons/prev` 64×64 a la izquierda,
`components/dotnav` 80×8 (4 puntos de 8, gap 16) centrado, `icons/next` 64×64 a la
derecha (`justify-content: space-between`). La misma fila aparece en
`sección-La-Materia-Prima` (`2392:4101`), que en 1448 no la tiene.

### `sm` (tablet)

Sigue **PENDIENTE**: `1024-sm` no tiene pantallas construidas y el ancho real del
breakpoint (1024 vs 768) no está resuelto (ver [breakpoints.md](./breakpoints.md)).
