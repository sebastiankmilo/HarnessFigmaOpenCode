# Página: Política de privacidad

---
fuente: Figma — página `1448-lg`, frame `Política de privacidad` (`2335:1533`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_document_info`, `get_nodes_info`, `get_reactions`)
---

Frame: `2335:1533` — 1448×1836, fondo `--color-surface`. Contenido 1384 (padding
lateral 32). Ritmo vertical del sitio: [layout.md](../../specs/layout.md).

**No tiene frame `header` propio**: el nav se superpone sobre `sección-puntos`
(mismo caso que en [inicio](./inicio.md)).

## Secciones (en orden)

| # | Sección | Nodo | Componentes usados | Baseline |
| --- | --- | --- | --- | --- |
| 1 | Header / nav | `2338:2512` (instancia `components/nav`, declarada la última pero colocada arriba, `y=-27` = origen del frame) | `nav` | `tests/visual/baseline/politica-de-privacidad-1448.png` — PENDIENTE (`tests/` fuera de alcance) |
| 2 | sección-puntos | `2335:1540` — 1448×1304, fondo `--color-surface` | `buttons` («Volver al inicio», `2335:1574`) | — |
| 3 | Footer | `2338:2799` — 1448×405, fondo `--color-surface-dark` | `icons/logo-02`, `icons/facebook`, `icons/instagram`, `icons/youtube`, `icons/x`, `icons/tik-tok` | — |

Alturas apiladas (gap 0): sección-puntos **1304** · footer **405**; el nav (125)
se superpone arriba.

Detalle de componentes extraídos en este ticket:
[components/buttons](../../specs/components/buttons.md),
[components/footer](../../specs/components/footer.md).

## Detalle por sección

### 2 — `sección-puntos` (`2335:1540`)

1448×1304, fondo `--color-surface`, contenido de 910 de ancho:

- `2335:1667` «Política de privacidad» — Bold 32.4/36.29 (`--font-size-l-h2`),
  `--color-text-primary`.
- `puntos` `2335:1542` (910×1044):
  - `Frame 9` `2335:1543` (910×960) — el texto legal: `2335:1546` «Esta página web
    es propiedad de Asociación cultural Vanguardia Colombiana…» — Medium 20.2/30.3
    (`--font-size-body-m`), `--color-text-secondary`. Contenido de la página, no de
    un componente.
  - `components/buttons` `2335:1574` — 187×52 (`size=m`), relleno
    `--color-text-secondary`, etiqueta «Volver al inicio» (Bold 20.2/30.3).

## Comportamiento registrado

Solo `nav` y `footer`; el cuerpo de la pantalla no tiene interacciones. Registro
completo y destinos en [interactions.md](../../specs/interactions.md).

- `nav`: `logo` → `inicio` (`110:2277`); enlaces → `Programa` (`2328:4307`),
  `Decálogo` (`2334:1005`), `Únete` (`2335:1229`) y `https://lamateriaprima.org/`;
  `platforms` → URLs externas.
- `footer`: `logo-02` → `inicio`; enlaces → `inicio`, `Programa`, `Decálogo`,
  `Únete`, `Pólitica de privacidad` (**sin `destinationId`**: enlace a la propia
  pantalla) y `La Materia Prima` (URL externa); `platforms` → URLs externas.
- Transición por defecto del prototipo: `DISSOLVE`, `EASE_OUT`, 0.3 s.

**`PENDIENTE-FIGMA` — botón «Volver al inicio» (`2335:1574`):** `get_reactions`
sobre `sección-puntos` (`2335:1540`) devuelve **0 reacciones**; el prototipo no le
define destino. No se le asigna navegación hasta que el diseño la especifique.

**Observación registrada (no corregida):** en el `footer` de esta pantalla el icono
`icons/youtube` apunta a `https://www.instagram.com/vanguardiacol` (mismo destino que
el de Instagram); en el `nav` sí apunta a YouTube. Mismo fallo que en
[inicio](./inicio.md) y [Únete](./unete.md).

## Diferencias por breakpoint

**PENDIENTE de confirmación con el diseño**: el archivo no tiene la versión
móvil/tablet de `Política de privacidad`; `375-xs` y `1024-sm` solo contienen guías
de estilos ([breakpoints.md](../../specs/breakpoints.md)).
