/** Quantized dominant foreground color; transparent and white background pixels do not vote. */
export function dominantColor(pixels: Uint8ClampedArray): string {
  const bins = new Map<number, { weight: number; r: number; g: number; b: number }>();
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i],
      g = pixels[i + 1],
      b = pixels[i + 2],
      a = pixels[i + 3];
    if (r === undefined || g === undefined || b === undefined || a === undefined)
      throw new Error('Expected complete RGBA pixels.');
    if (a / 255 < 0.25 || Math.min(r, g, b) > 235) continue;
    const saturation = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;
    const weight = (a / 255) * (saturation > 0.15 ? 3 : 1);
    const key = (r >> 5) * 64 + (g >> 5) * 8 + (b >> 5);
    const bin = bins.get(key) ?? { weight: 0, r: 0, g: 0, b: 0 };
    bin.weight += weight;
    bin.r += r * weight;
    bin.g += g * weight;
    bin.b += b * weight;
    bins.set(key, bin);
  }
  const dominant = [...bins.entries()].sort(
    (a, b) => b[1].weight - a[1].weight || a[0] - b[0],
  )[0]?.[1];
  if (!dominant) return '#343a40';
  return (
    '#' +
    [dominant.r, dominant.g, dominant.b]
      .map((v) =>
        Math.round(v / dominant.weight)
          .toString(16)
          .padStart(2, '0'),
      )
      .join('')
  );
}

export async function importBadge(file: File): Promise<{ image: string; color: string }> {
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type))
    throw new Error('Choose a PNG, JPEG, or WebP image.');
  if (file.size > 5 * 1024 * 1024) throw new Error('Choose an image smaller than 5 MB.');
  const bitmap = await createImageBitmap(file);
  try {
    if (bitmap.width > 4096 || bitmap.height > 4096)
      throw new Error('Image dimensions must be at most 4096 × 4096.');
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 128;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Image import is unavailable in this browser.');
    const scale = Math.min(128 / bitmap.width, 128 / bitmap.height);
    const width = bitmap.width * scale,
      height = bitmap.height * scale;
    context.drawImage(bitmap, (128 - width) / 2, (128 - height) / 2, width, height);
    const pixels = context.getImageData(0, 0, 128, 128).data;
    if (!pixels.some((value, i) => i % 4 === 3 && value > 0))
      throw new Error('The image is fully transparent.');
    return { image: canvas.toDataURL('image/png'), color: dominantColor(pixels) };
  } finally {
    bitmap.close();
  }
}
