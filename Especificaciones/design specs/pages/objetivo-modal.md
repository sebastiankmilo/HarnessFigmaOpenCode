# Página: Objetivo-modal

---
fuente: Figma — página `1448-lg`, frame `Objetivo-modal` (`2358:932`); el
frame `375-xs` (`2404:3499`); `1024-sm` **no tiene** frame `Objetivo-modal` (2026-10-05)
extraido: 2026-10-03 (verificación `1024-sm`: 2026-10-05)
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
obligatoria de [AGENTS.md](../../../AGENTS.md). **PENDIENTE de confirmación con
el diseño**: si se decide respetar el valor de Figma, hay que cambiarlo aquí y en la
tabla de accesibilidad.

## Variantes y estados

No hay variantes: un único frame. Estados del diálogo, obligatorios por
[AGENTS.md](../../../AGENTS.md) y **no especificados en Figma**: foco visible
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

### `sm` (tablet) — **no existe frame** (Caso 19, leído el 2026-10-05)

La página `1024-sm` (`10:214`) **no tiene frame `Objetivo-modal`** entre sus 6
pantallas (ver [breakpoints.md](../breakpoints.md)) y `get_reactions`
sobre las `goal-card` de `inicio` a 768 (`2408:1656`, `2408:1657`) devuelve
**0 reacciones**: no hay `ON_CLICK` que abra un overlay.

En consecuencia el modal **no se implementa ni se estiliza para tablet**: el
diálogo existente (heredado de `lg`/`xs`) mantiene sus estilos y reacciones
actuales sin variación en el rango 768–1447. Cualquier decisión de llevarlo a
tablet debe venir como instrucción explícita del equipo y actualizar este
documento y el ticket 3.

> **Actualización 2026-10-20 (ticket 4):** el diseño definitivo de `1024-sm`
> **sí incluye** un frame `Objetivo-modal` (`4441:3492`, 720×624); su
> implementación queda para el ticket 5. La nota anterior queda superada allí.

## Diseño definitivo `1448-lg` (leído el 2026-10-20)

El frame `2358:932` ahora mide **1024×604** (era 1024×569); el panel `modal`
`2358:1145` mide 1024×604. Cambios respecto al wireframe:

| Parte | Nodo | Medida (nueva) | Detalle nuevo |
| --- | --- | --- | --- |
| Contenedor | `2358:1145` | **1024×604** | padding contenido: 64 lateral (columna 896, x=174−110); título en y=4771 (96 desde el top del panel) |
| Título | `2358:1144` | 896×**92** | **Bebas Neue Regular 41/45.92**, `#53411e` — cambia familia (antes DM Sans Bold 32.4) |
| Párrafo | `2358:1146` | 896×**233** | DM Sans Regular **18/30.96**, `#333333`; gap bajo el título **8** (4871−(4771+92)) |
| Botón | `2358:1158` | **266×47** | relleno `#ffcd00` (antes `--color-text-secondary`); etiqueta DM Sans Black **18/27** ls 2.16 `#30250f`, «Nuestro programa»; heart-fill **visible** 24×24 `#fafafa` a los lados; gap bajo el párrafo **32** (5136−(4871+233)) |
| Cierre | `2358:1153` | 32×32 | `icons/close` `#000000`, inset ~32/32 (x=1070, y=4707; borde derecho del panel en 1134) |

- El panel mide 1024×604 y el contenido 896: paddings 64 laterales; vertical:
  96 arriba (4771−4675), 96 abajo (5269−5172 ≈ 97).
- Fuentes: el título usa **Bebas Neue** (fuente de display del diseño
  definitivo — pendiente vendorizar en `site/assets/fonts/`, ver
  [assets.md](../assets.md)); el cuerpo y la etiqueta siguen en DM Sans.
- `ON_DRAG` residual de `goal-card` **no se implementa** (Caso 16, ticket 4).
- Transición de apertura/cierre: estilo UIkit con backdrop `rgba(0,0,0,0.25)`
  (nota `4649:2017`), documentada en [interactions.md](../interactions.md).
