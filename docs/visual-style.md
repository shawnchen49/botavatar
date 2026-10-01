# Soft Layered 2D visual direction

This document describes the current `flat-2d` profile only. Soft Layered 2D is
its visual language, not a restriction on the product's future styles. Other
profiles may define their own geometry, materials, layers, and asset pipelines;
see the multi-style readiness section in `architecture.md` for the implemented
extension points and the application work still required.

The user chose to return to the approved manifest 1.4.2 appearance after reviewing
and rejecting the later hat collection. The 1.4.2 snapshots and source commit
`fecfa50` are the visual source of truth. The Fine Line and occupational redraws
in manifests 1.6–1.8.1 are superseded, not approved alternatives.

- Preserve the twenty original template IDs, role defaults, hat silhouettes,
  emblem placements, hair defaults, colors, face geometry, and six expressions.
- Keep the oversized rounded hats, cream mouthless face, capsule eyes, and original
  front/back hair fitting. Same-color hat and hair combinations are intentional.
- Restore the original soft paint, seeded faint material treatment, receiver-clipped
  fringe and hat contact shadows, and broad translucent brim seams. Preserve the
  original six SVG source hats byte-for-byte instead of redrawing them again.
- Keep existing Lucide emblem paths intact. New hats use explicit fitted mounts,
  licensed emblems, and the same rendering treatment as the approved family.
- Add hats through separate optional templates, leaving original role defaults
  unchanged. Start with three additions: an ivory editorial flatcap, a navy
  security patrol cap, and an orange aviator cap with filled goggles.
- Use the current curated five-color hair palettes, including every restored
  original default. Template emblem color remains fixed across instance changes.
- Retain the later compact instance badges, independent icon/rim colors, monograms,
  embedded image support, and the decision to remove glasses. These application
  capabilities are outside the hat restoration; five badge snapshots still differ.

Manifest 1.9.1 / SVG renderer 0.12.0 records this restoration and additive catalog.
`pnpm showcase:hats` generates the original twenty, the three additions, matching
approved/restored comparisons, four native output sizes, all hairstyles, and six
states. The twenty original identities and six state SVGs match the approved
snapshots exactly. Generated previews remain ignored; new variants require visual
review before becoming approved baselines.

## Soft Layered 2D

The user approved the direction of simple 2D silhouettes with restrained contact
shadows. Keep `flat-2d` as the technical style ID; this is a refinement of the
approved family, not a second style or a full 3D treatment.

Separate tangible accessories from the hat surface. The pilot cap now composes
its crown, printed emblem, strap, raised goggle frame, and recessed lenses as
ordered pieces. The strap casts a faint 0.6-unit contact shadow; the frame uses
1.1-unit blur and 1.6-unit offset at 20% opacity. Both shadows are clipped to the
hat. The lenses use a narrow muted upper inset instead of another exterior shadow.

Printed emblems receive no new shadow. Do not turn every line, icon, or color
region into a floating component. Keep lighting downward and local: shorter,
lighter shadows for pieces closer to their receiver. Preserve recognizable solid
shapes at 64 pixels, even when tiny shadows become unobtrusive.

## Occupational hardhat colors

Manifest 1.9.4 follows the user's request for familiar occupational colors:
`build` uses engineering yellow with a dark gear, and optional `build-red` uses
red with a white gear. This replaces the restored blue hardhat palette only;
existing silhouettes, hair defaults, and material treatment remain. These colors
are visual associations, not a standardized safety-role classification.

## Remaining occupational palettes

Manifest 1.9.5 applies the requested palette review to the rest of the catalog.
These are art-direction choices rather than real-world uniform requirements:

- Research: navy beret with an ivory emblem for a quieter academic association.
- Docs: ivory cap with dark ink, echoing paper rather than construction yellow.
- Debug: olive bucket hat with a white bug, suggesting field troubleshooting.
- Printer: charcoal cap with a white printer, echoing ink and workshop equipment.
- Network: deeper uniform blue with white Wi-Fi for clearer small-size contrast.
- Deploy: navy cap with a white rocket for an operations/uniform association.
- Monitor: retain the blue cap and reverse the pulse to white for contrast.
- Design: charcoal beret with an ivory nib, echoing a traditional artist's beret.
- Docs editor: warm taupe flatcap with dark ink, suggesting woven cloth.
- Aviator: leather-brown flight cap with an ivory rocket and existing goggles.

Retain yellow/red hardhats, the sand detective hat, navy/gold patrol hat,
charcoal security and shell caps, and the green review/test/support identities.
Coder, AI, data, Git, and general-purpose hats retain their expressive palettes;
these software roles do not need invented uniform color rules. Hat geometry,
accessory construction, hair defaults and choices, role aliases, and state
behavior remain intact. The palette changes supersede the restored hat colors
for these ten templates only and await visual approval before snapshot updates.
