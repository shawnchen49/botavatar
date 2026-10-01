# 0007 Template identity and curated hair palettes

Status: accepted for implementation; rendered samples await visual approval.

## Decision

Template identity fixes the hat silhouette, hat color, emblem, and emblem color.
`hat.badgeColor` is a catalog color token resolved by Core; renderer treatments
only control emblem fitting and backing. Hair style and color remain instance
choices. Runtime state changes neither identity nor instance choices.

Each template declares five `allowedHairColors` and one default in that list.
The curated lists avoid hat-matching colors while permitting distinguishable
same-hue combinations. Catalog validation checks palette membership and resources;
normalization rejects unsupported explicit hair colors with `UNKNOWN_CHOICE`.
No runtime heuristic or renderer selection silently substitutes another color.

Studio presents the selected template's palette. On an explicit template switch,
it preserves compatible hair choices and clears incompatible overrides to use
new template defaults. Instance badges remain independent. Shared links with
now-invalid explicit colors surface the normal validation error and can be edited.

Manifest 1.7.0, Core 0.5.0, and renderer 0.9.0 capture the contract and appearance
change. The Fine Line profile uses solid avatar fills and thin tonal hat seams,
without hat/fringe shadows, material texture, or avatar gradients. Optional
background gradients and the existing instance-badge contact shadow remain.

## Verification

Check every curated palette across six states, invalid palette and request input,
fixed hat identity, flat SVG output, and Studio switching/share-link behavior.
Review color pairs at 64 pixels and inspect all supported export sizes. Existing
approved visual snapshots must not be replaced until the new render is approved.
