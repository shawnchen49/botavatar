import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from '@playwright/test';
import { createApp } from '../apps/api/dist/index.js';

const requireFromApi = createRequire(new URL('../apps/api/package.json', import.meta.url));
const staticFiles = requireFromApi('@fastify/static');

const viewport = { width: 1027, height: 784 };

/**
 * Capture the production Studio editor for the README.
 *
 * The API and browser are owned by this function so callers can use it from a
 * build or documentation refresh script without leaving a process behind.
 */
export async function captureReadmeStudio(outputPath) {
  const app = createApp();
  let browser;

  try {
    await app.register(staticFiles, {
      root: fileURLToPath(new URL('../apps/studio/web/', import.meta.url)),
    });
    await app.listen({ host: '127.0.0.1', port: 0 });
    const address = app.server.address();
    if (!address || typeof address === 'string') throw new Error('Unable to determine API port.');

    browser = await chromium.launch({
      headless: true,
      ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
    });
    const page = await browser.newPage({ viewport });
    await page.goto(`http://127.0.0.1:${address.port}/`, { waitUntil: 'networkidle' });
    await page.locator('[aria-label="Avatar preview"] img').waitFor({ state: 'visible' });
    await page
      .getByRole('button', { name: 'Export SVG', exact: true })
      .waitFor({ state: 'visible' });
    await page.evaluate(async () => {
      if (globalThis.document.fonts) await globalThis.document.fonts.ready;
    });
    await mkdir(dirname(outputPath), { recursive: true });
    await page.screenshot({ path: outputPath, fullPage: false });
    await page.close();
  } finally {
    await browser?.close();
    await app.close();
  }
}
