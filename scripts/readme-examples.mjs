import { mkdtemp, readFile, writeFile, copyFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { format } from 'prettier';
import { generateAvatar } from '../packages/core/dist/index.js';
import { catalog } from '../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../packages/renderer-svg/dist/index.js';
import { renderPng } from '../packages/renderer-png/dist/index.js';
import { captureReadmeStudio } from './readme-studio.mjs';

const root = new URL('../', import.meta.url);
const readJson = async (path) => JSON.parse(await readFile(new URL(path, root), 'utf8'));
const { gallery } = await readJson('examples/readme.json');
const quickStart = await readJson('examples/requests/coder.json');
const states = ['idle', 'working', 'waiting', 'success', 'error', 'offline'];
const images = new Map();
const entries = [];
const escape = (text) =>
  String(text).replace(
    /[&<>"']/g,
    (character) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character],
  );
const name = (id) => id.replace(/^hair-/, '').replaceAll('-', ' ');

function render(file, input) {
  if (!/^[a-z0-9-]+\.png$/.test(file) || images.has(file))
    throw new Error(`Invalid or duplicate README image: ${file}`);
  const request = { ...input, size: 256, format: 'svg' };
  const result = generateAvatar(request, catalog, svgRenderer);
  const png = Buffer.from(renderPng(result.svg, 256));
  images.set(file, png);
  entries.push({ file, request, sha256: createHash('sha256').update(png).digest('hex') });
  return file;
}

function table(cells, width = 148) {
  const rows = [];
  for (let index = 0; index < cells.length; index += 3) {
    const columns = cells.slice(index, index + 3).map(
      ({ file, title, caption }) => `    <td align="center">
      <img src="docs/images/${file}" alt="${escape(title)}" width="${width}" height="${width}"><br>
      <sub><b>${escape(title)}</b><br>${caption}</sub>
    </td>`,
    );
    rows.push(`  <tr>\n${columns.join('\n')}\n  </tr>`);
  }
  return `<table>\n${rows.join('\n')}\n</table>`;
}

if (!Array.isArray(gallery) || gallery.length === 0) throw new Error('Gallery must not be empty.');
const roleCells = gallery.map(({ label, hat, request }) => ({
  file: render(`${request.templateId}.png`, {
    background: 'transparent',
    state: 'idle',
    ...request,
  }),
  title: label,
  caption: `${escape(hat)} · <code>${escape(request.templateId)}</code>`,
}));
const coder = gallery.find((item) => item.request.templateId === 'coder');
if (!coder) throw new Error('Gallery must include coder for the hair and state comparisons.');
const comparison = { ...coder.request, background: 'transparent', state: 'idle' };
const hairCells = catalog.hair.map((style) => ({
  file: render(`${style}.png`, {
    ...comparison,
    instance: { ...comparison.instance, hair: { ...comparison.instance?.hair, style } },
  }),
  title: name(style),
  caption: `<code>${escape(style)}</code>`,
}));
const stateCells = states.map((state) => ({
  file: render(`state-${state}.png`, { ...comparison, state }),
  title: state,
  caption: `<code>${escape(state)}</code>`,
}));
render('coder-terminal.png', quickStart);
const sections = {
  gallery: `256-pixel PNG examples from catalog **${catalog.version}**, rendered with a transparent background. Each role below uses an explicit hairstyle from the current catalog.

${table(roleCells)}

### Hairstyles

All ${catalog.hair.length} hairstyles on the same Coder, with the same hat, hair color, and idle state.

${table(hairCells)}

### Same bot, six states

Coder keeps the same hat and \`${comparison.instance.hair.style}\` hair. Only \`state\` changes.

${table(stateCells, 120)}`,
  'quick-start': `The image above is generated directly from [\`examples/requests/coder.json\`](examples/requests/coder.json): template \`${quickStart.templateId}\`, hair \`${quickStart.instance.hair.style}\`, and a \`${quickStart.instance.instanceBadge.icon}\` instance badge. Omit \`--output\` to print SVG on stdout. The CLI leaves existing files untouched.`,
  catalog: `Manifest **${catalog.version}** in \`packages/design-tokens\` is the current \`${catalog.styleId}\` catalog: ${catalog.templates.length} templates, ${catalog.hair.length} hairstyles (${catalog.hair.map((id) => `\`${id}\``).join(', ')}), and ${states.length} states.`,
};
let readme = await readFile(new URL('README.md', root), 'utf8');
for (const [section, content] of Object.entries(sections)) {
  const start = `<!-- readme:${section}:start -->`;
  const end = `<!-- readme:${section}:end -->`;
  if (readme.split(start).length !== 2 || readme.split(end).length !== 2)
    throw new Error(`README needs exactly one marker pair for ${section}.`);
  const first = readme.indexOf(start);
  const last = readme.indexOf(end);
  if (last < first) throw new Error(`Reversed README markers for ${section}.`);
  readme = `${readme.slice(0, first)}${start}\n\n${content}\n\n${readme.slice(last)}`;
}
readme = await format(readme, { parser: 'markdown', printWidth: 100 });

// Complete generation before replacing any maintained documentation files.
const staging = await mkdtemp(join(tmpdir(), 'bot-avatar-readme-'));
try {
  await captureReadmeStudio(join(staging, 'studio.png'));
  for (const [file, png] of images) await writeFile(new URL(`docs/images/${file}`, root), png);
  await copyFile(join(staging, 'studio.png'), new URL('docs/images/studio.png', root));
  await writeFile(
    new URL('docs/images/readme-manifest.json', root),
    `${JSON.stringify({ manifestVersion: catalog.version, rendererVersion: svgRenderer.version, entries }, null, 2)}\n`,
  );
  await writeFile(new URL('README.md', root), readme);
  console.log(`Updated ${images.size} avatar examples, Studio screenshot, and README sections.`);
} finally {
  await rm(staging, { recursive: true, force: true });
}
