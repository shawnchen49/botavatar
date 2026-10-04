---
name: add-avatar-asset
description: Add or revise Bot Avatar parts, palettes, or licensed icons through the catalog, compiler, and visual review. Owns asset delivery; load the selected style skill for visual decisions. Excludes application UI and implementing a new renderer style.
---

## Select the contract

- Inspect the target template, catalog entries, and neighboring source assets.
- For `soft-layered-2d` (legacy alias `flat-2d`), load
  [the style skill](../bot-avatar-soft-layered-2d/SKILL.md). Do not apply its
  visual rules to another style. An unimplemented style needs an architecture
  task before assets can be integrated.
- Read [asset authoring](../../../docs/asset-authoring.md) for SVG or icon work.
  Read architecture only for identity, manifest, or renderer contract changes.

## Integrate

- Preserve template identity, instance variation, and runtime-state boundaries.
  Renderers never select parts randomly.
- Register stable asset IDs, provenance, anchors, and required fitting data.
  Keep licensed icon sources unchanged. Isolate color tokens when a shared
  token would alter unrelated assets.
- Bump the manifest for geometry, tokens, defaults, or candidate-order changes;
  update renderer compatibility. Bump the renderer version only for drawing changes.

## Review and finish

1. Make a small coherent change and run `pnpm assets:build`.
2. Generate 2–6 focused samples, normally at 64 and 256 pixels:

   ```bash
   pnpm review:assets -- --template coder --hair hair-side-part --size 64 --size 256
   ```

3. Inspect and show `output/asset-review/review.png`. Seek visual feedback before
   expanding the catalog or replacing approved baselines. Iterate with a small
   sheet; avoid full galleries and broad tests before that feedback unless a
   contract risk or the user's request requires them.
4. After visual approval, test changed behavior and run `pnpm check` for handoff.
   Report existing failures separately; never auto-accept snapshots.

## When it fails

| If                                                                          | First fix                                                             | If that still fails                               |
| --------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------- |
| `pnpm assets:build` fails                                                   | Fix the registration or source the build reports                      | Stop. Do not generate the review sheet            |
| The style skill rejects the samples, or they only read at one of 64 and 256 | Revise that part under the style skill and regenerate the small sheet | Do not expand the catalog                         |
| Visual feedback has not approved the samples                                | Stop. Leave the catalog and approved baselines unchanged              | Do not replace those baselines                    |
| The target style is not implemented                                         | Open an architecture task first                                       | Do not integrate assets for that style            |
| `pnpm check` fails on tests this change did not touch                       | Report those failures separately                                      | Do not auto-accept snapshots to make the run pass |
| A shared color token would change unrelated assets                          | Isolate the token                                                     | Do not ship the shared change                     |
