import { test, expect } from '@playwright/test';

test('preview, state, shared URL and both export formats', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
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
  await expect(page.getByRole('heading', { name: 'A face for every bot.' })).toBeVisible();
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
  const color = page.getByRole('combobox', { name: 'Hair color', exact: true });
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
  await expect(color.locator('option')).toHaveCount(6);
  await expect(color.locator('option[value="purple"]')).toHaveCount(0);
  await color.selectOption('plum');
  await template.selectOption('build');
  await expect(color).toHaveValue('plum');
  await template.selectOption('caretaker');
  await expect(color).toHaveValue('');
  await expect(color.locator('option[value="navy"]')).toHaveCount(0);
  await color.selectOption('silver');
  await page.getByRole('button', { name: 'Create share link' }).click();
  await page.reload();
  await expect(color).toHaveValue('silver');
  await expect(page.getByRole('button', { name: 'Export SVG', exact: true })).toBeEnabled();
});
