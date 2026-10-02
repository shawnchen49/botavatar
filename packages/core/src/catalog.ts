import type { BotTemplate } from './model/avatar.js';
import { AvatarError } from './errors.js';
export type Asset = {
  readonly id: string;
  readonly source: string;
  readonly creator: string;
  readonly anchor: readonly [number, number];
} & (
  | { readonly permission: 'project-owned' }
  | {
      readonly permission: 'MIT' | 'ISC';
      readonly upstream: {
        readonly package: string;
        readonly version: string;
        readonly url: string;
        readonly sha256: string;
        readonly licensePath: string;
      };
    }
);
export type Catalog = {
  readonly version: string;
  readonly styleId: 'flat-2d';
  readonly assets: readonly Asset[];
  readonly templates: readonly BotTemplate[];
  readonly roles: Readonly<Record<string, string>>;
  readonly colors: Readonly<Record<string, string>>;
  readonly hair: readonly string[];
  readonly hairBack: Readonly<Record<string, string>>;
  readonly glasses: readonly string[];
  readonly faces: readonly string[];
  readonly instanceBadges: readonly string[];
  readonly instanceBadgeAssets: Readonly<Record<string, string>>;
  readonly defaults: {
    readonly hairColor: string;
    readonly iconColor: string;
    readonly face: string;
    readonly glasses: string;
    readonly background: string;
    readonly gradientEnd: string;
  };
};
export function validateCatalog(catalog: Catalog): void {
  const invalid = (message: string): never => {
    throw new AvatarError('INVALID_CATALOG', message);
  };
  const assets = new Set(catalog.assets.map((asset) => asset.id));
  if (!catalog.version || assets.size !== catalog.assets.length || !catalog.assets.length)
    invalid('Asset IDs and version must be unique and nonempty.');
  for (const color of Object.values(catalog.colors))
    if (!/^#[0-9a-f]{6}$/iu.test(color)) invalid('Colors must use six-digit hex.');
  const ids = new Set<string>();
  const identities = new Set<string>();
  for (const template of catalog.templates) {
    const identity = JSON.stringify([
      template.styleId,
      template.hat.type,
      template.hat.color,
      template.hat.badge,
      template.hat.badgeColor,
    ]);
    if (ids.has(template.id) || identities.has(identity) || template.styleId !== catalog.styleId)
      invalid('Duplicate or incompatible template identity.');
    ids.add(template.id);
    identities.add(identity);
    if (
      !assets.has(template.hat.type) ||
      !assets.has(template.hat.badge) ||
      !Object.hasOwn(catalog.colors, template.hat.color) ||
      !Object.hasOwn(catalog.colors, template.hat.badgeColor) ||
      !Object.hasOwn(catalog.colors, template.defaultPalette) ||
      (template.defaultHairColor !== undefined &&
        !Object.hasOwn(catalog.colors, template.defaultHairColor))
    )
      invalid('Invalid template resources.');
    if (
      !template.allowedHairColors.length ||
      new Set(template.allowedHairColors).size !== template.allowedHairColors.length ||
      template.allowedHairColors.some((id) => !Object.hasOwn(catalog.colors, id)) ||
      !template.allowedHairColors.includes(
        template.defaultHairColor ?? catalog.defaults.hairColor,
      ) ||
      !template.allowedHair.length ||
      template.allowedHair.some((id) => !catalog.hair.includes(id)) ||
      template.allowedInstanceBadges.some((id) => !catalog.instanceBadges.includes(id))
    )
      invalid('Invalid template capabilities.');
  }
  for (const icon of catalog.instanceBadges) {
    const asset = Object.hasOwn(catalog.instanceBadgeAssets, icon)
      ? catalog.instanceBadgeAssets[icon]
      : undefined;
    if (!asset || !assets.has(asset)) invalid('Missing instance badge icon asset.');
  }
  for (const hair of catalog.hair) {
    const back = Object.hasOwn(catalog.hairBack, hair) ? catalog.hairBack[hair] : undefined;
    if (!back || !assets.has(back)) invalid('Missing back-hair asset.');
  }
  for (const id of [...catalog.hair, ...catalog.faces])
    if (!assets.has(id)) invalid('Missing part asset.');
  for (const [alias, id] of Object.entries(catalog.roles)) {
    if (!ids.has(id)) invalid('Unknown role default.');
    // A role key that is also a template id must name that template, so variants stay addressable.
    if (ids.has(alias) && alias !== id) invalid('Role alias conflicts with a template id.');
  }
  if (
    !catalog.faces.includes(catalog.defaults.face) ||
    !catalog.glasses.includes(catalog.defaults.glasses)
  )
    invalid('Invalid default face or glasses.');
  for (const id of [
    catalog.defaults.hairColor,
    catalog.defaults.iconColor,
    catalog.defaults.background,
    catalog.defaults.gradientEnd,
  ])
    if (!Object.hasOwn(catalog.colors, id)) invalid('Invalid default color.');
}
