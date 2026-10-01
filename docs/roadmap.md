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
