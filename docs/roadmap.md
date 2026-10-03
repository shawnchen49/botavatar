# Review stages

Each stage ends with a reviewable diff, verification evidence, and explicit remaining
work. Stage completion is not equivalent to completion of the full product.

## Stage 1 Repository foundation

Status: implemented and locally verified. See the [Stage 1 review](reviews/stage-1.md).

Current review scope:

- Seven private workspaces with a shared strict TypeScript build graph.
- Public immutable request and identity types in Core.
- English architecture, development standards, agent rules, and a module-addition skill.
- Git exclusions for local drafts and generated output.
- Formatting, lint, workspace boundary checks, architectural tests, and CI configuration.

Review package responsibilities, type boundaries, conventions, and the dependency
policy before proceeding to the first generator implementation.

## Stage 2 First deterministic SVG

Status: implemented, locally verified, and visually approved on 2026-10-01. See the
[Stage 2 review](reviews/stage-2.md).

- Define the versioned asset manifest, runtime schemas, normalized contract, and seed policy.
- Add one face, one hat, three hat badges, and the initial state/instance overlays.
- Implement asset validation and embedding, seeded normalization, SVG IR, and flat-2d rendering.
- Add a CLI generation path and fixed-seed regression tests.
- Review the first avatar, invalid-input behavior, identity preservation, and package portability.

## Stage 3 Catalog and export

Status: implemented and locally verified; PNG showcase ready for review. See [Stages 3–5 review](reviews/stages-3-5.md).

- Expand hats, hairstyles, palettes, hat badges, instance badges, and state expressions.
- Select the PNG backend and add batch generation with an output manifest.
- Generate a 5 by 4 showcase and review 64, 128, 256, and 512 pixel output.
- Extract an asset-addition skill from the working, validated asset pipeline.

## Stage 4 API and Studio

Status: implemented and locally verified; Studio ready for review. See [Stages 3–5 review](reviews/stages-3-5.md).

- Add Fastify routing, request limits, instance lookup, cache identity, and metadata.
- Add React/Vite Studio for selection, preview, URL sharing, and SVG/PNG export.
- Verify CLI/API output equivalence and selected UI flows with Playwright.

## Stage 5 Release preparation

Status: implemented for the user-selected local/offline channel. Packages remain private / UNLICENSED; public licensing, publishing, containers, and deployment are not selected. See [local delivery](local-distribution.md).

- Record licensing status and the selected distribution channel.
- Validate asset provenance, offline package behavior, and release contents.
- Add release automation and a container only for the selected delivery path.

## Badge refinement — 2026-10-01

Implemented: remove glasses support from flat-2d, reduce/inset instance badges,
add face-clipped contact shadows, enlarge two-letter monograms, and import raster
logos with automatic rim colors. See [badge refinement review](reviews/badge-refinement.md).
The next review is visual approval of the five changed instance-badge baselines;
existing approved snapshots remain untouched.

Studio follow-up: simplify controls, temporarily hide image import, preserve badges
on template changes, and use a contrasting slate background (manifest 1.5.1).

## Hat refinement — 2026-10-01

Implemented for visual review: occupational hat palettes, flatter hat gradients,
thinner brim seams, and a narrower contact shadow. See
[hat refinement review](reviews/hat-refinement.md). Existing approved snapshots
remain unchanged until the updated catalog is visually approved.

## Fine Line and curated hair — 2026-10-01

Implemented: solid avatar fills, thin hat seams, fixed template emblem colors, and
five curated hair colors per template. See [the review](reviews/fine-line.md) and
ADR 0007. Review generated samples
before updating approved visual snapshots.

## Occupational hat collection — 2026-10-01

Implemented for review: redraw all six original hats, introduce six occupational
silhouettes, fit open-visored hair, and curate twenty role/emblem/color identities.
See [the collection review](reviews/hat-collection.md). Next stage: user visual
review at native sizes, followed by explicitly approved snapshot updates.

