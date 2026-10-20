---
description: Orquesta el flujo completo de una sección desde su nodo de Figma: extraer spec → implementar → capturar → verificar. Uso: /implement-section <url-del-nodo>
---

# /implement-section \<url-nodo\>

Argumentos: `<url-nodo>` — URL de Figma del frame o componente
(`https://www.figma.com/design/<FILE_KEY>/<archivo>?node-id=110-2277` → nodo `110:2277`).

Ejecuta estas fases en orden y **detente si alguna falla**:

## 1. Contexto

1. Leer `chanel_name` de `Pagina_web_vanguardia/.env`, `join_channel` y confirmar con
   `get_document_info`. Si no responde: parar y avisar (no hay plan B, no se inventan valores).
2. Leer `AGENTS.md` y la skill [figma-extraction](../skills/figma-extraction/SKILL.md).

## 2. Extraer la spec (si no existe)

1. Identificar la página y el nodo con `scan_nodes_by_types` / `get_document_info`.
2. Generar o completar `Especificaciones/design specs/pages/<pagina>.md` y
   `Especificaciones/design specs/components/<nombre>.md`
   siguiendo la plantilla de
   [especificaciones-diseño](../../Especificaciones/docs/Web/tickets/1-flujo-desarrollo-con-figma/entregables/especificaciones-diseño.md).
3. Registrar trazabilidad (fuente, fecha, `file_key_copia`, herramientas) y marcar
   `PENDIENTE-FIGMA` lo no confirmable.
4. Exportar a `site/assets/icons|img` cualquier asset nuevo y anotarlo en
   `Especificaciones/design specs/assets.md`.

## 3. Implementar

Con la skill [design-implementation](../skills/design-implementation/SKILL.md):
HTML/CSS/JS en `site/` tomando valores **solo** de `site/styles/tokens.css` y medidas
**solo** de `Especificaciones/design specs/`. Si falta un dato → volver a la fase 2, no estimarlo.

## 4. Capturar y verificar

1. Capturas a 1448 y 375: `npm test` desde `tests/` (salida en
   `tests/test-vanguardia/actual/`).
2. Lanzar el agente [visual-judge](../agents/visual-judge.md) contra
   `tests/visual/especificaciones/rubric.md`.
3. Aprobar solo con **0 críticos y score ≥ 0.9**; si no, corregir CSS y repetir.

## 5. Cierre

Commits en español, imperativo, en la rama del ticket (`feature/<n>-<slug>`).
Nunca commitear `.env`.
