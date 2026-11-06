---
fuente: Figma — página `1448-lg` (`110:1162`), frame `Objetivo-modal` (`2358:932`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_document_info, get_node_info, get_reactions`)
---

# Página: objetivo-modal

Frame `2358:932` — **1024×604**, relleno `#ffffff`. Es un **overlay**: se abre
encima de la página de origen, no una pantalla aparte.

## Secciones (en orden)

| # | Sección | Nodo | Tamaño | Notas |
| --- | --- | --- | --- | --- |
| 1 | `modal` | `2358:1145` | 1024×604 | único hijo; contiene todo |

### Interior de `modal`

| Parte | Nodo | Tamaño | Posición relativa | Medidas |
| --- | --- | --- | --- | --- |
| Bloque de texto | `Frame 11` `4395:1919` | 896×333 | x=64, y=96 | margen lateral **64** |
| Título | `2358:1144` | 896×92 | y=96 | Bebas Neue **41 / 45.92**, peso 400, `#53411e` |
| Cuerpo | `2358:1146` | 896×233 | y=196 | DM Sans **18 / 30.96**, peso 400, `#333333` |
| CTA | `components/buttons` `2358:1158` | 266×47 | x=64, y=461 | relleno `#ffcd00`, texto `#30250f` DM Sans 18/27 w900 ls 2.16 |
| Cierre | `icons/close` `2358:1153` | 32×32 | x=960, y=32 | `#000000` |

## Baseline

`tests/test-vanguardia/baseline/objetivo-modal-1448.png`
(par: `objetivo-modal-1448`, viewport 1024).

## Comportamiento

El overlay se implementa con el **Modal de UIkit** (`uk-modal`,
`uk-modal-dialog`, `uk-modal-close`): UIkit controla la apertura/cierre
(`uk-open`), `Escape`, el clic en el backdrop, el foco y el bloqueo del
scroll; el contenido de cada objetivo se rellena antes de `show()`. El
backdrop `rgba(0,0,0,0.25)` y la transición de 0,3 s se aplican en los tres
breakpoints. Detalle en [`../interactions.md`](../interactions.md) §Modal de
objetivos (UIkit).

### `sm` (768) — panel 90% del viewport

El frame medía **720×624** (`4441:3492`), pero desde el **2026-11-03** el
panel ocupa el **90% del ancho y el 90% del alto de la pantalla** (decisión
del equipo). Mantiene el padding `96 / 24 / 64`, el título Bebas
36,4/40,768 (`4441:3495`), el cuerpo DM Sans 18/30,96 y el CTA 266×47 fijo
abajo (`4441:3497`) con cierre 24 (`4441:3498`). El cuerpo (`flex: 1;
min-height: 0; overflow-y: auto`) scrollea si el texto no cabe; el panel no
crece con el contenido. Tokens: `--dialog-panel-width-sm: 90%`,
`--dialog-panel-height-sm: 90%`, `--dialog-cta-width-sm` e
`--icon-dialog-close-sm`.

## `xs` (375) — panel 90% del viewport

`Objetivo-modal` `2404:3499` mide **343×1095** en Figma, con padding
`96 / 16 / 64`:

| Parte | Nodo | Medida |
| --- | --- | --- |
| Título | `2404:3501` | 311×205; Bebas 36,4/40,768 (5 líneas) |
| Cuerpo | `2404:3502` | 311×636; DM Sans 18/30,96; **scrollea** |
| CTA | `2404:3503` | 297×54; DM Sans 20,2/30,3, w900, tracking 2,424 |
| Cierre | `2404:3504` | 24×24; top 29, right 16 |

Desde el **2026-11-03** el panel ocupa el **90% del ancho y el 90% del alto
de la pantalla** (el frame de 343×1095 queda como referencia). En un viewport
de 375×812 el panel mide **337,5×730,8**, con un 5% de margen; el overlay no
scrollea y solo el cuerpo (`flex: 1; min-height: 0; overflow-y: auto`)
scrollea; título y CTA quedan fijos, el CTA visible al pie y el cierre a 29
del panel. Tokens: `--dialog-panel-width-xs: 90%`,
`--dialog-panel-height-xs: 90%`, `--dialog-cta-width-xs`,
`--dialog-cta-height-xs`, `--dialog-cta-size-xs`,
`--dialog-cta-line-xs`, `--dialog-cta-tracking-xs`,
`--dialog-cta-padding-x-xs`, `--dialog-cta-padding-y-xs`,
`--dialog-title-size-xs`, `--dialog-title-line-xs`,
`--dialog-close-top-xs` e `--icon-dialog-close-xs`.

## Diferencias por breakpoint

`1024-sm` → `Objetivo-modal` `4441:3492` (frame 720×624; implementación
90%×90% del viewport desde 2026-11-03) · `375-xs` →
`Objetivo-modal` `2404:3499` (frame 343×1095; implementación 90%×90% del
viewport desde 2026-11-03).
