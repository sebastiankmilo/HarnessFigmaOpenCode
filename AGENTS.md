# Reglas del proyecto — Página web Vanguardia Colombiana

## Contexto
Sitio estático vanilla (HTML/CSS/JS) en `site/`. Sin framework ni build step.
El diseño vive en Figma (archivo GP23gIdp6DOtURfMNM0PzX). **Nunca modificar el Figma.**
- Cada pantalla es `site/<pagina>.html`, con su spec homónima en
  `Especificaciones/design specs/pages/<pagina>.md` (p. ej. `site/unete.html` ↔
  `Especificaciones/design specs/pages/unete.md`)
  y su CSS en `site/styles/<pagina>.css`, sobre `site/styles/main.css`.

## Idioma
- Documentación y comentarios: español.
- Código, nombres de archivo, clases CSS y rutas: inglés (kebab-case para archivos).

## Diseño → código
- Fuente de verdad visual: `site/styles/tokens.css`. PROHIBIDO hardcodear
  colores hex, px de espaciado, fuentes o radios fuera de tokens.
- Fuente de verdad del copy: `site/content/*.json` (un archivo por idioma; hoy
  solo `es.json`). PROHIBIDO escribir o editar textos visibles en los HTML: el
  copy se escribe en el JSON (claves namespaced `pagina.seccion.campo`, y
  `common.*` para nav/menú/footer) y en el HTML solo va el placeholder
  `{{clave}}` con su atributo `data-i18n="clave"`. El texto se aplica con
  `node scripts/inject-content.mjs` (corre solo en cada deploy vía
  `scripts/deploy-pages.sh`). Gemela de la regla de tokens.
- El diseño se trabaja sobre la COPIA propia en Drafts (FILE_KEY local
  documentado en
  `Especificaciones/docs/Web/tickets/1-flujo-desarrollo-con-figma/entregables/flujo-figma-opencode.md`).
  El original de Alejandro nunca se toca.
- Obtén contexto del diseño con el MCP `talk-to-figma` (get_document_info →
  get_node_info / read_my_design). Si no responde (plugin o socket caídos),
  detente y avisa: no hay plan B ni valores de respaldo.
- PROHIBIDO usar herramientas de escritura de cualquier MCP de Figma.
- Assets: exportar desde Figma a `site/assets/img|icons` (PNG @2x — el plugin
  de comunidad solo exporta PNG; la regla "SVG para iconos" queda pendiente del
  parche del plugin, ver `Especificaciones/docs/.../entregables/especificaciones-diseño.md` §4.9).
  Sin placeholders ni URLs externas.
- Tipografía: DM Sans **vendorizada** en `site/assets/fonts/` (`@font-face` en
  `main.css`). Sin CDN ni URLs externas de fuentes.

## Cómo usar las especificaciones
- **Antes de codificar** una sección: leer `Especificaciones/design specs/pages/<pagina>.md`
  (secciones en orden, con IDs de nodo) y las
  `Especificaciones/design specs/components/<nombre>.md` que usa. De ahí salen
  **anatomía, variantes/estados, comportamiento y mapeo a tokens** — nunca de una
  captura ni de la memoria del modelo.
- **Las medidas de instancia NO están en las specs**: se consultan en vivo con
  `get_node_info` sobre el nodo que la spec referencia (regla de dos niveles, ver
  `especificaciones-diseño.md` §4.11). Lo que devuelva se mapea a tokens; si falta
  un token, primero se extrae (skill `figma-extraction`), nunca se hardcodea.
- Cruzar siempre con `Especificaciones/design specs/tokens.md` (qué token para qué rol),
  `Especificaciones/design specs/breakpoints.md` (dirección de las media queries por
  sección), `Especificaciones/design specs/interactions.md` (qué hace cada
  control) y `Especificaciones/design specs/accessibility.md` (contraste, foco, motion).
- Si falta un dato o un estado (o la spec dice `PENDIENTE-FIGMA`): **no se inventa** —
  se extrae de Figma con la skill `figma-extraction` y se actualiza la spec antes de
  escribir código. Orden completo: atajo `/implement-section <url-nodo>`.
