import { describe, expect, it } from 'vitest';
import { execFileSync, spawnSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import {
  generateAvatar,
  normalizeAvatar,
  AvatarError,
  validateCatalog,
} from '../../packages/core/dist/index.js';
import { catalog } from '../../packages/design-tokens/dist/index.js';
import { svgRenderer, composeSvg } from '../../packages/renderer-svg/dist/index.js';
import { parseAsset, verifyAssetProvenance } from '../../scripts/compile-assets.mjs';

const fixture = JSON.parse(
  readFileSync(new URL('../fixtures/coder.json', import.meta.url), 'utf8'),
);
const generate = (input) => generateAvatar(input, catalog, svgRenderer);
describe('deterministic generation contract', () => {
  it.each([
    ['build', 'hat-hardhat', 'safety-yellow'],
    ['docs', 'hat-cap', 'ivory'],
    ['security', 'hat-cap', 'charcoal'],
  ])(
    'keeps the %s occupational hat across states and hair overrides',
    (templateId, type, color) => {
      for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
        const result = generate({
          templateId,
          state,
          instance: {
            hair: { style: 'hair-side-part', color: templateId === 'security' ? 'silver' : 'plum' },
          },
        });
        expect(result.avatar.hat).toMatchObject({ type, fill: catalog.colors[color] });
        expect(result.avatar.hair.color).toBe(
          catalog.colors[templateId === 'security' ? 'silver' : 'plum'],
        );
      }
    },
  );

  it('repeats fixed-seed output without mutating input and is insensitive to input property order', () => {
    const original = structuredClone(fixture);
    const first = generate(fixture);
    expect(generate(fixture)).toEqual(first);
    expect(
      generate({
        background: fixture.background,
        instance: fixture.instance,
        templateId: fixture.templateId,
      }),
    ).toEqual(first);
    expect(fixture).toEqual(original);
    expect(first.avatar.hair).toMatchObject({
      style: 'hair-hime-cut',
      back: 'hair-hime-cut-back',
    });
  });
  it.each([
    'hair-rounded-bob',
    'hair-wolf-cut',
    'hair-feather-flip',
    'hair-hime-cut',
    'hair-sculpted-waves',
  ])('keeps the coder default and resolves the %s front/back pair', (style) => {
    expect(generate({ templateId: 'coder' }).avatar.hair.style).toBe('hair-side-part');
    expect(
      generate({ templateId: 'coder', instance: { hair: { style } } }).avatar.hair,
    ).toMatchObject({ style, back: `${style}-back` });
  });
  it('preserves identity and instance selections across all states', () => {
    const outputs = new Set();
    const baseline = normalizeAvatar(fixture, catalog);
    for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
      const result = generate({ ...fixture, state });
      expect({ ...result.avatar, state: 'idle' }).toEqual(baseline);
      outputs.add(result.svg);
    }
    expect(outputs.size).toBe(6);
  });
  it('normalizes the legacy style alias to the canonical identity', () => {
    const canonical = generate({ ...fixture, styleId: 'soft-layered-2d' });
    const legacy = generate({ ...fixture, styleId: 'flat-2d' });
    expect(legacy).toEqual(canonical);
    expect(canonical.avatar.styleId).toBe('soft-layered-2d');
  });
  it('rejects unknown style IDs', () => {
    expect(() => generate({ ...fixture, styleId: 'unknown-style' })).toThrow(AvatarError);
  });
  it('retains explicit overrides and rejects unsupported values', () => {
    const result = generate({
      templateId: 'test',
      instance: {
        seed: 'custom',
        hair: { style: 'hair-side-part', color: 'plum' },
        face: { glasses: 'none' },
        instanceBadge: { icon: 'check', label: '<&', color: 'teal' },
      },
    });
    expect(result.avatar.hair).toEqual({
      style: 'hair-side-part',
      back: 'hair-crop-back',
      color: '#61435f',
    });
    expect(result.avatar.instanceBadge).toEqual({
      icon: 'check',
      asset: 'icon-check',
      iconColor: '#171918',
      label: '<&',
      image: null,
      color: '#278b88',
      position: 'bottom-right',
    });
    expect(result.svg).toContain('&lt;&amp;');
    expect(result.svg).not.toContain('><&<');
  });
  it.each([
    null,
    [],
    {},
    { templateId: 42 },
    { templateId: 'missing' },
    { ...fixture, extra: true },
    { ...fixture, styleId: 'other' },
    { ...fixture, state: 'busy' },
    { ...fixture, size: 0 },
    { ...fixture, size: 257 },
    { ...fixture, size: NaN },
    { ...fixture, format: 'jpeg' },
    { ...fixture, instance: { templateId: 'test' } },
    { ...fixture, instance: { hat: { color: 'teal' } } },
    { ...fixture, instance: { seed: '' } },
    { ...fixture, instance: { hair: { style: 'unknown' } } },
    { ...fixture, instance: { hair: { color: '#ff0000' } } },
    { ...fixture, instance: { face: { shape: 'missing' } } },
    { ...fixture, instance: { face: { glasses: 'square' } } },
    { ...fixture, instance: { face: { glasses: 'round' } } },
    {
      ...fixture,
      instance: { instanceBadge: { icon: 'check', color: 'teal', position: 'top-left' } },
    },
    { ...fixture, instance: { instanceBadge: { icon: 'bad', color: 'teal' } } },
    { ...fixture, instance: { instanceBadge: { icon: 'check', color: 'teal', label: 'long' } } },
  ])('rejects invalid input %# with a typed domain error', (input) => {
    expect(() => generate(input)).toThrow(AvatarError);
  });
  it('rejects characters that cannot appear in XML while preserving Unicode labels', () => {
    for (const label of ['\u0001', '\ud800', '\uffff']) {
      expect(() =>
        generate({
          templateId: 'coder',
          instance: { instanceBadge: { icon: 'dot', color: 'teal', label } },
        }),
      ).toThrow(AvatarError);
    }
    expect(
      generate({
        templateId: 'coder',
        instance: { instanceBadge: { icon: 'dot', color: 'teal', label: '🤖' } },
      }).svg,
    ).toContain('🤖');
  });
  it('does not silently render unsupported catalog overlays', () => {
    const avatar = normalizeAvatar(fixture, catalog);
    expect(() =>
      svgRenderer.render({ ...avatar, face: { ...avatar.face, glasses: 'square' } }),
    ).toThrow(AvatarError);
    expect(() =>
      svgRenderer.render({
        ...avatar,
        instanceBadge: { ...avatar.instanceBadge, icon: 'unknown' },
      }),
    ).toThrow(AvatarError);
  });
  it('gives output options and component versions distinct resource identities', () => {
    const base = generate(fixture);
    for (const change of [
      { size: 64 },
      { size: 128 },
      { size: 512 },
      { background: 'gradient' },
      { background: 'transparent' },
      { state: 'success' },
    ]) {
      expect(generate({ ...fixture, ...change }).resourceKey).not.toBe(base.resourceKey);
    }
    expect(
      generateAvatar(fixture, catalog, { ...svgRenderer, version: 'next' }).resourceKey,
    ).not.toBe(base.resourceKey);
    expect(base.resourceKey).toContain(catalog.version);
  });
  it('uses deterministic seed selection while explicit hair wins', () => {
    const styles = new Set();
    for (let seed = 0; seed < 20; seed++)
      styles.add(
        normalizeAvatar({ templateId: 'coder', instance: { seed: String(seed) } }, catalog).hair
          .style,
      );
    expect(styles).toEqual(new Set(catalog.hair));
    expect(normalizeAvatar({ templateId: 'coder' }, catalog).seed).toBe('bot-avatar-v1');
  });
  it('keeps non-expression layers identical when changing state', () => {
    const stableLayers = (state) =>
      composeSvg(normalizeAvatar({ ...fixture, state }, catalog)).children.filter(
        (node) => node.tag !== 'title' && node.attributes?.['data-layer'] !== 'state',
      );
    for (const state of ['working', 'waiting', 'success', 'error', 'offline'])
      expect(stableLayers(state)).toEqual(stableLayers('idle'));
  });
  it('resolves template hair colors without overriding explicit instance choices', () => {
    expect(normalizeAvatar({ templateId: 'test' }, catalog).hair.color).toBe(catalog.colors.lime);
    expect(
      normalizeAvatar({ templateId: 'test', instance: { hair: { color: 'purple' } } }, catalog).hair
        .color,
    ).toBe(catalog.colors.purple);
    expect(() => validateCatalog({ ...catalog, hairBack: {} })).toThrow(AvatarError);
  });
  it('resolves legacy template ids to the same preferred identity', () => {
    for (const [legacy, preferred, badge] of [
      ['assistant', 'coder', 'badge-code'],
      ['builder', 'test', 'badge-flask'],
      ['caretaker', 'security', 'badge-shield'],
    ]) {
      const instance = { seed: 'alias-check', hair: { style: 'hair-side-part' } };
      const fromLegacy = normalizeAvatar({ templateId: legacy, instance }, catalog);
      const fromPreferred = normalizeAvatar({ templateId: preferred, instance }, catalog);
      expect(fromLegacy).toEqual(fromPreferred);
      expect(fromPreferred.templateId).toBe(preferred);
      expect(fromPreferred.hat.badge).toBe(badge);
      expect(generate({ templateId: legacy, instance }).svg).toBe(
        generate({ templateId: preferred, instance }).svg,
      );
    }
    expect(normalizeAvatar({ templateId: 'security-officer' }, catalog).templateId).toBe(
      'security-officer',
    );
    expect(normalizeAvatar({ templateId: 'coder' }, catalog).hat).toMatchObject({
      type: 'hat-beanie',
      fill: catalog.colors.charcoal,
    });
    expect(() =>
      validateCatalog({ ...catalog, roles: { ...catalog.roles, security: 'security-officer' } }),
    ).toThrow(AvatarError);
  });
  it('embeds every paint resource with the approved material treatment', () => {
    for (const template of catalog.templates) {
      const { svg } = generate({
        templateId: template.id,
        background: 'gradient',
        instance: { instanceBadge: { icon: 'terminal', color: 'purple' } },
      });
      const ids = new Set([...svg.matchAll(/ id="([^"]+)"/gu)].map((match) => match[1]));
      for (const match of svg.matchAll(/url\(#([^)]*)\)/gu)) expect(ids.has(match[1])).toBe(true);
      expect(svg).toContain('feTurbulence');
      expect(svg).toContain('seed="17"');
      expect(svg).not.toMatch(/<image|docs\/draft|data:image/gu);
    }
  });
  it('keeps each hat and its emblem unchanged across every runtime state', () => {
    for (const template of catalog.templates) {
      const baseline = generate({ templateId: template.id });
      const emblem = (avatar) =>
        composeSvg(avatar).children.find((node) => node.attributes?.['data-layer'] === 'hat-badge');
      expect(emblem(baseline.avatar)).toBeDefined();
      for (const state of ['working', 'waiting', 'success', 'error', 'offline']) {
        const changed = generate({ templateId: template.id, state });
        expect(changed.avatar.hat).toEqual(baseline.avatar.hat);
        expect(emblem(changed.avatar)).toEqual(emblem(baseline.avatar));
      }
    }
  });
  it('uses background-free upstream icons and optional dark plaques', () => {
    const emblem = (templateId) =>
      composeSvg(normalizeAvatar({ templateId }, catalog)).children.find(
        (node) => node.attributes?.['data-layer'] === 'hat-badge',
      );
    expect(emblem('coder').children).toHaveLength(1);
    expect(emblem('shell').children[0].attributes.fill).toBe('#171918');
    expect(emblem('research').children).toHaveLength(1);
    expect(emblem('research').attributes.transform).not.toBe(emblem('docs').attributes.transform);
  });
  it('retains upstream hat icon paths through color and layout changes', () => {
    const paths = (node) => [
      ...(node.tag === 'path' ? [node.attributes.d] : []),
      ...(node.children ?? []).flatMap(paths),
    ];
    for (const template of catalog.templates) {
      const entry = catalog.assets.find((asset) => asset.id === template.hat.badge);
      expect(entry.permission).toBe('ISC');
      const original = parseAsset(readFileSync(resolve(entry.source), 'utf8'))
        .filter((node) => node.tag === 'path')
        .map((node) => node.attributes.d);
      const tree = composeSvg(normalizeAvatar({ templateId: template.id }, catalog));
      const emblem = tree.children.find((node) => node.attributes?.['data-layer'] === 'hat-badge');
      expect(paths(emblem)).toEqual(original);
    }
  });
  it('preserves transparent Lucide strokes and separate body contours', () => {
    const flatten = (node) => [node, ...(node.children ?? []).flatMap(flatten)];
    const tree = composeSvg(normalizeAvatar({ templateId: 'coder' }, catalog));
    const emblem = tree.children.find((node) => node.attributes?.['data-layer'] === 'hat-badge');
    const glyphs = flatten(emblem).filter((node) => node.tag === 'path');
    expect(glyphs.length).toBeGreaterThan(0);
    for (const glyph of glyphs) {
      expect(glyph.attributes.fill).toBe('none');
      expect(glyph.attributes.stroke).toBe(catalog.colors.cyan);
      expect(glyph.attributes['stroke-width']).toBe(2.6);
      expect(glyph.attributes.transform).toBe(`scale(${256 / 24})`);
    }
    const contours = flatten(tree).filter((node) => node.attributes?.['stroke-opacity']);
    expect(contours.length).toBeGreaterThan(0);
    for (const contour of contours) expect(contour.attributes.stroke).not.toMatch(/^url/u);
  });
  it('recolors an instance icon independently of its circular rim', () => {
    const input = {
      templateId: 'coder',
      instance: { instanceBadge: { icon: 'terminal', color: 'purple', iconColor: 'teal' } },
    };
    const result = generate(input);
    expect(result.avatar.instanceBadge).toMatchObject({
      asset: 'badge-terminal',
      color: catalog.colors.purple,
      iconColor: catalog.colors.teal,
    });
    const overlay = composeSvg(result.avatar).children.find(
      (node) => node.attributes?.['data-layer'] === 'instance-badge',
    );
    expect(JSON.stringify(overlay)).toContain(catalog.colors.teal);
    expect(
      generate({
        ...input,
        instance: { instanceBadge: { ...input.instance.instanceBadge, iconColor: 'coral' } },
      }).resourceKey,
    ).not.toBe(result.resourceKey);
    expect(() =>
      generate({
        ...input,
        instance: { instanceBadge: { ...input.instance.instanceBadge, iconColor: 'invalid' } },
      }),
    ).toThrow(AvatarError);
  });
  it('resolves every instance badge to a vendored icon', () => {
    for (const icon of catalog.instanceBadges) {
      const result = generate({
        templateId: 'coder',
        instance: { instanceBadge: { icon, color: 'teal' } },
      });
      expect(
        catalog.assets.find((entry) => entry.id === result.avatar.instanceBadge.asset).permission,
      ).toBe('ISC');
    }
    expect(() => validateCatalog({ ...catalog, instanceBadgeAssets: {} })).toThrow(AvatarError);
  });
  it('preserves the third-party license in generated SVG and distribution', () => {
    const license = readFileSync('assets/icons/lucide/LICENSE', 'utf8');
    expect(generate(fixture).svg).toContain('Copyright (c) 2026 Lucide Icons and Contributors');
    expect(generate(fixture).svg).toContain('<metadata>');
    expect(readFileSync('packages/renderer-svg/dist/THIRD_PARTY_NOTICES.txt', 'utf8')).toContain(
      license,
    );
  });
  it('renders all templates and supported dimensions', () => {
    for (const template of catalog.templates)
      for (const size of [64, 128, 256, 512]) {
        const { svg } = generate({ templateId: template.id, size });
        expect(svg).toContain(`width="${size}" height="${size}"`);
        expect(svg).toContain('viewBox="0 0 256 256"');
        expect(svg).not.toMatch(/undefined|NaN|<script|href=/u);
      }
  });
});
describe('catalog and asset boundaries', () => {
  it('rejects duplicate identity and broken catalog references', () => {
    expect(() =>
      validateCatalog({
        ...catalog,
        templates: [...catalog.templates, { ...catalog.templates[0], id: 'duplicate' }],
      }),
    ).toThrow(AvatarError);
    expect(() => validateCatalog({ ...catalog, assets: [] })).toThrow(AvatarError);
    expect(() =>
      validateCatalog({ ...catalog, colors: { ...catalog.colors, ink: 'url(unsafe)' } }),
    ).toThrow(AvatarError);
    expect(() => validateCatalog({ ...catalog, roles: { other: 'missing' } })).toThrow(AvatarError);
  });
  it('verifies every vendored SVG and rejects modified icon source', () => {
    for (const entry of catalog.assets.filter((asset) => asset.permission === 'ISC')) {
      const source = readFileSync(resolve(entry.source), 'utf8');
      expect(() => verifyAssetProvenance(entry, source)).not.toThrow();
      expect(() => verifyAssetProvenance(entry, `${source} `)).toThrow('integrity mismatch');
    }
  });
  it.each([
    '<script/>',
    '<path d="M0 0" onclick="bad"/>',
    '<path d="M0 0" fill="url(https://bad)"/>',
    '<image href="file:///etc/passwd"/>',
    '<g><path d="M0 0"/></g>',
    '<path d="M0 0"/><!---->',
  ])('rejects active or unsupported SVG: %s', (body) => {
    expect(() =>
      parseAsset(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">${body}</svg>`),
    ).toThrow();
  });
});
describe('CLI and portable distribution', () => {
  it('matches library SVG, reports invalid input, and refuses to overwrite files', () => {
    const cli = resolve('apps/cli/dist/main.js');
    const request = resolve('tests/fixtures/coder.json');
    expect(execFileSync(process.execPath, [cli, '--request', request], { encoding: 'utf8' })).toBe(
      generate(fixture).svg,
    );
    const directory = mkdtempSync(join(tmpdir(), 'bot-avatar-cli-'));
    try {
      const invalid = join(directory, 'bad.json');
      writeFileSync(invalid, '{');
      const failed = spawnSync(process.execPath, [cli, '--request', invalid], { encoding: 'utf8' });
      expect(failed.status).toBe(2);
      expect(failed.stderr).toContain('INVALID_INPUT');
      expect(failed.stdout).toBe('');
      const output = join(directory, 'avatar.svg');
      execFileSync(process.execPath, [cli, '--request', request, '--output', output]);
      expect(readFileSync(output, 'utf8')).toBe(generate(fixture).svg);
      expect(
        spawnSync(process.execPath, [cli, '--request', request, '--output', output]).status,
      ).toBe(1);
      expect(
        spawnSync(process.execPath, [cli, '--request', request, '--unknown', 'x']).status,
      ).toBe(2);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
  it('runs SVG libraries from copied distribution files with no source tree or assets', () => {
    const directory = mkdtempSync(join(tmpdir(), 'bot-avatar-portable-'));
    try {
      for (const [name, source] of [
        ['core', 'packages/core'],
        ['design-tokens', 'packages/design-tokens'],
        ['renderer-svg', 'packages/renderer-svg'],
      ]) {
        const destination = join(directory, 'node_modules', '@bot-avatar', name);
        mkdirSync(destination, { recursive: true });
        cpSync(resolve(source, 'dist'), join(destination, 'dist'), { recursive: true });
        cpSync(resolve(source, 'package.json'), join(destination, 'package.json'));
      }
      const input = join(directory, 'request.json');
      writeFileSync(input, JSON.stringify(fixture));
      const output = execFileSync(
        process.execPath,
        [
          '--input-type=module',
          '-e',
          `import {generateAvatar} from '@bot-avatar/core'; import {catalog} from '@bot-avatar/design-tokens'; import {svgRenderer} from '@bot-avatar/renderer-svg'; process.stdout.write(generateAvatar(${JSON.stringify(fixture)},catalog,svgRenderer).svg);`,
        ],
        { cwd: directory, encoding: 'utf8' },
      );
      expect(output).toBe(generate(fixture).svg);
    } finally {
      rmSync(directory, { recursive: true, force: true });
    }
  });
});

describe('template hair palettes and restored rendering', () => {
  it('offers every soft-layered-2d hairstyle without changing identity across states', () => {
    expect(catalog.hair).toEqual([
      'hair-sweep',
      'hair-wave',
      'hair-side-part',
      'hair-curtain',
      'hair-soft-curls',
      'hair-layered-fringe',
      'hair-wispy-fringe',
      'hair-rounded-bob',
      'hair-wolf-cut',
      'hair-feather-flip',
      'hair-hime-cut',
      'hair-sculpted-waves',
    ]);
    for (const template of catalog.templates) {
      expect(new Set(template.allowedHair)).toEqual(new Set(catalog.hair));
      const baseline = generate({ templateId: template.id }).avatar;
      for (const style of template.allowedHair) {
        for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
          const first = generate({
            templateId: template.id,
            state,
            instance: { seed: 'hair-contract', hair: { style } },
          });
          const second = generate({
            templateId: template.id,
            state,
            instance: { seed: 'hair-contract', hair: { style } },
          });
          expect(first.avatar.hat).toEqual(baseline.hat);
          expect(first.avatar.templateId).toBe(baseline.templateId);
          expect(first.svg).toBe(second.svg);
        }
      }
    }
  });
  it('rejects hairstyles removed during visual review', () => {
    for (const style of ['hair-crop', 'hair-spikes', 'hair-curls'])
      expect(() => generate({ templateId: 'coder', instance: { hair: { style } } })).toThrow(
        AvatarError,
      );
  });
  it('gives coder a restrained technical palette and side-part default', () => {
    const result = generate({ templateId: 'coder' });
    expect(result.avatar.hat).toMatchObject({
      color: 'charcoal',
      fill: catalog.colors.charcoal,
      badge: 'badge-code',
      badgeColor: 'cyan',
      badgeFill: catalog.colors.cyan,
    });
    expect(result.avatar.hair).toMatchObject({
      style: 'hair-side-part',
      color: catalog.colors.cocoa,
    });
  });
  it('accepts all curated colors without changing template identity across states', () => {
    for (const template of catalog.templates) {
      const baseline = generate({ templateId: template.id });
      expect(template.allowedHairColors.length).toBeGreaterThanOrEqual(10);
      expect(template.allowedHairColors).toContain(template.defaultHairColor);
      for (const color of template.allowedHairColors) {
        for (const state of ['idle', 'working', 'waiting', 'success', 'error', 'offline']) {
          const result = generate({
            templateId: template.id,
            state,
            instance: { hair: { color } },
          });
          expect(result.avatar.hat).toEqual(baseline.avatar.hat);
          expect(result.avatar.hair.color).toBe(catalog.colors[color]);
          expect(result.svg).toContain('linearGradient');
          expect(result.svg).toContain('contact-shadow');
        }
      }
      const excluded = Object.keys(catalog.colors).find(
        (color) => !template.allowedHairColors.includes(color),
      );
      expect(() =>
        generate({ templateId: template.id, instance: { hair: { color: excluded } } }),
      ).toThrow(AvatarError);
    }
  });
  it('rejects invalid palette defaults, missing colors and badge colors', () => {
    const template = catalog.templates[0];
    for (const changes of [
      { allowedHairColors: [] },
      { allowedHairColors: ['missing'] },
      { allowedHairColors: ['cocoa', 'cocoa'] },
      { defaultHairColor: 'missing' },
      { hat: { ...template.hat, badgeColor: 'missing' } },
    ])
      expect(() =>
        validateCatalog({
          ...catalog,
          templates: [{ ...template, ...changes }, ...catalog.templates.slice(1)],
        }),
      ).toThrow(AvatarError);
  });
});
