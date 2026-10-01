# Repository directory structure

Status: approved layout, established incrementally. Stage 2 adds the first generator to the existing workspaces,
quality checks, and documentation. Feature directories appear
when their implementation arrives; empty future directories are not committed.

## Current structure

```text
BotAvatar/
├── .agents/skills/add-workspace-module/SKILL.md
├── .cursor/rules/repository.mdc
├── .github/workflows/ci.yml
├── apps/
│   ├── api/                      # HTTP composition root, Stage 4
│   ├── cli/                      # Local generation, Stage 2
│   └── studio/                   # Browser UI, Stage 4
├── packages/
│   ├── core/
│   │   └── src/
│   │       ├── index.ts          # Public domain exports
│   │       ├── schema/request.ts # Runtime schema and inferred input types
│   │       ├── normalize.ts      # Seed, defaults, identity, generation
│   │       ├── composition.ts    # Semantic layer order
│   │       ├── catalog.ts        # Catalog contracts and validation
│   │       ├── errors.ts         # Typed domain failures
│   │       └── model/avatar.ts   # Template, instance, state, request
│   ├── design-tokens/            # Tokens, templates, catalog data
│   ├── renderer-svg/             # SVG IR and flat-2d rendering
│   └── renderer-png/             # SVG-to-PNG adapter
├── assets/
│   ├── parts/flat-2d/            # Production source parts
│   ├── badges/
│   │   ├── hat/                  # Template identity
│   │   └── instance/             # Individual overlay identity
│   └── LICENSES.md
├── examples/
│   ├── requests/
│   └── instances/
├── scripts/
│   ├── compile-assets.mjs        # Validate and embed source SVG
│   ├── workspace-policy.mjs      # Allowed dependency graph
│   ├── check-workspace.mjs       # Manifest validation
│   └── eslint-boundaries.mjs     # Public import and platform boundaries
├── tests/integration/
│   ├── generation.test.mjs       # SVG, CLI, assets, portability
│   └── workspace.test.mjs        # Positive and negative guardrail tests
├── docs/
│   ├── architecture.md
│   ├── coding-standards.md
│   ├── directory-structure.md
│   ├── roadmap.md
│   ├── reviews/stage-1.md
│   └── decisions/
│       └── 0001-workspace-foundation.md
├── AGENTS.md
├── CONTRIBUTING.md
├── README.md
├── .editorconfig
├── .gitignore
├── .node-version
├── .prettierignore
├── .prettierrc.json
├── eslint.config.mjs
├── package.json
├── pnpm-lock.yaml
├── pnpm-workspace.yaml
├── tsconfig.json                 # Workspace project references
├── tsconfig.base.json            # Shared strict compiler settings
└── vitest.config.ts
```

Each workspace contains `README.md`, `package.json`, `tsconfig.json`, and
`src/index.ts`. Core, design tokens, SVG rendering, and CLI expose working generation capabilities.
API, Studio, and PNG remain scaffolds. Browser and application-specific
build configuration will arrive with the corresponding implementation.

Local `docs/draft/` content is ignored and not part of this maintained tree.

## Planned feature placement as modules grow

```text
apps/cli/src/
├── commands/                     # generate, batch, metadata
└── output/                       # File writes and export manifests

apps/api/src/
├── app.ts                        # Testable server assembly
├── server.ts                     # Process lifecycle
├── routes/                       # HTTP request and response mapping
├── services/                     # Generation orchestration and limits
├── repositories/                 # Read-only instance lookup
└── cache/                        # Cache storage and ETags

apps/studio/src/
├── main.tsx
├── App.tsx
├── components/                   # Preview, selection, state, export
├── features/                     # Editor and showcase
└── lib/                          # API client and UI configuration

packages/core/src/
├── model/                        # Domain types
├── schema/                       # Runtime validation and inferred types
├── seed/                         # Versioned deterministic selection
├── normalize/                    # Defaults, constraints, effective values
├── composition/                  # Semantic layer order
├── identity/                     # Canonical serialization and resource identity
└── ports/                        # Injected catalog and style contracts

packages/design-tokens/src/
├── tokens/                       # Color, stroke, dimensions, spacing
├── templates/                    # Templates and role defaults
├── manifests/                    # Asset IDs, versions, provenance
└── styles/flat-2d/               # Style tokens and capabilities

packages/renderer-svg/src/
├── ir/                          # SVG nodes, attributes, layers
├── serialize/                   # Stable escaping and SVG output
├── styles/flat-2d/               # Anchors, layout, states, overlays
└── generated/                   # Ignored compiled asset modules

packages/renderer-png/src/
└── convert.ts                   # Converter and output options
```

The current asset pipeline is `scripts/compile-assets.mjs`, documented in
`docs/asset-authoring.md`. Add separate compiler modules and a showcase script
when the expanded Stage 3 catalog needs them. Place fixed requests in `tests/fixtures/`,
reviewed SVG/PNG baselines in `tests/snapshots/`, visual checks in `tests/visual/`,
and browser flows in `tests/e2e/`. Unit tests remain beside the implementation.

Do not create a database package, generic shared-utils package, alternative style
package, release workflow, or Dockerfile until the corresponding need is implemented.

## Asset and build ownership

Production source SVGs live only under `assets/`. The catalog references these
sources; the asset compiler embeds them in the SVG package for distribution.
Runtime packages must not read files relative to the repository root.

Ignore `dist/`, `node_modules/`, generated asset modules, coverage and test reports,
and exported avatars under `output/`. Commit source assets, approved baselines,
package manifests, and the lockfile. Do not copy exploratory images into production.
