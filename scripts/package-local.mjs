import { execFileSync } from 'node:child_process';
import {
  cpSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  lstatSync,
  unlinkSync,
  symlinkSync,
} from 'node:fs';
import { resolve, join, relative, dirname } from 'node:path';
import { createHash } from 'node:crypto';

// A new destination is mandatory; never erase or overwrite a prior release.
const target = resolve(process.argv[2] ?? `output/bot-avatar-${process.platform}-${process.arch}`);
mkdirSync(target);
mkdirSync(join(target, 'apps'));
// Legacy deploy re-resolves workspace importers. A frozen install fills the
// package store without registry packuments, so --offline cannot resolve root
// devDependencies such as globals. Tarballs still come from the local store.
for (const name of ['api', 'cli'])
  execFileSync(
    'pnpm',
    ['--filter', `@bot-avatar/${name}`, 'deploy', '--legacy', '--prod', join(target, 'apps', name)],
    { stdio: 'inherit' },
  );
// Legacy deploy hoists a self-link to the source checkout. Relocate that one link.
for (const name of ['api', 'cli']) {
  const selfLink = join(target, 'apps', name, 'node_modules/.pnpm/node_modules/@bot-avatar', name);
  unlinkSync(selfLink);
  symlinkSync(relative(dirname(selfLink), join(target, 'apps', name)), selfLink, 'dir');
}
// pnpm legacy deploy updates workspace settings; restore the normal development install.
execFileSync('pnpm', ['install', '--offline', '--frozen-lockfile'], { stdio: 'inherit' });
cpSync('apps/studio/web', join(target, 'apps/studio/web'), { recursive: true });
cpSync('examples', join(target, 'examples'), { recursive: true });
cpSync('assets/LICENSES.md', join(target, 'ASSET-LICENSES.md'));
cpSync('assets/icons/lucide/LICENSE', join(target, 'LUCIDE-LICENSE'), { recursive: true });
writeFileSync(join(target, 'start.mjs'), "import './apps/api/dist/main.js';\n");
writeFileSync(join(target, 'avatar.mjs'), "import './apps/cli/dist/main.js';\n");
writeFileSync(
  join(target, 'README.txt'),
  `Bot Avatar — local distribution\n\nRequires Node.js 22.14+ (22.x) or 24.x on ${process.platform}/${process.arch}.\nStart: node start.mjs\nOpen: http://127.0.0.1:3000\nCLI: node avatar.mjs --request examples/requests/coder.json\nNo package installation or network access is needed at runtime.\nSet PORT and BOT_AVATAR_INSTANCES as needed. The server binds to loopback only.\nPackages are private / UNLICENSED. No open-source license is granted.\nThird-party license notices remain in the bundled packages and LUCIDE-LICENSE.\nPNG badge labels use fonts installed on the target computer.\n`,
);
const files = [];
function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const path = join(dir, entry),
      stat = lstatSync(path);
    if (stat.isDirectory()) walk(path);
    else if (stat.isFile())
      files.push({
        file: relative(target, path),
        sha256: createHash('sha256').update(readFileSync(path)).digest('hex'),
      });
  }
}
walk(target);
writeFileSync(
  join(target, 'release-manifest.json'),
  JSON.stringify(
    {
      schemaVersion: 1,
      platform: process.platform,
      arch: process.arch,
      node: process.versions.node,
      files,
    },
    null,
    2,
  ) + '\n',
);
console.log(`Offline distribution prepared at ${target}`);
