---
fuente: Figma — página `components-diseño` (`10:215`), componente `components/dotnav` (`114:6780`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types, get_node_info`)
---

# Componente: `dotnav`

Componente simple `114:6780` (**no** es `COMPONENT_SET`).

## Anatomía

| # | Nodo | Tamaño | Relleno |
| --- | --- | --- | --- |
| 1 | `Ellipse 32` `114:6775` | 8×8 | `#858585` |
| 2 | `Ellipse 33` `114:6776` | 8×8 | `#ffffff` |
| 3 | `Ellipse 34` `114:6777` | 8×8 | `#ffffff` |
| 4 | `Ellipse 35` `2326:4037` | 8×8 | `#ffffff` |

Total **80×8**: 4×8 de diámetro + 3 huecos → **gap 16**.

## Variantes y estados

**No tiene `COMPONENT_SET` ni variantes**: el estado activo/inactivo está
expresado por el **relleno de cada elipse** dentro de la misma instancia. En el
maestro, el primer punto es `#858585` y los otros tres `#ffffff`.

## Medidas y tokens

| Rol | Token | Valor |
| --- | --- | --- |
| Punto (wireframe) | `--color-dot-inactive` | `#858585` |
| Punto activo (diseño definitivo) | `--color-dot-active` | `#65543a` |
| Puntos inactivos (diseño definitivo) | `--color-dot-inactive-new` | `#d7d2ca` |
| Radio | `--radius-circle` | 50% |

## Comportamiento

`get_reactions` **no registra** acciones sobre `components/dotnav` en
`1448-lg`: no navega ni cambia de estado en el prototipo.

## Dónde aparece

Una sola instancia en todo `1448-lg`: dentro de `inicio › seccion-objetivos`.
Las instancias de `hovers` (`Frame 1` `4518:2274`, `Frame 2` `4518:2287`)
acompañan a `icons/prev`/`icons/next` del carrusel de tarjetas.

## Baseline

No tiene par propio en `pairs.manifest.json`.
