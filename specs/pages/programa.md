# Página: Programa

---
fuente: Figma — página `1448-lg`, frame `Programa` (`2328:4307`); página `1024-sm`, frame `2408:1816` (leído el 2026-10-05)
extraido: 2026-10-03 (sm: 2026-10-05)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_nodes_info`, `get_reactions`)
---

Frame: `2328:4307` — 1448×9475, fondo `--color-surface`. Contenido 1384 (padding
lateral 32). Ritmo vertical del sitio: [layout.md](../../specs/layout.md).

## Secciones (en orden)

| # | Sección | Nodo | Componentes usados | Baseline |
| --- | --- | --- | --- | --- |
| 1 | Header / nav | `2338:2256` (instancia `components/nav`, declarada la última pero colocada arriba, `y=-27` = origen del frame) | `nav` | `tests/visual/baseline/programa-1448.png` — PENDIENTE (`tests/` fuera de alcance) |
| 2 | header | `2328:4508` — 1448×520, fondo `--color-surface-muted` | `images` `ratio=4:3` (`2328:4501`, 438×328, relleno `--color-surface-strong`) | — |
| 3 | sección-ejes | `2328:4509` — 1448×737, fondo `--color-surface-alt` | `images` `ratio=1:1` (`2329:4515`, 439×439, relleno `--color-surface-muted`) | — |
| 4 | sección-materialismo | `2330:4593` — 1448×938, fondo `--color-surface` | `images` `ratio=1:1` (`2329:4519`, 320×320, relleno `--color-surface-muted`) | — |
| 5 | sección-puntos | `2330:4683` — 1448×6745, fondo `--color-surface-alt` | `buttons` («Únete a Vanguardia Colombiana», `2334:998`) | — |
| 6 | Footer | `2338:2640` — 1448×405, fondo `--color-surface-dark` | `icons/logo-02`, `icons/facebook`, `icons/instagram`, `icons/youtube`, `icons/x`, `icons/tik-tok` | — |

Alturas apiladas (gap 0): header **520** · sección-ejes **737** ·
sección-materialismo **938** · sección-puntos **6745** · footer **405**; el nav
(125) se superpone arriba.

Detalle de componentes extraídos en este ticket:
[components/images](../../specs/components/images.md),
[components/buttons](../../specs/components/buttons.md),
[components/footer](../../specs/components/footer.md).

## Detalle por sección

### 2 — `header` (`2328:4508`)

1448×520, fondo `--color-surface-muted`, dos columnas dentro del contenedor:

- `components/images` `2328:4501` — `ratio=4:3`, 438×328, relleno
  `--color-surface-strong`.
- `header-texto` `2328:4507` (914×280):
  - `2328:4504` «Nuestro Programa» — Bold 52/58.24 (`--font-size-l-h1-xxl`),
    `--color-text-primary`.
  - `2328:4505` párrafo — Medium **22/33** (`--font-size-body-l`),
    `--color-text-secondary`.

### 3 — `sección-ejes` (`2328:4509`)

1448×737, fondo `--color-surface-alt`, dos columnas:

- `header-texto` `2328:4511` (674×545):
  - `2328:4512` «Los ejes de nuestro programa» — Bold 36.49/40.87
    (`--font-size-l-h1`).
  - `2328:4513` párrafo — Medium 20.2/30.3 (`--font-size-body-m`).
- `components/images` `2329:4515` — `ratio=1:1`, 439×439, relleno
  `--color-surface-muted`.

### 4 — `sección-materialismo` (`2330:4593`)

1448×938, fondo `--color-surface`:

- `Frame 7` `2329:4524` (1448×320): `components/images` `2329:4519` (`ratio=1:1`,
  320×320) + `Frame 6` `2329:4523` (798×155) con `2329:4518` «Materialismo
  político» — Bold 36.49/40.87 (`--font-size-l-h1`) y su párrafo
  (`--font-size-body-m`).
- `Frame 8` `2330:4579` (912×378): 3 párrafos Medium 20.2/30.3
  (`--font-size-body-m`), `--color-text-secondary` (`2329:4525`, `2330:4568`,
  `2330:4569`).

### 5 — `sección-puntos` (`2330:4683`)

1448×6745, fondo `--color-surface-alt`. Dos columnas:

- Índice lateral `2334:997` — **un solo `TEXT`** (322×641) con los 10 títulos de
  los puntos, Bold **18/27** (`--font-size-l-h6`), `--color-text-primary`.
- `puntos` `2334:996` (794 de ancho):
  - `2330:4592` «Puntos programáticos» — Bold 36.49/40.87 (`--font-size-l-h1`).
  - `Frame 9` `2334:1004` (794×6396) — los 10 bloques de puntos (títulos Bold
    28.8/32.26 `--font-size-l-h3` + párrafos `--font-size-body-m`). El texto
    completo es contenido de la página, no de un componente.
  - `components/buttons` `2334:998` — 361×52 (`size=m`), relleno
    `--color-text-secondary`, etiqueta «Únete a Vanguardia Colombiana» →
    `Únete` (`2335:1229`).

## Comportamiento registrado

Solo `nav`, `footer` y el botón de `sección-puntos`; el resto del cuerpo no tiene
interacciones. Registro completo y destinos en
[interactions.md](../../specs/interactions.md).

- `components/buttons` `2334:998` → NAVIGATE `Únete` (`2335:1229`), sin transición.
- `nav`: `logo` → `inicio` (`110:2277`); enlaces → `Programa` (**sin
  `destinationId`**: enlace a la propia pantalla), `Decálogo` (`2334:1005`),
  `Únete` (`2335:1229`) y `https://lamateriaprima.org/`; `platforms` → URLs externas.
