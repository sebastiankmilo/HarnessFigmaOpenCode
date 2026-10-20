---
fuente: Figma — estilos locales (`get_styles`) + `encabezado-contenido` `2325:3824` de `1448-lg`
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`get_styles, get_node_info`)
---

# Escala tipográfica

## Familias

| Familia | Rol | Evidence |
| --- | --- | --- |
| **Bebas Neue** (`Regular`, peso Figma 400) | titulares `l/headings/*` y `xs/headings/*` | `fontName.family` de los 14 estilos de headings |
| **DM Sans** (`Regular` 400 / `Bold` 700 / `Black` 900) | párrafos, enlaces y botones | `fontName.family` de `paragraphs/*`, `links/*`, `buttons/*` |

> `get_styles` **no expone** `lineHeight` ni `letterSpacing`: solo `fontSize` y
> `fontName`. El interlineado y el tracking se leen del nodo concreto con
> `get_node_info` → campo `style` (tabla siguiente).

## Medido en un nodo real (`encabezado-contenido`, `2325:3824`)

| Rol | Nodo | Familia / peso | `fontSize` | `lineHeightPx` | `fontWeight` | `letterSpacing` | Color |
| --- | --- | --- | --- | --- | --- | --- | --- |
| H1 hero | `2325:3792` | Bebas Neue Regular | **65.7** | **73.584** | 400 | **2.628** | `#53411e` |
| Lead / body | `2325:3793` | DM Sans Regular | **18** | **30.96** | 400 | 0 | `#333333` |
| Botón (hero, `size=base`) | `I2325:3794;14:81` | DM Sans Black | **18** | **27** | 900 | **2.16** | `#30250f` |
| Etiqueta de ratio de `components/images` | `I4329:2096;19:96` | Bebas Neue Regular | 58.4 | 65.408 | 400 | 2.336 | `#ffffff` |

La caja del lead mide **310 px** de alto con 10 líneas → la caja avanza
**31 px por línea** (310 = 10×31), no 30.96.

## Estilos locales (41)

`get_styles` → `texts`:

| Estilo | Familia | Estilo de fuente | `fontSize` |
| --- | --- | --- | --- |
| `l/headings/h1` | Bebas Neue | Regular | 46 |
| `l/headings/h2` | Bebas Neue | Regular | 41 |
| `l/headings/h3` | Bebas Neue | Regular | 36.4 |
| `l/headings/h4` | Bebas Neue | Regular | 32.4 |
| `l/headings/h5` | Bebas Neue | Regular | 28.8 |
| `l/headings/h6` | Bebas Neue | Regular | 25.6 |
| `l/headings/h1/xxl` | Bebas Neue | Regular | 65.7 |
| `l/headings/h1/xl` | Bebas Neue | Regular | 58.4 |
| `l/headings/h1/l` | Bebas Neue | Regular | 52 |
| `xs/headings/h1` | Bebas Neue | Regular | 41 |
| `xs/headings/h2` | Bebas Neue | Regular | 36.4 |
| `xs/headings/h3` | Bebas Neue | Regular | 32.4 |
| `xs/headings/h4` | Bebas Neue | Regular | 28.3 |
| `xs/headings/h5` | Bebas Neue | Regular | 25.6 |
| `xs/headings/h6` | Bebas Neue | Regular | 22.7 |
| `xs/headings/h1/xxl` | Bebas Neue | Regular | 58.4 |
| `xs/headings/h1/xl` | Bebas Neue | Regular | 52 |
| `xs/headings/h1/l` | Bebas Neue | Regular | 46 |
| `paragraphs/s` | DM Sans | Regular | 16 |
| `paragraphs/base` | DM Sans | Regular | 18 |
| `paragraphs/m` | DM Sans | Regular | 20.2 |
| `paragraphs/l` | DM Sans | Regular | 22 |
| `paragraphs/xl` | DM Sans | Medium | 25.6 |
| `paragraphs/bold/xs` | DM Sans | Bold | 14.2 |
| `paragraphs/bold/s` | DM Sans | Bold | 16 |
| `paragraphs/bold/base` | DM Sans | Bold | 18 |
| `paragraphs/bold/m` | DM Sans | Bold | 20.2 |
| `paragraphs/bold/l` | DM Sans | Bold | 22 |
| `paragraphs/bold/xl` | DM Sans | Bold | 25.6 |
| `links/xs` | DM Sans | Black | 14.2 |
| `links/s` | DM Sans | Black | 16 |
| `links/base` | DM Sans | Black | 18 |
| `links/m` | DM Sans | Black | 20.2 |
| `links/l` | DM Sans | Black | 22 |
| `links/xl` | DM Sans | Black | 25.6 |
| `buttons/xs` | DM Sans | Black | 14.2 |
| `buttons/s` | DM Sans | Black | 16 |
| `buttons/base` | DM Sans | Black | 18 |
| `buttons/m` | DM Sans | Black | 20.2 |
| `buttons/l` | DM Sans | Black | 22 |
| `buttons/xl` | DM Sans | Black | 25.6 |

### Escala desktop `l/headings/*` (Bebas Neue)

`h1/xxl` 65.7 · `h1/xl` 58.4 · `h1/l` 52 · `h1` 46 · `h2` 41 · `h3` 36.4 ·
`h4` 32.4 · `h5` 28.8 · `h6` 25.6

### Escala móvil `xs/headings/*` (Bebas Neue)

`h1/xxl` 58.4 · `h1/xl` 52 · `h1/l` 46 · `h1` 41 · `h2` 36.4 · `h3` 32.4 ·
`h4` 28.3 · `h5` 25.6 · `h6` 22.7

### Párrafos (DM Sans)

`s` 16 · `base` 18 · `m` 20.2 · `l` 22 · `xl` 25.6 (Medium 500),
más la variante `paragraphs/bold/*` en 14.2 / 16 / 18 / 20.2 / 22 / 25.6 (Bold 700).

### Enlaces y botones (DM Sans Black 900)

`xs` 14.2 · `s` 16 · `base` 18 · `m` 20.2 · `l` 22 · `xl` 25.6 — las tres
familias de estilos (`links/*`, `buttons/*`) comparten la escala.

## Mapeo a tokens

| Rol | Token (`site/styles/tokens.css`) | Valor |
| --- | --- | --- |
| H1 hero | `--font-size-display-hero` / `--line-height-display-hero` / `--tracking-display-hero` | 65.7 / 73.584 / 2.628 |
| Cuerpo | `--font-size-body-base` + `--font-weight-regular` | 18 / 400 |
| Interlineado de cuerpo | `--line-height-lead` | 1.7222222 (×18 = 31) |
| Botón | `--btn-tracking-m` + `--font-weight-bold` | 2.16 / 900 |

La correspondencia token↔valor de toda la escala está en `site/styles/tokens.css`
(`--font-size-l-h1-xxl`…`--font-size-xs-h6`, `--font-size-body-*`).
