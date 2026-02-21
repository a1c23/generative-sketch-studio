/**
 * AI — signature shape: sphere
 */
export function getGeometry() {
  return { type: 'procedural', primitive: 'sphere' };
}

export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.sphere(70 * scale, 48, 32);
  p.pop();
}
