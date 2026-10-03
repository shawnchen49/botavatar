import type { AvatarRequest } from '@bot-avatar/core';

const defaultRequest: AvatarRequest = {
  templateId: 'coder',
  instance: { seed: 'bot-avatar-v1' },
  size: 256,
  state: 'idle',
  background: 'transparent',
};
export function initialRequest(hash: string): { request: AvatarRequest; error: string } {
  try {
    const value = new URLSearchParams(hash.slice(1)).get('request');
    if (!value) return { request: defaultRequest, error: '' };
    if (value.length > 110000) throw new Error();
    const parsed: unknown = JSON.parse(value);
    // Full domain validation stays at the API boundary; guard the UI's structure here.
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error();
    const request = parsed as AvatarRequest;
    if (
      typeof request.templateId !== 'string' ||
      (request.instance !== undefined &&
        (!request.instance ||
          typeof request.instance !== 'object' ||
          Array.isArray(request.instance)))
    )
      throw new Error();
    const record = (v: unknown): v is Record<string, unknown> =>
      typeof v === 'object' && v !== null && !Array.isArray(v);
    const strings = (v: Record<string, unknown>, keys: string[]) =>
      keys.every((key) => v[key] === undefined || typeof v[key] === 'string');
    if (
      !strings(parsed as Record<string, unknown>, [
        'templateId',
        'state',
        'styleId',
        'format',
        'background',
      ]) ||
      (request.size !== undefined && typeof request.size !== 'number')
    )
      throw new Error();
    if (request.instance) {
      const value = request.instance as Record<string, unknown>;
      if (!strings(value, ['id', 'seed'])) throw new Error();
      for (const [key, fields] of [
        ['hair', ['style', 'color']],
        ['face', ['shape', 'glasses']],
        ['instanceBadge', ['icon', 'color', 'iconColor', 'label', 'position', 'image']],
      ] as const) {
        const nested = value[key];
        if (nested !== undefined && (!record(nested) || !strings(nested, [...fields])))
          throw new Error();
      }
    }
    const badge = request.instance?.instanceBadge;
    if (badge && (typeof badge.icon !== 'string' || typeof badge.color !== 'string'))
      throw new Error();
    return { request, error: '' };
  } catch {
    return {
      request: defaultRequest,
      error: 'The shared link is invalid. Default settings were loaded.',
    };
  }
}
