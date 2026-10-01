# Request examples

`assistant.json` is a runnable Stage 2 request using a fixed seed, straight fringe,
a bottom-right terminal badge, and a transparent background. The purple beanie
and coordinated hair color come from its template.

```sh
pnpm build
node apps/cli/dist/main.js --request examples/requests/assistant.json
```

Template IDs include `assistant` (Coder), `builder` (Test), `caretaker` (Security),
`research`, `docs`, `git`, `review`, `shell`, `build`, `debug`, `printer`, `network`,
`ai`, `general`, `deploy`, `monitor`, `design`, `data`, `search`, and `support`. States: `idle`, `working`, `waiting`,
`success`, `error`, `offline`. Sizes: 64, 128, 256, 512. Colors are catalog token IDs,
not arbitrary CSS. Unknown fields and unsupported choices fail explicitly.
Instance badge `color` selects the rim token; optional `iconColor` selects the glyph
(or label) token and defaults to `ink`. Icons are existing SVG assets with transparent
backgrounds. Supported aliases are `dot`, `check`, `terminal`, `search`, and `server`.

Batch and PNG examples will arrive with Stage 3.
