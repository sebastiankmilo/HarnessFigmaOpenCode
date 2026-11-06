// Carga y validación de los catálogos de contenido (content/<locale>.json).
// No conoce el sitio: solo JSON, claves y paridad entre idiomas.
import { readFileSync } from 'node:fs';

/** Lee y parsea un JSON; el error dice qué archivo falló. */
export function loadJson(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    throw new Error(`no pude leer/parsear ${path}: ${error.message}`);
  }
}

/** Aplana el árbol a un Map "a.b.0.c" -> valor, para comparar catálogos. */
export function flatten(node, prefix = '', out = new Map()) {
  if (node === null || typeof node !== 'object') {
    out.set(prefix, node);
  } else if (Array.isArray(node)) {
    node.forEach((value, index) => flatten(value, `${prefix}.${index}`, out));
  } else {
    for (const [key, value] of Object.entries(node)) {
      flatten(value, prefix ? `${prefix}.${key}` : key, out);
    }
  }
  return out;
}

/** Valor de una clave punteada; solo devuelve strings (el HTML inyecta texto). */
export function lookup(catalog, key) {
  let node = catalog;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object') return undefined;
    node = node[part];
  }
  return typeof node === 'string' ? node : undefined;
}

/**
 * Falla si dos catálogos no tienen exactamente las mismas claves.
 * Es la garantía de que una corrección de texto en un idioma no deja al otro
 * mostrando el texto del primero (i18n.js conserva el texto si falta la clave).
 */
export function assertParity(base, other, baseLabel, otherLabel) {
  const baseKeys = new Set(flatten(base).keys());
  const otherKeys = new Set(flatten(other).keys());
  const missing = [...baseKeys].filter((key) => !otherKeys.has(key));
  const extra = [...otherKeys].filter((key) => !baseKeys.has(key));
  if (!missing.length && !extra.length) return;

  const list = (keys) => keys.slice(0, 20).map((key) => `    - ${key}`).join('\n');
  const report = [];
  if (missing.length) {
    report.push(`  faltan en ${otherLabel} (${missing.length}):\n${list(missing)}`);
  }
  if (extra.length) {
    report.push(`  sobran en ${otherLabel} (${extra.length}):\n${list(extra)}`);
  }
  throw new Error(
    `${baseLabel} y ${otherLabel} deben tener las mismas claves.\n${report.join('\n')}`
  );
}

/** Avisos de higiene del texto: no rompen el build, pero ensucian el contenido. */
export function hygieneWarnings(catalog, label) {
  const warnings = [];
  for (const [key, value] of flatten(catalog)) {
    if (typeof value !== 'string' || !value) continue;
    if (/[^\n] {2,}[^\n]/.test(value)) warnings.push(`${label}: ${key} tiene doble espacio`);
    if (/^ | $/.test(value)) warnings.push(`${label}: ${key} tiene espacio al inicio o al final`);
    if (/\n{3,}/.test(value)) warnings.push(`${label}: ${key} tiene 3+ saltos de línea seguidos`);
  }
  return warnings;
}
