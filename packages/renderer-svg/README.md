# SVG renderer

Stage 2 exports `svgRenderer`, `renderSvg`, and `composeSvg`. The renderer consumes
normalized Core data, follows Core's semantic layer order, and serializes escaped
SVG IR with a fixed `0 0 256 256` viewBox. It never selects random parts.

Source assets compile into ignored `src/generated/assets.ts` before TypeScript
builds. Run `pnpm build` from the repository root; the package build command also
prepares assets. Distribution code has no repository filesystem dependency.

The profile implements six mouthless eye expressions, fixed round glasses, optional
bottom-right badges, and transparent, solid, or gradient backgrounds. All supported
sizes scale the same geometry. Gradients and a fixed-seed neutral texture provide
soft materials. `hat-badge.ts` mounts emblems on six hat shapes using direct print,
and optional dark plaques; beret emblems follow the tilted hat surface. Existing
Lucide glyphs retain upstream paths and receive color and fitting transforms.
Instance `iconColor` is independent of rim `color`. The upstream license notices are preserved in
SVG metadata and distribution notices. Badge label text uses system fonts. See the maintained
[visual brief](../../docs/visual-style.md) for the user-selected reference direction.

See [asset authoring](../../docs/asset-authoring.md) for the deliberately restricted
source SVG format and [ADR 0002](../../docs/decisions/0002-deterministic-svg.md).

`contact-shadow.ts` adds restrained hat-to-hair and fringe-to-face shadows using
existing silhouettes. Receiver clips keep the transparent background clean;
fixed offsets and blur preserve deterministic output at every supported size.
