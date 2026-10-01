# 0003 Reference-led soft avatar style

Status: implemented for visual review; not an accepted visual baseline.

## Context

The user rejected the initial flat human-face prototype and selected their v0.3
sample sheet as the target. The reference calls for large rounded hats, colored
hair, cream faces, mouthless capsule eyes, soft materials, and white circular
instance badges with colored rims. Similar subject matter alone is insufficient.

## Decision

Keep the template/instance/state model, seeded selection, validation, and injected
renderer pipeline. Revise the current `flat-2d` profile and bump the manifest to
`1.1.0`, renderer to `0.3.0`, and Core to `0.2.1`. Only one profile is implemented;
the rejected prototype has not been registered as an alternate selectable style.
Future independent visual profiles require distinct style IDs and compatible
catalog/renderer implementations.

Redraw components as native SVG geometry. Add a beanie alongside the cap, replace
prototype hat icons with code/flask/shield badges, and separate front and back hair.
Core resolves the catalog's back-hair asset and optional template hair-color default;
explicit instance colors still win. State changes keep these selections unchanged.

The renderer owns fixed eye anchors, mouthless expressions, color gradients, and
subtle material texture. Texture uses an explicitly fixed SVG turbulence seed and
never selects parts or depends on state, time, or the request seed. Source asset
validation allows bounded paint opacity and line caps, while active markup and
external references remain forbidden. Renderer-authored filters are not permitted
in untrusted source SVGs.

The user-provided draft is a design reference only. No build or runtime reads or
embeds it. The maintained visual brief records the relevant design decisions, so a
checkout without local drafts still generates avatars. Review previews may display
the user-supplied image beside SVG output from the ignored output directory.

## Consequences and validation

Template identities change with this intentionally versioned, pre-release catalog
revision. Existing requests retain their public shape; explicit color and glasses
overrides remain supported. The example now uses the reference's purple beanie,
terminal badge, and transparent background.

The rejected prototype's byte digest is not reused or replaced with an automatically
accepted visual baseline. Fixed-seed semantic regression, independent CLI output,
state-invariant layers, embedded paint references, and distribution portability
remain tested. New approved image baselines require user review.

Native SVG reconstruction does not reproduce every raster texture sample exactly.
Side-by-side browser inspection is a review aid, not proof of pixel equivalence.
