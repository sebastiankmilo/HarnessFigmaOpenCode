---
fuente: Figma — páginas `components-diseño` (`10:215`) y `1448-lg` (`110:1162`)
extraido: 2026-10-26
file_key_copia: GP23gIdp6DOtURfMNM0PzX
herramienta: TalkToFigma (`scan_nodes_by_types`, `get_node_info`, `export_node_as_image`)
---

# Manifiesto de assets

Formato de la plantilla de [especificaciones-diseño §4.9](../docs/Web/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md).
El plugin de comunidad **solo exporta PNG** (el formato lo fija el plugin);
SVG queda pendiente del parche del plugin.

## A · Imágenes (`site/assets/img`)

Todas exportadas **@2x**: el tamaño en disco es 2× el `absoluteBoundingBox`
del nodo en Figma.

| Archivo | px en disco | Nodo Figma | px Figma | Escala | Usado en |
| --- | --- | --- | --- | --- | --- |
| `hero.png` | 1180×1480 | `components/images` `4329:2096` | 590×740 | @2x | `inicio` › `encabezado-contenido` |
| `video-cover.png` | 2248×1268 | `components/images` `2325:3851` | 1124×634 | @2x | `inicio` › `sección-video` |
| `goal-1.png` | 644×388 | media de `goal-card` `2326:3926` (`Rectangle 177`) | 322×194 | @2x | `inicio` › `seccion-objetivos` (tarjeta 1) |
| `goal-2.png` | 644×388 | media de `goal-card` `2326:3937` | 322×194 | @2x | ídem (tarjeta 2) |
| `goal-3.png` | 644×388 | media de `goal-card` `2326:3948` | 322×194 | @2x | ídem (tarjeta 3) |
| `goal-4.png` | 644×388 | media de `goal-card` `2326:3959` | 322×194 | @2x | ídem (tarjeta 4) |
| `article-1.png` | 644×515 | `components/images` `I2326:4137;93:130` | 322×257 | @2x | `inicio` › `sección-La-Materia-Prima` (art. 1) |
| `article-2.png` | 644×515 | `I2326:4173;93:130` | 322×257 | @2x | ídem (art. 2) |
| `article-3.png` | 644×515 | `I2326:4185;93:130` | 322×257 | @2x | ídem (art. 3) |
| `article-4.png` | 644×515 | `I2326:4197;93:130` | 322×257 | @2x | ídem (art. 4) |
| `materia-prima-bg.png` | 1448×885 | relleno `IMAGE` (`scaleMode: FILL` en lg; `STRETCH` recortado en xs/sm) del frame `sección-La-Materia-Prima` `2328:4236` | 1448×887 | 1× | `inicio` › `sección-La-Materia-Prima` (fondo) |
| `join.png` | 1286×850 | `components/images` `4426:1225` (y `4427:1241`) | 643×425 | @2x | `inicio`/`Únete` › `sección-únete` |
| `programa-header.png` | 876×656 | `components/images` `2328:4501` | 438×328 | @2x | `Programa` › `header` |
| `programa-ejes.png` | 878×878 | `components/images` `2329:4515` | 439×439 | @2x | `Programa` › `sección-ejes` |
| `programa-materialismo-1.png` | 408×406 | `components/images` `2329:4519` | 204×203 | @2x | `Programa` › `sección-materialismo` |
| `programa-materialismo-2.png` | 408×406 | `components/images` `4422:1115` | 204×203 | @2x | ídem |
| `decalogo-header.png` | 876×700 | `components/images` `2335:1222` | 438×350 | @2x | `Decálogo` › `header` |

> **Logo del header (2026-11-03):** el diseño cambió al oso dorado de contorno;
> se reexportaron `logo-color.png` (header) y `logo-menu.png` (overlay). El
> `logo-02.png` del footer no cambia en este ticket.
>
> `materia-prima-bg.png` se usa entera con `cover` en `lg`. En `xs`/`sm` el
> frame (`2392:4053` / `2408:1708`) rellena con `STRETCH` y un
> `imageTransform` x=0.2470677 / 0.5315786: se muestra la **franja izquierda**
> estirada al ancho de la sección (`background-size` 404.747% / 188.119%,
> `background-position: left center`), sobre el sólido `#1b2c43`.

## B · Iconos (`site/assets/icons`)

El nodo de origen se identifica **por nombre** (`icons/<archivo-base>` en la
página `components-diseño`). Donde el tamaño en disco no equivale a 2× del
componente maestro, la **instancia exacta** queda `PENDIENTE-FIGMA`.

