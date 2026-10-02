# Visual regression SVGs

These 31 SVGs are the regression baselines: twenty identities, five instance icons, and six runtime states. `approved.json` records their SHA-256 hashes and the explicit requests that regenerate them. It contains no draft image or external runtime dependency.

The set began as the user-approved Stage 2 preview from 2026-10-01 (manifest 1.4.2, renderer 0.6.2). Nineteen files were refreshed for catalog manifest 1.9.5 and SVG renderer 0.13.0: occupational palette changes, compact instance badges, and expression geometry centered on the idle eye positions. Manifest 1.9.6 then updates the Coder, Test, and Security requests to `coder`, `test`, and `security`, and the SVG titles that record those ids. The pictures are otherwise unchanged.

Manifest 1.12.0 removes `hair-crop` from the catalog. Sixteen approved requests
still select that hairstyle and intentionally fail until the three remaining
styles and replacement requests receive explicit visual approval. Do not rewrite
these baselines as part of generation or review.

The regression suite regenerates every request and compares the SVG, ignoring only outer whitespace. Do not replace a failed baseline without visual approval. PNG conversions and Studio screenshots are generated review artifacts under `output/`; they are not implicitly approved baselines.
