# ADR 0007: Embedded raster instance badges

Status: accepted implementation decision, 2026-10-01.

The user requested smaller inset badges, two-letter monograms, imported logos with
matching rims, and removal of glasses from the current style.

Studio decodes PNG/JPEG/WebP locally and converts each import to a self-contained
128-pixel PNG. Input files are limited to 5 MB and 4096 pixels per side. A deterministic
quantized histogram selects the dominant foreground color, weighting chromatic
pixels and excluding transparent/near-white backgrounds. Empty-color histograms
use a dark neutral rim; the user can override it. Core receives the embedded PNG
and explicit six-digit rim color, so it needs no DOM, decoder, or randomness.

Core bounds PNG data URL length and validates the signature, IHDR, and dimensions.
Image decoding belongs to the browser and PNG renderer. External image references
and arbitrary SVG uploads are unsupported. Image and label are mutually exclusive;
the existing icon field remains required as the catalog-backed badge identity.
Normalized image bytes participate in resource identity and share links. The HTTP
body limit still applies to aggregate batches. Image-containing URLs can be long.

The style retains `none` as the only glasses value for compatibility with existing
requests; other values fail. The Studio selector and renderer geometry are removed.
Manifest 1.5.0 and renderer 0.7.0 identify this visual revision. Previously approved
snapshots remain unchanged and are not approval of the new badge treatment.
