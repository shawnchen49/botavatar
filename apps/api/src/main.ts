import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import staticFiles from '@fastify/static';
import { createApp } from './index.js';
import { parseAvatarRequest } from '@bot-avatar/core';

async function start() {
  const config: unknown = process.env.BOT_AVATAR_INSTANCES
    ? JSON.parse(await readFile(process.env.BOT_AVATAR_INSTANCES, 'utf8'))
    : {};
  if (typeof config !== 'object' || config === null || Array.isArray(config))
    throw new Error('Instances must be a JSON object.');
  const instances = Object.fromEntries(
    Object.entries(config).map(([id, input]) => [id, parseAvatarRequest(input)]),
  );
  const app = createApp({ instances, logger: true });
  await app.register(staticFiles, {
    root: fileURLToPath(new URL('../../studio/web/', import.meta.url)),
  });
  const port = Number(process.env.PORT ?? 3000);
  if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT.');
  await app.listen({ port, host: '127.0.0.1' });
  for (const signal of ['SIGINT', 'SIGTERM'] as const)
    process.once(signal, () => {
      void app.close();
    });
}
start().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
