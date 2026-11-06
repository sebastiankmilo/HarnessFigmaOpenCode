// Transformaciones de una página HTML: atributos del <html>, rutas para la
// copia en /pt/, bloque SEO, selector de idioma, vídeo, assets y copy.
// Funciones puras: reciben HTML y devuelven HTML.
import { createHash } from 'node:crypto';
import { SEO_START, escapeAttr } from './seo.mjs';
import { lookup } from './catalog.mjs';

export const LANG_START = '<!-- @lang:start -->';
export const LANG_END = '<!-- @lang:end -->';

/**
 * Marcadores del bloque de vídeo. Cada hueco lleva nombre (`inicio`, `unete`)
 * porque una página puede tener más de un reproductor; el build sustituye solo
 * el suyo.
 */
export const videoStart = (slot) => `<!-- @video:start:${slot}`;
export const videoEnd = (slot) => `<!-- @video:end:${slot} -->`;

/** Etiquetas cuyo texto se sustituye por el catálogo. */
const ELEMENT_RE = /<([a-z0-9]+)([^>]*)data-i18n="([^"]+)"([^>]*)>([\s\S]*?)<\/\1>/g;

/**
 * URL de incrustación a partir de una URL de YouTube. Devuelve null si no se
 * reconoce el formato: el build prefiere fallar a publicar un reproductor roto.
 */
export function youtubeEmbed(url) {
  if (!url) return null;
  const match = String(url).match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:[^#]*&)?v=|embed\/|shorts\/|live\/))([A-Za-z0-9_-]{11})/
  );
  if (!match) return null;
  const params = new URLSearchParams({ rel: '0' });
  // `?t=1s` del enlace original se conserva como `start=1` del reproductor.
  const start = String(url).match(/[?&](?:t|start)=(\d+)s?/);
  if (start) params.set('start', start[1]);
  return `https://www.youtube-nocookie.com/embed/${match[1]}?${params.toString()}`;
}

/**
 * Sustituye el hueco `slot` por el reproductor de YouTube incrustado. El
 * `title` es el nombre accesible del iframe y va traducido desde el catálogo.
 *
 * `required` distingue los dos casos del diseño: en `inicio` el hueco no tiene
 * contenido de reserva (sin URL no hay nada que enseñar, así que el build
 * falla), mientras que en `unete` el diseño trae una imagen con play y se
 * conserva hasta que haya vídeo.
 */
export function expandVideo(html, { slot, embedUrl, title, required }) {
  const marker = new RegExp(
    `([ \\t]*)${videoStart(slot)}[\\s\\S]*?${videoEnd(slot).replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`
  );
  if (!marker.test(html)) return html;
  if (!embedUrl) {
    if (required) {
      throw new Error(
        `content/enlaces.json: falta la URL de YouTube del vídeo "${slot}" o no se reconoce`
      );
    }
    return html;
  }
  if (!title) throw new Error(`falta el título accesible del vídeo "${slot}" en el catálogo`);
  const attrs = [
    'class="media__iframe"',
    `src="${escapeAttr(embedUrl)}"`,
    `title="${escapeAttr(title)}"`,
    'loading="lazy"',
    'referrerpolicy="strict-origin-when-cross-origin"',
    'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"',
    'allowfullscreen',
  ].join(' ');
  return html.replace(marker, (_match, indent) => {
    const pad = indent || '';
    return [
      `${pad}${videoStart(slot)} · generado por scripts/inject-content.mjs desde content/enlaces.json -->`,
      `${pad}<iframe ${attrs}></iframe>`,
      `${pad}${videoEnd(slot)}`,
    ].join('\n');
  });
}

/** El hueco del vídeo no debe quedar duplicado ni a medias. */
export function assertVideoBlock(html, file, slot) {
  const starts = html.split(videoStart(slot)).length - 1;
  const ends = html.split(videoEnd(slot)).length - 1;
  if (starts !== 1 || ends !== 1) {
    throw new Error(
      `${file}: bloque de vídeo "${slot}" incompleto (${starts} inicio(s), ${ends} fin(es))`
    );
  }
}

/** Ajusta <html lang> y la base de contenido ("content/" o "../content/"). */
export function setRootAttributes(html, { htmlLang, contentBase }) {
  return html.replace(/<html\b[^>]*>/, (tag) => {
    const clean = tag
      .replace(/\s+lang="[^"]*"/g, '')
      .replace(/\s+data-content-base="[^"]*"/g, '');
    return clean.replace(
      /^<html/,
      `<html lang="${htmlLang}" data-content-base="${contentBase}"`
    );
  });
}

