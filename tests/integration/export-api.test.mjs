import { describe, it, expect } from 'vitest';
import { readFileSync, mkdtempSync, writeFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { PNG } from 'pngjs';
import { generateAvatar, parseAvatarBatch } from '../../packages/core/dist/index.js';
import { catalog } from '../../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../../packages/renderer-svg/dist/index.js';
import { renderPng } from '../../packages/renderer-png/dist/index.js';
import { createApp } from '../../apps/api/dist/index.js';
const request = { templateId: 'coder', instance: { seed: 'fixed' } };
const generate = (input) => generateAvatar(input, catalog, svgRenderer);
const cli = resolve('apps/cli/dist/main.js');

describe('approved visual baseline', () => {
  const manifest = JSON.parse(
    readFileSync(new URL('../snapshots/approved.json', import.meta.url), 'utf8'),
  );
  for (const item of manifest.items.filter((item) => item.request))
    it(`preserves approved ${item.label}`, () => {
      const approved = readFileSync(new URL(`../snapshots/${item.file}`, import.meta.url), 'utf8');
      expect(generate(item.request).svg.trim()).toBe(approved.trim());
    });
});
describe('PNG export', () => {
  for (const size of [64, 128, 256, 512])
    it(`renders ${size}px with transparency and repeatable bytes`, () => {
      const svg = generate({ ...request, size }).svg;
      const bytes = renderPng(svg, size);
      expect(bytes).toEqual(renderPng(svg, size));
      const png = PNG.sync.read(Buffer.from(bytes));
      expect([png.width, png.height]).toEqual([size, size]);
      expect(png.data[3]).toBe(0);
      expect([...png.data].some((v, i) => i % 4 === 3 && v === 255)).toBe(true);
    });
  it('preserves identity across output formats and distinct resource keys', () => {
    const svg = generate(request),
      png = generate({ ...request, format: 'png' });
    expect(png.avatar).toEqual({ ...svg.avatar, format: 'png' });
    expect(png.svg).toBe(svg.svg);
    expect(png.resourceKey).not.toBe(svg.resourceKey);
    expect(() => renderPng('<svg><image href="file:///secret"/></svg>', 256)).toThrow();
    expect(() => renderPng(svg.svg, 1024)).toThrow();
  });
  it('renders opaque backgrounds and label content', () => {
    const svg = generate({
      ...request,
      background: 'solid',
      instance: { instanceBadge: { icon: 'check', color: 'teal', label: 'OK' } },
    }).svg;
    const png = PNG.sync.read(Buffer.from(renderPng(svg, 256)));
    expect(png.data[128 * 4 + 3]).toBe(255); // Rounded backgrounds retain transparent corners.
  });
});
describe('batch CLI', () => {
  it('exports mixed formats with hashes and refuses collisions or invalid batches', () => {
    const root = mkdtempSync(join(tmpdir(), 'avatar-batch-'));
    try {
      const input = join(root, 'input.json'),
        out = join(root, 'batch');
      writeFileSync(input, JSON.stringify([request, { ...request, format: 'png', size: 64 }]));
      const result = spawnSync(process.execPath, [cli, '--batch', input, '--output-dir', out]);
      expect(result.status, result.stderr.toString()).toBe(0);
      const manifest = JSON.parse(readFileSync(join(out, 'manifest.json'), 'utf8'));
      expect(manifest.entries).toHaveLength(2);
      for (const entry of manifest.entries)
        expect(
          createHash('sha256')
            .update(readFileSync(join(out, entry.file)))
            .digest('hex'),
        ).toBe(entry.sha256);
      expect(readFileSync(join(out, '001.svg'), 'utf8')).toBe(generate(request).svg);
      expect(spawnSync(process.execPath, [cli, '--batch', input, '--output-dir', out]).status).toBe(
        1,
      );
      writeFileSync(input, JSON.stringify([request, { templateId: 'missing' }]));
      expect(
        spawnSync(process.execPath, [cli, '--batch', input, '--output-dir', join(root, 'invalid')])
          .status,
      ).toBe(2);
      expect(existsSync(join(root, 'invalid'))).toBe(false);
      for (const value of [[], Array(101).fill(request), {}, null])
        expect(() => parseAvatarBatch(value)).toThrow();
    } finally {
      rmSync(root, { recursive: true, force: true });
    }
  });
});
describe('HTTP boundary', () => {
  it('matches CLI bytes, supports metadata, and maps input errors', async () => {
    const app = createApp();
    try {
      for (const path of ['/health', '/v1/templates', '/v1/styles', '/v1/states'])
        expect((await app.inject({ url: path })).statusCode).toBe(200);
      expect((await app.inject({ url: '/v1/styles' })).json().styles[0].id).toBe('soft-layered-2d');
      for (const format of ['svg', 'png']) {
        const input = { ...request, format };
        const response = await app.inject({ method: 'POST', url: '/v1/avatar', payload: input });
        expect(response.statusCode).toBe(200);
        const root = mkdtempSync(join(tmpdir(), 'avatar-cli-'));
        try {
          const file = join(root, 'request.json');
          writeFileSync(file, JSON.stringify(input));
          const result = spawnSync(process.execPath, [cli, '--request', file]);
          expect(result.status).toBe(0);
          expect(result.stdout).toEqual(response.rawPayload);
        } finally {
          rmSync(root, { recursive: true, force: true });
        }
      }
      expect(
        (
          await app.inject({
            method: 'POST',
            url: '/v1/avatar',
            payload: { templateId: 'missing' },
          })
        ).statusCode,
      ).toBe(400);
      expect(
        (
          await app.inject({
            method: 'POST',
            url: '/v1/avatar',
            headers: { 'content-type': 'application/json' },
            payload: '{',
          })
        ).statusCode,
      ).toBe(400);
      expect(
        (
          await app.inject({
            method: 'POST',
            url: '/v1/avatar',
            payload: { templateId: 'a'.repeat(1_048_577) },
          })
        ).statusCode,
      ).toBe(413);
      expect(
        (
          await app.inject({
            method: 'POST',
            url: '/v1/avatar/batch',
            payload: Array(101).fill(request),
          })
        ).statusCode,
      ).toBe(400);
      const batch = await app.inject({
        method: 'POST',
        url: '/v1/avatar/batch',
        payload: [request, { ...request, format: 'png' }],
      });
      expect(batch.statusCode).toBe(200);
      expect(batch.json().entries).toHaveLength(2);
      expect(Buffer.from(batch.json().entries[0].data, 'base64').toString()).toBe(
        generate(request).svg,
      );
    } finally {
      await app.close();
    }
  });
  it('resolves immutable known instances and validates cache conditions', async () => {
    const config = { bot: request };
    const app = createApp({ instances: config });
    config.bot = { templateId: 'unknown' };
    try {
      const first = await app.inject({ url: '/v1/avatar/bot.svg' });
      expect(first.statusCode).toBe(200);
      expect(first.body).toBe(generate(request).svg);
      expect(
        (
          await app.inject({
            url: '/v1/avatar/bot.svg',
            headers: { 'if-none-match': `W/${first.headers.etag}` },
          })
        ).statusCode,
      ).toBe(304);
      const changed = await app.inject({ url: '/v1/avatar/bot.svg?state=working&size=64' });
      expect(changed.statusCode).toBe(200);
      expect(changed.headers.etag).not.toBe(first.headers.etag);
      for (const suffix of ['?size=65', '?state=bad', '?templateId=builder', '?size=64&size=128'])
        expect((await app.inject({ url: `/v1/avatar/bot.svg${suffix}` })).statusCode).toBe(400);
      expect((await app.inject({ url: '/v1/avatar/missing.svg' })).statusCode).toBe(404);
      expect((await app.inject({ url: '/v1/avatar/bot.png' })).headers['content-type']).toBe(
        'image/png',
      );
    } finally {
      await app.close();
    }
  });
});
