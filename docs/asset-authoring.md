# Stage 2 asset authoring

Source geometry uses the 256 by 256 coordinate system. Register each asset in the
versioned `catalog.assets` array exported by design tokens, including its stable ID,
source path under `assets/`, creator, permission record, and reference anchor.
Face, hair, and hat geometry is project-owned. Hat emblems and instance symbols
must use existing licensed icons, currently Lucide 1.49.0 under ISC. Copy upstream
SVGs byte-for-byte into `assets/icons/lucide/`, preserve the original license, and
record package, version, source URL, SHA-256, and license path in the catalog.
The compiler verifies the digest and requires MIT or ISC provenance for badge mappings.
Do not redraw, trace, or edit glyph paths. Choose a background-free upstream variant
and apply color, scale, rotation, and placement through the rendering profile.
Reference anchors document the shared coordinate frame; the renderer does not
translate these full-canvas source parts.

Use exactly this root and self-closing path, rect, or circle children:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><circle cx="128" cy="128" r="16" fill="currentColor"/></svg>
```

The upstream root may additionally contain `fill="currentColor"`; the compiler
resolves this inherited fill onto children in its generated representation without
changing source files. Third-party license notices accompany distribution files
and every generated SVG through metadata.

Supported stroke/fill opacity must be between zero and one; line caps are explicitly
allowlisted. Renderer-authored material filters remain outside the source vocabulary.

Use `currentColor` for injected colors or a literal six-digit hex color. The compiler
in `scripts/compile-assets.mjs` explicitly allowlists attributes and rejects groups,
text, comments, scripts, references, entities, event handlers, and unknown markup.
It validates a restricted authored format, not arbitrary third-party SVG documents.

Run `pnpm build` to validate the catalog and embed assets, then `pnpm check` to
verify behavior. Inspect generated avatars at supported sizes before proposing a
visual change. Generated modules and output belong outside Git. Reviewed visual
baselines may be added under `tests/snapshots/` only after user approval.

## Lucide source format

Lucide sources retain the official 24 by 24 SVG root, fixed version comment,
class, dimensions, and default stroke attributes. The compiler recognizes only
that pinned root format, inherits its `fill="none"` and rounded strokes onto
children, and adds a coordinate scale to the compiled representation. Source
bytes and glyph paths stay unchanged. Line, polyline, polygon, and rect `ry`
attributes are also allowlisted. Runtime rendering uses a 2.6-unit stroke in
Lucide coordinates for readability at avatar sizes and applies icon colors to
strokes. Existing body contour colors remain independent of their fills.
