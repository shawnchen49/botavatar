import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { generateAvatar } from '../packages/core/dist/index.js';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../packages/renderer-svg/dist/index.js';
import { renderPng } from '../packages/renderer-png/dist/index.js';
const directory = new URL('../output/stage-3/', import.meta.url);
await mkdir(directory, { recursive: true });
const approved = JSON.parse(
  await readFile(new URL('../tests/snapshots/approved.json', import.meta.url), 'utf8'),
);
let html =
  '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Bot Avatar · Export review</title><style>body{background:#161a14;color:#e8eddf;font:15px system-ui;margin:32px}section{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}figure{margin:0;text-align:center}img{max-width:100%;height:auto}h1{font-size:36px}a{color:#c8e68a}.sizes{display:flex;align-items:end;flex-wrap:wrap;gap:20px}</style><h1>Twenty identities. Ready to export.</h1><p>Approved SVG identities and PNG conversions · manifest ' +
  catalog.version +
  '</p><section>';
for (const [index, item] of approved.items.slice(0, 20).entries()) {
  const result = generateAvatar(item.request, catalog, svgRenderer);
  const name = String(index + 1).padStart(2, '0');
  await writeFile(new URL(`${name}.svg`, directory), result.svg);
  await writeFile(new URL(`${name}.png`, directory), renderPng(result.svg, 256));
  html += `<figure><img src="${name}.png" width="192" height="192" alt="${item.label}"><figcaption>${item.label} · <a href="${name}.svg">SVG</a> / <a href="${name}.png">PNG</a></figcaption></figure>`;
}
html += '</section><h2>Four output sizes</h2><div class="sizes">';
for (const size of [64, 128, 256, 512]) {
  const result = generateAvatar({ ...approved.items[7].request, size }, catalog, svgRenderer);
  await writeFile(new URL(`debug-${size}.png`, directory), renderPng(result.svg, size));
  html += `<figure><img src="debug-${size}.png" width="${size}" height="${size}" alt="Debug at ${size} pixels"><figcaption>${size} px</figcaption></figure>`;
}
await writeFile(new URL('index.html', directory), html + '</div></html>');
console.log('Showcase generated at output/stage-3/index.html');
