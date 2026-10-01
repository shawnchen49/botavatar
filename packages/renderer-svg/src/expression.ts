import type { BotState } from '@bot-avatar/core';
import type { SvgNode } from './svg.js';

// Local expression geometry is centered on the approved idle eye positions.
const eyeCenters = [95.5, 163.5] as const;
const eyeY = 185;
export function expression(state: BotState, eyeFill: string): SvgNode {
  const line = (d: string, width: number, stroke = '#171918'): SvgNode => ({
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
  const eyes: readonly SvgNode[] =
    state === 'idle'
      ? eyeCenters.map((x) => ({
          tag: 'rect',
          attributes: { x: x - 9.5, y: eyeY - 21, width: 19, height: 42, rx: 9.5, fill: eyeFill },
        }))
      : eyeCenters.map((x, index) => {
          let eye: SvgNode;
          switch (state) {
            case 'working':
              eye = {
                tag: 'path',
                attributes: {
                  d:
                    index === 0
                      ? 'M-9.5 -16L9.5 -12V6.5Q9.5 16 0 16Q-9.5 16 -9.5 6.5Z'
                      : 'M-9.5 -12L9.5 -16V6.5Q9.5 16 0 16Q-9.5 16 -9.5 6.5Z',
                  fill: eyeFill,
                },
              };
              break;
            case 'waiting':
              eye = line('M-7 0H7', 8);
              break;
            case 'success':
              eye = line('M-11 7Q0 -21 11 7', 8);
              break;
            case 'error':
              eye = line('M-10 -10L10 10M10 -10L-10 10', 7);
              break;
            case 'offline':
              eye = line('M-7 0H7', 6, '#b5b4b0');
              break;
          }
          return {
            tag: 'g',
            attributes: { transform: `translate(${x} ${eyeY})` },
            children: [eye],
          };
        });
  return { tag: 'g', attributes: { 'data-layer': 'state', 'data-state': state }, children: eyes };
}
