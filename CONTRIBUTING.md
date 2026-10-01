# Contributing

Read [the architecture](docs/architecture.md) and [coding standards](docs/coding-standards.md)
before changing a package boundary. Use `AGENTS.md` for agent-specific instructions.

## Workflow

1. Keep a change focused on one observable capability or one coherent infrastructure improvement.
2. Work in the owning module; inspect its README and public exports first.
3. Add dependencies to the workspace that actually uses them. Internal dependencies use `workspace:*`.
4. Add meaningful behavior tests for logic changes. Keep unit tests next to the implementation.
5. Run `pnpm format` and `pnpm check`. Review the diff, including generated lockfile changes.
6. Explain the problem, resulting behavior, validation, and known limitations in the review description.

Use English in source, documentation, test descriptions, user-facing strings,
commit messages, and review descriptions. Prefer concise imperative commit subjects
such as `Add deterministic hair selection`. Use `codex/` for agent-created branches.

Do not commit dependencies, build output, local credentials, exploratory drafts,
or exported avatars. Commit reviewed fixtures and visual baselines intentionally.
Never update a snapshot merely to make a failing test pass.

## Quality gates

- `pnpm check:workspace` checks package identity, privacy, and permitted workspace dependencies.
- `pnpm format:check` checks repository formatting.
- `pnpm lint` checks TypeScript conventions, import boundaries, and direct nondeterministic calls in Core and SVG rendering.
- `pnpm typecheck` checks strict types across project references and emits build artifacts.
- `pnpm test` runs the available behavior and architectural tests.
- `pnpm build` builds all TypeScript workspaces.

CI uses a frozen lockfile and runs the same `pnpm check` command. Guardrails support
code review; they do not prove purity of third-party dependencies or catch every
possible indirect source of nondeterminism.

Script execution fails when dependencies are out of date rather than installing
implicitly. Run `pnpm install` explicitly after dependency changes. The workspace
uses an ignored local `.pnpm-store/` and rejects workspace dependency cycles.

## Architecture changes

Record consequential changes to identity, normalization, rendering, caching, or
dependency direction in `docs/decisions/NNNN-short-title.md`. Include status,
context, decision, consequences, and validation. Update the architecture and
workspace policy together so documentation and checks agree.

The project skill at `.agents/skills/add-workspace-module/SKILL.md` documents the
repeatable workspace-addition workflow. Add further skills after a real workflow
exists; keep durable constraints in `AGENTS.md` instead of copying them into skills.
