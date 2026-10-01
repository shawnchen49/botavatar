export type {
  AvatarRequest,
  BotInstance,
  BotState,
  BotTemplate,
  InstanceBadge,
  InstanceFace,
  InstanceOverrides,
} from './model/avatar.js';

export { AvatarError } from './errors.js';
export type { AvatarErrorCode } from './errors.js';
export { parseAvatarRequest, requestSchema } from './schema/request.js';
export { validateCatalog } from './catalog.js';
export type { Asset, Catalog } from './catalog.js';
export { CORE_VERSION, seedIndex, normalizeAvatar, generateAvatar } from './normalize.js';
export type { NormalizedAvatar, AvatarRenderer } from './normalize.js';
export { composeAvatar } from './composition.js';
export type { AvatarLayer } from './composition.js';
