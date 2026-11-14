#!/usr/bin/env node
// Build del sitio: contenido + SEO + versión en portugués.
//
// Entrada:  site/content/seo.json (configuración, no traducible)
//           site/content/<locale>.json (copy por idioma)
//           site/<pagina>.html (plantilla de cada pantalla)
// Salida:   site/<pagina>.html        (locale base, con bloque SEO)
//           site/pt/<pagina>.html     (misma plantilla, copy y rutas en pt)
//           site/robots.txt, site/sitemap.xml
//
// Idempotente: se puede ejecutar tantas veces como haga falta. El bloque SEO
// vive entre marcadores @seo:start/@seo:end y el selector de idioma entre
// @lang:start/@lang:end; ambos se reemplazan enteros en cada pasada.
// Sale con código 1 si falta una clave, si es/pt no tienen las mismas claves,
// si una página no está declarada en seo.json o si queda un {{…}} sin resolver.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

import { loadJson, lookup, assertParity, hygieneWarnings } from './build/catalog.mjs';
import {
  seoBlock,
  sitemapXml,
  robotsTxt,
  pageLastmod,
  verifySocialImage,
} from './build/seo.mjs';
import {
  setRootAttributes,
  rebaseToSubdir,
  expandSeo,
  expandLangSwitch,
  expandVideo,
  youtubeEmbed,
  injectCopy,
  unresolvedPlaceholders,
  assertSeoBlock,
  assertVideoBlock,
  videoStart,
  versionAssets,
} from './build/pages.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Variante de diseño: `--site=site_v_impeccable` construye otra carpeta con el
// mismo pipeline (copy, pt, SEO, sitemap). Sin argumento se construye `site/`.
const siteArg = process.argv.slice(2).find((arg) => arg.startsWith('--site='));
const siteName = siteArg ? siteArg.slice('--site='.length) : 'site';
const siteDir = join(root, siteName);
const contentDir = join(siteDir, 'content');
if (!existsSync(siteDir)) fail(`no existe la carpeta del sitio: ${siteName}`);

// Huecos de vídeo del sitio. `required` marca los que no tienen contenido de
// reserva: sin URL de YouTube el build falla en vez de publicar el hueco vacío.
const VIDEO_SLOTS = [
  { slot: 'inicio', key: 'video', catalogKey: 'inicio.video.title', required: true },
  { slot: 'unete', key: 'video-unete', catalogKey: 'unete.video.title', required: false },
];

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

// ── Configuración y catálogos ─────────────────────────────────────────────
let seo;
const catalogs = {};
const videos = {};
try {
  seo = loadJson(join(contentDir, 'seo.json'));
  for (const locale of Object.keys(seo.locales)) {
    catalogs[locale] = loadJson(join(contentDir, `${locale}.json`));
  }
  // Los vídeos se toman de enlaces.json: una sola fuente para las URLs de YouTube.
  const enlaces = loadJson(join(contentDir, 'enlaces.json'));
  for (const video of VIDEO_SLOTS) {
    const url = enlaces[video.key];
    videos[video.slot] = { ...video, embedUrl: url ? youtubeEmbed(url) : null };
    if (url && !videos[video.slot].embedUrl) {
      fail(`content/enlaces.json: "${video.key}" no parece una URL de YouTube: ${url}`);
    }
  }
} catch (error) {
  fail(error.message);
}
if (!catalogs[seo.defaultLocale]) {
  fail(`content/seo.json declara defaultLocale "${seo.defaultLocale}" sin catálogo`);
}
if (!/\/$/.test(seo.baseUrl)) fail('content/seo.json: baseUrl debe terminar en "/"');

const locales = Object.keys(seo.locales).map((key) => ({ key, ...seo.locales[key] }));
for (const locale of locales.slice(1)) {
  try {
    assertParity(
      catalogs[seo.defaultLocale],
      catalogs[locale.key],
      `content/${seo.defaultLocale}.json`,
      `content/${locale.key}.json`
    );
  } catch (error) {
    fail(error.message);
  }
}

// ── Páginas: las declaradas en seo.json y las que sobran en site/ ─────────
const declared = seo.pages.map((page) => page.file);
const present = readdirSync(siteDir).filter((name) => name.endsWith('.html')).sort();
const undeclared = present.filter((file) => !declared.includes(file));
if (undeclared.length) {
  fail(
    'estas páginas no están declaradas en content/seo.json (sin declarar no se generan ' +
      `sus metadatos ni entran en el sitemap):\n  ${undeclared.join('\n  ')}`
  );
}
for (const page of seo.pages) {
  page.key = basename(page.file, '.html');
  if (page.slug === undefined) fail(`content/seo.json: la página ${page.file} no tiene "slug"`);
}

