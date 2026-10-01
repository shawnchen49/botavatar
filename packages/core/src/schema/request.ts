import { AvatarError } from '../errors.js';

type Schema<T> = { readonly parse: (value: unknown, path: string) => T };
type Value<S> = S extends Schema<infer T> ? T : never;
type Shape = Readonly<Record<string, Schema<unknown>>>;
type Parsed<S extends Shape> = {
  readonly [K in keyof S as undefined extends Value<S[K]> ? never : K]: Value<S[K]>;
} & {
  readonly [K in keyof S as undefined extends Value<S[K]> ? K : never]?: Exclude<
    Value<S[K]>,
    undefined
  >;
};
const fail = (path: string): never => {
  throw new AvatarError('INVALID_INPUT', `Invalid value at ${path}.`);
};
const text: Schema<string> = {
  parse: (v, p) =>
    typeof v === 'string' &&
    v.length > 0 &&
    v.length <= 128 &&
    /^[\u0020-\uD7FF\uE000-\uFFFD\u{10000}-\u{10FFFF}]+$/u.test(v)
      ? v
      : fail(p),
};
function choice<const T extends readonly (string | number)[]>(values: T): Schema<T[number]> {
  return {
    parse: (v, p) => {
      for (const candidate of values) if (candidate === v) return candidate;
      return fail(p);
    },
  };
}
function optional<T>(schema: Schema<T>): Schema<T | undefined> {
  return { parse: (v, p) => (v === undefined ? undefined : schema.parse(v, p)) };
}
function object<const S extends Shape>(shape: S): Schema<Parsed<S>> {
  return {
    parse: (v, p) => {
      if (typeof v !== 'object' || v === null || Array.isArray(v)) return fail(p);
      for (const key of Object.keys(v)) if (!Object.hasOwn(shape, key)) fail(`${p}.${key}`);
      const result: Record<string, unknown> = {};
      for (const [key, schema] of Object.entries(shape)) {
        const value = schema.parse(Object.getOwnPropertyDescriptor(v, key)?.value, `${p}.${key}`);
        if (value !== undefined) result[key] = value;
      }
      // Every property is validated above; this cast preserves the schema's inferred shape.
      return result as Parsed<S>;
    },
  };
}
export const stateSchema = choice(['idle', 'working', 'waiting', 'success', 'error', 'offline']);
export const faceSchema = object({ shape: optional(text), glasses: optional(text) });
export const badgeSchema = object({
  icon: text,
  iconColor: optional(text),
  label: optional(text),
  color: text,
  position: optional(choice(['bottom-right'])),
});
export const instanceSchema = object({
  id: optional(text),
  seed: optional(text),
  hair: optional(object({ style: optional(text), color: optional(text) })),
  face: optional(faceSchema),
  instanceBadge: optional(badgeSchema),
});
export const requestSchema = object({
  templateId: text,
  instance: optional(instanceSchema),
  state: optional(stateSchema),
  styleId: optional(text),
  size: optional(choice([64, 128, 256, 512])),
  format: optional(choice(['svg', 'png'])),
  background: optional(choice(['transparent', 'solid', 'gradient'])),
});
export type AvatarRequest = Value<typeof requestSchema>;
export type BotState = Value<typeof stateSchema>;
export type InstanceOverrides = Value<typeof instanceSchema>;
export type InstanceFace = Value<typeof faceSchema>;
export type InstanceBadge = Value<typeof badgeSchema> & { readonly position: 'bottom-right' };
export function parseAvatarRequest(value: unknown): AvatarRequest {
  return requestSchema.parse(value, 'request');
}
