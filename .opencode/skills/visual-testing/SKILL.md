---
name: visual-testing
description: Uso y comportamiento agnóstico del arnés de tests visuales: cómo capturar de forma determinista, cortar en tiles, triagear y juzgar contra el baseline con diagnóstico de causa raíz, generar informes y crear/editar pairs.manifest.json. Úsala siempre que se pida correr los tests, generar capturas, verificar paridad diseño↔implementación, ejecutar el juez, regenerar reportes o definir pares de prueba (npm test, cut-tiles, report, baseline, veredicto, manifest).
---

# Tests visuales (agnóstico)

## Principio

El arnés **no contiene datos del proyecto**. Los datos viven en dos entradas
que define el usuario, ambas agnósticas:

- **`pairs.manifest.json`** — pares, viewports/tiles, política de paso. Los tools
  lo reciben por argumento; si se omite, usan `test.manifest` del `.env`.
- **`.env` → bloque `test`** — entorno de la prueba: servidor, locale, viewports
  de captura y la propia ruta del manifest.

Este skill describe el procedimiento genérico; los valores concretos de cada
ejecución salen de esas dos entradas.

Convención de carpetas del arnés:

- `tests/visual/` — harness agnóstico: `tools/` y `especificaciones/`
  (`rubric.md` + `judge-prompt.md`).
- `tests/` — contexto npm: `package.json` con los scripts (ancestro común para
  resolver `@playwright/test`).
- `tests/test-vanguardia/` — lado del proyecto: `*.spec.js`, `playwright.config.js`,
  `pairs.manifest.json`, `baseline/`, `actual/`, `reports/`.

## Qué verifica (dos capas)

1. **Paridad visual** (esta skill): capturas reales vs `baseline/` del diseño,
   juzgadas con la rúbrica. Por `kind` del manifest:
   - `page` → fullPage y juzgada **por tiles** (recortes).
   - `component` / `state` → solo en desktop, juzgada **imagen entera**.
2. **Comportamiento**: aserciones funcionales de Playwright en los specs del
   proyecto (navegación, apertura/cierre de modal, foco, `aria-expanded`,
   `prefers-reduced-motion`). El juez **no** sustituye estas pruebas; solo cubre
   los estados visibles.

## Comportamiento del test

### Captura determinista

- Playwright levanta solo el **servidor estático** del sitio (`webServer`) antes
  de correr y lo reutiliza si ya corre; `baseURL` apunta ahí.
- **Solo Chromium** (la referencia es el diseño, no otro motor); ejecución
  secuencial (`workers: 1`, sin parallelismo) para orden reproducible.
- Cada captura sale con animaciones anuladas (`animations: 'disabled'`),
  `reducedMotion: 'reduce'` a nivel de proyecto, cursor de texto oculto y
  **fuentes esperadas con `document.fonts.ready`** → cero capturas a medio
  render, cero hover residual entre tests.
- Páginas → `fullPage`; componentes/estados → por `locator` y **solo en el
  proyecto desktop** (en el resto hacen `skip`).

### Estados sin par

Si el diseño no define un estado (variantes `PENDIENTE` de especificación), el
estado **se captura igual a `actual/` como evidencia** y se verifica con
aserciones funcionales, pero **no entra al juez** (no hay baseline que lo
contraste). **Nunca se inventa un baseline de estado.**

### Baseline

- **Solo desde el diseño** (export del nodo, nunca captura del navegador): la
  comparación es *implementación vs. diseño*, nunca auto-referencial.
- **Componentes**: el baseline es el nodo de **instancia en su vista** (con sus
  overrides), **jamás el nodo maestro** del catálogo — maestro vs instancia
  produce falsos positivos («faltan» elementos que en realidad son overrides).
- Antes de exportar se **verifica en vivo que el nodo/frame exista**; si no
  existe → se detiene y se pide decisión. **Sin inventar valores.**
- Ciclo de vida: se versiona en git y **se refresca desde el diseño al iniciar
  cada test**; prohibido editar para aprobar. (Detectar obsolescencia exige
  procedencia del nodo en el manifest — pendiente de implementar en los tools.)

### Corte en tiles (`cut-tiles.mjs`)

- Solo `kind: page`: calcula `N = ceil(alto_baseline / alto_tile)` y corta **ambas**
  imágenes en `N` bandas proporcionales — extremos siempre alineados, deriva
  intermedia ≤ delta/2 — para que tile-i compara contra tile-i.
- Emite la **métrica de altura** (delta px / %) como hallazgo automático de
  layout; advierte si el ancho real no coincide con el `viewport` del par.
- `component`/`state` no se trocean (ya son rectángulos pequeños).
- Si falta `actual/` o `baseline/`: `SKIP` (no aborta la corrida).

### Juez

- Temperatura 0, **una unidad por vez**: `<id>#tN` (tile) para `page`,
  imagen entera para `component`/`state`.
- **Triage antes de puntuar (cero falsos positivos)**: ¿mismo sujeto, mismo
  viewport, mismo ancho? Si no → emite `par_invalido` **sin hallazgos**.
