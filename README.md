<p align="center">
  <img src="assets/branding/bot-avatar-logo.png" alt="Bot Avatar logo" width="640">
</p>

# Bot Avatar

A deterministic, composable avatar system for bots. Templates identify bot types,
instances express individual variation, and states communicate runtime activity.

## Status

SVG and PNG generation, single/batch CLI export, a local Fastify API, and React
Studio are implemented. The catalog has twenty identities, six hat silhouettes,
and six runtime states. Stage 2 visuals were approved on 2026-10-01.
See [review stages](docs/roadmap.md) and [local/offline delivery](docs/local-distribution.md).

Run `pnpm build && pnpm start` and open `http://127.0.0.1:3000` for Studio.

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

Released under the [MIT License](LICENSE). Asset provenance and third-party icon
notices are tracked separately in [assets/LICENSES.md](assets/LICENSES.md).
