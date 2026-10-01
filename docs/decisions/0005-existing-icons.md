# 0005 Existing licensed icons for badges

Status: implemented for visual review; supersedes ADR 0004's emblem source and
cloth-patch choices.

## Context

The user requested existing icons instead of hand-drawn symbols for both hat
emblems and future instance badges, with transparent backgrounds, recoloring,
and adaptation to each hat.

## Decision

Vendor 22 original SVG files from `@phosphor-icons/core@2.1.1` under MIT. Preserve
source bytes and paths. Catalog entries record upstream URLs, version, SHA-256,
and the original license path. Build-time compilation validates integrity and a
restricted SVG vocabulary; no network or filesystem access occurs at runtime.
The compiler requires licensed MIT assets for all hat and instance icon mappings.

Choose upstream transparent glyph variants rather than tracing symbols or removing
raster backgrounds. Apply size, position, rotation, and color through versioned
style data. Generic frames and optional dark plaques remain renderer geometry.
Instance badge requests gain `iconColor`, separate from rim `color`. Normalization
resolves the semantic icon to an asset and includes its color in resource identity.

Embed the full MIT notice in SVG metadata and ship `THIRD_PARTY_NOTICES.txt` with
the renderer distribution so exported graphics retain attribution. This dependency
license does not select a license for the private project or authorize publication.

Manifest becomes `1.3.0`, renderer `0.5.0`, and Core `0.2.2`. Template, instance,
and runtime-state boundaries remain unchanged. No additional rendering style is
registered.

## Verification and limits

Tests compare rendered glyph paths with upstream sources, verify source digests,
check notice preservation, and exercise independent icon colors and invalid inputs.
Visual inspection checks fit across hats and instance frames. Aesthetic approval
remains separate from passing tests. New icon families require an explicit source
and compiler-policy update; arbitrary SVG uploads are not supported.

## Lucide revision

The user subsequently selected Lucide. Manifest `1.4.0` and renderer `0.6.0`
replace the Phosphor sources with 22 unchanged SVGs from `lucide-static@1.49.0`.
Core's provenance type now accepts ISC as well as MIT; the runtime request
contract is unchanged. The compiler supports the pinned Lucide root format and
normalizes 24-unit geometry into the common 256-unit coordinate system. Stroke
color and weight are rendering adaptations; source paths are not redrawn.

The complete upstream license includes Lucide ISC and inherited Feather MIT
notices. Both travel in exported SVG metadata and the distribution notice file.
Existing source-integrity and offline-runtime requirements remain in force.
