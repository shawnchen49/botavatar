export type AvatarErrorCode =
  'INVALID_INPUT' | 'UNKNOWN_CHOICE' | 'INVALID_CATALOG' | 'UNSUPPORTED_FORMAT';
export class AvatarError extends Error {
  constructor(
    readonly code: AvatarErrorCode,
    message: string,
  ) {
    super(message);
    this.name = 'AvatarError';
  }
}
