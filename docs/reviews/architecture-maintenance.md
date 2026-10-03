# Architecture maintenance review — 2026-10-03

## Scope and conclusion

Reviewed the dependency policy, Core validation and generation, SVG/PNG adapters,
API/CLI orchestration, Studio share-link handling, catalog authoring, and existing
architecture decisions. The current dependency direction is sound. Keep the seven
workspaces and existing public entrypoints; no new runtime layer or style registry
is justified by this maintenance stage.

The recent commit history concentrates change in assets and design data. The
1,620-line design-tokens entrypoint mixed provenance, template identity, capabilities,
and presentation, making routine asset work harder to locate and review. The
[improve-codebase-architecture guidance](https://skills.sh/mattpocock/skills/improve-codebase-architecture)
informed the focus on frequently changed code and small interfaces. No external
skill was installed and no external issue was created.

## Findings addressed

1. **P2 — Malformed shared badges could crash Studio.** The structure guard allowed
   missing required `color` and `icon` fields. Rendering the badge color then called
   `startsWith` on an undefined value. `apps/studio/src/shared-request.ts` now owns
   URL parsing and the UI structure guard, taking a hash explicitly. Incomplete
   badges load defaults and show the existing invalid-link message. Domain choices
   still validate on the server, preserving the type-only Core dependency.
2. **P2 — Server configuration failures were classified as client errors.** The API
   mapped every `AvatarError` to HTTP 400. `INVALID_CATALOG` now follows the existing
   logged, generic HTTP 500 path; request validation errors retain their 400 mapping.
   The regression test injects the typed failure at the renderer interface and
   checks both status and non-disclosure of internal details.
3. **P2 — API batches generated every SVG twice.** Validation called the complete
   generation pipeline and discarded its output, then encoding regenerated it.
   Generation results now feed an encoding function directly. All items still
   validate before any PNG conversion, as required by ADR 0006. The tradeoff is
   retaining up to 100 SVG results for the duration of a request; batch/body limits
   remain unchanged. No measured latency claim is made.
4. **Maintenance — Catalog authoring mixed independent responsibilities.** Split
   resource provenance into `assets.ts`, identities into `templates.ts`, ordered
   hair candidates into `hair.ts`, and renderer presentation data into
   `presentation.ts`. `catalog.ts` assembles the same data and `index.ts` retains
   precisely the existing public exports. This is internal organization, not a
   new workspace or public contract. The manifest version remains 1.18.0.

## Verification

- Before edits: `pnpm check` passed, including 173 tests and production builds.
- Compared JSON serialization of **all public design-token exports** before and
  after extraction: byte-identical, including array/property order.
- Added HTTP regressions for server error mapping, one generation per batch item,
  batch/single byte and ETag equivalence, and validation before rasterization.
- Added browser coverage for empty badges, missing colors, and missing icons,
  requiring a visible error, a usable default preview/export, and no page errors.
- Final `pnpm check` passed with 176 tests, lint, boundary checks, type checking,
  and production builds. All 48 approved visual baselines reproduced unchanged.
- `PLAYWRIGHT_CHANNEL=chrome pnpm test:e2e` passed all 8 browser tests. The default
  Playwright Chromium executable was unavailable; the documented installed-Chrome
  channel completed the same suite. The local server required sandbox escalation.
- `git diff --check` passed.

No asset geometry, palette values, seed candidate order, resource identity format,
renderer versions, or approved snapshots were changed. Existing architecture and
ADRs continue to apply; no consequential architecture decision was introduced.

## Follow-up priorities

- **Studio asynchronous state:** metadata loading and preview generation share an
  error slot in `main.tsx`. A successful preview can clear a metadata-load failure.
  A follow-up should give catalog loading and preview lifecycle independent state
  and test delayed/failing responses before extracting UI hooks.
- **Application output parity:** API and CLI each own PNG version decoration and
  hashing. Existing byte-parity tests cover their current behavior. Consider a
  shared application-facing export package only when an additional output adapter
  or consumer provides a concrete contract; keep Node I/O and PNG out of Core.
- **Error taxonomy:** CLI currently treats all domain errors as exit code 2, and
  the SVG adapter uses `UNKNOWN_CHOICE` for a mismatched manifest. Review these
  configuration-versus-input classifications together if configurable profiles
  are introduced; this stage changes only the API's `INVALID_CATALOG` mapping.
- **Multi-style support:** retain the documented single-profile constraints until
  a second real style is commissioned. A string generalization alone would not
  validate catalog/renderer pairing, capabilities, or API/CLI/Studio routing.
- **Documentation drift:** architecture/older ADR text still describes packages as
  UNLICENSED, while current manifests say MIT. Reconcile historical release wording
  with the recorded licensing decision separately; this review changes no license.

The next review stage should focus on Studio asynchronous failure/recovery behavior,
with HTTP fault injection and browser tests, rather than another broad file split.
