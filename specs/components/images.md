# Componente: `images`

---
fuente: Figma — página `components`, nodo `19:92` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `export_node_as_image`)
---

Bloque de media del wireframe: rectángulo con relleno sólido y una etiqueta con la
relación de aspecto. **No hay bitmap asociado** en el archivo
([assets.md](../assets.md)).

## Anatomía

1. Contenedor con relleno `--color-media-placeholder` (`#ebebeb`), sin `border-radius`.
2. `TEXT` con la relación de aspecto (p. ej. «16:9») — Bold 46.1/51.63
   (`--font-size-xs-h1-xxl`), `--color-on-dark`, **centrado** dentro del contenedor.

## Variantes y estados

Propiedad del set: **`ratio`**. Ocho variantes, todas 327 de ancho:

| Variante | Nodo | Medida | Offset de la etiqueta (= centrado) |
| --- | --- | --- | --- |
| `ratio=2:3` | `19:91` | 327×489 | (130.0, 218.5) |
| `ratio=4:5` | `19:93` | 327×409 | (128.0, 178.5) |
| `ratio=1:1` | `19:95` | 327×327 | (140.5, 137.5) |
| `ratio=5:4` | `19:98` | 327×261 | (128.0, 104.5) |
| `ratio=4:3` | `19:108` | 327×245 | (128.5, 96.5) |
| `ratio=3:2` | `19:101` | 327×216 | (130.0, 82.0) |
| `ratio=16:9` | `19:104` | 327×184 | **(120.0, 66.0)** |
| `ratio=4:2` | `243:5129` | 327×163 | (129.0, 55.5) |
| hover / focus / disabled | **no existe en Figma** | — | PENDIENTE |

Baseline: `tests/visual/baseline/images-<ratio>.png` — PENDIENTE (`tests/` fuera de
alcance).

## Overrides observados en las instancias

| Instancia | Relleno | Etiqueta |
| --- | --- | --- |
| `container-and-card` (sección «La Materia Prima») | `--color-media-placeholder` (`#ebebeb`) | centrada en la instancia (322×257.2 → 125.5 / 102.6) |
| Bloques de vídeo (`inicio` secciones 3 y 6, página `Únete`) | **`--color-media-video` (`#c2c2c2`)** | **offset fijo (120, 66)**, no se recoloca al redimensionar (media de 1124 y de 792 conservan el mismo offset) |
| `header` de `Programa` (`2328:4501`, 438×328) y de `Decálogo` (`2335:1222`, 438×328) | `--color-surface-strong` (`#d6d6d6`) | «4:3», centrada |
| `sección-ejes` de `Programa` (`2329:4515`, 439×439) | `--color-surface-muted` (`#ebebeb`) | «1:1», centrada |
| `sección-materialismo` de `Programa` (`2329:4519`, 320×320) | `--color-surface-muted` (`#ebebeb`) | «1:1», centrada |

La etiqueta `16:9` / `5:4` es una **anotación de placeholder del wireframe**, no texto
de interfaz ([typography.md](../typography.md)).

## Medidas y tokens

- Rellenos: [tokens.md](../tokens.md) — `--color-media-placeholder`,
  `--color-media-video`.
- Sin `border-radius` (`--radius-none`).

## Comportamiento

Ninguno: es un bloque estático. Las reacciones de navegación viven en el nodo que lo
contiene ([interactions.md](../interactions.md)).

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Etiqueta `--color-on-dark` sobre `--color-media-video` (`#c2c2c2`) | **1.78** | No cumple AA (ni siquiera para texto grande) |
| Etiqueta `--color-on-dark` sobre `--color-media-placeholder` (`#ebebeb`) | **1.19** | No cumple AA — mismo par ya registrado en [accessibility.md](../accessibility.md) |

La etiqueta es una anotación de placeholder del wireframe, no texto de interfaz; se
reproduce tal cual está en el diseño. **Texto alternativo de la imagen: PENDIENTE de
especificación de diseño** (hoy el bloque es un relleno sólido sin contenido real;
ver [accessibility.md](../accessibility.md)).

## Instancias en `375-xs` (leídas el 2026-10-04)

Medidas reales de las instancias de las vistas móviles (todas con la etiqueta
**centrada**, `top/left: 50%`):

| Pantalla | Instancia | Ratio | Medida |
| --- | --- | --- | --- |
| `inicio` · bloque de vídeo | `2392:3991` | 16:9 | 343×193.47 |
| `inicio` · «La Materia Prima» | `I2392:4058;93:130` | 5:4 | 343×274 |
| `inicio` y `Únete` · `sección-únete` | `2392:4116` / `2396:2714` | 16:9 | 341.08×192.39 |
| `Programa` · header | `2396:2400` | 4:3 | 343×257 |
| `Programa` · `sección-ejes` | `2396:2420` | 1:1 | 337×337 |
| `Programa` · `sección-materialismo` | `2396:2425` | 1:1 | 341×341 |
| `Decálogo` · header | `2396:2524` | 4:3 | 343×257 |
