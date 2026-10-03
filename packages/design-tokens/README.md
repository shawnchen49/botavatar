# Design data and catalog

The public entrypoint remains `src/index.ts`. Internal data is organized by responsibility:

- `catalog.ts` assembles the manifest, colors, defaults, capabilities, and role aliases.
- `assets.ts` records resource identity and provenance.
- `templates.ts` defines template identities and their allowed instance choices.
- `hair.ts` preserves the ordered shared hair candidates used by seeded selection.
- `presentation.ts` contains style-specific mounts, badge treatments, fits, and accessories.

Import the package entrypoint from other workspaces. Moving these declarations does
not change their values, order, public exports, or manifest version.

The current profile exports `catalog`, a versioned manifest with 25 template
choices, twelve hairstyles, one face, ten hat silhouettes, and nineteen hat
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

Manifest 1.19.0 proposes construction refinements for beanie, cap, bucket,
hardhat, and patrol assets and introduces optional `git-backward` with a
separate `hat-cap-backward` asset. Role defaults, hair candidates, and palettes
are unchanged. Fitted emblem mounts follow the revised panels. Visual approval
and baseline refresh are pending; see the [hat construction review](../../docs/reviews/hat-construction.md).

Manifest 1.19.1 centers the baseball cap's crown and visor and joins the backward
cap's adjustment strap to its continuous lower edge. Beanie, hardhat, and officer
geometry from 1.19.0 is approved. Bucket refinement awaits the user's replacement
reference; the two revised cap candidates remain under review.

Manifest 1.19.2 redraws the bucket using the supplied frontal Debug-hat reference,
colors the baseball button with the crown fill, and raises the backward bill to
meet the lower edge. These three candidates remain under visual review.

Manifest 1.19.3 enlarges the backward cap and lowers its opening while preserving
the reviewed strap and bill structure. Its emblem mount follows the crown.
The bucket brim flares outward over a separately shaded underside. Both fit
revisions remain under visual review.

Manifest 1.19.4 removes the backward cap's side bill while retaining its larger
fit, opening, and adjustment strap. The bucket uses a stiff elliptical brim
with raised outer tips and a shaded lower rim instead of following the bangs.
Both candidates remain pending visual review.

Manifest 1.19.5 corrects the bucket interpretation using the supplied close-up:
a wider rounded crown, a downward-flared brim, a thin arched front lip, and
exposed dark underside pockets at the low side tips. The upturned elliptical
brim from 1.19.4 is superseded. Other hats are unchanged.

Manifest 1.19.6 raises the bucket's front brim four source units and replaces
the continuous underside with two small curved returns partially hidden behind
the front brim. Other hats and the bucket crown remain unchanged.

Manifest 1.19.7 refines the bucket's exposed inside returns: a recessed dark
surface sits behind a narrow, lighter curved return, both partly hidden by the
front brim. The lip stroke is thinner. The crown and brim height are unchanged.

The user rejected the 1.19.7 detail and selected the preceding version. Runtime
manifest compatibility and geometry are restored to 1.19.6; further hat
iteration is paused at the user's request.

The user subsequently authorized submission synchronization for retained
manifest 1.19.6. All 50 active visual baselines and the maintained README
examples now match that version; further design iteration remains paused.
