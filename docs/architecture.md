# Bot Avatar architecture

Status: Stage 2 visuals approved on 2026-10-01. SVG/PNG, batch CLI, local API, Studio, and offline delivery are implemented; see ADR 0006.

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
  The tuple `styleId + hat.type + hat.color + hat.badge + hat.badgeColor` is unique within a manifest
  version. A role is a semantic alias with an explicit default template.
- **BotInstance** selects hair style and a template-approved hair color and a circular
  bottom-right badge. It never changes the template's hat identity.
- **BotState** selects `idle`, `working`, `waiting`, `success`, `error`, or `offline`
  eye and facial feedback. It never rerolls instance choices.

The current `flat-2d` profile follows the [visual brief](visual-style.md): oversized
hats, colored hair, a cream mouthless face, and capsule eyes. Only one style is
currently implemented. Other aesthetics can use separate style IDs and renderers.

Use one default face for the initial visual baseline. A second face is an explicit
alternate asset, not a random identity change. The current style does not support glasses; explicit non-none values fail validation.

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
rendering input, including badge rim color, icon color, resolved icon asset, embedded PNG, label, and
background options.
[ADR 0002](decisions/0002-deterministic-svg.md) specifies seed defaults, field-based
selection, runtime schemas, the normalized contract, and internal resource keys.

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

Production body SVG sources live in `assets/parts/flat-2d/`; existing licensed icons
live in `assets/icons/lucide/`. Hat and instance badge mappings reuse these icons.
Upstream paths stay intact; the style adapts color and fitting transforms only.
[ADR 0005](decisions/0005-existing-icons.md) records the source and notice policy.
Design-token manifests associate stable IDs with assets, anchors, capabilities,
versions, and provenance. `scripts/compile-assets.mjs` validates the restricted source format and embeds
assets in the SVG package before type checking and building. Generated modules are ignored.

The current catalog contains nine hats, six hairstyles, 24 template choices,
nineteen hat emblem mappings, six state expressions, and five instance icon aliases. Every asset
must have traceable licensing. Exploratory raster images are not production parts.
Catalog and renderer injection provide extension points for future profiles;
the shipped applications currently run a single profile.

### Multi-style readiness

The product is intended to support multiple visual styles. Its current visual
language is **Soft Layered 2D**, implemented under the stable `flat-2d` ID.
Shallow accessory shadows refine that profile; they do not make it a second
style or a general 3D renderer. Occupational colors and additional hats are
template changes within the same profile.

Core already separates template identity, instance variation, and runtime state.
`generateAvatar` receives a catalog and renderer, requests and templates carry
style IDs, mismatched request/template styles fail, and resource identity includes
the normalized style and manifest/renderer versions. These are reusable extension
points, not evidence that two styles can currently run side by side.

The remaining single-profile constraints are concrete:

- `Catalog.styleId` is typed as the literal `flat-2d`; normalized output inherits it.
- The SVG renderer accepts only `flat-2d` and its supported manifest, imports
  `flat2d*` fitting/presentation data, and uses embedded assets from one catalog.
- API and CLI directly assemble that catalog and renderer. `/v1/styles` returns
  one entry, and Studio currently uses the first entry's capabilities and colors.
- The asset compiler builds one catalog into one SVG package. Core composition
  assumes hat/hair/face/badge layers, and the generation contract returns SVG
  with a PNG conversion adapter. Arbitrary scene graphs or native 3D outputs
  are not covered by that contract.

When a second style is commissioned, implement and verify the full path together:
generalize the style contract, define an explicit catalog/renderer binding per
style, and select it in application orchestration before generation. Keep geometry,
palette, materials, fitting, and accessory rules inside the selected profile.
Specify template-ID uniqueness or style-qualified lookup before allowing catalogs
to share IDs. Expose actual per-style capabilities to Studio and route API/CLI
requests consistently, rejecting unknown or conflicting choices without fallback.
Extend asset compilation and dependency policy for the real second implementation.

Completion requires two real styles exercised end to end: deterministic generation,
state-preserving identity, correct catalog/renderer pairing, isolated resource
keys, invalid-style rejection, and API/CLI/Studio selection and export. Preserve
the current profile's approved visuals. Generalizing a string type or registering
a placeholder renderer alone is not multi-style support. A style outside the
current SVG/avatar-layer contract needs an ADR before extending those boundaries.

## API and cache

The HTTP application exposes:

- `GET /v1/avatar/{instanceId}.svg` and `.png` for known instances.
- `POST /v1/avatar` and `POST /v1/avatar/batch` for supplied requests.
- `GET /v1/templates`, `/v1/styles`, and `/v1/states` for metadata.
- `GET /health` for health checks.

Known instances initially come from a read-only configuration repository. Database
persistence and instance mutation endpoints are not part of the foundation.

Resource identity includes normalized configuration, output size, background,
format, and Core, renderer, and manifest versions. API caching and ETags reuse that
identity. HTTP ETags hash actual output bytes. Batch input is limited to 100 requests and HTTP bodies to 1 MiB. CLI and API must produce identical SVG for identical effective input.

## Deferred decisions

ADR 0006 records resvg conversion, HTTP caching, and the chosen local/offline delivery channel. Packages remain private / UNLICENSED. Public licensing and publication are deferred until explicitly requested. PNG and Studio appearance remain reviewable separately from the approved SVG baseline.

[ADR 0009](decisions/0009-approved-visual-restoration.md) restores the 1.4.2
visual family and adds three separate occupational variants. Curated palettes
and fixed emblem colors remain; original same-hue hair defaults are restored.

[ADR 0010](decisions/0010-soft-layered-accessories.md) defines local physical
accessory layering within the existing `flat-2d` renderer. Pilot goggles cast
receiver-clipped contact shadows on their hat without changing Core composition.
