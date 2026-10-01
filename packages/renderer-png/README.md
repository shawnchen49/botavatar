# PNG conversion adapter

`renderPng(svg, size)` converts application-generated SVG with pinned resvg 2.6.2
and returns PNG bytes. Supported square sizes are 64, 128, 256, and 512 pixels.
`PngRenderError` identifies invalid adapter inputs and conversion failures.
`PNG_RENDERER_VERSION` records the adapter/backend version for export manifests.

This is not an arbitrary SVG upload service. External images, references, and active
markup are rejected. The bounded embedded PNG element emitted by the SVG renderer
is permitted for custom instance logos. Core and catalog remain independent of the native backend.
The adapter preserves alpha, including the corners of rounded solid backgrounds.
Labels use installed system fonts; raster text may differ between machines.
Native binaries must match the target OS and CPU. See ADR 0006.
