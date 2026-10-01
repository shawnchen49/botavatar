import { Resvg } from '@resvg/resvg-js';

export const PNG_RENDERER_VERSION = '0.2.0-resvg-2.6.2';
export class PngRenderError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'PngRenderError';
  }
}

/** Converts application-generated SVG only; this is not an arbitrary SVG upload boundary. */
export function renderPng(svg: string, size: number): Uint8Array {
  if (![64, 128, 256, 512].includes(size)) throw new PngRenderError('Unsupported PNG size.');
  if (typeof svg !== 'string' || !svg.startsWith('<svg ') || svg.length > 1_000_000)
    throw new PngRenderError('Expected a complete generated SVG under 1 MB.');
  if (
    /<(?:image|use|script|foreignObject)\b|(?:href|xlink:href)\s*=|<!DOCTYPE|<!ENTITY/iu.test(svg)
  )
    throw new PngRenderError('External resources and active SVG are unsupported.');
  try {
    const renderer = new Resvg(svg, {
      fitTo: { mode: 'width', value: size },
      font: { loadSystemFonts: true, defaultFontFamily: 'sans-serif' },
    });
    const rendered = renderer.render();
    if (rendered.width !== size || rendered.height !== size)
      throw new PngRenderError('PNG output must be square.');
    return rendered.asPng();
  } catch (cause) {
    if (cause instanceof PngRenderError) throw cause;
    throw new PngRenderError('SVG to PNG conversion failed.', { cause });
  }
}
