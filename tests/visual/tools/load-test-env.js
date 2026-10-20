// Lee el bloque `test : { ... }` del .env en la raíz del repo y devuelve sus
// variables como objeto plano. Sin dependencias; si no hay .env o no hay
// bloque, devuelve {}. Otras secciones/chaves del .env se ignoran.
const fs = require('node:fs');
const path = require('node:path');

function loadTestEnv(root) {
  const file = path.join(root || path.resolve(__dirname, '..', '..', '..'), '.env');
  let raw;
  try {
    raw = fs.readFileSync(file, 'utf8');
  } catch {
    return {};
  }
  const out = {};
  let inBlock = false;
  for (const line of raw.split('\n')) {
    const s = line.trim();
    if (!s || s.startsWith('#')) continue;
    if (!inBlock) {
      if (/^test\s*[:=]/.test(s)) inBlock = true;
      continue;
    }
    if (s.startsWith('}')) break;
    const body = s.split('#')[0].trim().replace(/,\s*$/, '');
    const m = /^"?([\w-]+)"?\s*[:=]\s*(.+)$/.exec(body);
    if (m) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

module.exports = { loadTestEnv };