Browser review follow-up (manifest 1.8.1): strengthen structure lines, reshape the
bucket brim, mirror baseball-cap geometry, fill pilot goggles, and close the low
sports crown. These proposals remain pending visual approval.

## Restore 1.4.2 and expand additively — 2026-10-01

The user rejected the later redraws in favor of the approved control group.
Manifest 1.9.0 restores all twenty original identities and adds three independent
hat variants. See [the restoration review](reviews/approved-hat-expansion.md) and
ADR 0009. The preceding Fine Line and occupational replacement stages are
superseded. Next: review the three additions against the original visual family.

## Soft Layered 2D accessories — 2026-10-01

Manifest 1.9.1 / renderer 0.12.0 implements independent pilot strap, frame, and
lens assets, with local hat-clipped contact shadows. Original 1.4.2 identities
remain unchanged. See [the review](reviews/soft-layered-accessories.md). Next:
review this accessory depth before extending raised treatments to other hats.

## Compact Studio and stable expressions — 2026-10-01

The editor now keeps preview, state selection, settings, and export within the
1027 by 784 desktop viewport, including expanded seed and letter-badge controls.
Hair colors use circular swatches. Renderer 0.13.0 aligns all expressions to the
approved idle centers; manifest 1.9.2 uses slate backgrounds to separate the face.
The five non-idle state and five existing badge snapshot differences require
visual approval; approved snapshots remain unchanged. Next: review expression
alignment, background contrast, and the compact desktop workspace.

Studio review follow-up: remove the introductory slogan, restore export actions
to the right column bottom, and show named circular swatches in a dropdown.
Manifest 1.9.3 expands hair palettes to 11–14 colors while retaining defaults.
Next: review the expanded palette and right-side export placement.

## Occupational hardhat palettes — 2026-10-01

Manifest 1.9.4 changes the build hardhat from blue to engineering yellow and adds
an optional red hardhat with a white emblem. Dedicated color tokens leave hair
and other identities unchanged. The catalog now contains 24 templates.
Next: review both hardhats at four sizes and six states in the generated hat
showcase before approving any replacement of the existing build snapshot.

Verification: asset compilation, formatting, lint, type checking, and builds pass.
`pnpm check` reports 122 passing tests and 11 approved-snapshot mismatches: the
new Build color difference plus the ten previously documented badge/expression
differences. No approved snapshots were replaced. Both hardhat palettes were
visually inspected at 64, 128, 256, and 512 pixels and across all six states.

## Remaining occupational palette review — 2026-10-01

Manifest 1.9.5 refines ten existing identities after the user's request to review
all remaining hats together. The visual-style guide records the per-role choices
and retained palettes. Emblem contrast now covers the entire catalog, while
hat silhouettes, hair defaults, role aliases, and all 24 template IDs remain.
Next: review the full catalog, especially the leather aviator, taupe editor,
olive debug hat, and light emblems, before approving changed visual baselines.

Verification: all ten revised identities were inspected at 64, 128, 256, and
512 pixels and in six states. Asset compilation, format, lint, type checking,
production builds, and whole-catalog emblem contrast pass. `pnpm check` reports
114 passing tests and 19 approved-snapshot mismatches: nine original catalog
identities with proposed palette changes (including the yellow hardhat), plus
the ten existing badge/expression differences. The two optional editorial and
aviator templates have no approved snapshots. Existing baselines remain intact.

## Skill consolidation and style boundary audit — 2026-10-01

The existing `add-avatar-asset` skill now includes the practiced hat workflow:
occupational palettes, independent color tokens, emblem contrast, physical
accessory layering, manifest compatibility, and before/after visual review.
No overlapping hat-only skill is needed.

The architecture document now distinguishes reusable injection/identity contracts
from working multi-style application support. Soft Layered 2D remains the only
implemented profile, identified by `flat-2d`. The next style stage requires a
real second profile plus catalog/renderer routing, style-aware application
controls and asset compilation, and end-to-end validation; it is not implemented
by this documentation and skill update.

