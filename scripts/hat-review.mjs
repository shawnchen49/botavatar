import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import { generateAvatar } from '../packages/core/dist/index.js';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../packages/renderer-svg/dist/index.js';
import { renderPng } from '../packages/renderer-png/dist/index.js';

const directory = new URL('../output/hat-collection/', import.meta.url);
await mkdir(directory, { recursive: true });
const states = ['idle', 'working', 'waiting', 'success', 'error', 'offline'];
const sizes = [64, 128, 256, 512];
const approved = JSON.parse(
  await readFile(new URL('../tests/snapshots/approved.json', import.meta.url), 'utf8'),
);
function sheet(columns, rows, size) {
  return new PNG({ width: columns * size, height: rows * size });
}
function place(target, bytes, column, row, size) {
  PNG.bitblt(
    PNG.sync.read(Buffer.from(bytes)),
    target,
    0,
    0,
    size,
    size,
    column * size,
    row * size,
  );
}
async function saveSheet(name, png) {
  await writeFile(new URL(name, directory), PNG.sync.write(png));
}
const overview = sheet(5, Math.ceil(catalog.templates.length / 5), 256);
const restored = sheet(5, 4, 256);
const additions = sheet(catalog.templates.length - 20, 1, 256);
const before = sheet(5, 4, 256);
const expressions = sheet(6, catalog.templates.length, 128);
const hairColumns = Math.max(...catalog.templates.map((template) => template.allowedHair.length));
const hair = sheet(hairColumns, catalog.templates.length, 128);
let html = `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Occupational hats · Visual review</title><style>body{margin:32px;background:#e8edf0;color:#202d39;font:15px system-ui}h1{font-size:40px;margin-bottom:8px}h2{margin-top:40px}p{max-width:780px;line-height:1.6}.grid{display:grid;grid-template-columns:repeat(5,minmax(120px,1fr));gap:16px}.card{background:#687d8b;border-radius:18px;padding:12px;text-align:center;color:white}.card img{width:100%;max-width:256px}.sizes,.states{display:flex;align-items:end;gap:12px;flex-wrap:wrap}.sample{background:#687d8b;border-radius:16px}figure{margin:0}figcaption{padding:8px 0}summary{cursor:pointer;padding:16px 0;font-weight:600}a{color:inherit}.compare{display:grid;grid-template-columns:1fr 1fr;gap:20px}.compare img{width:100%;background:#687d8b;border-radius:16px}@media(max-width:800px){.grid{grid-template-columns:repeat(2,1fr)}.compare{grid-template-columns:1fr}}</style><h1>Occupational colors. Familiar silhouettes.</h1><p>Original silhouettes, hair defaults, soft paint, and hat-to-hair shadows remain. Occupational palettes use yellow/red hardhats, navy work caps, an olive field hat, a charcoal design beret, a taupe editorial cap, and a leather-brown aviator. Manifest ${catalog.version} · renderer ${svgRenderer.version}. Instance badge improvements remain available.</p><h2>Soft Layered 2D · aviator detail</h2><p>A close-fitting strap, raised frames with a small contact shadow, and softly inset lenses.</p><img class="sample" src="deploy-aviator.svg" width="256" height="256" alt="Aviator cap with layered goggles"><h2>Original twenty · current palette</h2><div class="grid">`;
let details = '';
for (const [index, template] of catalog.templates.entries()) {
  const previous = approved.items.find((item) => item.request.templateId === template.id);
  const request = previous?.request ?? {
    templateId: template.id,
    instance: { hair: { style: 'hair-sweep' } },
  };
  if (index === 20)
    html +=
      '</div><h2>Optional occupational variants</h2><div class="grid" style="grid-template-columns:repeat(4,1fr)">';
  const result = generateAvatar(request, catalog, svgRenderer);
  await writeFile(new URL(`${template.id}.svg`, directory), result.svg);
  html += `<article class="card"><img src="${template.id}.svg" alt="${template.role}"><strong>${template.id}</strong><div>${template.hat.type.replace('hat-', '')}</div></article>`;
  details += `<details><summary>${template.role} · four sizes / six states / all permitted hair</summary><div class="sizes">`;
  for (const size of sizes) {
    const sized = generateAvatar({ ...request, size }, catalog, svgRenderer);
    const bytes = renderPng(sized.svg, size);
    await writeFile(new URL(`${template.id}-${size}.png`, directory), bytes);
    if (size === 256) {
      place(overview, bytes, index % 5, Math.floor(index / 5), size);
      if (index < 20) place(restored, bytes, index % 5, Math.floor(index / 5), size);
      else place(additions, bytes, index - 20, 0, size);
    }
    details += `<figure><img class="sample" src="${template.id}-${size}.png" width="${size}" height="${size}" alt="${template.role} at ${size}px"><figcaption>${size}px</figcaption></figure>`;
  }
  details += '</div><div class="states">';
  for (const [stateIndex, state] of states.entries()) {
    const { svg } = generateAvatar({ ...request, state, size: 128 }, catalog, svgRenderer);
    const bytes = renderPng(svg, 128);
    place(expressions, bytes, stateIndex, index, 128);
    await writeFile(new URL(`${template.id}-${state}.png`, directory), bytes);
    details += `<figure><img class="sample" src="${template.id}-${state}.png" width="128" height="128" alt="${template.role} ${state}"><figcaption>${state}</figcaption></figure>`;
  }
  details += '</div><div class="states">';
  for (const [hairIndex, style] of template.allowedHair.entries()) {
    const { svg } = generateAvatar(
      { templateId: template.id, size: 128, instance: { hair: { style } } },
      catalog,
      svgRenderer,
    );
    const bytes = renderPng(svg, 128);
    place(hair, bytes, hairIndex, index, 128);
    await writeFile(new URL(`${template.id}-${style}.png`, directory), bytes);
    details += `<figure><img class="sample" src="${template.id}-${style}.png" width="128" height="128" alt="${template.role} ${style}"><figcaption>${style}</figcaption></figure>`;
  }
  details += '</div></details>';
  if (previous) {
    const previousSvg = await readFile(
      new URL(`../tests/snapshots/${previous.file}`, import.meta.url),
      'utf8',
    );
    place(before, renderPng(previousSvg, 256), index % 5, Math.floor(index / 5), 256);
  }
  console.log(`Reviewed output: ${template.role}`);
}
await saveSheet('catalog.png', overview);
await saveSheet('restored.png', restored);
await saveSheet('additions.png', additions);
await saveSheet('approved-before.png', before);
await saveSheet('states.png', expressions);
await saveSheet('hair.png', hair);
html += `</div><h2>Approved 1.4.2 / proposed colors</h2><p>Matching requests and hairstyles. The occupational colors are proposed changes to the approved catalog. The red hardhat is a separate template choice; role aliases remain unchanged. Approved snapshots have not been replaced.</p><div class="compare"><figure><img src="approved-before.png" alt="Previously approved catalog"><figcaption>Approved manifest ${approved.manifestVersion}</figcaption></figure><figure><img src="restored.png" alt="Restored original catalog"><figcaption>Proposed manifest ${catalog.version}</figcaption></figure></div><h2>Inspect each identity</h2>${details}</html>`;
await writeFile(new URL('index.html', directory), html);
console.log('Hat review generated at output/hat-collection/index.html');
