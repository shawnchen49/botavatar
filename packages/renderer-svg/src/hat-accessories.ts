import { flat2dHatAccessories } from '@bot-avatar/design-tokens';
import { part } from './assets.js';
import { contactShadow } from './contact-shadow.js';
import type { SvgNode } from './svg.js';

/** Raised hat pieces cast only onto the hat, never onto hair or the background. */
export function hatAccessories(hatType: string): {
  readonly definitions: readonly SvgNode[];
  readonly layers: readonly SvgNode[];
} {
  const definitions: SvgNode[] = [];
  const layers: SvgNode[] = [];
  for (const { asset, shadow } of flat2dHatAccessories[hatType] ?? []) {
    const piece = part(asset, '#000000');
    if (shadow) {
      const contact = contactShadow(
        asset,
        piece,
        [part(hatType, '#000000')],
        shadow.blur,
        shadow.offset,
        shadow.opacity,
      );
      definitions.push(...contact.definitions);
      layers.push(contact.layer);
    }
    layers.push({ tag: 'g', attributes: { 'data-layer': asset }, children: [piece] });
  }
  return { definitions, layers };
}
