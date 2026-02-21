/**
 * Noise Displacement decorative — a perlin-noise–driven undulating mesh surface.
 */

const noiseDisplacement = {
  name: 'noiseDisplacement',
  label: 'Noise Displacement',
  defaults: {
    animated: true,
    scale: 1,
    intensity: 30,
    speed: 0.3,
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const scale = params.scale ?? 1;
    const intensity = params.intensity ?? 30;
    const speed = params.speed ?? 0.3;
    const t = params.animated !== false ? frameCount * 0.005 * speed : 0;

    const decColor = look.palette?.decorative0 ?? '#CCAA66';
    const c = p.color(decColor);
    c.setAlpha(120);
    p.stroke(c);
    p.strokeWeight(0.5);
    p.noFill();

    const res = 16;
    const size = 300 * scale;
    const step = size / res;
    const half = size / 2;

    // Draw a displaced grid mesh on the XZ plane
    for (let i = 0; i < res; i++) {
      p.beginShape(p.TRIANGLE_STRIP);
      for (let j = 0; j <= res; j++) {
        for (let di = 0; di <= 1; di++) {
          const x = -half + (i + di) * step;
          const z = -half + j * step;
          const nx = (i + di) * 0.15 * scale;
          const nz = j * 0.15 * scale;
          const y = (p.noise(nx + t, nz + t) - 0.5) * intensity * 2;
          p.vertex(x, y, z);
        }
      }
      p.endShape();
    }
  },
};

export default noiseDisplacement;
