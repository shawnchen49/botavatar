# Approved visual restoration and additive hats

Manifest 1.9.0 / renderer 0.11.0. The user requested a return to the 1.4.2 control
group after rejecting the later redraws.

## Delivered

The original twenty identities and six state outputs reproduce all 26 corresponding
approved SVGs exactly. Original source geometry, soft gradients, material treatment,
hat/fringe contact shadows, emblem fitting, and same-hue hair defaults are restored.

Three optional hats extend the family without changing role defaults:

- `docs-editor`: ivory editorial flatcap with a document emblem.
- `security-officer`: navy patrol cap with a gold shield.
- `deploy-aviator`: orange pilot cap with filled goggles and a rocket emblem.

The catalog now has 23 template choices and nine hat silhouettes. Compact instance
badges, monograms, image support, validation, curated palettes, and removed glasses
remain intact. Five instance-badge snapshots still differ from the older baseline.

## Review

`pnpm showcase:hats` builds `output/hat-collection/index.html`, with the restored
originals shown separately from additions, matching approved/restored comparisons,
all supported sizes, hairstyles, and states. `pnpm showcase` retains the standard
original-twenty review. Generated artifacts remain ignored and approved snapshots
are unchanged.

The next visual review concerns only the three additions and whether they fit the
approved family. The superseded Fine Line collection is no longer the default.

## Verification

`pnpm check` passes workspace policy, formatting, lint, type checking, and build,
then reports 123 passing tests and five failing instance-badge baseline comparisons.
All 26 original identity/state baselines now pass without changing snapshot files.
The five failures are the retained later badge designs; no assertions are skipped.
`pnpm showcase` and `pnpm showcase:hats` complete. Visual inspection covers the
restored catalog, additions at 64/128/256/512 pixels, all three hair styles, and
six states. New-hat raster tests verify transparency margins and filled goggles;
role-default tests verify that the additions do not replace original templates.
