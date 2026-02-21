/**
 * Bezier Field decorative — flowing 3D bezier curves that animate over time.
 */

const bezierField = {
  name: 'bezierField',
  label: 'Bezier Field',
  defaults: {
    animated: true,
    density: 10,
    amplitude: 50,
    speed: 0.5,
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const density = params.density ?? 10;
    const amplitude = params.amplitude ?? 50;
    const speed = params.speed ?? 0.5;
    const t = params.animated !== false ? frameCount * 0.01 * speed : 0;

    const decColor = look.palette?.decorative0 ?? '#CCAA66';
    p.noFill();
    p.stroke(p.color(decColor));
    p.strokeWeight(1.5);

    for (let i = 0; i < density; i++) {
      const offset = (i / density) * p.TWO_PI;
      const spread = 200;

      // Start and end points spread in XZ
      const x1 = p.cos(offset) * spread;
      const z1 = p.sin(offset) * spread;
      const x2 = p.cos(offset + p.PI) * spread;
      const z2 = p.sin(offset + p.PI) * spread;

      // Animated control points with noise-driven Y displacement
      const cx1 = x1 * 0.5 + p.sin(t + i) * amplitude;
      const cy1 = -amplitude + p.sin(t * 1.3 + i * 0.7) * amplitude;
      const cz1 = z1 * 0.5 + p.cos(t + i) * amplitude;

      const cx2 = x2 * 0.5 + p.cos(t + i * 1.2) * amplitude;
      const cy2 = amplitude + p.cos(t * 0.8 + i * 0.5) * amplitude;
      const cz2 = z2 * 0.5 + p.sin(t + i * 0.9) * amplitude;

      p.beginShape();
      for (let s = 0; s <= 20; s++) {
        const u = s / 20;
        const inv = 1 - u;
        // Cubic bezier interpolation
        const bx = inv * inv * inv * x1 + 3 * inv * inv * u * cx1 + 3 * inv * u * u * cx2 + u * u * u * x2;
        const by = inv * inv * inv * 0 + 3 * inv * inv * u * cy1 + 3 * inv * u * u * cy2 + u * u * u * 0;
        const bz = inv * inv * inv * z1 + 3 * inv * inv * u * cz1 + 3 * inv * u * u * cz2 + u * u * u * z2;
        p.vertex(bx, by, bz);
      }
      p.endShape();
    }
  },
};

export default bezierField;
