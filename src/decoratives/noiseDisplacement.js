/**
 * Noise Displacement decorative — GPU vertex displacement shader.
 * Warps noun surfaces by displacing vertices along normals using sin/cos noise.
 * Uses string-based GLSL .modify({}) to bypass the p5.strands transpiler.
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

  /**
   * Create the GPU displacement shader.
   * @param {p5} p — p5 instance (must be called after createCanvas)
   * @param {() => object} getParams — getter returning current params
   * @returns {p5.Shader}
   */
  createShader(p, getParams) {
    return p.baseMaterialShader().modify({
      uniforms: {
        'float uAmount': () => (getParams().intensity ?? 30) / 100,
        'float uScale': () => (getParams().scale ?? 1) * 0.15,
        'float uSpeed': () => getParams().speed ?? 0.3,
        'float uTime': () => getParams().animated !== false ? p.millis() / 1000 : 0,
      },
      'Vertex getWorldInputs': `(Vertex inputs) {
        vec3 n = normalize(inputs.normal);
        vec3 pos = inputs.position;

        // Multi-octave noise using sin/cos combinations (GPU-friendly)
        float d = sin(pos.x * uScale + uTime * uSpeed)
              * cos(pos.y * uScale + uTime * uSpeed * 0.7)
              * sin(pos.z * uScale + uTime * uSpeed * 0.3);
        // Second octave for detail
        d += 0.5 * sin(pos.x * uScale * 2.0 + uTime)
                  * cos(pos.z * uScale * 2.0);

        d *= uAmount * 50.0;
        inputs.position += n * d;
        return inputs;
      }`,
    });
  },

  generate(params, seed) {
    return null;
  },

  // No-op: rendering is handled by the orchestrator activating the shader per-noun
  draw() {},
};

export default noiseDisplacement;
