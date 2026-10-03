# HTTP application

`createApp({ instances?, logger? })` returns a testable Fastify application without
listening. The process entrypoint serves Studio and binds to `127.0.0.1:3000`.
Set `PORT` to change the port. `BOT_AVATAR_INSTANCES` may point to a JSON object
mapping stable IDs to requests; input is validated at startup and remains read-only.

- `GET /health`: liveness.
- `GET /v1/templates`, `/v1/styles`, `/v1/states`: catalog and control metadata.
- `POST /v1/avatar`: request JSON to SVG or PNG bytes; format defaults to SVG.
- `POST /v1/avatar/batch`: array of 1–100 requests to ordered base64 entries.
- `GET /v1/avatar/:id.svg` or `.png`: configured instance, optional `state`, `size`,
  and `background` query overrides. Unknown IDs return 404; invalid input returns
  400; oversized bodies return 413. Body limit is 1 MiB.

GET responses use content SHA-256 ETags, conditional 304 responses, and private
revalidation. POST responses are no-store. Internal failures expose no stack traces.
There is no instance mutation endpoint or public-hosting authentication layer.
Run `pnpm build && pnpm start` at the repository root. See ADR 0006.

Batch generation retains each generated SVG through encoding, validating every
item before any PNG conversion. Each item is generated once. Invalid catalog
configuration is a server failure (500 with a generic message), while invalid
request choices remain client failures (400).
