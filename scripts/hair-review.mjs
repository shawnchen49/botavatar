import { mkdir, rm, writeFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import { generateAvatar } from '../packages/core/dist/index.js';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../packages/renderer-svg/dist/index.js';
import { renderPng } from '../packages/renderer-png/dist/index.js';

const directory = new URL('../output/hair-review/', import.meta.url);
await rm(directory, { recursive: true, force: true });
await mkdir(directory, { recursive: true });
const sizes = [64, 128, 256, 512];
const states = ['idle', 'working', 'waiting', 'success', 'error', 'offline'];
const hats = [
  ...new Map(catalog.templates.map((template) => [template.hat.type, template])).values(),
];

function avatar(templateId, style, size = 256, state = 'idle') {
  return generateAvatar(
    { templateId, size, state, instance: { hair: { style } } },
    catalog,
    svgRenderer,
  );
}

const overview = new PNG({ width: catalog.hair.length * 256, height: 256 });
const hatMatrix = new PNG({ width: catalog.hair.length * 128, height: hats.length * 128 });
let html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Flat 2D hair review</title><style>body{margin:32px;background:#e8edf0;color:#202d39;font:15px system-ui}h1{font-size:40px;margin-bottom:8px}h2{margin-top:48px}.grid{display:grid;grid-template-columns:repeat(${catalog.hair.length},minmax(150px,1fr));gap:16px}.row{display:flex;align-items:end;gap:14px;flex-wrap:wrap}.card,.sample{background:#687d8b;border-radius:18px}.card{padding:12px;text-align:center;color:white}.card img{width:100%}figure{margin:0}figcaption{padding:7px 0}details{margin:24px 0}summary{cursor:pointer;font-weight:700}@media(max-width:900px){.grid{grid-template-columns:repeat(2,1fr)}}</style><h1>${catalog.hair.length} hairstyles. Reviewed set.</h1><p>Manifest ${catalog.version} · renderer ${svgRenderer.version}. Coder palette is used for the primary comparison; every style is also shown at four native sizes, in six states, and under all nine hat silhouettes.</p><div class="grid">`;

for (const [hairIndex, style] of catalog.hair.entries()) {
  const primary = avatar('coder', style);
  const primaryBytes = Buffer.from(renderPng(primary.svg, 256));
  await writeFile(new URL(`${style}.svg`, directory), primary.svg);
  await writeFile(new URL(`${style}.png`, directory), primaryBytes);
  PNG.bitblt(PNG.sync.read(primaryBytes), overview, 0, 0, 256, 256, hairIndex * 256, 0);
  html += `<article class="card"><img src="${style}.png" width="256" height="256" alt="${style}"><strong>${style}</strong></article>`;
}
await writeFile(new URL('overview.png', directory), PNG.sync.write(overview));
html +=
  '</div><h2>All hairstyles × all hat silhouettes</h2><img class="sample" src="hats.png" alt="All hairstyles under all hat silhouettes">';

for (const [hairIndex, style] of catalog.hair.entries()) {
  html += `<details open><summary>${style}</summary><h2>Native sizes</h2><div class="row">`;
  for (const size of sizes) {
    const result = avatar('coder', style, size);
    const name = `${style}-${size}.png`;
    await writeFile(new URL(name, directory), renderPng(result.svg, size));
    html += `<figure><img class="sample" src="${name}" width="${size}" height="${size}" alt="${style} at ${size}px"><figcaption>${size}px</figcaption></figure>`;
  }
  html += '</div><h2>Six states</h2><div class="row">';
  for (const state of states) {
    const result = avatar('coder', style, 128, state);
    const name = `${style}-${state}.png`;
    await writeFile(new URL(name, directory), renderPng(result.svg, 128));
    html += `<figure><img class="sample" src="${name}" width="128" height="128" alt="${style} ${state}"><figcaption>${state}</figcaption></figure>`;
  }
  html += '</div><h2>Nine hat silhouettes</h2><div class="row">';
  for (const [hatIndex, template] of hats.entries()) {
    const result = avatar(template.id, style, 128);
    const name = `${style}-${template.hat.type}.png`;
    const bytes = Buffer.from(renderPng(result.svg, 128));
    await writeFile(new URL(name, directory), bytes);
    PNG.bitblt(PNG.sync.read(bytes), hatMatrix, 0, 0, 128, 128, hairIndex * 128, hatIndex * 128);
    html += `<figure><img class="sample" src="${name}" width="128" height="128" alt="${style} with ${template.hat.type}"><figcaption>${template.hat.type.replace('hat-', '')}</figcaption></figure>`;
  }
  html += '</div></details>';
}

await writeFile(new URL('hats.png', directory), PNG.sync.write(hatMatrix));
await writeFile(new URL('index.html', directory), `${html}</html>`);
console.log('Hair review generated at output/hair-review/index.html');
