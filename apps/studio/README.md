# Studio application

React/Vite Studio configures templates, seed, hair, glasses, instance badges, state,
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
