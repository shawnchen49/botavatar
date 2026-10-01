import { readFile, writeFile } from 'node:fs/promises';
import { AvatarError, generateAvatar } from '@bot-avatar/core';
import { catalog } from '@bot-avatar/design-tokens';
import { svgRenderer } from '@bot-avatar/renderer-svg';

const usage = 'Usage: bot-avatar --request <request.json> [--output <avatar.svg>]\n';
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
        (key !== '--request' && key !== '--output') ||
        !value ||
        value.startsWith('--') ||
        flags.has(key)
      )
        throw new AvatarError('INVALID_INPUT', usage.trim());
      flags.set(key, value);
    }
    const requestPath = flags.get('--request');
    if (!requestPath) throw new AvatarError('INVALID_INPUT', usage.trim());
    let request: unknown;
    try {
      request = JSON.parse(await readFile(requestPath, 'utf8'));
    } catch (error) {
      if (error instanceof SyntaxError)
        throw new AvatarError('INVALID_INPUT', 'Request file must contain valid JSON.');
      throw error;
    }
    const result = generateAvatar(request, catalog, svgRenderer);
    const destination = flags.get('--output');
    if (destination) await writeFile(destination, result.svg, { flag: 'wx' });
    else process.stdout.write(result.svg);
    return 0;
  } catch (error) {
    process.stderr.write(
      `${error instanceof AvatarError ? error.code : 'IO_ERROR'}: ${error instanceof Error ? error.message : 'Unexpected failure.'}\n`,
    );
    return error instanceof AvatarError ? 2 : 1;
  }
}