Verification: `/v1/styles` exposes only `flat-2d`; a matching style request returns
200 and a conflicting style returns 400. `pnpm check` remains at 114 passing
checks and the same 19 pending visual-baseline mismatches from the palette stage.
No runtime or visual behavior changed in this audit. Independent skill structure
and reference checks pass; the bundled Python skill validator could not run
because its PyYAML dependency is unavailable.

## Template ids match role semantics — 2026-10-01

Manifest 1.9.6 renames the default templates whose ids disagreed with their hats
and roles: `assistant` to `coder`, `builder` to `test`, and `caretaker` to
`security`. `security-officer` remains the patrol-cap variant. Legacy ids stay
in the role map and normalize to the preferred id, so old requests keep the same
hat, emblem, and resource identity as the new id. Renderer 0.13.0 still draws
the avatar; only the SVG title uses the preferred id. See
[ADR 0011](decisions/0011-template-id-semantics.md).

`research` still shares `badge-sparkle` with `ai`. No academic emblem is in the
vendored catalog, so that badge was left in place.

Verification: alias requests match preferred-id output, variant ids stay
distinct, and regression SVGs differ only by the title text for the renamed
templates. Next: a separate academic emblem for research, only if a fitting
badge is added through the asset pipeline.

## Flat 2D hair expansion and coder refinement — 2026-10-02

Manifest 1.12.0 adds a side part, retains sweep and wave, and removes the
straight-fringe crop. Proposed spikes and curls did not pass visual review and
were removed. All 24 templates expose the three remaining choices. Coder keeps its
beanie and code identity but now uses charcoal knit, a cyan emblem, cocoa hair,
and the side-part seeded default instead of purple-on-purple crop fringe.
See [the visual review](reviews/flat-2d-hair-and-coder.md).

Next: inspect the focused `output/asset-review/review.png` contact sheet, iterate
on rejected candidates, then explicitly approve any changed visual baselines.

Verification: asset compilation, formatting, lint, type checking, builds, the
whole-catalog 3:1 emblem contrast check, and 121 behavior tests pass. The 16
remaining failures are intentionally unchanged approved requests that still
select the removed `hair-crop`: five catalog identities, five coder instance
badges, and six coder states. Focused review samples were generated; approved
baselines were not replaced.

## Style skills and canonical name — 2026-10-02

Split asset delivery from visual judgment: `add-avatar-asset` is the workflow
entrypoint; `bot-avatar-soft-layered-2d` provides the style contract with short
hat and hair references. The visual brief now distinguishes current rules from
superseded restoration details and pending previews.

Manifest 1.13.0 names the profile `soft-layered-2d`, renames source directories
and style-specific identifiers, and accepts explicit `flat-2d` requests as a
legacy alias. Source geometry and renderer 0.13.0 drawing behavior are unchanged.
See ADR 0012. This does not add a second style.

Verification: workspace checks, formatting, lint, asset compilation, types, and
production builds pass. `pnpm check` reports 123 passing tests and the same 16
removed-`hair-crop` baseline failures. All 21 moved SVG sources match their
previous bytes; approved snapshots remain untouched. Both skill entrypoints and
local links were checked. The bundled skill validator could not run because
system Python lacks PyYAML; this is not reported as a validator pass.

Next: exercise the separated workflow on one requested hat or hairstyle and
review its small contact sheet before expanding the catalog.

## Curtain and soft-curl hair preview — 2026-10-02

Manifest 1.14.0 adds `hair-curtain` and `hair-soft-curls`, including a dedicated
curly back silhouette. Existing hairstyles remain available. The expanded
candidate set can change seed-selected hair; explicit choices remain stable,
and coder keeps its side-part selection for the default seed.

Asset compilation and focused beanie/bucket previews at 64 and 256 pixels are
ready. Approved snapshots are untouched. Next: user visual feedback on the
small contact sheet before final validation and baseline decisions.

## Layered and wispy fringe preview — 2026-10-02

