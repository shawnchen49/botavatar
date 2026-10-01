# 0002 Deterministic SVG pipeline

Status: implemented in Stage 2. Visual/catalog details and front/back hair
composition are amended by [ADR 0003](0003-reference-style.md).

## Context

The first real CLI must produce portable, reproducible output, preserve template
identity across state changes, and validate input without adding platform behavior
to Core. A small catalog is sufficient to establish the output contract.

## Decision

- Infer request types from the runtime schema. Reject unknown properties at every
  object level. Require a template ID; roles are catalog metadata, not implicit
  template lookup. Restrict output sizes to 64, 128, 256, and 512.
- Use seed `bot-avatar-v1` when omitted. Select hair from the template's ordered
  candidates using FNV-1a over UTF-16 code units of
  `${seed.length}:${seed}:${field}`, unsigned 32-bit arithmetic, then modulo the
  candidate count. The field namespace is `hair.style`. Explicit hair wins;
  colors, face, and glasses use fixed defaults. State never enters selection.
- Version the catalog independently as `1.0.0`. The normalized contract includes
  template identity, resolved colors, instance ID, seed, hair, face, glasses,
  badge icon/label/color/position, state, size, format, and background colors.
- Core determines semantic layer order; the SVG adapter supplies geometry and
  serializes a narrow SVG IR. The initial cap asset includes its brim, and the
  face asset includes ears. Front hair follows the face; glasses are foreground
  details after the bottom-right badge. No back-hair asset exists yet.
- Compile source assets into ignored TypeScript at build time. The asset compiler
  accepts only the project's narrow self-closing path/rect/circle vocabulary,
  rejects active markup and external references, and checks catalog references.
  Runtime rendering does not read files. New SVG syntax requires compiler changes.
- The resource key is a canonical JSON tuple containing Core, manifest, renderer
  versions, and normalized input. It is an internal identity, not a hash or HTTP
  ETag. Fixed property construction makes request key order irrelevant. Instance
  ID and seed remain in the key even when resulting pixels coincide.
- PNG requests fail explicitly until Stage 3. CLI accepts a JSON request file,
  writes SVG to stdout or exclusively creates an output file, and maps domain
  failures to exit code 2 and I/O failures to exit code 1.

## Consequences

No runtime dependency was added. The schema implementation is deliberately limited
to this request contract, not a general validation framework. Selection is stable
within the versioned candidate ordering; reordering candidates requires a manifest
version change. Resource keys are longer than hashes and include instance metadata;
applications must not expose them as opaque security tokens.

The initial assets are code-authored original project geometry. No third-party art
or license grant is introduced. Badge labels replace the icon visually, accept at
most three Unicode code points, and use a system sans-serif font; cross-platform
font pixel equivalence is not promised. SVG bytes remain deterministic.

## Validation

Behavior tests cover repeated output, state identity preservation, invalid choices,
XML escaping, version/option identity, all dimensions and templates, CLI errors,
exclusive file creation, and copied-distribution execution without repository assets.
Fixed-seed semantic regression and independent CLI/library output equivalence
protect generation behavior; neither is visual approval.
No visual baseline is auto-accepted.
