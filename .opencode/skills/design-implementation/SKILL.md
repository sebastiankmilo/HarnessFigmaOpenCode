---
name: design-implementation
description: Implementar secciones de la web solo a partir de specs/ y site/styles/tokens.css. Úsala siempre que se pida escribir HTML/CSS/JS de una sección o componente del diseño.
---

# Implementación desde las especificaciones

## Fuente única

- **Valores visuales**: exclusivamente [`site/styles/tokens.css`](../../../site/styles/tokens.css)
  (colores, tipografía, espaciado, radios). **PROHIBIDO** hardcodear hex, px de
  espaciado, familias o radios fuera de tokens.
- **Estructura, medidas y estados**: la spec correspondiente en [`specs/`](../../../specs/):
  - Página → `specs/pages/<pagina>.md` (secciones en orden, con sus nodos).
  - Componente → `specs/components/<nombre>.md` (anatomía, variantes, medidas, tokens).
  - Comportamiento → `specs/interactions.md`.
  - Accesibilidad → `specs/accessibility.md`.
  - Breakpoints y dirección de las media queries → `specs/breakpoints.md`.
- **Reglas de uso de cada token**: [`specs/tokens.md`](../../../specs/tokens.md).

## Reglas

1. Si la spec **no** especifica un estado (hover/focus/active/disabled/error), **no se
   construye**: primero se extrae de Figma y se actualiza la spec
   (skill [figma-extraction](../figma-extraction/SKILL.md)).
2. Si falta un dato, **no se estima**: se extrae de Figma. Lo no confirmable va
   marcado `PENDIENTE-FIGMA` en la spec, nunca convertido a código.
3. Estados obligatorios de `AGENTS.md` que sí se implementan siempre: foco visible
   (`:focus-visible`), contraste AA y `prefers-reduced-motion`.
4. Assets: solo los de [`specs/assets.md`](../../../specs/assets.md), exportados en
   `site/assets/img|icons`. Sin placeholders ni URLs externas de imágenes.
5. Estructura de archivos en inglés kebab-case; documentación y comentarios en español.
6. Responsive con los 3 breakpoints: 375, 1024 y 1448. La dirección de las media
   queries (mobile-first o desktop-first) se toma de `specs/breakpoints.md` **por
   sección**; si la sección no lo tiene documentado, se mide en Figma antes de escribir.
7. No se modifica ningún archivo fuera de los que pide la tarea; si aparece uno
   necesario, se pide autorización antes.

## Orden de trabajo

1. Leer la spec de la página y la de cada componente que usa.
2. Comprobar que los tokens que necesita existen en `tokens.css`.
3. Escribir HTML/CSS/JS mapeando cada medida/color a su token.
4. Nada de `tests/` se toca desde esta skill.
