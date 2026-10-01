---
name: add-avatar-asset
description: Add or revise a Bot Avatar part or licensed icon through its catalog, asset compiler, and visual review pipeline. Use for asset geometry and catalog changes, not application UI or export features.
---

Read `docs/asset-authoring.md`, `docs/visual-style.md`, and the design-tokens and
SVG renderer READMEs before editing. Preserve template identity across states.

- Author body geometry in the supported 256-unit SVG vocabulary. For emblems and
  instance icons, vendor unmodified upstream Lucide files with pinned source URLs,
  hashes, and original notices. Do not redraw existing glyphs.
- Register stable IDs, provenance, and anchors in the catalog. Update mappings and
  explicit per-hat fitting data where needed; do not add renderer randomness.
- Bump the manifest version when geometry, tokens, defaults, or candidate order
  changes. Bump the renderer version when drawing behavior changes.
- Run `pnpm assets:build` and focused behavioral tests. Generate a review with
  `pnpm showcase`; inspect the affected identities at 64, 128, 256, and 512 pixels
  and across all six states. Check clipping, mounted icons, transparency, and
  unchanged identity.
- Run `pnpm check`. Keep generated modules and previews out of Git. Existing
  `tests/snapshots/` files represent explicit user approval: propose changed
  visuals for review before replacing them. Do not automatically accept a failed
  baseline assertion.
