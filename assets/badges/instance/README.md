# Instance badges

Instance-level icons use `catalog.instanceBadgeAssets` to resolve semantic names
to existing licensed SVGs in `assets/icons/lucide/`. Do not draw icon paths here.
The renderer places the supplied glyph in a circular bottom-right frame. Request
`color` controls the rim and `iconColor` independently controls the glyph; neither
changes template identity. Explicit short labels remain a text alternative.
