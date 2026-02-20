/**
 * Export a canvas element as a PNG download.
 * @param {HTMLCanvasElement} canvas
 * @param {number} scale — resolution multiplier (1, 2, 4)
 */
export function exportCanvas(canvas, scale = 1) {
  if (!canvas) return;

  // For scale > 1, re-render at higher resolution would go here.
  // For now, export the canvas at its current size.
  const link = document.createElement('a');
  link.download = `sketch-${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
