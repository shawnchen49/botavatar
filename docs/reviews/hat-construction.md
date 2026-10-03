# Hat construction review

Retained and synchronized version: manifest 1.19.6; renderer 0.13.0.
The user authorized syncing the final retained hats for submission on 2026-10-04.
The initial proposal was manifest 1.19.0; rejected iterations remain documented below.

The user requested six hat types inspired by a supplied avatar reference image.
The attached prompt library is reference material, not a replacement contract.
Transfer recognizable construction and credible overlap into the existing
front-facing Soft Layered 2D family. Keep the face, eyes, palettes, soft paint,
material filter, and contact shadows.

## Changes

- Beanie: rounder exposed crown, narrower folded cuff, restrained ribs, and a
  smaller emblem fitted to the cuff. The terminal plaque remains centered.
- Baseball cap: simpler panels, a crown button, a softly asymmetric projecting
  visor, and a narrow underside edge.
- Bucket: a rounded trapezoidal crown, encircling seam, and a flared descending
  brim with a restrained turned edge.
- Hardhat: continuous protective dome, raised side ribs, top ridge, mounting
  tabs, and a shallow rigid rim. Both yellow and red versions share the asset.
- Officer cap: rounded flared crown, darker band, short distinct visor, and
  restrained side fasteners. Only the existing `security-officer` variant uses it.
- Backward cap: a separate crown with a rear opening, adjustment strap and holes,
  and a short side glimpse of the rear-facing bill. The optional `git-backward`
  template inherits Git's palette and emblem. `git` remains the role default.

Five shared source assets change all templates using those hats, as requested.
Beret, deerstalker, flatcap, and pilot geometry are untouched. The optional
backward template is appended so existing catalog order is preserved. The
existing renderer is sufficient; no new rendering mode or architecture is needed.

## Visual evidence

Generated evidence lives under `output/hat-structure-review/` and is not committed.
`compare-0.png` compares beanie, cap, and bucket; `compare-1.png` compares hardhat,
officer cap, and the new backward variant with the existing forward Git cap.
Each comparison places the current pre-edit rendering above the candidate.
The pre-edit rendering is a working-tree control, not a new approved baseline.
`after-wide-0.png` and `after-wide-1.png` check feather-flip hair.
`output/asset-review/review.png` collects all six candidates.

Every sample uses idle state, solid slate background, and cocoa hair. Main
avatars are 256 pixels with native 64-pixel companions. Side-part and the wider
feather-flip samples were inspected for hair-root gaps, brim collisions, emblem
placement, and silhouette readability. No additional hair-fit asset was needed.

## Verification and next review

Asset compilation, workspace policy, formatting, lint, TypeScript, and production
build pass. Existing tests include deterministic generation, state-invariant
identity, all allowed hair, transparent export perimeter at all four sizes, and
emblem contrast. The optional-role test now also protects the Git default.

`pnpm check`: 126 passed, 51 failed. All failures are visual reference differences:
44 approved SVG snapshots contain affected hats; seven README checks compare
old version metadata or images with the new candidate. These are pending review,
not unrelated pre-existing failures. No tests were weakened, skipped, or updated
to accept the proposals. Approved snapshots and README images remain unchanged.

A subsequent focused hat run hit the default five-second timeout in the beanie
perimeter case. Repeating the same 16 tests with a 20-second per-test timeout
passed all 16; assertions and repository test configuration were unchanged.

Review the six candidates before selecting baseline replacements and refreshing
README examples. No full-catalog visual approval is implied by this preview.

## User review and frontal corrections

The user approved beanie, hardhat, and officer geometry. Twenty-two existing
beanie/hardhat baselines were refreshed with requests preserved; one new
cocoa side-part officer sample records its approved fit. All 26 other existing
baseline files and entries are unchanged, and all 49 active hashes verify.

Manifest 1.19.1 revises the two cap candidates: the baseball crown, panel seams,
button, and brim are mirror-symmetric about the frontal centerline; the backward
strap now shares a continuous lower boundary with the crown. The prior dangling
strap ends are removed. `output/hat-front-review/compare.png` shows matching
cocoa-haired before/after samples at 256 and 64 pixels.

The bucket design was rejected. The user clarified that their intended reference
is a different image and will supply it. Its current source remains an unapproved
candidate pending that reference; this revision does not claim a bucket fix.

A raster silhouette regression checks centered baseball geometry at 64 and 256
pixels with a one-pixel antialiasing boundary tolerance. The previous candidate
fails that criterion; the revised asset passes. `pnpm check` passes workspace,
format, lint, types, and build, and reports 150 passing tests with 29 remaining
reference failures: 22 unapproved cap/bucket snapshots and seven README metadata
or image checks. No unrelated behavior failure remains in that run.

