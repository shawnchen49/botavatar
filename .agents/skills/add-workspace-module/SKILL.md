---
name: add-workspace-module
description: Add or split a Bot Avatar pnpm workspace module with the repository dependency policy, strict TypeScript build graph, public entrypoint, and quality checks. Use for a new package or application, not for ordinary files inside an existing module.
---

# Add a workspace module

Read the repository `AGENTS.md`, `docs/architecture.md`, and
`scripts/workspace-policy.mjs`. Establish the module's single responsibility and why
an existing workspace cannot own it. A package split that changes dependency
direction needs an ADR and matching architecture updates.

## Create the module

1. Use `apps/<name>` for a composition root or `packages/<name>` for reusable logic.
2. Follow a sibling manifest: `@bot-avatar/<name>`, private, ESM, `UNLICENSED`, and
   a public entrypoint. Internal dependencies use `workspace:*`. Do not expose
   another package's internals or add an alternate root alias.
3. Extend `tsconfig.base.json`. Set `rootDir`, `outDir`, and an ignored build-info
   path. Add only the Node or DOM types required by this module. Add project
   references for workspace dependencies and register the module in `tsconfig.json`.
4. Register permitted dependencies and any type-only edges in
   `scripts/workspace-policy.mjs`. Keep the dependency graph acyclic. Add or update
   architectural tests when changing a boundary; do not weaken unrelated checks.
5. Add a focused README with responsibilities, current implementation status, and
   public API. Update `docs/directory-structure.md` to match the actual layout.
6. Run `pnpm install` to update the lockfile, then `pnpm format` and `pnpm check`.
   Inspect the resulting public declarations and the diff.

## Review

Report why the module exists, its allowed dependencies, what behavior is available,
and the validation result. Scaffolding must not claim a working feature. Keep
packages private; this workflow does not authorize publishing or deployment.
