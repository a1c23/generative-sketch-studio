/**
 * Security — signature shape: box (shield-like)
 */
export function getGeometry() {
  return { type: 'procedural', primitive: 'box' };
}

export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.box(90 * scale, 90 * scale, 90 * scale);
  p.pop();
}
