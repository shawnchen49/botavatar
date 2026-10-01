# 0004 Hat diversity and integrated emblems

Status: implemented for visual review. The request ids preserved below were later
renamed to their role names; see [ADR 0011](0011-template-id-semantics.md).

## Context

The user supplied a second reference with twenty bot roles and requested its hat
variety and more natural emblem integration. Keep the cream face and expression
direction established by the earlier reference while refining the hat system.

## Decision

Expand the current profile to six hat silhouettes: cap, beanie, beret, hardhat,
bucket hat, and deerstalker. The manifest becomes `1.2.0` and the renderer `0.4.0`.
The generation pipeline and template/instance/state separation remain unchanged.

Design tokens exports style-specific emblem mounts and presentation treatments.
The SVG renderer applies translation, scale, and rotation for the selected hat.
Emblems use direct printing, a tonal cloth patch, or a dark plaque with a reversed
symbol. Their placement and backing are fixed by versioned style data, never
selected randomly or varied by runtime state. Glyph-specific scale adjustments
remain in the rendering profile.

Add nineteen emblem assets and twenty template identities matching the reference's
roles. Preserve the existing request IDs `assistant`, `builder`, and `caretaker`;
their role metadata now describes Coder, Test, and Security. Existing role defaults
remain aliases in the catalog. Public requests still use template IDs, not role
lookup. This is a versioned pre-release visual catalog revision.

The reference is stored locally as `docs/draft/assets/bot-avatar-hat-reference-v0.4.png`
and remains ignored. It is not read by any build or runtime. Maintained source SVGs
are code-authored components; the supplied PNG is used only for local review.

## Verification and limits

Tests cover every catalog template at all supported sizes, portable distribution,
state-preserving hat/emblem output, and the three emblem treatments. Local browser
inspection checks the twenty-role grid and six eye states. Reference copying is
verified by a matching SHA-256 digest.

PNG conversion and application batch export remain deferred. The review grid is a
local developer artifact, not a shipped batch API. Visual baselines still require
user review; no pixel-equivalence claim is made.
