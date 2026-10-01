import { AvatarError } from './errors.js';
import { parseAvatarRequest } from './schema/request.js';

export const MAX_BATCH_SIZE = 100;
export function parseAvatarBatch(input: unknown) {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_BATCH_SIZE)
    throw new AvatarError('INVALID_INPUT', `Batch must contain 1–${MAX_BATCH_SIZE} requests.`);
  return input.map(parseAvatarRequest);
}
