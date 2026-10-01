# Core domain

Stage 2 implements request schemas, inferred immutable types, catalog validation,
seeded normalization, semantic layer ordering, typed failures, and generation with
an injected catalog and renderer. Core has no platform dependencies.

Use `parseAvatarRequest` at input boundaries or `generateAvatar` for the complete
pipeline. `normalizeAvatar` resolves every rendering value without mutation.
`composeAvatar` defines semantic ordering; geometry belongs to the adapter.
`AvatarError.code` identifies expected failures for transport mapping.

The catalog is trusted typed application configuration and is checked for internal
consistency. It is not an untrusted catalog-upload API. Renderers consume normalized
values; external callers should enter through `generateAvatar`.

See [ADR 0002](../../docs/decisions/0002-deterministic-svg.md) for seed, precedence,
validation, and resource identity contracts.