- Ignora anti-aliasing y diferencias < ~4px; el color se juzga por **token/rol
  del diseño**, no por hex renderizado; evalúa solo los criterios asignados al
  `kind` (matriz de la rúbrica), escala 0–5 × peso.
- **No sugiere archivos ni CSS**: reporta *qué* y *dónde*; el *porqué* lo produce
  el modo diagnóstico.
- **Diagnóstico obligatorio** si `veredicto != APROBADO` o hay hallazgos:
  identificar el componente → leer su spec de diseño → abrir CSS/HTML del sitio
  → clasificar cada hallazgo como `error_real | par_invalido | artefacto_juez`.
  **Ningún hallazgo se registra sin causa raíz.**

### Agregación (`report.mjs`)

- Score del par = media de sus unidades; críticos sumados; reporta la **peor
  unidad**; `PAR_INVALIDO` si alguna unidad lo es; si no, compara contra la
  política del manifest.
- Escribe `<par>.md` por par (unidades, hallazgos, diagnósticos, evidencia) y
  `veredicto-piloto.json` global. Un par rechazado **sin diagnóstico** aparece
  marcado como pendiente en su informe.

### Cierre

- Aprobado = **0 críticos y score ≥ `min_score`** (política del manifest).
  Rechazo → corregir el **sitio** y repetir; si el fallo es del arnés
  (captura/corte), se corrige el arnés y se repite. **Nunca** se mueve baseline
  ni rúbrica. Evidencia obligatoria en el PR: capturas + veredicto JSON.
- Fuera de alcance decidido: sin comparación píxel a píxel automática
  (`pixelmatch`/`toHaveScreenshot`) — falsos positivos por anti-aliasing, la
  puerta es el juez VLM; sin CI; sin comprobador automático de accesibilidad.

## Uso (orden obligatorio)

Siempre desde `tests/`:

1. **Capturas** → `actual/<id>.png` (junto al manifest):

   ```bash
   npm test                # todos los viewports del config
   npm run test:desktop    # solo proyecto desktop
   npm run test:mobile     # solo proyecto mobile
   ```

   Si cambió el set de pares, limpiar antes `actual/` para no dejar huérfanos.

2. **Tiles** (solo `kind: page`):

   ```bash
   node visual/tools/cut-tiles.mjs [ruta-al-manifest]  # sin argumento: test.manifest de .env
   ```

   → `<dir-manifest>/reports/tiles/<id>/{baseline-NN,actual-NN}.png` + `metrics.json`.
   Si un par no tiene `actual/` lo marca `SKIP` (no es error).

3. **Juez**: lanzar el agente
   [visual-judge](../../agents/visual-judge.md) con la
   [rúbrica](../../../tests/visual/especificaciones/rubric.md) y la plantilla de
   [prompt](../../../tests/visual/especificaciones/judge-prompt.md): las marcas
   `{{…}}` (unidad, kind, viewport, rutas de imágenes, política, `spec` del
   diseño) se rellenan desde el manifest. Escribe
   `<dir-manifest>/reports/veredictos/<unidad>.json` y, si no aprueba,
   `<unidad>.diagnostico.json` (causa raíz).

4. **Informes**:

   ```bash
   node visual/tools/report.mjs [ruta-al-manifest]     # sin argumento: test.manifest de .env
   ```

   → `<dir-manifest>/reports/<par>.md` (score, hallazgos, diagnósticos) y
   `veredicto-piloto.json` (cierre global).

Orquestación de una sección completa: [/verify-section](../../commands/verify-section.md)
y [/implement-section](../../commands/implement-section.md).

## Política de paso

- Definida **en el manifest** (`policy.min_score`, `policy.max_criticals`):
  **0 hallazgos críticos y score ≥ min_score**. No se copia a ningún otro sitio.
- **Prohibido** editar rúbrica, prompt ni `baseline/` para aprobar. Rechazo →
  modo diagnóstico del prompt → corregir el sitio, o declarar `par_invalido`
  si el baseline estaba mal formado → re-juzgar.
- **Prohibido** meter datos del proyecto en `tests/visual/` (harness): los specs,
  manifests y baselines van en el lado del proyecto.

## Entrada en `.env` (bloque `test`)

El usuario define en la raíz del repo, dentro de `.env` (local, gitignored),
el bloque `test` con el entorno de la prueba — mismas claves en cualquier
proyecto:

```env
test : {
    "manifest": "test-vanguardia/pairs.manifest.json",   # relativa a tests/
    "site_dir": "../../site",                            # relativa a tests/test-vanguardia/
    "port": "4173",
    "locale": "es-CO",
    "timezone": "America/Bogota",
    "viewport_desktop": "1448x1000",
    "viewport_tablet": "768x1024",
    "viewport_mobile": "375x812"
}
```

| Variable | Quién la lee | Qué controla |
| --- | --- | --- |
| `manifest` | `cut-tiles.mjs`, `report.mjs` | ruta del `pairs.manifest.json` cuando no se pasa argumento |
| `site_dir` | `playwright.config.js` | directorio servido por el `webServer` |
| `port` | `playwright.config.js` | puerto del servidor y `baseURL` |
| `locale`, `timezone` | `playwright.config.js` | locale y zona horaria de las capturas |
| `viewport_desktop/tablet/mobile` | `playwright.config.js` | viewports de los proyectos de captura (`ancho x alto`) |

