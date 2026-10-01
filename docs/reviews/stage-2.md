# Stage 2 review

Status: implemented, locally verified, and visually approved by the user on 2026-10-01. The 31 approved preview SVGs are preserved under `tests/snapshots/`. Historical revision notes below describe the review process before approval.

## Changes

- Added strict runtime request schemas with inferred types, typed domain errors,
  versioned catalog contracts, and deterministic normalization without platform I/O.
- Added Core semantic layer composition and an injected renderer contract with a
  canonical versioned resource key.
- Added original SVG source geometry: one cream face, three hairstyles with front/back assets, six hat silhouettes,
  and nineteen mappings to existing licensed hat emblems. Twenty templates have distinct hat/color/emblem identities.
- Added six mouthless eye expressions, round glasses, five instance badge icons, escaped
  short labels, and transparent/solid/gradient backgrounds at four output sizes.
- Added build-time asset validation and embedding. Runtime distribution does not
  depend on the repository source tree.
- Added a real CLI with JSON input, stdout/file output, exclusive creation, and
  documented exit codes. Added a runnable request and asset-authoring guide.
- Recorded the seed, schema, composition, resource key, and packaging decisions in
  [ADR 0002](../decisions/0002-deterministic-svg.md).

## Verification

- `pnpm check`: passed, including strict TypeScript, lint, formatting, seven workspace
  manifests, and 67 tests across architecture and generation suites.
- Fixed-seed semantic regression and deterministic input-order handling passed.
- Six-state identity preservation, explicit overrides, Unicode/XML validation,
  all templates and dimensions, unsupported values, and resource key variation passed.
- CLI/library output equivalence, invalid JSON, unknown flags, and refusing existing
  output files passed.
- Copied distribution files ran from a temporary directory without source assets or
  the repository, proving the embedded runtime path works.
- Browser inspection covered six expressions, all templates, and 64/128/256/512 pixel
  output. No clipping or misplaced overlays was observed. Small-size features remain
  distinguishable; aesthetic approval belongs to the user.

The initial portability test caught a macOS path-alias issue in CLI entry detection;
using a separate process entrypoint fixed it. Remote CI has not run.

## Reference-led revision

The initial human-face prototype was rejected. The current revision follows the
user-provided v0.3 direction and records it in [the visual brief](../visual-style.md)
and [ADR 0003](../decisions/0003-reference-style.md). It uses rounded hats, coordinated
hair colors, capsule eyes without mouths, softer shading, and white instance badges.
The first reference revision used manifest `1.1.0`; this intentionally changes pre-release template identities.

Side-by-side inspection refined cap curvature, knit bands, icon dimensions, eye
proportions, fringe/side-hair shapes, sampled palette colors, and badge placement.
The ignored `output/stage-2/compare.html` displays matching reference regions next
to generated SVG. This remains a reconstruction under review, not a claim of exact
raster equivalence or user acceptance. The draft is not a runtime dependency.

## Hat diversity revision

The user's additional twenty-role reference is saved intact under local draft assets.
Manifest `1.2.0` and renderer `0.4.0` add beret, hardhat, bucket, and deerstalker
silhouettes; cap and beanie remain. Hat-mounted symbols use direct print, tonal cloth
patches, or dark plaques with per-hat position and tilt. See
[ADR 0004](../decisions/0004-hat-diversity.md).

The current local `output/stage-2/index.html` presents all twenty roles, the six
states of one identity, and the supplied reference. New tests verify fixed emblems
across states for every template and cover the three backing treatments. The copied
reference has the same SHA-256 digest as the supplied file. Draft assets remain
excluded from Git and are not runtime inputs.

## Existing icon revision

Following the user's request, manifest `1.3.0`, renderer `0.5.0`, and Core `0.2.2`
replace hand-authored symbols with 22 unmodified Phosphor 2.1.1 SVGs. Hat mounts
adapt the supplied glyphs with size, rotation, and color; code and data no longer
have extra cloth backings. Shell and Git retain deliberate dark plaques.

Instance icons use the same asset pipeline and add independent `iconColor` input.
The compiler checks per-file source hashes and preserves the upstream MIT notice
in distribution files and SVG metadata. Tests verify original path equivalence,
source integrity, instance mappings, color validation, and resource-key changes.
The local preview includes five differently colored instance icons. See
[ADR 0005](../decisions/0005-existing-icons.md).

## Lucide revision

At the user's request, manifest `1.4.0` and renderer `0.6.0` now use 22 Lucide
1.49.0 SVGs instead of Phosphor. The original glyph geometry is preserved while
rounded strokes receive a 2.6-unit display weight and independent colors.
Monitor uses activity, Support uses message-circle-heart, and Security uses
shield-lock. The compiler handles Lucide's 24-unit coordinates and inherited
stroke attributes. Upstream ISC and Feather MIT notices are retained.

## Contact shadow refinement

Renderer `0.6.1` adds a soft shadow from the hat onto the hair and a lighter fringe
shadow onto the face. Both reuse existing silhouettes and clip to receiving
surfaces, keeping the transparent background clear. Identity geometry, icon
selection, and palette remain unchanged. This is a localized shading adjustment;
no visual baseline has been automatically accepted.

## Bucket hat refinement

Manifest `1.4.1` refines the Debug bucket hat against the supplied reference:
softer crown sides, a more pronounced raised center arc across the flared brim,
lowered side tips, and a stronger underside seam. Existing contact shadows follow
the updated silhouette. Icons, colors, and other hat assets are unchanged.

## Debug close-up refinement

Manifest `1.4.2` and renderer `0.6.2` follow the newly supplied Debug close-up.
The bucket hat now has a wider continuous brim with a narrow dark inner lip and
short crown seam segments. An explicit sweep-hair fitting asset rounds the side
hair and tucks it below the brim, preserving the selected hairstyle identity.
Other hats retain their existing hair geometry. The source close-up is archived
under ignored draft assets and is not a build dependency.

## Review entrypoints

- [Example request](../../examples/requests/assistant.json) and
  [CLI usage](../../apps/cli/README.md).
- [Normalization](../../packages/core/src/normalize.ts),
  [semantic composition](../../packages/core/src/composition.ts), and
  [SVG renderer](../../packages/renderer-svg/src/index.ts).
- [Catalog and provenance](../../packages/design-tokens/src/index.ts) and
  [asset authoring](../asset-authoring.md).
- Local ignored artifacts: `output/stage-2/assistant.svg` and
  `output/stage-2/index.html`. The HTML is a review preview, not Studio.

## Limitations and next stage

PNG is explicitly unsupported. HTTP, Studio, batches, release packaging, and remote
CI remain outside this stage. Labels use system fonts, so identical SVG bytes do not
promise identical text rasterization on every platform. The SVG compiler handles a
restricted authored vocabulary, not arbitrary uploaded SVG. The resource key is
canonical JSON, not an HTTP ETag or cryptographic hash.

No reviewed snapshots have been created or accepted automatically. The rejected prototype digest was removed without accepting a replacement visual
baseline. Generation contracts and independent-process output remain tested.

Stage 3 expands the catalog, chooses the PNG backend, implements batch output and
manifests, and prepares a 5 by 4 showcase. Proceed after reviewing this stage.
