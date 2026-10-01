import { useEffect, useRef } from 'react';

export function ColorMenu({
  value,
  colors,
  palette,
  defaultColor,
  onChange,
}: {
  value: string;
  colors: readonly string[];
  palette: Readonly<Record<string, string>>;
  defaultColor: string;
  onChange: (color: string) => void;
}) {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    menu.current?.removeAttribute('open');
  }, [colors]);
  useEffect(() => {
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target))
        menu.current?.removeAttribute('open');
    };
    document.addEventListener('pointerdown', close);
    return () => document.removeEventListener('pointerdown', close);
  }, []);
  const label = (color: string) => (color ? color.replaceAll('-', ' ') : 'Template default');
  return (
    <div className="hair-colors">
      <span id="hair-color-label">Hair color</span>
      <details
        className="color-menu"
        ref={menu}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            menu.current?.removeAttribute('open');
            menu.current?.querySelector('summary')?.focus();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            menu.current?.removeAttribute('open');
        }}
      >
        <summary aria-labelledby="hair-color-label hair-color-value">
          <span className="color-dot" style={{ backgroundColor: palette[value || defaultColor] }} />
          <span id="hair-color-value">{label(value)}</span>
          <span aria-hidden="true">⌄</span>
        </summary>
        <fieldset className="color-popup">
          <legend className="visually-hidden">Hair color</legend>
          {['', ...colors].map((color) => (
            <label key={color} className="color-choice">
              <input
                type="radio"
                name="hair-color"
                value={color}
                checked={value === color}
                onChange={() => onChange(color)}
              />
              <span
                className="color-dot"
                style={{ backgroundColor: palette[color || defaultColor] }}
              />
              <span>{label(color)}</span>
            </label>
          ))}
        </fieldset>
      </details>
    </div>
  );
}
