# SVG renderer

Status: workspace scaffold; SVG generation arrives in Stage 2.

Own SVG IR, deterministic serialization, and the `flat-2d` rendering profile.
Consume normalized Core data and design tokens. Layout anchors, geometry, eye
states, and badge overlays belong here; random part selection does not.

Embed approved source assets at build time. Published code must not read the
repository filesystem. Keep generated asset modules under `src/generated/`.

See [architecture](../../docs/architecture.md) and
[directory structure](../../docs/directory-structure.md) for the shared contract.
