# Occupational hats and flatter rendering

Superseded by [Fine Line and curated hair](fine-line.md).

Manifest 1.6.0 and SVG renderer 0.8.0 refine the existing catalog for visual review.
Build uses a yellow hardhat, Docs uses paper ivory, and Security uses navy. Their
coordinated default hair colors follow the new palettes; explicit instance hair
colors remain independent. Stable template IDs, emblems, and role aliases remain
unchanged. Design retains its beret and Search retains its sand deerstalker.

All six hats use thinner, lighter brim seams. Hat gradients have much less tonal
variation. The receiver-clipped contact shadow uses 1.2 units of blur, 1.5 units of
offset, and 8% opacity, preserving a slight transition into the fringe without a
wide dark band. Face, hair geometry, expressions, and instance badges are unchanged.

Review artifacts are generated under `output/hat-review/`: the twenty-role catalog,
all four output sizes, and all six runtime states. `pnpm showcase` also regenerates
the standard export review. These outputs are proposals, not approved baselines.

Verification: asset compilation and the focused generation/badge suite pass
(57 tests). Workspace policy, formatting, lint, type checking, and the production build pass.
`pnpm check` reaches the full test suite: 83 tests pass and only the 31 approved
visual-baseline comparisons fail because the proposed appearance has changed.
Existing `tests/snapshots/` are preserved; comparisons against the previous visual
appearance are expected to fail pending approval of this revision.

Next stage: review the occupational palettes and the hat-to-fringe transition,
then replace visual baselines only after explicit visual approval.
