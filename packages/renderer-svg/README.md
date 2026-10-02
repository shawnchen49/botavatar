# SVG renderer

Stage 2 exports `svgRenderer`, `renderSvg`, and `composeSvg`. The renderer consumes
normalized Core data, follows Core's semantic layer order, and serializes escaped
SVG IR with a fixed `0 0 256 256` viewBox. It never selects random parts.

Source assets compile into ignored `src/generated/assets.ts` before TypeScript
builds. Run `pnpm build` from the repository root; the package build command also
prepares assets. Distribution code has no repository filesystem dependency.

The profile implements six mouthless expressions, optional bottom-right badges,
and transparent, solid, or gradient backgrounds. Renderer 0.12.0 preserves the
approved 1.4.2 soft paint, seeded material filter, and hat/fringe contact shadows
for manifest 1.9.1. Nine hat silhouettes share that treatment. Source geometry,
mounts, and colors preserve the original twenty approved identities; three new
hats are optional additions. Licensed Lucide paths remain unchanged.

See [asset authoring](../../docs/asset-authoring.md) for the deliberately restricted
source SVG format and [ADR 0002](../../docs/decisions/0002-deterministic-svg.md).

Instance badges use a 27-unit radius centered at (210, 210), a 3.5-unit rim,
and a subtle contact shadow clipped to the face. Labels use larger monogram
lettering; embedded PNG imports fit inside the disc without tinting their colors.

The later instance-badge behavior remains intact. Regression baselines in
`tests/snapshots/` match this renderer and approved manifest 1.9.6, including the compact
badges. Manifest 1.9.6 only changes which template id the SVG title records.
New hats use the same painter and receiver-clipped shadows, with no
separate rendering mode or random choices.

`hat-accessories.ts` draws fixed accessory assets above the hat's printed emblem
and below the state layer. Each contact shadow is clipped to the underlying hat.
Pilot straps and frames have separate shadow strengths; lenses are inset color
blocks without an exterior shadow. Hats without accessories add no nodes.

Renderer 0.13.0 centers every expression on the approved idle eye positions
(95.5, 185) and (163.5, 185). Non-idle geometry uses local coordinates so
expression changes do not move the eyes. The five non-idle state baselines
record that centering. Manifest 1.9.2 changes the default background to slate.

The same renderer accepts manifest 1.12.0, which adds the catalog-authored side
part, removes the straight-fringe front, and revises coder design tokens. The
proposed spikes and curls were removed after visual review. Rendering logic and
renderer version are unchanged; the retained geometry is compiled from assets.
