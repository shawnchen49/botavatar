export const workspacePolicy = {
  '@bot-avatar/core': { directory: 'packages/core', dependencies: [] },
  '@bot-avatar/design-tokens': {
    directory: 'packages/design-tokens',
    dependencies: ['@bot-avatar/core'],
    typeOnly: ['@bot-avatar/core'],
  },
  '@bot-avatar/renderer-svg': {
    directory: 'packages/renderer-svg',
    dependencies: ['@bot-avatar/core', '@bot-avatar/design-tokens'],
  },
  '@bot-avatar/renderer-png': { directory: 'packages/renderer-png', dependencies: [] },
  '@bot-avatar/cli': {
    directory: 'apps/cli',
    dependencies: [
      '@bot-avatar/core',
      '@bot-avatar/design-tokens',
      '@bot-avatar/renderer-svg',
      '@bot-avatar/renderer-png',
    ],
  },
  '@bot-avatar/api': {
    directory: 'apps/api',
    dependencies: [
      '@bot-avatar/core',
      '@bot-avatar/design-tokens',
      '@bot-avatar/renderer-svg',
      '@bot-avatar/renderer-png',
    ],
  },
  '@bot-avatar/studio': {
    directory: 'apps/studio',
    dependencies: ['@bot-avatar/core'],
    typeOnly: ['@bot-avatar/core'],
  },
};
