/**
 * Grid decorative — draws a subtle reference grid on the XZ plane.
 * Migrated from src/categories/decoratives/grid.js, wrapped in the new interface.
 */

const grid = {
  name: 'grid',
  label: 'Reference Grid',
  defaults: {
    size: 400,
    divisions: 20,
    color: '#C8C6C3',
    strokeWeight: 0.5,
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const size = params.size ?? 400;
    const divisions = params.divisions ?? 20;
    const step = size / divisions;
    const half = size / 2;

    p.stroke(p.color(params.color ?? '#C8C6C3'));
    p.strokeWeight(params.strokeWeight ?? 0.5);
    p.noFill();

    for (let i = 0; i <= divisions; i++) {
      const pos = -half + i * step;
      p.line(pos, 0, -half, pos, 0, half);
      p.line(-half, 0, pos, half, 0, pos);
    }
  },
};

export default grid;
