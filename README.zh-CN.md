<p align="center"><a href="README.md">English</a> | <a href="README.zh-CN.md">中文</a></p>

<p align="center">
  <img src="assets/branding/bot-avatar-logo-readme.png" alt="Bot Avatar 标志" width="320">
</p>

# Bot Avatar

[![CI](https://github.com/stevenchen49/botavatar/actions/workflows/ci.yml/badge.svg)](https://github.com/stevenchen49/botavatar/actions/workflows/ci.yml)

给软件机器人用的确定性头像。**模板**决定机器人类型，**实例**再加上发型和一枚个人徽章，**状态**表示它正在做什么。同一个请求，每次得到的 SVG 都一样。

主格式是 SVG。PNG 有 64、128、256、512 像素。自带风格是 `soft-layered-2d`（Soft Layered 2D）：帽子偏大，头发有颜色，脸是奶油色、没有嘴，眼睛是胶囊形。

## 图库

<!-- readme:gallery:start -->

下面是素材库 **1.19.6** 的 256 像素 PNG，背景透明。每个角色都用了当前素材库里写明的一种发型。

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

标题上面这张图是缩小一半的 README 标志（`assets/branding/bot-avatar-logo-readme.png`，836×470）。完整标志还放在 `assets/branding/bot-avatar-logo.png`（1672×941）。[`docs/images/`](docs/images) 里的头像预览是提交进仓库的 README 图。`output/` 里的评审图不进 Git。回归测试的 SVG 在 [`tests/snapshots/`](tests/snapshots)。

## 快速开始

Node.js 用 22.x 里的 22.14 或更高版本，也可以用 24.x。pnpm 用 11.25.0。CI 的 Node 版本写在 [`.node-version`](.node-version)。

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

要 PNG，在请求里把 `"format"` 设为 `"png"`。文件名不决定格式。批量输入是 JSON 数组，1–100 条，最大 1 MiB。输出目录必须是新建的。成功后，里面是编号文件和一份 `manifest.json`。

```sh
pnpm avatar --batch examples/requests/batch.json --output-dir output/my-batch
```

Studio 和本地 API：

```sh
pnpm build && pnpm start
```

打开 <http://127.0.0.1:3000>。服务器只监听回环地址。改端口就设 `PORT`。`BOT_AVATAR_INSTANCES` 指向一份只读的 JSON 映射，比如 [`examples/instances/local.json`](examples/instances/local.json)。

<img src="docs/images/studio.png" alt="Bot Avatar Studio 本地编辑器：程序员预览、状态按钮、导出设置，以及模板、发型和徽章" width="880">

默认布局：左边是头像预览和状态，右边是模板、发型和徽章。

## 命令

| 命令                 | 用途                                                   |
| -------------------- | ------------------------------------------------------ |
| `pnpm docs:readme`   | 更新 README 示例、素材库摘要和 Studio 截图             |
| `pnpm check`         | 工作区策略、格式、lint、TypeScript、测试，以及生产构建 |
| `pnpm format`        | 用 Prettier 格式化                                     |
| `pnpm avatar --help` | 打印 CLI 用法                                          |
| `pnpm start`         | 在 `127.0.0.1:3000` 启动 API 和 Studio                 |
| `pnpm studio`        | 启动 Vite 开发服务器；API 要另开一个终端               |

跑 `pnpm avatar` 或 `pnpm start` 之前要先构建。流水线里跑 `node apps/cli/dist/main.js`，包管理器的日志才不会进 stdout。不认识的参数和非法输入，退出码是 2。读写或转换出错，退出码是 1。

### 刷新示例

素材库或渲染改了之后，跑 `pnpm docs:readme`。它会先构建，再按 [`examples/readme.json`](examples/readme.json) 重画角色图，换掉快速开始那张图，并截一张当前的 Studio。README 里的版本号来自素材库。截图需要 Playwright 的 Chromium（`pnpm exec playwright install chromium`）。要用已经装好的 Google Chrome，就跑 `PLAYWRIGHT_CHANNEL=chrome pnpm docs:readme`。

想换上面展示的角色或发型，改 `examples/readme.json`。快速开始那张图直接读 `examples/requests/coder.json`。这个命令只改 README 里做了标记的段落，以及生成出来的示例图。提交前看一下 diff。它不会改已经批准的视觉测试基线。

## 素材库

风格 ID 以 `soft-layered-2d` 为准。请求里写 `flat-2d` 也行，这是旧别名，读进来会换成 `soft-layered-2d`。

<!-- readme:catalog:start -->

`packages/design-tokens` 里的清单 **1.19.6** 就是当前的 `soft-layered-2d` 素材库：25 个模板，12 种发型（`hair-sweep`、`hair-wave`、`hair-side-part`、`hair-curtain`、`hair-soft-curls`、`hair-layered-fringe`、`hair-wispy-fringe`、`hair-rounded-bob`、`hair-wolf-cut`、`hair-feather-flip`、`hair-hime-cut`、`hair-sculpted-waves`），6 种状态。

<!-- readme:catalog:end -->

原创模板有 20 个。对外的 id 就是角色名：

`coder`、`research`、`docs`、`git`、`review`、`shell`、`build`、`debug`、`printer`、`network`、`ai`、`general`、`test`、`deploy`、`monitor`、`security`、`design`、`data`、`search`、`support`。

旧的请求 id 还能用：`assistant` 会选到 `coder`，`builder` 会选到 `test`，`caretaker` 会选到 `security`。可选模板的 id 会在角色名后面再加一个词：`docs-editor`、`security-officer`、`deploy-aviator`、`build-red`。

`research` 和 `ai` 戴的都是 `badge-sparkle`。素材库里没有单独的学术徽章，所以 `research` 就用这枚。

一个角色名只对应一个默认模板。实例徽章的别名有 `dot`、`check`、`terminal`、`search`、`server`。颜色填素材库里的 token id。不认识的字段，或者不支持的选项，校验都会失败。请求怎么写，见 [CLI 指南](apps/cli/README.md)。

## 架构

```text
request
  -> validate
  -> normalize against the versioned catalog
  -> compose layers
  -> soft-layered-2d SVG
  -> optional PNG
```

| 部分                                               | 说明                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------ |
| [`packages/core`](packages/core)                   | 契约、校验、按种子得出的默认值，以及图层组合。不碰文件系统、网络、进程、DOM 或时钟。 |
| [`packages/design-tokens`](packages/design-tokens) | 颜色、模板、角色，还有素材库清单。                                                   |
| [`packages/renderer-svg`](packages/renderer-svg)   | 用内嵌素材画 `soft-layered-2d` 的 SVG。                                              |
| [`packages/renderer-png`](packages/renderer-png)   | 把 SVG 转成 PNG。                                                                    |
| [`apps/cli`](apps/cli)、[`apps/api`](apps/api)     | 文件和 HTTP。                                                                        |
| [`apps/studio`](apps/studio)                       | 页面上的控件。预览和导出都走 API。                                                   |

改状态不会换掉模板和实例。有效输入相同，CLI 和 API 就返回同一份 SVG。模块边界，以及再做一种视觉风格还要补什么，以 [架构指南](docs/architecture.md) 为准。

## 文档

- [架构](docs/architecture.md)和[架构决策](docs/decisions/0001-workspace-foundation.md)
- [视觉风格](docs/visual-style.md)
- [评审阶段](docs/roadmap.md)
- [本地和离线使用](docs/local-distribution.md)
- [目录结构](docs/directory-structure.md)和[编码规范](docs/coding-standards.md)
- [CLI](apps/cli/README.md)、[API](apps/api/README.md)和 [Studio](apps/studio/README.md)
- [请求示例](examples/requests/coder.json)、[批量示例](examples/requests/batch.json)和[实例映射](examples/instances/local.json)
- [贡献指南](CONTRIBUTING.md)和 [Agent 说明](AGENTS.md)
- [素材说明](assets/LICENSES.md)

仓库里维护的文字是英文。`docs/draft/` 下被忽略的本地草稿，构建和理解这个项目都用不到。

## 许可证

使用 [MIT License](LICENSE)。第三方图标的说明在 [assets/LICENSES.md](assets/LICENSES.md)。
