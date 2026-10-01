import type { Catalog } from './catalog.js';
import { validateCatalog } from './catalog.js';
import { AvatarError } from './errors.js';
import { parseAvatarRequest } from './schema/request.js';
export const CORE_VERSION = '0.3.0';
// FNV-1a over UTF-16 code units, with independent field namespaces.
export function seedIndex(seed: string, field: string, count: number): number {
  if (!Number.isInteger(count) || count < 1)
    throw new AvatarError('INVALID_CATALOG', 'Selection requires candidates.');
  let hash = 2166136261;
  for (const char of `${seed.length}:${seed}:${field}`.split(''))
    hash = Math.imul(hash ^ char.charCodeAt(0), 16777619) >>> 0;
  return hash % count;
}
export function normalizeAvatar(input: unknown, catalog: Catalog) {
  const request = parseAvatarRequest(input);
  validateCatalog(catalog);
  const template = catalog.templates.find((item) => item.id === request.templateId);
  if (!template) throw new AvatarError('UNKNOWN_CHOICE', 'Unknown template.');
  if (request.styleId !== undefined && request.styleId !== template.styleId)
    throw new AvatarError('UNKNOWN_CHOICE', 'Style conflicts with template.');
  const select = (value: string, allowed: readonly string[], field: string): string => {
    if (!allowed.includes(value))
      throw new AvatarError('UNKNOWN_CHOICE', `Unknown ${field}: ${value}.`);
    return value;
  };
  const color = (id: string): string => {
    const value = Object.hasOwn(catalog.colors, id) ? catalog.colors[id] : undefined;
    if (!value) throw new AvatarError('UNKNOWN_CHOICE', `Unknown color: ${id}.`);
    return value;
  };
  const instance = request.instance;
  const seed = instance?.seed ?? 'bot-avatar-v1';
  const hair =
    instance?.hair?.style ??
    template.allowedHair[seedIndex(seed, 'hair.style', template.allowedHair.length)];
  if (!hair) throw new AvatarError('INVALID_CATALOG', 'Missing hair selection.');
  const hairStyle = select(hair, template.allowedHair, 'hair');
  const hairBack = catalog.hairBack[hairStyle];
  if (!hairBack) throw new AvatarError('INVALID_CATALOG', 'Missing back-hair asset.');
  const badge = instance?.instanceBadge;
  if (badge?.label && Array.from(badge.label).length > 3)
    throw new AvatarError('INVALID_INPUT', 'Badge label must contain at most three characters.');
  const badgeIcon = badge
    ? select(badge.icon, template.allowedInstanceBadges, 'instance badge')
    : null;
  const badgeAsset = badgeIcon ? catalog.instanceBadgeAssets[badgeIcon] : null;
  if (badge && !badgeAsset)
    throw new AvatarError('INVALID_CATALOG', 'Missing instance badge icon.');
  return {
    coreVersion: CORE_VERSION,
    manifestVersion: catalog.version,
    styleId: catalog.styleId,
    templateId: template.id,
    hat: { ...template.hat, fill: color(template.hat.color) },
    instanceId: instance?.id ?? null,
    seed,
    hair: {
      style: hairStyle,
      back: hairBack,
      color: color(
        instance?.hair?.color ?? template.defaultHairColor ?? catalog.defaults.hairColor,
      ),
    },
    face: {
      shape: select(instance?.face?.shape ?? catalog.defaults.face, catalog.faces, 'face'),
      glasses: select(
        instance?.face?.glasses ?? catalog.defaults.glasses,
        catalog.glasses,
        'glasses',
      ),
      color: color(template.defaultPalette),
    },
    instanceBadge:
      badge && badgeAsset
        ? {
            icon: badge.icon,
            asset: badgeAsset,
            iconColor: color(badge.iconColor ?? catalog.defaults.iconColor),
            color: color(badge.color),
            label: badge.label ?? null,
            position: 'bottom-right' as const,
          }
        : null,
    state: request.state ?? 'idle',
    size: request.size ?? 256,
    format: request.format ?? 'svg',
    background: {
      mode: request.background ?? 'transparent',
      color: color(catalog.defaults.background),
      gradientEnd: color(catalog.defaults.gradientEnd),
    },
  } as const;
}
export type NormalizedAvatar = ReturnType<typeof normalizeAvatar>;
export type AvatarRenderer = {
  readonly version: string;
  readonly render: (avatar: NormalizedAvatar) => string;
};
export function generateAvatar(input: unknown, catalog: Catalog, renderer: AvatarRenderer) {
  const avatar = normalizeAvatar(input, catalog);
  return {
    avatar,
    svg: renderer.render(avatar),
    resourceKey: JSON.stringify([CORE_VERSION, catalog.version, renderer.version, avatar]),
  };
}
