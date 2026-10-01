export type SvgNode = {
  readonly tag:
    | 'svg'
    | 'g'
    | 'rect'
    | 'path'
    | 'circle'
    | 'line'
    | 'polyline'
    | 'polygon'
    | 'text'
    | 'defs'
    | 'linearGradient'
    | 'stop'
    | 'title'
    | 'metadata'
    | 'clipPath'
    | 'feOffset'
    | 'feFlood'
    | 'filter'
    | 'feTurbulence'
    | 'feColorMatrix'
    | 'feComposite'
    | 'feBlend'
    | 'feGaussianBlur';
  readonly attributes?: Readonly<Record<string, string | number>>;
  readonly children?: readonly SvgNode[];
  readonly text?: string;
};
export function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}
export function serializeSvg(node: SvgNode): string {
  const attributes = Object.entries(node.attributes ?? {})
    .map(([name, value]) => ` ${name}="${escapeXml(String(value))}"`)
    .join('');
  const content =
    (node.text === undefined ? '' : escapeXml(node.text)) +
    (node.children ?? []).map(serializeSvg).join('');
  return content
    ? `<${node.tag}${attributes}>${content}</${node.tag}>`
    : `<${node.tag}${attributes}/>`;
}
