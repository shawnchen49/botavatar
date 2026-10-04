<p align="center"><a href="README.md">English</a> | <a href="README.zh-CN.md">中文</a></p>

<p align="center">
  <img src="assets/branding/bot-avatar-logo-readme.png" alt="Bot Avatar 标志" width="320">
</p>

# Bot Avatar

[![CI](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml/badge.svg)](https://github.com/shawnchen49/botavatar/actions/workflows/ci.yml)

给软件机器人用的确定性头像。**模板**决定机器人类型，**实例**再加上发型和一枚个人徽章，**状态**表示它正在做什么。同一个请求，每次得到的 SVG 都一样。

## 图库

<!-- readme:gallery:start -->

<table>
  <tr>
    <td align="center">
      <img src="docs/images/coder.png" alt="程序员" width="148" height="148"><br>
      <sub><b>程序员</b><br>毛线帽 · <code>coder</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/research.png" alt="研究" width="148" height="148"><br>
      <sub><b>研究</b><br>贝雷帽 · <code>research</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/git.png" alt="Git" width="148" height="148"><br>
      <sub><b>Git</b><br>棒球帽 · <code>git</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/images/build.png" alt="构建" width="148" height="148"><br>
      <sub><b>构建</b><br>安全帽 · <code>build</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/debug.png" alt="调试" width="148" height="148"><br>
      <sub><b>调试</b><br>渔夫帽 · <code>debug</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/search.png" alt="搜索" width="148" height="148"><br>
      <sub><b>搜索</b><br>猎鹿帽 · <code>search</code></sub>
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="docs/images/docs-editor.png" alt="文档编辑" width="148" height="148"><br>
      <sub><b>文档编辑</b><br>报童帽 · <code>docs-editor</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/security-officer.png" alt="安全员" width="148" height="148"><br>
      <sub><b>安全员</b><br>巡逻帽 · <code>security-officer</code></sub>
    </td>
    <td align="center">
      <img src="docs/images/deploy-aviator.png" alt="飞行员" width="148" height="148"><br>
      <sub><b>飞行员</b><br>飞行帽 · <code>deploy-aviator</code></sub>
    </td>
  </tr>
</table>

<!-- readme:gallery:end -->

## 快速开始

```sh
pnpm install --frozen-lockfile
pnpm build
mkdir -p output
pnpm avatar --request examples/requests/coder.json --output output/avatar.svg
```

<p>
  <img src="docs/images/coder-terminal.png" alt="程序员机器人，紫色终端实例徽章，来自 examples/requests/coder.json" width="180" height="180">
</p>

<!-- readme:quick-start:start -->

上图直接用 [`examples/requests/coder.json`](examples/requests/coder.json) 生成：模板 `coder`，发型 `hair-side-part`，实例徽章 `terminal`。不加 `--output`，SVG 打到 stdout。CLI 不会改动已有文件。

<!-- readme:quick-start:end -->

```sh
pnpm build && pnpm start
```

在 <http://127.0.0.1:3000> 打开 Studio。

各模块如何配合，见 [docs/architecture.md](docs/architecture.md)。

## 许可证

使用 [MIT License](LICENSE)。第三方图标的说明在 [assets/LICENSES.md](assets/LICENSES.md)。
