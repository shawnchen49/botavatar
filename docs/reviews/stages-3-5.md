# Stages 3–5 review

Status: implemented for the selected local/offline delivery channel. Stage 2 SVG
visuals were explicitly approved on 2026-10-01; new PNG and Studio views are ready
for review and have not replaced that approved baseline.

## Stage 3: Catalog and export

The existing expanded catalog already supplies twenty templates, six hats, three
hairstyles, palettes, nineteen hat emblems, five instance icons, and six states.
Preserved 31 approved SVGs with reproducible requests and regression assertions.
Added resvg PNG conversion at all four sizes, single and mixed-format batch CLI
exports, exclusive output creation, and completion manifests with hashes and
versions. `pnpm showcase` produces a 5 by 4 overview and four-size review page.
Extracted `.agents/skills/add-avatar-asset/SKILL.md` from the actual compiler workflow.

## Stage 4: API and Studio

Added a testable Fastify factory and loopback process entrypoint, validated
read-only instance configuration, metadata, request limits, ordered batch output,
transport errors, and actual-representation ETags with conditional GET handling.
React/Vite Studio provides configuration, cancelled/debounced preview, state
selection, URL sharing, and SVG/PNG downloads. No rendering logic moved into UI.
Desktop and 390-pixel mobile layouts have been inspected.

## Stage 5: Local release preparation

The user chose local use and offline distribution. Packages stay private and
UNLICENSED; selecting a public license and publication channel is out of scope.
The packager includes production dependencies, native PNG binaries for the build
platform, Studio, examples, third-party notices, and a SHA-256 manifest. It fixes
pnpm's source-root self-link, restores development install settings, and refuses
existing destinations. The relocation verifier checks hashes, contained symlinks,
SVG/PNG CLI output, API, and Studio assets from a temporary directory.
CI now includes browser and offline checks; manual workflow dispatch archives the
Linux bundle as an artifact. This does not publish packages or deploy services.

## Verification and limitations

- `pnpm check`: workspace policy, formatting, lint, strict TypeScript, production
  browser build, and 107 behavior tests, including all 31 approved SVGs.
- Playwright: configuration/state changes, share reload, both exports, mobile
  overflow, invalid-input recovery, and malformed shared configuration.
- Local relocation test: passed on macOS arm64 with Node 22.14.0.
- No remote CI execution or other-platform runtime verification is claimed.
- PNG badge labels use system fonts; exact cross-platform text rasterization is
  not guaranteed. The bundle requires a separately installed supported Node.
- Batches are bounded and synchronous. I/O failures may leave partial CLI output
  without a completion manifest. This is a local application, not a public service.

Review the generated `output/stage-3/index.html`, the running Studio, and the local
bundle. Future work should follow actual usage feedback: public hosting, publication,
a new visual style, or pinned font rendering each requires a new scoped decision.
