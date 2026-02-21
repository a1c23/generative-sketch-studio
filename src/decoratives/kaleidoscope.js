/**
 * Kaleidoscope decorative — rotating radially symmetric geometry.
 */

const kaleidoscope = {
  name: 'kaleidoscope',
  label: 'Kaleidoscope',
  defaults: {
    animated: true,
    segments: 6,
    radius: 100,
    speed: 0.2,
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const segments = Math.max(3, Math.floor(params.segments ?? 6));
    const radius = params.radius ?? 100;
    const speed = params.speed ?? 0.2;
    const t = params.animated !== false ? frameCount * 0.01 * speed : 0;

    const accentColor = look.palette?.accent ?? '#5A7A8A';
    const decColor = look.palette?.decorative1 ?? '#66AACC';

    p.noFill();
    p.strokeWeight(1);

    const angleStep = p.TWO_PI / segments;

    for (let i = 0; i < segments; i++) {
      const angle = i * angleStep + t;

      p.push();
      p.rotateY(angle);
      p.translate(radius * 0.6, 0, 0);

      // Draw a small rotating shape at each spoke
      p.rotateX(t * 1.5);
      p.rotateZ(t * 0.7);

      p.stroke(p.color(i % 2 === 0 ? accentColor : decColor));
      p.box(radius * 0.2);

      p.pop();
    }

    // Draw connecting lines between segments
    p.stroke(p.color(accentColor));
    p.strokeWeight(0.5);
    for (let i = 0; i < segments; i++) {
      const a1 = i * angleStep + t;
      const a2 = ((i + 1) % segments) * angleStep + t;
      const r = radius * 0.6;
      p.line(
        p.cos(a1) * r, 0, p.sin(a1) * r,
        p.cos(a2) * r, 0, p.sin(a2) * r,
      );
    }
  },
};

export default kaleidoscope;
