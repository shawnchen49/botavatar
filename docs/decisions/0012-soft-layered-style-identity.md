# 0012 Soft Layered 2D identity and authoring skills

Status: implemented after user direction.

## Decision

Rename the existing profile to `soft-layered-2d` (display name Soft Layered 2D).
Manifest 1.13.0, catalog templates, normalized output, metadata, Studio typing,
asset directories, and style-specific exports use the canonical name.
Explicit `flat-2d` requests remain a narrow compatibility alias. Normalize that
alias before matching the template; unknown or conflicting styles still fail.
This supersedes the stable-name decision in ADR 0010, not its rendering rules.

Drawing behavior, source SVG bytes, and renderer version 0.13.0 remain unchanged.
Resource keys change because the manifest and canonical style identity change;
legacy and canonical requests within this version share output and resource keys.
Renamed design-token exports and asset paths require local source consumers to
use the new names. This is still one implemented style, not multi-style support.

Separate authoring responsibilities: `add-avatar-asset` owns integration and
review; `bot-avatar-soft-layered-2d` owns visual judgment, with short hat and hair
references loaded on demand. The visual brief records current direction and
approval status; the catalog owns exact values. Future styles need their own
implemented rendering contract before the workflow can integrate their assets.

## Validation

Check alias/canonical equivalence, unknown-style rejection, canonical metadata,
asset-byte preservation, compilation, and existing behavior tests. Preserve
approved snapshots, including the known removed-hair failures. Skill validation
checks frontmatter and local references; visual acceptance of future generated
assets remains a separate review.
