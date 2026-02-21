/**
 * Experience — signature shape: ellipsoid
 */
export function getGeometry() {
  return { type: 'procedural', primitive: 'ellipsoid' };
}

export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.scale(1.4, 0.8, 1);
  p.sphere(65 * scale, 48, 32);
  p.pop();
}
