# Badge refinement review

The current style no longer offers glasses and rejects non-none glasses requests.
Instance badges now have a 27-unit radius, a 3.5-unit rim, and center (210, 210),
replacing the former 32-unit radius at (219, 219). A restrained contact shadow is
clipped to the face. Two-letter monograms use 24-unit text.

Studio imports PNG, JPEG, and WebP, converts them locally to a bounded embedded
PNG, and selects a dominant foreground rim color. White and transparent pixels do
not dominate color selection. The palette remains available for manual overrides.
Images survive state changes, share-link reloads, and SVG/PNG exports. Failed
imports retain the existing badge. See ADR 0007 for validation and size limits.

Verification:

- Workspace policy, formatting, lint, type checking, asset compilation, and build pass.
- 106 behavioral/integration tests pass. `pnpm check` remains red solely on five
  existing instance-badge visual snapshots, as expected for the requested change.
  Those approved files have not been replaced.
- All four Playwright flows pass using installed Chrome, including import, detected
  color, shared URL restoration, both exports, and invalid-image recovery.
- `pnpm showcase` succeeds. Generated review assets in `output/badge-review/`
  include 64/128/256/512-pixel monograms and all six runtime states. Visual
  inspection checks overlap, contact shadow, text readability, and transparency.

The supplied reference is saved locally under
`docs/draft/assets/reviewer-build-badge-reference.png`; it is not a runtime input.

Limitations: SVG imports are unsupported; label fonts depend on the local system.
Automatic color is a foreground histogram, not semantic brand recognition.
Image-containing share links can be long. The existing offline delivery bundle
has not been repackaged; the local preview runs the updated workspace build.
Next stage: review the proposed badge appearance before updating visual baselines.

## Studio interaction follow-up

Image import controls and their help text are temporarily hidden, including the
new-image option. Existing embedded-image configurations still preview and export.
Letters show their text field before color controls; icon choices do not show an
irrelevant label field. Seed is under a collapsed Advanced disclosure. Switching
templates preserves instance settings. Rendering retains the previous preview
until the new image arrives, while exports are disabled during the update; invalid
requests still clear the preview.

The editor uses a smaller introduction, grouped controls, a sticky desktop preview,
and background buttons with swatches. Manifest 1.5.1 changes the background base to
slate (#687d8b), separating the cream face from solid and gradient backgrounds in
both preview and exported files. No approved visual snapshots were replaced.
The four browser flows pass with coverage of the hidden upload UI, existing-image
restoration, background switching, template changes, and exports.
