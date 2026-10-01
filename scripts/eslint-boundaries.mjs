import { builtinModules } from 'node:module';
import { relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { workspacePolicy } from './workspace-policy.mjs';

const root = fileURLToPath(new URL('../', import.meta.url));
const builtins = new Set(builtinModules.flatMap((name) => [name, `node:${name}`]));

export const boundariesPlugin = {
  rules: {
    imports: {
      meta: {
        type: 'problem',
        schema: [],
        messages: {
          boundary: 'Cross-workspace imports must use an allowed public package entrypoint.',
          typeOnly: 'This dependency is type-only. Use import type or export type.',
          platform: 'This package must not depend on Node.js built-ins.',
          dynamic: 'Use a literal import specifier so workspace boundaries remain checkable.',
        },
      },
      create(context) {
        const filename = context.filename;
        const entry = Object.entries(workspacePolicy).find(([, { directory }]) =>
          filename.startsWith(`${resolve(root, directory)}${sep}`),
        );
        if (!entry) return {};
        const [name, policy] = entry;
        const packageRoot = resolve(root, policy.directory);
        function inspect(node) {
          const source = node.source ?? node.argument;
          if (!source) return;
          const specifier = source.value;
          if (typeof specifier !== 'string') {
            context.report({ node, messageId: 'dynamic' });
            return;
          }
          if (specifier.startsWith('.')) {
            const target = resolve(filename, '..', specifier);
            const path = relative(packageRoot, target);
            if (path === '..' || path.startsWith(`..${sep}`)) {
              context.report({ node, messageId: 'boundary' });
            }
            return;
          }
          if (specifier.startsWith('@bot-avatar/')) {
            if (!policy.dependencies.includes(specifier)) {
              context.report({ node, messageId: 'boundary' });
            } else if (
              policy.typeOnly?.includes(specifier) &&
              node.importKind !== 'type' &&
              node.exportKind !== 'type' &&
              node.type !== 'TSImportType'
            ) {
              context.report({ node, messageId: 'typeOnly' });
            }
          } else if (
            specifier.startsWith('/') ||
            specifier.startsWith('#') ||
            specifier.startsWith('file:')
          ) {
            context.report({ node, messageId: 'boundary' });
          }
          if (
            [
              '@bot-avatar/core',
              '@bot-avatar/design-tokens',
              '@bot-avatar/renderer-svg',
              '@bot-avatar/studio',
            ].includes(name) &&
            (builtins.has(specifier) || specifier.startsWith('node:'))
          ) {
            context.report({ node, messageId: 'platform' });
          }
        }
        return {
          ImportDeclaration: inspect,
          ExportNamedDeclaration: inspect,
          ExportAllDeclaration: inspect,
          ImportExpression: inspect,
          TSImportType: inspect,
        };
      },
    },
  },
};
