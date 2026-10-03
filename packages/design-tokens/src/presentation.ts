export const softLayered2dHatMounts = {
  'hat-cap': {
    x: 128,
    y: 66,
    scale: 0.84,
    rotation: 0,
  },
  'hat-cap-backward': {
    x: 128,
    y: 65,
    scale: 0.74,
    rotation: 0,
  },
  'hat-beanie': {
    x: 151,
    y: 96,
    scale: 0.66,
    rotation: 0,
  },
  'hat-beret': {
    x: 176,
    y: 65,
    scale: 0.85,
    rotation: 12,
  },
  'hat-hardhat': {
    x: 128,
    y: 73,
    scale: 0.82,
    rotation: 0,
  },
  'hat-bucket': {
    x: 128,
    y: 67,
    scale: 0.85,
    rotation: 0,
  },
  'hat-deerstalker': {
    x: 128,
    y: 68,
    scale: 0.83,
    rotation: 0,
  },
  'hat-flatcap': {
    x: 130,
    y: 71,
    scale: 0.74,
    rotation: -8,
  },
  'hat-patrol': {
    x: 128,
    y: 62,
    scale: 0.79,
    rotation: 0,
  },
  'hat-pilot': {
    x: 128,
    y: 64,
    scale: 0.85,
    rotation: 0,
  },
} as const;
export const softLayered2dBadgeTreatments = {
  'badge-code': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-sparkle': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-document': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-git': {
    backing: 'dark',
    size: 50,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-check': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-terminal': {
    backing: 'dark',
    size: 50,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-gear': {
    backing: 'none',
    size: 61,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-bug': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-printer': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-wifi': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-general': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-flask': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-rocket': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-pulse': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-shield': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-pen': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-bars': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-search': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
  'badge-support': {
    backing: 'none',
    size: 56,
    offsetX: 0,
    offsetY: 0,
  },
} as const;
export const softLayered2dHairFits: Readonly<
  Record<string, Readonly<Record<string, { readonly front: string; readonly back: string }>>>
> = {
  'hat-bucket': {
    'hair-sweep': {
      front: 'hair-sweep-bucket',
      back: 'hair-sweep-bucket-back',
    },
  },
};

// Accessories are fixed parts of the hat, not instance choices.
export const softLayered2dHatAccessories: Readonly<
  Record<
    string,
    readonly {
      readonly asset: string;
      readonly shadow: {
        readonly blur: number;
        readonly offset: number;
        readonly opacity: number;
      } | null;
    }[]
  >
> = {
  'hat-pilot': [
    { asset: 'hat-pilot-strap', shadow: { blur: 0.6, offset: 0.6, opacity: 0.1 } },
    { asset: 'hat-pilot-frame', shadow: { blur: 1.1, offset: 1.6, opacity: 0.2 } },
    { asset: 'hat-pilot-lenses', shadow: null },
  ],
};
