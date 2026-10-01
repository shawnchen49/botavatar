import type { SvgNode } from './svg.js';

function mix(hex: string, target: number, amount: number): string {
  return `#${[1, 3, 5]
    .map((offset) => {
      const channel = Number.parseInt(hex.slice(offset, offset + 2), 16);
      return Math.round(channel + (target - channel) * amount)
        .toString(16)
        .padStart(2, '0');
    })
    .join('')}`;
}
export function softPaint(
  name: string,
  color: string,
): { readonly definition: SvgNode; readonly fill: string; readonly outline: string } {
  // Color-qualified IDs keep differently colored avatars safe in the same document.
  const id = `avatar-${name}-${color.slice(1)}`;
  return {
    fill: `url(#${id})`,
    outline: mix(color, 0, 0.22),
    definition: {
      tag: 'linearGradient',
      attributes: { id, x1: '0%', y1: '0%', x2: '85%', y2: '100%' },
      children: [
        {
          tag: 'stop',
          attributes: {
            offset: '0%',
            'stop-color': mix(color, 255, name === 'face' ? 0.25 : 0.12),
          },
        },
        { tag: 'stop', attributes: { offset: '52%', 'stop-color': color } },
        {
          tag: 'stop',
          attributes: {
            offset: '100%',
            'stop-color': mix(color, 0, name === 'face' ? 0.008 : 0.035),
          },
        },
      ],
    },
  };
}

export const materialTexture: SvgNode = {
  tag: 'filter',
  attributes: {
    id: 'avatar-soft-material-v1',
    x: '-2%',
    y: '-2%',
    width: '104%',
    height: '104%',
    'color-interpolation-filters': 'sRGB',
  },
  children: [
    {
      tag: 'feTurbulence',
      attributes: {
        type: 'fractalNoise',
        baseFrequency: 0.08,
        numOctaves: 3,
        seed: 17,
        result: 'grain',
      },
    },
    {
      tag: 'feColorMatrix',
      attributes: {
        in: 'grain',
        type: 'matrix',
        values:
          '0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0.2126 0.7152 0.0722 0 0 0 0 0 0.03 0',
        result: 'faint-grain',
      },
    },
    {
      tag: 'feComposite',
      attributes: {
        in: 'faint-grain',
        in2: 'SourceGraphic',
        operator: 'in',
        result: 'clipped-grain',
      },
    },
    {
      tag: 'feBlend',
      attributes: {
        in: 'SourceGraphic',
        in2: 'clipped-grain',
        mode: 'soft-light',
        result: 'material',
      },
    },
    { tag: 'feGaussianBlur', attributes: { in: 'material', stdDeviation: 0.16 } },
  ],
};
