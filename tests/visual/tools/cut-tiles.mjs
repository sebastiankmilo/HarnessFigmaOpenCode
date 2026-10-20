// Corta las páginas en tiles fijos (manifest) y calcula la métrica de altura.
// Uso (desde tests/): node visual/tools/cut-tiles.mjs [ruta/al/pairs.manifest.json]
// Sin argumento usa `test.manifest` del bloque test del .env (raíz del repo).
// El manifest es el único dato de pares: baseline/, actual/ y reports/tiles/
// se resuelven junto al directorio del manifest.
// Sin dependencias nuevas: el recorte se hace con el canvas de Chromium (ya instalado).
import { chromium } from '@playwright/test';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { loadTestEnv } from './load-test-env.js';

const TOOLS_DIR = path.dirname(fileURLToPath(import.meta.url));
const arg = process.argv[2];
const envManifest = loadTestEnv().manifest;
if (!arg && !envManifest) {
  console.error('Uso: node visual/tools/cut-tiles.mjs [ruta/al/pairs.manifest.json] — si se omite, usa test.manifest de .env');
  process.exit(1);
}
const manifestPath = arg ? path.resolve(arg) : path.resolve(TOOLS_DIR, '..', '..', envManifest);
const PROJECT_DIR = path.dirname(manifestPath);
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const OUT = path.join(PROJECT_DIR, 'reports', 'tiles');
const b64 = (p) => `data:image/png;base64,${readFileSync(p).toString('base64')}`;

const browser = await chromium.launch();
const page = await browser.newPage();
const load = async (src) =>
  page.evaluate(async (s) => {
    const img = new Image();
    img.src = s;
    await img.decode();
    return { w: img.naturalWidth, h: img.naturalHeight };
  }, src);
const crop = async (src, y0, h) =>
  page.evaluate(
    async ({ s, y, hh }) => {
      const img = new Image();
      img.src = s;
      await img.decode();
      const c = document.createElement('canvas');
      c.width = img.naturalWidth;
      c.height = hh;
      c.getContext('2d').drawImage(img, 0, y, img.naturalWidth, hh, 0, 0, img.naturalWidth, hh);
      return c.toDataURL('image/png');
    },
    { s: src, y: y0, hh: h },
  );

const resumen = [];
for (const pair of manifest.pairs) {
  if (pair.kind !== 'page') continue;
  const base = path.join(PROJECT_DIR, pair.baseline);
  const act = path.join(PROJECT_DIR, pair.actual);
  if (!existsSync(base) || !existsSync(act)) {
    console.log(`SKIP ${pair.id}: falta baseline o actual`);
    continue;
  }
  const tile = manifest.tiles[String(pair.viewport)];
  const b64b = b64(base);
  const b64a = b64(act);
  const [db, da] = [await load(b64b), await load(b64a)];
  const delta = da.h - db.h;
  const pct = ((delta / db.h) * 100).toFixed(2);
  const advertencias = [];
  if (db.w !== pair.viewport || da.w !== pair.viewport) {
    advertencias.push(`ancho inesperado: baseline=${db.w} actual=${da.w} viewport=${pair.viewport}`);
  }
  const N = Math.ceil(db.h / tile.height);
  const dir = path.join(OUT, pair.id);
  mkdirSync(dir, { recursive: true });
  for (let i = 0; i < N; i++) {
    // bandas proporcionales: extremos siempre alineados, deriva intermedia ≤ delta/2
    const b0 = Math.round((i * db.h) / N);
    const b1 = Math.round(((i + 1) * db.h) / N);
    const a0 = Math.round((i * da.h) / N);
    const a1 = Math.round(((i + 1) * da.h) / N);
    const pb = Buffer.from((await crop(b64b, b0, b1 - b0)).split(',')[1], 'base64');
    const pa = Buffer.from((await crop(b64a, a0, a1 - a0)).split(',')[1], 'base64');
    writeFileSync(path.join(dir, `baseline-${String(i).padStart(2, '0')}.png`), pb);
    writeFileSync(path.join(dir, `actual-${String(i).padStart(2, '0')}.png`), pa);
  }
  const metrics = {
    pair: pair.id,
    viewport: pair.viewport,
    tile,
    baseline: { w: db.w, h: db.h },
    actual: { w: da.w, h: da.h },
    delta_px: delta,
    delta_pct: Number(pct),
    tiles: N,
    advertencias,
    fecha: new Date().toISOString().slice(0, 10),
  };
  writeFileSync(path.join(dir, 'metrics.json'), JSON.stringify(metrics, null, 2));
  resumen.push(metrics);
  console.log(
    `${pair.id}: ${N} tiles (base ${db.h}px → actual ${da.h}px, delta ${delta}px / ${pct}%)${advertencias.length ? ' ⚠ ' + advertencias.join('; ') : ''}`,
  );
}

await browser.close();
writeFileSync(path.join(OUT, 'resumen.json'), JSON.stringify(resumen, null, 2));
console.log(`\nListo: ${resumen.length} páginas cortadas → reports/tiles/`);
