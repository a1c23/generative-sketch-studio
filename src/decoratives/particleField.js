/**
 * Particle Field decorative — GPU-instanced floating spheres.
 * Uses string-based GLSL .modify({}) with uniforms callbacks for
 * auto-updated values and model(geo, count) for single draw-call instancing.
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

  /**
   * Create the GPU instancing shader and particle geometry.
   * @param {p5} p — p5 instance (must be called after createCanvas)
   * @param {() => object} getParams — getter returning current params
   * @returns {{ shader: p5.Shader, geometry: p5.Geometry }}
   */
  createShader(p, getParams) {
    const size = getParams().size ?? 3;
    const geometry = p.buildGeometry(() => {
      p.sphere(size, 4, 3);
    });

    const shader = p.baseColorShader().modify({
      uniforms: {
        'float uSpread': () => getParams().spread ?? 200,
        'float uDrift': () => getParams().speed ?? 0.5,
        'float uTime': () => getParams().animated !== false ? p.millis() / 1000 : 0,
      },
      'Vertex getWorldInputs': `(Vertex inputs) {
        float id = float(gl_InstanceID);

        // Pseudo-random base position per particle via sin hash
        float seed1 = id * 73.17;
        float seed2 = id * 127.31;
        float seed3 = id * 251.07;

        float x = (fract(sin(seed1) * 43758.5453) - 0.5) * uSpread * 2.0;
        float y = (fract(sin(seed2) * 43758.5453) - 0.5) * uSpread * 2.0;
        float z = (fract(sin(seed3) * 43758.5453) - 0.5) * uSpread * 2.0;

        // Animate with drift
        x += sin(uTime * uDrift + id * 0.1) * uSpread * 0.1;
        y += cos(uTime * uDrift * 0.7 + id * 0.2) * uSpread * 0.1;
        z += sin(uTime * uDrift * 0.3 + id * 0.3) * uSpread * 0.1;

        inputs.position.x += x;
        inputs.position.y += y;
        inputs.position.z += z;
        return inputs;
      }`,
    });

    return { shader, geometry };
  },

  generate(params, seed) {
    return null;
  },

  // No-op: rendering is handled by the orchestrator via shader + model(geo, count)
  draw() {},
};

export default particleField;