## Supplied bucket reference and cap details

Manifest 1.19.2 follows the subsequently supplied reference image: its second-row
center Debug hat provides the bucket silhouette. The candidate uses rounded
crown shoulders, an upward-arched crown seam, and a continuous flared brim edge.
The previous concave crown seam and extra top/side stitching are removed. The
existing olive palette and Soft Layered 2D material remain unchanged.

The baseball button now uses the same injected fill as the crown instead of a
darker outline stroke. The backward bill is raised and its underside approaches
the crown's lower edge continuously instead of dropping below it at the join.
The three already approved hats and all approved baseline files are unchanged.

`output/hat-reference-review/revised.png` shows all three revisions at 256 and
64 pixels with matching cocoa side-part hair. `wide.png` checks feather-flip
hair, and `compare.png` places the previous candidates above these revisions.
The bucket reference is now resolved; visual approval of these candidates is
still pending.

Verification for 1.19.2: `pnpm check` passes workspace, formatting, lint, types,
and build, with 150 passing tests and the same 29 pending visual reference
failures (22 cap/bucket snapshots and seven README checks). The cap symmetry
regression passes with the new button. No baseline was updated in this revision.

## Fuller backward fit and structured bucket brim

Manifest 1.19.3 responds to the user's close-up reference and fit feedback on
2026-10-04. The backward cap retains its accepted construction, widens by 5%,
and deepens its crown by 13% with a two-unit downward shift at the crown anchor.
This lowers its opening by approximately twelve source units to cover more hair
above the fringe. The emblem mount follows the deeper panel. Face and hair
geometry are unchanged.

The bucket brim now spreads outward independently of the hair contour. A
separate underside shape, shaded with a restrained dark overlay, is exposed
beneath the upper rim and at both outer ends. The wider, lifted outer lip and
rounded underside returns replace the previous edge that hugged the hair.
The approved beanie, hardhat, and officer assets remain unchanged.

`output/hat-fit-review/revised.png` presents both candidates with cocoa side-part
hair at 256 and 64 pixels; `wide.png` checks feather-flip hair. `compare.png`
places the preceding candidates above the new fits. Visual inspection covers
rim clearance, visible underside shade, the adjustment opening, and the bill
connection. These fit revisions do not imply new baseline approval.

Verification for 1.19.3: compilation, workspace policy, formatting, lint, types,
and build pass. The full check records 150 passing tests and the same 29 pending
reference failures. Transparent perimeter checks pass for the larger backward
cap and wider bucket at all four export sizes. Approved snapshots are untouched.

## Bill-free backward cap and rigid brim

Manifest 1.19.4 removes the side bill and its edge stroke at the user's request.
The approved construction direction remains recognizable through the rear
opening and adjustment strap; the larger fit from 1.19.3 is retained.

The bucket's upper brim is now a broad elliptical surface with slightly raised
outer tips. Its front edge bows downward independently of the swept bangs, and
a separate darker underside provides a visible thickness below that edge.
The crown remains rounded and tapered. This deliberately increases rigidity
and projection in response to the requested cowboy-hat-like stiffness, rather
than iterating on the earlier brim that followed the hair contour.

`output/hat-rigid-brim-review/revised.png` and `wide.png` show side-part and
feather-flip fits at 256 and 64 pixels. `compare.png` records the prior and
revised silhouettes with matching cocoa hair and idle state. The previously
approved hats and all baselines remain unchanged; these candidates await review.

Verification for 1.19.4: compilation, workspace, formatting, lint, types, and
build pass. The full check reports 150 passed and the same 29 pending reference
failures (22 cap/bucket snapshots and seven README checks). Export clearance
checks pass for both revised silhouettes. No visual baseline was updated.

## Corrected downward bucket reference

Manifest 1.19.5 supersedes the upturned elliptical brim from 1.19.4. The user
clarified that stiffness means separation from the hair, not raised tips. The
provided close-up shows a descending, outward-flared brim with its side tips
below the central front edge and exposed inside shade at those tips.

The revised crown is wider and softly rounded. The front lip forms a continuous
upward arch across the forehead while the outer sides descend. The underside
is concentrated in the side pockets; its center recedes behind the thin front
lip so the hat does not read as a thick uniform band. No tip curls upward.
Backward-cap geometry, all other hats, hair, and palettes are unchanged.

