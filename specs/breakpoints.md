# Breakpoints

---
fuente: Figma — documento completo, nodos `0:0` (páginas) y variantes de
`components/nav` (`36:720`) / `components/header-two-columns` (`70:1341`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`scan_nodes_by_types`, `get_node_info`)
---

## Páginas del archivo (anchos declarados)

Obtenidas con `scan_nodes_by_types` sobre el documento (`0:0`, tipo `PAGE`):

| Nombre | Nodo | Rol |
| --- | --- | --- |
| `components` | `10:215` | Biblioteca de componentes y fuente de tokens |
| `1448-lg` | `110:1162` | Pantallas desktop: inicio, Objetivo-modal, Programa, Decálogo, Únete, Política de privacidad, encabezado-decálogo — **la única página con las pantallas construidas** |
| `1024-sm` | `10:214` | Guía de estilos del breakpoint intermedio |
| `375-xs` | `0:1` | Guía de estilos móvil (`typography-styles`, `colors-…`, `components 01/02`) |
| `thumbnail` | `334:2014` | Portada — ignorar |

**Confirmado por el equipo (2026-10-03):** solo `components` y `1448-lg` son útiles
hasta ahora. Las páginas `1024-sm` y `375-xs` contienen las guías de estilos y pantallas
de plantilla (`index`, `post`, `404`), pero **no tienen construida la pantalla como
debería verse**: no existen las versiones móvil/tablet de `inicio`, `Programa`,
`Decálogo`, `Únete` ni `Política de privacidad`.


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
- **PENDIENTE de confirmación con el diseño**: cuál de los dos rige el breakpoint
  tablet. Este documento registra lo observado; no se elige uno por cuenta propia.

## Dirección de las media queries

Comparación del mismo componente entre `375-xs` y `1448-lg` (`get_node_info`):

| Qué cambia | `xs` (375) | `lg` (1448) |
| --- | --- | --- |
| `nav` | 375×64: logo + plataformas + búsqueda + hamburguesa. Existe la variante `status=open-modal` (375×812) con el menú abierto a pantalla completa | 1448×125: logo + 4 enlaces de texto + 2 botones + plataformas + búsqueda |
| `header-two-columns` | **Apilado**: slideshow arriba (343×343) y texto+botones debajo (343×502) | **Dos columnas**: slideshow a la izquierda (708×708) y texto+botones a la derecha (676), gap 32 |

**Dirección elegida: mobile-first** en `nav` y `header-two-columns`.

Justificación observada: las variantes están construidas de `xs` hacia `lg` — la base
`xs` es el estado con menos elementos (hamburguesa, columnas apiladas) y `lg` **añade**
elementos (enlaces de texto, botones, segunda columna), no los quita. El CSS sigue el
mismo orden: estilos base del `xs` y `min-width` para añadir columnas/enlaces.

`AGENTS.md` fija la dirección **por sección**: esta decisión cubre `nav` y
`header-two-columns`; las demás secciones deciden al implementarse, midiendo sus
variantes con `get_node_info`.
