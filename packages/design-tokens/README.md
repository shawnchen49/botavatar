# Design data and catalog

The current profile exports `catalog`, a versioned manifest with twenty template
identities, role defaults, three hairstyles, one face, six hat silhouettes, and
nineteen hat emblems. Optional round glasses and dot/check/terminal/search/server
instance badges remain available. Manifest `1.4.2` combines the selected cream-face
direction with the user's newer hat-diversity reference.

`flat2dHatMounts` and `flat2dBadgeTreatments` provide style-specific placement and
presentation data. The SVG renderer applies them without changing identity or
selecting parts. Hair styles reference front and back assets; template hair-color
defaults remain overridable.

Core imports remain type-only. Asset entries record source paths, stable IDs,
project-owned or ISC provenance, and shared-coordinate reference anchors. The 22
vendored Lucide SVGs include per-file upstream URLs, pinned versions, hashes, and
license paths. Hat and instance mappings share these icons. Production SVG geometry
lives in `assets/`; renderer-only frames are code-native geometry.
Changing geometry, tokens, defaults, or candidate order requires a manifest version
change once this initial review is accepted.

`flat2dHairFits` provides explicit hat-specific front/back geometry for an existing
hairstyle. The bucket fit tucks sweep hair beneath its brim without adding a new
instance choice or affecting other hats.
