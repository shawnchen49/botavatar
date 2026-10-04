---
name: bot-avatar-soft-layered-2d
description: Design and assess Bot Avatar hats, hair, and palettes in Soft Layered 2D. Use for silhouette, fitting, material, or visual consistency decisions in soft-layered-2d (formerly flat-2d), not asset registration or a different visual style.
---

## Fix the visual reference

Read [the current visual brief](../../../docs/visual-style.md) and inspect the
nearest relevant source part and rendered example. Distinguish approved snapshots
from pending previews; an output file is not approval. Keep catalog values in the
catalog, not copied into this skill.

## Preserve the family

- Front-facing, centered, head-only: oversized rounded hat, cream face, capsule
  eyes; no mouth, nose, eyebrows, or glasses. Keep face geometry and eye anchors.
- Build recognizable silhouettes from a few broad shapes. Allow side parts and
  asymmetric brims without turning the head or introducing perspective.
- Reuse the renderer's soft paint, faint material, and local contact shadows.
  Do not replace them with strict flat fills, glossy volume, or dramatic lighting.
- Keep existing template palettes unless palette work is requested. New colors
  should separate readable shapes; hat emblems need 3:1 contrast on their backing.
- Hats and fixed accessories express template identity; hair expresses instance
  variation. Runtime states must preserve both.

<!-- prettier-ignore-start -->

## When it fails

| If | First fix | If that still fails |
|---|---|---|
| New hair is hidden inside the crown at 64 | Revise the broad masses that stay visible below the hat | Reject the candidate |
| Face geometry, eye anchors, or a mouth, nose, eyebrows, or glasses change | Restore the cream face and capsule eyes | Discard the part and start from the nearest approved source |
| Soft paint, faint material, or contact shadows are replaced by flat fills, gloss, or dramatic light | Restore the renderer | Do not imitate them by painting the part |
| A hat carries instance variation, or hair carries template identity | Split them: hats and fixed accessories on the template, hair on the instance | Keep that split. Do not leave either identity on the wrong side |
| The hat reads only at 256, or the hat type is unreadable with emblem and detail lines hidden | Rebuild crown and brim before decoration | Reject the hat type |
| Gaps, exposed roots, or brim collisions remain | Refit the lower edge on both a compact and a wider hairstyle | Do not ship that brim |

<!-- prettier-ignore-end -->

## Load only the relevant part guide

- Hats, emblems, physical accessories: [hats](references/hats.md).
- Hair silhouettes, front/back geometry, hat fitting: [hair](references/hair.md).

For implementation, use [the asset workflow](../add-avatar-asset/SKILL.md).
For visual judgment, compare silhouettes using the same face, color, and state
at 64 and 256 pixels. A design that only reads when enlarged needs revision.
