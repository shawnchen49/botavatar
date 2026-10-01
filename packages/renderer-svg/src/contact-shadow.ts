import type { SvgNode } from './svg.js';

export function contactShadow(
  name: string,
  caster: SvgNode,
  receivers: readonly SvgNode[],
  blur: number,
  offset: number,
  opacity: number,
): { readonly definitions: readonly SvgNode[]; readonly layer: SvgNode } {
  const filterId = `avatar-contact-shadow-${name}`;
  const clipId = `avatar-contact-receiver-${name}`;
  return {
    definitions: [
      {
        tag: 'clipPath',
        attributes: { id: clipId, clipPathUnits: 'userSpaceOnUse' },
        children: receivers.flatMap((receiver) => receiver.children ?? [receiver]),
      },
      {
        tag: 'filter',
        attributes: {
          id: filterId,
          filterUnits: 'userSpaceOnUse',
          x: 0,
          y: 0,
          width: 256,
          height: 256,
          'color-interpolation-filters': 'sRGB',
        },
        children: [
          { tag: 'feGaussianBlur', attributes: { in: 'SourceAlpha', stdDeviation: blur } },
          { tag: 'feOffset', attributes: { dy: offset, result: 'contact-alpha' } },
          {
            tag: 'feFlood',
            attributes: { 'flood-color': '#201a28', 'flood-opacity': opacity },
          },
          { tag: 'feComposite', attributes: { in2: 'contact-alpha', operator: 'in' } },
        ],
      },
    ],
    layer: {
      tag: 'g',
      attributes: { 'data-layer': `contact-shadow-${name}`, 'clip-path': `url(#${clipId})` },
      children: [{ tag: 'g', attributes: { filter: `url(#${filterId})` }, children: [caster] }],
    },
  };
}
