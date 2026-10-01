function mix(hex: string, target: number, amount: number): string {
  return `#${[1, 3, 5]
    .map((offset) => {
      const channel = Number.parseInt(hex.slice(offset, offset + 2), 16);
      return Math.round(channel + (target - channel) * amount)
        .toString(16)
        .padStart(2, '0');
    })
    .join('')}`;
}
export function flatPaint(color: string): { readonly fill: string; readonly outline: string } {
  return { fill: color, outline: mix(color, 0, 0.22) };
}
