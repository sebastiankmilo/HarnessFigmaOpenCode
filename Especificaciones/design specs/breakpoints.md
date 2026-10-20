---
fuente: Figma — páginas `375-xs` (`0:1`), `1024-sm` (`10:214`), `1448-lg` (`110:1162`), `components-diseño` (`10:215`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_document_info, get_node_info, get_styles`)
---

# Breakpoints

## Páginas del archivo

`scan_nodes_by_types` con `types:["PAGE"]` sobre `0:0` devuelve **5 páginas**:

| Página | Nodo | Contenido |
| --- | --- | --- |
| `components-diseño` | `10:215` | 231 componentes locales, sets de variantes y guías de estilo |
| `1448-lg` | `110:1162` | pantallas desktop |
| `1024-sm` | `10:214` | pantallas tablet |
| `375-xs` | `0:1` | pantallas móvil |
| `thumbnail` | `334:2014` | miniatura del archivo |

## Anchos de frame

| Página | Ancho observado | Frames de pantalla |
| --- | --- | --- |
| `375-xs` | [343, 375] | 7 frames |
| `1024-sm` | [327, 720, 768] | 10 frames |
| `1448-lg` | [1448] | 8 frames de pantalla + `Objetivo-modal` 1024×604 |

### Detalle de `1024-sm` (`10:214`)

| Frame | Nodo | Tamaño |
| --- | --- | --- |
| inicio | `268:3128` | 768×4582 |
| Objetivo-modal | `4441:3492` | 720×624 |
| programa | `2408:1816` | 768×9616 |
| decálogo | `2408:2098` | 768×9088 |
| Únete | `2408:2315` | 768×1370 |
| política-de-privacidad | `2421:1246` | 768×1846 |
| nav | `2424:446` | 768×1024 |
| components/images | `4486:1975` | 327×184 |
| components/images | `4486:1978` | 327×216 |
| components/images | `4486:1983` | 327×245 |

### Detalle de `375-xs` (`0:1`)

| Frame | Nodo | Tamaño |
| --- | --- | --- |
| inicio | `322:6042` | 375×4819 |
| programa | `2396:104` | 375×17714 |
| Decálogo | `2396:2521` | 375×17372 |
| Únete | `2396:2676` | 375×1510 |
| política de privacidad | `2396:2820` | 375×2929 |
| nav | `2396:2902` | 375×812 |
| Objetivo-modal | `2404:3499` | 343×1095 |

## Grillas locales

`get_styles` → `grids` devuelve 4 estilos de grilla:

| Estilo | Nodo | Nombre |
| --- | --- | --- |
| `xs/375` | `S:95b88b15fc27eadb5d8eb6569a5be8179f3f2ee9,` | xs/375 |
| `sm/1024` | `S:22b93969a117c3fd1267543a2e2f90e3f8c488c9,` | sm/1024 |
| `lg/1448` | `S:a42d4e6817a16a82ba97c35474874dbc43eb6950,` | lg/1448 |
| `lg/1216` | `S:6d82ff48a7ce5dc0944ae00f779f117f4a212098,` | lg/1216 |

Nota: el estilo se llama `sm/1024` pero **todos los frames de `1024-sm` miden 768**
de ancho; el «1024» del nombre de la página es un rótulo, no la medida del frame.

## Dirección de las media queries

**PENDIENTE-FIGMA.** La dirección (mobile-first o desktop-first) y el umbral
exacto de cada `@media` son una decisión de implementación: Figma solo expone
los tres anchos de frame (375 / 768 / 1448). No se inventa aquí.

## Frames auxiliares de `1448-lg` que no son pantallas

| Frame | Nodo | Ancho |
| --- | --- | --- |
| `navegación-reducida` | `4518:1968` | 1448 |
| `inicio-prueba` | `4490:2493` | 1448 |
| `hovers` | `4518:2148` | tablero de estados, **no es una pantalla** |
