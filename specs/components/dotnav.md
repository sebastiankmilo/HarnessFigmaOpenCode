# Componente: `dotnav`

---
fuente: Figma — página `components`, nodo `114:6780` (`COMPONENT`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_node_info`, `export_node_as_image`)
---

Indicadores de paginación de la fila de «Nuestros objetivos» en
[inicio](../pages/inicio.md). Componente simple, **no es set de variantes**.

## Anatomía

1. Contenedor 80×8, sin relleno ni `border-radius`.
2. Cuatro `ELLIPSE` de **8×8** con gap **16** (posición `x`: 0, 24, 48, 72).

## Variantes y estados

| Estado | Dónde | Activo | Inactivos |
| --- | --- | --- | --- |
| default (componente `114:6780`) | sobre `--color-media-placeholder` (`#ebebeb`) | `#858585` (`--neutral-60`, 1.er punto) | `#ffffff` ×3 |
| instancia `2326:4033` en `inicio` | sobre `--color-surface` (`#ffffff`) | `#5c5c5c` (`--neutral-80`) | `#d6d6d6` (`--color-border-soft`) ×3 |
| hover / focus / disabled | **no existe en Figma** | — | PENDIENTE de especificación de diseño |

- No hay más estados ni más variantes (no existe `size` ni número de puntos variable).
- Baseline: `tests/visual/baseline/dotnav-default.png` — PENDIENTE (`tests/` fuera de
  alcance).

## Medidas y tokens

- Puntos: 8×8, gap 16 (`--space-3`).
- Colores: [tokens.md](../tokens.md). En `tokens.css` el primer punto se rige por
  `--color-dot-inactive` (`#858585`) — **ojo: el nombre del token habla de
  "inactive" pero el valor es el del punto activo del componente**; en la instancia de
  `inicio` el activo es `--neutral-80` y los inactivos `--color-border-soft`.

## Comportamiento

**Sin reacciones registradas en el prototipo**: `get_reactions` sobre
`2326:4033` (junto con `icons/prev` `2326:4023` e `icons/next` `2326:4026`) no
devuelve ninguna. **PENDIENTE de especificación de diseño** — los puntos se dibujan
pero no se les asigna comportamiento (punto 0.1.5 del plan).

## Accesibilidad

| Par | Ratio | Veredicto |
| --- | --- | --- |
| `#5c5c5c` sobre `#ffffff` (activo en `inicio`) | 6.69 | AA |
| `#d6d6d6` sobre `#ffffff` (inactivos en `inicio`) | **1.45** | **No cumple** — los indicadores son el único indicador de posición |
| `#858585` sobre `#ebebeb` (activo por defecto) | 3.10 | Solo alcanza el mínimo de UI (3:1) |
| `#ffffff` sobre `#ebebeb` (inactivos por defecto) | **1.19** | **No cumple** |

Detalle y gravedad en [accessibility.md](../accessibility.md).
Foco visible: **no especificado en Figma** — PENDIENTE (obligatorio en
[AGENTS.md](../../../../AGENTS.md)).
