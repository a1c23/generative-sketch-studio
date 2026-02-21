/**
 * Automation — signature shape: cylinder
 */
export function drawShape(p, params) {
  const scale = params.shapeScale ?? 1;

  p.push();
  p.rotateY(params.rotationY ?? 0);
  p.rotateX(params.rotationX ?? 0);
  p.cylinder(50 * scale, 120 * scale, 24, 1);
  p.pop();
}
