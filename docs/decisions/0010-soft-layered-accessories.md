# 0010 Soft Layered 2D hat accessories

Status: implemented after user approval of the visual direction.

## Decision

Keep the approved 1.4.2 visual family and the public `flat-2d` style ID. Express
shallow depth through independent physical pieces and local contact shadows.
Manifest 1.9.1 separates the pilot strap, frame, and lenses into registered SVG
assets; the cap asset now contains only cap geometry. Renderer 0.12.0 consumes
ordered accessory data from design tokens without selecting or randomizing parts.

Accessories render after the printed hat emblem and before the expression layer.
Only straps and frames cast new shadows, clipped to the cap silhouette. Recessed
lenses use a narrow solid-color inset. Printed emblems remain surface graphics.
These are fixed template parts, so no Core contract or instance choices change.
Hats without accessories emit exactly the same SVG structure as before.

## Verification

Behavior tests compare shaded and unshaded raster output to prove that the shadow
is visible on the hat and changes no pixels outside its receiver. Additional checks
cover accessory ordering, state invariance, filled lenses, transparency margins,
and the 26 restored 1.4.2 identity/state baselines. Existing instance-badge baseline
differences remain separate and are not automatically approved.
