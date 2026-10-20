---
fuente: Figma — página `components-diseño` (`10:215`), `COMPONENT_SET` `components/images` (`19:92`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info`)
---

# Componente: `images`

`COMPONENT_SET` `19:92` — placeholder de media con la relación de aspecto escrita encima.

## Anatomía

Contenedor rectangular (relleno `#ebebeb`) + `TEXT` con la relación de aspecto
centrado, Bebas Neue **58.4 / 65.408**, peso 400, tracking 2.336, relleno
`#ffffff`.

## Variantes y estados

Propiedad del set: **`ratio`**. Ocho variantes, **todas de 327 de ancho**:

| Variante | Nodo | Tamaño | Relación real |
| --- | --- | --- | --- |
| `ratio=2:3` | `19:91` | 327×489 | 0,668 |
| `ratio=4:5` | `19:93` | 327×409 | 0,799 |
| `ratio=1:1` | `19:95` | 327×327 | 1,000 |
| `ratio=5:4` | `19:98` | 327×261 | 1,253 |
| `ratio=4:3` | `19:108` | 327×245 | 1,335 |
| `ratio=3:2` | `19:101` | 327×216 | 1,514 |
| `ratio=16:9` | `19:104` | 327×184 | 1,777 |
| `ratio=4:2` | `243:5129` | 327×163 | 2,006 |

No hay variantes de estado ni interacción: es un placeholder.

## La etiqueta de ratio

Cada variante trae su `TEXT` (p. ej. `19:99` «5:4»). El plugin TalkToFigma
**no expone el campo `visible`** de un nodo: `get_node_info` devuelve solo
`id`, `name`, `type`, `fills`, `absoluteBoundingBox`, `characters` y `style`.

**PENDIENTE-FIGMA:** si la etiqueta está oculta en la instancia usada por las
pantallas. No se puede afirmar ni negar leyendo el árbol de nodos.

## Instancias usadas en `1448-lg`

| Página | Instancia | Nodo | Tamaño |
| --- | --- | --- | --- |
| inicio › hero | media derecha | `4329:2096` | 590×740 |
| inicio › `sección-video` | portada de vídeo | hijo de `2325:3923` | 1448×634 |
| inicio › `sección-La-Materia-Prima` | 4 fotos | hijos de `2328:4236` | — |
| programa › `header`, `sección-ejes`, `sección-materialismo` | 4 | hijos de `2328:4508`, `2328:4509`, `2330:4593` | — |
| decálogo › `header` | 1 | hijo de `2335:1221` | — |
| Únete › `sección-únete` | 2 | hijos de `4395:1871` y `4427:1240` | — |

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Relleno del placeholder | `--color-media-placeholder` | `#ebebeb` |
| Offset de la etiqueta 16:9 | `--media-label-top` / `--media-label-left` | 66px / 120px |

## Comportamiento

Ninguno: `get_reactions` no registra acciones sobre `components/images`.

## Baseline

No tiene par propio en `tests/test-vanguardia/pairs.manifest.json`; se juzga
dentro de los pares de página.
