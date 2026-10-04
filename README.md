<p align="center"><a href="README.md">English</a> | <a href="README.zh-CN.md">中文</a></p>

<p align="center">
  <img src="assets/branding/bot-avatar-logo-readme.png" alt="Bot Avatar logo" width="320">
</p>

# Bot Avatar

[![CI](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml/badge.svg)](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml)

Deterministic avatars for software bots. A **template** fixes the bot type, an **instance** adds hair and a personal badge, and a **state** shows what the bot is doing. The same request always produces the same SVG.

SVG is the primary format. PNG is available at 64, 128, 256, and 512 pixels. The shipped style is `soft-layered-2d` (Soft Layered 2D): oversized hats, colored hair, a cream mouthless face, and capsule eyes.

## Gallery

<!-- readme:gallery:start -->

<table>
  <tr>
    <td align="center">
      <img src="docs/images/coder.png" alt="Coder" width="148" height="148"><br>
      <sub><b>Coder</b><br>beanie · <code>coder</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/research.png" alt="Research" width="148" height="148"><br>
      <sub><b>Research</b><br>beret · <code>research</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/git.png" alt="Git" width="148" height="148"><br>
      <sub><b>Git</b><br>cap · <code>git</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/images/build.png" alt="Build" width="148" height="148"><br>
      <sub><b>Build</b><br>hard hat · <code>build</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/debug.png" alt="Debug" width="148" height="148"><br>
      <sub><b>Debug</b><br>bucket · <code>debug</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/search.png" alt="Search" width="148" height="148"><br>
      <sub><b>Search</b><br>deerstalker · <code>search</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/images/docs-editor.png" alt="Docs editor" width="148" height="148"><br>
      <sub><b>Docs editor</b><br>flat cap · <code>docs-editor</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/security-officer.png" alt="Security officer" width="148" height="148"><br>
      <sub><b>Security officer</b><br>patrol cap · <code>security-officer</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/deploy-aviator.png" alt="Aviator" width="148" height="148"><br>
      <sub><b>Aviator</b><br>flight cap · <code>deploy-aviator</code></sub>
    </td>
  </tr>
</table>

<!-- readme:gallery:end -->

## Quick start

```sh
pnpm install --frozen-lockfile
pnpm build
mkdir -p output
pnpm avatar --request examples/requests/coder.json --output output/avatar.svg
```

<p>
  <img src="docs/images/coder-terminal.png" alt="Coder bot with a purple terminal instance badge, from examples/requests/coder.json" width="180" height="180">
</p>

<!-- readme:quick-start:start -->

The image above is generated directly from [`examples/requests/coder.json`](examples/requests/coder.json): template `coder`, hair `hair-side-part`, and a `terminal` instance badge. Omit `--output` to print SVG on stdout. The CLI leaves existing files untouched.

<!-- readme:quick-start:end -->

For PNG, set `"format": "png"` in the request. The filename does not select the format. Batch input is a JSON array of 1–100 requests, up to 1 MiB. The output directory must be new; when generation succeeds it contains numbered files and a `manifest.json`.

```sh
pnpm avatar --batch examples/requests/batch.json --output-dir output/my-batch
```

```sh
pnpm build && pnpm start
```

Open Studio at <http://127.0.0.1:3000>.

<img src="docs/images/studio.png" alt="Bot Avatar Studio, the local editor: Coder preview, runtime state buttons, export settings, and template, hair, and badge controls" width="880">

That is the default Studio screen: the avatar preview and state controls on the left, with template, hair, and badge settings on the right.

## Commands

| Command              | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `pnpm avatar --help` | Print CLI usage                                            |
| `pnpm start`         | Serve the API and Studio on `127.0.0.1:3000`               |
| `pnpm studio`        | Run the Vite dev server; start the API in another terminal |

Build once before `pnpm avatar` or `pnpm start`.

See [docs/architecture.md](docs/architecture.md) for how the packages fit together.

## License

Released under the [MIT License](LICENSE). Third-party icon notices are in [assets/LICENSES.md](assets/LICENSES.md).
