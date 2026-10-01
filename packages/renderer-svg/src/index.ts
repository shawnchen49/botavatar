import { flat2dHairFits } from '@bot-avatar/design-tokens';
import { AvatarError, composeAvatar } from '@bot-avatar/core';
import type { AvatarLayer, AvatarRenderer, NormalizedAvatar } from '@bot-avatar/core';
import { thirdPartyNotice } from './generated/assets.js';
import { part } from './assets.js';
import { contactShadow } from './contact-shadow.js';
import { hatBadge } from './hat-badge.js';
import { expression } from './expression.js';
import { instanceBadge } from './instance-badge.js';
import { flatPaint } from './paint.js';
import { serializeSvg } from './svg.js';
import type { SvgNode } from './svg.js';

export const RENDERER_VERSION = '0.9.0';
export function composeSvg(avatar: NormalizedAvatar): SvgNode {
  if (avatar.styleId !== 'flat-2d' || avatar.manifestVersion !== '1.7.0')
    throw new AvatarError('UNKNOWN_CHOICE', 'Unsupported style or manifest version.');
  if (avatar.face.glasses !== 'none')
    throw new AvatarError('UNKNOWN_CHOICE', 'Unsupported renderer overlay.');
  const hairFit = flat2dHairFits[avatar.hat.type]?.[avatar.hair.style];
  const frontHair = hairFit?.front ?? avatar.hair.style;
  const backHair = hairFit?.back ?? avatar.hair.back;
  const face = flatPaint(avatar.face.color);
  const hair = flatPaint(avatar.hair.color);
  const hat = flatPaint(avatar.hat.fill);
  const eye = flatPaint('#171918');
  const badgePaint = flatPaint('#ffffff');
  // Receiver clips keep soft contact shadows off the transparent background.
  const faceSilhouette = part(avatar.face.shape, '#000000');
  const badgeShadow = contactShadow(
    'instance-badge',
    { tag: 'circle', attributes: { cx: 210, cy: 210, r: 29, fill: '#000000' } },
    [faceSilhouette],
    1.8,
    1.5,
    0.18,
  );
  const definitions: SvgNode[] = [...(avatar.instanceBadge ? badgeShadow.definitions : [])];
  const layers: Record<AvatarLayer, SvgNode[]> = {
    background: [],
    'back-hair': [part(backHair, hair.fill, hair.outline)],
    face: [part(avatar.face.shape, face.fill)],
    hair: [part(frontHair, hair.fill, hair.outline)],
    hat: [part(avatar.hat.type, hat.fill, hat.outline)],
    'hat-badge': [hatBadge(avatar.hat, hat.outline)],
    state: [expression(avatar.state, eye.fill)],
    'instance-badge': avatar.instanceBadge
      ? [badgeShadow.layer, instanceBadge(avatar.instanceBadge, badgePaint.fill)]
      : [],
    glasses: [],
  };
  const backgroundId = `avatar-background-${avatar.background.color.slice(1)}-${avatar.background.gradientEnd.slice(1)}`;
  if (avatar.background.mode === 'gradient')
    definitions.push({
      tag: 'linearGradient',
      attributes: { id: backgroundId, x2: '100%', y2: '100%' },
      children: [
        { tag: 'stop', attributes: { offset: '0%', 'stop-color': avatar.background.color } },
        {
          tag: 'stop',
          attributes: { offset: '100%', 'stop-color': avatar.background.gradientEnd },
        },
      ],
    });
  if (avatar.background.mode !== 'transparent')
    layers.background.push({
      tag: 'rect',
      attributes: {
        width: 256,
        height: 256,
        rx: 40,
        fill:
          avatar.background.mode === 'gradient' ? `url(#${backgroundId})` : avatar.background.color,
      },
    });
  return {
    tag: 'svg',
    attributes: {
      xmlns: 'http://www.w3.org/2000/svg',
      viewBox: '0 0 256 256',
      width: avatar.size,
      height: avatar.size,
      role: 'img',
    },
    children: [
      { tag: 'title', text: `${avatar.templateId} bot avatar — ${avatar.state}` },
      { tag: 'metadata', text: thirdPartyNotice },
      { tag: 'defs', children: definitions },
      ...composeAvatar(avatar).flatMap((layer) => layers[layer]),
    ],
  };
}
export function renderSvg(avatar: NormalizedAvatar): string {
  return `${serializeSvg(composeSvg(avatar))}\n`;
}
export const svgRenderer: AvatarRenderer = { version: RENDERER_VERSION, render: renderSvg };
