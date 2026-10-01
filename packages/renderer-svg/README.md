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

The later instance-badge behavior remains intact. The twenty original identities
and six state SVGs match 1.4.2 snapshots exactly; five instance-badge snapshots
retain differences. New hats use the same painter and receiver-clipped shadows,
with no separate rendering mode or random choices.

`hat-accessories.ts` draws fixed accessory assets above the hat's printed emblem
and below the state layer. Each contact shadow is clipped to the underlying hat.
Pilot straps and frames have separate shadow strengths; lenses are inset color
blocks without an exterior shadow. Hats without accessories add no nodes, keeping
the original twenty identities and six state snapshots byte-identical to 1.4.2.
