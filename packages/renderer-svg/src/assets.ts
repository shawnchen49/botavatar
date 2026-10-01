import { AvatarError } from '@bot-avatar/core';
import { embeddedAssets } from './generated/assets.js';
import type { SvgNode } from './svg.js';

export function part(id: string, fill: string, outline = fill, strokeWidth?: number): SvgNode {
  if (!Object.hasOwn(embeddedAssets, id))
    throw new AvatarError('UNKNOWN_CHOICE', `Asset is not embedded: ${id}.`);
  const children = embeddedAssets[id as keyof typeof embeddedAssets].map((node): SvgNode => {
    const attributes: Readonly<Record<string, string>> = node.attributes;
    return {
      tag: node.tag,
      attributes: {
        ...attributes,
        ...(attributes.fill === 'currentColor' ? { fill } : {}),
        ...(attributes.stroke === 'currentColor' ? { stroke: outline } : {}),
        ...(strokeWidth !== undefined && attributes.stroke === 'currentColor'
          ? { 'stroke-width': strokeWidth }
          : {}),
      },
    };
  });
  return {
    tag: 'g',
    attributes: {
      color: outline,
    },
    children,
  };
}
