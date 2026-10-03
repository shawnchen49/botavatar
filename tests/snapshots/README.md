# Visual regression SVGs

These 42 SVGs are the regression baselines: twenty identities, five instance icons, six runtime states, and eleven approved hair combinations. `approved.json` records their SHA-256 hashes and the explicit requests that regenerate them. It contains no draft image or external runtime dependency.

The set began as the user-approved Stage 2 preview from 2026-10-01 (manifest 1.4.2, renderer 0.6.2). Nineteen files were refreshed for catalog manifest 1.9.5 and SVG renderer 0.13.0: occupational palette changes, compact instance badges, and expression geometry centered on the idle eye positions. Manifest 1.9.6 then updates the Coder, Test, and Security requests to `coder`, `test`, and `security`, and the SVG titles that record those ids. The pictures are otherwise unchanged.

Manifest 1.12.0 removed `hair-crop`. After approval of the four new hairstyles
and the explicit request to fix the failures, the sixteen affected requests now
select approved `hair-curtain`. Their role, badge, and state settings remain
unchanged. The original SVGs and request manifest are preserved under
`historical/hair-crop/`; they are historical evidence, not active regression cases.
The active entries record migration source, current versions, date, and hashes.

The regression suite regenerates every request and compares the SVG, ignoring only outer whitespace. Do not replace a failed baseline without visual approval. PNG conversions and Studio screenshots are generated review artifacts under `output/`; they are not implicitly approved baselines.

The user approved curtain, soft curls, layered fringe, and wispy fringe on
2026-10-02. Eight additional 256-pixel SVGs record the reviewed coder and debug
combinations on solid backgrounds. Each new entry records manifest 1.15.0,
renderer 0.13.0, approval date, request, and hash. Top-level version metadata
continues to describe the original set; per-item metadata identifies additions.
That initial approval added eight cases without replacing the original set.
The subsequent requested failure repair migrated the sixteen retired-crop cases
as described above; the other original cases and eight additions remain intact.

The user approved rounded-bob hair on 2026-10-03. Three additional 256-pixel
SVGs record cocoa-colored idle coder, debug, and docs combinations on solid
backgrounds. Each entry records manifest 1.16.0, renderer 0.13.0, approval
date, request, and hash.

The user approved wolf-cut and feather-flip hair on 2026-10-03. Six additional
256-pixel SVGs record cocoa-colored idle coder, debug, and docs combinations on
solid backgrounds. Each entry records manifest 1.17.0, renderer 0.13.0,
approval date, request, and hash.
