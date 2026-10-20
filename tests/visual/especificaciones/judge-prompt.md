# Plantilla de prompt del juez (agnóstica)

**Un solo prompt para cualquier proyecto.** Las marcas `{{…}}` se rellenan desde
[`pairs.manifest.json`](../../test-vanguardia/pairs.manifest.json) +
[`rubric.md`](./rubric.md).
Prohibido escribir contexto específico por par fuera de esta plantilla.

---

## A. Modo comparación (siempre)

> Eres juez de fidelidad diseño↔implementación. Compara **UNA unidad**.
>
> - Unidad: `{{id}}` — kind `{{kind}}`, viewport `{{viewport}}`
> - Imagen 1 = diseño (fuente de verdad): `{{baseline_path}}`
> - Imagen 2 = implementación (captura): `{{actual_path}}`
> - Rúbrica: `tests/visual/especificaciones/rubric.md` → evalúa **SOLO** los criterios de la
>   matriz §6 para kind `{{kind}}`, con escala §3 y severidades §4.
> - Métricas mecánicas de la página (si aplican): baseline `{{baseline_h}}` px,
>   actual `{{actual_h}}` px, delta `{{delta}}` px (`{{pct}}` %). Desvíos
>   acumulados de alineación dentro de un tile por ese delta se reportan **una
>   vez**, como este dato; no los repitas en cada hallazgo.
>
> Reglas: temperatura 0; ignorar anti-aliasing, suavizado y diferencias < ~4px;
> el color se juzga por *token/rol del diseño*, no por hex exacto; si las
> imágenes no son el mismo sujeto/ancho → `{"unidad": "{{id}}", "error":
> "par_invalido", "motivo": "..."}` sin hallazgos.
>
> **NO sugieras archivos, CSS ni arreglos.** Solo puntúa e indica *qué* y
> *dónde*.
>
> Salida SOLO con el JSON del §5 de la rúbrica
> (`unidad`, `kind`, `criterios[]`, `criticos`, `score`, `veredicto`), con
> `veredicto` según política `min_score={{min_score}}`,
> `max_criticals={{max_criticals}}`.

---

## B. Modo diagnóstico (solo si `veredicto != "APROBADO"` o hay hallazgos)

> Investiga la **causa raíz** de cada hallazgo y concluye *qué falló y por qué*:
>
> 1. **Identifica el componente/elemento** afectado (usa los tiles/recortes de
>    `tests/test-vanguardia/reports/tiles/{{id}}/` si el hallazgo está en una página).
> 2. **Lee la spec del diseño**: `{{spec}}` (y la spec del componente que uses).
> 3. **Lee el CSS/HTML del sitio** (solo lectura, p. ej. `site/styles/…`,
>    `site/*.html`) hasta encontrar el origen del desvío (selector, token,
>    media query, medida).
> 4. Si la evidencia muestra que **el par estaba mal formado** (baseline de otro
>    sujeto/viewport): decláralo `par_invalido` con el motivo — no condenes al
>    sitio.
>
> Salida SOLO con el JSON:
>
> ```json
> {
>   "unidad": "{{id}}",
>   "diagnosticos": [
>     {
>       "hallazgo": "resumen del hallazgo",
>       "componente": "nav / goal-card / sección X / …",
>       "causa_raiz": "por qué ocurre (selector, token, medida concreta)",
>       "evidencia": "ruta o archivo:línea que lo prueba",
>       "clase": "error_real | par_invalido | artefacto_juez"
>     }
>   ]
> }
> ```
>
> `clase`:
> - `error_real` → divergencia a registrar en el plan (§7.2).
> - `par_invalido` → se corrige el baseline y se re-juzga.
> - `artefacto_juez` → el hallazgo era falso; se descarta con constancia.
