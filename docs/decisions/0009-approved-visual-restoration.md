# 0009 Restore the approved visual family before adding hats

Status: implemented after explicit user direction.

## Context

The user preferred the 1.4.2 control group to both iterations of the occupational
hat redraw and requested that new hats grow from that visual base.

## Decision

Manifest 1.9.0 restores the original twenty templates, six source hats, emblem
mounts, tonal hair defaults, soft paint, material filter, and contact shadows from
commit `fecfa50`. Renderer 0.11.0 uses that rendering treatment. The twenty identity
snapshots and six state snapshots must remain exactly equal to their approved SVGs.

Keep the later Core validation, five-color palettes, fixed emblem colors, removed
glasses, and compact/custom instance-badge capabilities. Original hair defaults are
included in the adapted palettes. Five instance-badge snapshots still differ from
1.4.2 because that separately developed feature remains intact.

Add three optional templates: `docs-editor`, `security-officer`, and
`deploy-aviator`. They use flatcap, patrol, and pilot silhouettes respectively,
with the same paint, texture, hair integration, and translucent seams as the
approved family. Existing role aliases still select the original templates.
Remove the unapproved academic, fieldcap, and visor experiments from this catalog.
No runtime branch, random renderer choice, or historic snapshot dependency is added.

## Consequences

ADR 0007's mandatory contrasting hair direction and ADR 0008's replacement of
original role hats are superseded. Palette validation and fixed badge identity
remain useful. New hats require visual review individually; they do not redefine
the approved twenty. Approved snapshot files remain untouched.
