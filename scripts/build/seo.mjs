// Metadatos de indexabilidad: bloque <head> por página/idioma, sitemap y robots.
// Todo se genera desde content/seo.json + los catálogos, así que no hay
// metadatos escritos a mano en los HTML (ni duplicados entre páginas).
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

export const SEO_START = '<!-- @seo:start';

/** Escapa un valor para usarlo dentro de un atributo HTML. */
export function escapeAttr(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** URL absoluta y canónica de una página en un idioma. */
export function pageUrl(seo, locale, page) {
  return seo.baseUrl + seo.locales[locale].pathPrefix + page.slug;
}

const alternates = (seo, page) =>
  Object.keys(seo.locales).map((locale) => ({
    locale,
    hreflang: seo.locales[locale].htmlLang,
    href: pageUrl(seo, locale, page),
  }));

/** JSON-LD: organización, sitio y la página. Se repite en cada URL para que
 *  cada documento sea autocontenido (sin referencias a nodos de otra página). */
function jsonLd(seo, locale, page, copy, url) {
  const orgId = `${seo.baseUrl}#organizacion`;
  const siteId = `${seo.baseUrl}#sitio`;
  const graph = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: seo.siteName,
      url: seo.baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${seo.baseUrl}assets/icons/logo-color.png`,
      },
      sameAs: seo.socials,
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      url: seo.baseUrl,
      name: seo.siteName,
      inLanguage: seo.locales[locale].htmlLang,
      publisher: { '@id': orgId },
    },
    {
      '@type': 'WebPage',
      '@id': `${url}#pagina`,
      url,
      name: copy.title,
      description: copy.description,
      inLanguage: seo.locales[locale].htmlLang,
      isPartOf: { '@id': siteId },
      about: { '@id': orgId },
    },
  ];
  const json = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2);
  // `</` cerraría el <script> antes de tiempo.
  return json
    .replace(/</g, '\\u003c')
    .split('\n')
    .map((line) => `  ${line}`)
    .join('\n');
}

/**
 * Bloque completo de <head> entre los marcadores @seo:start/@seo:end.
 * Se reemplaza entero en cada build, así que es idempotente.
 */
export function seoBlock(seo, locale, page, copy) {
  const loc = seo.locales[locale];
  const url = pageUrl(seo, locale, page);
  const image = `${seo.baseUrl}${seo.image.path}`;
  const others = alternates(seo, page).filter((alt) => alt.locale !== locale);
  const lines = [
    '  <!-- @seo:start · generado por scripts/inject-content.mjs desde content/seo.json y content/<locale>.json; no editar a mano -->',
    `  <meta name="description" content="${escapeAttr(copy.description)}">`,
    '  <meta name="robots" content="index, follow, max-image-preview:large">',
    `  <meta name="theme-color" content="${escapeAttr(seo.themeColor)}">`,
    `  <link rel="canonical" href="${escapeAttr(url)}">`,
    ...alternates(seo, page).map(
      (alt) => `  <link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}">`
    ),
    `  <link rel="alternate" hreflang="x-default" href="${escapeAttr(pageUrl(seo, seo.defaultLocale, page))}">`,
    '  <meta property="og:type" content="website">',
    `  <meta property="og:site_name" content="${escapeAttr(seo.siteName)}">`,
    `  <meta property="og:locale" content="${escapeAttr(loc.ogLocale)}">`,
    ...others.map(
      (alt) =>
        `  <meta property="og:locale:alternate" content="${escapeAttr(seo.locales[alt.locale].ogLocale)}">`
    ),
    `  <meta property="og:title" content="${escapeAttr(copy.title)}">`,
    `  <meta property="og:description" content="${escapeAttr(copy.description)}">`,
    `  <meta property="og:url" content="${escapeAttr(url)}">`,
    `  <meta property="og:image" content="${escapeAttr(image)}">`,
    `  <meta property="og:image:type" content="${escapeAttr(seo.image.type)}">`,
    `  <meta property="og:image:width" content="${seo.image.width}">`,
    `  <meta property="og:image:height" content="${seo.image.height}">`,
    `  <meta property="og:image:alt" content="${escapeAttr(seo.image.alt)}">`,
    '  <meta name="twitter:card" content="summary_large_image">',
    `  <meta name="twitter:title" content="${escapeAttr(copy.title)}">`,
    `  <meta name="twitter:description" content="${escapeAttr(copy.description)}">`,
    `  <meta name="twitter:image" content="${escapeAttr(image)}">`,
    '  <script type="application/ld+json">',
    jsonLd(seo, locale, page, copy, url),
    '  </script>',
    '  <!-- @seo:end -->',
  ];
  return lines.join('\n');
}

/**
 * Fecha (YYYY-MM-DD) del cambio más reciente del contenido que alimenta la
 * página. Se miran los catálogos y seo.json, no el HTML: el HTML se reescribe
 * en cada build y su mtime no informa de nada.
 */
export function pageLastmod(files) {
  let latest = 0;
  for (const file of files) {
    try {
      latest = Math.max(latest, statSync(file).mtimeMs);
    } catch {
      /* archivo opcional ausente: se ignora */
    }
  }
  return new Date(latest || Date.now()).toISOString().slice(0, 10);
}

/** sitemap.xml con los pares de idioma declarados por hreflang. */
export function sitemapXml(seo, lastmodByPage) {
  const entries = [];
  for (const page of seo.pages) {
    for (const locale of Object.keys(seo.locales)) {
      const alts = alternates(seo, page)
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${escapeAttr(alt.href)}"/>`
        )
        .join('\n');
      entries.push(
        [
          '  <url>',
          `    <loc>${escapeAttr(pageUrl(seo, locale, page))}</loc>`,
          `    <lastmod>${lastmodByPage(page)}</lastmod>`,
          `    <changefreq>${page.changefreq}</changefreq>`,
          `    <priority>${page.priority}</priority>`,
          alts,
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeAttr(
            pageUrl(seo, seo.defaultLocale, page)
          )}"/>`,
          '  </url>',
        ].join('\n')
      );
    }
  }
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');
}

export function robotsTxt(seo) {
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${seo.baseUrl}sitemap.xml`,
    '',
  ].join('\n');
}

/** Comprueba que la imagen social existe y tiene el tamaño declarado. */
export function verifySocialImage(siteDir, seo) {
  const path = join(siteDir, seo.image.path);
  let buffer;
  try {
    buffer = readFileSync(path);
  } catch {
    throw new Error(`falta la imagen social ${path} (declarada en content/seo.json)`);
  }
  if (!buffer.length) throw new Error(`la imagen social ${path} está vacía`);
  const actual = imageSize(buffer);
  if (actual && (actual.width !== seo.image.width || actual.height !== seo.image.height)) {
    throw new Error(
      `content/seo.json declara ${seo.image.width}×${seo.image.height} pero ${seo.image.path} mide ${actual.width}×${actual.height}`
    );
  }
  return actual;
}

/** Tamaño de JPEG/PNG leyendo solo la cabecera (sin dependencias). */
export function imageSize(buffer) {
  // PNG: IHDR
  if (buffer[0] === 0x89 && buffer[1] === 0x50) {
    return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  }
  // JPEG: buscar SOF0/SOF2
  if (buffer[0] === 0xff && buffer[1] === 0xd8) {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) return null;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      }
      offset += 2 + length;
    }
  }
  return null;
}
