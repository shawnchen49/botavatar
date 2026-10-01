export type BotState = 'idle' | 'working' | 'waiting' | 'success' | 'error' | 'offline';

export type BotTemplate = {
  readonly id: string;
  readonly role: string;
  readonly styleId: string;
  readonly hat: {
    readonly type: string;
    readonly color: string;
    readonly badge: string;
  };
  readonly defaultPalette: string;
  readonly allowedHair: readonly string[];
  readonly allowedInstanceBadges: readonly string[];
};

export type InstanceBadge = {
  readonly icon: string;
  readonly label?: string;
  readonly color: string;
  readonly position: 'bottom-right';
};

export type InstanceFace = {
  readonly shape?: string;
  readonly glasses?: string;
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

// Template identity belongs to the request, never to an instance override.
export type InstanceOverrides = {
  readonly id?: string;
  readonly seed?: string;
  readonly hair?: {
    readonly style?: string;
    readonly color?: string;
  };
  readonly face?: InstanceFace;
  readonly instanceBadge?: Omit<InstanceBadge, 'position'> & {
    readonly position?: 'bottom-right';
  };
};

export type AvatarRequest = {
  readonly templateId: string;
  readonly instance?: InstanceOverrides;
  readonly state?: BotState;
  readonly styleId?: string;
  readonly size?: number;
  readonly format?: 'svg' | 'png';
  readonly background?: 'transparent' | 'solid' | 'gradient';
};
