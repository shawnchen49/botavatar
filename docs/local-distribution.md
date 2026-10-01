# Local use and offline distribution

The chosen initial delivery channel is local use and offline distribution. All
packages remain private and UNLICENSED. No open-source license is selected, and
no deployment, container, registry publication, or release upload is performed.

## Local use

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Open `http://127.0.0.1:3000`. The application binds only to loopback. Configure `PORT`
and optionally `BOT_AVATAR_INSTANCES` with a path to a JSON instance map. See
`examples/instances/local.json`. Run `pnpm avatar --help` for CLI export.

## Prepare a release

```sh
pnpm exec playwright install chromium
pnpm release:local
```

This runs repository checks, browser flows, local packaging, and relocation checks.
It creates `output/bot-avatar-<platform>-<arch>/`. A previous directory is never
overwritten. For subsequent builds, move it aside or use the low-level packager
with a new explicit directory after verification:

```sh
node scripts/package-local.mjs output/my-reviewed-build
node scripts/verify-local.mjs output/my-reviewed-build
```

Transfer the complete directory in an archive that preserves symlinks, for example
`tar -czf bot-avatar.tar.gz -C output bot-avatar-darwin-arm64`. Do not copy selected
files or use an archive method that drops symlinks. The bundle includes the CLI,
server, browser assets, production dependencies, examples, notices, and a SHA-256
manifest. Build on each intended OS/CPU because resvg uses native binaries.

On the target machine, install a supported Node.js runtime (22.14+ in the 22.x
line or 24.x), extract the bundle, then run `node start.mjs`. No pnpm, source
checkout, package installation, or external service is needed. `node avatar.mjs`
provides CLI export. PNG text uses target system fonts; exact font rasterization
across platforms is outside the current contract.

Remote CI is distinct from local verification. The workflow can prepare artifacts
manually, but a local run does not prove that remote CI has passed.
