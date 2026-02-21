/**
 * Integration — signature shape: two overlapping tori
 */
export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);

  p.push();
  p.rotateX(p.HALF_PI);
  p.torus(55 * scale, 14 * scale, 24, 16);
  p.pop();

  p.push();
  p.rotateZ(p.HALF_PI);
  p.rotateX(p.HALF_PI);
  p.torus(55 * scale, 14 * scale, 24, 16);
  p.pop();

  p.pop();
}
