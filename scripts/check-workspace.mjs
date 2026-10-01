import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { resolve } from 'node:path';
import { workspacePolicy } from './workspace-policy.mjs';

export function validateWorkspace(manifests, policy = workspacePolicy) {
  const errors = [];
  for (const [name, { directory, dependencies }] of Object.entries(policy)) {
    const manifest = manifests[directory];
    if (!manifest) {
      errors.push(`Missing workspace: ${directory}`);
      continue;
    }
    if (manifest.name !== name) errors.push(`${directory}: expected package name ${name}`);
    if (manifest.private !== true) errors.push(`${name}: packages must remain private`);
    if (manifest.type !== 'module') errors.push(`${name}: native ESM is required`);
    for (const field of [
      'dependencies',
      'devDependencies',
      'peerDependencies',
      'optionalDependencies',
    ]) {
      for (const [dependency, version] of Object.entries(manifest[field] ?? {})) {
        if (!dependency.startsWith('@bot-avatar/') && !version.startsWith('workspace:')) continue;
        if (!dependencies.includes(dependency))
          errors.push(`${name}: forbidden dependency ${dependency}`);
        if (version !== 'workspace:*') errors.push(`${name}: ${dependency} must use workspace:*`);
      }
    }
  }
  const knownDirectories = new Set(Object.values(policy).map(({ directory }) => directory));
  for (const directory of Object.keys(manifests)) {
    if (!knownDirectories.has(directory))
      errors.push(`Workspace missing from policy: ${directory}`);
  }
  return errors;
}

async function main() {
  const root = fileURLToPath(new URL('../', import.meta.url));
  const manifests = {};
  for (const parent of ['apps', 'packages']) {
    for (const entry of await readdir(resolve(root, parent), { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      const directory = `${parent}/${entry.name}`;
      manifests[directory] = JSON.parse(
        await readFile(resolve(root, directory, 'package.json'), 'utf8'),
      );
    }
  }
  const errors = validateWorkspace(manifests);
  if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
    return;
  }
  console.log(`Validated ${Object.keys(manifests).length} workspace manifests.`);
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
