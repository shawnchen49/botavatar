# Coding standards

## Structure and naming

Organize code around a domain responsibility. Keep transport parsing, persistence,
filesystem access, rendering, and domain decisions in their owning layers. Avoid
catch-all `utils`, `helpers`, `common`, and service classes with unrelated methods.

Use kebab-case for files and directories, PascalCase for types and React components,
camelCase for functions and values, and descriptive domain names. Prefer named
exports. Export only supported entrypoints from a package's `src/index.ts`.

## Functions and data

Prefer small functions with one reason to change. Use explicit parameters rather
than hidden singleton state, immutable inputs rather than mutation, and composition
rather than inheritance. Extract an abstraction when it removes demonstrated
duplication or protects a meaningful boundary, not to anticipate hypothetical reuse.

For example, normalization receives a catalog and seeded selector explicitly; it
must not import an HTTP client to discover a template. SVG rendering consumes a
complete normalized avatar; it must not select missing hair on its own.

Keep control flow direct. Use guard clauses, exhaustive discriminated unions, and
domain-specific names instead of deeply nested branches or boolean mode flags.
Comments explain constraints and decisions, not syntax. Do not leave fake success
responses, empty error handlers, or unimplemented production methods.

## TypeScript

Use strict native ESM with explicit `.js` extensions in relative TypeScript imports.
Use `import type` and `export type` for type-only dependencies. Browser tooling may
introduce an appropriate bundler configuration when Studio is implemented.

Avoid `any`, non-null assertions, unsafe casts, and broad index signatures that
erase domain constraints. Narrow `unknown` at boundaries. Preserve the distinction
between a missing property and an explicit value; exact optional properties and
unchecked index access checks remain enabled.

Use readonly public inputs and collections. Compile-time types do not validate
HTTP or CLI input: runtime schemas must be introduced with those entrypoints.
Do not add a second independently maintained version of the same schema and type.

## Errors and side effects

Model expected failures explicitly and give each a stable domain meaning. Retain
the original cause when wrapping an unexpected failure. Applications translate
domain failures into exit codes or HTTP responses and perform logging once.

Core has no network, filesystem, clock, process, DOM, global randomness, or logging
dependencies. Inject catalog and renderer contracts at composition boundaries.
Rendering is deterministic and never mutates its input. Adapters own external I/O.

## Testing

Test observable behavior: same input and version yield the same SVG; changing only
state preserves identity; unsupported choices fail clearly; badge overrides survive
normalization; output options affect resource identity.

Keep unit tests beside their modules as `*.test.ts`. Put cross-workspace tests in
`tests/integration/`, fixed inputs in `tests/fixtures/`, and reviewed visual baselines
in `tests/snapshots/`. Add visual and UI tests when those behaviors exist. Do not
introduce broad mocks or snapshots of internal data structures to inflate coverage.
