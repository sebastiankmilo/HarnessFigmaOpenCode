# Componente: `footer`

---
fuente: Figma — página `1448-lg`, frames `footer` `2328:4305` (en `inicio`),
`2338:2746` (en `Únete`), `2338:2640` (en `Programa`), `2338:2693` (en `Decálogo`) y
`2338:2799` (en `Política de privacidad`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `get_reactions`, `export_node_as_image`)
---

**No existe como componente en la página `components`**: es un frame idéntico
repetido en cada pantalla. Se documenta aquí como pieza compartida
([plan, punto Fase 4](../../docs/tickets/1-flujo-desarrollo-con-figma/planes/plan-vista-inicio-unete.md)).

## Anatomía

Frame 1448×405, relleno `--color-surface-dark` (`#333333`), padding vertical **64**:

1. `icons/logo-02` — 128×128, **centrado** horizontalmente, `padding-top` **64**.
2. `footer-nav` — 1384×117, `pL=32` (contenedor), `pT=224` desde el borde del footer:
   - `platforms` — 184×24, **centrado**: 5 × icono 24×24 con gap **16**
     (`facebook`, `instagram`, `youtube`, `x`, `tik-tok`).
   - `Frame 5` — fila de enlaces 1384×24, `pT=48` bajo `platforms`, **centrada**:
     gap **24** entre enlaces, Bold 16/24 (`--font-size-body-s`), `--color-on-dark`.
     Texto, en orden: `Inicio` · `Programa` · `Decálogo` · `Únete` ·
     `La Materia Prima` · `Aporta` · `Pólitica de privacidad`.
   - Copyright — `pT=48` bajo la fila de enlaces (1384×21): « © 2026 Vanguardia
     Colombiana. Todos los derechos reservados. » — Medium 14.2/21.3
     (`--font-size-body-xs`), `--color-on-dark`.

## Variantes y estados

Un único aspecto (no hay variantes ni estados en Figma): el mismo footer aparece en
las cinco pantallas de `1448-lg` (`inicio`, `Únete`, `Programa`, `Decálogo`,
`Política de privacidad`) con textos idénticos. **No hay enlace activo ni
subrayado** en el footer de ninguna pantalla. Destinos: el enlace de la pantalla
actual apunta a **`destinationId: null`** en su propio footer (`Únete` en el footer
de `Únete`, `Programa` en el de `Programa`, `Decálogo` en el de `Decálogo`,
`Pólitica de privacidad` en el de `Política de privacidad`).

Baseline: `tests/visual/baseline/footer-1448.png` — PENDIENTE (`tests/` fuera de
alcance).

## Medidas y tokens

| Propiedad | Valor | Token |
| --- | --- | --- |
| Fondo | `#333333` | `--color-surface-dark` |
| Texto y enlaces | `#ffffff` | `--color-on-dark` |
| Separación de filas | 48 | `--space-6` |
| Gap de enlaces | 24 | `--space-4` |
| Gap de iconos | 16 | `--space-3` |
| Padding vertical | 64 | `--space-7` |

## Comportamiento

`get_reactions` (24 nodos con reacción en `Únete`, repartidos entre `nav` y footer):

| Origen | Destino |
| --- | --- |
| `icons/logo-02` | `inicio` (`110:2277`) — NAVIGATE, `DISSOLVE` 0.3s |
| enlace `Inicio` | `inicio` (`110:2277`) |
| enlace `Programa` | `Programa` (`2328:4307`) |
| enlace `Decálogo` | `Decálogo` (`2334:1005`) |
| enlace `Únete` | **`destinationId: null`** (enlace a la pantalla actual cuando el footer está en `Únete`) |
| enlace `La Materia Prima` | URL externa `https://lamateriaprima.org/` |
| enlace `Pólitica de privacidad` | `Política de privacidad` (`2335:1533`) |
| enlace `Aporta` | **sin reacción registrada** — PENDIENTE |
| `platforms` ×5 | URLs externas (Facebook, Instagram, YouTube, X, TikTok) |

**Inconsistencia registrada (no corregida):** en ambos footers el icono `youtube`
apunta a `https://www.instagram.com/vanguardiacol` (mismo destino que el de
Instagram); en el `nav` sí apunta a `https://www.youtube.com/@VanguardiaColombiana`.

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| `--color-on-dark` sobre `--color-surface-dark` | 12.63 | AA |

- Los iconos sociales navegan a URLs externas: deben exponerse como **enlaces con
  nombre accesible** (`aria-label="Facebook"`, etc.), no como botones mudos
  ([accessibility.md](../accessibility.md)).
- Foco visible: **no especificado en Figma** — PENDIENTE (obligatorio en
  [AGENTS.md](../../AGENTS.md)).

## Instancias en `375-xs` (leídas el 2026-10-04)

Footer **375×714** idéntico en las cinco pantallas (`2395:4123`, `2396:2719`,
`2396:2474`, `2396:2575`, `2396:2829`): relleno `--color-surface-dark`,
padding vertical **64**.

1. `icons/logo-02` **128×128** centrado, `padding-top` **64**.
2. `footer-nav` **343×426** (padding lateral **16**), gap **32** bajo el logo:
   - `platforms` **184×24** centrada: 5 × icono 24×24 con gap **16**.
   - gap **24** → **7 enlaces apilados y centrados** (paso **48** = gap **24**
     entre líneas de 24 px), Bold 16/24, mismo orden y destinos que en `lg`.
   - gap **24** → copyright **343×42** centrado, Medium 14.2/21.3.
3. Padding inferior **64**.

## Instancias en `1024-sm` (leídas el 2026-10-05)

Footer **768×405** idéntico en las cinco pantallas (`2408:1765`, `2408:2051`,
`2408:2170`, `2408:2316`, `2421:1247`): relleno `--color-surface-dark`,
padding vertical **64**. **Mismo alto que en `lg`** (a `xs` era 714).

1. `icons/logo-02` **128×128** centrado, `padding-top` **64**.
2. `footer-nav` **704×117** (padding lateral **32**), gap **32** bajo el logo:
   - `platforms` **184×24** centrada: 5 × icono 24×24 con gap **16**.
   - gap **24** → **fila de 7 enlaces** (`Frame 5`, 704×24): Bold 16/24,
     gap **16** entre enlaces, mismo orden y destinos que en `lg`.
   - gap **24** → copyright **704×21**, Medium 14.2/21.3.
3. Padding inferior **64**.

`programa` y `decálogo` declaran **dos** footers en Figma (`2408:1858`,
`2408:2100` solapados con `sección-puntos`); solo se implementa el final
(`2408:2051`, `2408:2170`) — decisión 10 del plan.
