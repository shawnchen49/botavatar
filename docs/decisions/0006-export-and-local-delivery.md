# ADR 0006: Raster export, local HTTP Studio, and offline delivery

Status: accepted implementation decision, 2026-10-01.

## Context

The user approved the Stage 2 preview and requested the remaining roadmap, choosing
local use and offline distribution as the initial delivery channel. Preserve all
approved geometry and keep packages private / UNLICENSED. No public publication,
container, or deployment is needed for this channel.

## Decisions

- Preserve the 31 approved SVGs verbatim under `tests/snapshots/`, with explicit
  requests and source hashes. Regression tests compare regenerated SVG bytes,
  ignoring only the serializer's trailing newline. New raster and Studio visuals
  are review artifacts, not automatically approved replacement baselines.
- Use pinned `@resvg/resvg-js` 2.6.2 in the PNG adapter. It consumes generated SVG
  and explicit supported dimensions. Core retains the requested output format but
  performs no rasterization. SVG composition is identical across formats.
- PNG labels use installed system fonts, matching the existing SVG label policy.
  Repeated output is tested on the same platform; glyph appearance across machines
  is not guaranteed. The native dependency makes offline bundles platform-specific.
- Batch input is an ordered JSON array of 1–100 requests. Validate every request
  before rasterization at the HTTP boundary; the CLI finishes conversion before
  creating a new destination. Numbered filenames avoid user-controlled paths.
  CLI manifests are written last. I/O failure can leave incomplete files but no
  completion manifest. Existing destinations are never overwritten.
- Fastify owns transport errors, a 1 MiB body limit, read-only instance configuration,
  metadata, and representation-based SHA-256 ETags. Known-instance requests permit
  state, size, and background overrides only. Conditional GET supports weak/list
  ETags and wildcard matching. POST responses are not cacheable.
- React/Vite Studio uses same-origin HTTP requests for preview and export. URL hash
  sharing stores request configuration and requires the recipient to run Studio.
  Abort obsolete preview requests and release object URLs. No browser generation
  or runtime external service is needed.
- A loopback-only Node server serves the built Studio. Produce offline bundles via
  pinned pnpm legacy deploy, preserve third-party notices, repair its source-root
  self-link, and verify relocated CLI/API/Studio with checksums and contained
  symlinks. Node is a prerequisite; it is not bundled. Automated local release
  preparation does not publish anything.

## Sources and consequences

The [resvg API](https://github.com/thx/resvg-js/blob/main/README.md) supports size
fitting and system-font loading. Fastify's [server options](https://fastify.dev/docs/latest/Reference/Server/)
provide request and body limits. Vite's [build guide](https://vite.dev/guide/) describes
the static production bundle.

Rendering is synchronous and bounded by batch size; this local tool is not a
multi-tenant public service. Authentication, public hosting, persistent instance
editing, cross-platform pinned fonts, and package publication are future scopes.
