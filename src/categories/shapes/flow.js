/**
 * Flow Design — signature shape: rotating torus
 */
export function getGeometry() {
  return { type: 'procedural', primitive: 'torus' };
}

export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;
  const count = params.shapeCount ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  for (let i = 0; i < count; i++) {
    p.push();
    p.rotateZ((p.TWO_PI / count) * i);
    p.translate(30 * scale, 0, 0);
    p.torus(60 * scale, 18 * scale, 24, 16);
    p.pop();
  }
  p.pop();
}
