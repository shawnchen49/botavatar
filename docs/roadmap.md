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

- Define the versioned asset manifest, runtime schemas, normalized contract, and seed policy.
- Add one face, one hat, three hat badges, and the initial state/instance overlays.
- Implement asset validation and embedding, seeded normalization, SVG IR, and flat-2d rendering.
- Add a CLI generation path and fixed-seed regression tests.
- Review the first avatar, invalid-input behavior, identity preservation, and package portability.

## Stage 3 Catalog and export

- Expand hats, hairstyles, palettes, hat badges, instance badges, and state expressions.
- Select the PNG backend and add batch generation with an output manifest.
- Generate a 5 by 4 showcase and review 64, 128, 256, and 512 pixel output.
- Extract an asset-addition skill from the working, validated asset pipeline.

## Stage 4 API and Studio

- Add Fastify routing, request limits, instance lookup, cache identity, and metadata.
- Add React/Vite Studio for selection, preview, URL sharing, and SVG/PNG export.
- Verify CLI/API output equivalence and selected UI flows with Playwright.

## Stage 5 Release preparation

- Select a license and distribution channel.
- Validate asset provenance, offline package behavior, and release contents.
- Add release automation and a container only for the selected delivery path.
