# Repository instructions

These instructions apply throughout this repository.

- Write maintained code, comments, documentation, tests, commit messages, and UI text in English. Match the user's language in conversation.
- Treat `docs/architecture.md` and `docs/decisions/` as the architectural source of truth. `docs/draft/` is ignored local research, not a runtime input or required checkout dependency.
- Read the nearest module README before changing its responsibilities. Keep application orchestration in `apps/` and reusable behavior in `packages/`.
- Follow the dependency policy in `scripts/workspace-policy.mjs`. Import other workspaces through their public package entrypoints. Never reach into another workspace with relative paths or source aliases.
- Keep Core deterministic and free of filesystem, network, process, DOM, clock, and unseeded random dependencies. Renderers must not select random parts.
- Keep template identity, instance variation, and runtime state separate. State changes must preserve identity.
- Prefer focused functions, immutable inputs, explicit dependencies, and narrow public APIs. Avoid speculative abstractions, generic utility buckets, silent fallbacks, and placeholder behavior.
- Validate untrusted input at entry boundaries. Use typed domain failures and map them to transport errors in applications. Do not log inside Core.
- Add behavior-oriented tests for meaningful logic. Test determinism, identity preservation, invalid inputs, and output contracts; do not add tests that only mirror implementation.
- Run `pnpm check` before handing off a stage. Report checks that could not run; never equate scaffold validation with a working avatar generator.
- Keep generated output out of Git. Preserve reviewed visual baselines under `tests/snapshots/`. Never auto-accept visual changes.
- Record consequential architectural changes in an ADR. Keep rules short; extract a project skill only for a concrete repeatable workflow.
- Use `docs/roadmap.md` for review stages. Finish a coherent stage and provide its changes, verification, limitations, and next stage for review.
- Do not select an open-source license, publish packages, or deploy as part of scaffolding. Workspace packages stay private until a release is explicitly prepared.
