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

## Load only the relevant part guide

- Hats, emblems, physical accessories: [hats](references/hats.md).
- Hair silhouettes, front/back geometry, hat fitting: [hair](references/hair.md).

For implementation, use [the asset workflow](../add-avatar-asset/SKILL.md).
For visual judgment, compare silhouettes using the same face, color, and state
at 64 and 256 pixels. A design that only reads when enlarged needs revision.
