# Componente: `container-and-card`

---
fuente: Figma — página `components`, nodo `91:973` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`, `export_node_as_image`)
---

Tarjeta de artículo de la sección «La Materia Prima» de
[inicio](../pages/inicio.md).

## Anatomía (variante usada: `type=card, size=xs, orientation=vertical`)

1. Contenedor 343×460, relleno `--color-surface-alt` (`#fafafa`), sin `border-radius`.
2. `components/images` (`93:130`) 343×274, relleno `--color-media-placeholder`.
3. Gap imagen → texto: **16**.
4. `text-container` (`93:131`) → `text` (`93:132`) con padding lateral **24**
   (contenido 295) y **32** de padding inferior:
   - Título (`93:133`) — Bold 25.6/28.67 (`--font-size-xs-h3`), `--color-text-primary`.
   - Gap **8**.
   - Entradilla — Medium 16/24 (`--font-size-body-s` + `--font-weight-medium`),
     `--color-text-secondary`.

## Variantes y estados

Propiedades del set: `type` (`container` | `card`) × `size` (`xs` | `sm` | `lg`) ×
`orientation` (`vertical` | `horizontal`) — **10 variantes**:

| Variante | Nodo | Medida |
| --- | --- | --- |
| `type=container, size=xs, orientation=vertical` | `91:972` | 343×479 |
| **`type=card, size=xs, orientation=vertical`** ← usada en `inicio` | `93:129` | 343×460 |
| `type=container, size=sm, orientation=horizontal` | `106:2897` | 720×348 |
| `type=container, size=sm, orientation=vertical` | `106:2961` | 348×483 |
| `type=card, size=sm, orientation=horizontal` | `107:2200` | 720×348 |
| `type=card, size=sm, orientation=vertical` | `107:2253` | 348×473 |
| `type=container, size=lg, orientation=horizontal` | `113:6079` | 592×280 |
| `type=container, size=lg, orientation=vertical` | `113:6173` | 280×497 |
| `type=card, size=lg, orientation=horizontal` | `113:6316` | 592×280 |
| `type=card, size=lg, orientation=vertical` | `113:6341` | 280×460 |
| hover / focus / active / disabled | **no existe en Figma** | PENDIENTE de especificación de diseño |

Baseline: `tests/visual/baseline/container-and-card-default.png` — PENDIENTE
(`tests/` fuera de alcance).

## Instancias en `inicio`

Las 4 (`2326:4137`, `2326:4173`, `2326:4185`, `2326:4197`) miden **322×525** (ancho de
columna de la grilla, el componente se redimensiona de 343) y usan la variante
`type=card, size=xs, orientation=vertical`. Contenido real en
[inicio §5](../pages/inicio.md).

## Medidas y tokens

| Propiedad | Valor | Token |
| --- | --- | --- |
| Fondo | `#fafafa` | `--color-surface-alt` |
| Media | `#ebebeb` | `--color-media-placeholder` |
| Título | Bold 25.6/28.67 | `--font-size-xs-h3` + `--line-height-heading` |
| Entradilla | Medium 16/24 | `--font-size-body-s` + `--font-weight-medium` |
| Padding lateral | 24 | `--space-4` |
| Gap imagen→texto | 16 | `--space-3` |
| Radio | ninguno | `--radius-none` |

## Comportamiento

Registrado con `get_reactions` sobre `1448-lg > inicio > sección-La-Materia-Prima`:

| Origen | Trigger | Destino |
| --- | --- | --- |
| `container-and-card` ×4 | click | URL externa `lamateriaprima.org` (4 artículos distintos) |

Transición/estados hover: **no especificados en Figma** — PENDIENTE.

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Título `#000000` sobre `#fafafa` | 20.12 | AA |
| Entradilla `#333333` sobre `#fafafa` | 12.10 | AA |
| Fondo `#fafafa` sobre la sección `#d6d6d6` | 1.39 | El borde de la tarjeta no se distingue por contraste (sin stroke ni sombra en Figma) |

La tarjeta es **clickeable en su totalidad**: requiere foco visible y nombre
accesible. **No especificado en Figma** — PENDIENTE; el foco visible es obligatorio
por [AGENTS.md](../../../AGENTS.md).

## Instancia en `375-xs` (leída el 2026-10-04)

Instancia `2392:4058` de `sección-La-Materia-Prima`: **343×513** (la variante
`type=card, size=xs` mide 343×460; el alto extra viene del texto real).

- Imagen 5:4 **343×274** → gap **16** → `text-container` 343×223.
- `text` **311** de ancho: padding lateral **16** (la variante usa 24) y padding
  inferior **32**.
- Título **25.6** (`--font-size-xs-h3`) → gap **8** → entradilla 16.

## Instancias en `1024-sm` (leídas el 2026-10-05)

Instancias `2408:1713` (**346×571**) y `2408:1714` (**350×571**) de
`sección-La-Materia-Prima`, en grilla de **2 columnas** con gap **24**
(346 + 24 + 350 = 720).

- Imagen 5:4 **346×276.38** → gap **16** → `text-container` 346×223.
- `text` **298** de ancho: padding lateral **24** (igual que la variante base; a
  `xs` era 16).
- Título **25.6** (`--font-size-xs-h3`) → gap **8** → entradilla 16.
- Sin fila de paginación (a diferencia de `xs`): la sección no tiene controles.
