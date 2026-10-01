# Instance examples

`local.json` maps known IDs to immutable avatar requests. Set
`BOT_AVATAR_INSTANCES=examples/instances/local.json` before `pnpm start`, then use
`/v1/avatar/assistant.svg` or `/v1/avatar/debugger.png?state=working`.
The configuration is validated at startup; no mutation endpoint is exposed.
