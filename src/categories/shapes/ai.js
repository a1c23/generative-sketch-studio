/**
 * AI — signature shape: sphere
 */
export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.sphere(70 * scale, 24, 16);
  p.pop();
}
