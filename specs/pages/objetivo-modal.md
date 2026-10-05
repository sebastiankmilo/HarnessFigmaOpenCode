# Página: Objetivo-modal

---
fuente: Figma — página `1448-lg`, frame `Objetivo-modal` (`2358:932`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`, `export_node_as_image`)
---

Overlay que abre el click en cualquier `goal-card` de [inicio](./inicio.md). No es
una pantalla navegable: se construye como diálogo dentro de `site/index.html`.

## Anatomía

| Parte | Nodo | Medida | Detalle |
| --- | --- | --- | --- |
| Contenedor | `2358:932` → `modal` `2358:1145` | 1024×569 | fondo `--color-surface`; padding **64** horizontal y **96** vertical (columna de contenido 896) |
| Título | `2358:1144` | 896×72 | «Elevación de los trabajadores colombianos a la condición de clase nacional» — Bold 32.4/36.29 (`--font-size-l-h2`), `--color-text-primary` |
| Párrafo | `2358:1146` | 896×205 | Medium 18/27 (`--font-size-body-base`), `--color-text-secondary`; gap con el título **24** |
| Botón | `2358:1158` | 224×52 | `components/buttons` `size=m`, relleno `--color-text-secondary`; gap con el párrafo **24** |
| Cierre | `2358:1153` | 32×32 | `icons/close` en `--color-text-primary`, inset **32** desde arriba-derecha |

- Botón: padding **22** horizontal / **11** vertical; etiqueta «Nuestro programa»
  Bold 20.2/30.3 (`--font-size-body-m` + `--font-weight-bold`).
- Los `icons/heart-fill` del componente están **ocultos** en esta instancia (el
  export del nodo devuelve 1×1), igual que en todos los botones de estas pantallas:
  el botón se renderiza **solo con la etiqueta**.
- Sin `border-radius` (`--radius-none`).

### ⚠ Color de la etiqueta del botón (defecto de diseño)

Figma la pinta `#ff8000` al 30 % sobre `#333333`, es decir **`#704a24` → ratio
1.63:1, no cumple AA**. Es un override defectuoso de la instancia: el componente
`components/buttons` define la etiqueta en `--color-on-dark`.

**Se implementa con `--color-on-dark` (12.63:1)**, por la regla de contraste AA
obligatoria de [AGENTS.md](../../AGENTS.md). **PENDIENTE de confirmación con
el diseño**: si se decide respetar el valor de Figma, hay que cambiarlo aquí y en la
tabla de accesibilidad.

## Variantes y estados

No hay variantes: un único frame. Estados del diálogo, obligatorios por
[AGENTS.md](../../AGENTS.md) y **no especificados en Figma**: foco visible
(`:focus-visible`), foco atrapado dentro del diálogo con restauración al cerrar, y
cierre con `Escape`.

## Comportamiento

| Origen | Trigger | Destino | Transición |
| --- | --- | --- | --- |
| `goal-card` ×4 de `inicio` | `ON_CLICK` | `Objetivo-modal` como **OVERLAY** | `DISSOLVE` 0.3s `EASE_OUT` |
| `goal-card` (2.ª) | `ON_DRAG` | `Objetivo-modal` como **OVERLAY** | `MOVE_IN` RIGHT 0.3s |
| `components/buttons` `2358:1158` | click | `Programa` (`2328:4307`) | NAVIGATE, `DISSOLVE` 0.3s |
| `icons/close` `2358:1153` | click | **CLOSE** (cierra el overlay) | — |

- `ON_DRAG` queda **PENDIENTE**: el prototipo no define cómo debe traducirse el
  arrastre a la web; no se implementa (punto 0.1.5 del plan).
- Cerrar devuelve al estado anterior (`inicio`): aserción de que el diálogo
  desaparece y el foco vuelve a la tarjeta que lo abrió.

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| Título `#000000` sobre `--color-surface` | 21.00 | AA |
| Párrafo `#333333` sobre `--color-surface` | 12.63 | AA |
| Etiqueta `#704a24` sobre `#333333` (tal como pinta Figma) | 1.63 | **No cumple** — ver nota arriba |
| Etiqueta `--color-on-dark` sobre `--color-text-secondary` (implementación) | 12.63 | AA |

Baseline: `tests/visual/baseline/objetivo-modal-1448.png` — PENDIENTE
(`tests/` fuera de alcance).

## Diferencias por breakpoint

### `xs` (375) — frame `2404:3499`, 343×976 (leído el 2026-10-04)

- **Panel** `modal` (`2404:3500`) **343×976** (fondo `--color-surface`), con márgenes
  de 16 en un viewport de 375; **más alto que la pantalla** → el diálogo hace scroll
  (`max-height: 100%` + `overflow: auto`).
- Padding del panel: **96** arriba, **16** laterales, **64** abajo (en `1448-lg` es
  96/64 con panel hasta 1024 de ancho).
- Título `2404:3501` — Bold **28.8**/32.26 (`--font-size-xs-h2`; en lg 32.4).
- Cuerpo `2404:3502` — Medium **18**/27, gap **24** bajo el título (igual que en lg).
- `components/buttons` `2404:3503` — **224×52**, relleno `--color-text-secondary`,
  etiqueta `--color-on-dark`, gap **24** bajo el cuerpo.
- `icons/close` `2404:3504` — **32×32** arriba-derecha (padding **16**, en lg 32).
- **Disparador**: `objetivos` (`2392:4000`) → `ON_CLICK` → OVERLAY `2404:3499`,
  `DISSOLVE` 0.3s `EASE_OUT` (mismo disparador que en `1448-lg`).

### `sm` (tablet)

**PENDIENTE**: `1024-sm` no tiene pantallas construidas (ver
[breakpoints.md](../../specs/breakpoints.md)).
