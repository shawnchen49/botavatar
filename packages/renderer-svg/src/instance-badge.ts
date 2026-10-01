import { AvatarError } from '@bot-avatar/core';
import type { NormalizedAvatar } from '@bot-avatar/core';
import { catalog } from '@bot-avatar/design-tokens';
import { part } from './assets.js';
import type { SvgNode } from './svg.js';

export function instanceBadge(
  badge: NonNullable<NormalizedAvatar['instanceBadge']>,
  fill: string,
): SvgNode {
  if (
    !Object.hasOwn(catalog.instanceBadgeAssets, badge.icon) ||
    catalog.instanceBadgeAssets[badge.icon as keyof typeof catalog.instanceBadgeAssets] !==
      badge.asset
  ) {
    throw new AvatarError('UNKNOWN_CHOICE', 'Unsupported instance badge icon.');
  }
  const size = badge.icon === 'dot' ? 128 : 42;
  const content: SvgNode =
    badge.label !== null
      ? {
          tag: 'text',
          attributes: {
            x: 213,
            y: 219,
            fill: badge.iconColor,
            'text-anchor': 'middle',
            'font-family': 'sans-serif',
            'font-size': 16,
            'font-weight': 700,
          },
          text: badge.label,
        }
      : {
          tag: 'g',
          attributes: { transform: `translate(213 213) scale(${size / 256}) translate(-128 -128)` },
          children: [part(badge.asset, badge.iconColor, badge.iconColor, 2.6)],
        };
  return {
    tag: 'g',
    attributes: { 'data-layer': 'instance-badge', transform: 'translate(6 6)' },
    children: [
      { tag: 'circle', attributes: { cx: 213, cy: 214.5, r: 34, fill: '#000000', opacity: 0.08 } },
      {
        tag: 'circle',
        attributes: { cx: 213, cy: 213, r: 32, fill, stroke: badge.color, 'stroke-width': 4.4 },
      },
      content,
    ],
  };
}
