import { AvatarError } from '@bot-avatar/core';
import type { NormalizedAvatar } from '@bot-avatar/core';
import { flat2dBadgeTreatments, flat2dHatMounts } from '@bot-avatar/design-tokens';
import { part } from './assets.js';
import type { SvgNode } from './svg.js';

export function hatBadge(hat: NormalizedAvatar['hat'], outline: string): SvgNode {
  if (
    !Object.hasOwn(flat2dHatMounts, hat.type) ||
    !Object.hasOwn(flat2dBadgeTreatments, hat.badge)
  ) {
    throw new AvatarError('UNKNOWN_CHOICE', 'Unsupported hat badge mounting.');
  }
  const mount = flat2dHatMounts[hat.type as keyof typeof flat2dHatMounts];
  const treatment = flat2dBadgeTreatments[hat.badge as keyof typeof flat2dBadgeTreatments];
  // The shell plaque sits in the front of the folded band, not on its side.
  const x = hat.type === 'hat-beanie' && hat.badge === 'badge-terminal' ? 128 : mount.x;
  const rotation = hat.type === 'hat-beanie' && hat.badge === 'badge-terminal' ? 0 : mount.rotation;
  const children: SvgNode[] = [];
  if (treatment.backing === 'dark') {
    children.push({
      tag: 'rect',
      attributes: {
        x: 96,
        y: 40,
        width: 64,
        height: 48,
        rx: 8,
        fill: '#171918',
        stroke: outline,
        'stroke-width': 1.2,
        'stroke-opacity': 0.4,
      },
    });
  }
  children.push({
    tag: 'g',
    attributes: {
      transform: `translate(${128 + treatment.offsetX} ${64 + treatment.offsetY}) scale(${treatment.size / 256}) translate(-128 -128)`,
    },
    children: [part(hat.badge, treatment.foreground, treatment.foreground, 2.6)],
  });
  return {
    tag: 'g',
    attributes: {
      'data-layer': 'hat-badge',
      transform: `translate(${x} ${mount.y}) rotate(${rotation}) scale(${mount.scale}) translate(-128 -64)`,
    },
    children,
  };
}