try {
  const size = verifySocialImage(siteDir, seo);
  console.log(`imagen social: ${seo.image.path} (${size.width}×${size.height})`);
} catch (error) {
  fail(error.message);
}

// Las plantillas se leen antes de escribir: la copia en pt se deriva de la
// misma fuente, no del HTML ya inyectado en español.
const sources = new Map(
  seo.pages.map((page) => [page.file, readFileSync(join(siteDir, page.file), 'utf8')])
);

// Para versionar los assets: contenido del archivo o null si no existe.
const readAsset = (relativePath) => {
  try {
    return readFileSync(join(siteDir, relativePath));
  } catch {
    return null;
  }
};

// ── Generación por idioma ────────────────────────────────────────────────
let written = 0;
for (const locale of locales) {
  const outDir = join(siteDir, locale.pathPrefix);
  mkdirSync(outDir, { recursive: true });

  for (const page of seo.pages) {
    const copy = {
      title: lookup(catalogs[locale.key], `${page.key}.meta.title`),
      description: lookup(catalogs[locale.key], `${page.key}.meta.description`),
    };
    if (!copy.title) fail(`content/${locale.key}.json: falta "${page.key}.meta.title"`);
    if (!copy.description) fail(`content/${locale.key}.json: falta "${page.key}.meta.description"`);

    let html = sources.get(page.file);
    html = setRootAttributes(html, {
      htmlLang: locale.htmlLang,
      // En /pt/ los JSON de contenido siguen viviendo en site/content/.
      contentBase: locale.pathPrefix ? '../content/' : 'content/',
    });
    if (locale.key !== seo.defaultLocale) html = rebaseToSubdir(html);
    // `?v=<hash>` en CSS y JS: se hace después del rebase para versionar tanto
    // `styles/…` como `../styles/…`.
    html = versionAssets(html, readAsset);
    html = expandSeo(html, seoBlock(seo, locale.key, page, copy));
    html = expandLangSwitch(html, { seo, page, locale: locale.key });
    for (const video of Object.values(videos)) {
      if (!sources.get(page.file).includes(videoStart(video.slot))) continue;
      const videoTitle = lookup(catalogs[locale.key], video.catalogKey);
      try {
        html = expandVideo(html, {
          slot: video.slot,
          embedUrl: video.embedUrl,
          title: videoTitle,
          required: video.required,
        });
        assertVideoBlock(html, `${locale.key}/${page.file}`, video.slot);
      } catch (error) {
        fail(error.message);
      }
    }
    try {
      html = injectCopy(html, catalogs[locale.key], page.file);
    } catch (error) {
      fail(error.message);
    }

    const placeholders = unresolvedPlaceholders(html);
    if (placeholders.length) {
      fail(
        `${locale.key}/${page.file}: quedan placeholders sin resolver: ${placeholders.join(', ')}`
      );
    }
    try {
      assertSeoBlock(html, `${locale.key}/${page.file}`);
    } catch (error) {
      fail(error.message);
    }

    writeFileSync(join(outDir, page.file), html);
    written += 1;
  }
}

// ── robots.txt y sitemap.xml ─────────────────────────────────────────────
// `lastmod` sale de los catálogos y de seo.json: el HTML se regenera en cada
// build y su fecha no dice nada del contenido.
const contentFiles = [
  join(contentDir, 'seo.json'),
  ...Object.keys(seo.locales).map((locale) => join(contentDir, `${locale}.json`)),
];
const sitemap = sitemapXml(seo, () => pageLastmod(contentFiles));
writeFileSync(join(siteDir, 'sitemap.xml'), sitemap);
writeFileSync(join(siteDir, 'robots.txt'), robotsTxt(seo));

// ── Informe ──────────────────────────────────────────────────────────────
const warnings = [];
for (const locale of locales) {
  warnings.push(...hygieneWarnings(catalogs[locale.key], `content/${locale.key}.json`));
}
if (warnings.length) {
  console.warn(`\nAvisos de contenido (${warnings.length}): no rompen el build.`);
  for (const warning of warnings.slice(0, 15)) console.warn(`  - ${warning}`);
  if (warnings.length > 15) console.warn(`  … y ${warnings.length - 15} más`);
}

console.log(
  `OK: ${written} páginas (${locales.map((l) => l.key).join(' + ')}) · ` +
    `${seo.pages.length} URLs × ${locales.length} idiomas en sitemap.xml · dominio ${seo.baseUrl}`
);