Cómo se toman:

1. Un único loader sin dependencias, `tests/visual/tools/load-test-env.js`,
   extrae el bloque `test : { … }` del `.env` de la raíz (el resto del archivo
   se ignora; si no hay `.env` devuelve `{}`).
2. `playwright.config.js` y los tools aplican **defaults** con los valores
   habituales cuando falta el `.env` o alguna clave → un `.env` incompleto no
   rompe los tests.
3. Precedencia del manifest: **argumento CLI > `test.manifest` (.env)**; sin
   ninguno de los dos, error de uso.
4. Los anchos de `viewport_*` deben existir como claves de `tiles` del manifest
   para los pares `kind: page`.

Reglas: claves agnósticas — no renombrarlas por proyecto —; `.env` nunca se
commitea (esta sección queda documentada aquí, no en el repo).

## Crear el `pairs.manifest.json`

El manifest es un JSON escrito a mano (no hay generador). Va en el lado del
proyecto, junto a `baseline/` y `actual/`. Estructura completa:

```json
{
  "version": 1,
  "tiles": {
    "1440": { "width": 1440, "height": 900 },
    "360": { "width": 360, "height": 800 }
  },
  "policy": { "min_score": 0.9, "max_criticals": 0 },
  "pairs": [
    {
      "id": "<sujeto>-<viewport>",
      "kind": "page",
      "viewport": 1440,
      "baseline": "baseline/<id>.png",
      "actual": "actual/<id>.png",
      "spec": "<ruta-a-la-spec-del-diseno>"
    }
  ]
}
```

| Campo | Qué declara | Quién lo lee |
| --- | --- | --- |
| `version` | Versión del formato (hoy `1`) | — |
| `tiles.<viewport>` | Tamaño del recorte para `kind: page` (clave = viewport como string) | `cut-tiles.mjs` (y valida que el ancho real coincida con `viewport`) |
| `policy.min_score` / `policy.max_criticals` | Política de paso (score 0–1) | `report.mjs` y el juez vía `{{min_score}}`/`{{max_criticals}}` del prompt |
| `pairs[].id` | Identificador único; nombra todas las salidas: `actual/<id>.png`, `reports/tiles/<id>/`, `reports/<id>.md` | todos |
| `pairs[].kind` | `page` \| `component` \| `state` → decide captura (fullPage en todos viewports vs solo desktop) y modo de juzgar (tiles vs imagen entera) | specs del proyecto y juez (matriz kind→criterios de la rúbrica) |
| `pairs[].viewport` | Viewport de la captura; en `page` debe ser clave de `tiles` y coincidir con el ancho real del PNG | `cut-tiles.mjs` |
| `pairs[].baseline` | PNG del diseño, **relativo al directorio del manifest** | `cut-tiles.mjs`, `report.mjs`, juez |
| `pairs[].actual` | PNG de la captura, relativo al manifest | idem |
| `pairs[].spec` | Ruta de la spec de diseño (desde la raíz del repo) que define al sujeto | juez en modo diagnóstico |

Reglas al crearlo/editarlo:

1. **Rutas relativas al manifest**: `baseline/` y `actual/` resuelven junto al
   archivo; `spec` desde la raíz del repo.
2. **`id` único** por par. Las unidades del juez son `<id>` (imagen entera) o
   `<id>#tN` (tile N de una página) — los veredictos en
   `reports/veredictos/` deben usar ese nombre.
3. **`tiles` solo cubre viewports de `kind: page`**; `component`/`state` no
   necesitan entrada de tile.
4. Un par solo es válido si existen **ambos PNG** con el mismo ancho que su
   `viewport` (si no, `cut-tiles` lo `SKIP`/advierte y el juez lo declara
   `par_invalido`).
5. El manifest define la política: para cambiar el criterio de paso se edita
   `policy`, nunca la rúbrica.

## Agregar un par

1. Captura del sujeto en el spec del proyecto → `actual/<id>.png`.
2. Baseline del diseño → `baseline/<id>.png`.
3. Entrada nueva en `pairs`: `id`, `kind`, `viewport`, rutas `baseline`/`actual`
   y `spec` de diseño.
4. Correr el flujo (pasos 1–4) y adjuntar capturas + veredicto JSON en el PR.

## Notas

- `baseline/` se commitea; `actual/` y `reports/` son salidas (gitignored).
- Verificación obligatoria antes de dar una sección por terminada: ver
  [`AGENTS.md`](../../../AGENTS.md) §Verificación.
- Si el harness falla (captura/corte mal hecho): se corrige el harness y se
  repite; no se tacha al sitio.
- Historia y decisiones de diseño del arnés (por qué tiles, triage de pares,
  prompt único, diagnóstico obligatorio): `Especificaciones/docs/Arness/tickets/2-arness-verificacion-visual/`
  (`1-tarea-descripcion.md` §3 y `planes/plan-implementacion.md` §0).
