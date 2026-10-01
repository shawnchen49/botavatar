import type { InstanceFace, InstanceBadge } from '../schema/request.js';
export type {
  AvatarRequest,
  BotState,
  InstanceOverrides,
  InstanceFace,
  InstanceBadge,
} from '../schema/request.js';
export type BotTemplate = {
  readonly id: string;
  readonly role: string;
  readonly styleId: string;
  readonly hat: {
    readonly type: string;
    readonly color: string;
    readonly badge: string;
    readonly badgeColor: string;
  };
  readonly defaultPalette: string;
  readonly defaultHairColor?: string;
  readonly allowedHair: readonly string[];
  readonly allowedHairColors: readonly string[];
  readonly allowedInstanceBadges: readonly string[];
};

export type BotInstance = {
  readonly id: string;
  readonly templateId: string;
  readonly seed: string;
  readonly hair: {
    readonly style: string;
    readonly color: string;
  };
  readonly face?: InstanceFace;
  readonly instanceBadge?: InstanceBadge;
};
