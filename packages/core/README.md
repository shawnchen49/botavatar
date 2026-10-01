# Core domain

Status: public immutable request and identity types are implemented. Runtime
validation, normalization, seeded selection, and generation arrive in Stage 2.

Own domain invariants and semantic composition. Accept catalog and renderer
implementations through explicit contracts; never import concrete adapters.
No Node, DOM, network, clock, logging, or unseeded randomness belongs here.

`src/model/avatar.ts` separates template identity, instance overrides, and state.
Export supported types through `src/index.ts`. Runtime schemas must become the
source of truth for inferred input types when they are added.

See [architecture](../../docs/architecture.md) and
[directory structure](../../docs/directory-structure.md) for the shared contract.
