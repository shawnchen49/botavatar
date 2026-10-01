# Stage 1 review

Status: implemented and locally verified; ready for review.

## Changes

- Established three application and four library workspaces with private ESM manifests,
  public entrypoints, strict TypeScript configuration, and a shared build graph.
- Added immutable template, instance, state, and request types. Request overrides
  cannot redefine template identity; badge placement remains bottom-right.
- Replaced the directory proposal with maintained English architecture and repository
  documentation. Local drafts remain untouched and are ignored by Git and tooling.
- Added English agent rules, a thin editor rule, coding standards, contribution
  guidance, and a project skill for adding workspace modules.
- Added formatting, lint, import-boundary enforcement, dependency-policy checks,
  architecture tests, a lockfile, and a CI workflow.

## Verification

- `pnpm install --frozen-lockfile`: passed with the final workspace configuration.
- `pnpm check`: passed; seven workspace manifests and seventeen architecture tests.
- The bundled skill validator: passed for `add-workspace-module`.
- Git ignore checks: local draft text and images are excluded.
- Maintained source and documentation scan: no remaining Chinese text.

The GitHub Actions workflow has been configured but has not run on a remote runner.
Current tests cover architectural guardrails. No avatar rendering or visual
regression behavior is implemented or claimed by this stage.

## Review focus

1. [Architecture and responsibilities](../architecture.md): Core purity, catalog ownership,
   SVG composition, PNG conversion, and application boundaries.
2. [Public domain types](../../packages/core/src/model/avatar.ts): template identity,
   instance overrides, and state separation before runtime schemas are added.
3. [Coding standards](../coding-standards.md) and [agent instructions](../../AGENTS.md):
   consistency, clean code, verification, and generated-output policy.
4. [Directory structure](../directory-structure.md): current files versus future feature placement.

## Next stage

Stage 2 delivers the first deterministic SVG through a real CLI path, including the
asset manifest, runtime schemas, seed policy, normalization, renderer, and meaningful
output regression tests. See [the roadmap](../roadmap.md).
