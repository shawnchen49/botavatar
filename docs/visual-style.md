# Soft Layered 2D visual direction

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
