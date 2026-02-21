/**
 * Color Interpolation decorative — a ring of shapes that blend between palette colors.
 */

const colorInterpolation = {
  name: 'colorInterpolation',
  label: 'Color Interpolation',
  defaults: {
    animated: true,
    blend: 0.5,
    mode: 'linear',
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const blend = params.blend ?? 0.5;
    const t = params.animated !== false ? frameCount * 0.005 : 0;

    const c0 = p.color(look.palette?.decorative0 ?? '#CCAA66');
    const c1 = p.color(look.palette?.decorative1 ?? '#66AACC');
    const accent = p.color(look.palette?.accent ?? '#5A7A8A');

    p.noStroke();

    const count = 12;
    const radius = 150;
    const angleStep = p.TWO_PI / count;

    for (let i = 0; i < count; i++) {
      const angle = i * angleStep + t * 0.3;
      const frac = i / count;

      // Interpolate between palette colors
      let fillColor;
      if (frac < blend) {
        const localT = frac / Math.max(blend, 0.01);
        fillColor = p.lerpColor(c0, c1, localT);
      } else {
        const localT = (frac - blend) / Math.max(1 - blend, 0.01);
        fillColor = p.lerpColor(c1, accent, localT);
      }

      fillColor.setAlpha(180);
      p.fill(fillColor);

      p.push();
      p.rotateY(angle);
      p.translate(radius, 0, 0);
      p.rotateX(t + i * 0.3);
      p.box(18, 18, 18);
      p.pop();
    }
  },
};

export default colorInterpolation;
