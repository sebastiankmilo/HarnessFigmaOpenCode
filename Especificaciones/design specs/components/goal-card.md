# Componente: `goal-card`

---
fuente: Figma — página `components`, nodo `2326:3924` (`COMPONENT`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`)
---

## Anatomía

Componente simple (**no es set de variantes**), por defecto 322×433:

1. Contenedor con relleno `--color-surface-alt`, padding **24** en los 4 lados
   (medido: contenido en `x=1128` sobre contenedor en `x=1104`).
2. `Ellipse 1` → avatar 137×137, relleno `--color-avatar-placeholder`, sin stroke.
3. Gap avatar→texto: **16**.
4. `text` (274 de ancho):
   - Título — Bold 28.8 / 32.26, `--color-text-primary`.
   - Gap **8**.
   - Párrafo — Medium 16 / 24, `--color-text-secondary`.
5. Gap párrafo→botón: **24**.
6. `components/buttons` size=s — 104×40, relleno `--color-text-secondary`,
   etiqueta `Leer más` Bold 16/24 en `--color-on-dark`, padding 16 horizontal / 8 vertical.
7. Padding inferior medido: **48** (el contenido termina 48 px antes del borde).

Sin `border-radius` (`--radius-none`).

## Variantes y estados

| Estado | Variante Figma | Baseline | Notas |
| --- | --- | --- | --- |
| default | `2326:3924` (único) | `tests/visual/baseline/goal-card.png` (instancia por vista, ver «Baseline por vista») | 322×433 con texto de muestra |
| hover / focus / active / disabled | **no existe en Figma** | — | PENDIENTE de especificación de diseño: sin ella, el agente no construye esos estados |

Las instancias de `inicio` miden **322×537** (una 322×529): el alto crece con el
texto real, es decir el componente hace *hug* verticalmente. El ancho de columna
(322) es fijo.

## Baseline por vista (exportación)

**Criterio (ticket Arness 2, 2026-10-19):** el baseline **no** se exporta del
nodo maestro `2326:3924` (guía de anatomía): se exporta con
`export_node_as_image` (PNG @1x) la **instancia tal como aparece en la grilla de
cada vista** (overrides y alto *hug* incluidos). El par *maestro ↔ instancia*
genera falsos positivos en el juez (botón «Leer más» oculto en las instancias,
alto por contenido) — ver regla de triage en
[`tests/visual/rubric.md`](../../../tests/visual/rubric.md) §1.0.

Localizar las instancias escaneando hijos `INSTANCE` de la grilla con
`scan_nodes_by_types` (o en [`pages/inicio.md`](../pages/inicio.md) §objetivos).

| Vista | Nodo de instancia | Baseline |
| --- | --- | --- |
| `1448-lg` › `inicio` › grilla `2326:4020` (2.ª tarjeta) | `2326:3937` (322×537) | `tests/visual/baseline/goal-card.png` |
| `375-xs` › `inicio` (instancia `2392:4001`, 343×498) | *PENDIENTE: añadir fila al exportarla* | — |

## Medidas y tokens

| Propiedad | Valor | Token |
| --- | --- | --- |
| Fondo | `#fafafa` | `--color-surface-alt` |
| Padding | 24 / 24 / 48 (inferior) / 24 | `--space-4`, `--space-6` |
| Título | Bold 28.8 / 32.26 | `--font-size-l-h3` + `--line-height-heading` |
| Párrafo | Medium 16 / 24 | `--font-size-body-s` + `--font-weight-medium` |
| Botón | size=s, `#333333` | `--color-text-secondary` (override de la instancia; el componente por defecto es `#000000`) |
| Radio | ninguno | `--radius-none` |

## Comportamiento

Registrado con `get_reactions` sobre `1448-lg > inicio > seccion-objetivos`:

| Origen | Trigger | Destino | Transición |
| --- | --- | --- | --- |
| `goal-card` (las 4 instancias) | `ON_CLICK` | `Objetivo-modal` (`2358:932`) como **OVERLAY** | DISSOLVE 0.3s EASE_OUT |
| `goal-card` (segunda instancia) | `ON_DRAG` | `Objetivo-modal` como OVERLAY | MOVE_IN 0.3s RIGHT EASE_OUT |

Detalle del overlay: [interactions.md](../interactions.md).

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Título `#000000` sobre `#fafafa` | 20.12:1 | AA |
| Párrafo `#333333` sobre `#fafafa` | 12.10:1 | AA |
| Texto blanco sobre botón `#333333` | 12.63:1 | AA |
| Fondo de tarjeta `#fafafa` sobre página `#ffffff` | 1.05:1 | El borde de la tarjeta no se distingue por contraste (la tarjeta no tiene stroke ni sombra en Figma) |

- La tarjeta es **clickeable en su totalidad** (la reacción vive en la instancia):
  requiere foco visible y nombre accesible. **No especificado en Figma** — PENDIENTE.
- El avatar es un placeholder `#d9d9d9` sin texto alternativo definido.

## Instancia en `375-xs` (leída el 2026-10-04)

Instancia `2392:4001` de `seccion-objetivos`: **343×498** (columna única).

- Padding **16** superior y lateral, **32** inferior (la variante base usa 24/24/48).
- Avatar **137×137**, gap avatar→texto **16**.
- Título **Bold 25.6/28.67** (`--font-size-xs-h3`; en `lg` 28.8); párrafo Medium
  16/24; gap **8**.
- El `components/buttons` de la instancia (104×40) **se solapa con el párrafo**
  (mismo defecto que en `1448-lg`): se mantiene la decisión de **no renderizar el
  botón** (nota 2 de [inicio](../pages/inicio.md)).
- La reacción `ON_CLICK` → OVERLAY `2404:3499` (`DISSOLVE` 0.3s) vive en el frame
  contenedor `objetivos` (`2392:4000`), no en la tarjeta.

## Instancias en `1024-sm` (leídas el 2026-10-05)

Instancias `2408:1656` y `2408:1657` de `seccion-objetivos`: **346×522** cada una,
con gap **24** entre ellas (**2 tarjetas visibles de 4**; el carrusel está definido
en [interactions.md](../interactions.md)).

- Padding **24** superior y lateral, **48** inferior (la variante base usa 24/24/48:
  aquí solo cambia el inferior respecto al padding lateral).
- Avatar **137×137**, gap avatar→texto **16** (mismo valor que en `xs`).
- Título **Bold 25.6/28.67** (`--font-size-xs-h3`); párrafo Medium 16/24, gap **8**.
- El `components/buttons` de la instancia (104×40) **se solapa con el párrafo**
  (mismo defecto que en `1448-lg` y `375-xs`): se mantiene **no renderizar el
  botón**.
- `get_reactions` sobre `2408:1656` devuelve **0 reacciones**: no hay `ON_CLICK`
  hacia `Objetivo-modal` a tablet (Caso 19, ver
  [objetivo-modal.md](../pages/objetivo-modal.md)).
