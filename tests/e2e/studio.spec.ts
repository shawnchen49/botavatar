import { test, expect } from '@playwright/test';

test('preview, state, shared URL and both export formats', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByRole('combobox', { name: 'Template', exact: true })).toHaveValue('coder');
  await expect(page.getByRole('region', { name: 'Avatar preview' })).toContainText('Coder');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('debug');
  await page.getByRole('button', { name: 'working', exact: true }).click();
  await page.getByRole('combobox', { name: 'Size', exact: true }).selectOption('128');
  await page.getByRole('combobox', { name: 'Instance badge', exact: true }).selectOption('letters');
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
  await expect(page.getByRole('link', { name: 'BOT / AVATAR' })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'output/studio-mobile.png', fullPage: true });
  expect(errors).toEqual([]);
});
test('invalid input clears stale preview and can recover', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await page.getByText('Advanced · seed', { exact: true }).click();
  await page.getByLabel('Seed', { exact: true }).fill('');
  await expect(page.getByRole('alert')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeDisabled();
  await page.getByLabel('Seed', { exact: true }).fill('recovered');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
});

test('legacy template ids select the preferred role template', async ({ page }) => {
  await page.goto(
    '/#request=' +
      encodeURIComponent(JSON.stringify({ templateId: 'caretaker', instance: { seed: 'alias' } })),
  );
  await expect(page.getByRole('combobox', { name: 'Template', exact: true })).toHaveValue(
    'security',
  );
  await expect(page.getByRole('region', { name: 'Avatar preview' })).toContainText('Security');
  await expect(page.locator('option[value="security-officer"]')).toHaveText('Security officer');
  await expect(page.locator('option[value="security"]')).toHaveText('Security');
  await expect(page.locator('option[value="coder"]')).toHaveText('Coder');
  await expect(page.locator('option[value="test"]')).toHaveText('Test');
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

test('incomplete shared badges recover without crashing the editor', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const instanceBadge of [{}, { icon: 'dot' }, { color: 'teal' }]) {
    await page.goto(
      '/#request=' +
        encodeURIComponent(JSON.stringify({ templateId: 'coder', instance: { instanceBadge } })),
    );
    await page.reload();
    await expect(page.getByRole('alert')).toContainText('shared link is invalid');
    await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  }
  expect(errors).toEqual([]);
});

test('hides import controls while preserving existing image badges and exports', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await expect(page.getByLabel('Glasses', { exact: true })).toHaveCount(0);
  await page.getByRole('combobox', { name: 'Instance badge', exact: true }).selectOption('letters');
  await page.getByLabel('Badge label').fill('LV');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  const encoded = await page.evaluate(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Missing canvas');
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, 64, 64);
    context.fillStyle = '#3388dd';
    context.fillRect(12, 12, 40, 40);
    return canvas.toDataURL('image/png').split(',')[1] ?? '';
  });
  await expect(page.locator('input[type="file"]')).toHaveCount(0);
  await expect(page.getByRole('option', { name: 'Custom image' })).toHaveCount(0);
  const request = {
    templateId: 'research',
    instance: {
      instanceBadge: {
        icon: 'dot',
        image: `data:image/png;base64,${encoded}`,
        color: '#3388dd',
      },
    },
  };
  await page.goto('/#request=' + encodeURIComponent(JSON.stringify(request)));
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Badge color', exact: true })).toHaveValue(
    '#3388dd',
  );
  await expect(page.getByLabel('Badge label')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Create share link' }).click();
  await page.reload();
  await expect(page.getByRole('combobox', { name: 'Instance badge', exact: true })).toHaveValue(
    'custom',
  );
  await expect(page.getByRole('combobox', { name: 'Badge color', exact: true })).toHaveValue(
    '#3388dd',
  );
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  for (const format of ['SVG', 'PNG']) {
    const download = page.waitForEvent('download');
    await page.getByRole('button', { name: `Export ${format}`, exact: true }).click();
    expect(await (await download).failure()).toBeNull();
  }
  await page.getByRole('button', { name: 'Solid', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Solid', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await page.getByRole('combobox', { name: 'Template', exact: true }).selectOption('debug');
  await expect(page.getByRole('combobox', { name: 'Instance badge', exact: true })).toHaveValue(
    'custom',
  );
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  await page.screenshot({ path: 'output/studio-solid-refinement.png', fullPage: true });
});

test('template changes retain compatible hair and reset incompatible choices', async ({ page }) => {
  await page.goto('/');
  const template = page.getByRole('combobox', { name: 'Template', exact: true });
  const menu = page.locator('.color-menu');
  const open = () => menu.locator('summary').click();
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await open();
  expect(await menu.getByRole('radio').count()).toBeGreaterThan(10);
  await menu.getByRole('radio', { name: 'plum', exact: true }).check();
  await page.keyboard.press('Escape');
  await expect(menu).not.toHaveAttribute('open');
  await template.selectOption('build');
  await open();
  await expect(menu.getByRole('radio', { name: 'plum', exact: true })).toBeChecked();
  await template.selectOption('security');
  await open();
  await expect(menu.getByRole('radio', { name: 'Template default' })).toBeChecked();
  await expect(menu.getByRole('radio', { name: 'navy', exact: true })).toHaveCount(0);
  await menu.getByRole('radio', { name: 'silver', exact: true }).check();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'Create share link' }).click();
  await page.reload();
  await open();
  await expect(menu.getByRole('radio', { name: 'silver', exact: true })).toBeChecked();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
});

test('all settings and exports fit the review viewport with a letter badge', async ({ page }) => {
  await page.setViewportSize({ width: 1027, height: 784 });
  await page.goto('/');
  await page.getByRole('combobox', { name: 'Instance badge', exact: true }).selectOption('letters');
  await page.getByText('Advanced · seed', { exact: true }).click();
  await expect(page.getByRole('button', { name: 'Export PNG', exact: true })).toBeEnabled();
  expect(
    await page.evaluate(() => ({
      height: document.documentElement.scrollHeight,
      width: document.documentElement.scrollWidth,
    })),
  ).toEqual({ height: 784, width: 1027 });
  const preview = await page.getByRole('region', { name: 'Avatar preview' }).boundingBox();
  const actions = await page.locator('.export-actions').boundingBox();
  if (!actions || !preview) throw new Error('Missing editor panels');
  expect(actions.x).toBeGreaterThan(preview.x + preview.width);
  await expect(page.getByText('A face for every bot.')).toHaveCount(0);
  await page.locator('.color-menu summary').click();
  await expect(page.getByRole('radio', { name: 'copper', exact: true })).toBeVisible();
  await page.screenshot({ path: 'output/studio-color-menu.png', fullPage: true });
  await page.keyboard.press('Escape');
  await page.screenshot({ path: 'output/studio-compact.png', fullPage: true });
});
