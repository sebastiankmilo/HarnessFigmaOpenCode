---
name: design-implementation
description: Implementar secciones de la web a partir de specs/ + site/styles/tokens.css, con consulta viva de medidas a Figma. Úsala siempre que se pida escribir HTML/CSS/JS de una sección o componente del diseño.
---

# Implementación desde las especificaciones

## Fuentes

- **Valores visuales**: exclusivamente [`site/styles/tokens.css`](../../../site/styles/tokens.css)
  (colores, tipografía, espaciado, radios). **PROHIBIDO** hardcodear hex, px de
  espaciado, familias o radios fuera de tokens.
- **Estructura, variantes/estados, comportamiento y mapeo a tokens**: la spec
  correspondiente en [`specs/`](../../../specs/):
  - Página → `specs/pages/<pagina>.md` (secciones en orden, con IDs de nodo).
  - Componente → `specs/components/<nombre>.md` (anatomía, variantes/estados,
    comportamiento, tokens que usa).
  - Comportamiento → `specs/interactions.md`.
  - Accesibilidad → `specs/accessibility.md`.
  - Breakpoints y dirección de las media queries → `specs/breakpoints.md`.
- **Medidas de instancia (consulta viva — NO están en las specs)**: paddings, gaps y
  tamaños de una sección concreta se leen de Figma **en este momento**, con
  `get_node_info` sobre el nodo que la spec referencia (regla de dos niveles:
  `especificaciones-diseño.md` §4.11). El plugin no expone `padding`/`itemSpacing`:
  se derivan de `absoluteBoundingBox` (padding = `hijo.x − padre.x`;
  gap = `hijo[n+1].x − (hijo[n].x + hijo[n].width)`).
- **Reglas de uso de cada token**: [`specs/tokens.md`](../../../specs/tokens.md).

## Reglas

1. Si la spec **no** especifica un estado (hover/focus/active/disabled/error), **no se
   construye**: primero se extrae de Figma y se actualiza la spec
   (skill [figma-extraction](../figma-extraction/SKILL.md)).
2. Si falta un dato, **no se estima**: se consulta Figma. Lo no confirmable va
   marcado `PENDIENTE-FIGMA` en la spec, nunca convertido a código.
3. Estados obligatorios de `AGENTS.md` que sí se implementan siempre: foco visible
   (`:focus-visible`), contraste AA y `prefers-reduced-motion`.
4. Assets: solo los de [`specs/assets.md`](../../../specs/assets.md), exportados en
   `site/assets/img|icons` (PNG @2x; SVG de iconos pendiente del parche del plugin).
   Sin placeholders ni URLs externas de imágenes.
5. Estructura de archivos en inglés kebab-case; documentación y comentarios en español.
6. Responsive con los 3 breakpoints: 375, 768 y 1448 (el tablet mide **768**;
   `1024-sm` es solo el nombre de la página de Figma — confirmado 2026-10-05).
   La dirección de las media
   queries (mobile-first o desktop-first) se toma de `specs/breakpoints.md` **por
   sección**; si la sección no lo tiene documentado, se consulta Figma antes de escribir.
7. No se modifica ningún archivo fuera de los que pide la tarea; si aparece uno
   necesario, se pide autorización antes.

## Orden de trabajo

1. Leer la spec de la página (secciones + IDs de nodo) y la de cada componente
   que usa (estados, comportamiento, tokens).
2. **Consulta viva:** `get_node_info` de los nodos referenciados → medidas de
   instancia; mapear colores/fuentes/radios a tokens.
3. Comprobar que los tokens necesarios existen en `tokens.css`; si falta alguno,
   extraerlo primero (skill figma-extraction).
4. Escribir HTML/CSS/JS mapeando cada valor a su token.
5. Nada de `tests/` se toca desde esta skill.
