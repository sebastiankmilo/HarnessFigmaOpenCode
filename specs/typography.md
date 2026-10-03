# Tipografía

---
fuente: Figma — estilos locales (`get_styles`) + muestras nodo `8:19` (`375-xs`) y
`98:1630` (`1024-sm`) + uso real en `1448-lg > inicio` (`110:2277`)
extraido: 2026-10-03
file_key_copia: PENDIENTE (el MCP no expone el FILE_KEY y no está registrado en el repo)
herramienta: TalkToFigma (`get_styles`, `get_node_info`)
---

Familia única en el archivo: **DM Sans** (`--font-family-base`). Pesos: **Bold** (700)
y **Medium** (500). `get_styles` devuelve 36 estilos de texto, 0 estilos de color,
0 efectos y 4 rejillas.

Interlineado constante y verificado sobre los nodos: titulares `fontSize × 1.12`
(`--line-height-heading`), párrafos `fontSize × 1.5` (`--line-height-body`).
Letter-spacing: `0` en todos los estilos leídos. Alineación: `LEFT`.

## Escala de titulares — `l/` (desktop)

| Rol | Estilo Figma | Familia | Tamaño | Peso | Interlineado | Token |
| --- | --- | --- | --- | --- | --- | --- |
| h1 xxl | `l/headings/h1/xxl` | DM Sans | 52px | 700 | 58.24 | `--font-size-l-h1-xxl` |
| h1 xl | `l/headings/h1/xl` | DM Sans | 46.1px | 700 | 51.63 | `--font-size-l-h1-xl` |
| h1 l | `l/headings/h1/l` | DM Sans | 41px | 700 | 45.92 | `--font-size-l-h1-l` |
| h1 | `l/headings/h1` | DM Sans | 36.49px | 700 | 40.87 | `--font-size-l-h1` |
| h2 | `l/headings/h2` | DM Sans | 32.4px | 700 | 36.29 | `--font-size-l-h2` |
| h3 | `l/headings/h3` | DM Sans | 28.8px | 700 | 32.26 | `--font-size-l-h3` |
| h4 | `l/headings/h4` | DM Sans | 22.7px | 700 | 25.42 | `--font-size-l-h4` |
| h5 | `l/headings/h5` | DM Sans | 20.2px | 700 | 22.62 | `--font-size-l-h5` |
| h6 | `l/headings/h6` | DM Sans | 18px | 700 | 20.16 | `--font-size-l-h6` |

## Escala de titulares — `xs/` (móvil)

| Rol | Estilo Figma | Familia | Tamaño | Peso | Interlineado | Token |
| --- | --- | --- | --- | --- | --- | --- |
| h1 xxl | `xs/headings/h1/xxl` | DM Sans | 46.1px | 700 | 51.63 | `--font-size-xs-h1-xxl` |
| h1 xl | `xs/headings/h1/xl` | DM Sans | 41px | 700 | 45.92 | `--font-size-xs-h1-xl` |
| h1 l | `xs/headings/h1/l` | DM Sans | 36.5px | 700 | 40.88 | `--font-size-xs-h1-l` |
| h1 | `xs/headings/h1` | DM Sans | 32.4px | 700 | 36.29 | `--font-size-xs-h1` |
| h2 | `xs/headings/h2` | DM Sans | 28.8px | 700 | 32.26 | `--font-size-xs-h2` |
| h3 | `xs/headings/h3` | DM Sans | 25.6px | 700 | 28.67 | `--font-size-xs-h3` |
| h4 | `xs/headings/h4` | DM Sans | 22.7px | 700 | 25.42 | `--font-size-xs-h4` |
| h5 | `xs/headings/h5` | DM Sans | 20.2px | 700 | 22.62 | `--font-size-xs-h5` |
| h6 | `xs/headings/h6` | DM Sans | 18px | 700 | 20.16 | `--font-size-xs-h6` |

## Párrafos, negritas y links

Un solo rango de tamaños para `paragraphs/*`, `paragraphs/bold/*` y `links/*`.

