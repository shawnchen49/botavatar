import type { NormalizedAvatar } from './normalize.js';

export type AvatarLayer =
  | 'background'
  | 'back-hair'
  | 'face'
  | 'hair'
  | 'hat'
  | 'hat-badge'
  | 'state'
  | 'instance-badge'
  | 'glasses';

export function composeAvatar(avatar: NormalizedAvatar): readonly AvatarLayer[] {
  const layers: AvatarLayer[] = [];
  if (avatar.background.mode !== 'transparent') layers.push('background');
  layers.push('back-hair', 'face', 'hair', 'hat', 'hat-badge', 'state');
  if (avatar.instanceBadge) layers.push('instance-badge');
  if (avatar.face.glasses !== 'none') layers.push('glasses');
  return layers;
}
