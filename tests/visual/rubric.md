# Rúbrica de paridad diseño ↔ implementación (agnóstica)

Rúbrica **genérica**: sirve en cualquier proyecto. Los datos (pares, tamaños de
rectángulo, política) viven en [`pairs.manifest.json`](./pairs.manifest.json);
el prompt en [`judge-prompt.md`](./judge-prompt.md). Pesos adaptados del método
del proyecto anfitrión (flujo §7.3).

**Política de paso:** la define el manifest (`min_score`, `max_criticals`) — por
defecto **0 hallazgos críticos y score ≥ 0.9**. Todo FAIL lo revisa un humano
antes de aceptarse: los VLM a veces reportan bugs inexistentes. **Nunca se afloja
la rúbrica para pasar.** Baseline y rúbrica **no** se editan para aprobar.

## 1. Cómo evaluar

0. **Triage (cero falsos positivos).** Antes de puntuar: ¿ambas imágenes son el
   **mismo sujeto** (mismo elemento/vista), del **mismo viewport** y del **mismo
   ancho**? Si no: NO emitas hallazgos — devuelve
   `{"unidad": "<id>", "error": "par_invalido", "motivo": "..."}`.
1. **Una unidad por vez**: para `kind: page`, un **tile** (recorte) contra su
   tile de la misma posición; para `kind: component|state`, la imagen entera
   contra la entera. Nunca una página completa de una sola vez.
2. Temperatura 0. **Ignorar**: anti-aliasing, suavizado de fuentes y diferencias
   de render del navegador menores a ~4px.
3. Evaluar **SOLO los criterios asignados al kind** (matriz §6), con la escala
   de §3 y las severidades de §4. El color se juzga como *¿corresponde a un
   token/rol del diseño?*, no como *«el hex exacto renderizado»*.
4. **NO sugieras archivos, cambios ni arreglos.** Tú puntúas e indicas *qué* y
   *dónde*; el *porqué* (causa raíz) lo produce el **modo diagnóstico** del
   prompt, investigando spec y código.
5. Respuesta en JSON (§5).

## 2. Criterios y pesos

| # | Criterio | Peso | Pregunta binaria (pass = sí) |
| --- | --- | --- | --- |
| 1 | Cobertura de componentes | 0.20 | ¿Está presente cada elemento del diseño en la captura? |
| 2 | Layout | 0.18 | ¿Orden, alineación, proporciones y medidas coinciden? |
| 3 | Color | 0.14 | ¿Cada color corresponde a un token/rol del diseño? |
| 4 | Tipografía | 0.12 | ¿Familia, tamaño, peso e interlineado coinciden? |
| 5 | Assets | 0.10 | ¿Iconos/imágenes correctos, completos y en su sitio? |
| 6 | Fidelidad visual global | 0.10 | ¿La captura y el diseño son indistinguibles a distancia normal? |
| 7 | Responsive | 0.08 | ¿La variante de este viewport refleja el diseño de ese viewport? |
| 8 | Interacciones | 0.08 | ¿Los estados visibles (hover/activo/expandido/abierto) coinciden con su diseño? |

Los pesos suman **1.00**.

## 3. Escala por criterio (0–5)

| Score | Significado |
| --- | --- |
| 5 | Sin diferencias relevantes (> ~4px o de token no cuentan) |
| 4 | Diferencias menores, ningún hallazgo `mayor` ni `crítico` |
| 3 | Un hallazgo `mayor` o varios `menor` |
| 1–2 | Varios `mayor` o un `crítico` parcial |
| 0 | Elemento ausente / criterio incumplido por completo |

**Score** = Σ(score_criterio × peso) ÷ 5 → **0–1**. Score de una página con
tiles = media de sus tiles (y se reporta el peor tile).

## 4. Severidades

| Severidad | Definición |
| --- | --- |
| `crítico` | Elemento ausente, orden/jerarquía distinta, color o tipografía fuera de token, interacción rota |
| `mayor` | Desviación clara de medida/alineación (> ~8px o fuera de grid), componente con anatomía incorrecta |
| `menor` | Detalle fino (spacing puntual, sombra, redondeo) sin efecto en la jerarquía |

Solo los `crítico` bloquean el criterio de paso (0 permitidos).

## 5. Formato de salida (JSON)

```json
{
  "unidad": "inicio-1448#t3",
  "kind": "page",
  "criterios": [
    {
      "nombre": "Layout",
      "pass": false,
      "score": 3,
      "hallazgos": [
        { "elemento": "media de la sección Únete", "esperado": "16:9 (792×446)", "actual": "ratio ≈2.1", "severidad": "mayor" }
      ]
    }
  ],
  "criticos": 0,
  "score": 0.86,
  "veredicto": "RECHAZADO"
}
```

- `veredicto` = `"APROBADO"` si cumple la política del manifest; si no, `"RECHAZADO"`.
- **Prohibido** el campo `sugerencia`/`fix`: no se diagnostican archivos aquí.

## 6. Matriz kind → criterios aplicables

| kind | Criterios |
| --- | --- |
| `page` | todos (1–8) |
| `component` | 1–6 (sin `responsive` ni `interacciones`) |
| `state` | 1–6 (sin `responsive`; `interacciones` solo si el estado en sí es interacción, p. ej. modal abierto → sí) |

## 7. Reglas inviolables

1. Este archivo y `baseline/` **no se editan** para aprobar.
2. Hallazgo sin **diagnóstico de causa raíz** (modo diagnóstico del prompt):
   **no se registra** como divergencia.
3. Si el fallo viene del arnés (corte/captura mal hecho): se corrige el arnés y
   se repite; no se tacha al sitio.
