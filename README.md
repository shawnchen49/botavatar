# Bot Avatar

A deterministic, composable avatar system for bots. Templates identify bot types,
instances express individual variation, and states communicate runtime activity.

## Status

Stage 2 implements deterministic SVG generation and a working JSON-file CLI.
The current catalog has twenty template identities, six hat silhouettes, and six runtime states. PNG,
the HTTP API, and Studio remain deferred. See the [Stage 2 review](docs/reviews/stage-2.md)
and [review stages](docs/roadmap.md).

## Development

Use Node.js 22.14 or later in the 22.x line, or Node.js 24.x, and pnpm 11.25.0.
The CI baseline is pinned in `.node-version`; the package manager is pinned in
`package.json`. Tool versions are exact and the lockfile is committed.

```sh
pnpm install --frozen-lockfile
pnpm check
```

`pnpm check` validates workspace manifests, formatting, lint rules, TypeScript
project builds, and tests. `pnpm format` applies formatting. Tests verify
architectural guardrails, deterministic output, validation, CLI behavior, and portability. Type checking uses project-reference
builds and emits ignored `dist/` artifacts; `pnpm build` uses the same build graph.

## Generate an avatar

```sh
pnpm build
mkdir -p output
pnpm avatar --request examples/requests/assistant.json --output output/avatar.svg
```

Omit `--output` for stdout. Existing files are not overwritten. See the
[CLI guide](apps/cli/README.md) and [request example](examples/requests/assistant.json).

## Repository guide

- [Architecture](docs/architecture.md): product semantics and dependency direction.
- [Directory structure](docs/directory-structure.md): current layout and planned modules.
- [Coding standards](docs/coding-standards.md): clean code and TypeScript conventions.
- [Contributing](CONTRIBUTING.md): changes, checks, and review expectations.
- [Agent instructions](AGENTS.md): persistent repository rules.
- [Architecture decisions](docs/decisions/0001-workspace-foundation.md): accepted foundation.

All maintained repository content is written in English. Local exploratory drafts
are excluded from version control and are not needed to build or understand the project.

## Licensing

No open-source license has been selected. Packages are private and marked
`UNLICENSED`; this is not a license grant. Asset provenance is tracked separately
in [assets/LICENSES.md](assets/LICENSES.md). Publishing is deferred.
