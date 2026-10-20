---
fuente: Figma — `1448-lg` (`110:1162`) — frames de pantalla y sus hijos directos
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_node_info, get_nodes_info`)
---

# Contenedores y ritmo vertical

`get_node_info` **no expone** `padding` ni `itemSpacing`: el margen lateral se
deriva como `hijo.x − frame.x` y la separación entre secciones como
`hijo[n+1].y − (hijo[n].y + hijo[n].height)`.

## Contenedor de contenido en `1448-lg`

| Página | Frame | Medida | Cálculo |
| --- | --- | --- | --- |
| inicio | `encabezado-contenido` `2325:3824` | **margen 32** | `texto-y-botones` x=142 − frame x=110 = 32 |
| inicio | ídem | columna de texto **792** de ancho | `encabezado-texto` 792 |
| inicio | ídem | media derecha **590** pegada al borde | x=968 → 968−110 = 858; 858+590 = 1448 |

## Ritmo vertical por página

Las secciones directas de cada frame, en orden de aparición en la capa:

### `inicio` (`110:2277`, 1448×4514)

| # | Sección | Nodo | y | Alto | Componentes dentro |
| --- | --- | --- | --- | --- | --- |
|  | encabezado-contenido | `2325:3824` | 133 | 1448×740 | FRAME |
|  | sección-video | `2325:3923` | 873 | 1448×634 | FRAME |
|  | seccion-objetivos | `2326:4021` | 1507 | 1448×1073 | FRAME |
|  | sección-La-Materia-Prima | `2328:4236` | 2580 | 1448×887 | FRAME |
|  | sección-únete | `2328:4249` | 3477 | 1448×555 | FRAME |
|  | sección-únete | `4426:1111` | 3465 | 1448×617 | FRAME |
|  | components/footer | `4442:2242` | 4082 | 1448×405 | INSTANCE |
|  | components/nav | `4442:1753` | -27 | 1448×160 | INSTANCE |

(El inventario completo por sección, con los componentes de cada una, está en
[`pages/inicio.md`](pages/inicio.md).)

### `Programa` (`2328:4307`, 1448×8743)

| header | `2328:4508` | 133 | 1448×520 | FRAME |
| sección-ejes | `2328:4509` | 653 | 1448×629 | FRAME |
| sección-materialismo | `2330:4593` | 1282 | 1448×785 | FRAME |
| sección-puntos | `2330:4683` | 2047 | 1448×6264 | FRAME |
| components/footer | `4379:5083` | 8311 | 1448×405 | INSTANCE |
| Star 1 | `4370:4822` | 1617 | 22×22 | STAR |
| Star 2 | `4370:4823` | 1736 | 22×22 | STAR |
| Star 3 | `4370:4825` | 1880 | 22×22 | STAR |
| Line 1 | `4369:3550` | 1324 | 1144×0 | LINE |
| Line 2 | `4370:4808` | 2206 | 1144×0 | LINE |
| components/nav | `4442:1914` | -27 | 1448×160 | INSTANCE |

Separadores observados como hermanos del frame: `Line 1` `4369:3550` y
`Line 2` `4370:4808` (ambos 1144 de ancho → margen lateral **152**
(1448−1144)/2), y tres `STAR` de 22×22 (`4370:4822`, `4370:4823`, `4370:4825`).

### `Decálogo` (`2334:1005`, 1448×8234)

| header | `2335:1221` | 133 | 1448×639 | FRAME |
| sección-puntos | `2334:1027` | 772 | 1448×7030 | FRAME |
| components/nav | `4442:2075` | -27 | 1448×160 | INSTANCE |
| components/footer | `4442:2784` | 7802 | 1448×405 | INSTANCE |

### `Únete` (`2335:1229`, 1448×1182)

| sección-únete | `4395:1871` | 133 | 1448×555 | FRAME |
| components/footer | `4442:2832` | 750 | 1448×405 | INSTANCE |
| sección-únete | `4427:1240` | 133 | 1448×617 | FRAME |
| components/nav | `2338:2384` | -27 | 1448×160 | INSTANCE |

> Hay **dos** `sección-únete` superpuestas en la misma posición (y=133):
> `4395:1871` (555 de alto) y `4427:1240` (617 de alto). Son dos variantes del
> mismo bloque; el frame mide 1182 = 133 + 644 + 405.

### `Política de privacidad` (`2335:1533`, 1448×1792)

| sección-puntos | `2335:1540` | 133 | 1448×1227 | FRAME |
| components/footer | `4442:2879` | 1360 | 1448×405 | INSTANCE |
| components/nav | `2338:2512` | -27 | 1448×160 | INSTANCE |

## Grillas

`get_styles` → `grids`: `xs/375`, `sm/1024`, `lg/1448`, `lg/1216`.
El número de columnas por grilla **PENDIENTE-FIGMA**: el plugin no expone la
configuración del estilo de grilla, solo su nombre e id.

## `sm` (768)

**Contenedor: 720 con padding lateral 24.** Evidencia:
`encabezado-contenido` `2408:1567` mide **768** y su hijo `encabezado-texto`
`2408:1568` mide **720** en x=+24 → `768 − 2×24 = 720`.

Las secciones de las páginas `sm` miden **768** (ancho completo, sin margen):
el contenido se reduce dentro de cada sección con el mismo padding de 24.

| Página `sm` | Frame | Alto | Secciones (hijos directos) |
| --- | --- | --- | --- |
| inicio | `268:3128` | 768×4582 | `encabezado-contenido` `2408:1567` 768×902 · `sección-video` `2408:1585` 768×403 · `seccion-objetivos` `2408:1650` 769×948 · `sección-La-Materia-Prima` `2408:1708` 769×959 · 2 × `sección-únete` `2408:1756`/`4436:2819` · `components/footer` `4436:3004` · `components/nav` `2424:1959` |
| programa | `2408:1816` | 768×9616 | footer `2408:1858` · header `2408:1986` · sección-ejes `2408:1993` · sección-materialismo `2408:2000` · sección-puntos `2408:2012` · components/footer `4442:3668` · components/nav `4436:3057` |
| decálogo | `2408:2098` | 768×9088 | footer `2408:2100` · header `2408:2118` · components/footer `4442:3714` · sección-puntos `2408:2274` · components/nav `2424:2007` |
| Únete | `2408:2315` | 768×1370 | components/footer `4442:3760` · sección-únete `4439:3369` · components/nav `2424:2055` |
| política-de-privacidad | `2421:1246` | 768×1846 | sección-puntos `2421:1346` · components/footer `4442:3806` · components/nav `2424:2103` |

Los `Star 1..3` de `programa` `sm` son `4441:3322`…`4441:3324` (22×22).
