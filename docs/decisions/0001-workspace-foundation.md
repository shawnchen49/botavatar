# 0001 Workspace foundation

Status: accepted for Stage 1.

## Context

The generator, command-line entrypoint, HTTP API, and preview UI must share one
identity model and rendering pipeline. The approved directory proposal requires
clear ownership without introducing speculative packages.

## Decision

Use a private pnpm workspace with TypeScript and native ESM. Create the three
application workspaces and four library workspaces. Core is independent of concrete
renderers and catalog data. Design tokens owns the initial catalog and template
data. PNG conversion consumes SVG rather than domain configuration.

Maintained content is English. Ignore local draft documents. Store enduring agent
instructions in `AGENTS.md`, with a small editor rule pointing to that source.
Store reusable agent workflows under `.agents/skills/`.

Enforce strict types, formatting, public import boundaries, and workspace dependency
direction in local checks and CI. Keep all packages private and unlicensed until
licensing and distribution are explicitly decided.

## Consequences

Applications can grow independently while sharing the same domain pipeline. Catalog
data remains in the design-token package initially; split it only if actual usage
justifies a separate package. Workspace scaffolds expose no fake runtime features.

Build-mode type checking emits ignored artifacts so referenced package declarations
are always available. Studio's React/Vite configuration and output packaging will
be introduced with the actual UI, rather than simulated in the foundation.

## Validation

`pnpm check` exercises strict compilation, formatting, dependency-manifest checks,
linting, and positive/negative architecture tests. Product-level determinism and
visual equivalence remain acceptance criteria for later stages.
