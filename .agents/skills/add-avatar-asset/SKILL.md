---
name: add-avatar-asset
description: Add or revise Bot Avatar hats, occupational palettes, layered accessories, other parts, or licensed icons through the catalog, asset compiler, and visual review pipeline. Use for asset and catalog work, not application UI, export features, or implementing a new rendering style.
---

Read `docs/architecture.md`, `docs/asset-authoring.md`, `docs/visual-style.md`,
and the relevant design-tokens and renderer READMEs before editing. Preserve
template identity across runtime states.

## Scope and style

- Identify whether the request changes a palette, geometry, emblem, physical
  accessory, or adds a template. A palette request alone does not call for new
  silhouettes, changed hair defaults, or reassigned role aliases.
- The current implementation is Soft Layered 2D under the stable `flat-2d` ID.
  Its paint, SVG vocabulary, hair fitting, and contact shadows are profile rules,
  not requirements for every future style. A new rendering style needs a separate
  architecture task; adding a hat does not implement multi-style routing.
- Reuse existing hats when geometry already fits. Add optional variants when
  requested; preserve existing IDs and role defaults unless changing them is
  part of the user's request. Keep historical visual decisions in the docs,
  rather than copying a fixed catalog or version into this skill.

## Authoring

- Author current-profile body geometry in the supported 256-unit SVG vocabulary.
  Register stable IDs, provenance, and anchors in the catalog. Update explicit
  hat mounts, per-hairstyle fitting, and accessory data where needed.
- For emblems and instance icons, vendor unmodified upstream Lucide files with
  pinned URLs, hashes, and original notices. Reuse existing glyphs, adapting
  color and placement rather than redrawing their paths.
- Judge occupational colors from the silhouette, role, material, and emblem
  together. Familiar colors are visual associations, not universal uniform
  regulations; software roles need not have invented uniform rules.
- Use dedicated hat tokens when changing a shared token would also recolor hair
  or unrelated templates. Check the emblem against its actual backing, including
  dark plaques. For this profile, maintain the catalog's 3:1 emblem contrast
  check and inspect readability at 64 pixels.
- Printed emblems stay on the surface. For tangible accessories, follow ADR 0010:
  separate physical pieces, ordered layers, short receiver-clipped contact
  shadows, and filled/recessed lenses. Keep these choices deterministic in
  design data and rendering; never select random parts in a renderer.
- Bump the manifest for geometry, tokens, defaults, or candidate order changes,
  and update the renderer's supported manifest check. Bump the renderer version
  when drawing behavior changes. Do not broaden version compatibility without
  checking that the renderer can consume the new manifest.

## Verification and review

- Run `pnpm assets:build` and behavior tests for the changed contract: stable
  identity across six states, deterministic output, valid catalog inputs,
  emblem contrast, and accessory ordering/shadow confinement where applicable.
- Run `pnpm showcase`; for hats, also run `pnpm showcase:hats`. Inspect affected
  identities at native 64, 128, 256, and 512 pixel sizes, all six states, and
  supported hairstyles. Check silhouette clearance, mounts, transparency,
  accessory separation, and unintended changes to hair or other identities.
- Compare before/after output using identical requests, seeds, and hairstyles.
  Keep generated modules and previews out of Git. Update the review generator
  if an addition makes its layout or explanatory text inaccurate.
- Run `pnpm check`. Report passing checks and actual failures separately,
  distinguishing new palette/geometry differences from already pending changes.
  Existing `tests/snapshots/` files represent explicit user approval: propose
  changed visuals before replacing them; never auto-accept a failed baseline.
- Record the current stage and next visual review in `docs/roadmap.md`. Put
  consequential architecture changes in an ADR, not in asset-specific rules.
