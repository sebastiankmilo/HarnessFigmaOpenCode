# Componente: `nav`

---
fuente: Figma — página `components`, nodo `36:720` (`COMPONENT_SET`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`)
---

## Anatomía

`size=lg` (`111:5222`, la variante usada en `inicio`):

1. Contenedor de barra (1448×125, fondo `--color-surface-alt`).
2. `logo` → instancia `icons/logo` (96×96), centrada verticalmente (14.5 libres
   arriba y abajo), padding lateral **32**.
3. `right-nav`, con 3 bloques y **gap 28** entre ellos:
   - `links` → 4 × `link` (83/83/83/86 de ancho, **gap 24**): texto Bold 18/27
     `--color-text-primary` + `Line` de subrayado en el borde inferior del enlace
     (83–86×0, `--color-text-primary` en el activo, `--color-surface` en el resto).
   - `buttons` → 2 × `components/buttons` (relleno `--color-text-primary` y outline
     `--color-text-secondary`), **gap 16**, size=s (79×40 y 103×40).
   - `platforms, search and toggle` → `platforms` 5 × icono 24×24 (**gap 16**) y
     `search and toggle` 2 × icono 24×24 (**gap 16**), separados 16.

## Variantes y estados

Propiedades del set: `size` (xs | sm | lg) y `status` (open-modal, solo en xs).

| Estado | Variante Figma | Nodo | Medida | Notas |
| --- | --- | --- | --- | --- |
| default móvil | `size=xs` | `36:719` | 375×64 | padding **16**; logo 32×32; `platforms` 3×24 (gap 16); `search and toggle` 2×24 (gap 16); **sin enlaces de texto**; gap entre bloques 32 |
| menú abierto | `size=xs, status=open-modal` | `38:1012` | 375×812 | fondo `--color-surface-alt`; `icons/close` 32×32 arriba-derecha (padding 16); `nav-content` 343×417 centrado con logo 64×64, `links` 87×153, `platforms` 144×32 y `buttons` 343×40 |
| default tablet | `size=sm` | `101:3316` | **768**×64 | padding **16**; logo 32×32; `right-nav` con **3 enlaces** (gap 16) + `platforms` 104 + `search and toggle` 64 (gap 28); sin botones |
| default desktop | `size=lg` | `111:5222` | 1448×125 | padding **32**; logo 96×96; **4 enlaces** + 2 botones + 5 plataformas + búsqueda/hamburguesa |

- Existen **solo** estas 4 variantes: no hay variantes `hover`, `focus`, `active`,
  `disabled` ni `current-page` en Figma. PENDIENTE de especificación de diseño:
  sin ella, el agente no construye esos estados.
- Estado operativo observado: en `inicio` el enlace 1 muestra el subrayado
  `--color-text-primary` y los demás `--color-surface` (subrayado oculto sobre el
  fondo), es decir, un "enlace activo" implícito. En `Programa` el enlace 1 y en
  `Decálogo` el enlace 2 apuntan a **`destinationId: null`** (la pantalla actual);
  `Política de privacidad` no está en el nav, así que sus 4 enlaces tienen destino.
- Baseline: `tests/visual/baseline/nav-default.png` — PENDIENTE
  (`tests/` fuera de alcance del plan).

## Medidas y tokens

- Fondo: `--color-surface-alt`.
- Padding lateral: `--space-3` (16) en xs/sm, `--space-5` (32) en lg.
- Gap entre bloques de `right-nav`: 28 (medido, fuera de la escala `--space-*`;
  registrar tal cual).
- Gap de enlaces: `--space-4` (24) en lg, 16 en sm.
- Gap de botones y de iconos: `--space-3` (16).
- Tipografía de enlaces: `links/base` → `--font-size-body-base` + `--font-weight-bold`.
- Sin `border-radius` (`--radius-none`).

## Comportamiento

Ver [interactions.md](../interactions.md). Registrado con `get_reactions`:

| Origen | Trigger | Destino |
| --- | --- | --- |
| `logo` | click | `inicio` (`110:2277`) — NAVIGATE, DISSOLVE 0.3s |
| enlace 1 | click | `Programa` (`2328:4307`) |
| enlace 2 | click | `Decálogo` (`2334:1005`) |
| enlace 3 | click | `Únete` (`2335:1229`) |
| enlace 4 | click | URL externa `https://lamateriaprima.org/` |
| iconos de `platforms` | click | URL externa (Facebook, Instagram, YouTube, X, TikTok) |
| hamburguesa (`icons/hamburger-two`) | — | **sin reacción registrada**; el estado `open-modal` existe como variante pero el prototipo no expone su conexión |

## Accesibilidad

- Enlaces y texto sobre `--color-surface-alt`: 20.12:1 (`--color-text-primary`).
- Foco visible: **no especificado en Figma** — PENDIENTE de diseño
  (obligatorio en `AGENTS.md`).
- El menú móvil es un modal a pantalla completa (`status=open-modal`): requiere
  cierre por `icons/close` y, al abrir, foco atrapado y restauración al cerrar —
  comportamiento no documentado en el prototipo.

## Instancias en `375-xs` (leídas el 2026-10-04)

Las 7 pantallas usan una instancia de `components/nav` de **375×80** (la variante
`size=xs` mide 64): la medida de la instancia manda sobre la de la variante.

- Relleno `--color-surface-alt`, padding lateral **16**, `icons/logo` **48×48**
  centrado verticalmente ((80−48)/2 = 16).
- Bloque derecho a `xs`: **solo se renderiza `icons/hamburger-two` (24×24)**, a
  **16** del borde derecho y centrado verticalmente ((80−24)/2 = 28).
  **Relectura `2026-10-04` con `export_node_as_image` sobre `2392:2395` (PNG @2x)**:
  en la instancia, `platforms` (104×24), `icons/search` y la hamburguesa comparten
  la misma coordenada (`x=335` relativa al frame) y `xiao-hong-shu`/`wechat` caen
  **fuera** del frame de 375; el export devuelve **únicamente la hamburguesa** (las
  capas debajo no se ven). **Decisión**: la barra `xs` implementa **logo +
  hamburguesa**; las plataformas viven en el overlay del menú (6) y en `lg` siguen
  siendo las 5 de escritorio. La nota anterior («se mantiene el contenido de la
  variante `xs`») queda **superada por esta relectura**.

### Overlay del menú abierto — frame `2396:2902` (375×812)

Instancia `2396:3288`, relleno `--color-surface-alt`:

| Elemento | Nodo | Medida / valor |
| --- | --- | --- |
| `icons/close` | `I2396:3288;38:1068` | **32×32**, esquina superior derecha (padding **16**) |
| `nav-content` | `I2396:3288;38:1048` | **343×591**, centrado (110.5 libres arriba y abajo) |
| `icons/logo` | `I2396:3288;38:1049` | **64×64**, centrado |
| `links` | `I2396:3288;38:1051` | **5 enlaces**, `link-nav` de alto **35** (texto 27 + subrayado 1 px a 8), gap **24** (paso 59), Bold 18/27. **Centrados uno a uno**: el frame mide 191 de ancho (el de «Política de privacidad») y cada `link-nav` arranca en una `x` distinta con el mismo centro (1449.5) |
| `buttons` | `I2396:3288;38:1065` | **Solo «Aporta» 87×40** (relleno `#000000`, etiqueta Bold 16/24 blanca, centrado en el frame de 343). El segundo nodo (`38:1067`, outline 103×40 con `strokes #000000` y **sin contenido visible**) **no aparece en el export** → no se implementa, mismo criterio que el outline de la barra `lg` |
| `platforms` | `I2396:3288;38:1061` | **5 iconos 32×32 visibles**: fila 1 (facebook, instagram, youtube) e fila 2 (**x, tik-tok**, como par de 88 centrado en la caja de 145), gap **24**, caja **145×88**. El nodo `icons/wechat` existe (x 1489) pero está **oculto**: `scan_nodes_by_types` no lo devuelve y el export no lo pinta (misma evidencia que la barra, cuyos `platforms`/`search` tampoco se devuelven) → **no se implementa** |

Gaps dentro de `nav-content`: logo→links **64** · links→buttons **32** ·
buttons→platforms **32**. Enlaces, en orden: Programa · Decálogo · Únete ·
La Materia Prima · Política de privacidad.

El overlay con **5 enlaces centrados, botón «Aporta» único y 5 plataformas en 2
filas** es el que implementan los 5 HTML (relectura del render `2026-10-04`,
decisión 8 del plan — el diseño renderizado es la fuente de verdad).
