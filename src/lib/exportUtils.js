/**
 * Export a canvas element as a PNG download.
 * @param {HTMLCanvasElement} canvas
 * @param {number} scale — resolution multiplier (1, 2, 4)
 */
export function exportCanvas(canvas, scale = 1) {
  if (!canvas) return;

  if (scale > 1) {
    // Create a scaled offscreen canvas
    const w = canvas.width * scale;
    const h = canvas.height * scale;
    const offscreen = document.createElement('canvas');
    offscreen.width = w;
    offscreen.height = h;
    const ctx = offscreen.getContext('2d');
    ctx.drawImage(canvas, 0, 0, w, h);

    const link = document.createElement('a');
    link.download = `sketch-${Date.now()}@${scale}x.png`;
    link.href = offscreen.toDataURL('image/png');
    link.click();
  } else {
    const link = document.createElement('a');
    link.download = `sketch-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }
}
