# Breakpoints

---
fuente: Figma — documento completo, nodos `0:0` (páginas) y variantes de
`components/nav` (`36:720`) / `components/header-two-columns` (`70:1341`);
página `375-xs` (`0:1`) leída el 2026-10-04
extraido: 2026-10-03 (actualizado 2026-10-04)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`scan_nodes_by_types`, `get_node_info`)
---

## Páginas del archivo (anchos declarados)

Obtenidas con `scan_nodes_by_types` sobre el documento (`0:0`, tipo `PAGE`):

| Nombre | Nodo | Rol |
| --- | --- | --- |
| `components` | `10:215` | Biblioteca de componentes y fuente de tokens |
| `1448-lg` | `110:1162` | Pantallas desktop: inicio, Objetivo-modal, Programa, Decálogo, Únete, Política de privacidad, encabezado-decálogo |
| `1024-sm` | `10:214` | Guía de estilos del breakpoint intermedio — **sin pantallas construidas** |
| `375-xs` | `0:1` | **Pantallas móviles** (desde 2026-10-04): las 7 vistas de este ticket + guías de estilos |
| `thumbnail` | `334:2014` | Portada — ignorar |

**Leído en vivo el 2026-10-04** (`get_document_info` sobre `0:1`): `375-xs` **sí tiene
las pantallas construidas** — 7 frames (la afirmación de 2026-10-03 quedó
superada). `1024-sm` sigue sin pantallas (ver §Hallazgo más abajo).

| Frame de `375-xs` | Nodo | Tamaño |
| --- | --- | --- |
| `inicio` | `322:6042` | 375×4545 |
| `programa` | `2396:104` | 375×20213 |
| `Decálogo` | `2396:2521` | 375×19377 |
| `Únete` | `2396:2676` | 375×1592 |
| `política de privacidad` | `2396:2820` | 375×3120 |
| `nav` (menú abierto) | `2396:2902` | 375×812 |
| `Objetivo-modal` | `2404:3499` | 343×976 |

Detalle por sección y nodo en [layout.md](./layout.md) y en
[pages/](./pages/).


| Nombre | Ancho frame | Página Figma | Rol |
| --- | --- | --- | --- |
| `xs` | 375px | `375-xs` | Base móvil — captura de verificación |
| `sm` | 1024px | `1024-sm` | Tablet — media query |
| `lg` | 1448px | `1448-lg` | Desktop — captura de verificación |

## Hallazgo: el ancho de las variantes `sm` no coincide con la página

Las variantes `size=sm` de los componentes miden **768px**, no 1024:

| Componente | `size=xs` | `size=sm` | `size=lg` |
| --- | --- | --- | --- |
| `components/nav` (`36:720`) | 375×64 | **768**×64 | 1448×125 |
| `components/header-two-columns` (`70:1341`) | 375×917 / 375×973 | **768**×550 / **768**×602 | 1448×708 / 1448×828 |

Lo mismo en las guías de la página `1024-sm`: todos sus frames miden **768** de ancho
(`typography-styles` 768, `components-01` 768, `index`/`post` 768). No existe ningún
frame de 1024 en el archivo.

- Ancho de página declarado: **1024**.
- Ancho real de las variantes `sm`: **768**.
- **`PENDIENTE-FIGMA` (tablet, fuera de alcance)**: cuál de los dos rige el breakpoint
  tablet. Este documento registra lo observado; no se elige uno por cuenta propia.

## Dirección de las media queries

Comparación del mismo componente entre `375-xs` y `1448-lg` (`get_node_info`):

| Qué cambia | `xs` (375) | `lg` (1448) |
| --- | --- | --- |
| `nav` | Variante `size=xs` **375×64**: logo + plataformas + búsqueda + hamburguesa. **Instancias reales en `375-xs`: 375×80**, logo 48. Existe la variante `status=open-modal` (375×812) con el menú abierto a pantalla completa | 1448×125: logo + 4 enlaces de texto + 2 botones + plataformas + búsqueda |
| `header-two-columns` | **Apilado**: slideshow arriba (343×343) y texto+botones debajo (343×502) | **Dos columnas**: slideshow a la izquierda (708×708) y texto+botones a la derecha (676), gap 32 |

**Dirección elegida: mobile-first** en `nav` y `header-two-columns`.

Justificación observada: las variantes están construidas de `xs` hacia `lg` — la base
`xs` es el estado con menos elementos (hamburguesa, columnas apiladas) y `lg` **añade**
elementos (enlaces de texto, botones, segunda columna), no los quita. El CSS sigue el
mismo orden: estilos base del `xs` y `min-width` para añadir columnas/enlaces.

### Dirección por sección de página (decidida midiendo `375-xs` vs `1448-lg`, 2026-10-04)

Lectura con `get_node_info` de cada sección en los dos frames. En **todas** el patrón
es el mismo: `xs` apila y `lg` añade (columnas, índice, segunda columna), así que la
dirección es **`mobile-first`** en las cinco páginas — base = 375, `@media (min-width:
1448px)` = los estilos de escritorio ya existentes (los que hoy están sin media query).

| Sección | `xs` (375) | `lg` (1448) | Dirección |
| --- | --- | --- | --- |
| `inicio` — `encabezado-contenido` | padding 64, h1 46.1, una columna | padding 162, h1 52 | mobile-first |
| `inicio` — `sección-video` | media 343 con padding 48 | media 1124 sin padding | mobile-first |
| `inicio` — `seccion-objetivos` / `sección-La-Materia-Prima` | **1 columna** (343) | **4 columnas** (322, gap 32) | mobile-first |
| `inicio` — `sección-únete` (`join-block`) | media arriba, texto debajo | dos columnas 792 + 560 | mobile-first |
| `footer` | enlaces apilados y centrados (343) | fila de enlaces en el contenedor | mobile-first |
| `Programa` — `header`, `sección-ejes`, `sección-materialismo` | media arriba, texto debajo | dos columnas (media 438/320) | mobile-first |
| `Programa` y `Decálogo` — `sección-puntos` | **sin índice lateral**, 1 columna 343 | índice 322 + contenido 794 | mobile-first |
| `Política de privacidad` — `sección-puntos` | título + cuerpo a ancho 343 | cuerpo centrado 910 | mobile-first |
| `Objetivo-modal` | panel 343 | panel hasta 1024 | mobile-first |

El tramo intermedio (376–1447) no tiene diseño (§Hallazgo `sm`): queda con el layout
móvil hasta que exista un `1024-sm` real.
