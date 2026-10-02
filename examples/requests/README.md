# Request examples

`coder.json` is a runnable request using a fixed seed, straight fringe, a
bottom-right terminal badge, and a transparent background. The purple beanie and
coordinated hair color come from the `coder` template.

```sh
pnpm build
node apps/cli/dist/main.js --request examples/requests/coder.json
```

Preferred template ids match role semantics: `coder`, `research`, `docs`, `git`,
`review`, `shell`, `build`, `debug`, `printer`, `network`, `ai`, `general`,
`test`, `deploy`, `monitor`, `security`, `design`, `data`, `search`, and
`support`. Legacy ids `assistant`, `builder`, and `caretaker` still select
`coder`, `test`, and `security`. Optional variants keep role-modifier ids:
`docs-editor`, `security-officer`, `deploy-aviator`, and `build-red`.

`research` shares `badge-sparkle` with `ai`. No academic emblem is registered in
the catalog, so research keeps that badge.

States: `idle`, `working`, `waiting`, `success`, `error`, `offline`. Sizes: 64,
128, 256, 512. Colors are catalog token IDs, not arbitrary CSS. Unknown fields
and unsupported choices fail explicitly. Instance badge `color` selects the rim
token; optional `iconColor` selects the glyph (or label) token and defaults to
`ink`. Icons are existing SVG assets with transparent backgrounds. Supported
aliases are `dot`, `check`, `terminal`, `search`, and `server`.
