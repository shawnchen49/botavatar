# Asset provenance

Face, hair, and hat SVG geometry is authored for this private project. Its catalog
entries carry `project-owned` permission records. Reference raster images are not
embedded or used by the build. No public license for project-owned work is selected.

Hat emblems and instance badge icons use 22 unmodified SVG files from
[lucide-static 1.49.0](https://github.com/lucide-icons/lucide), under the
[original upstream license](icons/lucide/LICENSE). Each catalog entry records the
upstream package, version, source URL, SHA-256 digest, creator, and license path.
The compiler verifies source integrity and preserves the notice in distributed
`THIRD_PARTY_NOTICES.txt` and generated SVG metadata.

The manifest in `packages/design-tokens/src/index.ts` is the complete inventory.
It includes one face, three front hair shapes with two shared back shapes, six
hats, nineteen hat emblem mappings, and shared instance icon mappings. Expressions,
glasses, material treatments, and badge frames are renderer-authored geometry.

Use existing licensed icons for all future hat emblems and instance badge symbols.
Keep upstream paths intact; adapt placement, scale, rotation, and color in style
data and the renderer. Do not label third-party artwork as project-owned.
