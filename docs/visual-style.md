# Soft Layered 2D visual direction

The current profile is `soft-layered-2d`; `flat-2d` is a legacy request alias.
This is a naming change, not a second rendering style. See
[ADR 0012](decisions/0012-soft-layered-style-identity.md).

## Visual contract

Keep a front-facing, centered, head-only bot with an oversized rounded hat,
cream face, and capsule eyes. No mouth, nose, eyebrows, or glasses. Preserve
face proportions and eye anchors when authoring hats or hair. Asymmetric bangs
and brims are compatible with this frontal composition.

Use broad clean shapes and readable silhouettes. Reuse the existing soft paint,
faint seeded material, and receiver-clipped contact shadows; do not reinterpret
this family as strict flat fills or glossy 3D. Physical hat accessories may have
local depth under [ADR 0010](decisions/0010-soft-layered-accessories.md).
Printed emblems remain surface graphics, with at least 3:1 backing contrast.

The 2D prompt-library reference contributes simplicity, consistent proportions,
and small-size readability. Its strict flat rendering, charcoal background,
pastel-only direction, and optional glasses do not override this repository's
choices. No external prompt file is required to build or author assets.

## Current choices and references

The catalog in `packages/design-tokens/src/index.ts` owns current palettes,
defaults, allowed hair, and fitted mounts. Source geometry lives under
`assets/parts/soft-layered-2d/`. Do not duplicate its values in skills.

- Hats express template identity through shape, palette, and fixed licensed emblem.
  Add optional templates unless changing an existing identity is requested.
- Hair is an instance choice: sweep, wave, side part, curtain, and soft curls are retained options.
  Layered and wispy fringe are also approved additions.
  Use their front/back mappings and explicit hat fits. Coder uses a charcoal
  beanie, cyan emblem, cocoa hair, and a side-part seeded default.
- Occupational palettes and expanded hair choices supersede the restoration's
  original colors and five-color limit. Tonal hat/hair combinations remain valid;
  contrast between them is not mandatory.
- Backgrounds and compact instance badges retain their existing configurable
  behavior. Runtime states preserve hat, hair, and instance identity.

## Approval boundaries

The approved 1.4.2 family established the silhouette and material language;
[ADR 0009](decisions/0009-approved-visual-restoration.md) explains its restoration.
The later Fine Line and occupational replacement redraws were superseded.
Subsequent palette, badge, expression, and template-id changes are recorded in
`tests/snapshots/README.md` and the review history, not frozen to 1.4.2 values.

Curtain, soft-curl, layered-fringe, and wispy-fringe hair were approved on
2026-10-02. Eight new baselines record the reviewed beanie and bucket combinations. The
subsequent requested failure repair migrated sixteen retired-crop requests to
approved curtain hair, preserving their original SVGs and requests in the
historical snapshot directory.
Rejected spikes and curls describe specific past implementations, not a permanent
ban on short or curly hair. Generated previews are not approved references.

## Authoring entrypoints

Use [the asset workflow](../.agents/skills/add-avatar-asset/SKILL.md) for delivery
and [the style skill](../.agents/skills/bot-avatar-soft-layered-2d/SKILL.md) for
visual decisions. Load only the hat or hair reference needed for the task.
Compare a small controlled sample at 64 and 256 pixels before expanding it.
