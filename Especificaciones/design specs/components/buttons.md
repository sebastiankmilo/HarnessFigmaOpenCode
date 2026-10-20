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

Baseline: ver «Baseline por vista» más abajo (instancias exportadas 2026-10-19).

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

## Baseline por vista (exportación)

**Criterio (ticket Arness 2, 2026-10-19):** el baseline de cada botón **no** se
exporta del maestro del set `14:74` (guía de anatomía y fuente de la convención
`buttons-<size>.png`): el par juzgable se exporta con `export_node_as_image`
(PNG @1x) desde el **nodo de instancia en la vista** (overrides de relleno/
etiqueta incluidos). Los maestros `xs/base/l/xl` quedan como referencia de
anatomía **sin par** (el sitio no usa esos tamaños) y no se juzgan. El par
*maestro ↔ instancia* produce falsos positivos (iconos `heart-fill` del maestro,
etiqueta «Botón») — regla de triage en
[`tests/visual/rubric.md`](../../../tests/visual/rubric.md) §1.0.

| Vista | Nodo de instancia | Baseline |
| --- | --- | --- |
| `1448-lg` › `inicio` › nav «Aporta» | `I2338:2192;315:5105` (87×40, `size=s`) | `tests/visual/baseline/buttons-s.png` |
| `1448-lg` › `inicio` › encabezado CTA «Nuestro programa» | `2325:3794` (224×52, `size=m`) | `tests/visual/baseline/buttons-m.png` |
| `1448-lg` › `inicio` › encabezado «Únete» (outline) | `2325:3817` (103×52) | *sin par hoy* |
| Maestros `xs`/`base`/`l`/`xl` (referencia) | `13:73` / `14:80` / `14:86` / `14:89` | `buttons-{xs,base,l,xl}.png` (no se juzgan) |
| Estados `hover`/`focus`/`active` | **no existen en Figma** | sin baseline (evidencia en `actual/` + aserción funcional) |

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
  [AGENTS.md](../../../AGENTS.md)).

## Instancias en `375-xs` (leídas el 2026-10-04)

| Instancia | Nodo | Medida | Estilo |
| --- | --- | --- | --- |
| «Nuestro programa» (encabezado `inicio`) | `2392:3977` | 224×52 | filled `--color-text-secondary`, size=m |
| «Únete» (encabezado `inicio`) | `2392:3978` | 103×52 | outline, size=m |
| «Nuestro programa» (CTA de objetivos) | `2392:4009` | 224×52 | filled |
| «lamateriaprima.org» | `2392:4062` | 234×52 | filled |
| «Volver al inicio» (`Política de privacidad`) | `2396:2891` | 187×52 | filled |
| CTA de `sección-puntos` (`Programa`, `Decálogo`) | (interior 317×30) | size=m | filled |
| «Aporta» / outline del menú móvil | `I2396:3288;38:1066` / `38:1067` | 87×40 / 103×40 | filled `#000000` / outline, size=s |
| Botón del `Objetivo-modal` | `2404:3503` | 224×52 | filled `--color-text-secondary` |
| Botón de `goal-card` | `I2392:4001;2325:3908` | 104×40 | solapado con el párrafo → **no se renderiza** |

**Iconos `icons/heart-fill`**: en `375-xs` los nodos devuelven bbox real
(24×24 / 16×16) pero **se solapan con la etiqueta** (el `icons-and-text` arranca en
la misma `x` que el icono), igual que en `1448-lg` donde devolvían 1×1. Se mantiene
el renderizado **solo con la etiqueta** por coherencia con escritorio; registrado
como observación, sin cambiar el HTML.

## Instancias en `1024-sm` (leídas el 2026-10-05)

| Instancia | Nodo | Medida | Estilo |
| --- | --- | --- | --- |
| «Nuestro programa» (encabezado `inicio`) | `2408:1572` | 224×52 | filled `--color-text-secondary`, size=m |
| «Únete» (encabezado `inicio`) | `2408:1573` | 103×52 | outline, size=m |
| «Nuestro programa» (CTA de objetivos) | `2408:1664` | 224×52 | filled |
| «lamateriaprima.org» | `2408:1717` | 234×52 | filled |
| CTA de `sección-puntos` (`Programa` / `Decálogo`) | `2408:2043` / `2408:2307` | **361×52** | filled, size=m |
| «Volver al inicio» (`Política de privacidad`) | `2421:1352` | **187×52** | filled, size=m |
| «Aporta» del menú tablet | `2424:994` | **87×40** | filled `#000000`, size=s, etiqueta Bold 16/24 |
| Outline del menú tablet | `2424:995` | 103×40 | **oculto en el render** → no se implementa |
| Botón de `goal-card` | `I2408:1656;2325:3908` | 104×40 | solapado con el párrafo → **no se renderiza** |

Los CTA de `sección-puntos` miden **361×52** a 768 (a `xs` el interior era 317×30).
Se mantiene el renderizado **solo con la etiqueta** (iconos `icons/heart-fill`
solapados), por coherencia con `xs` y `lg`.


## Hover (capa `hovers`, 2026-10-20)

- Relleno default `#ffcd00` → hover `#ff4520` (par `4518:2150` ↔ `4518:2158`);
  texto `#30250f` en ambos; transición `all .4s ease`.
- Variante outline: stroke `#30250f`, sin cambio de hover.
- CTA grande (`4518:2240` ↔ `4518:2252`, 281×47): inversión completa —
  default fondo `#ceac57` / texto `#1b2c43`; hover fondo `#1b2c43` / texto
  `#ceac57`.