The user accepted the curtain and soft-curl additions. Manifest 1.15.0 adds
`hair-layered-fringe` and `hair-wispy-fringe` with staggered broad locks and
restrained internal separation lines. Both reuse the compact back silhouette.
Coder retains its default-seed side part; explicit existing hair choices remain
valid. Expanding the catalog can change other seeded selections.

The focused sheet compares both candidates under beanie and bucket hats at 64
and 256 pixels. Next: user visual feedback on these two new candidates. Existing
approved snapshots remain unchanged; approval of the two preceding hairstyles
does not select replacement requests for the removed-crop baselines.

Verification: asset compilation, formatting, lint, types, and production build
pass. The full check has 123 passing tests and the same 16 removed-crop baseline
failures. Seed coverage now checks all seven choices, and state-invariance checks
include both new candidates across all templates. No snapshots were replaced.

## Four hairstyle approvals — 2026-10-02

The user approved curtain, soft curls, layered fringe, and wispy fringe.
Eight new regression SVGs preserve the reviewed beanie and bucket combinations
at 256 pixels. The seven-style catalog remains manifest 1.15.0; this records
approval without changing runtime behavior. Original baselines are unchanged.

The old removed-crop requests remain a separate migration decision. Approval of
these four additions does not choose replacements for sixteen historical
identity, badge, and state requests. Next: select and review those replacement
requests when the baseline migration is requested.

Verification: workspace policy, formatting, lint, types, and production build
pass. `pnpm check` reports 131 passing tests, including all eight new baselines,
and the same sixteen removed-crop failures. Original baseline files and requests
match HEAD; all 39 recorded SHA-256 hashes match their SVGs.

## Retired-crop baseline migration — 2026-10-02

After approving the four additions, the user requested repair of the failing
checks. All sixteen active requests for removed `hair-crop` now explicitly select
approved `hair-curtain`. Role, badge, and state settings are unchanged. Historical
SVGs, hashes, and requests are retained in `tests/snapshots/historical/hair-crop/`.
Other baseline entries are untouched. Regression assertions now also verify each
active snapshot's recorded SHA-256. No tests are skipped and removed hair stays
invalid. Runtime code, catalog, and renderer versions do not change.

Verification: `pnpm check` passes, including all 147 tests and the final production
build. All 39 active and 16 historical hashes match. Archived SVGs match their
original Git bytes, and only the hair-style field changed in migrated requests.
The focused migration preview was inspected across all sixteen cases.

## Repeatable README examples — 2026-10-03

`pnpm docs:readme` builds the current project, renders the configured role gallery,
all seven hairstyles, six states, and the runnable quick-start request, then
captures Studio. `examples/readme.json` owns curated role choices; the catalog
supplies versions and hair choices. The removed-crop quick-start request now
uses side-part hair. Generated README sections are bounded by explicit markers.

`docs/images/readme-manifest.json` records each avatar request and PNG hash.
Integration tests detect stale versions, missing catalog choices, and images
that differ from current renderer output. The refresh never changes approved
visual baselines or branding. Browser capture uses Playwright Chromium or the
explicit `PLAYWRIGHT_CHANNEL=chrome` option for installed Chrome.

Two consecutive refreshes produced identical README, PNG, and manifest bytes.
The hair sheet and actual Studio capture were inspected. Next: rerun the command
when catalog or renderer changes, review the diff, and commit the refreshed docs.

Verification: `pnpm check` passes with all 172 tests, including per-image
README regeneration checks, and the final production build. Snapshot baselines
remain untouched. The refresh was run twice with installed Chrome; all generated
bytes were unchanged on the second run.

## Compact README gallery — 2026-10-03

Remove the dedicated hairstyle and state comparison sections as requested.
The README refresh now generates only the curated role gallery, quick-start
image, catalog summary, and Studio screenshot. Product hair and state support
remain unchanged. Remove the unused comparison images and their manifest entries;
retain generation checks for all remaining README examples.
