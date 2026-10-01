# HTTP application

Status: workspace scaffold; HTTP endpoints arrive in Stage 4.

Own Fastify assembly, transport mapping, limits, instance lookup, caching, and
logging. Keep a testable application factory separate from process startup.
Delegate generation to shared packages; never duplicate selection or drawing rules.

Known instances initially use a read-only configuration repository. No database,
instance mutation endpoint, or listening server is included in the scaffold.

See [architecture](../../docs/architecture.md) and
[directory structure](../../docs/directory-structure.md) for the shared contract.
