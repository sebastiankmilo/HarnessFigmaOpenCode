#!/usr/bin/env node
// Inyecta site/content/es.json en los HTML de site/.
// Sustituye el contenido de cada elemento con data-i18n="clave" por el texto
// del locale base. Idempotente. Sin dependencias (Node ≥18).
// Sale con código 1 si falta una clave en el JSON o queda algún {{…}} sin resolver.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const siteDir = join(root, 'site');
const localeBase = 'es';
const jsonPath = join(siteDir, 'content', `${localeBase}.json`);

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

let catalog;
try {
  catalog = JSON.parse(readFileSync(jsonPath, 'utf8'));
} catch (error) {
  fail(`no pude leer/parsear ${jsonPath}: ${error.message}`);
}

function lookup(key) {
  let node = catalog;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object') return undefined;
    node = node[part];
  }
  return typeof node === 'string' ? node : undefined;
}

const htmlFiles = readdirSync(siteDir)
  .filter((name) => name.endsWith('.html'))
  .sort();
if (htmlFiles.length === 0) fail(`no hay archivos .html en ${siteDir}`);

const ELEMENT_RE = /<([a-z0-9]+)([^>]*)data-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;
const PLACEHOLDER_RE = /\{\{[^}]*\}\}/g;

let applied = 0;
for (const file of htmlFiles) {
  const path = join(siteDir, file);
  let html = readFileSync(path, 'utf8');
  let fileApplied = 0;

  html = html.replace(ELEMENT_RE, (match, tag, pre, key, post) => {
    const value = lookup(key);
    if (value === undefined) {
      fail(`${file}: la clave "${key}" no existe en content/${localeBase}.json`);
    }
    fileApplied++;
    return `<${tag}${pre}data-i18n="${key}"${post}>${value}</${tag}>`;
  });

  // Safety net: ningún {{…}} puede quedar sin resolver en el HTML servido.
  const residual = [];
  let match;
  PLACEHOLDER_RE.lastIndex = 0;
  while ((match = PLACEHOLDER_RE.exec(html)) !== null) {
    const line = html.slice(0, match.index).split('\n').length;
    residual.push(`${file}:${line} ${match[0]}`);
  }
  if (residual.length > 0) {
    fail(`quedan placeholders sin resolver:\n  ${residual.join('\n  ')}`);
  }

  writeFileSync(path, html);
  applied += fileApplied;
  console.log(`${file}: ${fileApplied} claves inyectadas`);
}

console.log(`OK: ${applied} claves inyectadas en ${htmlFiles.length} archivos (locale base: ${localeBase})`);
