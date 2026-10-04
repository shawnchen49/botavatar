<p align="center"><a href="README.md">English</a> | <a href="README.zh-CN.md">中文</a></p>

<p align="center">
  <img src="assets/branding/bot-avatar-logo-readme.png" alt="Bot Avatar logo" width="320">
</p>

# Bot Avatar

[![CI](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml/badge.svg)](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml)

Deterministic avatars for software bots. A **template** fixes the bot type, an **instance** adds hair and a personal badge, and a **state** shows what the bot is doing. The same request always produces the same SVG.

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

```sh
pnpm build && pnpm start
```

Open Studio at <http://127.0.0.1:3000>.

See [docs/architecture.md](docs/architecture.md) for how the packages fit together.

## License

Released under the [MIT License](LICENSE). Third-party icon notices are in [assets/LICENSES.md](assets/LICENSES.md).
