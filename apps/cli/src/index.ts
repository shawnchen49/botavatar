import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { AvatarError, generateAvatar, parseAvatarBatch } from '@bot-avatar/core';
import { catalog } from '@bot-avatar/design-tokens';
import { svgRenderer } from '@bot-avatar/renderer-svg';
import { PNG_RENDERER_VERSION, renderPng } from '@bot-avatar/renderer-png';

const usage =
  'Usage: bot-avatar (--request <request.json> [--output <avatar.svg|png>] | --batch <requests.json> --output-dir <new-directory>)\n';
function render(input: unknown) {
  const result = generateAvatar(input, catalog, svgRenderer);
  const data =
    result.avatar.format === 'png' ? renderPng(result.svg, result.avatar.size) : result.svg;
  return {
    ...result,
    resourceKey:
      result.avatar.format === 'png'
        ? JSON.stringify([result.resourceKey, PNG_RENDERER_VERSION])
        : result.resourceKey,
    data,
    sha256: createHash('sha256').update(data).digest('hex'),
  };
}
export async function runCli(args: readonly string[]): Promise<number> {
  try {
    if (args.length === 1 && args[0] === '--help') {
      process.stdout.write(usage);
      return 0;
    }
    const flags = new Map<string, string>();
    for (let i = 0; i < args.length; i += 2) {
      const key = args[i];
      const value = args[i + 1];
      if (
        !key ||
        !['--request', '--output', '--batch', '--output-dir'].includes(key) ||
        !value ||
        value.startsWith('--') ||
        flags.has(key)
      )
        throw new AvatarError('INVALID_INPUT', usage.trim());
      flags.set(key, value);
    }
    const batch = flags.has('--batch');
    const requestPath = flags.get(batch ? '--batch' : '--request');
    if (
      !requestPath ||
      (batch && (flags.has('--request') || flags.has('--output') || !flags.has('--output-dir'))) ||
      (!batch && flags.has('--output-dir'))
    )
      throw new AvatarError('INVALID_INPUT', usage.trim());
    const raw = await readFile(requestPath, 'utf8');
    if (Buffer.byteLength(raw) > 1_048_576)
      throw new AvatarError('INVALID_INPUT', 'Request file exceeds 1 MB.');
    let input: unknown;
    try {
      input = JSON.parse(raw);
    } catch {
      throw new AvatarError('INVALID_INPUT', 'Request file must contain valid JSON.');
    }
    if (batch) {
      const requests = parseAvatarBatch(input);
      // Complete validation and conversion before creating any output.
      const results = requests.map(render);
      const directory = flags.get('--output-dir');
      if (!directory) throw new AvatarError('INVALID_INPUT', usage.trim());
      await mkdir(directory); // Exclusive destination: never overwrite an existing batch.
      const entries = [];
      for (const [index, result] of results.entries()) {
        const file = `${String(index + 1).padStart(3, '0')}.${result.avatar.format}`;
        await writeFile(join(directory, file), result.data, { flag: 'wx' });
        entries.push({
          file,
          request: requests[index],
          normalized: result.avatar,
          resourceKey: result.resourceKey,
          sha256: result.sha256,
        });
      }
      // A manifest marks a fully written batch. An I/O failure may leave an incomplete directory.
      await writeFile(
        join(directory, 'manifest.json'),
        `${JSON.stringify({ schemaVersion: 1, svgRenderer: svgRenderer.version, pngRenderer: PNG_RENDERER_VERSION, entries }, null, 2)}\n`,
        { flag: 'wx' },
      );
    } else {
      const result = render(input);
      const destination = flags.get('--output');
      if (destination) await writeFile(destination, result.data, { flag: 'wx' });
      else process.stdout.write(result.data);
    }
    return 0;
  } catch (error) {
    process.stderr.write(
      `${error instanceof AvatarError ? error.code : 'IO_ERROR'}: ${error instanceof Error ? error.message : 'Unexpected failure.'}\n`,
    );
    return error instanceof AvatarError ? 2 : 1;
  }
}
