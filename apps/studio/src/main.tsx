import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { AvatarRequest, BotTemplate, BotState } from '@bot-avatar/core';
import './style.css';
import { ColorMenu } from './color-menu.js';

type Style = {
  id: 'flat-2d';
  sizes: (64 | 128 | 256 | 512)[];
  backgrounds: ('transparent' | 'solid' | 'gradient')[];
  hair: string[];
  colors: Record<string, string>;
  instanceBadges: string[];
};
const defaultRequest: AvatarRequest = {
  templateId: 'assistant',
  instance: { seed: 'bot-avatar-v1' },
  size: 256,
  state: 'idle',
  background: 'transparent',
};
function initialRequest(): { request: AvatarRequest; error: string } {
  try {
    const value = new URLSearchParams(location.hash.slice(1)).get('request');
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
    return { request, error: '' };
  } catch {
    return {
      request: defaultRequest,
      error: 'The shared link is invalid. Default settings were loaded.',
    };
  }
}
async function json<T>(path: string): Promise<T> {
  const response = await fetch(path);
  if (!response.ok) throw new Error('Unable to load the catalog.');
  return response.json() as Promise<T>;
}
function App() {
  const [initial] = useState(initialRequest);
  const [request, setRequest] = useState<AvatarRequest>(initial.request);
  const [templates, setTemplates] = useState<BotTemplate[]>([]);
  const [style, setStyle] = useState<Style>();
  const [states, setStates] = useState<BotState[]>([]);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [linkError, setLinkError] = useState(initial.error);
  const [busy, setBusy] = useState(true);
  const [notice, setNotice] = useState('');
  useEffect(() => {
    let active = true;
    Promise.all([
      json<{ templates: BotTemplate[] }>('/v1/templates'),
      json<{ styles: Style[] }>('/v1/styles'),
      json<{ states: BotState[] }>('/v1/states'),
    ])
      .then(([a, b, c]) => {
        if (active) {
          setTemplates(a.templates);
          setStyle(b.styles[0]);
          setStates(c.states);
        }
      })
      .catch((e) => {
        if (active) setError(String(e));
      });
    return () => {
      active = false;
    };
  }, []);
  useEffect(() => {
    const controller = new AbortController();
    setBusy(true);
    const timer = setTimeout(() => {
      fetch('/v1/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...request, format: 'svg' }),
        signal: controller.signal,
      })
        .then(async (response) => {
          if (!response.ok) {
            const body = (await response.json()) as { message: string };
            throw new Error(body.message);
          }
          const blob = await response.blob();
          if (controller.signal.aborted) return;
          setPreview(URL.createObjectURL(blob));
          setError('');
        })
        .catch((e) => {
          if (!controller.signal.aborted) {
            setPreview('');
            setError(String(e));
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setBusy(false);
        });
    }, 150);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [request]);
  useEffect(
    () => () => {
      if (preview) URL.revokeObjectURL(preview);
    },
    [preview],
  );
  function change(patch: Partial<AvatarRequest>) {
    setBusy(true);
    setLinkError('');
    setNotice('');
    setRequest((current) => ({ ...current, ...patch }));
  }
  async function download(format: 'svg' | 'png') {
    try {
      const response = await fetch('/v1/avatar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...request, format }),
      });
      if (!response.ok) throw new Error('Export failed.');
      const url = URL.createObjectURL(await response.blob());
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = `${request.templateId}.${format}`;
      anchor.click();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(`${format.toUpperCase()} downloaded.`);
    } catch (e) {
      setError(String(e));
    }
  }
  function share() {
    const url = new URL(location.href);
    url.hash = new URLSearchParams({ request: JSON.stringify(request) }).toString();
    history.replaceState(null, '', url);
    setNotice('Share link is in the address bar.');
  }
  const template = templates.find((t) => t.id === request.templateId);
  const instance = request.instance ?? {};
  return (
    <main>
      <header>
        <a className="brand" href="/">
          BOT / AVATAR
        </a>
        <span>LOCAL STUDIO · 01</span>
      </header>
      <div className="workspace">
        <section className="preview-panel" aria-label="Avatar preview">
          <div className="preview-top">
            <span>{template?.role ?? request.templateId}</span>
            <span>
              Export · {request.size ?? 256} × {request.size ?? 256}
            </span>
          </div>
          <div className="avatar-stage" aria-busy={busy}>
            {preview && <img src={preview} alt="Avatar preview" />}
            {busy && <span className="loading">Rendering…</span>}
          </div>
          <div className="state-tabs">
            {states.map((state) => (
              <button
                key={state}
                aria-pressed={(request.state ?? 'idle') === state}
                onClick={() => change({ state })}
              >
                {state}
              </button>
            ))}
          </div>
          <div className="export-settings">
            <div className="field-pair">
              <label>
                Size
                <select
                  value={request.size ?? 256}
                  onChange={(e) => change({ size: Number(e.target.value) as 64 | 128 | 256 | 512 })}
                >
                  {style?.sizes.map((s) => (
                    <option key={s} value={s}>
                      {s} px
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <fieldset className="background-options">
              <legend>Background</legend>
              <div className="option-buttons">
                {style?.backgrounds.map((background) => (
                  <button
                    key={background}
                    type="button"
                    aria-pressed={(request.background ?? 'transparent') === background}
                    onClick={() => change({ background })}
                  >
                    <span className={`background-swatch ${background}`} />
                    {background.charAt(0).toUpperCase() + background.slice(1)}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>
        </section>
        <section className="controls" aria-label="Avatar settings">
          <h2>Make it yours.</h2>
          <label>
            Template
            <select
              value={request.templateId}
              onChange={(e) => {
                const next = templates.find((item) => item.id === e.target.value);
                const hair = { ...instance.hair };
                if (hair.color && !next?.allowedHairColors.includes(hair.color)) delete hair.color;
                if (hair.style && !next?.allowedHair.includes(hair.style)) delete hair.style;
                change({ templateId: e.target.value, instance: { ...instance, hair } });
              }}
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.id}
                </option>
              ))}
            </select>
          </label>
          <div className="field-pair">
            <label>
              Hair
              <select
                value={instance.hair?.style ?? ''}
                onChange={(e) => {
                  const hair = { ...instance.hair };
                  if (e.target.value) hair.style = e.target.value;
                  else delete hair.style;
                  change({ instance: { ...instance, hair } });
                }}
              >
                <option value="">From seed</option>
                {template?.allowedHair.map((h) => (
                  <option key={h} value={h}>
                    {h.replace('hair-', '')}
                  </option>
                ))}
              </select>
            </label>
            <ColorMenu
              value={instance.hair?.color ?? ''}
              colors={template?.allowedHairColors ?? []}
              palette={style?.colors ?? {}}
              defaultColor={template?.defaultHairColor ?? 'purple'}
              onChange={(color) => {
                const hair = { ...instance.hair };
                if (color) hair.color = color;
                else delete hair.color;
                change({ instance: { ...instance, hair } });
              }}
            />
          </div>
          <details className="advanced">
            <summary>Advanced · seed</summary>
            <label>
              Seed
              <input
                value={typeof instance.seed === 'string' ? instance.seed : ''}
                maxLength={128}
                onChange={(e) => change({ instance: { ...instance, seed: e.target.value } })}
              />
            </label>
          </details>
          <h3>Badge</h3>
          <label>
            Instance badge
            <select
              value={
                instance.instanceBadge?.image
                  ? 'custom'
                  : instance.instanceBadge?.label !== undefined
                    ? 'letters'
                    : (instance.instanceBadge?.icon ?? '')
              }
              onChange={(e) => {
                const next = { ...instance };
                if (e.target.value === 'letters')
                  next.instanceBadge = { icon: 'dot', color: 'teal', label: 'LV' };
                else if (e.target.value)
                  next.instanceBadge = { icon: e.target.value, color: 'teal' };
                else delete next.instanceBadge;
                change({ instance: next });
              }}
            >
              <option value="">None</option>
              <option value="letters">Letters</option>
              {instance.instanceBadge?.image && <option value="custom">Imported image</option>}
              {template?.allowedInstanceBadges.map((b) => (
                <option key={b}>{b}</option>
              ))}
            </select>
          </label>
          {instance.instanceBadge && (
            <>
              {instance.instanceBadge.label !== undefined && (
                <label>
                  Badge label
                  <input
                    value={instance.instanceBadge.label ?? ''}
                    onChange={(e) => {
                      if (instance.instanceBadge) {
                        const badge = { ...instance.instanceBadge };
                        badge.label = e.target.value;
                        change({ instance: { ...instance, instanceBadge: badge } });
                      }
                    }}
                    maxLength={3}
                    placeholder="Two letters, e.g. LV"
                  />
                </label>
              )}
              <div className="field-pair">
                <label>
                  Badge color
                  <select
                    value={instance.instanceBadge.color}
                    onChange={(e) => {
                      if (instance.instanceBadge)
                        change({
                          instance: {
                            ...instance,
                            instanceBadge: { ...instance.instanceBadge, color: e.target.value },
                          },
                        });
                    }}
                  >
                    {instance.instanceBadge.color.startsWith('#') && (
                      <option value={instance.instanceBadge.color}>
                        Image color ({instance.instanceBadge.color})
                      </option>
                    )}
                    {Object.keys(style?.colors ?? {}).map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </label>
                {!instance.instanceBadge.image && (
                  <label>
                    Icon color
                    <select
                      value={instance.instanceBadge.iconColor ?? 'ink'}
                      onChange={(e) => {
                        if (instance.instanceBadge)
                          change({
                            instance: {
                              ...instance,
                              instanceBadge: {
                                ...instance.instanceBadge,
                                iconColor: e.target.value,
                              },
                            },
                          });
                      }}
                    >
                      {Object.keys(style?.colors ?? {}).map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                )}
              </div>
            </>
          )}
          <div className="export-actions">
            <div className="actions">
              <button disabled={busy || !preview} onClick={() => void download('svg')}>
                Export SVG
              </button>
              <button disabled={busy || !preview} onClick={() => void download('png')}>
                Export PNG
              </button>
            </div>
            <button className="share" disabled={busy || !preview} onClick={share}>
              Create share link ↗
            </button>
          </div>
        </section>
      </div>
      {(error || linkError) && (
        <p role="alert" className="error">
          {error || linkError}
        </p>
      )}
      <p role="status">{notice}</p>
      <footer>
        <span>{templates.length} identities. One family.</span>
        <span>Generated locally · SVG + PNG</span>
      </footer>
    </main>
  );
}
const root = document.getElementById('root');
if (root)
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
