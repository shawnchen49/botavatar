import Fastify from 'fastify';
import { createHash } from 'node:crypto';
import {
  AvatarError,
  generateAvatar,
  parseAvatarBatch,
  parseAvatarRequest,
} from '@bot-avatar/core';
import type { AvatarRequest } from '@bot-avatar/core';
import { catalog } from '@bot-avatar/design-tokens';
import { svgRenderer } from '@bot-avatar/renderer-svg';
import { PNG_RENDERER_VERSION, renderPng } from '@bot-avatar/renderer-png';

export function createApp(
  options: {
    readonly instances?: Readonly<Record<string, AvatarRequest>>;
    readonly logger?: boolean;
  } = {},
) {
  const app = Fastify({
    logger: options.logger ?? false,
    bodyLimit: 1_048_576,
    requestTimeout: 15_000,
  });
  const instances = new Map(
    Object.entries(options.instances ?? {}).map(([id, request]) => {
      if (!/^[a-zA-Z0-9_-]{1,128}$/.test(id))
        throw new AvatarError('INVALID_INPUT', 'Invalid instance ID.');
      const parsed = parseAvatarRequest(request);
      generateAvatar(parsed, catalog, svgRenderer);
      return [id, parsed] as const;
    }),
  );
  function encode(result: ReturnType<typeof generateAvatar>) {
    const data =
      result.avatar.format === 'png'
        ? Buffer.from(renderPng(result.svg, result.avatar.size))
        : Buffer.from(result.svg);
    return {
      data,
      format: result.avatar.format,
      resourceKey:
        result.avatar.format === 'png'
          ? JSON.stringify([result.resourceKey, PNG_RENDERER_VERSION])
          : result.resourceKey,
      etag: `"${createHash('sha256').update(data).digest('hex')}"`,
    };
  }
  app.setErrorHandler((error, _request, reply) => {
    if (error instanceof AvatarError && error.code !== 'INVALID_CATALOG')
      return reply.code(400).send({ code: error.code, message: error.message });
    const statusCode =
      error instanceof Error && 'statusCode' in error ? error.statusCode : undefined;
    const status =
      typeof statusCode === 'number' && statusCode >= 400 && statusCode < 500 ? statusCode : 500;
    if (status === 500) app.log.error(error);
    return reply.code(status).send({
      code: status === 500 ? 'INTERNAL_ERROR' : 'INVALID_INPUT',
      message:
        status === 500
          ? 'Avatar generation failed.'
          : error instanceof Error
            ? error.message
            : 'Invalid request.',
    });
  });
  app.get('/health', async () => ({ status: 'ok' }));
  app.get('/v1/templates', async () => ({
    version: catalog.version,
    templates: catalog.templates,
    roles: catalog.roles,
  }));
  app.get('/v1/styles', async () => ({
    styles: [
      {
        id: catalog.styleId,
        sizes: [64, 128, 256, 512],
        backgrounds: ['transparent', 'solid', 'gradient'],
        hair: catalog.hair,
        glasses: catalog.glasses,
        colors: catalog.colors,
        instanceBadges: catalog.instanceBadges,
      },
    ],
  }));
  app.get('/v1/states', async () => ({
    states: ['idle', 'working', 'waiting', 'success', 'error', 'offline'],
  }));
  app.post('/v1/avatar', async (request, reply) => {
    const result = encode(generateAvatar(request.body, catalog, svgRenderer));
    return reply
      .header('Cache-Control', 'no-store')
      .header('ETag', result.etag)
      .type(result.format === 'png' ? 'image/png' : 'image/svg+xml')
      .send(result.data);
  });
  app.post('/v1/avatar/batch', async (request, reply) => {
    reply.header('Cache-Control', 'no-store');
    const requests = parseAvatarBatch(request.body);
    // Validate every request before doing expensive rasterization.
    const generated = requests.map((input) => generateAvatar(input, catalog, svgRenderer));
    return {
      schemaVersion: 1,
      entries: generated.map((avatar, index) => {
        const result = encode(avatar);
        return {
          file: `${String(index + 1).padStart(3, '0')}.${result.format}`,
          request: requests[index],
          resourceKey: result.resourceKey,
          etag: result.etag,
          encoding: 'base64',
          data: result.data.toString('base64'),
        };
      }),
    };
  });
  app.get<{ Params: { id: string; format: string }; Querystring: Record<string, unknown> }>(
    '/v1/avatar/:id.:format',
    async (request, reply) => {
      const known = instances.get(request.params.id);
      if (!known) return reply.code(404).send({ code: 'NOT_FOUND', message: 'Unknown instance.' });
      if (!['svg', 'png'].includes(request.params.format))
        return reply.code(400).send({ code: 'INVALID_INPUT', message: 'Unsupported format.' });
      if (Object.keys(request.query).some((key) => !['state', 'size', 'background'].includes(key)))
        throw new AvatarError('INVALID_INPUT', 'Unknown query parameter.');
      const input = {
        ...known,
        ...request.query,
        ...(request.query.size === undefined ? {} : { size: Number(request.query.size) }),
        format: request.params.format,
      };
      const result = encode(generateAvatar(input, catalog, svgRenderer));
      reply
        .header('ETag', result.etag)
        .header('Cache-Control', 'private, no-cache')
        .type(result.format === 'png' ? 'image/png' : 'image/svg+xml');
      const tags = request.headers['if-none-match']
        ?.split(',')
        .map((tag) => tag.trim().replace(/^W\//, ''));
      if (tags?.includes(result.etag) || tags?.includes('*')) return reply.code(304).send();
      return reply.send(result.data);
    },
  );
  return app;
}
