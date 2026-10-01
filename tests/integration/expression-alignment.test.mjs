import { it, expect } from 'vitest';
import { PNG } from 'pngjs';
import { generateAvatar } from '../../packages/core/dist/index.js';
import { catalog } from '../../packages/design-tokens/dist/index.js';
import { svgRenderer } from '../../packages/renderer-svg/dist/index.js';
import { renderPng } from '../../packages/renderer-png/dist/index.js';

it('keeps the visible eye bounds centered across all six states and output sizes', () => {
  for (const size of [64, 128, 256, 512]) {
    const centers = [];
    for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
      const { svg } = generateAvatar(
        { templateId: 'assistant', state, size },
        catalog,
        svgRenderer,
      );
      const stateMarkup = svg
        .slice(svg.indexOf('<g data-layer="state"'))
        .replaceAll(/url\(#[^)]+\)/g, '#171918');
      const png = PNG.sync.read(
        Buffer.from(
          renderPng(
            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="${size}" height="${size}">${stateMarkup}`,
            size,
          ),
        ),
      );
      centers.push(
        [0, 1].map((eye) => {
          const pixels = [];
          for (let y = 0; y < size; y++)
            for (let x = (eye * size) / 2; x < ((eye + 1) * size) / 2; x++)
              if (png.data[(y * size + x) * 4 + 3] >= 128) pixels.push([x, y]);
          expect(pixels.length).toBeGreaterThan(0);
          return [0, 1].map(
            (axis) =>
              (Math.min(...pixels.map((p) => p[axis])) + Math.max(...pixels.map((p) => p[axis]))) /
              2,
          );
        }),
      );
    }
    for (const eyes of centers)
      for (let eye = 0; eye < 2; eye++)
        for (let axis = 0; axis < 2; axis++)
          expect(Math.abs(eyes[eye][axis] - centers[0][eye][axis])).toBeLessThanOrEqual(0.5);
  }
}, 15000);

it('gives the default solid background visible contrast against the face', () => {
  const { avatar, svg } = generateAvatar(
    { templateId: 'assistant', background: 'solid' },
    catalog,
    svgRenderer,
  );
  const luminance = (hex) => {
    const rgb = hex
      .slice(1)
      .match(/../g)
      .map((v) => parseInt(v, 16) / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  expect(
    (luminance(avatar.face.color) + 0.05) / (luminance(avatar.background.color) + 0.05),
  ).toBeGreaterThan(3);
  expect(svg).toContain(`rx="40" fill="${catalog.colors.slate}"`);
});
