# Página: Únete

---
fuente: Figma — página `1448-lg`, frame `Únete` (`2335:1229`); página `1024-sm`, frame `2408:2315` (leído el 2026-10-05)
extraido: 2026-10-03 (sm: 2026-10-05)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_node_info`, `get_reactions`, `export_node_as_image`)
---

Frame: `2335:1229` — 1448×1170.73, fondo `--color-surface`. Contenedor de
contenido 1384 (padding lateral 32). Ritmo vertical del sitio:
[layout.md](../layout.md).

## Secciones (en orden)

| # | Sección | Nodo | Componentes usados | Baseline |
| --- | --- | --- | --- | --- |
| 1 | Header / nav | `2338:2384` (instancia `components/nav`; enlace 3 «Únete» activo) | `nav` | `tests/visual/baseline/unete-1448.png` — PENDIENTE (`tests/` fuera de alcance) |
| 2 | sección-únete | `2335:1368` | `images` (`ratio=16:9`), triángulo de play, bloque de texto | — |
| 3 | Footer | `2338:2746` | `icons/logo-02`, `icons/facebook`, `icons/instagram`, `icons/youtube`, `icons/x`, `icons/tik-tok` | — |

Alturas apiladas (gap 0): nav **125** · sección-únete **638.73** · footer **405**.

## Detalle de la sección 2 — `sección-únete` (`2335:1368`)

- 1448×638.73, fondo `--color-surface`, padding vertical **96** (la sección 6 de
  [inicio](./inicio.md) es idéntica).
- Dos columnas dentro del contenedor 1384 (padding lateral 32), separadas **32**:
  - **Media** `2335:1369` → `components/images` `ratio=16:9` (`2335:1370`),
    792×446.73, relleno `--color-media-video` (`#c2c2c2`). La etiqueta `16:9`
    (anotación de wireframe, Bold 46.1/51.63, `--color-on-dark`) queda en el offset
    fijo del componente: **(120, 66)** desde la esquina superior izquierda.
  - Triángulo de play `2335:1371` (relleno `--color-surface`): 67×59 medido, centrado
    por su **centroide** sobre el centro de la media →
    `left:50%; top:50%; transform: translate(-33.33%, -50%)`, ancho **8.5 %** del ancho
    de la media (proporción 96:85 idéntica en ambas pantallas).
  - **Texto** `2335:1372`, 560×285, centrado verticalmente respecto a la media:
    - `2335:1373` «Únete a Vanguardia Colombiana» — Bold 36.49/40.87
      (`--font-size-l-h1`), `--color-text-primary`.
    - `2335:1374` párrafo — Medium 20.2/30.3 (`--font-size-body-m`),
      `--color-text-secondary`, gap **16** bajo el título.
- **No hay formulario en esta pantalla**: `components/form` no está instanciado en
  `Únete` (solo existe como componente con variante `size=xs`).

## Comportamiento registrado (22 nodos con reacción)

Solo `nav` y `footer`; el cuerpo de la pantalla no tiene interacciones.
Registro completo y destinos en [interactions.md](../interactions.md).

- `nav`: `logo` → `inicio` (`110:2277`); enlaces → `Programa` (`2328:4307`),
  `Decálogo` (`2334:1005`), `Únete` (**sin `destinationId`**: enlace a la propia
  pantalla) y `https://lamateriaprima.org/`; `platforms` → URLs externas.
- `footer`: `logo-02` → `inicio`; enlaces → `inicio`, `Programa`, `Decálogo`,
  `Únete` (sin destino), `Pólitica de privacidad` (`2335:1533`) y
  `La Materia Prima` (URL externa); `platforms` → URLs externas.
- Transición por defecto del prototipo: `DISSOLVE`, `EASE_OUT`, 0.3 s.

**Observación registrada (no corregida):** en el `footer` de esta pantalla el icono
`icons/youtube` apunta a `https://www.instagram.com/vanguardiacol` (mismo destino que
el de Instagram); en el `nav` sí apunta a YouTube. Mismo fallo que en
[inicio](./inicio.md).

## Diferencias por breakpoint

### `xs` (375) — frame `2396:2676`, 375×1592 (leído el 2026-10-04)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2396:2677` | **80** | 125 → 80; logo 96 → 48; padding 32 → 16 |
| 1 | `sección-únete` | `2396:2712` | 788.39 | padding **64** (96); **apilado**: media 16:9 **341.08×192.39** arriba (padding superior 64), bloque de texto debajo (gap **32**); título **32.4** (36.49); gap título→párrafo **16**; párrafo 20.2 igual |
| 2 | `footer` | `2396:2719` | 714 | igual que el de [inicio](./inicio.md) (padding 64, enlaces apilados y centrados) |

Contenedor: 343 (padding 16). La sección es idéntica a la sección 5 de `inicio`
(`2392:4114`), mismas medidas.

### `sm` (768) — frame `2408:2315`, 768×1266 (leído el 2026-10-05)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2424:2055` | **75** | 125 → 75; logo 48; sin enlaces de texto (solo plataformas + hamburguesa) |
| 1 | `sección-únete` | `2408:2478` | 786.12 | padding **64** (96); **apilado**: media 16:9 **720×406.12** arriba (`video`, con `Polygon 1` 81.99×62.78 centrado), bloque `Frame 3` **720×220** debajo (gap **32**); título **32.4** (36.49); gap título→párrafo **16**; párrafo 20.2 igual |
| 2 | `footer` | `2408:2316` | **405** | igual que el de [inicio](./inicio.md) a 768 (padding 64, fila de 7 enlaces) |

Contenedor: **720** (padding lateral 24). La sección es idéntica a la sección 5
de `inicio` a 768 (`2408:1756`), mismas medidas.
