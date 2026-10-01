# Soft Layered 2D accessory review

Manifest 1.9.1 / SVG renderer 0.12.0 implements the user-approved layering direction
on the optional `deploy-aviator` template.

- Separate cap, strap, frame, and lens geometry into registered SVG parts.
- Keep the printed rocket on the cap surface. Draw the physical goggles above it.
- Give the strap a faint close contact shadow and the frame a slightly stronger,
  short downward shadow. Both are clipped to the cap, preserving hair, face, and
  transparent background pixels.
- Add a narrow muted inset along the top of each lens. Keep solid recognizable
  shapes instead of highlights, bevels, or complex reflections.
- Preserve original templates, default aliases, hair choices, and runtime identity.

`pnpm showcase:hats` includes the updated aviator detail, four native sizes, all
hairstyles, and six runtime states. `pnpm showcase` retains the standard original
catalog. New visuals remain proposals; approved snapshot files are unchanged.

Next review: judge the accessory depth at 64 and 128 pixels before extending this
physical treatment to additional hat pieces. Printed symbols should stay flat.

Verification: asset compilation and production build pass. The focused generation
and hat suite passes all 70 tests. `pnpm check` passes policy, format, lint, type
checking, and build before reporting 125 passing tests and five pre-existing
instance-badge baseline differences. The 26 restored original identity/state
baselines pass unchanged. Raster comparison confirms that accessory shadow pixels
remain inside the cap receiver. Native-size and six-state previews were inspected.
