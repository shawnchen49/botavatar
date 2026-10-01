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