| Rol | Estilos Figma | Tamaño | Peso | Interlineado | Token de tamaño |
| --- | --- | --- | --- | --- | --- |
| body xs | `paragraphs/xs`, `paragraphs/bold/xs`, `links/xs` | 14.2px | 500 / 700 / 700 | 21.3 | `--font-size-body-xs` |
| body s | `paragraphs/s`, `paragraphs/bold/s`, `links/s` | 16px | 500 / 700 / 700 | 24 | `--font-size-body-s` |
| body base | `paragraphs/base`, `paragraphs/bold/base`, `links/base` | 18px | 500 / 700 / 700 | 27 | `--font-size-body-base` |
| body m | `paragraphs/m`, `paragraphs/bold/m`, `links/m` | 20.2px | 500 / 700 / 700 | 30.3 | `--font-size-body-m` |
| body l | `paragraphs/l`, `paragraphs/bold/l`, `links/l` | 22px | 500 / 700 / 700 | 33 | `--font-size-body-l` |
| body xl | `paragraphs/xl`, `paragraphs/bold/xl`, `links/xl` | 25.6px | 500 / 700 / 700 | 38.4 | `--font-size-body-xl` |

Regla de uso: párrafo → `--font-weight-medium`; label, link, título y texto de botón
→ `--font-weight-bold`.

## Uso observado en `1448-lg` (`inicio`, `Únete`, `Objetivo-modal`)

| Rol en la página | Medida leída | Estilo Figma equivalente | Color |
| --- | --- | --- | --- |
| Título del encabezado (`Vanguardia Colombiana`) | Bold 52 / 58.24 | `l/headings/h1/xxl` | `--color-text-primary` |
| Títulos de sección (`Nuestros objetivos`, `La Materia Prima`, `Únete a Vanguardia Colombiana`) | Bold 36.49 / 40.87 | `l/headings/h1` | `--color-text-primary` |
| Título de `goal-card` | Bold 28.8 / 32.26 | `l/headings/h3` | `--color-text-primary` |
| Título de artículo (`container-and-card`) | Bold 25.6 / 28.67 | `xs/headings/h3` (25.6 no existe en la escala `l/`) | `--color-text-primary` |
| Entradilla de sección | Medium 18 / 27 | `paragraphs/base` | `--color-text-secondary` |
| Cuerpo dentro de tarjeta | Medium 16 / 24 | `paragraphs/s` | `--color-text-secondary` |
| Entradilla de `sección-únete` | Medium 20.2 / 30.3 | `paragraphs/m` | `--color-text-secondary` |
| Copyright del footer | Medium 14.2 / 21.3 | `paragraphs/xs` | `--color-on-dark` |
| Enlaces del footer | Bold 16 / 24 | `links/s` | `--color-on-dark` |
| Enlaces del nav | Bold 18 / 27 | `links/base` | `--color-text-primary` |
| Texto de botón (nav) | Bold 16 / 24 | `paragraphs/bold/s` | `--color-on-dark` / `--color-text-primary` (outline) |
| Texto de botón (`goal-card`, size=s) | Bold 16 / 24 | `paragraphs/bold/s` | `--color-on-dark` |
| Texto de botón (secciones, size=m) | Bold 20.2 / 30.3 | `paragraphs/bold/m` | `--color-on-dark` |
| Título de `Objetivo-modal` (`2358:1144`) | Bold 32.4 / 36.29 | `l/headings/h2` | `--color-text-primary` |
| Cuerpo de `Objetivo-modal` (`2358:1146`) | Medium 18 / 27 | `paragraphs/base` | `--color-text-secondary` |
| Título de la sección 6 de `inicio` y de `Únete` (`2328:4243` / `2335:1373`) | Bold 36.49 / 40.87 | `l/headings/h1` | `--color-text-primary` |
| Entradilla de la sección 6 de `inicio` y de `Únete` | Medium 20.2 / 30.3 | `paragraphs/m` | `--color-text-secondary` |

## Cambio por breakpoint

- Las guías de `375-xs` (nodo `8:19`) y de `1024-sm` (nodo `98:1630`) muestran
  **los mismos valores**, que coinciden con la escala `xs/`.
- Las pantallas de `1448-lg` usan valores de la escala `l/`, salvo los títulos de
  artículo (25.6 = `xs/headings/h3`), que mezclan escalas en el propio diseño.
- Las etiquetas `16:9` / `5:4` sobre los bloques de imagen son anotaciones de
  placeholder del wireframe (Bold 46.1 / 51.63), no texto de interfaz.
- Confirmado por el equipo (2026-10-03): `375-xs` y `1024-sm` solo tienen guías de
  estilos y pantallas de plantilla; **las pantallas reales están únicamente en
  `1448-lg`** (ver [breakpoints.md](./breakpoints.md)). Por eso la escala tipográfica
  que rige cada media query para las pantallas móviles/tablet queda
  **PENDIENTE de confirmación con el diseño**.
