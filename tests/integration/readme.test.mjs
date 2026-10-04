import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { generateAvatar } from '../../packages/core/dist/index.js';
import { catalog } from '../../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../../packages/renderer-svg/dist/index.js';
import { renderPng } from '../../packages/renderer-png/dist/index.js';

const root = new URL('../../', import.meta.url);
const readJson = (path) => JSON.parse(readFileSync(new URL(path, root), 'utf8'));
const manifest = readJson('docs/images/readme-manifest.json');

describe('maintained README examples', () => {
  it('matches current catalog and renderer versions', () => {
    expect(manifest.manifestVersion).toBe(catalog.version);
    expect(manifest.rendererVersion).toBe(svgRenderer.version);
  });

  it.each(manifest.entries)('renders $file to the committed PNG', (entry) => {
    const png = readFileSync(new URL(`docs/images/${entry.file}`, root));
    const result = generateAvatar(entry.request, catalog, svgRenderer);
    expect(createHash('sha256').update(png).digest('hex'), entry.file).toBe(entry.sha256);
    expect(png.equals(Buffer.from(renderPng(result.svg, 256))), entry.file).toBe(true);
  });

  it('covers the configured roles and the runnable quick start', () => {
    const files = new Set(manifest.entries.map((entry) => entry.file));
    for (const { request } of readJson('examples/readme.json').gallery)
      expect(
        manifest.entries.find((entry) => entry.file === `${request.templateId}.png`).request,
      ).toMatchObject(request);
    expect(
      manifest.entries.find((entry) => entry.file === 'coder-terminal.png').request,
    ).toMatchObject(readJson('examples/requests/coder.json'));
    const readme = readFileSync(new URL('README.md', root), 'utf8');
    for (const file of files) expect(readme).toContain(`docs/images/${file}`);
  });

  it('keeps catalog inventories out of the public READMEs', () => {
    const generator = readFileSync(new URL('scripts/readme-examples.mjs', root), 'utf8');
    expect(generator).not.toContain('catalog.hair');
    for (const name of ['README.md', 'README.zh-CN.md']) {
      const readme = readFileSync(new URL(name, root), 'utf8');
      expect(readme, name).not.toContain('<!-- readme:catalog:');
      expect(readme, name).not.toContain(catalog.version);
      expect(readme, name).not.toContain('pnpm docs:readme');
      expect(readme, name).not.toContain('pnpm check');
      expect(readme, name).toContain('docs/architecture.md');
      expect(readme, name).toContain('soft-layered-2d');
      expect(readme, name).toContain('docs/images/studio.png');
      expect(readme, name).toContain('pnpm avatar --batch examples/requests/batch.json');
      expect(readme, name).toContain('pnpm avatar --help');
      expect(readme, name).toContain('pnpm studio');
    }
  });
});
