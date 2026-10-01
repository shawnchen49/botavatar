# Occupational hat collection

Superseded by [approved visual restoration](approved-hat-expansion.md) after user
rejection. The following records the previous, unapproved iteration.

Manifest 1.8.1 / SVG renderer 0.10.0. Implemented for visual review; existing
approved snapshots remain unchanged.

## Changes

- Redraw all six original hats with solid fills, restrained construction seams,
  and continuous 2.4-unit tonal edges against the fringe.
- Add six silhouettes: flatcap, patrol cap, pilot cap, field cap, visor, and
  academic cap. Twenty roles now use twelve silhouettes instead of six.
- Use ivory flatcaps for Docs, yellow hardhats for Build, navy patrol caps with
  gold shields for Security, and orange pilot caps with simple goggles for Deploy.
  Research uses a navy academic cap with cream sparkle and silver hair; Data uses
  cyan to remain distinguishable at small sizes.
- Fit each emblem to its hat, preserve upstream Lucide paths, and retain dark
  plaques only for Git and Shell. Every emblem has at least 3:1 contrast against
  its surface or plaque.
- Replace the exposed visor hair crown with a smooth, low closed sports crown
  after browser feedback. All three existing hairstyles use their normal geometry.
  Template IDs, role aliases, state behavior, and seeded selection remain stable;
  the manifest version records the changed visual identities.

## Verification

`pnpm assets:build`, production build, workspace policy, formatting, lint, and type
checking pass. The full `pnpm check` test phase reports 101 passing tests and 31
failed approved-visual comparisons. All failures compare newly proposed SVG output
against manifest 1.4.2 / renderer 0.6.2 snapshots. Those snapshots also predate the
previous Fine Line changes. No snapshots were replaced or assertions bypassed.

The focused generation, badge, and hat tests pass (75 tests). New raster checks
verify transparent perimeter clearance for every silhouette at 64, 128, 256,
and 512 pixels; contrast checks cover every template. Existing checks cover all
curated hair colors, identity preservation across states, licensed glyph geometry,
CLI/API output, and portable distribution.

`pnpm showcase` generates the standard review. `pnpm showcase:hats` generates
`output/hat-collection/index.html`, individual SVG/PNG exports, a twenty-role
catalog, all four native sizes for every role, six-state previews, all permitted
hairstyles, and a comparison to the approved catalog. These are ignored outputs.
Visual inspection covers the catalog at native small sizes, the large hat contours,
the hairstyle sheet, and the six-state sheet. Construction lines are now 2.4 units, doubled from the first proposal to stay
visible without competing with the emblems.

## Next review

Review the occupational pairings, especially the academic caps, low sports crowns, and
pilot cap. After explicit visual approval, update snapshots as a separate stage.
This collection is an authored flat SVG interpretation; no claim of universal
occupational recognition or equivalence to a reference image is made.

## Browser feedback, manifest 1.8.1

All five comments are implemented: stronger structure lines across the collection;
a shallow, firm bucket brim with raised side tips; mirrored baseball-cap panels
and brim; solid navy goggle frames with pale-blue lenses and a brown strap; and a
smooth sports crown that fully covers the head. Three new behavior checks cover
cap-panel symmetry, filled goggle colors, and upper-head coverage for all hair
styles. All 101 non-baseline tests pass; 31 approved-baseline comparisons still
require user visual approval.