/** Reescribe rutas locales para una página servida desde un subdirectorio. */
export function rebaseToSubdir(html) {
  return html.replace(
    /(\s(?:src|href|srcset)=")(assets|styles|scripts)\//g,
    '$1../$2/'
  );
}

/**
 * Reemplaza el bloque SEO entre marcadores. Si la página aún no los tiene,
 * los inserta justo después del viewport.
 */
export function expandSeo(html, block) {
  const marked = /[ \t]*<!-- @seo:start[\s\S]*?<!-- @seo:end -->/;
  if (marked.test(html)) return html.replace(marked, () => block);
  return html.replace(/(\n[ \t]*<meta name="viewport"[^>]*>)/, (match) => `${match}\n${block}`);
}

/** Enlace entre la página actual y la misma página en otro idioma. */
function localeHref(seo, page, targetLocale, currentLocale) {
  const targetPrefix = seo.locales[targetLocale].pathPrefix;
  const currentPrefix = seo.locales[currentLocale].pathPrefix;
  if (targetLocale === currentLocale) return page.file;
  // De /pt/ al locale base se sube un nivel; del locale base a /pt/ se baja.
  return currentPrefix && !targetPrefix
    ? `../${page.file}`
    : `${targetPrefix}${page.file}`;
}

/**
 * Regenera el interior de cada selector de idioma (nav y menú móvil) con
 * enlaces reales: son navegables por un crawler y llevan hreflang propio.
 */
export function expandLangSwitch(html, { seo, page, locale }) {
  const render = (indent) => {
    const items = [];
    Object.keys(seo.locales).forEach((targetLocale, index) => {
      if (index > 0) {
        items.push(`${indent}<span class="site-nav__lang-sep" aria-hidden="true">/</span>`);
      }
      const active = targetLocale === locale;
      const label = targetLocale.toUpperCase();
      const attrs = [
        'class="site-nav__lang-btn' + (active ? ' is-active' : '') + '"',
        `data-lang="${targetLocale}"`,
        `lang="${seo.locales[targetLocale].htmlLang}"`,
        `hreflang="${seo.locales[targetLocale].htmlLang}"`,
        `href="${localeHref(seo, page, targetLocale, locale)}"`,
        active ? 'aria-current="true"' : '',
      ]
        .filter(Boolean)
        .join(' ');
      items.push(`${indent}<a ${attrs}>${label}</a>`);
    });
    return items.join('\n');
  };

  const marker = /([ \t]*)<!-- @lang:start -->[\s\S]*?<!-- @lang:end -->/g;
  return html.replace(marker, (_match, indent) => {
    const pad = indent || '';
    return `${pad}${LANG_START}\n${render(pad)}\n${pad}${LANG_END}`;
  });
}

/** Sustituye el interior de cada elemento data-i18n por su texto del catálogo. */
export function injectCopy(html, catalog, file) {
  return html.replace(ELEMENT_RE, (match, tag, pre, key, post) => {
    const value = lookup(catalog, key);
    if (value === undefined) {
      throw new Error(`${file}: la clave "${key}" no existe en el catálogo de este idioma`);
    }
    return `<${tag}${pre}data-i18n="${key}"${post}>${value}</${tag}>`;
  });
}

/**
 * Añade `?v=<hash>` a los CSS y JS propios. Sin esto, tras un deploy el
 * navegador puede seguir ejecutando la versión anterior del script (el HTML
 * cambia, la URL del asset no) y el sitio se comporta como hace días.
 * El hash es del contenido, así que la reescritura es idempotente.
 */
export function versionAssets(html, readAsset) {
  const versioned = new Map();
  const versionOf = (path) => {
    if (!versioned.has(path)) {
      const clean = path.replace(/^\.\.\//, '');
      const content = readAsset(clean);
      versioned.set(path, content === null ? null : createHash('sha1').update(content).digest('hex').slice(0, 8));
    }
    return versioned.get(path);
  };

  return html.replace(
    /(\s(?:href|src)=")((?:\.\.\/)?(?:styles|scripts|assets\/vendor)\/[^"?]+\.(?:css|js))(?:\?v=[0-9a-f]+)?(")/g,
    (match, pre, path, post) => {
      const hash = versionOf(path);
      return hash ? `${pre}${path}?v=${hash}${post}` : match;
    }
  );
}

/** Placeholders sin resolver: el HTML publicado nunca debe tenerlos. */
export function unresolvedPlaceholders(html) {
  return html.match(/\{\{[^}]*\}\}/g) || [];
}

/** El bloque SEO no debe quedar duplicado ni a medias. */
export function assertSeoBlock(html, file) {
  const starts = html.split(SEO_START).length - 1;
  const ends = html.split('<!-- @seo:end -->').length - 1;
  if (starts !== 1 || ends !== 1) {
    throw new Error(`${file}: bloque SEO incompleto (${starts} inicio(s), ${ends} fin(es))`);
  }
}
