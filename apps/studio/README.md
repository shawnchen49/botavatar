# Studio application

React/Vite Studio configures templates, seed, hair, instance badges, state,
size, and background. It fetches metadata, previews, and SVG/PNG exports from the
same-origin API. Core imports are types only; selection and drawing stay on the server.

Run `pnpm build && pnpm start` at the root, then open `http://127.0.0.1:3000`.
For UI development, run the API and `pnpm studio` in separate terminals; Vite proxies
API requests to port 3000. `web/` is the ignored production bundle; `dist/` contains
TypeScript project output. No fonts, assets, or scripts load from an external CDN.

Create share link writes settings to the URL hash. The recipient needs a running
local Studio and should use the hash on their local server address. Links do not
upload or persist avatars. Invalid requests display errors and disable export.
Preview cancellation prevents obsolete responses from replacing newer settings.

`pnpm test:e2e` covers state changes, configuration, URL reload, SVG/PNG downloads,
invalid-input recovery, and a mobile viewport. Install Playwright Chromium first;
`PLAYWRIGHT_CHANNEL=chrome` uses installed Chrome instead.

Badge labels support short monograms (including two letters). The image-import UI
is temporarily hidden; existing embedded-image share links and exports still work.
The retained import utility handles PNG, JPEG, or
WebP up to 5 MB and 4096 pixels per side. Studio converts imports to embedded
128-pixel PNGs locally and selects a quantized dominant foreground color, ignoring
transparent and near-white pixels; monochrome images retain a neutral rim. Users
can override the detected rim with a palette color. Images travel with preview,
SVG/PNG exports, and share-link settings; no external image URL is fetched.

Seed settings are collapsed by default. Background choices have color swatches,
and the desktop preview stays in view while scrolling. Template changes preserve
compatible hair choices and instance badges; incompatible hair overrides reset
to the new template defaults. Hair colors come from each template palette. Solid and gradient background defaults follow the active catalog.

The compact desktop workspace places state, and output settings below the preview, with identity and badge controls
alongside and export actions at the bottom right. At 1027 by 784
pixels the full editor fits even with seed and letter-badge settings expanded.
Mobile retains a scrolling single-column layout. Hair colors use a dropdown palette of named circular swatches with a
template-default reset, native radio keyboard navigation, and Escape dismissal.
