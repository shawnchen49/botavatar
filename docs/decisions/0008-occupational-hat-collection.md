# 0008 Occupational hat collection

Status: implemented for visual review.

## Context

The user requested a complete flat hat redesign, clearer hat/fringe separation,
intuitive occupational silhouettes and colors, and additional hat types. The six
previous shapes assigned too many roles to the same baseball cap.

## Decision

Manifest 1.8.0 redraws the six existing hats and adds flatcap, patrol, pilot,
fieldcap, visor, and academic assets. Stable template IDs and role aliases remain;
the versioned template identities receive curated hat/emblem/color assignments.
Security uses a navy patrol cap and gold shield; Deploy uses an orange pilot cap;
Docs uses an ivory flatcap. Licensed emblem geometry remains unchanged.

Keep all geometry in the existing authored SVG pipeline. Each hat has an explicit
emblem mount. Hat contours remain solid fills, construction seams use 1.2 units,
and fringe-facing boundaries use 1.6 units. Visor fitting adds a full hair crown
for each of the three existing hair selections without changing instance identity.
Renderer 0.10.0 accepts this manifest. Core contracts and randomness are unchanged.

## Review and consequences

`pnpm showcase:hats` builds a reproducible review with all twenty roles, four
native export sizes, six runtime states, permitted hairstyles, and the previously
approved catalog. The older approved catalog also predates the earlier Fine Line
changes, so its comparison is explicitly labeled. Generated review files stay
ignored. Approved snapshots require a separate user visual approval.

## Browser review follow-up

Manifest 1.8.1 implements five direct visual corrections: 2.4-unit hat lines,
a firmer bucket brim, symmetric baseball caps, filled pilot goggles, and a smooth
low sports crown covering the head. This supersedes the exposed visor fitting
and 1.2/1.6-unit line choices above. The redundant visor hair assets are removed;
all three existing hairstyles remain selectable and use their normal geometry.
