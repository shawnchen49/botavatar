import {
  cpSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
  readdirSync,
  lstatSync,
  realpathSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve, relative, isAbsolute } from 'node:path';
import { execFileSync, spawn } from 'node:child_process';
import { once } from 'node:events';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';

const source = resolve(process.argv[2] ?? `output/bot-avatar-${process.platform}-${process.arch}`);
const root = mkdtempSync(join(tmpdir(), 'bot-avatar-offline-'));
let server;
try {
  const bundle = join(root, 'bundle');
  cpSync(source, bundle, { recursive: true, verbatimSymlinks: true });
  const manifest = JSON.parse(readFileSync(join(bundle, 'release-manifest.json'), 'utf8'));
  for (const item of manifest.files)
    assert.equal(
      createHash('sha256')
        .update(readFileSync(join(bundle, item.file)))
        .digest('hex'),
      item.sha256,
    );
  function checkLinks(directory) {
    for (const entry of readdirSync(directory)) {
      const file = join(directory, entry),
        stat = lstatSync(file);
      if (stat.isDirectory()) checkLinks(file);
      else if (stat.isSymbolicLink()) {
        const target = relative(realpathSync(bundle), realpathSync(file));
        assert.ok(!target.startsWith('..') && !isAbsolute(target), `Escaping link: ${file}`);
      }
    }
  }
  checkLinks(bundle);
  for (const format of ['svg', 'png']) {
    const input = join(root, 'request.json');
    writeFileSync(input, JSON.stringify({ templateId: 'debug', format, size: 64 }));
    const output = execFileSync(
      process.execPath,
      [join(bundle, 'avatar.mjs'), '--request', input],
      { cwd: root },
    );
    if (format === 'svg') assert.match(output.toString(), /<svg /);
    else assert.equal(output.subarray(1, 4).toString(), 'PNG');
  }
  // A separate process starts with only the copied release directory available to module resolution.
  const port = process.env.VERIFY_PORT ?? '3199';
  server = spawn(process.execPath, [join(bundle, 'start.mjs')], {
    cwd: root,
    env: { ...process.env, PORT: port, BOT_AVATAR_INSTANCES: '' },
    stdio: ['ignore', 'pipe', 'pipe'],
  });
  let logs = '';
  server.stdout.on('data', (chunk) => {
    logs += chunk;
  });
  server.stderr.on('data', (chunk) => {
    logs += chunk;
  });
  const base = `http://127.0.0.1:${port}`;
  let ready = false;
  for (let i = 0; i < 100; i++) {
    if (server.exitCode !== null) throw new Error(logs);
    try {
      const r = await fetch(`${base}/health`);
      if (r.ok) {
        ready = true;
        break;
      }
    } catch {
      /* Wait for the local listener. */
    }
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(ready, logs || 'Local server failed to start.');
  const html = await (await fetch(base)).text();
  assert.match(html, /Bot Avatar Studio/);
  const asset = html.match(/src="([^"]+\.js)"/)[1];
  assert.equal((await fetch(base + asset)).status, 200);
  const png = await fetch(`${base}/v1/avatar`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ templateId: 'assistant', format: 'png' }),
  });
  assert.equal(png.status, 200);
  assert.equal(
    Buffer.from(await png.arrayBuffer())
      .subarray(1, 4)
      .toString(),
    'PNG',
  );
  console.log(
    'Offline release passed hashes, contained symlinks, SVG/PNG CLI, API, and Studio asset checks from a temporary directory.',
  );
} finally {
  if (server && server.exitCode === null) {
    server.kill('SIGTERM');
    await once(server, 'exit');
  }
  rmSync(root, { recursive: true, force: true });
}
