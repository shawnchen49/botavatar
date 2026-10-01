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
  const size = badge.icon === 'dot' ? 112 : 36;
  const content: SvgNode =
    badge.image !== null
      ? {
          tag: 'image',
          attributes: {
            href: badge.image,
            x: 191,
            y: 191,
            width: 38,
            height: 38,
            preserveAspectRatio: 'xMidYMid meet',
          },
        }
      : badge.label !== null
        ? {
            tag: 'text',
            attributes: {
              x: 210,
              y: 218,
              fill: badge.iconColor,
              'text-anchor': 'middle',
              'font-family': 'sans-serif',
              'font-size': Array.from(badge.label).length > 2 ? 18 : 24,
              'font-weight': 700,
            },
            text: badge.label,
          }
        : {
            tag: 'g',
            attributes: {
              transform: `translate(210 210) scale(${size / 256}) translate(-128 -128)`,
            },
            children: [part(badge.asset, badge.iconColor, badge.iconColor, 2.6)],
          };
  return {
    tag: 'g',
    attributes: { 'data-layer': 'instance-badge' },
    children: [
      {
        tag: 'circle',
        attributes: { cx: 210, cy: 210, r: 27, fill, stroke: badge.color, 'stroke-width': 3.5 },
      },
      content,
    ],
  };
}
