# Design data and catalog

The current profile exports `catalog`, a versioned manifest with 24 template
choices, twelve hairstyles, one face, nine hat silhouettes, and nineteen hat
emblems. Manifest 1.9.1 preserved the twenty approved 1.4.2 identities and added
three separate templates: `docs-editor`, `security-officer`, and `deploy-aviator`.
Role defaults selected those original identities.

`softLayered2dHatMounts` and `softLayered2dBadgeTreatments` provide style-specific placement and
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

`softLayered2dHairFits` provides explicit hat-specific front/back geometry for an existing
hairstyle. The bucket fit tucks sweep hair beneath its brim without adding a new
instance choice or affecting other hats.

Original template colors and same-hue hair defaults match 1.4.2. The five-color
palettes include those original defaults. New hats use the approved rendering
language without replacing the original role identities.

`hat.badgeColor` fixes each emblem color as part of template identity.
`allowedHairColors` contains five curated alternatives including the default.

`softLayered2dHatAccessories` declares the fixed ordered parts and contact-shadow fitting
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

Manifest 1.9.6 renames the three default templates whose ids disagreed with their
roles. Preferred ids are `coder` (purple beanie, `badge-code`), `test` (flask
badge), and `security` (charcoal cap, `badge-shield`). `security-officer` stays
the patrol-cap variant. Legacy request ids `assistant`, `builder`, and `caretaker`
remain role-map aliases and normalize to those preferred ids. Hat geometry,
colors, and hair palettes are unchanged.

`research` still shares `badge-sparkle` with `ai`. The vendored emblem set has no
academic glyph such as a book or graduation cap, and `badge-document` already
belongs to docs, so the sparkle badge stays.

Manifest 1.12.0 adds a side part and removes the straight-fringe crop from the
public catalog. The proposed spikes and curls were also removed after visual
review, leaving sweep, wave, and side part available to every template. Coder
now pairs its existing beanie and code identity with a charcoal surface, cyan
emblem, cocoa hair, and seeded side-part default instead of the previous purple
beanie, purple hair, and crop fringe.

Manifest 1.13.0 renames the profile to `soft-layered-2d` and moves its source
assets to the matching directory. Geometry and drawing remain unchanged.
Legacy `flat-2d` requests normalize to the canonical style before rendering.

Manifest 1.14.0 adds curtain bangs and soft curls for visual review. Soft curls
have a dedicated back silhouette. Explicit existing hair choices remain valid;
expanding the candidate set can change seeded selections. Coder retains the
side-part selection for the default seed.

The user accepted curtain and soft-curl hair on 2026-10-02. Manifest 1.15.0
adds layered and wispy fringe candidates for review. Coder still selects side
part with the default seed; other seed-selected choices may change with the
expanded candidate set.

All four added hairstyles were visually approved on 2026-10-02. Eight focused
regression baselines preserve their reviewed beanie and bucket combinations.

Manifest 1.16.0 adds `hair-rounded-bob` and its dedicated back silhouette for
visual review. The rounded ends frame the cheeks beneath both beanies and brims.
Coder retains side part for the default seed; other seeded selections may change
with the expanded candidate set. Existing explicit choices remain valid.

Rounded bob was approved on 2026-10-03. Manifest 1.17.0 adds `hair-wolf-cut`
and `hair-feather-flip` for review, each with dedicated front and back geometry.
Coder keeps its default seeded side part; other seeded selections may change.
Explicit hair selections and all existing palettes remain unchanged.

Wolf cut and feather flip were approved on 2026-10-03. Manifest 1.18.0 adds
`hair-hime-cut` and `hair-sculpted-waves` for review, each with paired geometry.
The hime cut contrasts cheek-length panels with a longer back; sculpted waves
use broad S-shaped sides. Coder retains its seeded side-part default. Other
seed-selected hair may change; explicit selections and palettes stay intact.