`output/hat-draped-review/final.png` shows the candidate with cocoa side-part
hair at 256 and 64 pixels. `wide.png` checks feather-flip hair; `compare.png`
contrasts the rejected upturned brim and the corrected descending profile.
The screenshot governs this revision's shape, while current Soft Layered 2D
materials and the olive palette remain in use. Visual approval is pending.

Verification for 1.19.5: compilation, workspace, formatting, lint, types, and
build pass. The full check reports 149 passed and 30 failures: the existing
29 pending cap/bucket and README differences plus an expression-alignment test
that exceeded its existing 15-second timeout. Isolated retry passes both
expression tests in 9.46 seconds without code or timeout changes. Hat perimeter
and other behavior checks pass. Approved snapshots remain unchanged.

## Slight lift and occluded inside returns

Manifest 1.19.6 follows the user's side-detail crop. The front brim and its seam
move upward four source units. Two separate curved underside returns are drawn
before the front brim, which hides their upper portions and leaves small dark
arcs visible at the sides. Their exposed area is deliberately small to read as
a partially hidden inner rim rather than extra flaps. The downward flare,
rounded crown, color, and all other hats are unchanged.

`output/hat-inner-rim-review/revised.png` shows the cocoa side-part candidate at
256 and 64 pixels; `wide.png` checks feather-flip hair. `compare.png` shows the
preceding version above the revised rim. This is still a visual-review candidate;
no baseline has been accepted or replaced in this revision.

The four-times SVG detail `inner-rim-detail.png` makes the left return's
occlusion by the front lip explicit. Verification for 1.19.6 passes compilation,
workspace, formatting, lint, types, and build. The full check reports 150 passed
and the same 29 pending reference failures, with no timeout. No baselines changed.

## Narrow curved returns and recessed inside shade

Manifest 1.19.7 refines the exposed side detail without changing the crown,
brim height, downward flare, or other hats. Each return now separates a darker
recessed surface from a narrow lighter curved edge. The front brim overlaps
both, making the partial occlusion explicit. The recessed surface stays filled
so the shape does not become a loop with background showing through it.
The front lip stroke is reduced from 2.6 to 1.8 source units.

`output/hat-curled-rim-review/revised.png` shows the current side-part fit at
256 and 64 pixels, and `wide.png` checks feather-flip hair. The before/revised
detail pair shows the same four-times SVG view of the left return, allowing
the layered recess to be compared with the previous uniform dark area.
No new visual approval or snapshot replacement is implied.

Verification for 1.19.7: compilation, workspace, formatting, lint, types, and
build pass. The full check reports 150 passed and the same 29 pending visual
reference differences. Both hair fits and the close-up return comparison were
inspected. Approved snapshots remain unchanged.

## Revert the return refinement and stop

On 2026-10-04 the user rejected the 1.19.7 return shape and explicitly selected
the preceding version shown on the left of the detail comparison. Restore the
exact 1.19.6 bucket geometry, lip stroke, and matching manifest compatibility.
The 1.19.7 proposal above is superseded. Retain the slight brim lift and original
small dark inside returns. Stop further visual iteration. Other hats, approved
baselines, and existing unrelated work are unchanged.

Restoration verification: both saved 1.19.6 hair-fit SVGs reproduce byte-for-byte.
Compilation, workspace, formatting, lint, types, and build pass. The full check
has 149 passes, the 29 existing visual reference differences, and one unchanged
expression-test timeout at 15 seconds. No further iteration or baseline update
was performed after restoring the user's selected version.

## Authorized synchronization for submission

On 2026-10-04 the user authorized synchronizing the retained designs and fixing
the pre-commit test failures. Twenty-two existing cap/bucket baselines now match
manifest 1.19.6, preserving their request objects. A new cocoa side-part,
solid-background, idle backward-cap baseline brings the active set to 50.
Other existing baseline bytes are unchanged. README examples, version metadata,
and the Studio screenshot are regenerated from the same runtime.

The expression-alignment test now has one case per output size. Each case still
checks both eyes in all six states against the idle bounds with the same
half-pixel tolerance and 15-second limit. Splitting four independent sizes avoids
charging all 24 rasterizations to one timeout and identifies failing sizes
without reducing coverage or modifying production rendering.

Submission verification: `pnpm check` passes all 183 tests plus workspace,
formatting, lint, types, and production builds. The final Chrome E2E run passes
all eight tests. All 48 snapshot requests present before this work remain
unchanged; the 50 active baseline hashes and outputs verify. Refreshed README
avatar images and the Studio capture were visually inspected. The retained
hat designs are unchanged and ready for submission.
