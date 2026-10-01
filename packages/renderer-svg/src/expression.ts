import type { BotState } from '@bot-avatar/core';
import type { SvgNode } from './svg.js';

// Every state uses the same eye anchors. Mouths are intentionally absent.
export function expression(state: BotState, eyeFill: string): SvgNode {
  const ink = '#171918';
  const line = (d: string, width: number, stroke = ink): SvgNode => ({
    tag: 'path',
    attributes: {
      d,
      fill: 'none',
      stroke,
      'stroke-width': width,
      'stroke-linecap': 'round',
      'stroke-linejoin': 'round',
    },
  });
  let eyes: readonly SvgNode[];
  switch (state) {
    case 'idle':
      eyes = [86, 154].map((x) => ({
        tag: 'rect',
        attributes: { x, y: 164, width: 19, height: 42, rx: 9.5, fill: eyeFill },
      }));
      break;
    case 'working':
      eyes = [
        {
          tag: 'path',
          attributes: {
            d: 'M85 176L103 180V197Q103 206 94 206Q85 206 85 197ZM153 180L171 176V197Q171 206 162 206Q153 206 153 197Z',
            fill: eyeFill,
          },
        },
        line('M83 175L105 179M151 179L173 175', 5),
      ];
      break;
    case 'waiting':
      eyes = [line('M87 190H101', 8), line('M155 190H169', 8)];
      break;
    case 'success':
      eyes = [line('M83 192Q94 164 105 192', 8), line('M151 192Q162 164 173 192', 8)];
      break;
    case 'error':
      eyes = [
        line('M84 178L104 198M104 178L84 198', 7),
        line('M152 178L172 198M172 178L152 198', 7),
      ];
      break;
    case 'offline':
      eyes = [line('M87 190H101', 6, '#b5b4b0'), line('M155 190H169', 6, '#b5b4b0')];
      break;
  }
  return { tag: 'g', attributes: { 'data-layer': 'state', 'data-state': state }, children: eyes };
}
