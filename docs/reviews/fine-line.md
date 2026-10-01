# Fine Line and curated hair review

The selected B direction is implemented in manifest 1.7.0 / renderer 0.9.0.
Avatar surfaces use solid fills. Hat construction and brim seams are 1.2-unit
hat-derived lines, with no hat-to-hair or fringe-to-face shadows. Material grain
and avatar gradients are removed. The instance-badge contact shadow remains.

Template identity now includes an explicit emblem color. Each template offers
five curated hair colors and a default from that list. Build retains its yellow
hardhat with copper hair by default; Security pairs navy with silver. Explicit
unsupported colors fail validation. Studio lists only compatible colors and
resets incompatible hair overrides when changing templates, retaining badges.

See ADR 0007 for the contract and compatibility behavior. Old shared links that
explicitly specify a now-excluded hair color require selecting a supported color.

The generated review at `output/fine-line/index.html` includes twenty templates,
four output sizes, six states, and every allowed hair color. Existing visual
snapshots remain unchanged. The next review is visual approval of these actual
SVG/PNG renders before updating the baseline.

Verification: `pnpm assets:build` and `pnpm showcase` pass. Workspace checks,
formatting, lint, type checking, and production build pass. `pnpm check` reaches
116 tests: 85 pass; the 31 preserved visual-baseline comparisons fail as expected.
All five Studio browser tests pass with installed Chrome; bundled Playwright
Chromium is unavailable. Palette, state, and supported-size sheets were inspected.
