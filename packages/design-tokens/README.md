# Design data and catalog

The current profile exports `catalog`, a versioned manifest with 24 template
choices, six hairstyles, one face, nine hat silhouettes, and nineteen hat
emblems. Manifest 1.9.1 preserves the twenty approved 1.4.2 identities and adds
three separate templates: `docs-editor`, `security-officer`, and `deploy-aviator`.
Existing role aliases continue to select the original identities.

`flat2dHatMounts` and `flat2dBadgeTreatments` provide style-specific placement and
presentation data. The SVG renderer applies them without changing identity or
selecting parts. Hair styles reference front and back assets; template hair-color
defaults can be overridden within their five-color palettes.

Core imports remain type-only. Asset entries record source paths, stable IDs,
project-owned or ISC provenance, and shared-coordinate reference anchors. The 22
vendored Lucide SVGs include per-file upstream URLs, pinned versions, hashes, and
license paths. Hat and instance mappings share these icons. Production SVG geometry
lives in `assets/`; renderer-only frames are code-native geometry.
Changing geometry, tokens, defaults, or candidate order requires a manifest version
change once this initial review is accepted.

`flat2dHairFits` provides explicit hat-specific front/back geometry for an existing
hairstyle. The bucket fit tucks sweep hair beneath its brim without adding a new
instance choice or affecting other hats. Fringe, side-fringe, and wisps already
clear that brim, so they keep one shared front/back pair on every hat.

Original template colors and same-hue hair defaults match 1.4.2. The five-color
palettes include those original defaults. New hats use the approved rendering
language without replacing the original role identities.

`hat.badgeColor` fixes each emblem color as part of template identity.
`allowedHairColors` contains five curated alternatives including the default.

`flat2dHatAccessories` declares the fixed ordered parts and contact-shadow fitting
for physical hat accessories. The pilot strap, frame, and lenses are registered
project-owned SVG assets. They remain template identity, with no new instance
selection or renderer randomness.

Manifest 1.9.2 selects the existing slate token for the default background,
providing separation from the cream face in solid exports. Gradient exports
start from the same slate token and retain the sky endpoint.

Manifest 1.9.3 extends each existing hair palette with nine reusable accent
colors, deduplicating existing entries. Original defaults and the order of
existing choices remain intact; each template now offers 11–14 colors.

Manifest 1.9.4 changes the default `build` hardhat to `safety-yellow` and adds
`build-red` with a white gear emblem on `safety-red`. Both retain the existing
build hair defaults and palettes. Dedicated hat tokens avoid recoloring hair or
other templates. This user-requested palette refinement supersedes the restored
blue hardhat color; geometry and role aliases remain unchanged.

Manifest 1.9.5 extends the occupational palette review to ten existing templates:
research uses navy, docs ivory, debug olive, printer charcoal, network uniform
blue, deploy navy, design charcoal, editorial taupe, and aviator leather brown.
Monitor keeps its blue surface with a white emblem. Dark surfaces use light
emblems. All existing hair palettes, defaults, hat geometry, template IDs, and
role aliases remain unchanged. Every emblem is checked for at least 3:1 contrast
against its actual backing, including the Git and terminal plaques.

Manifest 1.9.6 adds three public hairstyles for hair that shows under a hat,
without replacing `hair-sweep`, `hair-crop`, or `hair-wave`. `hair-fringe` is a
straight forehead band. `hair-side-fringe` is an asymmetric bang on the left.
`hair-wisps` is a few separate strands at the hat rim and nape, lighter than
`hair-wave`. Studio lists them as fringe, side-fringe, and wisps. The same
geometry is used on the beanie, cap, bucket, and the other silhouettes.
