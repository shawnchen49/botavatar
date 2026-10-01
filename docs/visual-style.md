# Flat 2D visual direction

The user selected the v0.3 sample sheet for faces and expressions, then supplied
a twenty-role reference for hat diversity and more natural emblem integration. The local reference
is not a repository dependency. This brief governs the current profile until a
reviewed visual baseline is approved.

- Use an oversized rounded hat occupying approximately the upper half
  of the avatar. Supported silhouettes include beanie, cap, beret, hardhat, bucket
  hat, and deerstalker. The beanie has a wide folded band, low-contrast ribs, and a dark
  curved lower seam. The cap has a rounded crown, subtle panel seams, and a curved brim.
  The Debug bucket hat has a softly tapered crown and a flared brim with a raised
  center arc, lowered side tips, and a restrained dark underside seam. The newer
  Debug close-up refines this to a wide smooth brim, a narrow dark inner lip,
  rounded side hair tucked behind the brim, and broad angled fringe sections.
- Use a wide cream face with soft cheeks and a nearly flat rounded lower edge.
  Do not introduce ears, a nose, a mouth, or heavy face outlines.
- Place two black vertical capsule eyes on fixed anchors. Working eyes are focused,
  waiting eyes are short horizontal marks, success eyes are upward arches, and
  error eyes are crosses. Offline is a muted extension of the reference.
- Give hair rounded volume behind the face and a distinct front fringe. Template
  defaults coordinate hair and hat colors; explicit instance hair colors remain independent.
- Use restrained gradients, very subtle neutral texture, and thin tonal contours.
  Avoid hard dark borders around the hat and face, harsh bevels, or strong 3D lighting.
- Add a soft, narrow contact shadow below the hat onto the hair, with a lighter
  shadow below the fringe onto the face. Clip shadows to receiving surfaces; avoid
  a surrounding drop-shadow halo or stronger global shading.
- Let hat emblems follow their surface. Use direct print for standalone symbols,
  existing background-free glyphs for code and data, and dark plaques for shell and Git.
  Use licensed existing SVG icons for both hat and instance badges; never redraw
  their paths. Preserve transparent negative space and recolor through `currentColor`.
  The current user-selected library is Lucide, with rounded 2.6-unit strokes;
  these are library icons rather than exact glyphs extracted from the reference.
  Scale and rotate symbols for the particular hat rather than applying one central
  black tile to every shape. The bottom-right instance
  badge uses a white disc, a colored rim, and an independently colored icon (black
  by default). It overlaps the face
  without obscuring the eyes.
- Default to a transparent background. Solid and gradient backgrounds start from
  a muted slate (#687d8b) to keep the cream face silhouette visible. Glasses are
  not supported by this style.
- Keep the instance badge compact and slightly inset: center (210, 210), radius 27.
  Add only a light contact shadow on the face. Support two-letter monograms and
  imported raster logos with an automatically selected foreground-color rim.

Compare matching samples at matching scales: purple beanie with code/terminal,
lime cap with flask/search, and charcoal cap with shield/server. Inspect cap
curvature, hat-badge size/placement, fringe silhouette, eye proportions, face base,
and badge overlap individually. Also inspect 64, 128, 256, and 512 pixel output.

Current implementation is an SVG reconstruction under review. Byte determinism and
behavior tests do not establish aesthetic or pixel-level equivalence to the raster
reference. No snapshot is approved by this document.