- Skills y agentes del harness: `.opencode/skills/` (`figma-extraction`,
  `design-implementation`), `.opencode/agents/visual-judge.md` y
  `.opencode/commands/`. Especificaciones en `Especificaciones/design specs/`, valores
  en `site/styles/tokens.css`.

## Conexión a Figma (TalkToFigma)
- 3 piezas, todas obligatorias: plugin abierto en la copia + WebSocket local
  (`bun socket`, puerto 3055) + MCP que OpenCode lanza con `opencode.json`.
  Si falta una, el agente falla. **No hay plan B.**
- El canal es **aleatorio**: lo asigna el plugin al conectar; no se elige ni se
  escribe nombre. Copia el canal que muestra el plugin y pégalo en `.env`
  (`chanel_name = "<copiado>"`). **Prohibido hardcodear el canal** en código,
  docs ni prompts; el agente siempre lo lee de `.env`.
- Orden de arranque de cada sesión:
  1. Terminal 1: `cd ~/tools/talk-to-figma && bun socket` (dejar abierta).
  2. Figma: abrir la copia → *Resources (⇧I) → Plugins → Talk to Figma MCP*
     → dejar la ventana del plugin abierto → *Connect* → copiar el canal
     aleatorio que asigna el plugin.
  3. Pegar el canal en `Pagina_web_vanguardia/.env`:
     `chanel_name = "<copiado>"` (archivo local, ignorado por git; si el
     plugin se reconecta y asigna otro, volver a pegarlo).
  4. Terminal 2: `opencode` en `Pagina_web_vanguardia/` → prompt inicial:
     *"Lee `chanel_name` de `.env`, únete a ese canal con `join_channel` y
     confirma con `get_document_info`"*.
- Verificación de que la conexión vive: `get_document_info` devuelve la
  estructura del archivo. Si falla (timeout, plugin cerrado, `chanel_name`
  desactualizado), detente, revisa el troubleshooting y avisa: **no improvises
  valores.**
- Paso a paso desde cero (instalación, copia del archivo, verificación y
  troubleshooting): `Especificaciones/docs/Web/tickets/1-flujo-desarrollo-con-figma/entregables/paso-a-paso-conexion-figma.md`.
- Contexto completo (decisión, arquitectura, límites): el runbook Anexo A de
  `Especificaciones/docs/Web/tickets/1-flujo-desarrollo-con-figma/entregables/flujo-figma-opencode.md`.

## CSS
- Responsive con los 3 breakpoints del diseño: 375px (móvil), 768px (tablet)
  y 1448px (desktop). El tablet mide **768** (ancho de los frames de la página
  Figma `1024-sm`; ese «1024» es solo el nombre de la página — confirmado por el
  equipo el 2026-10-05). **No se asume mobile-first**: la dirección de las media
  queries (mobile-first o desktop-first) se decide según lo que exija cada
  sección del diseño.
- Verificación visual obligatoria a 1448 y 375 (mismo ancho que los frames de
  Figma para comparar 1:1).
- Accesibilidad obligatoria: foco visible, contraste AA, `prefers-reduced-motion`.

## Verificación (obligatoria antes de dar una sección por terminada)
1. `npx playwright test` desde `tests/visual/` genera las capturas en
   `tests/visual/actual/` (página, componentes, estados y flujos a 1448 y 375).
2. Un agente con visión compara cada par `actual/` vs `baseline/` siguiendo
   `tests/visual/rubric.md`. Criterio: 0 hallazgos críticos y score ≥ 0.9.
   Nunca se afloja la rúbrica para pasar: se corrige el CSS.
3. Las interacciones se verifican con aserciones funcionales de Playwright
   (navegación, apertura/cierre de modal, estados) + comparación de visión
   del estado resultante.
4. Adjuntar en el PR las capturas y el veredicto JSON del juez.

## Git
- Rama por ticket: `feature/<n>-<slug>`. Commits en español, imperativo.
- Nunca commitear `.env` ni tokens (ver `.gitignore`).
