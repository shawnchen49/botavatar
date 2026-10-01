import { ESLint } from 'eslint';
import { describe, expect, it } from 'vitest';
import { validateWorkspace } from '../../scripts/check-workspace.mjs';

const eslint = new ESLint();

async function architecturalMessages(code, filePath) {
  const [result] = await eslint.lintText(code, { filePath });
  return result.messages.filter((message) =>
    ['architecture/imports', 'no-restricted-globals', 'no-restricted-properties'].includes(
      message.ruleId,
    ),
  );
}

describe('workspace import boundaries', () => {
  it.each([
    ['import { value } from "@bot-avatar/api";', 'packages/core/src/probe.ts'],
    ['export * from "../../core/src/index.js";', 'packages/renderer-svg/src/probe.ts'],
    ['export * from "@bot-avatar/core/src/index.js";', 'packages/renderer-svg/src/probe.ts'],
    ['import { readFile } from "node:fs/promises";', 'packages/core/src/probe.ts'],
    ['const module = import("@bot-avatar/renderer-png");', 'apps/studio/src/probe.ts'],
    ['export { value } from "@bot-avatar/core";', 'packages/design-tokens/src/probe.ts'],
    ['const module = import(path);', 'packages/core/src/probe.ts'],
    ['export const seed = Math.random();', 'packages/core/src/probe.ts'],
    ['export const time = Date.now();', 'packages/core/src/probe.ts'],
  ])('rejects forbidden dependency or nondeterminism: %s', async (code, filePath) => {
    expect(await architecturalMessages(code, filePath)).not.toHaveLength(0);
  });

  it.each([
    ['import type { BotState } from "@bot-avatar/core";', 'packages/design-tokens/src/probe.ts'],
    ['export * from "@bot-avatar/core";', 'packages/renderer-svg/src/probe.ts'],
    ['export * from "./model/avatar.js";', 'packages/core/src/probe.ts'],
    ['import { writeFile } from "node:fs/promises";', 'apps/cli/src/probe.ts'],
  ])('accepts an allowed dependency: %s', async (code, filePath) => {
    expect(await architecturalMessages(code, filePath)).toHaveLength(0);
  });
});

describe('workspace manifests', () => {
  const policy = { '@bot-avatar/core': { directory: 'packages/core', dependencies: [] } };
  const core = { name: '@bot-avatar/core', private: true, type: 'module' };

  it('accepts a private, dependency-free Core', () => {
    expect(validateWorkspace({ 'packages/core': core }, policy)).toEqual([]);
  });

  it('rejects a reverse dependency even when it is optional', () => {
    const manifest = { ...core, optionalDependencies: { '@bot-avatar/api': 'workspace:*' } };
    expect(validateWorkspace({ 'packages/core': manifest }, policy)).toContain(
      '@bot-avatar/core: forbidden dependency @bot-avatar/api',
    );
  });

  it('rejects packages that bypass the central policy', () => {
    expect(validateWorkspace({ 'packages/core': core, 'apps/hidden': {} }, policy)).toContain(
      'Workspace missing from policy: apps/hidden',
    );
  });

  it('rejects registry versions for workspace dependencies', () => {
    const policyWithDependency = {
      '@bot-avatar/design-tokens': {
        directory: 'packages/design-tokens',
        dependencies: ['@bot-avatar/core'],
      },
    };
    const manifest = {
      name: '@bot-avatar/design-tokens',
      private: true,
      type: 'module',
      devDependencies: { '@bot-avatar/core': '^0.1.0' },
    };
    expect(
      validateWorkspace({ 'packages/design-tokens': manifest }, policyWithDependency),
    ).toContain('@bot-avatar/design-tokens: @bot-avatar/core must use workspace:*');
  });
});
