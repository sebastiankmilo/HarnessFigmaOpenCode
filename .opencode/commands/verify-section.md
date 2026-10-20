---
description: Verifica visualmente una sección ya implementada: corre las capturas con Playwright y lanza el agente juez contra la rúbrica. Uso: /verify-section
---

# /verify-section

Sin argumentos obligatorios. Argumento opcional: `<nombre-de-seccion>` (por defecto,
la que esté marcada como en revisión).

## 1. Capturas

1. Desde `tests/`, ejecutar `npm test`.
2. Comprobar que en `tests/test-vanguardia/actual/` quedaron las capturas de
   página, componentes, estados y flujos a **1448** y **375**.

## 2. Veredicto

1. Lanzar el agente [visual-judge](../agents/visual-judge.md) con:
   - pares `tests/test-vanguardia/actual/` vs `tests/test-vanguardia/baseline/`,
   - `tests/visual/especificaciones/rubric.md`,
   - la spec de la sección (`Especificaciones/design specs/pages/…`,
     `Especificaciones/design specs/components/…`).
2. Criterio de paso: **0 hallazgos críticos y score ≥ 0.9**.
   La rúbrica **nunca** se afloja para aprobar: se corrige el CSS y se repite.
3. Las interacciones se comprueban con aserciones funcionales (navegación,
   apertura/cierre del modal, estados) contra `Especificaciones/design specs/interactions.md`.

## 3. Resultado

- Adjuntar en el PR las capturas y el veredicto JSON del juez.
- Si hay hallazgos: corregir CSS (nunca editar baseline ni rúbrica) y volver al paso 1.
