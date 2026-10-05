# Componente: `header-two-columns`

---
fuente: Figma — página `components`, nodo `70:1341` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_nodes_info`)
---

No está instanciado en `inicio` (observado: las secciones de esa pantalla usan
`components/images` y frames propios). Se documenta porque
[especificaciones-diseño §6](../../docs/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md) lo incluye
en el lote inicial de componentes.

## Anatomía

1. Contenedor (1448/768/375 de ancho, **sin relleno propio**).
2. `components/slideshow` → media cuadrada con fondo `--color-media-placeholder`,
   `icons/prev` e `icons/next` 48×48 con inset **16**, y `components/dotnav` 80×8
   centrado a **24** del borde inferior.
3. `text-and-buttons` → `text` (título + párrafo) + `buttons`
   (2 × `components/buttons` size=l, **gap 16**).

Contenido tipográfico (idéntico en todas las variantes salvo el título):

| Elemento | Medida | Color | Token |
| --- | --- | --- | --- |
| Título | Bold 52 / 58.24 en `lg`; Bold 46.1 / 51.63 en `xs` y `sm` | `--color-text-primary` | `--font-size-l-h1-xxl` / `--font-size-xs-h1-xxl` |
| Párrafo | Medium 18 / 27 | `--color-text-secondary` | `--font-size-body-base` |
| Botón primario | 112×57, relleno `--color-text-primary` | texto `--color-on-dark` | size=l |
| Botón secundario | 144×57, outline `--color-text-primary` | texto `--color-text-primary` | size=l |

## Variantes y estados

Propiedades del set: `size` (xs | sm | lg) × `variant` (01 | 02).
`01` = media arriba/izquierda; `02` = texto primero y media abajo/derecha.

| Estado | Variante Figma | Nodo | Medida | Disposición y paddings medidos |
| --- | --- | --- | --- | --- |
| default móvil, media arriba | `size=xs, variant=01` | `70:1340` | 375×917 | **Apilado**: slideshow 343×343 arriba (pad lateral 16, pad superior 0) → gap **24** → texto 343×502; pad inferior 48 |
| default móvil, texto arriba | `size=xs, variant=02` | `70:1483` | 375×973 | **Apilado**: texto 343×502 (pad superior 48, lateral 16) → gap **32** → slideshow 343×343; pad inferior 48 |
| default tablet, media izq. | `size=sm, variant=01` | `103:1945` | **768**×550 | **2 columnas**: slideshow 372×372 pegado al borde izquierdo (pad 0) → gap **24** → texto 348×502; pad derecho 24, inferior 48 |
| default tablet, texto izq. | `size=sm, variant=02` | `112:5449` | **768**×602 | **2 columnas**: texto 324×554 (pad izq. 24) → gap **24** → slideshow 372×372; pad derecho 24, inferior 48 |
| default desktop, media izq. | `size=lg, variant=01` | `103:2441` | 1448×708 | **2 columnas**: slideshow 708×708 (pad izq. 0) → gap **32** → texto 676×302 centrado verticalmente; pad derecho 32 |
| default desktop, texto izq. | `size=lg, variant=02` | `112:5752` | 1448×828 | **2 columnas**: texto 780×302 (pad izq. 32, centrado vertical) → gap **32** → slideshow 572×572 (centrado vertical); pad derecho 32 |

- No hay variantes `hover`, `focus`, `disabled` ni de slide activo/inactivo más allá
  del `dotnav`. PENDIENTE de especificación de diseño.
- Baseline: `tests/visual/baseline/header-two-columns-default.png` — PENDIENTE
  (`tests/` fuera de alcance del plan).

## Medidas y tokens

- Media: `--color-media-placeholder` (`#ebebeb`), sin `border-radius`
  (`--radius-none`).
- Gap entre columnas: `--space-4` (24) en `xs`/`sm`, `--space-5` (32) en `lg`.
- Gap título→párrafo: **16** (medido en `xs` 208+16+189 = 413 y en `lg` 116+16+81 = 213);
  párrafo→botones: **32**.
- Gap de botones: `--space-3` (16).
- `dotnav`: 4 puntos de 8×8 con gap **16**; activo `--dot-active` observado
  `#858585`, inactivos `#ffffff` (ver [accessibility.md](../accessibility.md)).

## Comportamiento

Sin reacciones registradas en el prototipo para este componente
(`get_reactions` sobre `1448-lg` no incluye instancias suyas): slideshow y botones
**no tienen comportamiento definido en Figma**. PENDIENTE de especificación.

## Accesibilidad

- Título `--color-text-primary` sobre `--color-media-placeholder`/página: ≥17:1.
- Párrafo `--color-text-secondary` sobre `#ebebeb`: 10.60:1.
- Puntos del `dotnav` sobre `#ebebeb`: activo 3.10:1 (solo alcanza UI ≥3:1),
  inactivo 1.19:1 — **no cumple**; ver [accessibility.md](../accessibility.md).
- Foco visible de slideshow, puntos y botones: no especificado en Figma.

## Relación con `375-xs` (2026-10-04)

La sección `encabezado-contenido` de `inicio` en móvil (`2392:3972`, 375×854) **no
es una instancia de este componente**: es un `FRAME` propio (`encabezado-texto` +
`botones`). Este componente sigue sin estar instanciado en ninguna pantalla; la
disposición apilada de su variante `size=xs` (media arriba, texto debajo) sirve
solo como referencia de dirección `mobile-first`.

## Relación con `1024-sm` (2026-10-05)

Tampoco se instancia en tablet: `header` de `Programa` (`2408:1986`) y `Decálogo`
(`2408:2118`) son `FRAME` propios **apilados** (media `components/images` 4:3 de
**720×539** arriba, `header-texto` debajo con gap **24**), igual que en `xs`. Este
componente sigue sin estar instanciado en ninguna pantalla de las tres vistas
(`1448-lg`, `375-xs`, `1024-sm`); sirve de referencia de dirección `mobile-first`.