- `footer`: `logo-02` → `inicio`; enlaces → `inicio`, `Programa` (sin destino),
  `Decálogo`, `Únete`, `Pólitica de privacidad` (`2335:1533`) y
  `La Materia Prima` (URL externa); `platforms` → URLs externas.
- Transición por defecto del prototipo: `DISSOLVE`, `EASE_OUT`, 0.3 s.

**Observación registrada (no corregida):** en el `footer` de esta pantalla el icono
`icons/youtube` apunta a `https://www.instagram.com/vanguardiacol` (mismo destino que
el de Instagram); en el `nav` sí apunta a YouTube. Mismo fallo que en
[inicio](./inicio.md) y [Únete](./unete.md).

## Diferencias por breakpoint

### `xs` (375) — frame `2396:104`, 375×20213 (leído el 2026-10-04)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2396:105` | **80** | 125 → 80; logo 96 → 48; padding 32 → 16 |
| 1 | `header` | `2396:2399` | 1106 | padding **64** (96); **apilado**: `components/images` 343×257 (4:3) arriba, `header-texto` debajo (gap **32**); h1 **46.1** (52); párrafo **22/33** (igual, `--font-size-body-l`); gap h1→párrafo **24** |
| 2 | `sección-ejes` | `2396:2416` | 1583 | padding **64** (96); **apilado**: imagen 1:1 **337×337** arriba, texto debajo (gap **32**); h2 **32.4** (36.49); párrafo 20.2 |
| 3 | `sección-materialismo` | `2396:2423` | 1811 | padding **64** (96); **apilado**: imagen 1:1 **341×341** → (`Frame 6` con h2 + entradilla, gap **24**) → (`Frame 8` con 3 párrafos, gap **24**); gaps entre bloques **32** |
| 4 | `sección-puntos` | `2396:2435` | 14941 | padding **64** (96); título «Puntos programáticos» **32.4** (36.49); **sin índice lateral** (`.page-index` no existe en `xs`); gap título→puntos **32**; **9 puntos** con h3 **25.6** (28.8) y párrafo 20.2 (gap interno **24**), gap entre puntos **32**; CTA «Únete a Vanguardia Colombiana» con gap **32** |
| 5 | `footer` | `2396:2474` | 714 | igual que el de [inicio](./inicio.md) (padding 64, enlaces apilados) |

Contenedor: 343 (padding 16). El índice lateral de 1448 (322px) **se oculta** en `xs`.

### `sm` (768) — frame `2408:1816`, 768×10143 (leído el 2026-10-05)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2408:1817` | **75** | 125 → 75; logo 48; sin enlaces de texto (solo plataformas + hamburguesa) |
| 1 | `header` | `2408:1986` | 1031 | padding **64** (96); **apilado**: `components/images` **720×539** (4:3) arriba, `header-texto` **720×340** debajo (gap **24**); h1 **46.1** (52); párrafo **22/33** igual; gap h1→párrafo **24** |
| 2 | `sección-ejes` | `2408:1993` | 668 | padding **64** (96); **solo texto**: `header-texto` 720×540 (la `components/images` 1:1 de 350×350 **no aparece en el render exportado**, nodo oculto); h2 **32.4**; párrafo 20.2 |
| 3 | `sección-materialismo` | `2408:2000` | 808 | padding **64** (96); `Frame 7` (768×150) = h2 «Materialismo político» **32.4** + entradilla 720×90, con la imagen 1:1 **341×341 oculta en el render**; gap `Frame 7`→`Frame 8` **32**; `Frame 8` 720×498 con 3 párrafos **20.2** con viñeta (gap **24** entre ellos) |
| 4 | `sección-puntos` | `2408:2012` | 771×7147 | padding **64** (96); `puntos` **723 de ancho** (1 columna); título «Puntos programáticos» **32.4**; **sin índice lateral**; **9 puntos** con h3 **25.6** y párrafo 20.2; CTA «Únete a Vanguardia Colombiana» **361×52** (`2408:2043`) |
| 5 | `footer` | `2408:2051` | **405** | igual que el de [inicio](./inicio.md) a 768. **Se ignora `2408:1858`**: es el segundo `footer` que Figma declara solapado con `sección-puntos` (residuo de diseño, decisión 10 del plan) |

Contenedor: **720** (padding lateral 24). El índice lateral de 1448 (322px) **no
aparece** en `sm`, igual que en `xs`.
