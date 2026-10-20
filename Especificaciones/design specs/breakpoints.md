# Breakpoints

---
fuente: Figma — documento completo, nodos `0:0` (páginas) y variantes de
`components/nav` (`36:720`) / `components/header-two-columns` (`70:1341`);
página `375-xs` (`0:1`) leída el 2026-10-04; página `1024-sm` (`10:214`) leída
el 2026-10-05; página `1448-lg` (`110:1162`) re-leída el 2026-10-20 (diseño definitivo)
extraido: 2026-10-03 (actualizado 2026-10-04; `1024-sm` el 2026-10-05;
`1448-lg` diseño definitivo el 2026-10-20)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`scan_nodes_by_types`, `get_node_info`, `get_document_info`)
---

## Páginas del archivo (anchos declarados)

Obtenidas con `scan_nodes_by_types` sobre el documento (`0:0`, tipo `PAGE`):

| Nombre | Nodo | Rol |
| --- | --- | --- |
| `components` | `10:215` | Biblioteca de componentes y fuente de tokens |
| `1448-lg` | `110:1162` | **Pantallas desktop (diseño definitivo desde 2026-10-20)**: inicio, Objetivo-modal, Programa, Decálogo, Únete, Política de privacidad + frames nuevos `navegación-reducida`, `hovers`, `inicio-prueba` |
| `1024-sm` | `10:214` | **Pantallas tablet** (desde 2026-10-05): 6 frames de 768 de ancho + guías de estilos |
| `375-xs` | `0:1` | **Pantallas móviles** (desde 2026-10-04): las 7 vistas de este ticket + guías de estilos |
| `thumbnail` | `334:2014` | Portada — ignorar |

**Leído en vivo el 2026-10-04** (`get_document_info` sobre `0:1`): `375-xs` **sí tiene
las pantallas construidas** — 7 frames (la afirmación de 2026-10-03 quedó
superada).

| Frame de `375-xs` | Nodo | Tamaño |
| --- | --- | --- |
| `inicio` | `322:6042` | 375×4545 |
| `programa` | `2396:104` | 375×20213 |
| `Decálogo` | `2396:2521` | 375×19377 |
| `Únete` | `2396:2676` | 375×1592 |
| `política de privacidad` | `2396:2820` | 375×3120 |
| `nav` (menú abierto) | `2396:2902` | 375×812 |
| `Objetivo-modal` | `2404:3499` | 343×976 |

**Leído en vivo el 2026-10-05** (`get_document_info` + `get_node_info` sobre `10:214`):
`1024-sm` **también tiene pantallas construidas** — 6 frames de 768 de ancho (la
afirmación anterior de «sin pantallas» quedó superada):

| Frame de `1024-sm` | Nodo | Tamaño |
| --- | --- | --- |
| `inicio` | `268:3128` | 768×4233 |
| `programa` | `2408:1816` | 768×10143 |
| `decálogo` | `2408:2098` | 768×10002 |
| `Únete` | `2408:2315` | 768×1266 |
| `política-de-privacidad` | `2421:1246` | 768×1840 |
| `nav` (menú abierto) | `2424:446` | 768×1024 |

No existe frame `Objetivo-modal` en `1024-sm` (Caso 19).
Detalle por sección y nodo en [layout.md](./layout.md) y en
[pages/](./pages/).

| Nombre | Ancho frame | Página Figma | Rol |
| --- | --- | --- | --- |
| `xs` | 375px | `375-xs` | Base móvil — captura de verificación |
| `sm` | 768px | `1024-sm` | Tablet — media query |
| `lg` | 1448px | `1448-lg` | Desktop — captura de verificación |

## Umbral del breakpoint `sm`: **768px** (confirmado 2026-10-05)

Las variantes `size=sm` de los componentes miden **768px**, no 1024:

| Componente | `size=xs` | `size=sm` | `size=lg` |
| --- | --- | --- | --- |
| `components/nav` (`36:720`) | 375×64 | **768**×64 | 1448×125 |
| `components/header-two-columns` (`70:1341`) | 375×917 / 375×973 | **768**×550 / **768**×602 | 1448×708 / 1448×828 |

Lo mismo en las guías de la página `1024-sm`: todos sus frames miden **768** de ancho
(`typography-styles` 768, `components-01` 768, `index`/`post` 768). No existe ningún
frame de 1024 en el archivo.

- Ancho de página declarado: **1024** (solo es el **nombre** de la página `1024-sm`).
- Ancho real de las variantes `sm` y de los frames: **768**.
- **Confirmado por el equipo (2026-10-05): rige 768px** como umbral de la media query
  tablet («nos vamos a guiar por los tamaños de los elementos en Figma»). Registrado en
  el ticket 3 (Caso 20 de
  [1-tarea-descripcion.md](../docs/Web/tickets/3-vistas-tablet-1024-sm/1-tarea-descripcion.md)).
  Este documento registra la evidencia; la decisión es del equipo.

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

El tramo intermedio (376–1447) **ya tiene diseño y ya está documentado**: la página
`1024-sm` contiene los 6 frames de las vistas tablet (leídos el 2026-10-05; umbral
**768px** — §Umbral del breakpoint `sm`), y su registro sección por sección está en
[layout.md](./layout.md) (§`sm`) y en la sección `sm` de cada archivo de
[pages/](./pages/). El CSS de tablet se añade con `@media (min-width: 768px)`.

## `1448-lg` — diseño definitivo (leído el 2026-10-20)

`get_document_info` + `get_node_info` sobre `110:1162`: la página tiene **23
hijos** — 9 frames, 5 logos sueltos, 1 anotación y 6 TEXT de animación. Los IDs
de las pantallas no cambiaron pero **todas las medidas relevantes sí**, y
aparecieron `navegación-reducida` e `hovers` (capas globales, ticket 4):

| Frame de `1448-lg` | Nodo | Tamaño | Notas |
| --- | --- | --- | --- |
| `inicio` | `110:2277` | 1448×**4514** | era 4499; ahora con **dos** `sección-únete` |
| `inicio-prueba` | `4490:2493` | 1448×2995 | variante sin vídeo ni La Materia Prima — **no implementada** (Caso 21, ticket 4) |
| `Objetivo-modal` | `2358:932` | 1024×**604** | era 569 |
| `Programa` | `2328:4307` | 1448×**8743** | era 8897 |
| `Decálogo` | `2334:1005` | 1448×**8234** | era 8279 |
| `Únete` | `2335:1229` | 1448×**1182** | era 1027; ahora con **dos** `sección-únete` |
| `Política de privacidad` | `2335:1533` | 1448×**1792** | era 1777 |
| `navegación-reducida` | `4518:1968` | 1448×**83** | **nuevo** — header compacto al hacer scroll |
| `hovers` | `4518:2148` | 1448×4338 | **nuevo** — capa de pares default↔hover |

Además: 5 logos sueltos (`logo-color` ×2 `4331:2100`/`4331:2615`, `logo-dorado`
×2 `4370:4698`/`4370:4748`, `logo-vanguardias` `4422:1219`), la anotación
`icons8-hand-cursor 1` `4519:2484` (no es asset) y 6 TEXT con las animaciones
deseadas (`4649:2012`–`4649:2018`, registradas en
[interactions.md](./interactions.md)). Instancias de nav pasan de 125 a **160**;
el footer sigue en **405** con nuevas instancias (`4442:*`).

Detalle por sección y nodo en [pages/](./pages/); comportamiento de la capa
`hovers` y de `navegación-reducida` en [interactions.md](./interactions.md).
