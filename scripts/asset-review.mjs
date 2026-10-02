import { mkdir, rm, writeFile } from 'node:fs/promises';
import { PNG } from 'pngjs';
import { generateAvatar } from '../packages/core/dist/index.js';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../packages/renderer-svg/dist/index.js';
import { renderPng } from '../packages/renderer-png/dist/index.js';

const values = (name) => {
  const result = [];
  for (let index = 0; index < process.argv.length; index += 1)
    if (process.argv[index] === name && process.argv[index + 1])
      result.push(process.argv[index + 1]);
  return result;
};
const templates = values('--template');
const hair = values('--hair');
const states = values('--state');
const sizes = values('--size').map(Number);
const selectedTemplates = templates.length ? templates : ['coder'];
const selectedHair = hair.length ? hair : [undefined];
const selectedStates = states.length ? states : ['idle'];
const selectedSizes = sizes.length ? sizes : [64, 256];
if (selectedSizes.some((size) => ![64, 128, 256, 512].includes(size)))
  throw new Error('Review sizes must be 64, 128, 256, or 512.');

const cases = selectedTemplates.flatMap((templateId) =>
  selectedHair.flatMap((style) =>
    selectedStates.flatMap((state) =>
      selectedSizes.map((size) => ({ templateId, style, state, size })),
    ),
  ),
);
if (cases.length > 8)
  throw new Error(`Review is limited to 8 samples; requested ${cases.length}. Narrow the inputs.`);

const directory = new URL('../output/asset-review/', import.meta.url);
await rm(directory, { recursive: true, force: true });
await mkdir(directory, { recursive: true });
const cellSize = Math.max(...selectedSizes);
const columns = Math.min(4, cases.length);
const rows = Math.ceil(cases.length / columns);
const sheet = new PNG({ width: columns * cellSize, height: rows * cellSize });
const manifest = [];

for (const [index, sample] of cases.entries()) {
  const request = {
    templateId: sample.templateId,
    state: sample.state,
    size: sample.size,
    background: 'solid',
    ...(sample.style ? { instance: { hair: { style: sample.style } } } : {}),
  };
  const result = generateAvatar(request, catalog, svgRenderer);
  const png = Buffer.from(renderPng(result.svg, sample.size));
  const stem = [sample.templateId, sample.style, sample.state, sample.size]
    .filter(Boolean)
    .join('-');
  await writeFile(new URL(`${stem}.svg`, directory), result.svg);
  await writeFile(new URL(`${stem}.png`, directory), png);
  const image = PNG.sync.read(png);
  const column = index % columns;
  const row = Math.floor(index / columns);
  PNG.bitblt(
    image,
    sheet,
    0,
    0,
    sample.size,
    sample.size,
    column * cellSize + Math.floor((cellSize - sample.size) / 2),
    row * cellSize + Math.floor((cellSize - sample.size) / 2),
  );
  manifest.push({ index: index + 1, file: `${stem}.png`, request });
}

await writeFile(new URL('review.png', directory), PNG.sync.write(sheet));
await writeFile(
  new URL('review.json', directory),
  `${JSON.stringify(
    { manifestVersion: catalog.version, rendererVersion: svgRenderer.version, samples: manifest },
    null,
    2,
  )}\n`,
);
console.log(`Generated ${cases.length} samples at output/asset-review/review.png`);