| Archivo | px en disco | Componente Figma | Nodo | Nota |
| --- | --- | --- | --- | --- |
| `close.png` | 130×128 | `icons/close` | `21:155` | maestro 32×32 |
| `search.png` | 128×128 | `icons/search` | `21:160` | maestro 32×32 |
| `hamburger-two.png` | 128×128 | `icons/hamburger-two` | `21:150` | maestro 32×32 |
| `heart-fill.png` | 128×128 | `icons/heart-fill` | `21:262` | maestro 32×32 |
| `play.png` | 384×340 | `icons/play` | `21:303` | maestro 32×32 → **instancia exacta PENDIENTE-FIGMA** |
| `star.png` | 42×40 | `icons/star` | `21:265` | maestro 32×32; los `STAR` de `Programa` (`4370:4822`…) miden 22×22 → **instancia exacta PENDIENTE-FIGMA** |
| `prev.png` / `next.png` | 64×64 | `icons/prev` / `icons/next` | `21:176` / `21:168` | — |
| `facebook.png` | 128×128 | `icons/facebook` | `27:1930` | — |
| `instagram.png` | 128×128 | `icons/instagram` | `27:1934` | — |
| `youtube.png` | 128×128 | `icons/youtube` | `27:1951` | — |
| `x.png` | 128×128 | `icons/x` | `27:1993` | — |
| `tik-tok.png` | 128×128 | `icons/tik-tok` | `27:1977` | — |
| `wechat.png` | 128×128 | `icons/wechat` | `27:2007` | — |
| `weibo.png` | 128×128 | `icons/weibo` | `27:2005` | — |
| `xiao-hong-shu.png` | 128×128 | `icons/xiao-hong-shu` | `27:1984` | — |
| `logo.png` | 256×256 | `icons/logo` | `27:1675` | maestro 32×32; las instancias del footer miden 128×128 (2×256 ✓) |
| `logo-02.png` | 256×256 | `icons/logo-02` | `2328:4285` | PENDIENTE-FIGMA (instancia exacta) |
| `logo-color.png` | 192×206 | grupo `logo-color` del nav (`I2396:105;4835:4043`, nuevo oso dorado de contorno) | export 8× → 192×206 | 96×103 → 2×; actualizado 2026-11-03 |
| `logo-menu.png` | 256×275 | grupo `logo-color` del overlay xs (`I2396:3288;4835:3945`, mismo logo) | export 8× → 256×275 | 128×137 → @2x; transparencia; actualizado 2026-11-03 |

### B.1 · SVG en uso (2026-11-14)

Los logos y las 5 redes se sirven como SVG desde `site/assets/svg/`; el `<img>`
se conserva para mantener los tokens de tamaño y el filtro `#vc-red` del hover.

| Archivo | Medida | Origen | Uso |
| --- | --- | --- | --- |
| `svg/logo-color.svg` | 59×64 | export `logo-color` | logo del nav y del overlay |
| `svg/components/logo-grises.svg` | 128×135 | export `logo-grises` | logo del footer |
| `svg/icons/facebook.svg` | 24×24 | tile 1 del sprite | Facebook |
| `svg/icons/instagram.svg` | 24×24 | tile 2 del sprite | Instagram |
| `svg/icons/youtube.svg` | 24×24 | tile 3 del sprite | YouTube |
| `svg/icons/x.svg` | 24×24 | tile 4 del sprite | X |
| `svg/icons/tik-tok.svg` | 24×24 | tile 5 del sprite | TikTok |

`svg/platforms, search and toggle.svg` es el sprite de origen: 184×24, cinco
tiles de 24×24 separados 16 (`x` = 0, 40, 80, 120 y 160). Cada tile se extrae
con `viewBox="0 0 24 24"` y `<g transform="translate(-x 0)">`, conservando el
`fill` (`#191919`). El sprite **no** incluye `search`, `close` ni
`hamburger-two`: esos iconos siguen en WebP.


## C · Tipografías (`site/assets/fonts`)

No salen de Figma: son ficheros vendorizados. `bebas-neue-latin.woff2`,
`dm-sans-latin.woff2`, `dm-sans-latin-ext.woff2`.

## D · Baselines

Los PNG de `tests/test-vanguardia/baseline/` son **assets de verificación**, no
assets del sitio: se exportan con `export_node_as_image` desde los nodos
citados en cada spec. `tests/` requiere autorización explícita del proyecto.

## Pendientes

- **SVG**: el plugin solo exporta PNG (`format` fijado por el plugin); los SVG
  de logos y redes entraron por export directo (ver §B.1). `search`, `close`,
  `hamburger-two` y el resto de iconos siguen en PNG/WebP.
- **Instancia exacta** de `play.png`, `star.png` y `logo-02.png`:
  `PENDIENTE-FIGMA`.
