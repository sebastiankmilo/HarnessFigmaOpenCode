// Consolida veredictos + diagnósticos en informes por par y veredicto global.
// Uso (desde tests/visual/): node tools/report.mjs
// Entrada: reports/veredictos/<unidad>.json (comparación)
//          reports/veredictos/<unidad>.diagnostico.json (causa raíz, opcional)
// Salida:  reports/<par>.md  y  reports/veredicto-piloto.json
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIR = path.join(ROOT, 'reports', 'veredictos');
const manifest = JSON.parse(readFileSync(path.join(ROOT, 'pairs.manifest.json'), 'utf8'));
const { policy } = manifest;
const fecha = new Date().toISOString().slice(0, 10);

if (!existsSync(DIR)) {
  console.error('No existe reports/veredictos/ — corrige primero el juez.');
  process.exit(1);
}

const files = readdirSync(DIR).filter((f) => f.endsWith('.json'));
const comps = files.filter((f) => !f.endsWith('.diagnostico.json'));
const diags = files.filter((f) => f.endsWith('.diagnostico.json'));

const parse = (f) => JSON.parse(readFileSync(path.join(DIR, f), 'utf8'));
const porPar = new Map();
for (const f of comps) {
  const v = parse(f);
  const par = v.unidad.split('#')[0];
  if (!porPar.has(par)) porPar.set(par, []);
  porPar.get(par).push({ ...v, archivo: f });
}
const diagPorPar = new Map();
for (const f of diags) {
  const d = parse(f);
  const par = d.unidad.split('#')[0];
  if (!diagPorPar.has(par)) diagPorPar.set(par, []);
  diagPorPar.get(par).push(...(d.diagnosticos || []));
}

const salida = [];
for (const pair of manifest.pairs) {
  const unidades = porPar.get(pair.id);
  if (!unidades) continue;
  unidades.sort((a, b) => a.unidad.localeCompare(b.unidad));
  const scores = unidades.map((u) => u.score);
  const score = Number((scores.reduce((x, y) => x + y, 0) / scores.length).toFixed(3));
  const criticos = unidades.reduce((x, u) => x + (u.criticos || 0), 0);
  const peor = unidades.reduce((m, u) => (u.score < m.score ? u : m), unidades[0]);
  const invalido = unidades.some((u) => u.error === 'par_invalido');
  const veredicto = invalido ? 'PAR_INVALIDO' : criticos <= policy.max_criticals && score >= policy.min_score ? 'APROBADO' : 'RECHAZADO';
  const diagnosticos = diagPorPar.get(pair.id) || [];
  salida.push({ par: pair.id, kind: pair.kind, unidades: unidades.length, score, criticos, peor_unidad: peor.unidad, peor_score: peor.score, veredicto, diagnosticos });

  const md = [
    `# Informe — ${pair.id}`,
    ``,
    `- Fecha: ${fecha} · kind: \`${pair.kind}\` · viewport: ${pair.viewport}`,
    `- Score (media de ${unidades.length} unidad(es)): **${score}** · peor: \`${peor.unidad}\` (${peor.score})`,
    `- Críticos: **${criticos}** · Política: score ≥ ${policy.min_score} y ≤ ${policy.max_criticals} críticos`,
    `- Veredicto: **${veredicto}**`,
    ``,
    `## Unidades`,
    ``,
    `| Unidad | Score | Críticos | Veredicto |`,
    `| --- | --- | --- | --- |`,
    ...unidades.map((u) => `| \`${u.unidad}\` | ${u.score} | ${u.criticos ?? 0} | ${u.veredicto ?? (u.error === 'par_invalido' ? 'PAR_INVALIDO' : '—')} |`),
    ``,
    `## Hallazgos`,
    ``,
    ...unidades.flatMap((u) =>
      (u.criterios || []).flatMap((c) =>
        (c.hallazgos || []).map((h) => `- [\`${u.unidad}\`] **${c.nombre}** · \`${h.severidad}\` — **${h.elemento}**: esperado ${h.esperado}; actual ${h.actual}`),
      ),
    ).concat(unidades.length && !unidades.some((u) => (u.criterios || []).some((c) => (c.hallazgos || []).length)) ? ['- (sin hallazgos)'] : []),
    ``,
    `## Diagnósticos (causa raíz)`,
    ``,
    ...(diagnosticos.length
      ? diagnosticos.flatMap((d) => [
          `### ${d.componente || '—'} → \`${d.clase}\``,
          `- Hallazgo: ${d.hallazgo}`,
          `- Causa raíz: ${d.causa_raiz}`,
          `- Evidencia: ${d.evidencia}`,
          ``,
        ])
      : ['- (pendiente: todo par con score < política requiere diagnóstico)']),
    ``,
    `## Evidencia`,
    ``,
    existsSync(path.join(ROOT, 'reports', 'tiles', pair.id))
      ? `- Tiles: \`reports/tiles/${pair.id}/\` (baseline-NN.png vs actual-NN.png)`
      : `- Sin tiles (kind \`${pair.kind}\`: imagen entera)`,
    `- Imágenes: \`${pair.baseline}\` vs \`${pair.actual}\``,
  ].join('\n');
  writeFileSync(path.join(ROOT, 'reports', `${pair.id}.md`), md);
  console.log(`reports/${pair.id}.md — ${veredicto} (${score})`);
}

const global = {
  fecha,
  policy,
  piloto_cierra: salida.every((s) => s.veredicto === 'APROBADO'),
  pares: salida,
};
writeFileSync(path.join(ROOT, 'reports', 'veredicto-piloto.json'), JSON.stringify(global, null, 2));
console.log(`\nreports/veredicto-piloto.json — piloto cierra: ${global.piloto_cierra}`);
