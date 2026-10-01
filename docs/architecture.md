# Bot Avatar architecture

Status: foundation accepted; runtime implementation proceeds through review stages.

## Product scope

Bot Avatar generates reproducible bot avatars from a seed, a template, instance
overrides, and a runtime state. SVG is the primary format; PNG is an adapter output.
The first style is `flat-2d`, with a fixed `0 0 256 256` viewBox and a stable face and
eye position. The system must support 64, 128, 256, and 512 pixel output.

The first implementation targets one complete avatar through Core and CLI before
expanding the catalog or implementing the API and Studio. Photorealism, arbitrary
SVG uploads, animation, and 3D styles are outside the first release.

## Identity model

- **BotTemplate** identifies a type through a hat shape, color token, and hat badge.
  The tuple `styleId + hat.type + hat.color + hat.badge` is unique within a manifest
  version. A role is a semantic alias with an explicit default template.
- **BotInstance** selects hair style and color, optional glasses, and a circular
  bottom-right badge. It never changes the template's hat identity.
- **BotState** selects `idle`, `working`, `waiting`, `success`, `error`, or `offline`
  eye and facial feedback. It never rerolls instance choices.

Use one default face for the initial visual baseline. A second face is an explicit
alternate asset, not a random identity change. Glasses use closed frames with fixed
material, color, and stroke; only the shape varies.

Public input types live in `packages/core/src/model/avatar.ts`. The request owns
`templateId`; instance overrides cannot supply a conflicting template ID. Badge
position defaults to bottom-right at normalization. An explicitly mismatched
request `styleId` must fail instead of silently changing template identity.

## Generation pipeline

```text
Application input
  -> runtime validation
  -> deterministic normalization against a versioned catalog
  -> semantic composition
  -> flat-2d SVG rendering
  -> optional PNG conversion
  -> application output
```

Value precedence is explicit request, permitted deterministic seed selection,
template default, then style default. Normalization must retain every effective
rendering input, including glasses, badge color and label, and background options.
Seed defaults, selection algorithm, runtime schemas, and the complete normalized
contract will be specified with the first generator implementation.

Layer order is background, back hair, ears/sides, face, front hair, hat, brim,
eyes/state, instance badge, then foreground details. Layout anchors belong to the
style renderer. Geometry and presentation do not leak into template semantics.

## Dependency direction

- Core owns domain contracts, schemas, seeded selection, normalization, composition,
  and resource identity. Catalog and renderer implementations are injected.
- Design tokens owns tokens, templates, role defaults, catalog manifests, and style
  capabilities. Its only workspace dependency is Core types.
- SVG rendering implements the style contract using Core types, design data, and
  embedded assets. It must run without reading repository files at runtime.
- PNG rendering accepts SVG and conversion options. It owns the conversion library
  and does not depend on Core or repeat composition logic.
- CLI and API assemble the libraries and own side effects.
- Studio uses the API for preview and export and may import Core types. It does not
  duplicate selection or rendering rules. Offline browser preview is a later option.

`scripts/workspace-policy.mjs` is the executable workspace dependency policy.
Only public package entrypoints are supported; cross-workspace relative imports,
deep package imports, and reverse application dependencies are forbidden.

## Assets and styles

Production SVG sources live in `assets/parts/flat-2d/` and `assets/badges/`.
Design-token manifests associate stable IDs with assets, anchors, capabilities,
versions, and provenance. A future asset compiler embeds approved assets in the
SVG package before type checking and building. Generated modules are ignored.

The expanded catalog targets four hats, three hairstyles, six palettes, twelve
hat badges, six state expressions, and six instance-badge examples. Every asset
must have traceable licensing. Exploratory raster images are not production parts.
The style interface permits future profiles without introducing a 3D package now.

## API and cache plan

The future HTTP application exposes:

- `GET /v1/avatar/{instanceId}.svg` and `.png` for known instances.
- `POST /v1/avatar` and `POST /v1/avatar/batch` for supplied requests.
- `GET /v1/templates`, `/v1/styles`, and `/v1/states` for metadata.
- `GET /health` for health checks.

Known instances initially come from a read-only configuration repository. Database
persistence and instance mutation endpoints are not part of the foundation.

Resource identity includes normalized configuration, output size, background,
format, and Core, renderer, and manifest versions. API caching and ETags reuse that
identity. Hashing, serialization, and batch limits will be finalized with their
implementations. CLI and API must produce identical SVG for identical effective input.

## Deferred decisions

The PNG conversion backend, open-source license, publication channel, exact seed
default, asset schema, and final SVG geometry remain open. Packages are private;
no release or deployment workflow exists yet. Record each consequential choice in
an ADR as implementation provides evidence.
