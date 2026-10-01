# Design data and catalog

Status: workspace scaffold; no production catalog is included yet.

Own shared tokens, templates, explicit role defaults, asset manifests, and style
capabilities. Reference Core types with type-only imports. Do not import renderers,
applications, or Node APIs. Keep validation logic in Core or build scripts.

Production SVGs live under `assets/`; catalog entries reference their stable IDs
and provenance. Do not duplicate SVG source files in this package.

See [architecture](../../docs/architecture.md) and
[directory structure](../../docs/directory-structure.md) for the shared contract.
