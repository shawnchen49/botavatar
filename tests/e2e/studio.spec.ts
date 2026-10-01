import { test, expect } from '@playwright/test';

test('preview, state, shared URL and both export formats', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('debug');
  await page.getByRole('button', { name: 'working', exact: true }).click();
  await page.getByRole('combobox', { name: 'Size', exact: true }).selectOption('128');
  await page.getByRole('combobox', { name: 'Instance badge', exact: true }).selectOption('check');
  await page.getByLabel('Badge label').fill('OK');
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  for (const format of ['SVG', 'PNG']) {
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: `Export ${format}`, exact: true }).click();
    const file = await download;
    expect(file.suggestedFilename()).toBe(`debug.${format.toLowerCase()}`);
    expect(await file.failure()).toBeNull();
  }
  await page.getByRole('button', { name: 'Create share link' }).click();
  const url = page.url();
  expect(url).toContain('#request=');
  await page.goto(url);
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Template', exact: true })).toHaveValue('debug');
  await expect(page.getByRole('button', { name: 'working', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByLabel('Badge label')).toHaveValue('OK');
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  await page.screenshot({ path: 'output/studio-desktop.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.getByRole('heading', { name: 'A face for every bot.' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'output/studio-mobile.png', fullPage: true });
  expect(errors).toEqual([]);
});
test('invalid input clears stale preview and can recover', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await page.getByLabel('Seed', { exact: true }).fill('');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeDisabled();
  await page.getByLabel('Seed', { exact: true }).fill('recovered');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
});

test('malformed shared configuration reports an error without crashing', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto(
    '/#request=' +
      encodeURIComponent(JSON.stringify({ templateId: 'assistant', size: { bad: true } })),
  );
  await expect(page.getByRole('alert')).toContainText('shared link is invalid');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  expect(errors).toEqual([]);
});
