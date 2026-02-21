/**
 * Background grid decorative — draws a subtle reference grid on the XZ plane.
 */
export function drawGrid(p, params) {
  const size = 400;
  const divisions = 20;
  const step = size / divisions;
  const half = size / 2;

  p.push();
  p.stroke(200, 198, 195);
  p.strokeWeight(0.5);
  p.noFill();

  for (let i = 0; i <= divisions; i++) {
    const pos = -half + i * step;
    p.line(pos, 0, -half, pos, 0, half);
    p.line(-half, 0, pos, half, 0, pos);
  }

  p.pop();
}
