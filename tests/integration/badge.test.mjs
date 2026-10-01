import { describe, expect, it } from 'vitest';
import { PNG } from 'pngjs';
import { generateAvatar, AvatarError } from '../../packages/core/dist/index.js';
import { catalog } from '../../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../../packages/renderer-svg/dist/index.js';
import { renderPng } from '../../packages/renderer-png/dist/index.js';
import { dominantColor } from '../../apps/studio/src/badge-import.ts';

function logo(color, width = 32) {
  const png = new PNG({ width, height: 32 });
  for (let i = 0; i < png.data.length; i += 4) png.data.set([...color, 255], i);
  return 'data:image/png;base64,' + PNG.sync.write(png).toString('base64');
}
const generate = (badge, state = 'idle') =>
  generateAvatar(
    {
      templateId: 'review',
      state,
      instance: { instanceBadge: { icon: 'dot', color: '#3388dd', ...badge } },
    },
    catalog,
    svgRenderer,
  );

describe('custom instance badges', () => {
  it('embeds images in SVG and PNG, preserves identity across states, and keys image content', () => {
    const image = logo([51, 136, 221]);
    const base = generate({ image });
    expect(base.svg).toContain(`href="${image}"`);
    for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
      expect(generate({ image }, state).avatar.instanceBadge).toEqual(base.avatar.instanceBadge);
    }
    expect(generate({ image }).svg).toBe(base.svg);
    expect(generate({ image: logo([221, 51, 136]) }).resourceKey).not.toBe(base.resourceKey);
    const png = PNG.sync.read(Buffer.from(renderPng(base.svg, 256)));
    const offset = (210 * 256 + 210) * 4;
    expect([...png.data.subarray(offset, offset + 4)]).toEqual([51, 136, 221, 255]);
    expect(generate({ label: 'LV' }).svg).toContain('>LV</text>');
  });
  it('rejects remote, executable, oversized, conflicting and malformed image inputs', () => {
    for (const image of [
      'https://example.com/logo.png',
      'data:image/svg+xml;base64,PHN2Zz4=',
      'data:image/png;base64,invalid',
      logo([0, 0, 0], 129),
      'x'.repeat(100001),
    ]) {
      expect(() => generate({ image })).toThrow(AvatarError);
    }
    expect(() => generate({ image: logo([0, 0, 0]), label: 'LV' })).toThrow(AvatarError);
    expect(() => generate({ color: 'url(https://example.com)' })).toThrow(AvatarError);
  });
  it('ignores transparent/white backgrounds and uses stable foreground colors', () => {
    const colored = [30, 120, 220, 255];
    const pixels = new Uint8ClampedArray([
      ...Array(20).fill([255, 255, 255, 255]).flat(),
      ...Array(10).fill([255, 0, 0, 0]).flat(),
      ...colored,
      ...colored,
    ]);
    expect(dominantColor(pixels)).toBe('#1e78dc');
    expect(dominantColor(new Uint8ClampedArray([0, 0, 0, 255, 255, 255, 255, 255]))).toBe(
      '#000000',
    );
    expect(dominantColor(new Uint8ClampedArray([255, 255, 255, 255]))).toBe('#343a40');
  });
});
