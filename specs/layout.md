# Layout — contenedores y ritmo vertical

---
fuente: Figma — página `1448-lg`, frame `inicio` (`110:2277`) y sus secciones;
guías de `375-xs` (`1:2`, `9:142`) y `1024-sm` (`98:1549`) para los márgenes
extraido: 2026-10-03
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

## Diferencias por breakpoint

No existen las versiones móvil/tablet de `inicio` en el archivo (confirmado por el
equipo): `375-xs` y `1024-sm` solo traen guías de estilos y pantallas de plantilla.
Lo único medible por breakpoint son las **variantes de componente** (`xs`/`sm`/`lg`),
documentadas en [breakpoints.md](./breakpoints.md) y en
[components/](./components/). La disposición de las secciones de `inicio` a 375 y 1024
queda **PENDIENTE de confirmación con el diseño**.
