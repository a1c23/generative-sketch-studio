/**
 * Data — signature shape: tall box (column/slab)
 */
export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.box(60 * scale, 140 * scale, 60 * scale);
  p.pop();
}
