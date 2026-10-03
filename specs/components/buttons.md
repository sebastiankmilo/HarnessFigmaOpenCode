# Componente: `buttons`

---
fuente: Figma — página `components`, nodo `14:74` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `export_node_as_image`)
---

## Anatomía

1. Contenedor del botón (relleno por defecto `--color-text-primary`, sin `border-radius`).
2. `icons-and-text` con padding interno por tamaño:
   - `icons/heart-fill` (izquierda) · `TEXT` «Botón» · `icons/heart-fill` (derecha).
3. **Los dos iconos están ocultos en todas las instancias observadas de `1448-lg`**
   (el `export_node_as_image` del nodo devuelve 1×1): nav, encabezado de `inicio`,
   `goal-card`, secciones y `Objetivo-modal`. **El botón se renderiza solo con la
   etiqueta.** Verificado el 2026-10-03.

## Variantes y estados

Propiedad del set: **solo `size`** (no hay variantes `filled`/`outline` ni estados
`hover`, `focus`, `active`, `disabled`):

| Estado | Variante Figma | Nodo | Medida | Padding | Icono | Etiqueta |
| --- | --- | --- | --- | --- | --- | --- |
| default | `size=xs` | `13:73` | 65×33 | 12 / 6 | 16 | Bold 14.2/21.3 |
| default | `size=s` | `14:75` | 79×40 | 16 / 8 | 16 | Bold 16/24 |
| default | `size=base` | `14:80` | 88×45 | 18 / 9 | 24 | Bold 18/27 |
| default | `size=m` | `14:83` | 103×52 | 22 / 11 | 24 | Bold 20.2/30.3 |
| default | `size=l` | `14:86` | 112×57 | 24 / 12 | 24 | Bold 22/33 |
| default | `size=xl` | `14:89` | 130×66 | 28 / 14 | 24 | Bold 25.6/38.4 |
| hover / focus / active / disabled | **no existe en Figma** | — | — | — | — | PENDIENTE de especificación de diseño |

Baseline: `tests/visual/baseline/buttons-<size>.png` — PENDIENTE (`tests/` fuera de
alcance).

### Estilos observados en las instancias (overrides, no variantes)

| Estilo | Relleno | Borde | Etiqueta | Dónde |
| --- | --- | --- | --- | --- |
| primario | `--color-text-primary` (`#000000`) | — | `--color-on-dark` | botón «Aporta» del `nav` |
| primario oscuro | `--color-text-secondary` (`#333333`) | — | `--color-on-dark` | encabezado, `goal-card`, secciones, `Objetivo-modal` |
| outline | **sin relleno** (transparente) | 1 px `--color-text-secondary` | `--color-text-secondary` | botón secundario del encabezado y del `nav` |

**Instancias CTA de las pantallas de texto (extraídas 2026-10-03):**

| Instancia | Pantalla | Medida | Etiqueta | Reacción |
| --- | --- | --- | --- | --- |
| `2334:998` | `Programa` | 361×52 (`size=m`) | «Únete a Vanguardia Colombiana» | → `Únete` (`2335:1229`) |
| `2334:1059` | `Decálogo` | 361×52 (`size=m`) | «Únete a Vanguardia Colombiana» | → `Únete` (`2335:1229`) |
| `2335:1574` | `Política de privacidad` | 187×52 (`size=m`) | «Volver al inicio» | **`PENDIENTE-FIGMA`**: `get_reactions` devuelve 0 |

El ancho de estas instancias es *hug* de la etiqueta (relleno
`--color-text-secondary`, estilo «primario oscuro»).

## Medidas y tokens

- Tipografía de la etiqueta: `--font-weight-bold`; los tamaños caen en la escala
  `--font-size-body-*` (ver [typography.md](../typography.md)).
- Colores: [tokens.md](../tokens.md). Sin `border-radius` (`--radius-none`).
- El padding por tamaño es medida del componente, no de la escala `--space-*`.

## Comportamiento

No lo define el componente: cada instancia lleva su reacción
([interactions.md](../interactions.md)).

### ⚠ Etiqueta del botón en `Objetivo-modal`

La instancia `2358:1158` pinta la etiqueta `#ff8000` al 30 % sobre `#333333`
(`#704a24`, 1.63:1). Defecto del override; ver
[pages/objetivo-modal](../pages/objetivo-modal.md).

## Accesibilidad

- Etiqueta `--color-on-dark` sobre `--color-text-primary`: 21.00:1 — AA.
- Etiqueta `--color-on-dark` sobre `--color-text-secondary`: 12.63:1 — AA.
- Foco visible: **no especificado en Figma** — PENDIENTE (obligatorio en
  [AGENTS.md](../../../../AGENTS.md)).
