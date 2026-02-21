/**
 * Particle Field decorative — floating small spheres around the scene.
 * Uses deterministic positioning from noise so particles are stable across frames.
 */

const particleField = {
  name: 'particleField',
  label: 'Particle Field',
  defaults: {
    animated: true,
    count: 50,
    spread: 200,
    speed: 0.5,
    size: 3,
  },
  generate(params, seed) {
    return null;
  },
  draw(p, params, look, frameCount) {
    const count = Math.floor(params.count ?? 50);
    const spread = params.spread ?? 200;
    const speed = params.speed ?? 0.5;
    const size = params.size ?? 3;
    const t = params.animated !== false ? frameCount * 0.003 * speed : 0;

    const decColor = look.palette?.decorative1 ?? '#66AACC';
    const c = p.color(decColor);

    p.noStroke();

    for (let i = 0; i < count; i++) {
      // Deterministic base position from index
      const seed1 = i * 73.17;
      const seed2 = i * 127.31;
      const seed3 = i * 251.07;

      // Animate with sine/cos offset
      const x = (p.noise(seed1, t) - 0.5) * spread * 2;
      const y = (p.noise(seed2, t) - 0.5) * spread * 2;
      const z = (p.noise(seed3, t) - 0.5) * spread * 2;

      // Vary alpha by distance from center for depth feel
      const dist = Math.sqrt(x * x + y * y + z * z);
      const alpha = p.map(dist, 0, spread, 200, 60);
      c.setAlpha(alpha);
      p.fill(c);

      p.push();
      p.translate(x, y, z);
      p.sphere(size * (0.5 + p.noise(i * 0.5) * 0.8));
      p.pop();
    }
  },
};

export default particleField;
