<p align="center"><a href="README.md">English</a> | <a href="README.zh-CN.md">中文</a></p>

<p align="center">
  <img src="assets/branding/bot-avatar-logo-readme.png" alt="Bot Avatar 标志" width="320">
</p>

# Bot Avatar

[![CI](https://github.com/stevenchen49/botavatar/actions/workflows/ci.yml/badge.svg)](https://github.com/stevenchen49/botavatar/actions/workflows/ci.yml)

面向软件机器人的确定性头像。**模板**确定机器人类型，**实例**添加发型和一枚个人徽章，**状态**表示机器人正在做什么。相同的请求始终生成相同的 SVG。

SVG 是主要格式。PNG 提供 64、128、256 和 512 像素。随仓库提供的风格是 `soft-layered-2d`（Soft Layered 2D）：超大号帽子、彩色头发、奶油色无嘴面孔，以及胶囊形眼睛。

## 图库

<!-- readme:gallery:start -->

来自素材目录 **1.19.6** 的 256 像素 PNG 示例，以透明背景渲染。下面每个角色都使用当前素材目录中明确指定的发型。

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

标题上方是半尺寸 README 标志（`assets/branding/bot-avatar-logo-readme.png`，836×470）。完整品牌标志仍位于 `assets/branding/bot-avatar-logo.png`（1672×941）。[`docs/images/`](docs/images) 中的头像预览是已提交的 README 图片。`output/` 下的评审导出不纳入版本跟踪。回归 SVG 位于 [`tests/snapshots/`](tests/snapshots)。

## 快速开始

请使用 22.x 系列中的 Node.js 22.14 或更高版本，或 Node.js 24.x，以及 pnpm 11.25.0。CI 在 [`.node-version`](.node-version) 中固定 Node 版本。

```sh
pnpm install --frozen-lockfile
pnpm build
mkdir -p output
pnpm avatar --request examples/requests/coder.json --output output/avatar.svg
```

<p>
  <img src="docs/images/coder-terminal.png" alt="来自 examples/requests/coder.json 的程序员机器人，带有紫色终端实例徽章" width="180" height="180">
</p>

<!-- readme:quick-start:start -->

上图直接由 [`examples/requests/coder.json`](examples/requests/coder.json) 生成：模板 `coder`，发型 `hair-side-part`，以及一枚 `terminal` 实例徽章。省略 `--output` 会把 SVG 打印到 stdout。CLI 不会改动已有文件。

<!-- readme:quick-start:end -->

如需 PNG，请在请求中设置 `"format": "png"`。文件名不会决定格式。批量输入是包含 1–100 个请求的 JSON 数组，最大 1 MiB。输出目录必须是新目录；生成成功后，其中会包含编号文件和一份 `manifest.json`。

```sh
pnpm avatar --batch examples/requests/batch.json --output-dir output/my-batch
```

Studio 与本地 API：

```sh
pnpm build && pnpm start
```

打开 <http://127.0.0.1:3000>。服务器只监听回环地址。设置 `PORT` 可更改端口。`BOT_AVATAR_INSTANCES` 可以指向只读 JSON 映射，例如 [`examples/instances/local.json`](examples/instances/local.json)。

<img src="docs/images/studio.png" alt="Bot Avatar Studio，本地编辑器：程序员预览、运行时状态按钮、导出设置，以及模板、发型和徽章控件" width="880">

这是默认的 Studio 界面：左侧是头像预览和状态控件，右侧是模板、发型和徽章设置。

## 命令

| 命令                 | 用途                                                     |
| -------------------- | -------------------------------------------------------- |
| `pnpm docs:readme`   | 刷新 README 示例、素材目录摘要和 Studio 截图             |
| `pnpm check`         | 工作区策略、格式化、lint、TypeScript、测试，以及生产构建 |
| `pnpm format`        | 应用 Prettier                                            |
| `pnpm avatar --help` | 打印 CLI 用法                                            |
| `pnpm start`         | 在 `127.0.0.1:3000` 上提供 API 和 Studio                 |
| `pnpm studio`        | 运行 Vite 开发服务器；请在另一个终端启动 API             |

运行 `pnpm avatar` 或 `pnpm start` 之前请先构建一次。在流水线中运行 `node apps/cli/dist/main.js`，这样包管理器日志就不会出现在 stdout 上。未知标志和无效输入以退出码 2 结束。 I/O 和转换错误以退出码 1 结束。

### 刷新示例

在素材目录或渲染发生变化后运行 `pnpm docs:readme`。它会构建项目，根据 [`examples/readme.json`](examples/readme.json) 重新生成角色图库，更新快速开始图片，并截取当前的 Studio。README 中的版本文本来自素材目录。浏览器步骤需要 Playwright Chromium（`pnpm exec playwright install chromium`）。若改用已安装的 Google Chrome，请运行 `PLAYWRIGHT_CHANNEL=chrome pnpm docs:readme`。

要更改展示的角色或发型选择，请编辑 `examples/readme.json`；快速开始图片直接读取 `examples/requests/coder.json`。只有带标记的 README 段落和生成的示例图片会被改写。提交前请审阅产生的 diff。此命令不会更新已批准的视觉测试基线。

## 素材目录

规范风格 ID 是 `soft-layered-2d`。显式的 `flat-2d` 请求仍作为旧别名受支持，并会规范化为该规范 ID。

<!-- readme:catalog:start -->

`packages/design-tokens` 中的清单 **1.19.6** 是当前的 `soft-layered-2d` 素材目录：25 个模板、12 种发型（`hair-sweep`、`hair-wave`、`hair-side-part`、`hair-curtain`、`hair-soft-curls`、`hair-layered-fringe`、`hair-wispy-fringe`、`hair-rounded-bob`、`hair-wolf-cut`、`hair-feather-flip`、`hair-hime-cut`、`hair-sculpted-waves`），以及 6 种状态。

<!-- readme:catalog:end -->

二十个原创模板。公开 id 即角色名：

`coder`, `research`, `docs`, `git`, `review`, `shell`, `build`, `debug`, `printer`, `network`, `ai`, `general`, `test`, `deploy`, `monitor`, `security`, `design`, `data`, `search`, `support`。

旧请求 id 仍然可解析：`assistant` 选择 `coder`，`builder` 选择 `test`，`caretaker` 选择 `security`。可选模板保留带角色修饰的 id：`docs-editor`、`security-officer`、`deploy-aviator` 和 `build-red`。

`research` 和 `ai` 都佩戴 `badge-sparkle`。素材目录没有单独的学术徽记，因此 `research` 沿用该徽章。

一个角色名会解析为一个默认模板。实例徽章别名是 `dot`、`check`、`terminal`、`search` 和 `server`。颜色是素材目录中的 token id。未知字段和不支持的选项会使校验失败。请求细节见 [CLI 指南](apps/cli/README.md)。

## 架构

```text
request
  -> validate
  -> normalize against the versioned catalog
  -> compose layers
  -> soft-layered-2d SVG
  -> optional PNG
```

| 部分                                               | 职责                                                                             |
| -------------------------------------------------- | -------------------------------------------------------------------------------- |
| [`packages/core`](packages/core)                   | 契约、校验、基于种子的默认值，以及组合。不依赖文件系统、网络、进程、DOM 或时钟。 |
| [`packages/design-tokens`](packages/design-tokens) | 颜色、模板、角色，以及素材目录清单。                                             |
| [`packages/renderer-svg`](packages/renderer-svg)   | 由内嵌资源生成 `soft-layered-2d` SVG。                                           |
| [`packages/renderer-png`](packages/renderer-png)   | 将 SVG 转换为 PNG。                                                              |
| [`apps/cli`](apps/cli)、[`apps/api`](apps/api)     | 文件与 HTTP。                                                                    |
| [`apps/studio`](apps/studio)                       | 浏览器控件。预览和导出都通过 API 完成。                                          |

状态变更会保持模板身份和实例身份。对于相同的有效输入，CLI 和 API 返回相同的 SVG。[架构指南](docs/architecture.md) 是边界的权威来源，也说明第二种视觉风格仍然需要满足哪些条件。

## 文档

- [架构](docs/architecture.md)和[架构决策](docs/decisions/0001-workspace-foundation.md)
- [视觉风格](docs/visual-style.md)
- [评审阶段](docs/roadmap.md)
- [本地与离线使用](docs/local-distribution.md)
- [目录结构](docs/directory-structure.md)和[编码规范](docs/coding-standards.md)
- [CLI](apps/cli/README.md)、[API](apps/api/README.md) 和 [Studio](apps/studio/README.md)
- [请求示例](examples/requests/coder.json)、[批量示例](examples/requests/batch.json)和[实例映射](examples/instances/local.json)
- [贡献指南](CONTRIBUTING.md)和 [Agent 说明](AGENTS.md)
- [素材声明](assets/LICENSES.md)

仓库中维护的文本为英文。`docs/draft/` 下被忽略的本地草稿不是构建或理解本项目所必需的。

## 许可证

以 [MIT License](LICENSE) 发布。第三方图标声明见 [assets/LICENSES.md](assets/LICENSES.md)。
