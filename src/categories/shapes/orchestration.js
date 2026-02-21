/**
 * Orchestration — signature shape: cone
 */
export function getGeometry() {
  return { type: 'procedural', primitive: 'cone' };
}

export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.cone(55 * scale, 120 * scale, 48, 1);
  p.pop();
}
