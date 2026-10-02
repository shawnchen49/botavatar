---
name: add-avatar-asset
description: Add or revise Bot Avatar hair, hats, occupational palettes, layered accessories, other parts, or licensed icons through the catalog and asset compiler. Use for asset work, not application UI, export features, or a new rendering style.
---

Keep the first iteration cheap and visual. Preserve template identity across
runtime states and do not replace approved snapshots without explicit approval.

## Load only what the change needs

- Inspect the current catalog entries and neighboring source assets first.
- Read `docs/asset-authoring.md` for new SVG geometry or icons.
- Read `docs/visual-style.md` for art-direction or palette decisions.
- Read `docs/architecture.md` only for identity, manifest, renderer, or style
  boundary changes. Read the nearest package README only when changing that
  package's responsibility or contract.

Do not preload every reference for a small palette or geometry edit.

## Authoring invariants

- The current implementation is Soft Layered 2D under the stable `flat-2d` ID.
  A new style is a separate architecture task.
- Keep template identity, instance variation, and runtime state separate.
  Renderers never select random parts.
- Author body geometry in the supported 256-unit SVG vocabulary and register
  stable IDs, provenance, anchors, hair backs/fits, and accessories as needed.
- Vendor licensed icons unchanged with pinned source, hash, and notice metadata.
- Use dedicated hat tokens when a shared token would recolor hair or unrelated
  templates. Hat emblems must retain at least 3:1 contrast on their real backing.
- Follow ADR 0010 for physical accessory ordering and receiver-clipped shadows.
- Bump the manifest for geometry, tokens, defaults, or candidate-order changes,
  and update renderer compatibility. Bump the renderer version only when drawing
  behavior changes.

## Review-first loop

1. Make the smallest coherent catalog/source change.
2. Run `pnpm assets:build`.
3. Generate 2–6 representative PNGs with the deterministic helper, for example:

   ```bash
   pnpm review:assets -- --template coder --hair hair-side-part --size 64 --size 256
   ```

   Repeat `--template`, `--hair`, `--state`, or `--size` only when the comparison
   needs it. The helper caps a review at eight samples and writes
   `output/asset-review/review.png` plus a JSON request manifest.

4. Show the contact sheet and stop for visual feedback.
5. Iterate with another small sheet. Do not run `pnpm test`, `pnpm check`, the
   full showcases, or generate HTML review galleries before visual approval
   unless the user explicitly asks or a nonvisual contract risk requires it.

After explicit visual approval, add or update behavior tests for the changed
contract and run the narrowest relevant test command. Run `pnpm check` when
handing off the completed stage, as required by repository policy. Run full
showcases only when approving catalog-wide effects. Never auto-accept visual
baselines.

## Cost-aware task routing

Work locally for small catalog edits and visual judgment. Following the repository
delegation policy, use at most one low-cost, read-only worker only when it can
independently inventory many affected IDs/files, collect licensing provenance, or
triage a broad mechanical failure. Give it exact paths, acceptance criteria, a
concise return format, and no permission to edit or delegate further. Do not
delegate geometry, palette taste, or final visual approval.
