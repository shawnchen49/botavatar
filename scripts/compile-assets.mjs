import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve, relative, isAbsolute } from 'node:path';
import { fileURLToPath } from 'node:url';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { validateCatalog } from '../packages/core/dist/index.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const attributes = new Set([
  'x',
  'y',
  'width',
  'height',
  'rx',
  'ry',
  'd',
  'fill',
  'stroke',
  'stroke-width',
  'stroke-linejoin',
  'stroke-linecap',
  'stroke-opacity',
  'fill-opacity',
  'cx',
  'cy',
  'r',
  'x1',
  'x2',
  'y1',
  'y2',
  'points',
]);
export function parseAsset(source) {
  const lucide =
    /^<!-- @license lucide-static v1\.49\.0 - ISC -->\s*<svg\s+class="lucide lucide-[a-z0-9-]+"\s+xmlns="http:\/\/www\.w3\.org\/2000\/svg"\s+width="24"\s+height="24"\s+viewBox="0 0 24 24"\s+fill="none"\s+stroke="currentColor"\s+stroke-width="2"\s+stroke-linecap="round"\s+stroke-linejoin="round"\s*>([\s\S]*)<\/svg>\s*$/u.exec(
      source,
    );
  const match =
    lucide ??
    /^<svg xmlns="http:\/\/www\.w3\.org\/2000\/svg" viewBox="0 0 256 256"(?: fill="currentColor")?>([\s\S]*)<\/svg>\s*$/u.exec(
      source,
    );
  if (!match) throw new Error('Asset must have the canonical SVG root.');
  const body = match[1];
  const nodes = [];
  let cursor = 0;
  const tags = /\s*<(path|rect|circle|line|polyline|polygon)((?:\s+[a-z0-9-]+="[^"]*")+)\s*\/>/gu;
  for (const tag of body.matchAll(tags)) {
    if (tag.index !== cursor) throw new Error('Unsupported asset markup.');
    cursor = tag.index + tag[0].length;
    const attrs = {};
    for (const attr of tag[2].matchAll(/([a-z0-9-]+)="([^"]*)"/gu)) {
      const [, name, value] = attr;
      if (!attributes.has(name) || Object.hasOwn(attrs, name))
        throw new Error('Unsupported or duplicate asset attribute.');
      const valid =
        name === 'd' || name === 'points'
          ? /^[MmLlHhVvCcSsQqTtAaZz0-9., +-]+$/u.test(value)
          : name === 'fill' || name === 'stroke'
            ? /^(?:currentColor|none|#[0-9a-f]{6})$/iu.test(value)
            : name.endsWith('-opacity')
              ? /^(?:0(?:\.\d+)?|1(?:\.0+)?)$/u.test(value)
              : name === 'stroke-linecap'
                ? /^(?:round|butt|square)$/u.test(value)
                : name === 'stroke-linejoin'
                  ? /^(?:round|bevel|miter)$/u.test(value)
                  : /^\d+(?:\.\d+)?$/u.test(value);
      if (!valid) throw new Error(`Invalid asset attribute: ${name}.`);
      attrs[name] = value;
    }
    if (
      source.startsWith(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" fill="currentColor">',
      ) &&
      attrs.fill === undefined
    )
      attrs.fill = 'currentColor';
    if (lucide) {
      Object.assign(attrs, {
        fill: attrs.fill ?? 'none',
        stroke: attrs.stroke ?? 'currentColor',
        'stroke-width': attrs['stroke-width'] ?? '2',
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        transform: `scale(${256 / 24})`,
      });
    }
    if (tag[1] === 'path' && !attrs.d) throw new Error('Path requires geometry.');
    nodes.push({ tag: tag[1], attributes: attrs });
  }
  if (!nodes.length || body.slice(cursor).trim())
    throw new Error('Unsupported or empty asset markup.');
  return nodes;
}
export function verifyAssetProvenance(entry, source) {
  if (entry.permission === 'project-owned') return;
  if (
    !['MIT', 'ISC'].includes(entry.permission) ||
    !entry.upstream ||
    !entry.upstream.package ||
    !entry.upstream.version ||
    !/^https:\/\//u.test(entry.upstream.url)
  )
    throw new Error('Invalid icon provenance.');
  if (createHash('sha256').update(source).digest('hex') !== entry.upstream.sha256)
    throw new Error(`Icon integrity mismatch: ${entry.id}.`);
}
function assetPath(source) {
  const path = resolve(root, source);
  const local = relative(resolve(root, 'assets'), path);
  if (local.startsWith('..') || isAbsolute(local))
    throw new Error('Asset path must stay under assets.');
  return path;
}
export async function compileAssets() {
  validateCatalog(catalog);
  const requiredIcons = new Set([
    ...catalog.templates.map((template) => template.hat.badge),
    ...Object.values(catalog.instanceBadgeAssets),
  ]);
  const assets = {};
  const notices = new Map();
  for (const entry of catalog.assets) {
    if (!entry.creator) throw new Error('Missing asset creator.');
    if (requiredIcons.has(entry.id) && !['MIT', 'ISC'].includes(entry.permission))
      throw new Error('Badges must use licensed upstream icons.');
    const source = await readFile(assetPath(entry.source), 'utf8');
    verifyAssetProvenance(entry, source);
    assets[entry.id] = parseAsset(source);
    if (entry.permission !== 'project-owned') {
      const license = await readFile(assetPath(entry.upstream.licensePath), 'utf8');
      if (!license.includes(`${entry.permission} License`) || !license.includes('Permission'))
        throw new Error('Missing upstream license notice.');
      notices.set(`${entry.upstream.package}@${entry.upstream.version}`, license);
    }
  }
  const notice = [...notices].map(([name, license]) => `${name}\n${license}`).join('\n');
  const destination = resolve(root, 'packages/renderer-svg/src/generated');
  await mkdir(destination, { recursive: true });
  await writeFile(
    resolve(destination, 'assets.ts'),
    `// Generated by scripts/compile-assets.mjs. Do not edit.\nexport const embeddedAssets = ${JSON.stringify(assets)} as const;\nexport const thirdPartyNotice = ${JSON.stringify(notice)};\n`,
  );
  const distribution = resolve(root, 'packages/renderer-svg/dist');
  await mkdir(distribution, { recursive: true });
  await writeFile(resolve(distribution, 'THIRD_PARTY_NOTICES.txt'), notice);
  // The notice also travels in each generated SVG's metadata.
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url))
  await compileAssets();
