# Página: Decálogo

---
fuente: Figma — página `1448-lg`, frame `Decálogo` (`2334:1005`); página `1024-sm`, frame `2408:2098` (leído el 2026-10-05)
extraido: 2026-10-03 (sm: 2026-10-05)
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_nodes_info`, `get_reactions`)
---

Frame: `2334:1005` — 1448×8897, fondo `--color-surface`. Contenido 1384 (padding
lateral 32). Ritmo vertical del sitio: [layout.md](../layout.md).

## Secciones (en orden)

| # | Sección | Nodo | Componentes usados | Baseline |
| --- | --- | --- | --- | --- |
| 1 | Header / nav | `2338:2320` (instancia `components/nav`, declarada la última pero colocada arriba, `y=-27` = origen del frame) | `nav` | `tests/visual/baseline/decalogo-1448.png` — PENDIENTE (`tests/` fuera de alcance) |
| 2 | header | `2335:1221` — 1448×600, fondo `--color-surface-muted` | `images` `ratio=4:3` (`2335:1222`, 438×328, relleno `--color-surface-strong`) | — |
| 3 | sección-puntos | `2334:1027` — 1448×7764, fondo `--color-surface` | `buttons` («Únete a Vanguardia Colombiana», `2334:1059`) | — |
| 4 | Footer | `2338:2693` — 1448×405, fondo `--color-surface-dark` | `icons/logo-02`, `icons/facebook`, `icons/instagram`, `icons/youtube`, `icons/x`, `icons/tik-tok` | — |

Alturas apiladas (gap 0): header **600** · sección-puntos **7764** · footer **405**;
el nav (125) se superpone arriba.

**Nota:** la página tiene además un frame suelto `encabezado-decálogo` (`2334:1154`)
fuera del frame de la pantalla — no es una sección de esta vista; se revisa en la
implementación por si es la fuente del header.

Detalle de componentes extraídos en este ticket:
[components/images](../components/images.md),
[components/buttons](../components/buttons.md),
[components/footer](../components/footer.md).

## Detalle por sección

### 2 — `header` (`2335:1221`)

1448×600, fondo `--color-surface-muted`, dos columnas dentro del contenedor:

- `components/images` `2335:1222` — `ratio=4:3`, 438×328, relleno
  `--color-surface-strong`.
- `header-texto` `2335:1223` (788×408):
  - `2335:1224` «Decálogo Político de las Vanguardias Iberófonas Socialistas» —
    Bold 52/58.24 (`--font-size-l-h1-xxl`), `--color-text-primary` (3 líneas).
  - `2335:1225` párrafo — Medium 20.2/30.3 (`--font-size-body-m`),
    `--color-text-secondary`.

### 3 — `sección-puntos` (`2334:1027`)

1448×7764, fondo `--color-surface`. Dos columnas:

- Índice lateral `2334:1028` — **un solo `TEXT`** (322×522) con los 10 puntos
  numerados («1. La forma de organización…» … «10. Buscamos»), Bold **18/27**
  (`--font-size-l-h6`), `--color-text-primary`.
- `puntos` `2334:1029` (794 de ancho):
  - `Frame 9` `2334:1031` (794×7488) — los 10 puntos (encabezados Bold 28.8/32.26
    `--font-size-l-h3` + listas y párrafos `--font-size-body-m`). Contenido de la
    página, no de un componente. No hay título de sección tipo `h1` dentro de
    `sección-puntos` (a diferencia de `Programa`).
  - `components/buttons` `2334:1059` — 361×52 (`size=m`), relleno
    `--color-text-secondary`, etiqueta «Únete a Vanguardia Colombiana» →
    `Únete` (`2335:1229`).

## Comportamiento registrado

Solo `nav`, `footer` y el botón de `sección-puntos`; el resto del cuerpo no tiene
interacciones. Registro completo y destinos en
[interactions.md](../interactions.md).

- `components/buttons` `2334:1059` → NAVIGATE `Únete` (`2335:1229`), sin transición.
- `nav`: `logo` → `inicio` (`110:2277`); enlaces → `Programa` (`2328:4307`),
  `Decálogo` (**sin `destinationId`**: enlace a la propia pantalla), `Únete`
  (`2335:1229`) y `https://lamateriaprima.org/`; `platforms` → URLs externas.
- `footer`: `logo-02` → `inicio`; enlaces → `inicio`, `Programa`,
  `Decálogo` (sin destino), `Únete`, `Pólitica de privacidad` (`2335:1533`) y
  `La Materia Prima` (URL externa); `platforms` → URLs externas.
- Transición por defecto del prototipo: `DISSOLVE`, `EASE_OUT`, 0.3 s.

**Observación registrada (no corregida):** en el `footer` de esta pantalla el icono
`icons/youtube` apunta a `https://www.instagram.com/vanguardiacol` (mismo destino que
el de Instagram); en el `nav` sí apunta a YouTube. Mismo fallo que en
[inicio](./inicio.md) y [Únete](./unete.md).

## Diferencias por breakpoint

### `xs` (375) — frame `2396:2521`, 375×19377 (leído el 2026-10-04)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2396:2522` | **80** | 125 → 80; logo 96 → 48; padding 32 → 16 |
| 1 | `header` | `2396:2523` | 1358 | padding **64** (96); **apilado**: `components/images` 343×257 (4:3) arriba, `header-texto` debajo (gap **32**); h1 **52/58.24 sin cambio** (excepción: no baja a 46.1); párrafo **22/33** (en 1448 está a 20.2 → **sube**); gap h1→párrafo **24** |
| 2 | `sección-puntos` | `2396:2543` | 17225 | padding **64** (96); **sin índice lateral** y **sin título de sección** (igual que en lg); **10 puntos** con h3 **25.6** (28.8) y párrafos 20.2 (gap interno **24**), gap entre puntos **32**; CTA con gap **32** |
| 3 | `footer` | `2396:2575` | 714 | igual que el de [inicio](./inicio.md) |

Contenedor: 343 (padding 16). El índice lateral de 1448 (322px) **se oculta** en `xs`.

### `sm` (768) — frame `2408:2098`, 768×10002 (leído el 2026-10-05)

| # | Sección | Nodo | Alto | Cambio respecto a 1448 |
| --- | --- | --- | --- | --- |
| 0 | `components/nav` | `2424:2007` | **75** | 125 → 75; logo 48; sin enlaces de texto (solo plataformas + hamburguesa) |
| 1 | `header` | `2408:2118` | 1168 | padding **64** (96); **apilado**: `components/images` **720×539** (4:3) arriba, `header-texto` **720×477** debajo (gap **24**); h1 **46.1** — **baja de 52** (a 375 se mantiene 52); párrafo **22/33**; gap h1→párrafo **24** |
| 2 | `sección-puntos` | `2408:2274` | 8354 | padding **64** (96); `puntos` **720 de ancho** (1 columna); **sin índice lateral** y **sin título de sección** (igual que en lg y xs); **10 puntos** con h3 **25.6** y párrafos 20.2; CTA «Únete a Vanguardia Colombiana» **361×52** (`2408:2307`) |
| 3 | `footer` | `2408:2170` | **405** | igual que el de [inicio](./inicio.md) a 768. **Se ignora `2408:2100`**: segundo `footer` residuo solapado (decisión 10 del plan) |

Contenedor: **720** (padding lateral 24). El índice lateral de 1448 (322px) **no
aparece** en `sm`, igual que en `xs`.
